const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "versions/inkling-2-mini.html"), "utf8");
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
    { filename: "inkling-2-mini.html:catalog.js" }
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

test("Inkling 2 Mini exposes the catalog keys and cadences in order", () => {
  assert.equal(scripts.length, 1);
  const actual = catalogFromPage();
  const expected = canonicalCatalog();
  assert.equal(actual.length, 62);
  assert.deepEqual(
    actual.map(({ key, cadence }) => ({ key, cadence })),
    expected.map(({ key, cadence }) => ({ key, cadence }))
  );
  assert.ok(actual.every(({ name }) => name.length > 0));
});

test("Inkling 2 Mini implements the standalone interaction and SVG contract", () => {
  assert.doesNotMatch(html, /<(?:img|image)\b/i);
  assert.match(html, /function shuffleAll\(/);
  assert.match(html, /function shuffleCity\(/);
  assert.match(html, /function addCity\(/);
  assert.match(html, /function removeCity\(/);
  assert.match(html, /data-hand="hour"/);
  assert.match(html, /timeZone:/);
});
