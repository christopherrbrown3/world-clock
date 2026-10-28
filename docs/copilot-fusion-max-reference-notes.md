# Copilot Fusion Max Reference Notes

Copilot Fusion Max is an independent, single-file implementation in `versions/copilot-fusion-max.html`. Its interface, time-zone board, SVG construction system, face descriptions, and interactions were authored for this entry rather than copied or extended from another model page.

## Reference basis

The supplied reference-photo archive contains 296 image files across 35 object folders. The photographs were used as visual spot checks for the Royal Oak, Grand Seiko Snowflake, Submariner, Westclox Twin Bell Alarm Clock, Richard Mille, Hublot Big Bang, Grand Central Terminal clock, and Nautilus. The archive is not committed; the page contains no source photos, external image URLs, or embedded raster watch art.

All 62 identities and catalog ordering follow [the shared watch-face catalog](watch-face-catalog.md). For catalog entries without supplied images, the SVGs use object-specific geometry and signature details from the catalog and public model naming rather than claiming a direct photographic comparison. Not every face has been individually photo-verified.

The additional reference checks informed the Nautilus's smooth porthole bezel and side ears, the tonneau/openwork construction of the Richard Mille, the Big Bang's two-register skeleton layout, and Grand Central's opal glass, Arabic numerals, dark hands, and gilt frame. The sampled Nautilus has a turquoise dial and the sampled Big Bang a rose-gold case; the rendition retains the catalog's blue Nautilus and Red Magic ceramic colors rather than copying those different variants. The Richard Mille sample is also a different edition, so its fine printing is not reproduced as Felipe Massa reference detail. The two Casio drawings distinguish a bulky angular G-Shock from the slim blue-outlined F-91W, but neither has a photo in the supplied archive and neither was photo-verified in this pass.

## Drawing and interaction

The renderer starts from a declarative, individually authored specification for every face. Its original SVG primitives layer case and bracelet finishes, shaped dials, minute tracks, applied markers, typography, date apertures, chronograph registers, and live hands. Skeleton chronographs include visible gears and bridges beneath model-specific registers. Separate forms cover rectangular and square cases, two distinct resin digital cases with recessed LCDs, a pocket watch, an alarm clock, longcase clocks, and an astronomical dial.

The page provides live browser-time updates, a west-to-east UTC-sorted city board, city search and addition, removal, local city persistence, per-city and all-city face shuffling, duplicate avoidance while choices remain, a searchable/filterable 62-face library, a lume study, and an inspection dialog with live and fixed hand poses. Moving SVG hands are updated in place between one-second calendar and digital-display updates. The railway hand pauses at the top of its sweep, and reduced-motion mode uses one-second updates.

## Intentional approximations

- Fine printing, exact manufacturer marks, proprietary typefaces, gem cuts, bracelet link construction, metal brushing, and crystal distortion are simplified in standalone SVG.
- Dates and weekdays follow each city's local calendar. Moon discs use an approximate 29.53059-day synodic cycle, not a precision astronomical ephemeris. Running-seconds subdials advance; elapsed chronograph counters and power reserves are illustrative rather than full mechanical simulations.
- The astronomical-clock face uses a simplified 24-hour pointer and minute pointer; it does not calculate the historical dial's solar and zodiacal coordinates.
- A limited city atlas is bundled for offline use; daylight-saving behavior and displayed local times use the browser's IANA time-zone data.
- The supplied photo archive covers 35 catalog objects, so the remaining 27 faces are informed by their named references and public design signatures, not by photographs in that archive.

The project checkpoint date is October 28, 2026. No model-release date is claimed.

## Regression coverage

`npm test` includes renderer checks for all 62 identities and cadences, visible time changes on every face, instance-local SVG references, representative hand poses, local date boundaries, DST and fractional UTC offsets, movement cadences, moon phases, empty-board persistence, and the distinguishing skeleton, terminal-clock, porthole, and digital-case treatments.
