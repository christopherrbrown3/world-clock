# Model Versioning

World Clock keeps the active working page separate from model-version pages.

The model version currently under review can be refreshed while that model is still active. Once work moves to a newer model, the previous model page should be treated as frozen.

Before creating or refreshing a model page, read `docs/model-and-contributor-guide.md` for face fidelity, SVG, interaction, and QA requirements.

## Files

- `world-clock.html`: active working build.
- `versions/*.html`: standalone model-version pages. Finalized model versions are immutable.
- `versions.json`: manifest of real model-version pages available in the app.
- `index.html`: simple version picker for GitHub Pages and local browsing.

## Current Snapshots

- `versions/codex-5.5.html`: current Codex 5.5 checkpoint.
- `versions/claude-opus-4.8.html`: Claude Opus 4.8 baseline.

## Future Codex 5.6 Workflow

Do not create a Codex 5.6 page until the Codex 5.6 version exists.

When it is ready:

1. Finish the current Codex 5.5 work in `world-clock.html` and `versions/codex-5.5.html`.
2. Treat `versions/codex-5.5.html` as frozen.
3. Copy the active build into `versions/codex-5.6.html` when Codex 5.6 work begins.
4. Add a `codex-5.6` entry to `versions.json`.
5. Add a card and dropdown option in `index.html`.
6. Run `npm test`.
7. Commit through a pull request.
8. Optionally tag the model checkpoint:

   ```sh
   git tag -a model/codex-5.6 -m "Codex 5.6 snapshot"
   git push origin model/codex-5.6
   ```

After the Codex 5.6 page is created, continue using `world-clock.html` as the active working file for the next iteration.
