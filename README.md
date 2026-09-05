<div align="center">

# World Clock

**One brief. Ten perspectives.**

62 watch and clock faces, interpreted by successive AI models as working SVG world clocks.

[![CI](https://github.com/christopherrbrown3/world-clock/actions/workflows/ci.yml/badge.svg)](https://github.com/christopherrbrown3/world-clock/actions/workflows/ci.yml)
[![Faces](https://img.shields.io/badge/faces-62-782c35)](docs/watch-face-catalog.md)
[![License](https://img.shields.io/badge/code-MIT-666156)](LICENSE)

**[Explore the project](https://christopherrbrown3.github.io/world-clock/) · [Open Astra](https://christopherrbrown3.github.io/world-clock/versions/astra.html)**

</div>

![The project index introduces World Clock and lists model renditions by release date](https://raw.githubusercontent.com/christopherrbrown3/world-clock/main/docs/assets/index-desktop.png)

## The experiment

Give different AI models the same specification: build a complete world clock with 62 recognizable timepieces. Compare what each model notices—case proportions, dial textures, typography, hand geometry, and motion—and how it turns those details into code.

The [project index](index.html) puts the model directory beside a compact introduction. Filter by provider or browse all ten models in release order, then open a collection. It contains no specific watch previews. Each rendition has its own interface and implementation, preserved for comparison. Earlier work includes both inherited and independently authored implementations; the [versioning guide](docs/model-versioning.md) explains the two paths.

The faces themselves are client-side SVG, built against reference photographs rather than embedded watch images. Documentation screenshots show the rendered results. Detail, behavior, and fidelity vary between renditions; these differences are part of the experiment.

## Explore the renditions

Listed in the same newest-release-first order as the index. **Model release** is the repository’s recorded release date; **snapshot** is the date this project captured the rendition. They are different chronologies.

| Model | Model release | Snapshot |
| --- | --- | --- |
| [Codex Astra](versions/astra.html) | 2026-09-05 | 2026-09-05 |
| [Gemini 3.8 Flash](versions/gemini-3.8-flash.html) | 2026-09-02 | 2026-09-03 |
| [Claude Fable 5.1](versions/fable-5.1.html) | 2026-08-02 | 2026-09-02 |
| [Claude Opus 5](versions/claude-opus-5.html) | 2026-07-24 | 2026-07-28 |
| [Codex 5.6 Sol](versions/codex-5.6-sol.html) | 2026-07-09 | 2026-07-28 |
| [Codex 5.6 Terra](versions/codex-5.6.html) | 2026-07-09 | 2026-07-09 |
| [Grok 4.5](versions/grok-4.5.html) | 2026-07-08 | 2026-09-03 |
| [Claude Fable 5](versions/fable-5.html) | 2026-06-09 | 2026-07-17 |
| [Claude Opus 4.8](versions/claude-opus-4.8.html) | 2026-05-28 | 2026-06-30 |
| [Codex 5.5](versions/codex-5.5.html) | 2026-04-23 | 2026-07-09 |

The [active development build](world-clock.html) remains available separately. It is not automatically replaced by the newest model entry. [versions.json](versions.json) records the available snapshots.

## Inside a collection

The shared brief covers city search, adding and removing cities, individual and all-city face shuffles, ordering by UTC offset, and live local times. The catalog spans mechanical and digital watches, architectural clocks, pocket watches, and character timepieces.

Astra implements all 62 faces with its own SVG toolkit and time engine, 176 selectable cities, saved city settings, a searchable collection, enlarged inspection, and chronograph controls.

![Astra’s independently drawn collection of working timepieces](https://raw.githubusercontent.com/christopherrbrown3/world-clock/main/docs/assets/astra-desktop.png)

[See Astra at phone width](https://raw.githubusercontent.com/christopherrbrown3/world-clock/main/docs/assets/astra-mobile.png) · [Browse the 62-object catalog](docs/watch-face-catalog.md) · [Read Astra’s reference and approximation notes](docs/astra-reference-notes.md)

Time comes from the browser clock and its `Intl` time-zone data, including daylight-saving rules available in that browser. Moon phases, power reserve, and other mechanical or astronomical displays can be simulations; a rendition’s notes explain its approximations. Keeping the browser and operating system current helps keep time-zone rules current.

## Run locally

No application install or build step is required:

```sh
git clone https://github.com/christopherrbrown3/world-clock.git
cd world-clock
```

Open `index.html` in a browser, then choose a model. On macOS, `open index.html` does this from the terminal. To go directly to Astra, open `versions/astra.html`.

Each model app is a standalone HTML file whose clocks work offline. The index uses the local Manrope font in `assets/fonts/`; keep that directory alongside it for the intended typography. No font service is contacted by the index. A static server or GitHub Pages works too.

## Repository map

| Path | Purpose |
| --- | --- |
| [index.html](index.html) | Project introduction and model directory; GitHub Pages entry point |
| [versions/](versions/) | Standalone model renditions |
| [versions.json](versions.json) | Snapshot manifest and active-build pointer |
| [world-clock.html](world-clock.html) | Separate active working build |
| [docs/](docs/README.md) | Catalog, references, contribution and release guides |
| [assets/fonts/](assets/fonts/README.md) | Index fonts, licenses, and provenance |
| [scripts/validate.js](scripts/validate.js) | Dependency-free repository validation |

## Validate and contribute

With Node.js 20 or later:

```sh
npm test
```

No `npm install` is needed. Validation checks HTML structure, inline JavaScript syntax, manifest targets, five required face keys on every app page, the complete active-build catalog, and local Markdown link targets. CI runs on pull requests targeting `main` and on pushes to `main`.

These checks do not establish visual fidelity or exercise browser interactions. For edited pages, also check desktop and phone layouts, keyboard navigation, the console, offline behavior, and the affected time/date interactions.

Start with [CONTRIBUTING.md](CONTRIBUTING.md). The [model and contributor guide](docs/model-and-contributor-guide.md) covers reference-driven face work; the [GitHub workflow](docs/github-workflow.md) covers checkpoints, review, and merging. The [documentation index](docs/README.md) links all guides.

## License and attribution

Original code and documentation use the [MIT License](LICENSE). The bundled index font uses the SIL Open Font License; its notice and source information are in [assets/fonts/](assets/fonts/README.md).

World Clock is independent and non-commercial. Brand, product, and character names identify the objects depicted; they do not imply affiliation or endorsement. See [NOTICE.md](NOTICE.md).
