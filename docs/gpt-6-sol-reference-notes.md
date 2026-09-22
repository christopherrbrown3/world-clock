# GPT 6 Sol: reference and rendering notes

This rendition is a new standalone implementation in [`versions/gpt-6-sol.html`](../versions/gpt-6-sol.html). It does not include another model's HTML, SVG output, or watch photographs. The supplied photo archive contains images in 35 of the 62 catalog folders; the remaining folders contain no usable image files. Photographs were used for research and are not shipped.

## Reference choices

| Object | Details checked |
| --- | --- |
| Rolex Submariner Date | Local close-up photographs: ceramic bezel scale and pip, round and rectangular luminous plots, Mercedes handset, cyclops date, and Oyster links. |
| Omega Speedmaster Moonwatch | Local close-up: stepped black dial, tachymeter scale, three recessed counters, slender white hands, and steel case finishing. |
| Patek Philippe Nautilus 5811/1G-001 | Local photos show a different Tiffany-blue 5711. The [5811 manufacturer page](https://www.patek.com/en/collection/nautilus/5811-1g-001) supplied the catalog variant's white-gold case, dark-rimmed blue embossed dial, batons, and date. |
| Audemars Piguet Royal Oak 15510ST | Local photographs include a chronograph variant. The [15510 manufacturer page](https://www.audemarspiguet.com/us/en/watch-collection/royal-oak/15510ST.OO.1320ST.06) supplied the three-hand blue Grande Tapisserie configuration; the photos informed case and bracelet finishing. |
| Patek Philippe Calatrava 5227G-015 | The [manufacturer specification](https://www.patek.com/en/collection/calatrava/5227g-015) established its rose-gilt opaline dial, charcoal obus markers, dauphine hands, white-gold case, and brown strap. |
| Rolex Datejust | The supplied mint-green/fluted/Jubilee photo set supplied the selected colorway and applied-index geometry. |
| Breguet Type XX 2067ST/92/3WU | The [manufacturer specification](https://www.breguet.com/en/watches/type-xx/type-xx-chronographe-2067/2067st923wu) established a black dial, ivory lume, asymmetric registers, and 4:30 date. |
| Casio DW-5600UE-1 and F-91W-1 | [DW-5600UE-1](https://www.casio.com/jp/watches/gshock/product.DW-5600UE-1/) and [F-91W-1](https://www.casio.com/us/watches/casio/product.F-91W-1/) product pages informed the resin cases, dial printing, and LCD layouts. |
| Apple Watch | Apple's [Series 7 announcement](https://www.apple.com/newsroom/2021/09/apple-reveals-apple-watch-series-7-featuring-the-largest-most-advanced-display/) and [watchOS guide](https://help.apple.com/pdf/watch/8/en_US/apple-watch-user-guide-watchos8.pdf) informed the rounded case and Contour numerals. |
| Swatch Once Again and Casio MQ-24 | The [Swatch GB743](https://www.swatch.com/once-again-gb743-s26/GB743-S26.html) and [Casio MQ-24-7B2LL](https://www.casio.com/ca-en/watches/casio/product.MQ-24-7B2LL/) product pages supplied their distinct white dials and black resin cases. |
| Hamilton Khaki Field and King | [Field Mechanical H69439931](https://www.hamiltonwatch.com/de-de/h69439931-khaki-field-mechanical.html) and [King Auto H64455533](https://www.hamiltonwatch.com/en-au/h64455533-khaki-field-kingauto.html) informed the 12/24-hour scales, fabric/leather bands, and King's full weekday/date. |
| Rolex trackside clock, Grand Central clock, Mickey Mouse, Prague Orloj, longcase clocks | Supplied photographs informed object-specific architecture instead of a generic round watch case: rectangular trackside board, four-sided brass globe, character dial, layered astrolabe, and glazed longcase. |

## Intentional approximations

- Metal, ceramic, leather, paper, glass, lume, and dial textures are SVG gradients and geometry rather than photographs. Fine engravings, manufacturer lettering, and skeleton movement components are simplified for legibility at card size.
- The moon aperture follows an approximate synodic cycle. Power-reserve pointers are illustrative, since a browser clock has no knowledge of a physical watch's mainspring state. The astronomical clock's Sun and Moon graphics are visual indications rather than a Prague ephemeris.
- Chronograph controls measure browser elapsed time for the selected face. The Zenith central chronograph hand follows its ten-second revolution; other chronograph seconds hands follow a sixty-second revolution.
- The supplied reference archive includes related models and colorways. Where a precise catalog reference was available from a manufacturer, its stated variant took precedence over a mismatched local photograph.

The 62 generated SVG documents were parsed as XML with unique paint IDs, and their rendered thumbnails were reviewed together. The [static proof sheet](assets/gpt-6-sol-faces.png) uses a fixed 10:08:37 frame so hand and display detail is visible; the page itself uses live local time. Repository validation checks the new page's inline script and manifest entry.
