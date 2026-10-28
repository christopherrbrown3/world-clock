const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "versions/copilot-fusion-max.html"), "utf8");
const source = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const boundary = source.indexOf("  let board=readCities()");
assert.ok(boundary > 0, "The standalone renderer must remain available to regression tests.");

function loadClock(saved = null) {
  const warnings = [];
  const context = vm.createContext({
    Intl,
    Date,
    console: { warn: (...args) => warnings.push(args) },
    document: { getElementById: () => ({}) },
    localStorage: { getItem: () => saved }
  });
  vm.runInContext(
    `${source.slice(0, boundary)}
    globalThis.clock = { faces, makeSvg, timeFor, utcOffset, handAngles, moonPhase, readCities };
    })();`,
    context,
    { filename: "copilot-fusion-max-renderer.js" }
  );
  return { ...context.clock, warnings };
}

test("the independent rendition matches every catalog identity and cadence", () => {
  const { faces } = loadClock();
  const catalog = fs.readFileSync(path.join(root, "docs/watch-face-catalog.md"), "utf8");
  const expected = [...catalog.matchAll(/^\| `([^`]+)` \| (.*?) \| `([^`]+)` \|$/gm)]
    .map(([, key, name, cadence]) => ({ key, name, cadence }));
  const actual = JSON.parse(JSON.stringify(faces.map(({ key, name, cadence }) => ({ key, name, cadence }))));
  assert.equal(actual.length, 62);
  assert.deepEqual(actual, expected);
});

test("all 62 timepieces change their visible clock, not only their accessible label", () => {
  const { faces, makeSvg } = loadClock();
  const drawing = (face, hour, minute) => makeSvg(face, { hour, minute, second: 0 })
    .replace(/^<svg[^>]*>/, "");
  for (const face of faces) {
    assert.notEqual(drawing(face, 0, 0), drawing(face, 6, 30), `${face.key} must keep time`);
    if (!["gshock", "f91w", "apple"].includes(face.key)) {
      assert.match(drawing(face, 3, 15), /data-hand="(?:hour|gmt)"/, `${face.key} hour indication`);
      assert.match(drawing(face, 3, 15), /data-hand="minute"/, `${face.key} minute indication`);
    }
  }
});

test("all faces render finite geometry with instance-local SVG references at edge poses", () => {
  const { faces, makeSvg } = loadClock();
  const ids = new Set();
  for (const face of faces) {
    for (const [hour, minute, date] of [[0, 0, 1], [3, 15, 9], [6, 30, 12], [10, 10, 28], [12, 0, 30], [23, 59, 31]]) {
      const svg = makeSvg(face, { hour, minute, second: 59, date, month: 10, year: 2026 }, {
        instance: `test-${face.key}-${hour}`
      });
      assert.doesNotMatch(svg, /\b(?:NaN|undefined|Infinity)\b/, face.key);
      const localIds = [...svg.matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id);
      assert.equal(localIds.length, new Set(localIds).size, `${face.key} duplicate IDs`);
      for (const id of localIds) {
        assert.ok(!ids.has(id), `ID collision: ${id}`);
        ids.add(id);
      }
      for (const [, id] of svg.matchAll(/url\(#([^)]+)\)/g)) {
        assert.ok(localIds.includes(id), `${face.key} unresolved SVG reference: ${id}`);
      }
    }
  }
});

test("skeleton chronographs retain open bridges, distinct register layouts, and live dates", () => {
  const { faces, makeSvg } = loadClock();
  for (const [key, registers, fasteners] of [["richardmille", 3, 10], ["bigbang", 2, 6]]) {
    const face = faces.find(item => item.key === key);
    const svg = makeSvg(face, { hour: 3, minute: 15, date: 31 });
    assert.match(svg, /data-part="openwork"/);
    assert.equal((svg.match(/data-part="gear"/g) || []).length, 5);
    assert.equal((svg.match(/data-part="chronograph-register"/g) || []).length, registers);
    assert.equal((svg.match(/data-part="bezel-fastener"/g) || []).length, fasteners);
    assert.match(svg, />31<\/text>/);
    assert.match(svg, /data-hand="second" data-pivot="11[34] (?:157|160)"/);
  }
});

test("digital cases have no analog markers and preserve their separate resin silhouettes", () => {
  const { faces, makeSvg } = loadClock();
  const shock = faces.find(face => face.key === "gshock");
  const slim = faces.find(face => face.key === "f91w");
  assert.notEqual(shock.shape, slim.shape);
  for (const face of [shock, slim]) {
    const svg = makeSvg(face, { hour: 23, minute: 59, second: 58, date: 31 });
    const drawing = svg.split("</defs>")[1];
    assert.doesNotMatch(drawing, /<circle|lume-plot|data-hand=/);
    assert.match(drawing, />23:59<\/text>/);
    assert.match(drawing, />58<\/text>/);
    assert.match(drawing, /data-part="lcd"/);
  }
  assert.match(makeSvg(shock), /data-part="resin-bumper"/);
  assert.match(makeSvg(slim), /data-part="blue-bezel-outline"[^>]+stroke="#2c82bd"/);
});

test("Grand Central has an opal Arabic dial and Nautilus keeps its porthole and date", () => {
  const { faces, makeSvg } = loadClock();
  const terminal = faces.find(face => face.key === "grandcentral");
  assert.equal(terminal.kind, "simple");
  assert.equal(terminal.dial, "#fff1cb");
  const terminalSvg = makeSvg(terminal);
  assert.match(terminalSvg, /data-part="gilt-frame"/);
  assert.match(terminalSvg, />12<\/text>/);
  assert.doesNotMatch(terminalSvg, />XII<\/text>|data-hand="second"/);
  const nautilus = makeSvg(faces.find(face => face.key === "nautilus"), { date: 9 });
  assert.match(nautilus, /data-part="porthole-case"/);
  assert.match(nautilus, />9<\/text>/);
  assert.doesNotMatch(nautilus, /M92 44Q68 45/);
});

test("city dial dates and weekdays follow the city's date across month and year boundaries", () => {
  const { faces, makeSvg, timeFor } = loadClock();
  const submariner = faces.find(face => face.key === "submariner");
  const timex = faces.find(face => face.key === "timexindiglo");
  const midnight = new Date("2026-03-01T04:30:00Z");
  const newYork = timeFor("America/New_York", midnight);
  const tokyo = timeFor("Asia/Tokyo", midnight);
  assert.equal(newYork.day, "28");
  assert.equal(tokyo.day, "01");
  assert.match(makeSvg(submariner, newYork), />28<\/text>/);
  assert.match(makeSvg(submariner, tokyo), />01<\/text>/);
  assert.match(makeSvg(timex, newYork), />Sat<\/text>/);
  assert.match(makeSvg(timex, tokyo), />Sun<\/text>/);
  assert.equal(timeFor("Asia/Tokyo", new Date("2026-12-31T23:59:59Z")).year, "2027");
});

test("UTC offsets include DST, fractional zones, and date-line crossings", () => {
  const { utcOffset } = loadClock();
  const winter = new Date("2026-01-15T23:59:59.999Z");
  const summer = new Date("2026-07-15T00:00:00Z");
  assert.equal(utcOffset("America/New_York", winter), -300);
  assert.equal(utcOffset("America/New_York", summer), -240);
  assert.equal(utcOffset("Europe/London", winter), 0);
  assert.equal(utcOffset("Europe/London", summer), 60);
  assert.equal(utcOffset("Asia/Kolkata", winter), 330);
  assert.equal(utcOffset("Asia/Kathmandu", winter), 345);
  assert.equal(utcOffset("Pacific/Kiritimati", winter), 840);
});

test("tick, sweep, glide, railway hold, and 24-hour hands have distinct correct motion", () => {
  const { handAngles } = loadClock();
  assert.equal(handAngles(10.24, "tick").second, 60);
  assert.equal(handAngles(10.24, "sweep").second, 60.75);
  assert.ok(Math.abs(handAngles(10.24, "glide").second - 61.44) < 1e-8);
  assert.equal(handAngles(59, "mondaine").second, 360);
  assert.equal(handAngles(59, "mondaine").minute, 0);
  assert.equal(handAngles(60, "mondaine").second, 0);
  assert.equal(handAngles(60, "mondaine").minute, 6);
  assert.equal(handAngles(3 * 3600 + 15 * 60, "sweep").gmt, 48.75);
  assert.equal(handAngles(86400, "glide").hour, 0);
});

test("calendar moon discs respond to astronomical phase rather than remaining decorative", () => {
  const { faces, makeSvg, moonPhase } = loadClock();
  const epoch = Date.UTC(2000, 0, 6, 18, 14);
  assert.equal(moonPhase(epoch), 0);
  assert.ok(Math.abs(moonPhase(epoch + 29.530588853 * 86400000 / 2) - 0.5) < 1e-8);
  for (const key of ["moonphase", "patek"]) {
    const face = faces.find(item => item.key === key);
    const moon = timestamp => makeSvg(face, { timestamp }).match(/<g data-part="moon">([\s\S]*?)<\/g>/)[1];
    assert.notEqual(moon(epoch), moon(epoch + 14 * 86400000));
  }
});

test("an intentionally empty saved board stays empty and invalid saved data is reported", () => {
  assert.equal(loadClock("[]").readCities().length, 0);
  const clock = loadClock('[{"name":"Nowhere","zone":"invalid","face":"submariner"}]');
  assert.equal(clock.readCities().length, 6);
  assert.equal(clock.warnings.length, 1);
});
