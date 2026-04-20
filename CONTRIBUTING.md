# Contributing to Hedgie

Thanks for your interest in contributing. Hedgie is intentionally simple — a single HTML file with no build tooling, no package manager, no framework. Contributions should respect that philosophy.

## Ground rules

- The entire app must remain a **single self-contained HTML file**
- **Zero external dependencies** at runtime — no CDN scripts, no npm packages
- All features must work **offline** (except cloud sync, which is opt-in)
- New features should not add significant payload size — keep the file under ~200KB

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
- New notification types
- Performance improvements for large receipt datasets
- Translations (the UI text is currently English only)

## What we'll probably decline

- Framework rewrites (React, Vue, etc.) — the single-file constraint is intentional
- Features that require an always-on server
- Features that collect or transmit user data to any third party
- Breaking changes to the backup JSON schema without a migration path

## Reporting bugs

Open a GitHub Issue with:
- What you expected to happen
- What actually happened
- Browser and OS
- Steps to reproduce

## Schema changes

If your contribution changes the backup JSON structure, you must also update `applyPayload()` to handle the old format gracefully. Existing backups should always load without errors.

## Code style

There's no linter. Broadly:
- Keep JS functions focused and named clearly
- CSS variables for all colors — no hardcoded hex values in styles
- `esc()` every string before inserting into innerHTML
- Round all displayed numbers — no raw float output to the UI
