# World Clock

[![CI](https://github.com/christopherrbrown3/world-clock/actions/workflows/ci.yml/badge.svg)](https://github.com/christopherrbrown3/world-clock/actions/workflows/ci.yml)

World Clock is a standalone HTML/SVG gallery of detailed watch and clock faces. It runs directly in the browser, with no build step and no server required.

[Live demo](https://christopherrbrown3.github.io/world-clock/)

![World Clock preview](docs/assets/preview.png)

## Features

- 60+ watch and clock faces rendered with inline SVG.
- Live analog, digital, date, day/date, GMT, and complication behavior.
- Reference-driven visual details for iconic clocks and watches.
- Offline-friendly: open the HTML file directly in a browser.
- Lightweight validation through GitHub Actions.

See [docs/watch-face-catalog.md](docs/watch-face-catalog.md) for the current watch and clock face catalog.

## Open Locally

```sh
open index.html
```

Use `index.html` to choose between the active build and model-version pages. Open `world-clock.html` directly when working on the active version.

## Model Versions

The project keeps AI-model versions as separate standalone HTML pages under `versions/`. The current model checkpoint can be refreshed while that model is active; finalized model versions should be treated as immutable.

- Active build: [world-clock.html](world-clock.html)
- Codex 5.5 checkpoint: [versions/codex-5.5.html](versions/codex-5.5.html)
- Claude Opus 4.8 snapshot: [versions/claude-opus-4.8.html](versions/claude-opus-4.8.html)

See [docs/model-versioning.md](docs/model-versioning.md) for the model-version workflow.

## Validate

```sh
npm test
```

The validation checks the active build, model-version pages, version manifest, required watch-face keys, and watch-face catalog consistency.

## Development Workflow

Use a branch and pull request for every meaningful change. See [CONTRIBUTING.md](CONTRIBUTING.md) for contributor expectations and [docs/github-workflow.md](docs/github-workflow.md) for the command-level workflow.

## Documentation

Start with [docs/README.md](docs/README.md) for the full documentation index.

## Release Readiness

Use [docs/public-release-checklist.md](docs/public-release-checklist.md) before major visibility or release changes.

## License And Notices

The original source code and documentation are released under the [MIT License](LICENSE).

This is an independent project. Brand, product, clock, watch, and character names are used descriptively for reference and identification. See [NOTICE.md](NOTICE.md).
