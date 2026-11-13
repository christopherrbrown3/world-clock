"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const REPO_ROOT = path.resolve(__dirname, "..");
const HTML_PATH = path.join(REPO_ROOT, "versions", "gemini-4-hydrogen.html");
const CATALOG_MD_PATH = path.join(REPO_ROOT, "docs", "watch-face-catalog.md");

const html = fs.readFileSync(HTML_PATH, "utf8");
const catalogMd = fs.readFileSync(CATALOG_MD_PATH, "utf8");

function extractScriptBody(sourceHtml) {
  const match = sourceHtml.match(/<script>\s*([\s\S]*?)\s*<\/script>/);
  assert.ok(match, "Expected inline <script> block in versions/gemini-4-hydrogen.html");
  return match[1];
}

function parseMarkdownCatalogKeys(md) {
  const keys = [];
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|/);
    if (m && m[1] !== "key") keys.push(m[1]);
  }
  return keys;
}

function createDomStub() {
  const store = new Map();
  const makeEl = (tag = "div", id = "") => {
    const listeners = new Map();
    const attrs = new Map();
    const el = {
      tagName: tag.toUpperCase(),
      id,
      _html: "",
      textContent: "",
      value: "",
      hidden: false,
      dataset: {},
      children: [],
      classList: {
        _set: new Set(),
        add(...cls) { cls.forEach(c => this._set.add(c)); },
        remove(...cls) { cls.forEach(c => this._set.delete(c)); },
        contains(c) { return this._set.has(c); }
      },
      set innerHTML(val) {
        this._html = String(val);
        this.children = [];
      },
      get innerHTML() {
        return this._html;
      },
      appendChild(child) {
        this.children.push(child);
        return child;
      },
      addEventListener(type, fn) {
        if (!listeners.has(type)) listeners.set(type, []);
        listeners.get(type).push(fn);
      },
      dispatch(type, event = {}) {
        const ev = { target: el, preventDefault() {}, stopPropagation() {}, ...event };
        for (const fn of listeners.get(type) || []) fn(ev);
      },
      setAttribute(k, v) { attrs.set(k, String(v)); },
      getAttribute(k) { return attrs.has(k) ? attrs.get(k) : null; },
      hasAttribute(k) { return attrs.has(k); },
      removeAttribute(k) { attrs.delete(k); },
      focus() {},
      closest() { return null; },
      querySelector(sel) {
        if (sel === "svg" && this._html.includes("<svg")) {
          return makeEl("svg");
        }
        return makeEl("div");
      },
      querySelectorAll(sel) {
        if (sel === ".watch-card") return this.children;
        return [];
      }
    };
    return el;
  };

  const elementsById = new Map();
  const document = {
    documentElement: makeEl("html"),
    getElementById(id) {
      if (!elementsById.has(id)) {
        const el = makeEl("div", id);
        if (id === "search-input" || id === "atlas-search") el.value = "";
        elementsById.set(id, el);
      }
      return elementsById.get(id);
    },
    createElement(tag) { return makeEl(tag); },
    addEventListener() {}
  };

  const localStorage = {
    getItem(k) { return store.has(k) ? store.get(k) : null; },
    setItem(k, v) { store.set(k, String(v)); }
  };

  return { document, localStorage, elementsById };
}

function loadAppInternals() {
  const rawScript = extractScriptBody(html);
  // Replace the outer IIFE closing so we can inspect internal constants/functions in the VM sandbox
  const marker = "initMeridianAndSelects();";
  const idx = rawScript.lastIndexOf(marker);
  assert.notEqual(idx, -1, "Expected initMeridianAndSelects() call");

  const instrumented = rawScript.replace(
    /^\s*\(\(\)\s*=>\s*\{\s*"use strict";/,
    '"use strict";'
  ).replace(
    /initMeridianAndSelects\(\);\s*renderBoard\(\);\s*requestAnimationFrame\(tickFrame\);\s*\}\)\(\);\s*$/,
    `initMeridianAndSelects();
     renderBoard();
     globalThis.__H2__ = {
       CATALOG,
       FACE_MAP,
       FACE_KEYS,
       FACE_RENDERERS,
       CITIES,
       CITY_MAP,
       DEFAULT_WALL,
       state,
       getZonedParts,
       getNowPartsForTz,
       formatOffset,
       formatDigitalTime,
       getLunarPhase,
       getSecondProgress,
       shuffleAllFaces,
       shuffleCardFace,
       renderBoard,
       openLoupe,
       closeLoupe,
       toggleChrono,
       resetChrono,
       getChronoElapsed
     };`
  );

  const { document, localStorage, elementsById } = createDomStub();
  const context = vm.createContext({
    console,
    Date,
    Math,
    Map,
    Set,
    Array,
    Object,
    String,
    Number,
    JSON,
    Intl,
    performance: { now: () => 1000 },
    requestAnimationFrame: () => 1,
    document,
    localStorage
  });

  vm.runInContext(instrumented, context, { filename: "gemini-4-hydrogen-inline.js" });
  return { app: context.__H2__, document, elementsById };
}

const { app, document, elementsById } = loadAppInternals();

test("standalone HTML has valid syntax and no external HTTP(S) asset URLs", () => {
  const scriptBody = extractScriptBody(html);
  assert.doesNotThrow(() => new vm.Script(scriptBody));
  const externalUrls = (html.match(/https?:\/\/[^\s"'<>)]+/gi) || []).filter(
    url => url !== "http://www.w3.org/2000/svg"
  );
  assert.deepEqual(externalUrls, [], `Unexpected external URLs: ${externalUrls.join(", ")}`);
});

test("catalog matches all 62 faces in docs/watch-face-catalog.md in exact key set", () => {
  const docKeys = parseMarkdownCatalogKeys(catalogMd);
  const appKeys = Array.from(app.CATALOG, c => c.key);
  assert.equal(docKeys.length, 62);
  assert.equal(appKeys.length, 62);
  assert.equal(new Set(appKeys).size, 62);
  assert.deepEqual(appKeys, docKeys);

  for (const reqKey of ["submariner", "bigben", "grandcentral", "mickey", "yachtmaster2"]) {
    assert.ok(app.FACE_MAP[reqKey], `Missing required catalog key: ${reqKey}`);
    assert.equal(typeof app.FACE_RENDERERS[reqKey], "function", `Missing renderer for ${reqKey}`);
  }
});

test("all 62 SVG renderers produce clean, balanced <svg> output across multiple times and dates", () => {
  const samples = [
    { year: 2026, month: 11, day: 13, monthShort: "NOV", weekday: "FRI", hour: 10, minute: 10, second: 36, ms: 0, offsetMin: -300 },
    { year: 2026, month: 1, day: 3, monthShort: "JAN", weekday: "SAT", hour: 12, minute: 0, second: 0, ms: 500, offsetMin: 0 },
    { year: 2026, month: 6, day: 21, monthShort: "JUN", weekday: "SUN", hour: 3, minute: 15, second: 45, ms: 250, offsetMin: 330 },
    { year: 2026, month: 9, day: 9, monthShort: "SEP", weekday: "WED", hour: 18, minute: 30, second: 12, ms: 750, offsetMin: 540 },
    { year: 2026, month: 12, day: 28, monthShort: "DEC", weekday: "MON", hour: 23, minute: 59, second: 59, ms: 900, offsetMin: 765 }
  ];

  for (const meta of app.CATALOG) {
    const renderer = app.FACE_RENDERERS[meta.key];
    assert.equal(typeof renderer, "function", `Missing FACE_RENDERERS[${meta.key}]`);
    for (const z of samples) {
      const svg = renderer(z);
      assert.equal(typeof svg, "string");
      assert.ok(svg.trim().startsWith("<svg"), `${meta.key} did not start with <svg`);
      assert.ok(svg.trim().endsWith("</svg>"), `${meta.key} did not end with </svg>`);
      assert.ok(!/\bNaN\b|\bundefined\b|\bnull\b/.test(svg), `${meta.key} produced invalid literal in SVG at ${z.hour}:${z.minute}`);
      const openCount = (svg.match(/<svg\b/g) || []).length;
      const closeCount = (svg.match(/<\/svg>/g) || []).length;
      assert.equal(openCount, 1, `${meta.key} should contain one <svg> root`);
      assert.equal(closeCount, 1, `${meta.key} should contain one </svg> close`);
    }
  }
});

test("all 15 chronographs include interactive pushers and chrono hands", () => {
  const chronos = app.CATALOG.filter(c => c.chrono);
  assert.equal(chronos.length, 15);
  const sample = { year: 2026, month: 11, day: 13, monthShort: "NOV", weekday: "FRI", hour: 10, minute: 10, second: 36, ms: 0, offsetMin: 0 };

  for (const meta of chronos) {
    const svg = app.FACE_RENDERERS[meta.key](sample);
    assert.ok(svg.includes('data-pusher="toggle"'), `${meta.key} missing toggle pusher`);
    assert.ok(svg.includes('data-pusher="reset"'), `${meta.key} missing reset pusher`);
    assert.ok(svg.includes('data-role="chrono-sec"'), `${meta.key} missing chrono-sec hand`);
  }
});

test("initial 12-city wall has unique cities and unique faces sorted west to east", () => {
  assert.equal(app.DEFAULT_WALL.length, 12);
  assert.equal(new Set(app.DEFAULT_WALL.map(w => w.cityId)).size, 12);
  assert.equal(new Set(app.DEFAULT_WALL.map(w => w.faceKey)).size, 12);

  const board = elementsById.get("board");
  assert.equal(board.children.length, 12);
  const offsets = board.children.map(card => app.getZonedParts(card.dataset.tz, new Date()).offsetMin);
  for (let i = 1; i < offsets.length; i++) {
    assert.ok(offsets[i] >= offsets[i - 1], `Expected west-to-east order, got ${offsets[i - 1]} before ${offsets[i]}`);
  }
});

test("city atlas covers 200+ cities including half-hour and quarter-hour offsets", () => {
  assert.ok(app.CITIES.length >= 200, `Expected 200+ cities, got ${app.CITIES.length}`);
  const refDate = new Date("2026-11-13T12:00:00Z");

  const expectedZones = [
    ["Asia/Kolkata", 330, "UTC+5:30"],
    ["Asia/Kathmandu", 345, "UTC+5:45"],
    ["Australia/Eucla", 525, "UTC+8:45"],
    ["America/St_Johns", -210, "UTC-3:30"],
    ["Pacific/Chatham", 825, "UTC+13:45"]
  ];

  for (const [tz, expectedMin, expectedLabel] of expectedZones) {
    assert.ok(app.CITIES.some(c => c.tz === tz), `Missing timezone ${tz} in CITIES`);
    const parts = app.getZonedParts(tz, refDate);
    assert.equal(parts.offsetMin, expectedMin, `Offset mismatch for ${tz}`);
    assert.equal(app.formatOffset(parts.offsetMin), expectedLabel);
  }
});

test("shuffleAllFaces and shuffleCardFace keep wall faces distinct", () => {
  const before = app.state.wall.map(w => w.faceKey);
  app.shuffleAllFaces();
  const afterAll = app.state.wall.map(w => w.faceKey);
  assert.equal(new Set(afterAll).size, 12);
  assert.notDeepEqual(afterAll, before);

  const prevFace = app.state.wall[0].faceKey;
  app.shuffleCardFace(0);
  const afterOne = app.state.wall.map(w => w.faceKey);
  assert.notEqual(afterOne[0], prevFace);
  assert.equal(new Set(afterOne).size, 12);
});

test("gallery tab renders all 62 faces and supports category filtering", () => {
  app.state.tab = "gallery";
  app.state.category = "All";
  app.state.search = "";
  app.renderBoard();
  const board = elementsById.get("board");
  assert.equal(board.children.length, 62);

  app.state.category = "Chronograph";
  app.renderBoard();
  assert.equal(board.children.length, 15);
});
