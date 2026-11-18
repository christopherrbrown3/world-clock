const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const vm = require('node:vm');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'versions/gpt-6.2-astra.html'), 'utf8');
const catalog = readFileSync(join(root, 'docs/watch-face-catalog.md'), 'utf8');
const source = html.match(/<script id="timepiece-engine">([\s\S]*?)<\/script>/)[1];
const engine = vm.runInNewContext(`${source}\n;({ artMarkup, civil, movementData, plates })`, {
  Intl,
  performance,
  matchMedia: () => ({ matches: false })
});
const rows = [...catalog.matchAll(/^\| `(\w+)` \| ([^|]+) \| `(\w+)` \|$/gm)];
const date = Date.parse('2028-03-01T04:59:59Z');

test('every catalog entry draws with local paint references and functioning time bindings', () => {
  const pieces = Object.keys(engine.plates);
  assert.deepEqual(pieces, rows.map(row => row[1]));
  const idsInOtherDrawings = new Set();

  for (const [, key, name, cadence] of rows) {
    assert.equal(engine.plates[key].fullName, name);
    assert.equal(engine.plates[key].cadence, cadence);
    const svg = engine.artMarkup(key);
    assert.doesNotMatch(svg, /NaN|undefined|<image\b/, key);
    const ids = new Set();
    for (const [, id] of svg.matchAll(/\bid="([^"]+)"/g)) {
      assert.ok(!ids.has(id) && !idsInOtherDrawings.has(id), `${key} repeated ${id}`);
      ids.add(id);
      idsInOtherDrawings.add(id);
    }
    for (const match of svg.matchAll(/url\(#([^)]+)\)|href="#([^"]+)"/g)) {
      assert.ok(ids.has(match[1] || match[2]), `${key} has an unresolved reference`);
    }
    // SVG clipPath children must be basic shapes, paths, text or use. A transformed
    // group here once clipped away the entire Nautilus dial, including the hands.
    assert.doesNotMatch(svg, /<clipPath\b[^>]*>\s*<g\b/, key);

    const time = engine.movementData(key, engine.civil('America/New_York', date), date, null);
    const channels = [...svg.matchAll(/data-(wheel|digits|field)="(\w+)"/g)];
    assert.ok(channels.length > 0, `${key} has no movement`);
    for (const [, type, channel] of channels) {
      if (type === 'wheel') assert.ok(Number.isFinite(time.wheels[channel]), `${key} ${channel}`);
      else assert.notEqual(time.fields[channel], undefined, `${key} ${channel}`);
    }
  }
  const next = engine.artMarkup('nautilus');
  for (const [, id] of next.matchAll(/\bid="([^"]+)"/g)) assert.ok(!idsInOtherDrawings.has(id));
});

test('calendar and GMT agree across local midnight, leap day and a DST transition', () => {
  const justBefore = engine.civil('America/New_York', date);
  const justAfter = engine.civil('America/New_York', date + 1000);
  assert.deepEqual([justBefore.mo, justBefore.d, justBefore.day, justBefore.h], [2, 29, 'Tue', 23]);
  assert.deepEqual([justAfter.mo, justAfter.d, justAfter.day, justAfter.h], [3, 1, 'Wed', 0]);
  const splitDate = (civilTime, instant) => {
    const { dateTens, dateOnes } = engine.movementData('richardmille', civilTime, instant, null).fields;
    return [dateTens, dateOnes];
  };
  assert.deepEqual(splitDate(justBefore, date), [2, 9]);
  assert.deepEqual(splitDate(justAfter, date + 1000), [0, 1]);
  const t = Date.parse('2028-03-12T07:00:00Z');
  const oldOffset = engine.civil('America/New_York', t - 1000).offset;
  const now = engine.civil('America/New_York', t);
  assert.deepEqual([oldOffset, now.offset, now.h], [-300, -240, 3]);
  const kathmandu = engine.civil('Asia/Kathmandu', t);
  assert.equal(kathmandu.offset, 345);
  assert.equal(engine.movementData('gmt', kathmandu, t, null).wheels.utc24, 7 * 15);
});

test('a regatta counts down counterclockwise and the Zenith counts tenths independently of civil seconds', () => {
  const local = engine.civil('UTC', date);
  function wheels(key, bank) {
    return engine.movementData(key, local, date, { length: 2, bank, started: null }).wheels;
  }
  assert.equal(wheels('yachtmaster2', 0).regattaMinutes, 60);
  assert.equal(wheels('yachtmaster2', 30000).regattaMinutes, 45);
  assert.equal(wheels('yachtmaster2', 31000).regattaSeconds, 29 * 6);
  assert.equal(wheels('yachtmaster2', 123000).regattaMinutes, 0);
  assert.equal(wheels('elprimero', 2500).chrono10, 90);
  assert.equal(wheels('elprimero', 0).second, 59 * 6);
});
