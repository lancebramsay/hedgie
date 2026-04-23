# Changelog

All notable changes to Hedgie are documented here.

## [1.4.1] — 2026-04-22

### Notification fixes

**First-session sync prompt**
- New notification fires when a session opens with no local data, a sync provider is configured, and no sync has ever completed
- Urgency: High — shown immediately so a new device user knows to tap Sync before entering data
- Categorised under the existing sync notification toggle so it can be disabled if preferred

**Logging nudge fix**
- Nudge no longer fires for a blank app with no budget data — it now only fires when income or expense lines exist but no receipts have been logged past day 20
- Prevents confusing "you haven't logged anything" alerts for users who haven't set up a budget yet

### Schema additions (backward compatible, all fields optional)

**`financing[]` array**
- New top-level field in the sync payload `data` object
- Empty array in Hedgie Open — populated and managed by Hedgie native (Den features)
- Preserved through all sync operations: push, pull, merge, conflict resolution, and local restore
- Financing account shape:
  ```
  {
    id, name,
    type: 'loan' | 'credit' | 'lease' | 'other',
    originalBalance, currentBalance,
    interestRate, termMonths,
    startDate, endDate,
    linkedCategoryName,
    linkedExpenseIds: []
  }
  ```

**`category.financing` flag**
- Optional boolean on category objects
- When `true`, signals that expense lines in this category can be linked to a Den financing account
- The Debts default category is a natural candidate; any custom category can also opt in
- Has no effect in Hedgie Open — used by Hedgie native to surface financing UI on relevant expense lines

**`expense.financeId` and `recurringBill.financeId`**
- Optional string field on expense line items and recurring bill templates
- Stores the `id` of the linked financing account from `financing[]`
- Has no effect in Hedgie Open — used by Hedgie native to track payment history against a specific loan or line of credit

## [1.4.0] — 2026-04-22

### New features

**AES-GCM payload encryption (opt-in)**
- Toggle in Settings → Cloud sync: "Encrypt sync payload"
- Off by default — fully backward compatible with existing unencrypted setups
- Uses AES-256-GCM via the Web Crypto API
- Key derived from the existing shared secret via PBKDF2 (100,000 iterations, salt: `hedgie-aes-v1`) — no new key to share
- HMAC signature covers `ciphertext+iv` when encrypted, `data` when plain — integrity check works in both modes
- Graceful error states: wrong key, missing key, and non-HTTPS contexts each show distinct messages
- Toggle guards: requires a shared key and HTTPS — shows specific alert if either is missing

**Decrypted export**
- New button in Settings → Data: "Export decrypted backup"
- Always exports plain JSON regardless of encryption state
- Produces a file identical to Save local — compatible with Restore local and future Hedgie native app
- Migration path: export decrypted → Restore local on destination device → Push to overwrite cloud

### Schema

Encrypted payload format (canonical, shared with future Hedgie native):
```json
{
  "_hedgie": true,
  "version": 12,
  "encrypted": true,
  "iv": "<base64 12-byte IV>",
  "ciphertext": "<base64 AES-GCM ciphertext>",
  "signature": "<HMAC-SHA256 over ciphertext+iv+version+lastEditedAt>"
}
```
Key derivation: `PBKDF2(sharedSecret, salt='hedgie-aes-v1', iterations=100000, hash=SHA-256) → AES-256 key`

## [1.3.0] — 2026-04-22

### New features

**Inline receipt editing**
- Pencil edit button on every receipt row in the Log receipt tab
- Inline edit form expands in-place — no modal, no page navigation
- Editable fields: category, amount, vendor, note, date
- Vendor memory updated on save

**Recurring bill management**
- Recurring receipt edit form includes a due day field
- Saving updates the recurring bill template (category, amount, vendor, note, due day) so all future auto-logs reflect the change
- Delete recurring bill button removes the template and stops future auto-logging without deleting any existing receipts

## [1.2.0] — 2026-04-21

### New features

- Version display added to tab bar logo and budget planner footer
- Granular erase options in Settings → Data (erase identity & sync, erase budget & receipts, erase everything)
- Custom notification rule builder in Settings → Notifications

### Fixes

- Sync guards to prevent blank state overwriting cloud data
- Custom categories reconstructed from expense keys on pull/push
- Recurring bill due day clamped to actual month length
- Yearly expense notification removed
- No-cache headers added for GitHub Pages

## [1.1.0] — 2026-04-21

### Release name: Hedgie Open

This release establishes the **Open** edition of Hedgie — the public, self-hostable single-file budget planner. Future development will diverge into a separate **Hedgie+** edition with native app features.

### New features

**Custom notifications**
- Visual rule builder in Settings → Notifications → Custom notifications
- 11 queryable fields: receipt category, vendor, amount, note, logged-by, month total, month total by category, receipt count, category budget %, days since last receipt, expense line amount
- Up to 3 conditions per rule joined by AND or OR
- Low / Medium / High urgency matching the built-in notification system
- Rules stored in `settings.customNotifs[]`, persisted in localStorage and included in cloud sync payload
- Per-rule enable/disable toggle, edit, and delete

**Granular data erase options**
- Erase identity & sync — clears display name, shared key, and all provider credentials
- Erase budget & receipts — clears income, expenses, receipts, vendors, archives, and syncMeta while preserving identity and sync settings
- Erase everything — full reset of all data and settings
- Each option shows a specific confirmation dialog describing exactly what will be cleared

**Version display**
- Edition and version shown in tab bar logo ("Open · v1.1.0")
- Version and GitHub link shown in Budget planner footer

### Fixes & improvements

**Sync reliability**
- Guard 1: empty local state (no income/expenses/receipts) always triggers a pull instead of push
- Guard 2: when local data exists but syncMeta is at version 0 (post-restore or post-reset), fetches cloud first and prompts user to choose pull-or-push before proceeding
- Accept payloads missing `_hedgie` flag if they contain a valid `data` object (JSONBin sometimes strips top-level fields)
- `saveSyncMeta()` now called after every successful push
- `resetAll()` clears `localStorage('hedgie_syncmeta')` to prevent stale version stamps on next session

**Custom categories in sync**
- `applyPayload` now reconstructs missing categories from expense keys on pull
- `buildPayload` reconciles categories against expense keys before pushing
- Fixes custom categories disappearing after cloud pull

**Recurring bills**
- Due day clamped to actual month length — bills set to day 29/30/31 now fire correctly in shorter months
- Same clamp applied to notification reminder logic

**Notifications**
- Removed yearly expense notification (fired too frequently without specific due dates; custom notifications can replicate this with more precision)

**No-cache headers**
- Added `Cache-Control: no-cache` meta tags to force fresh load on GitHub Pages

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

**Settings**
- Identity: display name, shared secret key
- Cloud sync: provider switcher with per-provider credential fields
- Notifications: per-type toggles, reminder window, custom notification builder
- Data: health panel, export archived receipts, granular erase options

**Global status bar**
- Persistent slim bar below tab bar
- Real-time autosave feedback
- Cloud sync operation results
- Sync button always accessible when provider configured

**Welcome flow**
- First-run display name prompt
- Auto-generates shared key on first setup

**Accessibility & compatibility**
- Works offline — no internet required for core features
- Single HTML file, zero dependencies, zero build step
- Responsive layout for mobile and desktop
- Web Crypto API for HMAC signing (requires HTTPS)
