# Hedgie — Project Context & Continuation Guide

> For AI assistants picking up this project mid-stream. Read this before touching anything.

---

## What Hedgie is

A single-file HTML personal budget planner. Zero dependencies, zero build step, works offline. The entire app is `index.html` — one file, ~125KB.

**Live URLs:**
- GitHub: https://github.com/lancebramsay/hedgie
- Cloudflare Pages: https://hedgie.pages.dev (Lance's personal instance)
- GitHub Pages: https://lancebramsay.github.io/hedgie

**Local working copy:** `C:\Users\lance\hedgie-release\` (cloned from GitHub, has remote configured)

---

## Current feature set (v1.0.0)

- **Log receipt tab** — quick entry form, vendor memory/autocomplete, recurring bill support (auto-logs monthly), category filter pills, CSV export
- **Monthly report tab** — budget vs actual by category, color-coded progress bars, per-user spending breakdown chips
- **Hibernation View** — yearly bar chart, dashed budget reference line, "now" label above current month bar, future months as faint placeholders, per-category sparklines
- **Budget planner tab** — income sources, 6 default + unlimited custom categories, expense lines with Mo/Yr frequency and H/M/L priority, yearly→monthly math, rainy day buffer (priority-weighted surplus allocation)
- **Category manager** — 6 locked defaults (color-customizable), unlimited custom cats (rename/reorder/remove), reset to defaults
- **Notifications** — bell icon with badge, 5 types: upcoming recurring bills, budget warnings (80%+), yearly expenses approaching, sync staleness, monthly logging nudge. Per-type toggles + 1wk/2wk reminder window in Settings. Color-coded by urgency (red/amber/subtle). 5-min periodic refresh.
- **Cloud sync** — JSONBin, GitHub Gist, self-hosted endpoint, Dropbox. HMAC-SHA256 signing (Web Crypto API, requires HTTPS). Optimistic locking with version numbers. Conflict resolution modal. Pull-only first sync guard. syncMeta persisted to localStorage.
- **Settings drawer** — 4 accordion sections: Identity (name + shared key), Cloud sync, Notifications, Data (health panel + archive export + reset)
- **Global status bar** — slim bar below tab bar, autosave feedback, Sync button
- **Auto-archive** — receipts older than prior calendar year move to archives{} on startup
- **Data health panel** — payload KB bar, receipt/vendor counts vs limits

---

## Key architecture decisions

| Decision | Detail |
|---|---|
| Single HTML file | Zero build step, works from file:// or https:// |
| `categories` as mutable state | `CATS()` is a function, `catColor(name)` looks up color. `DEFAULT_CATS` + `DEF` are hardcoded constants |
| `LOCKED_CATS` | First 6 categories locked — color only. Custom cats fully editable |
| `syncMeta` persisted | Saved to `localStorage('hedgie_syncmeta')` for staleness tracking across sessions |
| Autosave guard | `cloudPushSilent()` throws if `lastPulledVersion===0 && version===0` to prevent overwriting cloud on fresh load |
| Auto-archive cutoff | Receipts older than `currentYear - 1` move to `archives[yr]` |
| Crypto fallback | `signPayload` / `verifyPayload` check for `window.crypto.subtle` — graceful fallback on file:// |

**Key state variables:**
```js
let categories   // [{name, color}] — mutable, persisted in sync payload
let income       // [{n, a}]
let expenses     // {catName: [{n, a, p, f}]}
let receipts     // [{id, cat, amt, vendor, note, date, by, recurring, recurId}]
let vendors      // {name: {cat, count}}
let archives     // {year: [receipts]}
let recurringBills // [{id, cat, amt, vendor, note, freq, day, by}]
let syncMeta     // {version, lastEditedBy, lastEditedAt, lastPulledVersion}
let settings     // {username, provider, jsonbinId, jsonbinKey, gistId, gistToken, selfUrl, selfToken, dropboxToken, sharedKey, reminderDays, notifs}
```

**Payload limits:**
- Active receipts: warn 800, hard 1000 (auto-archive)
- Vendors: warn 160, hard 200 (auto-prune)
- Payload: warn 80KB

---

## Two-product roadmap

### Track 1 — Hedgie (open source, done)
- Public MIT repo at https://github.com/lancebramsay/hedgie
- Files: `index.html`, `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `USER_GUIDE.md`, `LICENSE`, `server.js`
- Personal defaults scrubbed — generic placeholders throughout
- **Remaining:** Add repo description + topics on GitHub (web UI only — API auth not available in Claude Desktop), add screenshot.png to repo root

### Track 2 — Hedgie + Den (Apple App Store, in planning)
- **Build strategy:** WKWebView wrapper first (faster to TestFlight) → native SwiftUI later
- **Sync:** Replace JSONBin with CloudKit (private + shared zones for households)
- **Auth:** Sign in with Apple (replaces display name prompt + HMAC key exchange)
- **Dev machine:** MacBook Air M4
- **Requires:** Apple Developer Program ($99/yr), Xcode

**Den** = the premium investment/wealth module inside the same app. Name chosen: **Den** ("Hedgie tracks your spending. Den tracks your wealth.")

Den feature pillars:
1. **Debt runway** — amortization curves, paydown timeline, snowball vs avalanche
2. **Net worth snapshot** — home equity, vehicle depreciation, account balances, single number over time
3. **Investment ledger** — manual balance entries for 401k/IRA/brokerage, contribution tracking, growth curves (no live market data initially)

---

## File locations

| File | Location |
|---|---|
| Latest working app | `C:\Users\lance\hedgie-release\index.html` |
| GitHub repo | https://github.com/lancebramsay/hedgie |
| Local repo | `C:\Users\lance\hedgie-release\` |
| Lance's Cloudflare instance | https://hedgie.pages.dev |
| JSONBin bin | Configured in Lance's settings — has real budget data as of v10+ |
| MCP filesystem access | `C:\Users\lance\homelab` and `C:\Users\lance\hedgie-release` |

---

## MCP / tooling context

Claude Desktop on Lance's Windows machine has:
- **filesystem MCP** — access to `C:\Users\lance\homelab` and `C:\Users\lance\hedgie-release`
- **git MCP** — scoped to `C:\Users\lance\homelab` only (not hedgie-release)
- **powershell MCP** — available for git operations in hedgie-release, requires approval per command
- **GitHub API** — not directly accessible; git push works via stored Windows Credential Manager token

To push changes to hedgie repo:
```powershell
Set-Location 'C:\Users\lance\hedgie-release'
git add .
git commit -m "your message"
git push 2>&1  # "error" output is normal — look for main -> main to confirm success
```

---

## Known issues / quirks

- PowerShell treats git stderr as errors — a push showing `NativeCommandError` with `main -> main` in the output is **successful**
- `crypto.subtle` requires HTTPS — sync works on file:// but without HMAC signing
- `claude_desktop_config.json` was previously ReadOnly — fixed, but note it for future config edits
- Category rename "Car" → "Transportation" done in code defaults; old local backups with "Car" key load fine via `applyPayload` migration but expenses won't auto-rename

---

## Personal context (Lance)

- IT Consultant I at Thurston County, CJIS environment
- MacBook Air M4 for Apple dev work
- Wife is the second household user — same JSONBin credentials, same shared key
- JSONBin is the sync provider in use; real budget data restored from local backup
- Cloudflare Pages is the primary deployment target for the open source version
