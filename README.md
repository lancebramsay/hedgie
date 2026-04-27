# 🦔 Open Hedgie

A lightweight, offline-first household budget planner that runs entirely from a single HTML file.

**Stable:** [hedgie.pages.dev](https://hedgie.pages.dev) — Cloudflare Pages, fully tested releases<br>
**Pilot:** [lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie) — GitHub Pages, latest updates<br>
**Current stable:** v1.7.7

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
- Custom categories — add, rename, reorder, color, remove; assign type (Expense, Savings, Investment)
- Income remaining excludes savings contributions — savings receipts stay liquid so they don't reduce the figure; investment receipts (CDs, retirement, etc.) still count against it
- Rainy day buffer distribution weighted by category priority

### Insights & notifications
- Built-in notifications: upcoming bills, budget warnings (expense categories only), sync staleness, monthly logging nudge, first-session sync prompt, monthly local backup reminder
- Four urgency tiers: high (red), med (amber), low (green), info (blue)
- Bell badge color reflects highest-priority active notification
- Custom notification rule builder: 12 queryable fields, AND/OR logic, up to 3 conditions per rule

### Sync & data
- Cloud providers: JSONBin.io, GitHub Gist, self-hosted endpoint, Dropbox
- HMAC-SHA256 signed payloads with shared secret key
- Optional AES-256-GCM payload encryption (derived from shared key via PBKDF2)
- Conflict resolution modal and automatic receipt merging
- Auto-archive moves receipts older than the prior calendar year to a read-only archive; configurable auto-prune permanently removes archived data beyond a set retention window (1–10 years, or keep forever)
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

### GitHub Gist (recommended)

1. Create a private Gist at [gist.github.com](https://gist.github.com), name the file `hedgie.json`, and set the initial content to `{"_hedgie":true,"version":0}`
2. Generate a **classic** Personal Access Token at github.com/settings/tokens with the `gist` scope — fine-grained tokens do not support Gist access
3. Gear → Cloud sync → GitHub Gist → paste Gist ID and token → **Push**

100 MB per-file limit — effectively unlimited for household budget data.

### Dropbox

1. Create an app at [dropbox.com/developers/apps/create](https://www.dropbox.com/developers/apps/create) — choose **Scoped access** and **Full Dropbox**
2. Go to the **Permissions** tab and enable `files.content.read` and `files.content.write`
3. Go to **Settings → OAuth 2** and click **Generate** to create a long-lived access token
4. Gear → Cloud sync → Dropbox → paste the token → **Push**

Data saves as `/hedgie/data.json` in your Dropbox root. 2 GB file limit.

### JSONBin.io

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Create a bin — initialize with `{"_hedgie":true,"version":0}`
3. Copy the Bin ID and Master Key
4. Gear → Cloud sync → JSONBin → paste both → **Push**

100 KB payload limit — suitable for the first ~6 months of typical use.

### Self-hosted

Expects GET (returns JSON) and PUT (stores JSON) on one URL. Optional Bearer token auth. Set your own payload limit in Settings → Cloud sync.

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
| Vendor memory | 160 | 200 (auto-prunes oldest) |
| Expense lines per category | — | 25 |
| Sync payload (JSONBin) | 80 KB | 100 KB |
| Sync payload (GitHub Gist) | 80 MB | 100 MB |
| Sync payload (Dropbox) | 1.6 GB | 2 GB |
| Sync payload (self-hosted) | 80% of configured limit | User-defined |

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

Open Hedgie uses a two-channel release model:

| Channel | URL | Source | Purpose |
|---|---|---|---|
| **Stable** | [hedgie.pages.dev](https://hedgie.pages.dev) | Cloudflare Pages — `stable` branch | Fully tested, recommended for everyday use |
| **Pilot** | [lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie) | GitHub Pages — `main` branch | Latest updates, may include changes still being validated |

### GitHub Pages (Pilot)
Deploys automatically from the `main` branch on every push. Always reflects the latest changes.

### Cloudflare Pages (Stable)
Deploys from the `stable` branch. Updated manually once a release is confirmed stable after pilot testing.

---

## Roadmap

A future **Hedgie** native app (iOS/macOS, SwiftUI, CloudKit sync) is planned with expanded financial planning features ("Den features"). The Open Hedgie schema already includes forward-compatible fields (`financing[]`, `savingsGoals[]`, `category.type`, `category.financing`, `financeId`) that Den will populate.

A **Den Preview** toggle in Settings enables early Den data features in Open Hedgie today — financing account tagging on receipts and category type assignments. All data is stored immediately and will be read natively by the Hedgie app on day one.

Planned Den features include:

- **Debt tracking & financing management** — track balances, interest, and payoff timelines alongside monthly budgets
- **Special event planning** — budget for vacations, trips, and one-off events separately from the monthly budget, with support for drawing from savings or temporary funding sources so planned splurges don't distort regular spending reports
- **Surplus allocation** — automatically suggest or apply end-of-month leftover funds toward savings goals and portfolio contributions, helping turn consistent under-spending into deliberate wealth building

---

## Contributing

PRs and issues welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).
