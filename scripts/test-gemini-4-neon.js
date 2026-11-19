const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "versions", "gemini-4-neon.html");
const catalogPath = path.join(root, "docs", "watch-face-catalog.md");

function loadAppContext() {
  const html = fs.readFileSync(htmlPath, "utf8");
  const scripts = [];
  const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html))) scripts.push(m[1]);
  assert.ok(scripts.length >= 1, "Expected at least one inline script");

  const store = new Map();
  const ctx = {
    console,
    Intl,
    Date,
    Math,
    Number,
    String,
    Array,
    Object,
    Set,
    Map,
    JSON,
    RegExp,
    Error,
    parseInt,
    parseFloat,
    isFinite,
    performance: { now: () => 0 },
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: (k) => store.delete(k)
    }
  };
  vm.createContext(ctx);
  vm.runInContext(scripts.join("\n") + "\nglobalThis.__APP__ = App;", ctx, { filename: "versions/gemini-4-neon.html" });
  ctx.App = ctx.__APP__;
  return { html, ctx, store };
}

function parseCatalog() {
  const md = fs.readFileSync(catalogPath, "utf8");
  const rows = [];
  for (const line of md.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$/);
    if (m) rows.push({ key: m[1].trim(), name: m[2].trim(), cadence: m[3].trim() });
  }
  return rows;
}

test("standalone HTML has valid structure and no external HTTP(S) asset links", () => {
  const { html } = loadAppContext();
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<title>World Clock — Gemini 4 Neon<\/title>/);
  const withoutXmlns = html.replace(/http:\/\/www\.w3\.org\/2000\/svg/g, "");
  assert.doesNotMatch(withoutXmlns, /https?:\/\//i, "Standalone rendition should not depend on external URLs");
});

test("matches all 62 catalog keys, names, order, and cadences exactly", () => {
  const { ctx } = loadAppContext();
  const expected = parseCatalog();
  const actualKeys = ctx.App.FACE_KEYS;
  assert.equal(actualKeys.length, expected.length);
  expected.forEach((row, i) => {
    const key = actualKeys[i];
    const face = ctx.App.FACES[key];
    assert.equal(key, row.key, `Index ${i} key mismatch`);
    assert.equal(face.name, row.name, `Face ${key} name mismatch`);
    assert.equal(face.cadence, row.cadence, `Face ${key} cadence mismatch`);
  });
});

test("all 62 SVG renderers produce finite geometry and strictly instance-scoped <defs> across edge poses", () => {
  const { ctx } = loadAppContext();
  const poses = [
    new Date("2026-11-19T10:10:36.250Z"),
    new Date("2026-11-19T12:00:00.000Z"),
    new Date("2026-11-19T03:15:12.500Z"),
    new Date("2026-11-19T06:30:45.750Z"),
    new Date("2026-12-31T23:59:59.000Z"),
    new Date("2024-02-29T00:01:05.000Z")
  ];

  for (const key of ctx.App.FACE_KEYS) {
    for (let p = 0; p < poses.length; p++) {
      const t = ctx.App.buildTimeState(poses[p], "UTC");
      const uid1 = `instA_${key}_${p}`;
      const svg1 = ctx.App.renderClockMarkup(key, t, uid1, { running: true, elapsedMs: 123456, regattaMinutes: 8 });
      assert.ok(svg1.startsWith("<svg ") && svg1.trim().endsWith("</svg>"), `${key} invalid SVG shell`);
      assert.doesNotMatch(svg1, /\bNaN\b|\bInfinity\b|\bundefined\b/, `${key} rendered invalid numeric/undefined token`);

      // Verify every id in <defs> uses uid1 prefix and does not collide with uid2
      const ids1 = [...svg1.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
      assert.ok(ids1.length > 0, `${key} expected scoped defs ids`);
      for (const id of ids1) {
        assert.ok(id.startsWith(uid1 + "-"), `${key} id "${id}" is not instance-scoped with "${uid1}-"`);
      }
      if (p === 0) {
        const uid2 = `instB_${key}_${p}`;
        const svg2 = ctx.App.renderClockMarkup(key, t, uid2, null);
        const ids2 = new Set([...svg2.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
        for (const id of ids1) {
          assert.ok(!ids2.has(id), `${key} duplicate id "${id}" across instances`);
        }
      }
    }
  }
});

test("all 62 timepieces visibly change their SVG geometry when time advances", () => {
  const { ctx } = loadAppContext();
  const t1 = ctx.App.buildTimeState(new Date("2026-11-19T10:10:00.000Z"), "UTC");
  const t2 = ctx.App.buildTimeState(new Date("2026-11-19T10:11:17.400Z"), "UTC");
  for (const key of ctx.App.FACE_KEYS) {
    const s1 = ctx.App.renderClockMarkup(key, t1, "same_uid", null);
    const s2 = ctx.App.renderClockMarkup(key, t2, "same_uid", null);
    assert.notEqual(s1, s2, `${key} did not visibly update when time changed`);
  }
});

test("movement cadences (tick, sweep, glide, mondaine stop2go) and chronographs obey authentic physics", () => {
  const { ctx } = loadAppContext();
  const tHalf = ctx.App.buildTimeState(new Date("2026-11-19T10:10:10.500Z"), "UTC");
  const tickM = ctx.App.computeCadenceMotion(tHalf, "tick");
  const sweepM = ctx.App.computeCadenceMotion(tHalf, "sweep", { hz: 8 });
  const glideM = ctx.App.computeCadenceMotion(tHalf, "glide");
  assert.equal(tickM.secDeg, 60);
  assert.equal(sweepM.secDeg, 63);
  assert.equal(glideM.secDeg, 63);

  const tSub = ctx.App.buildTimeState(new Date("2026-11-19T10:10:10.050Z"), "UTC");
  assert.equal(ctx.App.computeCadenceMotion(tSub, "sweep", { hz: 8 }).secDeg, 60);
  assert.ok(ctx.App.computeCadenceMotion(tSub, "glide").secDeg > 60);

  // Mondaine stop2go holds at 12 (0 deg) during 58.5..59.99s
  const tHold = ctx.App.buildTimeState(new Date("2026-11-19T10:10:59.200Z"), "UTC");
  const mHold = ctx.App.computeCadenceMotion(tHold, "mondaine");
  assert.equal(mHold.secDeg, 0);
  assert.equal(mHold.minDeg, 60);

  // Zenith El Primero 10-second 1/10s chrono completes 180 deg in 5s
  const cZenith = ctx.App.computeChronoAngles({ running: true, elapsedMs: 5000 }, "elprimero");
  assert.equal(cZenith.tenthDeg, 180);

  // Yacht-Master II counts down from 10 (-75 deg) to 5 (0 deg) to 0 (+75 deg)
  const cYm10 = ctx.App.computeChronoAngles({ running: false, elapsedMs: 0, regattaMinutes: 10 }, "yachtmaster2");
  const cYm5 = ctx.App.computeChronoAngles({ running: true, elapsedMs: 5 * 60000, regattaMinutes: 10 }, "yachtmaster2");
  const cYm0 = ctx.App.computeChronoAngles({ running: true, elapsedMs: 10 * 60000, regattaMinutes: 10 }, "yachtmaster2");
  assert.equal(cYm10.regattaDeg, -75);
  assert.equal(cYm5.regattaDeg, 0);
  assert.equal(cYm0.regattaDeg, 75);
});

test("timezone atlas covers 190+ cities with fractional offsets, DST, west-to-east sorting, and moonphase", () => {
  const { ctx } = loadAppContext();
  assert.ok(ctx.App.CITY_ATLAS.length >= 190, `Expected 190+ cities, got ${ctx.App.CITY_ATLAS.length}`);

  const winter = new Date("2026-01-15T12:00:00Z");
  const summer = new Date("2026-07-15T12:00:00Z");
  const nyW = ctx.App.buildTimeState(winter, "America/New_York");
  const nyS = ctx.App.buildTimeState(summer, "America/New_York");
  assert.equal(nyW.offsetMinutes, -300);
  assert.equal(nyS.offsetMinutes, -240);

  const kol = ctx.App.buildTimeState(winter, "Asia/Kolkata");
  const ktm = ctx.App.buildTimeState(winter, "Asia/Kathmandu");
  assert.equal(kol.offsetMinutes, 330);
  assert.equal(ktm.offsetMinutes, 345);

  const sorted = ctx.App.sortCitiesWestToEast([
    { cityId: "tokyo", faceKey: "snowflake" },
    { cityId: "honolulu", faceKey: "submariner" },
    { cityId: "new-york", faceKey: "grandcentral" },
    { cityId: "boston", faceKey: "tank" }
  ], winter);
  assert.deepEqual(Array.from(sorted.map(x => x.cityId)), ["honolulu", "boston", "new-york", "tokyo"]);

  const mNew = ctx.App.getMoonPhase(new Date("2026-11-09T12:00:00Z"));
  const mFull = ctx.App.getMoonPhase(new Date("2026-11-24T12:00:00Z"));
  assert.ok(Math.abs(mFull.angle - mNew.angle) > 120, "Moonphase should advance significantly over 15 days");
});

test("all 16 chronographs, digital stopwatches, and regatta timers expose interactive pushers", () => {
  const { ctx } = loadAppContext();
  const chronoKeys = ctx.App.FACE_KEYS.filter(k => ctx.App.FACES[k].chrono);
  assert.equal(chronoKeys.length, 16, `Expected 16 chronographs/stopwatches/regatta, got ${chronoKeys.length}`);
  const t = ctx.App.buildTimeState(new Date("2026-11-19T10:10:00Z"), "UTC");
  for (const key of chronoKeys) {
    const svg = ctx.App.renderClockMarkup(key, t, `ch_${key}`, null);
    assert.match(svg, /data-pusher="startstop"/, `${key} missing startstop pusher`);
    assert.match(svg, /data-pusher="reset"/, `${key} missing reset pusher`);
  }
});
