# GPT 6.1 Sol reference and rendering notes

[Open the rendition](../versions/gpt-6.1-sol.html) · Snapshot: **September 29, 2026**

This entry was authored from an empty file. Its interface, city atlas, time engine, SVG helpers, and 62 drawing functions were written independently. No earlier model page was used as an implementation source, and no earlier model page or active build was changed.

## Reference coverage

The supplied photograph collection had images in 35 of the 62 object groups. Those photographs were inspected in contact sheets and close-ups. The remaining 27 groups were researched with public manufacturer, dealer, auction, owner, and museum photographs. The archive also includes different generations and colorways within some groups; a nearby photograph was used for construction details rather than silently replacing the catalog reference.

The table below records the chosen rendition and the details studied. **Local** means that the supplied group contained photographs; it does not mean that every photograph showed the exact catalog reference. **Public** means that the supplied group was empty. Photographs are research material only. The shipped faces contain no bitmap images, embedded reference photos, external fonts, or network dependencies.

## Objects and variant choices

| Key | Reference chosen | Photo coverage and drawing details |
| --- | --- | --- |
| `submariner` | Rolex Submariner Date 126610LN | Local. Black ceramic bezel, elapsed scale, luminous white-gold surrounds, Mercedes handset, crown guards, Oyster links and Cyclops. |
| `speedmaster` | Omega Moonwatch 310.30.42.50.01.001 | Local. Steel bracelet, black stepped dial, tachymeter, three counters, pump pushers and running seconds at nine. |
| `nautilus` | Patek Philippe 5811/1G-001 | Local + public. Blue horizontal embossing, porthole ears, rounded octagonal opening, white-gold links and framed date; Tiffany-blue 5711 photos were not used as the target colorway. |
| `royaloak` | Audemars Piguet 15510ST.OO.1320ST.06 | Local + [manufacturer](https://www.audemarspiguet.com/en/watch-collection/royal-oak/15510ST.OO.1320ST.06). Blue Grande Tapisserie, octagonal bezel, eight slotted screws and integrated bracelet. |
| `calatrava` | Patek Philippe 5227G-015 | Public, [manufacturer](https://www.patek.com/en/collection/calatrava/5227g-015). Rose-gilt opaline dial, dark markers and hands, white-gold case, date at three and brown leather. |
| `tank` | Cartier Tank Louis Cartier WGTA0342 | Public, [manufacturer](https://www.cartier.com/en-ca/watches/collections/tank/tank-louis-cartier-watch-CRWGTA0342.html). Small yellow-gold quartz interpretation, long brancards, silver Roman dial, rectangular railway track and blue cabochon. |
| `reverso` | Jaeger-LeCoultre Q3858522 interpretation | Public, [dealer photographs](https://www.chrono24.co.id/jaegerlecoultre/jaeger-lecoultre-new-2025-reverso-classic-monoface-small-seconds-q3858522--id43125422.htm). Triple gadroons, rectangular Arabic scale, guilloché center, square small seconds and blued hands. |
| `seamaster` | Omega 210.30.42.20.03.001 interpretation | Local. Blue ceramic waves, five-link bracelet, scalloped dive bezel, helium valve, skeleton hands and six o’clock date. |
| `lange1` | A. Lange & Söhne 191.032 interpretation | Public, [manufacturer](https://www.alange-soehne.com/eu-de/timepieces/lange-1/lange-1/lange-1-in-750-pink-gold-191-032). Pink gold, off-center time, outsize double date, right reserve and lower-right seconds. |
| `portugieser` | IWC IW371605 interpretation | Public, [manufacturer](https://www.iwc.com/ww-en/watches/portugieser/iw371605-portugieser-chronograph). Silver dial with blue numerals, hands and strap; vertically opposed counters and quarter-second chapter. |
| `daytona` | Rolex 126500LN white-dial interpretation | Local. Dark counter rings, black ceramic tachymeter, luminous batons, polished center links and three-register layout. |
| `gmt` | Rolex 126710BLRO interpretation | Local. Blue upper/red lower bezel, red UTC arrow, black Maxi dial, Oyster bracelet and magnified local date. |
| `datejust` | Rolex 126334 mint-green interpretation | Local. Mint sunray dial, fluted steel bezel, five-piece Jubilee links, applied markers and Cyclops. |
| `snowflake` | Grand Seiko SBGA211 | Local. White wind-swept texture, faceted markers and hands, titanium-style case, date and lower-left reserve. |
| `gshock` | Casio DW-5600UE-1 | Public, [product photographs](https://1970store.com/products/casio-g-shock-dw-5600ue-1dr-digital-dial-black-resin-strap-mens-watch-g1514). Resin bumper, four buttons, aqua/gold printing and positive segmented LCD. |
| `f91w` | Casio F-91W-1 | Public. Three-button resin case, blue pinstripe, gold lettering, weekday/date, full-size hours/minutes and smaller seconds. |
| `apple` | Apple Watch Activity Analog interpretation | Public. Rounded glass, side crown/button, three colored rings and analog hands. Ring progress is decorative. |
| `swatch` | Swatch Once Again GB743-S26 | Public, [product photographs](https://item.rakuten.co.jp/crash10/10002636/). Black polymer case, white Arabic dial, fine minute ticks and day/date. |
| `braun` | Braun BN0021BKBKG | Public. Thin steel case, short lugs, black leather, sparse black dial, white batons and yellow seconds. |
| `mondaine` | Mondaine MST.4101B.LBV.2SE interpretation | Public, [manufacturer](https://ch.mondaine.com/en/products/stop2go-veganes-trauben-leder-41-mm). Crownless brushed case, black railway hands, broad indices and red seconds disc. |
| `monaco` | TAG Heuer CAW211P.FC6356 | Public, [dealer photographs](https://www.secondmovement.com/tag-heuer-monaco-caw211p-fc6356-1). Square steel case, blue dial, left crown, right pushers, silver square counters and red chrono hand. |
| `panerai` | Panerai Luminor Marina PAM03312 | Public, [product photographs](https://www.wdl.sk/panerai-luminor-marina-pam03312). Cushion case, crown-lock bridge, black sandwich-style dial and nine o’clock seconds. |
| `f1` | Rolex trackside installation interpretation | Local. Green rectangular structure, gold fluted surround, white dial and broad green handset. |
| `bigben` | Restored Elizabeth Tower dial | Public. Blue Gothic hands and Roman numerals, opal-style glazing and gold architectural tracery. |
| `seiko5` | Seiko 5 Sports SRPD51 | Local. Blue dive scale, four o’clock crown, luminous circles, arrow handset and day/date aperture. |
| `moonphase` | Blancpain Villeret 6654 rose-gold interpretation | Public, [product photographs](https://monards.com.au/cdn/shop/files/6654-3642-55B_grande.png?v=1734671313). Double bezel, Roman scale, day/month apertures, curved blue pointer-date hand and moon. |
| `richardmille` | Richard Mille RM 011 titanium interpretation | Local. Curved tonneau case, perimeter fasteners, open-work bridges, upper date and three chrono registers. |
| `blackbay58` | TUDOR M79030N | Local. Gilt dive printing, cream lume, snowflake hour hand, no date and steel bracelet rivets. |
| `navitimer` | Breitling Navitimer B01 43 black reverse panda | Local. Beaded edge, nested slide-rule scales, silver counters, red chrono needle and date. |
| `elprimero` | Zenith 03.3100.3600/69.M3100 | Public, [manufacturer](https://www.zenith-watches.com/en_hu/product/chronomaster-sport-03-3100-3600-69-m3100). White dial, overlapping gray/blue registers and central ten-second chrono rotation. |
| `overseas` | Vacheron Constantin 4520V/210A-B128 | Local. Maltese-cross bezel and bracelet details, blue graduated dial and framed date. |
| `bigbang` | Hublot Big Bang Unico Red Magic 42 mm | Local + [manufacturer](https://www.hublot.com/en-nz/watches/big-bang/big-bang-unico-red-magic-42-mm). Red ceramic and matching red rubber, H screws, skeleton bridgework and large right counter. |
| `prx` | Tissot T137.407.11.041.00 | Public, [manufacturer](https://www.tissotwatches.com/en-us/T1374071104100.html). Broad integrated links, angular case, narrow polished bezel and blue waffle dial. |
| `khaki` | Hamilton H69439931 | Public, [manufacturer](https://www.hamiltonwatch.com/en-us/h69439931-khaki-field-mechanical.html). Matte case, olive textile strap, 12/24-hour field scales and cream lume. |
| `br03` | Bell & Ross BR03A-BL-CE/SRB | Public, [product photographs](https://www.verhoeven-joaillier.com/7091-montre-bell-ross-br-03-a-black-matte.html). Square black ceramic shell, four screws, cardinal Arabic numerals and diagonal date. |
| `twinbell` | Westclox 70010A | Local. Brass-tone bells, arched handle, feet, pale Arabic dial and red ticking seconds. |
| `grandfather` | Comtoise longcase, c. 1850 interpretation | Public, [Musée du Temps exhibition](https://www.mdt.besancon.fr/exposition-lhorloge-de-ma-grand-mere/). Curved timber case, pressed-brass surround, enamel Roman dial, weights and pendulum; the precise museum object is not authenticated. |
| `orloj` | Prague astronomical dial interpretation | Local. Nested twenty-four-hour and Roman scales, horizon colors, zodiac and golden solar pointer. Astronomy is illustrative. |
| `marine` | Ulysse Nardin 1182-310/42 | Local + [manufacturer](https://www.ulysse-nardin.com/de-de/watches/marine/1182-310-42). Rose gold with black dial and black leather, coin edge, reserve at twelve, small seconds/date at six. White/blue steel references were construction references only. |
| `freak` | Ulysse Nardin Freak X Carb | Local + [manufacturer](https://www.ulysse-nardin.com/watches/freak/2303-270-2-carb). Dark carbon texture and exposed carousel bridge rotating with the minute indication. |
| `patek` | Patek Philippe 5270J-001 | Local. Yellow gold, pale dial, upper day/month, two counters, lower moon/date, day/night and leap-cycle indicators. |
| `explorer` | Rolex Explorer 124270 | Local. Smooth steel bezel, black 3-6-9 dial, luminous triangle and Mercedes hands. |
| `santos` | Cartier Santos WSSA0018 | Local. Rounded square steel, screw-fixed bezel and links, rectangular Roman railway dial and sapphire crown. |
| `bigpilot` | IWC IW329301 | Local. Large diamond crown, no-date black pilot dial, triangle and dots, and riveted brown leather. |
| `fiftyfathoms` | Blancpain 5015 1130 71S | Public, [manufacturer](https://www.blancpain.com/en-us/fifty-fathoms/fifty-fathoms-automatique-5015-1130-71s). Steel bracelet, domed dark dive bezel, Arabic quarters, sword hands and angled date. |
| `typexx` | Breguet 2067ST/92/3WU | Local + [manufacturer](https://www.breguet.com/it/orologi/type-xx/type-xx-chronographe-2067/2067st923wu). Steel scale, black dial, differently sized counters, brown strap and fifteen-minute register. |
| `radiomir` | Panerai PAM00754 | Public, [product reference](https://www.panerai.com.br/radiomir-black-seal-logo-45mm-pam00754/p). Polished cushion case, wire lugs, conical crown, OP mark and nine o’clock seconds. The no-seconds PAM00753 is not the target. |
| `carrera` | TAG Heuer CBN2011.BA0642 | Local. Steel bracelet, slim polished bezel, blue dial, recessed counters and date at six. |
| `snoopy` | Omega 310.32.42.50.02.001 | Local. Silver dial, blue bezel and registers, navy strap and a small hand-drawn Snoopy figure at nine. |
| `milgauss` | Rolex 116400GV Z-Blue | Local. Blue sunray dial, green crystal rim, orange printing and lightning seconds hand. |
| `yachtmaster2` | Rolex 126680 | Local. Blue graduated bezel, newer circular indices, inner regatta scale and lower running seconds. |
| `jorggray` | Jorg Gray JGC6500 Secret Service edition | Local. Black dial, twelve numeral, three quartz registers, diagonal date and simplified emblem. |
| `rainbow` | Rolex 116595RBOW-0001 | Local. Rose gold, individual rainbow baguette facets, gemstone indices, pavé lugs and rose counters. |
| `railroad` | Norfolk Southern 1994 commemorative interpretation | Public, [auction photograph](https://www.liveauctioneers.com/price-result/norfolk-southern-pocket-watch/). Gold-tone pocket case/bow, black dial and railway emblem. Exact year/edition is not authenticated. |
| `nomosmetro` | NOMOS Metro 1101 | Local. Thin wire lugs, dotted minute scale, mint cardinal dots, reserve disc, red small seconds and six o’clock date. |
| `grandcentral` | Grand Central information booth clock | Local. Brass globe, pale opal-style face, dark Arabic numerals, acorn finial and stepped pedestal. |
| `howardmiller` | Howard Miller Chateau 610-520 interpretation | Local. Split pediment, wood columns, moon arch, brass face, weights and pendulum. Supplied related cases informed the drawing; exact case proportions remain an interpretation. |
| `mickey` | Ingersoll Mickey Mouse, 1933 interpretation | Local. Aged cream dial, vector character, moving glove/arm hands and small seconds. |
| `kingkhaki` | Hamilton H64455533 | Public. Brown leather, black 12/24-hour field dial and full weekday above the date. |
| `casiomq24` | Casio MQ-24-7B2LL | Public, [manufacturer](https://www.casio.com/ca-en/watches/casio/product.MQ-24-7B2LL/). Small black resin case, white Arabic dial and narrow black quartz hands. |
| `bigtic` | Fossil JR-7845 interpretation | Public owner/sale photographs. Round blue analog/digital version with broad steel case and large digital seconds. Exact JR-7845 variant is not authenticated. |
| `timexindiglo` | Timex Easy Reader T20041 | Public, [product photographs](https://store.shopping.yahoo.co.jp/gryps/t200419j.html). White dial, large black numerals, brown leather, day/date and red seconds. |

## Drawing and time behavior

Each object has its own drawing function. Helpers build metal, leather, wood, ceramic, resin, faceted hands, apertures, graduations, and subdials. Per-instance gradient, pattern and clipping identifiers prevent one watch from borrowing another instance’s definitions. Separate case geometry is used for rectangular, square, cushion, tonneau, pocket, longcase and architectural objects.

Metal uses directional reflections, brushed lines and polished edge bands. The Royal Oak, PRX, Nautilus, Snowflake, Seamaster and carbon cases have distinct vector dial or surface patterns. Crystal reflections are translucent layers above the hands. Logos and dial printing stay beneath moving hands. The Mickey glove hands and Freak carousel have their own rotating geometry.

`Intl.DateTimeFormat` supplies each city’s current local time and UTC offset. The 188-city atlas is filtered against the browser’s supported zones. Cards sort by current offset with alphabetical ties; a versioned storage key preserves this entry’s settings independently. Adding cities and shuffling use unused faces until the 62-piece pool is exhausted.

Quartz displays tick on whole seconds; selected mechanical movements use six, eight or ten steps per second. Spring Drive and Apple hands glide. Mondaine seconds complete their sweep in 58 seconds and pause at twelve for the remaining two, with a stepping minute hand. A browser’s frame rate and reduced-motion preference can lower the visible animation rate. Chronographs start, stop and reset actual elapsed time, with registers bound separately from running seconds. Zenith’s central chronograph rotates once every ten seconds, matching the [El Primero 3600 layout](https://pressroom.zenith-watches.com/app/uploads/2021/01/ZENITH-Chronomaster-Sport_FR-1.pdf).

Dates, weekdays, months, GMT, small seconds, twenty-four-hour indicators and digital segments update from their applicable time or calendar. The GMT arrow shows UTC alongside the city’s local hands, including in posed inspection. Seven-segment Casio digits are individually switched polygons. The F-91W is shown in 24-hour mode; its date field does not include the month.

## Intentional approximations

- These are front-view SVG studies, not optical or three-dimensional material simulations. Case depth, polished reflections, crystal magnification, typography, logos, engravings and gem facets are simplified. Shared helper geometry is adjusted per object but cannot reproduce every lug contour or bracelet articulation.
- The Cyclops overlay suggests magnification without optically enlarging the underlying date. The dial textures are repeating vector constructions, not photographic microtextures.
- Power-reserve indicators and Apple activity progress are fixed display studies. Lume, Timex illumination and LCD light are illustrative toggles; intensity and color are not calibrated measurements.
- Moonphase uses a 29.530588853-day synodic cycle from a reference new moon. Its small moving moon illustration is approximate. The Orloj zodiac, horizon and solar/lunar geometry and the longcase moon arch are illustrative, not an astronomical instrument or ephemeris.
- Skeleton bridges, gears, the Secret Service emblem, Norfolk Southern emblem and Snoopy/Mickey figures are vector interpretations. Gears are not a mechanically complete movement simulation.
- Chronograph controls demonstrate elapsed-time displays. Flyback, rattrapante, countdown programming, alarm, stopwatch modes on digital watches and watch-setting crowns are not fully reproduced.
- Vintage and museum objects explicitly marked as interpretations retain uncertainty in exact edition, proportions or restoration. In particular, the Norfolk Southern year, Fossil variant and precise Comtoise/Howard Miller case are not authenticated.
- Day-part badges follow local hour ranges. They do not compute sunrise, sunset, or polar daylight.

## Validation and captures

Browser checks covered all 62 catalog keys, unique SVG identifiers, resolved paint references, and 310 posed renders at 10:10:30, 12:00:00, 03:15:15, 06:30:30 and 23:59:59. Calendar checks included leap day, month end, year end and weekday changes. Time-zone checks covered New York and London spring/fall transitions, Kathmandu, Chatham, St. John’s and Kiritimati, plus all supported atlas entries.

Interaction checks covered keyboard city addition, removal, persistence, individual/global shuffle without duplicates, search and empty results, category filtering, posed inspection, lume, Escape/arrow navigation and chronograph start/stop/reset. Cadence checks compared quartz holds, sub-second mechanical steps, continuous glide and the stop2go pause. Final checks include offline `file://` loading, malformed storage recovery, small phone widths, desktop layout and the directory’s provider counts. `npm test` validates the manifest, inline JavaScript syntax, catalog and documentation links.

- [Desktop](assets/gpt-6.1-sol-desktop.png)
- [Phone](assets/gpt-6.1-sol-mobile.png)
- [Inspection](assets/gpt-6.1-sol-inspection.png)
- [All 62 faces](assets/gpt-6.1-sol-faces.png)

The catalog capture uses the shipped renderer posed at 10:10:30, with only the screenshot layout condensed to six columns. Documentation screenshots are browser captures of this implementation, not embedded source photographs.
