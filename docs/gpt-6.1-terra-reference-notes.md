# GPT 6.1 Terra reference notes

This edition is a new standalone implementation of the [62-piece catalog](watch-face-catalog.md). It uses inline SVG geometry, not the reference photographs, and its page and time engine were written independently for this rendition. The pictures supplied for the task were used for study and are not included in the repository.

## Photographic references

The supplied archive contained images in 35 catalog folders: Big Bang, Big Pilot, Black Bay 58, Carrera, Datejust, Daytona, Explorer, the Rolex trackside clock, Freak, GMT-Master II, Grand Central, Howard Miller, Jorg Gray, Marine, Mickey, Milgauss, Nautilus, Navitimer, NOMOS Metro, Orloj, Overseas, Patek perpetual calendar, Rainbow Daytona, Richard Mille, Royal Oak, Santos, Seamaster, Seiko 5, Snoopy, Snowflake, Speedmaster, Submariner, twin-bell alarm, Type XX, and Yacht-Master II. Those images informed the cases, dials, marker shapes, colors, bracelets, and distinctive features. Several folders contain multiple references or colorways rather than the precise cataloged variant.

The Nautilus folder prominently shows a turquoise dial; the drawing instead uses the blue-to-black dial on the cataloged [5811/1G-001](https://www.patek.com/en/collection/nautilus/5811-1G-001). The red-ceramic Big Bang follows the [Red Magic reference](https://www.hublot.com/en-us/unico-mechanical-revolution), rather than the differently colored watches in the supplied folder. The cataloged Big Pilot 43 was checked against [IWC's reference](https://www.iwc.com/us/en/watch-collections/pilot-watches/iw329301-big-pilots-watch-43.html).

The remaining empty or mismatched folders were supplemented with public images and product descriptions:

| Piece | Additional reference |
| --- | --- |
| Apple Watch | [Apple's watch-face guide](https://support.apple.com/en-ie/guide/watch/apde9218b440/watchos) and a [front view](https://www.bestbuy.com/site/apple-watch-series-3-gps-cellular-42mm-space-gray-aluminum-case-with-black-sport-band-space-gray-2017/5979415.p) |
| Elizabeth Tower | [Restored clock face](https://www.theguardian.com/uk-news/2021/dec/31/restored-big-ben-to-bong-again-at-midnight-to-bring-in-new-year) |
| Bell & Ross BR-03 | [BR-03 Black Matte](https://bellross.com/en-us/products/br-03-black-matte-rubber-strap) |
| Braun BN0021 | [Braun's watch collection](https://us.braun-clocks.com/collections/watches) |
| Calatrava 5227G-015 | [5227G-015 rose-gilt dial](https://wristaficionado.com/collections/watches/products/patek-philippe-calatrava-5227g-015-date-white-gold-rose-gilt-opaline-dial-2026) |
| Casio MQ-24 and F-91W | [MQ-24](https://www.casio.com/us/watches/casio/product.MQ-24-7B2LL/) and [F-91W](https://www.casio.com/us/watches/casio/product.F-91W-1/) |
| G-Shock DW-5600UE | [DW-5600UE reference](https://www.casio.com/kr/watches/gshock/product.DW-5600UE-1/) |
| Zenith Chronomaster Sport | [Zenith reference and layout](https://www.zenith-watches.com/en_us/product/chronomaster-sport-03-3100-3600-69-m3100) |
| Blancpain Fifty Fathoms | [Fifty Fathoms photograph](https://www.jomashop.com/blancpain-watch-5015b-1130-52.html) |
| Comtoise | [Musée du Temps exhibition](https://www.estrepublicain.fr/edition-de-besancon/2016/06/17/besancon-le-musee-du-temps-presente-deux-expositions) |
| Hamilton Khaki Field and King | [Mechanical](https://www.hamiltonwatch.com/tr-tr/h69439931-khaki-field-mechanical.html) and [King](https://www.timescapeusa.com/products/hamilton-khaki-field-king-auto-h64455533) |
| Lange 1 | [Lange 1 photograph](https://www.watchvault.com.au/products/a-lange-and-sohne-lange-1-white-gold-101-039-2010) |
| TAG Heuer Monaco | [Calibre 11](https://shop.hodinkee.com/blogs/journal/tag-heuer-monaco-calibre-11-caw211p) |
| Mondaine | [Swiss Railway Classic](https://mondaine.com/pages/classic) |
| Blancpain Villeret complete calendar | [Villeret 6654](https://topperjewelers.com/products/blancpain-villeret-quantieme-complet-6654-1127-55b) and [Blancpain instructions](https://www.blancpain.com/sites/default/files/2020-08/BL-ME-6654_105x140.pdf) |
| Panerai Luminor and Radiomir | [PAM03312](https://www.panerai.com/en/collections/watch-collection/luminor/pam03312-luminor-marina.html) and [PAM00754](https://www.wisemanswatches.com/products/panerai-radiomir-logo-45mm-pam00754-2022) |
| IWC Portugieser | [Portugieser Automatic](https://www.iwc.com/ca-en/past-collections/portugieser/iw500715-portugieser-automatic) |
| Tissot PRX | [PRX Powermatic 80](https://www.tissotwatches.com/en-za/T1374071104100.html) |
| Jaeger-LeCoultre Reverso | [Reverso Classic](https://itsthattimenyc.com/products/jaeger-lecoultre-reverso-classic-q2508410) |
| Swatch Once Again | [Once Again photograph](https://ocarat.com/montre-once-again-gb743-swatch-76983.html) |
| Cartier Tank | [Tank Louis Cartier WGTA0342](https://www.cartier.com/es-es/reloj-tank-louis-cartier_cod1647597348583072.html) |
| Timex Easy Reader | [Easy Reader Day Date T20041](https://timex.com/products/easy-reader-day-date-35mm-leather-strap-watch-t20041) |
| Fossil Big Tic | [JR-7845 listing](https://www.ebay.com/itm/335369731420) |

No exact image of the specified 1994 Norfolk Southern pocket watch was found in the supplied archive or the searches used here. Its gold case, white railroad-style dial, and subsidiary seconds are an approximation based on a [railroad pocket-watch example](https://www.ebth.com/items/13557052-1904-ball-official-standard-railroad-grade-pocket-watch), not a verified reproduction of that particular object. The Comtoise drawing likewise represents the type shown in the museum exhibition rather than a verified match to a particular individual clock.

## Movement and visual limits

- Time and calendar fields use the browser's IANA time-zone data. Analog hands move at the catalog's general cadence; the Mondaine second hand pauses at the end of each minute. Digital displays are vector segments. Reduced-motion settings use whole-second movement and leave the pendulum still.
- Inspection can show live time or selected fixed hand positions. Chronographs in that view can start, stop, and reset. The Zenith central chronograph hand completes a turn in ten seconds. The Yacht-Master II display is a simplified elapsed chronograph, not a programmable regatta countdown.
- Moon phase uses a simple synodic-month approximation. The date pointer is illustrative. Power-reserve hands, activity rings, and decorative movement parts are fixed illustrations, not readings from real devices. The GMT hand shows the selected city's time on a 24-hour scale; it is not independently adjustable to a second zone.
- The Orloj's astronomical rings and longcase pendulums are visual approximations; the Orloj does not compute sidereal or zodiac positions. The moon disc on the Howard Miller is decorative. The Mickey figure and Snoopy emblem are simplified vector drawings.
- Fine engraving, jewels, reflections, dial textures, bracelet links, and case profiles are interpreted in vector form. The images aim to preserve recognizable geometry and color, but are not photorealistic product photographs. Some secondary scales and complications are simplified, and no claim of exact mechanical simulation is made.

## Verification

The repository validator, browser interaction checks, desktop and phone layouts, time-zone ordering, representative date changes, and chronograph controls were checked for this edition. The rendered [collection](assets/gpt-6.1-terra-faces.png), [desktop](assets/gpt-6.1-terra-desktop.png), [phone](assets/gpt-6.1-terra-mobile.png), and [inspection](assets/gpt-6.1-terra-inspection.png) captures show the implementation rather than the reference photos.
