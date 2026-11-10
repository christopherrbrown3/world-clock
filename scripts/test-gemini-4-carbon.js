const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'versions/gemini-4-carbon.html'), 'utf8');
const catalogMd = fs.readFileSync(path.join(root, 'docs/watch-face-catalog.md'), 'utf8');

function parseExpectedCatalog() {
  const rows = [];
  for (const line of catalogMd.split(/\r?\n/)) {
    const m = line.match(/^\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|\s*`([^`]+)`\s*\|$/);
    if (m) rows.push({ key: m[1].trim(), name: m[2].trim(), cadence: m[3].trim() });
  }
  return rows;
}

function loadClockModule(storageInitial = null) {
  const scriptMatch = html.match(/<script>([\s\S]*?)<\/script>/i);
  assert.ok(scriptMatch, 'versions/gemini-4-carbon.html must contain an inline <script>');
  const store = new Map();
  if (storageInitial !== null) {
    store.set('world-clock.gemini-4-carbon.v1', storageInitial);
  }
  const context = {
    console,
    Intl,
    Date,
    Math,
    Number,
    String,
    Boolean,
    Array,
    Object,
    Set,
    Map,
    JSON,
    RegExp,
    performance: { now: () => 0 },
    localStorage: {
      getItem: (k) => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v))
    },
    window: {
      matchMedia: () => ({ matches: false })
    },
    document: {
      getElementById: () => null
    }
  };
  context.globalThis = context;
  vm.createContext(context);
  vm.runInContext(scriptMatch[1], context, { filename: 'versions/gemini-4-carbon.html' });
  assert.ok(context.Gemini4CarbonClock, 'Gemini4CarbonClock API must be exposed');
  return context.Gemini4CarbonClock;
}

const clock = loadClockModule();
const expectedCatalog = parseExpectedCatalog();

test('Gemini 4 Carbon matches all 62 catalog keys, names, order, and cadences', () => {
  assert.equal(expectedCatalog.length, 62);
  assert.equal(clock.FACE_KEYS.length, 62);
  expectedCatalog.forEach((exp, idx) => {
    const key = clock.FACE_KEYS[idx];
    assert.equal(key, exp.key, `Catalog index ${idx} key mismatch`);
    const face = clock.FACES[key];
    assert.ok(face, `Missing face ${key}`);
    assert.equal(face.name, exp.name, `Name mismatch for ${key}`);
    assert.equal(face.cadence, exp.cadence, `Cadence mismatch for ${key}`);
  });
});

test('All 62 SVGs render finite geometry and strictly instance-scoped <defs> across edge poses and lume', () => {
  const poses = [
    Date.UTC(2026, 10, 10, 10, 10, 31, 375),
    Date.UTC(2026, 0, 1, 0, 0, 0, 0),
    Date.UTC(2026, 2, 31, 3, 15, 45, 500),
    Date.UTC(2026, 6, 19, 6, 30, 15, 125),
    Date.UTC(2026, 11, 31, 23, 59, 58, 875)
  ];

  for (const key of clock.FACE_KEYS) {
    for (const lume of [false, true]) {
      for (let i = 0; i < poses.length; i++) {
        const uid = `inst-${key}-${i}-${lume ? 'L' : 'D'}`;
        const svg = clock.renderWatchSvg(key, uid, poses[i], 'UTC', { lume, chronoMs: 372500, chronoRunning: true });
        assert.ok(svg.startsWith('<svg ') && svg.endsWith('</svg>'), `${key} did not return valid <svg> wrapper`);
        assert.ok(!/\bNaN\b|\bundefined\b|\bInfinity\b|url\(##/.test(svg), `${key} emitted invalid token in SVG`);

        const definedIds = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
        for (const id of definedIds) {
          assert.ok(id.startsWith(`${uid}-`), `${key} defined non-scoped id "${id}" (expected prefix "${uid}-")`);
        }

        const urlRefs = [...svg.matchAll(/url\(#([^)]+)\)/g)].map(m => m[1]);
        for (const ref of urlRefs) {
          assert.ok(definedIds.has(ref), `${key} referenced missing url(#${ref})`);
        }

        const hrefRefs = [...svg.matchAll(/href="#([^"]+)"/g)].map(m => m[1]);
        for (const ref of hrefRefs) {
          assert.ok(definedIds.has(ref), `${key} referenced missing href="#${ref}"`);
        }
      }
    }
  }
});

test('All 62 timepieces visibly change their inner SVG geometry when time advances (not just aria-label)', () => {
  const t1 = Date.UTC(2026, 10, 10, 10, 10, 12, 0);
  const t2 = Date.UTC(2026, 10, 10, 14, 37, 46, 500);
  const stripRootAria = (s) => s.replace(/aria-label="[^"]*"/, '');

  for (const key of clock.FACE_KEYS) {
    const svg1 = stripRootAria(clock.renderWatchSvg(key, 'cmp', t1, 'UTC'));
    const svg2 = stripRootAria(clock.renderWatchSvg(key, 'cmp', t2, 'UTC'));
    assert.notEqual(svg1, svg2, `${key} inner SVG did not visibly change between 10:10:12 and 14:37:46.5`);
  }
});

test('Movement cadences (tick, sweep, glide, mondaine stop2go, 24h) obey authentic horological physics', () => {
  const sample = clock.resolveZoneTime(Date.UTC(2026, 10, 10, 10, 10, 30, 500), 'UTC');
  const kTick = clock.computeKinematics(sample, 'tick');
  const kSweep = clock.computeKinematics(sample, 'sweep');
  const kGlide = clock.computeKinematics(Object.assign({}, sample, { ms: 330 }), 'glide');
  const kSweep330 = clock.computeKinematics(Object.assign({}, sample, { ms: 330 }), 'sweep');

  assert.equal(kTick.secAngle, 180);
  assert.equal(kSweep.secAngle, 183);
  assert.notEqual(kGlide.secAngle, kSweep330.secAngle);

  // Mondaine stop2go: sweeps 0..360 in 58s and holds at 0 deg from 58.0s..59.999s
  const m29 = clock.computeKinematics(clock.resolveZoneTime(Date.UTC(2026, 10, 10, 10, 10, 29, 0), 'UTC'), 'mondaine');
  const m585 = clock.computeKinematics(clock.resolveZoneTime(Date.UTC(2026, 10, 10, 10, 10, 58, 500), 'UTC'), 'mondaine');
  const m595 = clock.computeKinematics(clock.resolveZoneTime(Date.UTC(2026, 10, 10, 10, 10, 59, 500), 'UTC'), 'mondaine');
  assert.ok(Math.abs(m29.secAngle - 180) < 0.01);
  assert.equal(m585.secAngle, 0);
  assert.equal(m595.secAngle, 0);
  assert.equal(m585.minAngle, 60);
});

test('Timezone engine handles DST shifts, fractional offsets, date-line rollover, and astronomical moonphase', () => {
  const winterNy = clock.resolveZoneTime(Date.UTC(2026, 0, 15, 12, 0, 0), 'America/New_York');
  const summerNy = clock.resolveZoneTime(Date.UTC(2026, 6, 15, 12, 0, 0), 'America/New_York');
  assert.equal(winterNy.offsetMinutes, -300);
  assert.equal(summerNy.offsetMinutes, -240);

  const kathmandu = clock.resolveZoneTime(Date.UTC(2026, 10, 10, 12, 0, 0), 'Asia/Kathmandu');
  assert.equal(kathmandu.offsetMinutes, 345);
  assert.equal(clock.formatUtcOffset(kathmandu.offsetMinutes), 'UTC+05:45');

  // New Year's Eve date-line test: Dec 31 2026 22:30 UTC -> Jan 1 2027 in Auckland (+13), Dec 31 in Honolulu (-10)
  const eveUtc = Date.UTC(2026, 11, 31, 22, 30, 0);
  const akl = clock.resolveZoneTime(eveUtc, 'Pacific/Auckland');
  const hnl = clock.resolveZoneTime(eveUtc, 'Pacific/Honolulu');
  assert.equal(akl.year, 2027);
  assert.equal(akl.month, 1);
  assert.equal(akl.day, 1);
  assert.equal(hnl.year, 2026);
  assert.equal(hnl.month, 12);
  assert.equal(hnl.day, 31);

  // Moonphase responds across half synodic cycle (~14.765 days)
  const mp1 = clock.renderWatchSvg('moonphase', 'm', eveUtc, 'UTC');
  const mp2 = clock.renderWatchSvg('moonphase', 'm', eveUtc + 14.765 * 86400000, 'UTC');
  assert.notEqual(mp1, mp2);
});

test('Board persistence preserves an intentionally empty board and recovers from corrupt JSON', () => {
  const emptyClock = loadClockModule(JSON.stringify({ version: 1, board: [], lume: true }));
  const stEmpty = emptyClock.loadPersistedState();
  assert.equal(Array.isArray(stEmpty.board), true);
  assert.equal(stEmpty.board.length, 0);
  assert.equal(stEmpty.lume, true);
  assert.equal(stEmpty.storageWarning, false);

  const corruptClock = loadClockModule('{not-json');
  const stCorrupt = corruptClock.loadPersistedState();
  assert.equal(stCorrupt.board.length, 8);
  assert.equal(stCorrupt.storageWarning, true);
});
