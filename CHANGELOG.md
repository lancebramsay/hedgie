# Changelog

All notable changes to Hedgie are documented here.

## [1.0.0] — 2026-04-20

### Initial public release

**Core budget planner**
- Income sources with multiple entries (salary, side income, etc.)
- Six default categories: Home, Transportation, Food, Services, Debts, Savings
- Expense line items with monthly/yearly frequency toggle and priority levels (High/Medium/Low)
- Yearly expenses automatically converted to monthly equivalent for consistent budgeting
- Net cash flow summary with income vs expenses breakdown

**Receipt logging**
- Quick-entry form: category, amount, vendor/store, date, optional note
- Vendor memory — remembers vendors and auto-suggests with category matching
- Date picker defaulting to today, fully editable
- Recurring bill support — mark a bill as monthly with a due date; auto-logged each month on open
- Recurring badge on logged entries for visual distinction

**Monthly report**
- Budget vs. actual spending per category with color-coded progress bars
- Green → amber → red as categories approach and exceed budget limits
- Per-user spending breakdown when multiple household members log entries
- Transaction list with vendor, category, date, note, and who logged it

**Hibernation View (yearly report)**
- 12-month spending timeline with color-coded bars
- Dashed reference line showing monthly budget threshold
- Current month highlighted with "now" label above bar
- Future months shown as faint placeholders
- Color legend for under/near/over budget

**Rainy day buffer**
- Surplus distribution weighted by category priority and actual expense costs
- High-priority expense categories receive proportionally larger buffer share
- Visual bar per category showing relative allocation

**Notifications**
- Bell icon with badge count in tab bar
- Upcoming recurring bills (within configurable 1 or 2 week window)
- Budget warnings when category spending exceeds 80% of monthly budget
- Yearly expense reminders
- Cloud sync staleness alerts (7+ days since last sync)
- Monthly logging nudge (past day 20 with no receipts logged)
- Per-type toggle switches in Settings
- Color-coded by urgency: red (urgent), amber (heads up), subtle (info)
- 5-minute periodic refresh while app is open

**Cloud sync**
- Supported providers: JSONBin.io, GitHub Gist, self-hosted endpoint, Dropbox
- Manual Pull and Push controls
- Bidirectional Sync button in global status bar
- HMAC-SHA256 payload signing with shared secret key
- Optimistic locking with version numbers
- Conflict resolution modal for budget plan differences
- Automatic receipt merging (union by ID, no duplicates)
- First-sync detection — pull-only on initial sync to prevent overwriting cloud data
- Autosave guard — prevents pushing before first pull in a new session
- syncMeta persisted to localStorage for accurate staleness tracking across sessions

**Category management**
- Six locked default categories (color customizable, not removable)
- Add unlimited custom categories with name and color picker
- Custom categories: reorder with up/down arrows, rename inline, remove
- Reset to defaults option

**Data management**
- Auto-archive: receipts older than the prior calendar year move to archive on startup
- Save local: timestamped JSON backup download
- Restore local: load any backup file with schema migration for older formats
- Export CSV: budget plan as spreadsheet-ready CSV
- Copy for Sheets: tab-separated data copied to clipboard for Google Sheets paste
- Data health panel: payload size, receipt count, vendor count, limit warnings

**Settings (gear icon)**
- Three accordion sections: Identity, Cloud sync, Data
- Display name for receipt attribution
- Shared secret key: generate, copy, paste
- Sync provider switcher with context-sensitive configuration fields
- Notification toggles and reminder window preference
- Reset all data option

**Global status bar**
- Persistent slim bar below tab bar
- Real-time autosave feedback: saving → saved locally / synced to cloud
- Cloud sync operation results
- Sync button always accessible when provider configured

**Welcome flow**
- First-run display name prompt
- Auto-generates shared key on first setup

**Accessibility & compatibility**
- Works offline — no internet required for core features
- Single HTML file, zero dependencies, zero build step
- Responsive layout for mobile and desktop
- Dark mode support via CSS variables
- Web Crypto API for HMAC signing (requires HTTPS)
- Graceful fallback when crypto unavailable (local file / HTTP)
