const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "versions/mai-code-2.html"), "utf8");
const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
const source = scripts.at(-1);
const marker = "const FACE_KEYS = Object.keys(FACES);";
const markerEnd = source.indexOf(marker) + marker.length;

function catalogFromPage() {
  const context = {};
  vm.createContext(context);
  vm.runInContext(
    `${source.slice(0, markerEnd)}\nthis.catalog = FACE_KEYS.map(key => ({ key, name: FACES[key].name, cadence: FACES[key].cadence }));`,
    context,
    { filename: "mai-code-2.html:catalog.js" }
  );
  return JSON.parse(JSON.stringify(context.catalog));
}

function canonicalCatalog() {
  return fs.readFileSync(path.join(root, "docs/watch-face-catalog.md"), "utf8")
    .split(/\r?\n/)
    .map(line => line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$/))
    .filter(Boolean)
    .map(match => ({ key: match[1].trim(), name: match[2].trim(), cadence: match[3].trim() }));
}

test("Microsoft MAI Code 2 exposes the exact 62-piece catalog", () => {
  assert.equal(scripts.length, 1);
  assert.deepEqual(catalogFromPage(), canonicalCatalog());
});

test("Microsoft MAI Code 2 implements the standalone interaction and SVG contract", () => {
  assert.doesNotMatch(html, /<(?:img|image)\b/i);
  assert.match(html, /function shuffleAll\(/);
  assert.match(html, /function shuffleCity\(/);
  assert.match(html, /function addCity\(/);
  assert.match(html, /function removeCity\(/);
  assert.match(html, /data-hand="hour"/);
  assert.match(html, /data-digital/);
  assert.match(html, /id="regatta-controls"/);
  assert.match(html, /function formatRegatta\(/);
  assert.match(html, /timeZone:/);
});
