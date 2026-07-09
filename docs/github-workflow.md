# GitHub Workflow

This project uses GitHub as the shared source of truth and Git as the local history.

## Core Concepts

- Repository: the project folder and its history.
- Commit: a saved snapshot with a message.
- Branch: an isolated line of work.
- Pull request: a proposed change from one branch into another.
- GitHub Actions: automated checks that run on GitHub.
- Issues: tracked bugs, tasks, and ideas.
- Labels: categories that make issues and pull requests searchable.
- Releases: named versions that mark stable points in history.

## Standard Change Loop

1. Start from `main`.
2. Create a branch.
3. Make one focused change.
4. Run `npm test`.
5. Commit.
6. Push the branch.
7. Open a pull request.
8. Wait for CI to pass.
9. Merge.
10. Pull `main` locally.

## Useful Commands

```sh
git status
git switch main
git pull
git switch -c my-change
git diff
npm test
git add .
git commit -m "My change"
git push -u origin my-change
gh pr create --fill
gh pr view --web
```

## Why This Project Uses Pull Requests

Pull requests are useful because they create:

- A checkpoint before code lands on `main`.
- A place for screenshots, notes, and references.
- A CI result attached to the exact change.
- A durable history of why the change happened.
