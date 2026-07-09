#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "world-clock.html");
const html = fs.readFileSync(htmlPath, "utf8");
const failures = [];

function fail(message) {
  failures.push(message);
}

if (/^(<<<<<<<|=======|>>>>>>>) /m.test(html)) {
  fail("world-clock.html contains unresolved merge-conflict markers.");
}

if (!/<!doctype html>/i.test(html)) {
  fail("world-clock.html is missing a <!doctype html> declaration.");
}

if (!/<title>[\s\S]+<\/title>/i.test(html)) {
  fail("world-clock.html is missing a <title>.");
}

const scripts = [];
const scriptRe = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let match;
while ((match = scriptRe.exec(html))) {
  const attrs = match[1] || "";
  if (/\ssrc\s*=/.test(attrs)) continue;
  scripts.push(match[2]);
}

if (scripts.length === 0) {
  fail("No inline scripts found to validate.");
}

scripts.forEach((source, index) => {
  try {
    new vm.Script(source, { filename: `world-clock.html:inline-script-${index + 1}.js` });
  } catch (error) {
    fail(`Inline script ${index + 1} has a JavaScript syntax error: ${error.message}`);
  }
});

const requiredFaces = [
  "submariner",
  "bigben",
  "grandcentral",
  "mickey",
  "yachtmaster2"
];

for (const face of requiredFaces) {
  const faceRe = new RegExp(`\\b${face}\\s*:`);
  if (!faceRe.test(html)) {
    fail(`Expected watch/clock face key not found: ${face}`);
  }
}

if (failures.length > 0) {
  console.error("Validation failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log(`Validation passed: ${scripts.length} inline script(s), ${requiredFaces.length} required face keys.`);
