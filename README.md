# 🦔 Hedgie Open

Lightweight, single-file household budget planner.

Live: [https://lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie)
Mirror: [https://hedgie.pages.dev](https://hedgie.pages.dev)

---

## Overview

Hedgie Open is an offline-first budgeting app that runs entirely from a single `index.html`.

No accounts. No backend. No build step.

Optional cloud sync supports multi-user households with signed and optionally encrypted data.

---

## Features

### Budgeting

* Receipt logging with vendor memory and recurring bills
* Monthly budget vs actual tracking
* Yearly spending view (Hibernation View)
* Budget planner with monthly/yearly support
* Custom categories (color, reorder, rename)

### Insights

* Rainy day buffer allocation
* Built-in notifications (bills, budgets, sync, reminders)
* Custom notification rules (11 fields, AND/OR logic)

### Sync & data

* JSONBin, GitHub Gist, Dropbox, or self-hosted sync
* HMAC-SHA256 signed payloads
* Optional AES-256-GCM encryption
* Conflict resolution and auto-merge
* Auto-archive for old receipts

### App features

* Dark mode (synced across devices)
* Installable PWA (desktop + mobile)
* Multi-user attribution per entry
* Granular data erase options

---

## Getting started

1. Download `index.html`
2. Open in a modern browser
3. Enter display name
4. Add income and expenses
5. Start logging receipts

Works fully offline.

---

## Cloud sync (optional)

### JSONBin

```json
{"_hedgie":true,"version":0}
```

* Create bin → copy Bin ID + Master Key
* Add in Settings → Cloud sync
* Push from one device, sync on others

### GitHub Gist

* Create private gist (`hedgie.json`)
* Generate token with `gist` scope
* Add Gist ID + token in app

### Self-hosted

* GET returns JSON
* PUT stores JSON
* Optional Bearer token

```bash
npm install express
HEDGIE_TOKEN=secret node server.js
```

---

## Security

* Shared secret key (Settings → Identity)
* HMAC-SHA256 signing
* Optional AES-256-GCM encryption
* Sync rejected on key mismatch

---

## PWA install

### Android / Desktop

Use the Install button when available.

### iOS / iPadOS

1. Tap Share in browser
2. Tap Add to Home Screen

(No programmatic install support on iOS)

---

## Sync safety

* Empty state → always pulls
* First sync → requires user choice (pull/push)
* Manual Pull / Push always available

---

## Data controls

* Erase identity & sync
* Erase budget & receipts
* Erase everything

---

## Limits

* Receipts: 1,000 max
* Vendors: 200 max
* Expense lines/category: 25 max
* Sync payload: ~100KB limit

---

## Compatibility

* Chrome ✓
* Safari ✓
* Firefox ✓
* Brave ✓

Notes:

* Crypto requires HTTPS or localhost
* file:// disables encryption/sync signing

---

## Deployment

### GitHub Pages

* Fork repo
* Enable Pages on main branch

### Cloudflare Pages

* Upload `index.html`

---

## License

MIT

---

## Roadmap

Native Hedgie app:

* iOS/macOS (SwiftUI)
* CloudKit sync
* Expanded financial planning ("Den")

---

## Contributing

PRs and issues welcome.
See CONTRIBUTING.md.

---

## Recent changes (v1.5.x)

* iOS install flow fixed (manual-only)
* Dark mode improvements
* AES-GCM encryption added
* Sync crash fixes (payload validation)
* Notification system improvements (info tier)
* Improved iOS install detection
* Receipt log dark mode contrast fix
