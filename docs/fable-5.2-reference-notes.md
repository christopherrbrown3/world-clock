# Claude Fable 5.2: reference and rendering notes

This rendition is a new standalone page, [`versions/fable-5.2.html`](../versions/fable-5.2.html). It was written from scratch for this entry: its own time engine, SVG drawing kit, interface and all 62 faces. It does not copy, extend or adapt any other model's page. No photographs are embedded; every timepiece is drawn as inline SVG when the page loads.

![All 62 Claude Fable 5.2 faces in catalog order, posed at 10:08:37](assets/fable-5.2-faces.png)

## The page

- **Cities.** The atlas has 136 cities. Search by city, country or zone name; arrow keys and Enter work in the suggestion list. Cards can be removed or given a new face, **Shuffle all faces** deals a distinct face to every city, and **Reset** restores the eight starting cities. Settings are saved in the browser's local storage. Cards are ordered by current UTC offset, west to east, with an alphabetical tie-break.
- **Sky.** Each card shows Daylight, Sunrise, Sunset, Dawn, Dusk or Night from the sun's elevation at that city, and tints the backdrop behind the watch to match.
- **Collection and inspection.** All 62 pieces run on local time in the collection, which can be filtered by group or searched. Opening a piece shows it large with its movement and notes. It can be posed at fixed times, at a month end, or at the next full moon, shown in any city on the board, and assigned to that city. `#piece=<key>` in the address opens a piece directly.
- **Chronographs.** Fifteen pieces have working chronographs in the inspector, with start, stop and reset.
- **Time.** Local time comes from the browser's `Intl` time-zone data. Each face moves at its catalog cadence:
  - `sweep`: the seconds hand steps at the calibre's beat rate, from 21,600 to 36,000 vph.
  - `tick`: quartz watches and clocks step once a second.
  - `glide`: the Spring Drive and the Apple Watch move continuously.
  - `digital`: every LCD segment is drawn and switched individually.
  - `mondaine`: a 58.5-second sweep, a pause at twelve, and a jumping minute hand.
  - With `prefers-reduced-motion`, sweeping and gliding hands step once a second and pendulums rest.
- **Drawing.** Each face is two stacked SVG layers: the object itself, and the moving parts with the crystal above them. Hands cast one soft shadow in screen space, so the shadow does not turn with the hand. Brushed metal, grained dials, leather and the Snowflake texture are SVG turbulence and lighting filters; sunray dials are fans of fine wedges.

![The Claude Fable 5.2 page at desktop width](assets/fable-5.2-desktop.png)

[Phone width](assets/fable-5.2-mobile.png) · [Inspection view](assets/fable-5.2-inspection.png)

## References

The supplied photo archive has images for 35 of the 62 catalog objects. For those, case shape, bezel, dial printing, hands and bracelet or strap were checked against the photographs, with close crops where orientation mattered:

`submariner`, `speedmaster`, `nautilus`, `royaloak`, `seamaster`, `daytona`, `gmt`, `datejust`, `snowflake`, `f1`, `seiko5`, `richardmille`, `blackbay58`, `navitimer`, `overseas`, `bigbang`, `twinbell`, `orloj`, `marine`, `freak`, `patek`, `explorer`, `santos`, `bigpilot`, `typexx`, `carrera`, `snoopy`, `milgauss`, `yachtmaster2`, `jorggray`, `rainbow`, `nomosmetro`, `grandcentral`, `howardmiller` and `mickey`.

One example of what the crops settled: dive-bezel numerals. Rolex, Tudor and Seiko set every numeral with its top outward except an upright 30; the Seamaster 300M and the GMT-Master II bezel turn every numeral outward, so 30 and 12 read inverted at six o'clock.

The other 27 folders are empty. For eight of those, public product and auction photographs were looked up before drawing:

- `lange1`: the placement of the arced signature, outsize date, AUF/AB scale and small seconds.
- `calatrava`: the 5227G-015's rose-gilt dial with charcoal markers and hands.
- `gshock`: the DW-5600UE-1 face printing, including the gold button legends and red-framed SHOCK RESIST.
- `f91w`, `casiomq24`, `timexindiglo`: dial layout and colours.
- `bigtic`: the pebble case, black LCD dial and oversize seconds digits.
- `railroad`: the 1994 limited edition's Roman numerals, red 13–24 ring, inner track, NS mark and train.

The remaining nineteen were drawn from the catalog entry and published descriptions of the object: `tank`, `reverso`, `portugieser`, `apple`, `swatch`, `braun`, `mondaine`, `monaco`, `panerai`, `bigben`, `moonphase`, `elprimero`, `prx`, `khaki`, `br03`, `grandfather`, `fiftyfathoms`, `radiomir` and `kingkhaki`.

## Variant choices

Every face keeps its catalog name and cadence. Where the catalog names a family, or the supplied photographs show a different reference, this is what is drawn. The inspector states the drawn reference.

| Key | Catalog label | Drawn as |
| --- | --- | --- |
| `nautilus` | 5811/1G-001 | 5711/1A-018 “Tiffany Blue”, as in the supplied photographs. |
| `gmt` | GMT-Master II | 126710BLRO “Pepsi” on a Jubilee bracelet. |
| `datejust` | Datejust | Datejust 41 126334: bright blue dial, fluted bezel, Jubilee. |
| `daytona` | Daytona | 126500LN with the white dial. |
| `seamaster` | Seamaster Diver 300M | 210.30.42.20.03.001, blue ceramic wave dial. |
| `snowflake` | Grand Seiko Snowflake | SBGA211. |
| `lange1` | Lange 1 | 191.032, pink gold with argenté dial. |
| `portugieser` | IWC Portugieser | Portugieser Chronograph IW371605. |
| `reverso` | Jaeger-LeCoultre Reverso | Reverso Classic Monoface Small Seconds. |
| `moonphase` | Villeret Quantième Complet | 6654 in steel with a white dial. |
| `navitimer` | B01 Chronograph 43 | AB0138211B1P1: black dial, silver counters, alligator strap. |
| `monaco` | Monaco Calibre 11 | CAW211P, blue dial. |
| `marine` | 1182-310/42 | The white-dial Torpilleur on bracelet, 1183-310-7M/40, as photographed. |
| `bigbang` | Unico Red Magic 42 | Red ceramic colourway on the Unico 42 layout shown in the photographs, which are of other colourways. |
| `richardmille` | RM 011 Felipe Massa | The titanium RM 011 FM with a blue strap, as photographed. |
| `freak` | Freak X Carb | The photographed Freak X layout, with marbled Carbonium on the case. |
| `yachtmaster2` | 126680 | The later dial with a Mercedes hour hand and a triangle at twelve. |
| `blackbay58` | M79030N | Gilt dial with the chronometer lines of the M79030N; some supplied photographs show the later Master Chronometer. |
| `seiko5` | SRPD51 | Blue “5KX”; most supplied photographs show other Seiko 5 Sports models and were used for case, bezel and hand shapes. |
| `howardmiller` | Chateau 610-520 | A Howard Miller arched moon dial of the kind photographed; the supplied photographs show several models. |
| `grandfather` | Musée du Temps longcase, c. 1850 | A Comtoise of that family, not a specific museum piece. The Besançon signature is illustrative. |

## Intentional approximations

- **Character art.** The Ingersoll figure is an original drawing in the public-domain pie-eyed style of 1928–30, not a tracing of the 1933 dial art. The Silver Snoopy medallion is a simplified silver relief, not the cartoon artwork.
- **Marks.** Brand marks are simplified: the coronet, shield, wings, anchor, Maltese cross, Secret Service star and the Norfolk Southern mark are drawn as plain shapes, and wordmarks use system typefaces. No fonts are embedded, so blackletter and script lettering falls back to whatever the device has.
- **Power reserves** are illustrative, because a browser cannot know a mainspring's state. The Snowflake, Lange 1, Torpilleur and NOMOS indicators drain through the local day.
- **Moon phase** follows the mean synodic month on the Villeret, the Patek, the Howard Miller and the Orloj.
- **Prague Orloj.** The sun hand shows 24-hour local mean time, not true solar time. The zodiac ring uses a linear ecliptic longitude from the day of the year. The Old Czech ring is set from an approximate Prague sunset whatever city is shown. The calendar plate, apostles and sculptures are not drawn.
- **GMT-Master II.** The 24-hour hand reads UTC against the bezel, which stays at its home position.
- **Chronographs.** Minute and hour counters creep continuously. On the Chronomaster Sport the central hand makes one turn in ten seconds. The Yacht-Master II countdown runs from ten to zero when its chronograph is started.
- **Patek 5270.** The day/night aperture switches at 06:00 and 18:00, and the leap-year aperture shows the year's position in the four-year cycle.
- **Apple Watch.** The Activity rings fill through the local day. The temperature and corner complications are decoration.
- **Freak X.** The carrousel turns once an hour as the minute hand and the balance swings at a simplified rate.
- **Jorg Gray.** The centre hand is the chronograph seconds, with running seconds at six and a 24-hour register at three.
- **Clocks.** Big Ben shows one dial with stylised stonework. The Howard Miller and the Comtoise show the hood and the top of the trunk, so the dial stays legible and the pendulum is visible.
- **Cases** are drawn from the front only. Bracelets and straps fade out at the top and bottom of the frame.

## Validation

- `npm test` passes.
- All 62 faces match the catalog's key order, names and cadences.
- A scripted run in headless Chrome passed all 31 checks on the page: west-to-east ordering with an alphabetical tie-break, adding cities by click and by keyboard, removal, shuffle all, single shuffle, distinct faces across twenty cities, saved state, collection filtering, inspector poses, chronograph start, stop and reset, assigning a face to a city, and reset.
- All 62 faces were rendered and reviewed at 10:08:37, at 12:00 on 31 December, and at 06:30 on 5 December, covering stacked hands, lower-dial text, and single- and double-digit dates with day and month windows.
- Checked in a browser at desktop width and at 375 px: hands advance on their own, a phone gets one column with no horizontal overflow, the inspector scrolls inside the viewport, and the console stays clean. The board and the collection both held 60 frames per second.
- Not tested: Safari and Firefox, and the reduced-motion path, which was only read through in code.
