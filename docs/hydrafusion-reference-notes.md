# GitHub Copilot Hydrafusion Reference Notes

GitHub Copilot Hydrafusion is an independent implementation. Its page, `versions/hydrafusion.html`, was authored from a blank file rather than copied from or adapted from another model rendition.

## Reference basis

The implementation was studied against the maintainer-provided `watchpics` archive, which contains 323 local files organized into bins for the 62 catalog keys. Those photographs are not committed or embedded. The public page uses only original inline SVG geometry and browser-generated text.

The supplied images were used to check each object's dominant visual identifiers:

- case family and proportion: round, cushion, tonneau, rectangular, square, porthole, octagonal, pocket, alarm, longcase, tower, and astronomical forms;
- dial color, marker hierarchy, bezel treatment, bracelet or strap character, crown and guard placement;
- distinctive complications such as the Lange 1 asymmetry, Orloj astrolabe, Yacht-Master II regatta arc, Freak carousel, Snowflake power reserve, Apple activity rings, Mickey character hands, and digital LCD layouts;
- highly recognizable signatures including the Royal Oak screws, Nautilus ears, Tank brancards, Reverso gadroons, Panerai crown bridge, Monaco square case, Rainbow sapphire spectrum, and Mondaine lollipop seconds hand.

The catalog names and variants follow `docs/watch-face-catalog.md`. The supplied references include multiple eras or colorways for some models; when they differ, the catalog's named reference takes priority.

## Rendering approach

Hydrafusion uses a new declarative face description and an original SVG renderer. Shared primitives provide metal, glass, dial textures, straps, bracelets, markers, bezels, hands, subdials, and apertures. Object-specific branches cover clocks, digital watches, the Orloj, longcases, pocket watches, character art, activity rings, carousel movement, regatta display, and asymmetric complications.

The interface is also original: a dark bioluminescent visual system, live world-clock cards, a searchable and filterable collection, enlarged posed inspection, and a global lume view. Cities are stored locally in the browser. Shuffle operations avoid duplicate faces while unused choices remain.

## Intentional approximations

- Tiny dial printing, legal marks, movement engraving, jewel settings, and exact typefaces are simplified for legibility and standalone file size.
- Complications show the local date or a representative animated state; they are not simulations of each movement's complete mechanical rules.
- Chronograph subdials are visually posed rather than controlled as independent elapsed-time mechanisms.
- Bracelet link construction, brushed finishes, gemstone cuts, guilloché, enamel, snow texture, and skeleton movements are stylized with gradients, patterns, and line work.
- The Orloj preserves its layered color fields, zodiac/astrolabe hierarchy, and gilded geometry without attempting a full astronomical calculator.
- Architectural clocks preserve the clock face and silhouette rather than reproducing their full buildings.

These choices prioritize recognizable geometry and visual hierarchy over microscopic reproduction.

## Behavior and QA targets

The page includes all 62 catalog keys, live `Intl` time-zone updates, UTC-offset sorting, city search, add/remove controls, all-face and per-card shuffling, duplicate avoidance, saved city settings, collection search and filtering, fixed inspection poses, and responsive layouts. The rendition is intended to work from `file://`, GitHub Pages, or a basic static server without external assets or network requests.

Headless Chrome checks covered the initial six-city render, all 62 collection cards, per-city shuffle, collection search and filtering, city search, both dialogs, fixed pose controls, desktop at 1440 px, and mobile at 390 px. The run completed without page or console errors. Screenshots are stored as `docs/assets/hydrafusion-desktop.png`, `docs/assets/hydrafusion-mobile.png`, and `docs/assets/hydrafusion-faces.png`.

The GitHub Copilot Hydrafusion directory release date, September 30, 2026, is maintainer-supplied and has no public vendor source to verify against. The repository snapshot date is the same day but is recorded separately in `versions.json`.
