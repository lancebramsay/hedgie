🦔 Hedgie Open

A lightweight, single-file household budget planner.

Live: https://lancebramsay.github.io/hedgie

Mirror: https://hedgie.pages.dev

Overview

Hedgie Open is a zero-dependency, offline-first budgeting app that runs entirely from a single index.html. No accounts, no backend, no build step.

Optional cloud sync enables multi-user households with signed (and optionally encrypted) data.

Features
Budgeting & tracking
Quick receipt logging with vendor memory and recurring bills
Monthly report with budget vs. actual and per-user breakdown
Yearly “Hibernation View” with budget reference line
Flexible budget planner (monthly/yearly expenses, priorities)
Custom categories with color, reorder, rename, and delete
Insights & automation
Rainy day buffer allocation based on priority and spend
Built-in notifications (bills, budget usage, sync, reminders)
Custom notification rules (11 fields, AND/OR logic, 4 urgency levels)
Data & sync
Optional cloud sync (JSONBin, GitHub Gist, Dropbox, self-hosted)
HMAC-SHA256 signing for integrity
Optional AES-256-GCM encryption (Web Crypto)
Conflict resolution and automatic receipt merging
App experience
Dark mode (synced across devices)
Installable as a PWA (desktop + mobile)
Multi-user support with per-entry attribution
Auto-archive for old receipts
Granular data erase options
Getting started
Download index.html
Open in any modern browser
Enter your display name
Add income and expenses in Budget planner
Start logging receipts

Works fully offline. No setup required.

Cloud sync (optional)

Supports multiple free providers:

JSONBin (recommended)

Create a bin with:

{"_hedgie":true,"version":0}
Paste Bin ID + Master Key into Settings → Cloud sync
Push from one device, Sync on others
GitHub Gist
Create a private Gist (hedgie.json)
Use a token with gist scope
Self-hosted
GET → return JSON
PUT → store JSON
Optional Bearer auth
npm install express
HEDGIE_TOKEN=your-secret node server.js
Security model
Shared secret key (Settings → Identity)
All payloads:
Signed with HMAC-SHA256
Optionally encrypted with AES-256-GCM
Key must match across devices or sync is rejected
PWA installation
Desktop / Android

Use the in-app Install button when available.

iOS / iPadOS

Apple does not allow programmatic install prompts.

Tap Share in the browser toolbar
Tap Add to Home Screen

Hedgie displays this instruction in-app when applicable.

Sync safety
Empty state guard → always pulls
First-sync guard → requires explicit choice

Manual Pull and Push are always available.

Data management
Action	Effect
Erase identity & sync	Clears name, key, provider credentials
Erase budget & receipts	Clears all financial data
Erase everything	Full reset
Limits
Resource	Warning	Limit
Active receipts	800	1,000
Vendor memory	160	200
Expense lines/category	—	25
Sync payload	80KB	~100KB
Compatibility
Feature	Chrome	Safari	Firefox	Brave
Core app	✓	✓	✓	✓
Cloud sync	✓	✓	✓	✓
Crypto (HMAC/AES)	HTTPS only	HTTPS only	HTTPS only	HTTPS only

Web Crypto requires https:// or localhost.
On file://, sync works but cryptographic features are disabled.

Deployment
GitHub Pages
Fork → enable Pages → deploy main
Cloudflare Pages
Upload index.html → deploy
License

MIT — see LICENSE

Roadmap

Hedgie (native)
Planned iOS/macOS app with CloudKit sync and expanded financial planning (“Den”).

Contributing

Issues and PRs welcome. See CONTRIBUTING.md.

Recent changes (v1.5.x)
Improved iOS install guidance (manual, platform-correct)
Added AES-GCM encryption for sync payloads
Introduced full dark mode with synced preference
Fixed sync crash from malformed payloads
Refined notification system (added info tier)
Improved iOS install detection and visibility
Dark mode UI refinements (including receipt log contrast)
