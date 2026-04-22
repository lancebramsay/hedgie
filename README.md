# 🦔 Hedgie — Hedge Your Spending

A lightweight household budget planner as a single-page-app. No server, no install, no dependencies. Pilot app currently hosted at https://lancebramsay.github.io/hedgie/ for testing purposes. Cloudflare mirror at https://hedgie.pages.dev/.

## Features

- **Log receipts** — quick-entry form with vendor memory, date picker, and recurring bill support
- **Monthly report** — budget vs. actual spending by category with color-coded progress bars
- **Hibernation View** — full-year spending timeline with monthly bars and a budget reference line
- **Budget planner** — income sources, categorized expenses with monthly/yearly frequency toggle, priority levels
- **Rainy day buffer** — surplus allocation weighted automatically by category priority
- **Notifications** — upcoming bills, budget warnings, sync staleness, and logging reminders
- **Cloud sync** — optional, supports JSONBin, GitHub Gist, self-hosted endpoints, and Dropbox
- **HMAC signing** — shared secret key signs every sync payload for household integrity checking
- **Multi-user** — display name stamps every receipt and sync event; conflict resolution on push/pull
- **Auto-archive** — receipts older than the prior calendar year move to a compressed archive automatically
- **Customizable categories** — six locked defaults plus unlimited custom categories with color picker

## Getting started

1. Download `index.html`
2. Open it in any modern browser (Chrome, Safari, Firefox, Brave)
3. Enter your display name when prompted
4. Go to **Budget planner** and fill in your income and expenses
5. Log receipts in **Log receipt** as you spend

That's it. No account, no signup, no internet connection required for basic use.

## Cloud sync (optional)

Hedgie can sync between household members using any of these free providers:

### JSONBin.io (recommended for beginners)

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Click **Create Bin** and initialize it with `{"_hedgie":true,"version":0}`
3. Copy your **Bin ID** and **Master Key** from the dashboard
4. Open Hedgie's gear icon → **Cloud sync** → select JSONBin and paste both values
5. Click **Push** — your data is now in the cloud
6. Your household partner opens Hedgie on their device, enters the same credentials, and taps **Sync**

### GitHub Gist (for GitHub users)

1. Create a **private** Gist at [gist.github.com](https://gist.github.com) with a file named `hedgie.json`
2. Generate a Personal Access Token with `gist` scope at [github.com/settings/tokens](https://github.com/settings/tokens)
3. In Hedgie: gear → Cloud sync → GitHub Gist, paste your Gist ID and token

### Self-hosted endpoint

Point Hedgie at any endpoint that accepts:
- `GET /your-path` → returns the stored JSON payload
- `PUT /your-path` → accepts a JSON body and stores it

Add an optional Bearer token for authentication. Works well on a homelab running nginx, Node, or a simple Python server.

## Shared secret key

For multi-user sync, generate a shared key in **Settings → Identity**. Both users paste the same key. Every sync payload is HMAC-SHA256 signed — if the key doesn't match, the payload is rejected before any data is applied.

Share the key once via AirDrop, iMessage, or another trusted channel. Never email it.

## Data & backups

- **Save local** — downloads a timestamped `.json` snapshot to your device
- **Restore local** — loads any `.json` backup file
- **Auto-archive** — receipts older than the prior calendar year are automatically moved to an archive object inside the backup, keeping the active dataset lean

Store your backup files in iCloud Drive, Google Drive, or any folder that syncs between your devices.

## Payload size limits

| Resource | Soft limit | Hard limit |
|---|---|---|
| Active receipts | 800 (warning) | 1,000 (auto-archive) |
| Vendor memory | 160 (warning) | 200 (auto-prune) |
| Expense lines per category | — | 25 |
| Sync payload | 80KB (warning) | ~100KB (JSONBin free tier) |

The **Data health** panel in Settings shows current usage against these limits.

## Self-hosting the sync endpoint

See `server.js` for a ready-to-run Node.js/Express sync server with rolling backups.

```bash
npm install express
HEDGIE_TOKEN=your-secret node server.js
```

Then in Hedgie settings: Provider → Self-hosted, URL → `http://your-server:3000/hedgie`, Token → your-secret.

## Deploying to Cloudflare Pages

1. Rename `index.html` if needed (must be `index.html` to serve at root URL)
2. Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Upload assets**
3. Drag in `index.html`, name the project, deploy
4. Live at `your-project.pages.dev`

## Browser compatibility

Hedgie uses the Web Crypto API (`crypto.subtle`) for HMAC signing, which requires a **secure context** (`https://` or `localhost`). Running from a local `file://` URL disables signing but sync still works.

| Feature | Chrome | Safari | Firefox | Brave |
|---|---|---|---|---|
| Core budget app | ✓ | ✓ | ✓ | ✓ |
| Cloud sync | ✓ | ✓ | ✓ | ✓ |
| HMAC signing | https only | https only | https only | https only |

## License

MIT — see [LICENSE](LICENSE)

## Roadmap

- [ ] AES-GCM payload encryption (toggle in Settings)
- [ ] PWA manifest for home screen install
- [ ] iOS/macOS native app with CloudKit sync (Den)

## Contributing

Issues and pull requests welcome. The entire app is a single HTML file — no build tooling, no dependencies. Open `index.html` in a text editor and go. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
