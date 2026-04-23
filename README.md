# 🦔 Hedgie Open

A lightweight household budget planner as a single-page-app. 

**Live:** [lancebramsay.github.io/hedgie](https://lancebramsay.github.io/hedgie) · Mirror: [hedgie.pages.dev](https://hedgie.pages.dev)

---

## Features

- **Log receipts** — quick-entry form with vendor memory, date picker, recurring bill support, and inline editing
- **Monthly report** — budget vs. actual spending by category with color-coded progress bars and per-user breakdown
- **Hibernation View** — full-year spending timeline with monthly bars and a budget reference line
- **Budget planner** — income sources, categorized expenses with monthly/yearly frequency toggle and High/Medium/Low priority
- **Custom categories** — six locked defaults plus unlimited custom categories with color picker, rename, reorder, and remove
- **Rainy day buffer** — monthly surplus allocated across categories weighted by priority and actual expense cost
- **Custom notifications** — build your own alerts from 11 queryable fields with AND/OR condition logic
- **Built-in notifications** — upcoming bills, budget warnings, sync staleness, and logging reminders
- **Cloud sync** — optional, supports JSONBin, GitHub Gist, self-hosted endpoints, and Dropbox
- **HMAC signing** — shared secret key signs every sync payload for household integrity checking
- **Multi-user** — display name stamps every receipt and sync event; conflict resolution modal on budget differences
- **Auto-archive** — receipts older than the prior calendar year move to archive automatically
- **Granular data erase** — erase identity only, budget and receipts only, or everything

## Getting started

1. Download `index.html`
2. Open it in any modern browser (Chrome, Safari, Firefox, Brave)
3. Enter your display name when prompted
4. Go to **Budget planner** and fill in your income and expenses
5. Log receipts in **Log receipt** as you spend

No account, no signup, no internet required for core use.

## Cloud sync (optional)

Hedgie can sync between household members using any of these free providers:

### JSONBin.io (recommended for beginners)

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Click **+ Create Bin** — initialize it with `{"_hedgie":true,"version":0}`
3. Copy your **Bin ID** and **Master Key** from the dashboard
4. Open the gear icon → **Cloud sync** → select JSONBin and paste both values
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

Add an optional Bearer token for authentication. Works well on a homelab. See `server.js` for a ready-to-run Node.js/Express example.

```bash
npm install express
HEDGIE_TOKEN=your-secret node server.js
```

### Shared secret key

For multi-user sync, generate a shared key in **Settings → Identity**. Both users paste the same key. Every sync payload is HMAC-SHA256 signed — if the key doesn't match, the payload is rejected before any data is applied. Share the key once via AirDrop or iMessage, never email.

## Sync safety

The Sync button has two built-in guards to prevent accidental data loss:

- **Empty state guard** — if local data is blank, Hedgie always pulls instead of pushing
- **First-sync guard** — if local data exists but the session has never synced before, Hedgie fetches the cloud first and asks you to choose pull-or-push before proceeding

Use **Pull** and **Push** in the Cloud sync accordion for full manual control.

## Custom notifications

Open gear → **Notifications → Custom notifications** → **+ Add** to build your own alerts. Each rule supports up to 3 conditions joined by AND or OR, with fields including:

- Receipt category, vendor, amount, note, or who logged it
- Month total spent, month total by category, receipt count this month
- Category budget percentage used
- Days since last receipt
- Expense line amount

Rules fire inside the bell notification panel at Low, Medium, or High urgency.

## Data erase options

The **Data** accordion in Settings has three targeted erase options:

| Button | What it clears |
|---|---|
| Erase identity & sync | Display name, shared key, all provider credentials |
| Erase budget & receipts | Income, expenses, receipts, vendors, archives, syncMeta |
| Erase everything | All of the above plus all settings |

## Payload size limits

| Resource | Warning | Limit |
|---|---|---|
| Active receipts | 800 | 1,000 (auto-archives) |
| Vendor memory | 160 | 200 (auto-prunes oldest) |
| Expense lines per category | — | 25 |
| Sync payload | 80KB | ~100KB (JSONBin free tier) |

The **Data health** panel in Settings shows current usage against these limits.

## Browser compatibility

Hedgie uses the Web Crypto API for HMAC signing, which requires a secure context (`https://` or `localhost`). Sync works from `file://` URLs but signatures are skipped.

| Feature | Chrome | Safari | Firefox | Brave |
|---|---|---|---|---|
| Core budget app | ✓ | ✓ | ✓ | ✓ |
| Cloud sync | ✓ | ✓ | ✓ | ✓ |
| HMAC signing | https only | https only | https only | https only |

## Deploying your own instance

**Cloudflare Pages**
1. Cloudflare dashboard → Workers & Pages → Create application → Pages → Upload assets
2. Drag in `index.html`, name the project, deploy
3. Live at `your-project.pages.dev`

**GitHub Pages**
1. Fork this repo
2. Settings → Pages → Deploy from branch → main
3. Live at `your-username.github.io/hedgie`

## License

MIT — see [LICENSE](LICENSE)

## Roadmap

**Hedgie** (coming soon) — native iOS/macOS app with CloudKit sync, SwiftUI interface, and expanded financial planning features called the Den.

## Contributing

Issues and pull requests welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
