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

const manifestFiles = validateManifest();
const htmlFiles = ["index.html", ...manifestFiles].filter((file) => fileExists(file));
let scriptCount = 0;

for (const file of htmlFiles) {
  scriptCount += validateHtml(file, {
    requireInlineScript: file !== "index.html",
    requireFaces: file !== "index.html"
  });
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} HTML file(s), ${scriptCount} inline script(s), ${requiredFaces.length} required face keys per app page.`);
