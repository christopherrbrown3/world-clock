# Model And Contributor Guide

This guide is for human contributors and AI model runs. The project is partly a benchmark of model output, so version pages should make it clear what each model produced while still keeping the app usable and public-ready.

## Core Goal

World Clock should render recognizable, detailed, realistic watch and clock faces as standalone client-side SVG. The goal is not a generic clock gallery. The goal is to study the real objects and make the SVG renders match them as closely as practical.

Every face should be judged against reference photos, not memory or a generic style family.

## Model Version Strategy

A new model can either reuse and improve an existing model page or create a new one from scratch.

- Reuse path: copy an existing page, then improve it with reference-grounded changes.
- New path: create a new standalone page that preserves the required app behavior below.
- Do not edit finalized older model pages except for explicit corrections requested by the maintainer.
- While a model is currently active, its checkpoint page can be refreshed.
- When a newer model begins, freeze the previous model page and create a new page for the new model.

For a new model page:

1. Start from `world-clock.html` or an existing `versions/*.html` page.
2. Create `versions/<model-name>.html`.
3. Add the page to `versions.json`.
4. Add the page to the picker in `index.html`.
5. Update README and changelog text when the public list changes.
6. Run `npm test`.
7. Open a pull request and wait for CI.

Keep `versions.json` limited to real pages that exist in the repo. Do not add placeholder future versions.

## Required App Behavior

Every model page must remain a single client-side browser app.

- Render watch and clock faces as inline SVG.
- Do not use raster watch-face images, screenshots, image sprites, server rendering, or external rendering APIs for the faces.
- Work from `file://`, GitHub Pages, and a simple local static server.
- Keep live time updates for each city using the browser clock and time zone APIs.
- Keep add-city functionality.
- Keep remove-city functionality.
- Keep shuffle-all functionality.
- Keep independent per-clock face shuffle.
- Avoid duplicate face assignments while there are enough unused faces available.
- Sort cities by current UTC offset, west to east, with a stable alphabetical tie-breaker.
- Preserve date, day/date, GMT, digital, moonphase, subdial, and complication behavior where a face uses it.
- Keep controls accessible with real buttons or inputs and usable tap targets.
- Avoid horizontal overflow on mobile.

If a new implementation changes the internal architecture, it must still satisfy those user-visible behaviors.

## Reference Research Standard

Research before drawing. A face is not done until it has been compared to real photos.

Use the best available references:

- Manufacturer photos when available.
- Auction, dealer, museum, collector, or owner photos for discontinued and obscure pieces.
- Multiple angles when case shape, lugs, crowns, bezels, crystals, or dimensional depth matter.
- Close-ups for dial text, numerals, subdials, hands, date windows, and logos.
- Maintainer-provided references when the requested object is specific.

Do not rely on a similar model if the requested watch has a known specific layout. Many errors come from using the right brand but the wrong reference.

In pull requests that change faces, include a short source note:

- Which reference object was used.
- What major details were checked.
- Any intentional approximation.
- Screenshots of the rendered result.

Do not commit private paths, private reference archives, or reference photos unless the license and project intent clearly allow it.

## Face Fidelity Checklist

Review one watch or clock at a time. For each face, compare against references at high zoom and check:

- Case shape, bezel width, lugs, crown, pushers, screws, hinges, guards, and material finish.
- Dial color, texture, depth, chapter ring, rehaut, rings, and glass reflection.
- Hour marker shape, count, orientation, lume fill, metal surrounds, and marker hierarchy.
- Numeral style, placement, scale, rotation, and path. Rectangular watches need rectangular numeral placement, not radial circular placement.
- Logo and brand-text placement relative to 12 marker, center pinion, date windows, and subdials.
- Dial text wrapping, line spacing, scale, and alignment.
- Hand shape, length, counterweights, pivots, center cap, and layering.
- Bezel marker orientation, triangle direction, pip placement, numerals, and minute graduations.
- Date and day windows, including single-digit and double-digit dates.
- Subdial position, diameter, spacing, tick density, labels, and hand length.
- Special complications such as GMT hands, moonphase, power reserve, tourbillon, LCD seconds, activity rings, railroad tracks, or rotating discs.
- Object-specific form. A terminal clock, tower clock, pocket watch, digital watch, or rectangular watch should not collapse into a generic round wristwatch template.

Common failure modes to avoid:

- Logo overlapping the 12 marker.
- Bezel arrows or triangles pointing the wrong direction.
- Date text stamped twice.
- Day/date text spilling out of its window.
- Subdials with the wrong proportions or spacing.
- Numerals colliding with rings.
- Text overlapping date windows.
- Hand counterweights disconnected from the hand.
- SVG filter boxes or gray artifacts moving with hands.
- Brand marks painted above the hands when the real dial print should sit below them.

## SVG Rendering Guidance

Use SVG structure deliberately.

- Put static dial printing and brand marks below moving hands.
- Use stable classes for hands so the live update loop can rotate them.
- Use `data-pivot` for subdial hands or non-center rotating parts.
- Keep moving hand layers free of filter artifacts. Shadows and glows should not create visible boxes while rotating.
- Prefer reusable helper functions for ticks, numerals, cases, lume, glass, and metal finishes when they preserve accuracy.
- Use gradients, masks, clip paths, opacity, and SVG filters to create depth, metal, lume, crystal, paper, enamel, LCD, or aged effects.
- Do not add abstractions that make it harder to place details accurately.
- Keep text legible, centered, and clipped only when the real watch uses an aperture or crop.

If an SVG detail cannot be made fully photorealistic, choose the approximation that preserves the real object's geometry and visual hierarchy.

## Time And Date QA

Watch faces must be reviewed at more than one moment. Many defects only appear when hands or date text move.

Before finishing, test representative times and dates such as:

- 10:10 for classic display symmetry.
- 12:00 for stacked hands and 12 marker collisions.
- 03:15 for date windows and right-side markers.
- 06:30 for lower text, moonphase, and subdial conflicts.
- 23:59 for date, day, GMT, and digital edge cases.
- Single-digit and double-digit dates.
- Month end where date wheels show larger numbers.
- A weekday change where day windows are present.

Check that hands do not cover important text more than they would on the real object, and that dynamic text stays inside its intended aperture.

## Interaction QA

Before opening a pull request:

- Run `npm test`.
- Load the edited page in a browser.
- Confirm the page is not blank and has no framework or runtime error overlay.
- Check browser console warnings and errors.
- Verify shuffle all changes face assignments and avoids duplicates while possible.
- Verify a single face can be shuffled independently.
- Verify adding a city works from search suggestions.
- Verify removing a city works.
- Verify cities remain sorted by current UTC offset.
- Verify desktop and mobile layouts have no clipping, overlapping controls, or horizontal overflow.

For visual work, include screenshots in the pull request or discussion when practical.

## Public Repo Hygiene

The repository is public and should read like a showcase project.

- Keep documentation clear and external-facing.
- Do not commit secrets, private file paths, private archive names, or local-only notes.
- Do not leave TODOs that refer to private conversations.
- Do not include copyrighted reference photos unless explicitly permitted.
- Keep brand and trademark use descriptive and non-commercial.
- Keep older model versions available for comparison.

## GitHub Workflow

Use the branch and pull request flow documented in `docs/github-workflow.md`.

For meaningful face changes, keep commits focused. A good pull request usually changes one face or one related set of faces, includes validation notes, and explains the reference basis for the work.
