# Model Versioning

World Clock keeps the active working page separate from model-version pages.

The model version currently under review can be refreshed while that model is still active. Once work moves to a newer model, the previous model page should be treated as frozen.

Before creating or refreshing a model page, read `docs/model-and-contributor-guide.md` for face fidelity, SVG, interaction, and QA requirements.

## Files

- `world-clock.html`: active working build.
- `versions/*.html`: standalone model-version pages. Finalized model versions are immutable.
- `versions.json`: manifest of real model-version pages available in the app.
- `index.html`: simple version picker for GitHub Pages and local browsing.

## Current Model Pages

- `versions/fable-5.html`: current Claude Fable 5 checkpoint.
- `versions/codex-5.6.html`: finalized Codex 5.6 Terra snapshot.
- `versions/codex-5.5.html`: finalized Codex 5.5 snapshot.
- `versions/claude-opus-4.8.html`: Claude Opus 4.8 baseline.

## Creating A New Model Page

Do not create placeholder pages for model versions that do not exist yet.

When a new model version is ready:

1. Finish the current model work in `world-clock.html` and the current `versions/*.html` checkpoint.
2. Treat the previous model page as finalized unless the maintainer explicitly asks to revise it.
3. Copy the active build into `versions/<model-id>.html` for the new model.
4. Add the new model entry to `versions.json`.
5. Add a card and dropdown option in `index.html`.
6. Update README and changelog text when the public list changes.
7. Run `npm test`.
8. Commit through a pull request.
9. Optionally tag the model checkpoint:

   ```sh
   git tag -a model/<model-id> -m "<Model Name> snapshot"
   git push origin model/<model-id>
   ```

After the new model page is created, continue using `world-clock.html` as the active working file for the next iteration.

For example, Claude Fable 5 uses `versions/fable-5.html` and the `fable-5` manifest entry, while the earlier Codex 5.6 Terra page remains frozen unless a maintainer asks for a correction.
