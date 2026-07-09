#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const failures = [];
const requiredFaces = [
  "submariner",
  "bigben",
  "grandcentral",
  "mickey",
  "yachtmaster2"
];

function fail(message) {
  failures.push(message);
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function relativeFileList(dir = ".") {
  const base = path.join(root, dir);
  const entries = fs.readdirSync(base, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".git") continue;
    const relativePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...relativeFileList(relativePath));
    } else {
      files.push(relativePath.replace(/^\.\//, ""));
    }
  }

  return files;
}

function inlineScripts(html) {
  const scripts = [];
  const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRe.exec(html))) {
    const attrs = match[1] || "";
    if (/\ssrc\s*=/.test(attrs)) continue;
    scripts.push(match[2]);
  }
  return scripts;
}

function validateHtml(relativePath, options = {}) {
  const html = readText(relativePath);
  const scripts = inlineScripts(html);

  if (/^(<<<<<<<|=======|>>>>>>>) /m.test(html)) {
    fail(`${relativePath} contains unresolved merge-conflict markers.`);
  }

  if (!/<!doctype html>/i.test(html)) {
    fail(`${relativePath} is missing a <!doctype html> declaration.`);
  }

  if (!/<title>[\s\S]+<\/title>/i.test(html)) {
    fail(`${relativePath} is missing a <title>.`);
  }

  if (options.requireInlineScript && scripts.length === 0) {
    fail(`${relativePath} has no inline scripts to validate.`);
  }

  scripts.forEach((source, index) => {
    try {
      new vm.Script(source, { filename: `${relativePath}:inline-script-${index + 1}.js` });
    } catch (error) {
      fail(`${relativePath} inline script ${index + 1} has a JavaScript syntax error: ${error.message}`);
    }
  });

  if (options.requireFaces) {
    for (const face of requiredFaces) {
      const faceRe = new RegExp(`\\b${face}\\s*:`);
      if (!faceRe.test(html)) {
        fail(`${relativePath} is missing expected watch/clock face key: ${face}`);
      }
    }
  }

  return scripts.length;
}

function validateMarkdownLinks() {
  const markdownFiles = relativeFileList()
    .filter((file) => file.endsWith(".md"));

  for (const file of markdownFiles) {
    const text = readText(file);
    const linkRe = /!?\[[^\]]+\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRe.exec(text))) {
      const href = match[1].trim();
      if (!href || href.startsWith("#") || /^(https?:|mailto:)/i.test(href)) continue;

      const target = href.split("#")[0];
      if (!target) continue;

      const decodedTarget = decodeURIComponent(target);
      const absoluteTarget = path.resolve(path.join(root, path.dirname(file)), decodedTarget);

      if (!absoluteTarget.startsWith(root) || !fs.existsSync(absoluteTarget)) {
        fail(`${file} links to missing local target: ${href}`);
      }
    }
  }

  return markdownFiles.length;
}

function validateManifest() {
  let manifest;
  try {
    manifest = JSON.parse(readText("versions.json"));
  } catch (error) {
    fail(`versions.json is invalid JSON: ${error.message}`);
    return [];
  }

  const files = [];
  if (!manifest.active || !manifest.active.file) {
    fail("versions.json is missing active.file.");
  } else {
    files.push(manifest.active.file);
  }

  if (!Array.isArray(manifest.snapshots)) {
    fail("versions.json snapshots must be an array.");
  } else {
    const ids = new Set();
    for (const snapshot of manifest.snapshots) {
      if (!snapshot.id) fail("versions.json contains a snapshot without an id.");
      if (snapshot.id && ids.has(snapshot.id)) fail(`versions.json contains duplicate snapshot id: ${snapshot.id}`);
      if (snapshot.id) ids.add(snapshot.id);
      if (!snapshot.label) fail(`versions.json snapshot ${snapshot.id || "(unknown)"} is missing a label.`);
      if (!snapshot.file) {
        fail(`versions.json snapshot ${snapshot.id || "(unknown)"} is missing a file.`);
      } else {
        files.push(snapshot.file);
      }
    }
  }

  for (const file of files) {
    if (!fileExists(file)) {
      fail(`versions.json references missing file: ${file}`);
    }
  }

  return [...new Set(files)];
}

function activeFaceCatalog() {
  const html = readText("world-clock.html");
  const scripts = inlineScripts(html);
  const appScript = scripts[scripts.length - 1] || "";
  const marker = "const FACE_KEYS = Object.keys(FACES);";
  const markerIndex = appScript.indexOf(marker);

  if (markerIndex < 0) {
    fail("world-clock.html is missing FACE_KEYS declaration.");
    return [];
  }

  const source = appScript.slice(0, markerIndex + marker.length);
  const context = {
    console,
    Intl,
    Date,
    Math,
    Number,
    String,
    Array,
    Set,
    Map,
    JSON,
    localStorage: {
      getItem() { return null; },
      setItem() {}
    },
    document: {
      getElementById() { return {}; }
    }
  };

  try {
    vm.createContext(context);
    vm.runInContext(
      `${source}\nglobalThis.__catalog = FACE_KEYS.map(key => ({ key, name: FACES[key].name, cadence: FACES[key].cadence || "default" }));`,
      context,
      { filename: "world-clock.html:face-catalog.js" }
    );
  } catch (error) {
    fail(`Could not derive face catalog from world-clock.html: ${error.message}`);
    return [];
  }

  return context.__catalog || [];
}

function validateFaceCatalog() {
  const relativePath = "docs/watch-face-catalog.md";
  if (!fileExists(relativePath)) {
    fail(`${relativePath} is missing.`);
    return 0;
  }

  const expected = activeFaceCatalog();
  const markdown = readText(relativePath);
  const rows = [];

  for (const line of markdown.split(/\r?\n/)) {
    const match = line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$/);
    if (!match) continue;
    rows.push({
      key: match[1].trim(),
      name: match[2].trim(),
      cadence: match[3].trim()
    });
  }

  if (rows.length !== expected.length) {
    fail(`${relativePath} lists ${rows.length} face(s), but world-clock.html exposes ${expected.length}.`);
  }

  const totalMatch = markdown.match(/Total faces:\s*(\d+)\./);
  if (!totalMatch) {
    fail(`${relativePath} is missing a "Total faces" line.`);
  } else if (Number(totalMatch[1]) !== expected.length) {
    fail(`${relativePath} says Total faces: ${totalMatch[1]}, but world-clock.html exposes ${expected.length}.`);
  }

  expected.forEach((face, index) => {
    const row = rows[index];
    if (!row) return;
    if (row.key !== face.key || row.name !== face.name || row.cadence !== face.cadence) {
      fail(`${relativePath} row ${index + 1} should be \`${face.key}\` | ${face.name} | \`${face.cadence}\`, but found \`${row.key}\` | ${row.name} | \`${row.cadence}\`.`);
    }
  });

  return expected.length;
}

const manifestFiles = validateManifest();
const htmlFiles = ["index.html", ...manifestFiles].filter((file) => fileExists(file));
let scriptCount = 0;

for (const file of htmlFiles) {
  scriptCount += validateHtml(file, {
    requireInlineScript: file !== "index.html",
    requireFaces: file !== "index.html"
  });
}

const faceCatalogCount = validateFaceCatalog();
const markdownCount = validateMarkdownLinks();

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} HTML file(s), ${scriptCount} inline script(s), ${requiredFaces.length} required face keys per app page, ${faceCatalogCount} cataloged face(s), ${markdownCount} markdown file(s).`);
