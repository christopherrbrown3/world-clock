# Contributing

This project uses a standard GitHub workflow so changes stay reviewable and easy to validate.

Before changing watch faces or creating a new model-version page, read `docs/model-and-contributor-guide.md`.

## Daily Workflow

1. Sync with GitHub:

   ```sh
   git switch main
   git pull
   ```

2. Create a branch:

   ```sh
   git switch -c short-description
   ```

3. Make the change and validate it:

   ```sh
   npm test
   ```

4. Commit locally:

   ```sh
   git add .
   git commit -m "Describe the change"
   ```

5. Push the branch and open a pull request:

   ```sh
   git push -u origin short-description
   gh pr create --fill
   ```

6. Merge after CI passes.

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
