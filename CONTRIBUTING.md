# Contributing

This project uses a standard GitHub workflow so changes stay reviewable and easy to validate.

Start with the [documentation index](docs/README.md). Before changing watch faces or creating a model-version page, read [docs/model-and-contributor-guide.md](docs/model-and-contributor-guide.md).

## Workflow

Use the branch and pull request flow in [docs/github-workflow.md](docs/github-workflow.md). Do not commit directly to `main`.

For every meaningful change:

1. Create a branch from current `main`.
2. Make one focused change.
3. Run `npm test`.
4. Open a pull request.
5. Merge only after CI passes.

## Commit Messages

Use short, specific commit messages:

- `Fix Submariner date cyclops`
- `Add Big Ben numeral spacing test`
- `Document GitHub workflow`

## Visual Changes

Check `docs/watch-face-catalog.md` when adding, removing, renaming, or replacing a face. `npm test` validates that the catalog matches the active face list.

For watch-face changes, include:

- The reference image or source.
- A screenshot of the rendered face.
- Notes about any intentional approximation.

Watch and clock faces should be built as client-side SVG, researched against real reference photos, and tested across multiple times and dates. Do not use raster watch-face images or server-rendered assets for the faces.
