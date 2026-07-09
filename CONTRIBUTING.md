# Contributing

This project uses a standard GitHub workflow so changes stay reviewable and easy to validate.

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

For watch-face changes, include:

- The reference image or source.
- A screenshot of the rendered face.
- Notes about any intentional approximation.
