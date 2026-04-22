# Contributing to Hedgie Open

Thanks for your interest in contributing. Hedgie Open is intentionally simple — a single HTML file with no build tooling, no package manager, no framework. Contributions should respect that philosophy.

## Ground rules

- The entire app must remain a **single self-contained HTML file**
- **Zero external dependencies** at runtime — no CDN scripts, no npm packages
- All features must work **offline** (except cloud sync, which is opt-in)
- New features should not significantly increase file size — keep the file under ~250KB
- The backup JSON schema must remain backward compatible — existing backups must always load without errors

## How to contribute

1. Fork the repository
2. Open `index.html` in your editor — that's the whole app
3. Make your changes
4. Test in Chrome, Safari, and Firefox
5. Test on mobile (iOS Safari is the primary mobile target)
6. Open a pull request with a clear description of what changed and why

## What we welcome

- Bug fixes
- Sync provider adapters (new cloud backends)
- Accessibility improvements
- Mobile UX refinements
- New built-in notification types
- Performance improvements for large receipt datasets
- Custom notification field additions
- Translations (UI text is currently English only)

## What we'll probably decline

- Framework rewrites (React, Vue, etc.) — the single-file constraint is intentional
- Features that require an always-on server or external service
- Features that collect or transmit user data to any third party
- Breaking changes to the backup JSON schema without a migration path in `applyPayload()`

## Reporting bugs

Open a GitHub Issue with:
- What you expected to happen
- What actually happened
- Browser and OS
- Steps to reproduce

If the bug involves sync, include whether you're on HTTPS or a local file, and which provider you're using.

## Code style

There's no linter. Broadly:
- Keep JS functions focused and clearly named
- CSS variables for all colors — no hardcoded hex values in styles
- `esc()` every user-supplied string before inserting into innerHTML
- Round all displayed dollar amounts — no raw float output to the UI
- Comment non-obvious logic, especially in sync and payload handling

## Schema changes

If your contribution changes the backup JSON structure, you must also update `applyPayload()` to handle old formats gracefully. The function should never throw on a valid old-format backup.

## Sync changes

The sync system has several interacting guards (empty-state guard, first-sync guard, HMAC verification, conflict detection). If you modify `quickSync()`, `cloudPull()`, `cloudPush()`, or `applyPayload()`, test the following scenarios before submitting:

- Fresh session with no cloud data → Push should work
- Fresh session with existing cloud data → should pull, not overwrite
- Post-reset session → should detect blank state and pull
- Post-restore-from-backup session → should prompt before pushing
- Two users with different budget plans → conflict modal should appear
- Payload missing `_hedgie` flag but with valid `data` object → should be accepted

## Custom notifications

New queryable fields for custom notifications are defined in the `CN_FIELDS` array and evaluated in `evalCondition()`. If you add a new field, add it to both arrays and document what data it reads and when it returns true.

## Versioning

Hedgie Open uses [Semantic Versioning](https://semver.org/). The version string appears in two places in `index.html`:
- The tab bar logo subtitle
- The Budget planner footer

Update both when cutting a release. Tag the release in git with `git tag -a vX.Y.Z -m 'Hedgie Open vX.Y.Z'` and push the tag.
