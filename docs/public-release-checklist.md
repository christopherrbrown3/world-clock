# Public Release Checklist

Use this before a public release or showcase update. The repository is already public; the visibility step applies only if publishing a separate private copy.

## Repository Presentation

- README explains what the project is within the first few lines.
- README includes a current screenshot or preview image with the pictured rendition identified.
- The index, README, model-version guide, and manifest agree on available pages; release dates and snapshot dates are distinguished.
- Repository description and topics are set on GitHub.
- No local machine paths, private notes, or scratch artifacts are included.
- Issues are clean enough for visitors to understand the roadmap.

## Legal And Attribution

- MIT license is present for original code and documentation.
- Notice file explains that brand references are descriptive and not presented as endorsement.
- Avoid checking in copyrighted reference photos unless they are licensed for reuse.
- Third-party font or asset licenses and provenance are included.

## Engineering Hygiene

- `npm test` passes locally.
- GitHub Actions pass on `main`.
- Branch workflow is documented.
- Issue and pull request templates are present.
- Dependabot is enabled for GitHub Actions updates.

## Release

- Create a version tag, such as `v0.1.0`.
- Create a GitHub Release with screenshots and a short changelog.
- Enable GitHub Pages so visitors can open the app from the repository homepage.
- If publishing a private copy, change its visibility only with explicit maintainer authorization.
