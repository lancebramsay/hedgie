# Open Hedgie

**Hedgie is a household budget planner that belongs entirely to you.**

No account. No subscription. No company holding your data. Just a single file you open in a browser — on any device, any time, fully offline if you want it to be.

When you're ready for more, Hedgie connects to free services you already trust: GitHub, Dropbox, and others for cloud sync; CoinGecko, Finnhub, and more for live prices. Nothing proprietary, nothing locked in. Every feature is built on open tools that stay free.

**Stable:** [hedgie.pages.dev](https://hedgie.pages.dev) — Cloudflare Pages, fully tested releases<br>
**Pilot:** [lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie) — GitHub Pages, latest updates<br>
**Current stable:** v2.5.9 | **Pilot:** v2.5.9

---

## Features

### Budgeting
- Receipt logging with vendor memory and recurring bill auto-logging — monthly, yearly, or every N months
- Monthly budget vs. actual tracking per category
- Yearly spending overview (Hibernation View)
- Budget planner with monthly, yearly, and custom-interval expense frequencies — all reduce to a monthly equivalent automatically
- Per-category recurring bill coverage indicator — flags underfunded categories
- Bill set-aside metric — total monthly provision needed across non-monthly expenses; color-coded against income remaining (green ≥ 120%, amber 100–120%, red < 100%)
- Custom categories — add, rename, reorder, color, remove; assign type (Expense, Savings, Investment)
- Income remaining excludes savings contributions — savings receipts stay liquid; investment receipts still count against it
- Rainy day buffer distribution weighted by category priority

### Insights and notifications
- Built-in notifications: upcoming bills, budget warnings, sync staleness, monthly logging nudge, first-session sync prompt, monthly backup reminder
- Four urgency tiers: high (red), med (amber), low (green), info (blue)
- Bell badge color reflects the highest-priority active notification
- Custom notification rule builder: 12 queryable fields, AND/OR logic, up to 3 conditions per rule

### Sync and data
- Cloud providers: GitHub Gist, Dropbox, JSONBin.io, self-hosted endpoint
- HMAC-SHA256 signed payloads with a shared secret key
- Optional AES-256-GCM payload encryption (derived from shared key via PBKDF2)
- Conflict resolution modal and automatic receipt merging
- Auto-archive moves receipts older than the prior calendar year to a read-only archive; configurable retention window (1–10 years, or keep forever)
- Local backup (save/restore JSON), decrypted export, CSV export, Copy for Sheets, archived receipt export

### Den (Preview)

Enable via **Settings → Den** to unlock a fourth tab for tracking long-term assets and liabilities alongside your monthly budget. All Den data is stored in the shared sync payload immediately — ready for native Den features in future phases.

- **Net worth metrics** — net worth, total assets, total debt, portfolio G/L at the top of the tab
- **Net Worth chart** — donut pie chart showing equity, stocks, ETFs, crypto, CD/savings, and savings goals
- **Portfolio Mix chart** — composition of the investment portfolio
- **Liabilities** — loans, credit, leases, and other financing accounts with balance, interest rate, term, and payoff estimate; optional asset value field for equity-building debts
- **Portfolio** — stocks, ETFs, crypto, CD/Savings, and other positions; CD/Savings entries calculate compound interest from principal, APY, and deposit date; purchase receipts can be linked to auto-track cost basis and units
- **Performance chart** — aggregate portfolio value over 1D / 1W / 1M / 3M / 6M / 1Y; all ranges are purchase-date-aware
- **Savings goals** — named targets with progress bar and budget line link
- **Live price feed** — CoinGecko (free, no key), Finnhub, Twelve Data, Alpha Vantage
- **Wallet balances** — connect a public 0x address or MetaMask/Brave/Coinbase Wallet; pulls ETH, POL, USDC, USDT, and DAI across Ethereum, Arbitrum, Base, and Polygon
- **Transaction import** — Etherscan API key optional; fetches transaction history across all enabled chains into a review queue before logging as receipts; auto-import mode available

### App and device
- Dark mode — toggle in Settings or the tab bar; synced across devices
- Installable PWA: 📲 button on Android/desktop; Share → Add to Home Screen on iOS/iPadOS
- Swipe left/right between tabs on any touch screen
- Left-hand mode — mirrors the tab bar layout for left-handed use (Settings → Appearance)
- Multi-user receipt attribution — each entry stamped with the logger's display name; signature color customizable per user

---

## Getting started

1. Download `index.html` from the [releases page](https://github.com/lancebramsay/hedgie/releases) or open the [hosted version](https://hedgie.pages.dev)
2. Open in Chrome, Safari, Firefox, or Brave
3. Enter your display name when prompted
4. Set up your budget in **Budget planner**
5. Log purchases in **Log receipt** as you spend

Works fully offline. No internet required for core features.

---

## Cloud sync (optional)

### GitHub Gist (recommended)

1. Create a private Gist at [gist.github.com](https://gist.github.com), name the file `hedgie.json`, set the initial content to `{"_hedgie":true,"version":0}`
2. Generate a **classic** Personal Access Token at github.com/settings/tokens with the `gist` scope — fine-grained tokens do not support Gist access
3. Settings → Sync → GitHub Gist → paste Gist ID and token → **Push**

100 MB per-file limit — effectively unlimited for household budget data.

### Dropbox

1. Create an app at [dropbox.com/developers/apps/create](https://www.dropbox.com/developers/apps/create) — choose **Scoped access** and **Full Dropbox**
2. Go to **Permissions** and enable `files.content.read` and `files.content.write`
3. Go to **Settings → OAuth 2** and click **Generate** to create a long-lived access token
4. Settings → Sync → Dropbox → paste the token → **Push**

Data saves as `/hedgie/data.json` in your Dropbox root.

### JSONBin.io

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Create a bin — initialize with `{"_hedgie":true,"version":0}`
3. Copy the Bin ID and Master Key
4. Settings → Sync → JSONBin → paste both → **Push**

100 KB payload limit — suitable for the first several months of typical use.

### Self-hosted

Expects GET (returns JSON) and PUT (stores JSON) on one URL. Optional Bearer token auth.

```bash
npm install express
HEDGIE_TOKEN=secret node server.js
```

---

## Settings

Settings are accessed via the **gear icon** in the bottom corner. They are organized into sections:

| Section | Contents |
|---|---|
| **Identity** | Display name, signature color, shared key, encryption |
| **Data** | Backup, restore, receipts CSV, budget CSV, archived receipt export, data retention |
| **Sync** | Cloud provider, credentials, pull/push/force refresh, payload health |
| **Den** | Den Preview toggle, price feed, API keys |
| **Wallet** | Etherscan key, transaction import direction, auto-import, gas fees |
| **Notifications** | Built-in notification toggles, custom rule builder |
| **Appearance** | Dark mode, dark mode button visibility, left-hand mode |
| **Danger zone** | Targeted clears (receipts, vendor memory, Den data) and full resets |

---

## Security

- Shared secret key (Settings → Identity) — generates a random 128-bit key; copy and share via AirDrop or iMessage
- HMAC-SHA256 payload signing — sync rejected on key mismatch
- Optional AES-256-GCM encryption — toggle in Settings → Identity; requires HTTPS
- Key derivation: `PBKDF2(sharedSecret, salt='hedgie-aes-v1', 100,000 iterations) → AES-256 key`
- API keys (price feeds, Etherscan) are stored only in `localStorage` on-device and are never included in sync payloads

---

## Sync safety

- **Empty session → always pulls.** A blank session cannot push to the cloud, even if preferences like dark mode were changed.
- **First sync with local data → user confirms.** Hedgie fetches the cloud version and shows a pull-or-push dialog before touching anything.
- **Conflict resolution.** If both users changed the budget plan since last sync, a modal lets you choose which plan to keep. Receipts are always merged automatically.

---

## PWA install

### Android / Desktop
The 📲 button appears in the tab bar when the browser offers installation. Tap to install.

### iOS / iPadOS
A banner appears with instructions: tap **Share ⬆** in the browser toolbar → **Add to Home Screen**.

Once installed as a PWA, the button and banner hide automatically.

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

| Channel | URL | Source | Purpose |
|---|---|---|---|
| **Stable** | [hedgie.pages.dev](https://hedgie.pages.dev) | Cloudflare Pages — `stable` branch | Fully tested, recommended for everyday use |
| **Pilot** | [lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie) | GitHub Pages — `main` branch | Latest updates, may include changes still being validated |

---

## Roadmap

### Phase 1 — Now: Open Hedgie

The free, open-source web edition. A complete household budgeting tool with Den Preview available today — liabilities, portfolio, savings goals, net worth chart, live prices, and wallet balances.

### Phase 2 — Next: NFT ecosystem

The **Hedgehog Den** NFT collection unlocks full Den features on Open Hedgie — no account, no subscription. Each NFT is a unique generative hedgehog and a self-sovereign Den license, valid across Ethereum, Arbitrum, Base, and Polygon.

A separate **Community App** serves as the ecosystem hub: NFT marketplace, staking hub (earn `$HEDGE` tokens), and a non-binding community signal board.

### Phase 3 — Later: Native Hedgie (iOS / macOS)

A native SwiftUI app with CloudKit sync, Sign in with Apple, and iCloud Keychain wallet backup. Den features included in the paid App Store download.

---

## Contributing

PRs and issues welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

---

## License

MIT — see [LICENSE](LICENSE).
