# World Clock

[![CI](https://github.com/christopherrbrown3/world-clock/actions/workflows/ci.yml/badge.svg)](https://github.com/christopherrbrown3/world-clock/actions/workflows/ci.yml)

World Clock is a standalone HTML/SVG gallery of detailed watch and clock faces. It runs directly in the browser, with no build step and no server required.

![World Clock preview](docs/assets/preview.png)

## Features

- 60+ watch and clock faces rendered with inline SVG.
- Live analog, digital, date, day/date, GMT, and complication behavior.
- Reference-driven visual details for iconic clocks and watches.
- Offline-friendly: open the HTML file directly in a browser.
- Lightweight validation through GitHub Actions.

## Open Locally

```sh
open world-clock.html
```

## Validate

```sh
npm test
```

The validation checks the standalone HTML file for JavaScript syntax errors, unresolved merge conflicts, and required watch-face keys.

## Development Workflow

Use a branch for every meaningful change:

```sh
git switch -c short-description
# edit files
npm test
git add .
git commit -m "Describe the change"
git push -u origin short-description
gh pr create --fill
```

See [docs/github-workflow.md](docs/github-workflow.md) for the project workflow and GitHub concepts.

## Public Release Readiness

This repository is being prepared as a public showcase. Before switching visibility to public, use [docs/public-release-checklist.md](docs/public-release-checklist.md).
