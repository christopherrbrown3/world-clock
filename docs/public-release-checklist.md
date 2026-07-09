# Public Release Checklist

Use this before changing the repository visibility from private to public.

## Repository Presentation

- README explains what the project is within the first few lines.
- README includes a current screenshot or preview image.
- Repository description and topics are set on GitHub.
- No local machine paths, private notes, or scratch artifacts are included.
- Issues are clean enough for visitors to understand the roadmap.

## Legal And Attribution

- Choose a license before public release.
- Confirm any brand references are descriptive and not presented as endorsement.
- Avoid checking in copyrighted reference photos unless they are licensed for reuse.

## Engineering Hygiene

- `npm test` passes locally.
- GitHub Actions pass on `main`.
- Branch workflow is documented.
- Issue and pull request templates are present.
- Dependabot is enabled for GitHub Actions updates.

## Release

- Create a version tag, such as `v0.1.0`.
- Create a GitHub Release with screenshots and a short changelog.
- Only then switch repository visibility to public.
