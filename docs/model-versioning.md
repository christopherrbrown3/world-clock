# Model Versioning

World Clock keeps the active working page separate from model-version pages.

The model version currently under review can be refreshed while that model is still active. Once work moves to a newer model, the previous model page should be treated as frozen.

Before creating or refreshing a model page, read `docs/model-and-contributor-guide.md` for face fidelity, SVG, interaction, and QA requirements.

## Files

- `world-clock.html`: active working build.
- `versions/*.html`: standalone model-version pages. Finalized model versions are immutable.
- `versions.json`: manifest of real model-version pages available in the app.
- `index.html`: project introduction and release-ordered model directory for GitHub Pages and local browsing.

## Current Model Pages

- `versions/astra.html`: current Codex Astra checkpoint, authored from scratch with its own interface, time engine and all 62 faces.
- `versions/grok-4.5.html`: finalized Grok 4.5 checkpoint, authored from scratch against this specification.
- `versions/gemini-3.8-flash.html`: finalized Gemini 3.8 Flash checkpoint, authored from scratch against this specification.
- `versions/fable-5.1.html`: finalized Claude Fable 5.1 checkpoint, authored from scratch against this specification.
- `versions/codex-5.6-sol.html`: finalized Codex 5.6 Sol checkpoint, authored from scratch against this specification.
- `versions/claude-opus-5.html`: finalized Claude Opus 5 checkpoint.
- `versions/fable-5.html`: finalized Claude Fable 5 checkpoint.
- `versions/codex-5.6.html`: finalized Codex 5.6 Terra snapshot.
- `versions/codex-5.5.html`: finalized Codex 5.5 snapshot.
- `versions/claude-opus-4.8.html`: Claude Opus 4.8 baseline.

## Creating A New Model Page

Do not create placeholder pages for model versions that do not exist yet.

When a new model version is ready:

1. Confirm whether the task is an independent implementation or an improvement of an existing page. For independent work, start a new `versions/<model-id>.html` without copying another model’s implementation. For inherited work, copy only the agreed source page.
2. Preserve finalized model pages. Do not change `world-clock.html` unless the task explicitly includes the active build.
3. Finish and validate the new standalone page against the catalog and required app behavior.
4. Add its actual snapshot date and file to `versions.json`.
5. Add a linked row to `index.html` in model release order, newest first. Preserve the order of existing tied dates. Update its visible rendition count and introduction when the count changes. Keep the index about the project and model links, without specific watch previews.
6. Update the README model table, this page’s current-model list, and the changelog. Include reference notes and rendered screenshots for the new rendition.
7. Run `npm test` and the relevant browser checks, then commit and push checkpoints through a pull request.
8. Merge after the checks pass and the maintainer authorizes it. Optionally tag the model checkpoint:

   ```sh
   git tag -a model/<model-id> -m "<Model Name> snapshot"
   git push origin model/<model-id>
   ```

The index and README use model release dates verified against the vendor sources in [Model Release Dates](model-release-dates.md), and the index records them in `data-release-date` attributes. The manifest uses `snapshotDate`, which is the project checkpoint date. Do not sort the index by manifest snapshot dates or assume those dates are model release dates. Confirm the release date when adding an entry.

Promoting a rendition to the active build is a separate, explicit operation. A new model entry does not require copying it into `world-clock.html`.

For example, Claude Fable 5 uses `versions/fable-5.html` and the `fable-5` manifest entry, while the earlier Codex 5.6 Terra page remains frozen unless a maintainer asks for a correction.
