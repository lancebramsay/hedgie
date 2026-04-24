# 🦔 Open Hedgie

A lightweight, offline-first household budget planner that runs entirely from a single HTML file.

**Live:** [hedgie.pages.dev](https://hedgie.pages.dev)
**Mirror:** [lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie)
**Current stable:** v1.5.5

---

## What it is

Open Hedgie is a self-contained budgeting app. No accounts, no backend, no build step, no dependencies. Download one file and open it in a browser.

Optional cloud sync lets multiple household members share data with signed and optionally encrypted payloads across any device.

---

## Features

### Budgeting
- Receipt logging with vendor memory and recurring bill auto-logging
- Monthly budget vs actual tracking per category
- Yearly spending overview (Hibernation View)
- Budget planner with monthly/yearly expense frequency support
- Custom categories — add, rename, reorder, color, remove
- Rainy day buffer distribution weighted by category priority

### Insights & notifications
- Built-in notifications: upcoming bills, budget warnings, sync staleness, monthly logging nudge, first-session sync prompt, monthly local backup reminder
- Four urgency tiers: high (red), med (amber), low (green), info (blue)
- Bell badge color reflects highest-priority active notification
- Custom notification rule builder: 11 queryable fields, AND/OR logic, up to 3 conditions per rule

### Sync & data
- Cloud providers: JSONBin.io, GitHub Gist, self-hosted endpoint, Dropbox
- HMAC-SHA256 signed payloads with shared secret key
- Optional AES-256-GCM payload encryption (derived from shared key via PBKDF2)
- Conflict resolution modal and automatic receipt merging
- Auto-archive for receipts older than the prior calendar year
- Local backup (save/restore JSON), CSV export, Copy for Sheets

### App & device
- Dark mode — toggle in tab bar, synced across devices via cloud payload
- Installable PWA: 📲 button on Android/desktop; Share → Add to Home Screen banner on iOS/iPadOS
- Swipe left/right between tabs on any touch screen (iOS, Android, tablet)
- Multi-user receipt attribution — each entry stamped with the logger's display name

---

## Getting started

1. Download `index.html` from the [releases page](https://github.com/lancebramsay/hedgie/releases) or the repo root
2. Open in Chrome, Safari, Firefox, or Brave
3. Enter your display name when prompted
4. Set up your budget in **Budget planner**
5. Log purchases in **Log receipt** as you spend

Works fully offline. No internet required for core features.

---

## Cloud sync (optional)

### JSONBin.io (easiest)

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Create a bin — initialize with `{"_hedgie":true,"version":0}`
3. Copy the Bin ID and Master Key
4. Gear → Cloud sync → JSONBin → paste both → **Push**

### GitHub Gist

1. Create a private Gist at [gist.github.com](https://gist.github.com) with a file named `hedgie.json`
2. Generate a Personal Access Token with `gist` scope
3. Gear → Cloud sync → GitHub Gist → paste Gist ID and token

### Self-hosted

Expects GET (returns JSON) and PUT (stores JSON) on one URL. Optional Bearer token auth.

```bash
npm install express
HEDGIE_TOKEN=secret node server.js
```

---

## Security

- Shared secret key (Settings → Identity) — generates a random 128-bit key, copy and share via AirDrop or iMessage
- HMAC-SHA256 payload signing — sync rejected on key mismatch
- Optional AES-256-GCM encryption — toggle in Settings → Identity, requires HTTPS
- Key derivation: `PBKDF2(sharedSecret, salt='hedgie-aes-v1', 100,000 iterations) → AES-256 key`

---

## Sync safety

- **Empty session → always pulls.** A blank session (no income, expenses, or receipts) can never push to the cloud, even if preferences like dark mode are changed.
- **First sync with local data → user confirms.** Hedgie fetches the cloud version first and shows a pull-or-push dialog before touching anything.
- **Conflict resolution.** If both users have changed the budget plan since last sync, a modal lets you choose which plan to keep. Receipts are always merged automatically.

---

## PWA install

### Android / Desktop
The 📲 button appears in the tab bar when the browser offers installation. Tap to install.

### iOS / iPadOS
A banner appears with instructions: tap **Share ⬆** in the browser toolbar → **Add to Home Screen**.
This is the only install path on iOS — Apple does not expose a programmatic install API.

Once installed and opened as a PWA, both the button and banner are hidden automatically.

---

## Limits

| Resource | Warning at | Hard limit |
|---|---|---|
| Active receipts | 800 | 1,000 (auto-archives) |
| Vendor memory | 160 | 200 (auto-prunes oldest) |
| Expense lines per category | — | 25 |
| Sync payload | 80 KB | 100 KB |

---

## Compatibility

| Browser | Support |
|---|---|
| Chrome (desktop + Android) | ✓ Full |
| Safari (macOS + iOS) | ✓ Full |
| Brave | ✓ Full |
| Firefox | ✓ Full (no PWA install prompt) |

> Encryption and HMAC signing require HTTPS or localhost. `file://` URLs skip signing.

---

## Deployment

### GitHub Pages
Fork the repo and enable Pages on the `main` branch — no configuration needed.

### Cloudflare Pages
Upload `index.html` (and `manifest.json`, `icon-192.png`, `icon-512.png` for PWA support).

---

## Roadmap

A future **Hedgie** native app (iOS/macOS, SwiftUI, CloudKit sync) is planned with expanded financial planning features including debt tracking and financing management ("Den features"). The Open Hedgie schema already includes forward-compatible fields (`financing[]`, `category.financing`, `financeId`) that Den will populate.

---

## Contributing

PRs and issues welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).
