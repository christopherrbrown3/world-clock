# Model Versioning

World Clock keeps the active working page separate from frozen model snapshots.

## Files

- `world-clock.html`: active working build.
- `versions/*.html`: immutable standalone snapshots.
- `versions.json`: manifest of real snapshots available in the app.
- `index.html`: simple version picker for GitHub Pages and local browsing.

## Current Snapshots

- `versions/codex-5.5.html`: Codex 5.5 baseline.
- `versions/claude-opus-4.8.html`: Claude Opus 4.8 baseline.

## Future Codex 5.6 Workflow

Do not create a Codex 5.6 snapshot until the Codex 5.6 version exists.

When it is ready:

1. Finish the active work in `world-clock.html`.
2. Copy it into `versions/codex-5.6.html`.
3. Add a `codex-5.6` entry to `versions.json`.
4. Add a card and dropdown option in `index.html`.
5. Run `npm test`.
6. Commit through a pull request.
7. Optionally tag the model checkpoint:

   ```sh
   git tag -a model/codex-5.6 -m "Codex 5.6 snapshot"
   git push origin model/codex-5.6
   ```

After the snapshot is created, continue using `world-clock.html` as the active working file for the next iteration.
