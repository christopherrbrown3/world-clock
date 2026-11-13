# Gemini 4 Hydrogen — Reference & Approximation Notes

`versions/gemini-4-hydrogen.html` is a clean-room, standalone World Clock implementation (**Hydrogen Observatory**) authored from scratch for **Gemini 4 Hydrogen**. It shares no runtime code, CSS, or SVG geometry with any other model rendition or the active development build.

## Architecture & Core Capabilities

- **Zero-dependency standalone page**: Inline CSS, inline SVG artwork, and an encapsulated ES module-style IIFE (`<script>`) with zero external network requests or asset URLs.
- **Timezone & solar engine**: Uses `Intl.DateTimeFormat` (`en-US`, `hourCycle: "h23"`) across a 205-city global atlas (`CITIES`), supporting full-hour, half-hour (`Asia/Kolkata`, `Asia/Tehran`, `Asia/Kabul`, `Asia/Yangon`, `America/St_Johns`, `Australia/Darwin`, `Australia/Adelaide`, `Australia/Lord_Howe`, `Pacific/Marquesas`), and quarter-hour (`Asia/Kathmandu`, `Australia/Eucla`, `Pacific/Chatham`) UTC offsets, with west-to-east sorting by live UTC offset.
- **Solar meridian & sky phases**: A live 24-hour solar meridian strip marks the active wall cities across midnight, dawn, daylight, dusk, and night bands, mirrored by subtle per-card sky-phase accents.
- **Instance-scoped SVG horological kit**: Helper primitives (`uid()`, `polar()`, `dialTicks()`, `steelCaseDefs()`, `dauphineHand()`, `batonHand()`, `cathedralHand()`, `snowflakeHand()`, `mercedesHand()`, `syringeHand()`, `breguetHand()`, `crownAndGuards()`, `braceletLugs()`) generate unique `<defs>` gradient, filter, and clip-path IDs per rendered SVG instance so multiple cards sharing a face never collide.
- **Interactive features**:
  - 12-city live World Wall with add/remove city modal (`City Atlas`), per-card shuffle, global duplicate-free `Shuffle All`, 12H/24H toggle, and `10:10:36` studio pose toggle.
  - Global **Lume Study** (`document.documentElement.dataset.lume`) dimming ambient dial surfaces and illuminating Swiss Super-LumiNova (BGW9 blue, C3 green), Chromalight, Tritium/patina radium, and electroluminescent Indiglo / Timex / Casio backlights.
  - Full 62-piece **Collection** view with instant text search, category filter chips (`All`, `Dive`, `Chronograph`, `Dress`, `Sport`, `Tool`, `Digital`, `Quartz`, `Monument`), and preview timezone selector.
  - **Loupe Inspection Modal** with enlarged live watch stage, face/city switching, and interactive chronograph pushers.

## Reference Coverage Across the 62 Timepieces

All 62 keys from [the watch face catalog](watch-face-catalog.md) are rendered individually:

- **Dive & Maritime**:
  - `submariner` (126610LN): Ceramic bezel with platinum-toned graduation, luminous zero pip, Maxi plots, Mercedes hands, Cyclops date aperture at 3.
  - `seamaster` (300M): Laser-engraved wave-pattern dial, skeletonized broad-sword hands, helium escape valve at 10, scalloped 12-sided bezel, 6 o'clock date.
  - `blackbay58` (M79030N): Matte black gilt dial, gilt minute track, burgundy/gilt triangle bezel pip, Snowflake hour hand, rivet-style lug profile.
  - `fiftyfathoms`: Domed sapphire-look bezel ring with luminous cardinal numerals, syringe hands, radial brushed dark dial, 4:30 date window.
  - `panerai` (Luminor Marina) & `radiomir`: Cushion/wire-lug cases, sandwich-style luminous Arabic numerals and baton markers, small seconds at 9, signature crown-guard bridge on the Luminor.
  - `yachtmaster2`: Bidirectional Ring Command blue bezel, 10-minute regatta countdown arc (`data-role="regatta-min"`) with red-tipped triangle hand, small seconds at 6.
- **Chronographs (15 interactive stopwatches)**:
  - `speedmaster`, `daytona` (126500LN panda), `portugieser`, `monaco` (Calibre 11 square left-crown case), `richardmille` (tonneau skeletonized case), `navitimer` (reverse-panda dial with slide-rule scale), `elprimero` (tri-color overlapping registers and ceramic tachymeter), `bigbang` (Unico Red Magic skeletonized dial), `patek` (5270J perpetual chronograph with day/month/moonphase), `typexx` (Breguet flyback syringe hands and cathedral bezel), `carrera` (Calibre 16 tachymeter), `snoopy` (Silver Snoopy 50th blue-on-silver dial with Snoopy astronaut medallion at 9), `jorggray` (JG6500 presidential chronograph), `rainbow` (pavé sapphire rainbow bezel and diamond-set lugs).
  - Each chronograph supports live start/pause (`[data-pusher="toggle"]`) and reset (`[data-pusher="reset"]`) both directly on the watch pushers and via the Loupe controls.
- **Dress, Complications & Iconics**:
  - `calatrava` (hobnail Clous de Paris bezel, dauphine hands, small seconds), `tank` (brancard case, blued steel swords, Roman railtrack, sapphire cabochon), `reverso` (rectangular gadroon frame, guilloché inner rectangle), `lange1` (asymmetric main dial, oversized outsize date twin-aperture, up/down power reserve, small seconds), `moonphase` (Blancpain Villeret triple-calendar with pointer date, day/month windows, and animated lunar disc), `milgauss` (green-tinted crystal edge, lightning-bolt orange seconds hand), `explorer` (3-6-9 dial, Mercedes hand), `datejust` (fluted bezel, Jubilee-link lugs, baton markers, Cyclops date), `gmt` (Pepsi red/blue 24h bezel, independent 24-hour GMT arrow hand), `snowflake` (textured white-frost dial, blued-steel sweep seconds hand), `nautilus` (5811/1G horizontal-embossed blue dial, porthole ears), `royaloak` (octagonal 8-screw bezel, Grande Tapisserie grid), `overseas` (Maltese-cross-inspired 6-notched bezel), `santos` (square exposed-screw bezel), `prx` (integrated barrel case with waffle tapisserie), `freak` (central flying carousel minute bridge and planetary gear ring), `nomosmetro` (wire lugs, cyan/red mint dots, power reserve indicator), `marine` (enamel-white dial, Breguet pomme hands, power reserve & 6 o'clock date).
- **Field, Pilot & Tool**:
  - `khaki` (24-hour inner military ring, syringe hands), `kingkhaki` (12 o'clock curved day-of-week window + date), `bigpilot` (conical diamond crown, triangle-dot index at 12, 7-day power reserve at 3), `br03` (square 4-screw cockpit bezel, stencil 12/3/6/9), `f1` (TAG Heuer red/green shield emblem, notched bezel), `railroad` (Hamilton pocket watch with bow/crown at 12, heavy Arabic numerals, red 24h inner track), `braun` (BN0021 Bauhaus matte dial, yellow lollipop seconds hand), `mondaine` (SBB Swiss railway dial with red lollipop seconds hand moving in authentic Stop2Go 58.5s sweep + 1.5s top-of-minute pause).
- **Digital, Smart, Quartz & Character**:
  - `gshock` (DW-5600 octagonal resin bezel, 7-segment LCD weekday, date, time, seconds, EL backlight), `f91w` (blue/yellow trim, 7-segment LCD with `24H` and alarm/chime icons), `apple` (rounded-rectangle aluminum case, digital crown, Activity Analog concentric rings + corner sub-dials), `swatch` (transparent-look pastel/primary Swatch dial), `seiko5` (day/date at 3, 4 o'clock crown), `casiomq24` (slim resin minimalist case), `bigtic` (Fossil animated LCD seconds digit backdrop behind analog hands), `timexindiglo` (cream dial with full-dial cyan-green Indiglo toggle under Lume Study), `mickey` (classic Ingersoll-style articulated yellow-gloved Mickey arms as hour/minute hands).
- **Monumental & Table Clocks**:
  - `bigben` (Elizabeth Tower Gothic tracery dial, Roman numerals, lancet hands), `grandcentral` (opal-glass four-faced brass sphere clock topped with acorn finial), `orloj` (Prague Astronomical Clock zodiac ring, solar/lunar ecliptic pointers, horizon shading), `grandfather` (walnut-and-brass bonnet, moonphase arch, oscillating brass pendulum), `howardmiller` (Chateau 610-520 brass lyre pendulum and triple-chime dial accents), `twinbell` (chrome twin-bell tabletop alarm with hammer striker and luminous hands).

## Movement Cadences & Intentional Approximations

- **Cadences**: `glide` (continuous sub-second sweep for Spring Drive / Grand Seiko Snowflake and electric clocks), `sweep` (8 beats/sec mechanical sweep at 28,800 vph), `mondaine` (58.5s continuous sweep followed by a 1.5s pause at 12:00), `tick` (1 Hz quartz/deadbeat step), and `digital` (whole-second LCD switch).
- **Moonphase**: Computed from a 29.53058867-day synodic cycle anchored to a known new moon epoch (`2000-01-06T18:14:00Z`), providing smooth visual age progression rather than ephemeris-grade lunar parallax.
- **Mechanical accents**: Tourbillon/balance cages, power-reserve gauges, and Big Bang / Richard Mille bridge layers are illustrative static mechanical backdrops beneath live moving hands and chronograph registers.
- **Timezone data**: Driven entirely by the browser's `Intl.DateTimeFormat` IANA timezone database (`tzdb`), including live DST transitions.

## Verification

- `node --test scripts/test-gemini-4-hydrogen.js` — Validates catalog parity (62/62 keys matching `docs/watch-face-catalog.md`), syntax, zero external URLs, valid `<svg>` output across multiple timestamps and offsets, all 15 chronographs, 205-city atlas including quarter-hour/half-hour offsets, west-to-east sorting, duplicate-free shuffling, and gallery filtering.
- Headless Playwright browser verification at desktop (`1440×900`) and mobile (`390×844`) viewports confirming zero console/page errors, zero horizontal overflow, working search, category filters, city add/remove, shuffle, Lume Study, 10:10:36 pose, 12H/24H toggle, loupe modal, working chronograph stopwatch, and non-zero SVG bounding boxes across all 62 faces.
