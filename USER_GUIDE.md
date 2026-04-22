# 🦔 Hedgie Open — User Guide

> A lightweight household budget planner as a single-page-app. No server, no install, no dependencies.

## Table of contents

- [Getting started](#getting-started)
- [Log receipt tab](#log-receipt-tab)
- [Monthly report tab](#monthly-report-tab)
- [Budget planner tab](#budget-planner-tab)
- [Notifications](#notifications)
- [Settings](#settings)
- [Cloud sync](#cloud-sync)
- [Multi-user households](#multi-user-households)
- [Backups and data management](#backups-and-data-management)
- [Tips and tricks](#tips-and-tricks)

---

## Getting started

1. Download `index.html` from the [releases page](https://github.com/lancebramsay/hedgie/releases) or the repo root
2. Open it in any modern browser — Chrome, Safari, Firefox, or Brave
3. When prompted, enter your display name (this stamps your receipts and sync events)
4. Head to **Budget planner** and fill in your income sources and monthly expenses
5. Start logging purchases in **Log receipt** as you spend

No account required. No internet connection needed for core features.

---

## Log receipt tab

Your day-to-day view for tracking purchases as they happen.

### Logging a purchase

| Field | Notes |
|---|---|
| **Category** | Pick from your active categories |
| **Amount** | Dollar amount, decimals supported |
| **Vendor / store** | Optional but recommended — Hedgie remembers it |
| **Note** | Optional freeform note |
| **Date** | Defaults to today, fully editable |
| **Recurring** | See below |

Click **Add to log** to save.

### Vendor memory

Once you log a purchase at a vendor, Hedgie remembers the name and the category you used. Next time you type that vendor's name it auto-suggests and pre-fills the category. To clear all saved vendors, type any vendor name and click **Clear saved vendors** at the bottom of the dropdown.

### Recurring bills

Toggle a receipt to **Monthly** before saving to mark it as a recurring bill. Enter the day of month it's due. Hedgie automatically logs that bill every month on or after its due date when you open the app. Recurring entries show a purple **↺ recurring** badge.

Bills set to day 29, 30, or 31 are automatically clamped to the last day of shorter months.

### Filtering and exporting

Use the category pills to filter the receipt list. The month selector lets you browse any past month. Click **Export CSV** to download the current month's receipts as a CSV file.

### Editing a receipt

Click the **✏️ pencil button** on any receipt row to expand an inline edit form. All fields are editable: category, amount, vendor, note, and date. Click **Save** to apply changes or **Cancel** to discard them.

For **recurring receipts**, the edit form also shows the **due day** field. Changing it updates the recurring bill template, so all future auto-logged instances will use the new day. The form also shows the current amount and category — saving those changes likewise updates the template going forward.

The **Delete recurring bill** button (only visible on recurring receipts) removes the bill template so it stops auto-logging in future months. Existing receipts are kept intact — they just lose the recurring badge.

---

## Monthly report tab

### Reading the report

Four summary metrics at the top: monthly income, total budgeted, actually spent, and income remaining. Below that, each category shows a progress bar:

- **Green** — comfortably under budget
- **Amber** — over 85% of budget used
- **Red** — over budget

If multiple household members are logging receipts, a user breakdown appears showing who spent what.

### Hibernation View

Click **🌙 Hibernate** to switch to a full-year view:

- Bar chart with one bar per month, color-coded by spending level
- Dashed reference line at your monthly budget threshold
- **now** label above the current month's bar
- Future months shown as faint placeholders
- Per-category sparklines with annual totals

---

## Budget planner tab

### Income sources

Click **+ Add source** to add an income line with a label and monthly amount. Hedgie sums them automatically.

### Expense lines

For each expense line:

| Field | Options |
|---|---|
| **Name** | Label for the expense |
| **Amount** | The cost |
| **Frequency** | **Mo** (monthly) or **Yr** (yearly — divided by 12 for monthly equivalent) |
| **Priority** | High, Medium, or Low |

Click **+ Add expense** at the bottom of any category to add a line. Click **×** to remove one.

### Rainy day buffer

At the bottom of the planner, your monthly surplus (income minus expenses) is distributed across categories as a reserve. Allocation is weighted by each category's priority and actual monthly cost. This is a planning guide, not a rule.

### Managing categories

Click **Manage categories** to expand the category manager:

- **Change color** — click the color swatch
- **Add custom category** — **+ Add category**
- **Rename** — click the name field on any custom category and type
- **Reorder** — use the ↑↓ arrows
- **Remove** — click **×** (moves any receipts in that category to "Other")
- **Reset to defaults** — restores the original six categories and colors

The six default categories (Home, Transportation, Food, Services, Debts, Savings) are locked and cannot be removed, but their colors are customizable.

### Save and export

| Button | What it does |
|---|---|
| **Save local** | Downloads a timestamped `.json` backup |
| **Restore local** | Loads any `.json` backup file |
| **Export CSV** | Downloads your budget plan as a CSV |
| **Copy for Sheets** | Copies tab-separated data for Google Sheets paste |

---

## Notifications

The bell icon in the tab bar shows a badge when there are active notifications.

### Built-in notification types

| Icon | Type | When it appears |
|---|---|---|
| 📅 | **Upcoming bill** | A recurring bill is due within your reminder window |
| 🔴 | **Budget warning** | A category has hit 80%+ of its monthly budget |
| ☁️ | **Sync staleness** | No cloud sync in 7+ days, or never synced with a provider configured |
| ✏️ | **Logging nudge** | Past the 20th of the month with no receipts logged |

Notifications are color-coded: red border for urgent, amber for heads up, muted for info. Click **×** to dismiss for the session, or **Dismiss all** to clear everything.

### Custom notifications

Open gear → **Notifications → Custom notifications → + Add** to build your own rules.

Each rule has:
- A **label** shown in the notification panel
- An **urgency** level (Low, Medium, High)
- A **join** mode (AND — all conditions must match, or OR — any condition must match)
- Up to **3 conditions**

**Available fields:**

| Field | Operators |
|---|---|
| Receipt category | is / is not |
| Vendor | is / is not / contains |
| Receipt amount ($) | exceeds / is under |
| Receipt note | contains |
| Logged by | is / is not / contains |
| Month total spent ($) | exceeds / is under |
| Month total by category ($) | exceeds / is under (+ category picker) |
| Receipt count this month | exceeds / is under |
| Category budget used (%) | exceeds / is under (+ category picker) |
| Days since last receipt | exceeds |
| Expense line amount ($) | exceeds / is under |

Saved rules can be toggled on/off, edited, or deleted inline.

### Configuring notifications

Gear → **Notifications** to toggle each built-in type on or off. Set your **bill reminder window** to 1 or 2 weeks.

---

## Settings

Access settings via the **gear icon** in the bottom-right corner.

### Identity

- **Display name** — stamps your receipts and sync events
- **Shared secret key** — cryptographic key for HMAC-SHA256 signing of sync payloads (see [Cloud sync](#cloud-sync))

### Cloud sync

Choose a sync provider and enter your credentials. See [Cloud sync](#cloud-sync) for full setup.

### Notifications

Toggle built-in notification types, set bill reminder window, and manage custom notification rules.

### Data

- **Data health panel** — payload size, active receipt count, archived count, vendor count vs limits
- **Export archived receipts** — download all archived receipts as CSV

**Danger zone:**

| Button | What it clears |
|---|---|
| **Erase identity & sync** | Display name, shared key, all provider credentials |
| **Erase budget & receipts** | Income, expenses, receipts, vendors, archives, syncMeta |
| **Erase everything** | All of the above plus all settings |

Each button shows a specific confirmation dialog before clearing anything.

---

## Cloud sync

Cloud sync is optional. Without it, data lives only in localStorage and in any `.json` backups you download.

### Provider comparison

| Provider | Best for | Cost |
|---|---|---|
| **JSONBin.io** | Beginners, easiest setup | Free tier |
| **GitHub Gist** | GitHub users | Free |
| **Self-hosted** | Homelab / full control | Free (your server) |
| **Dropbox** | Existing Dropbox users | Free tier |

### JSONBin setup

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Click **+ Create Bin** — initialize with `{"_hedgie":true,"version":0}`
3. Copy the **Bin ID** and **Master Key**
4. Gear → Cloud sync → JSONBin → paste both values
5. Click **Push**

### GitHub Gist setup

1. Create a **private** Gist at [gist.github.com](https://gist.github.com) with a file named `hedgie.json`
2. Generate a Personal Access Token at [github.com/settings/tokens](https://github.com/settings/tokens) with `gist` scope
3. Gear → Cloud sync → GitHub Gist → paste your Gist ID and token

### Sync operations

| Button | What it does |
|---|---|
| **Pull** | Fetches the cloud version and applies it locally |
| **Push** | Sends your local data to the cloud |
| **Sync** (status bar) | Smart sync — pulls or pushes as appropriate |

### Sync safety guards

The Sync button has two built-in safeguards:

**Guard 1 — Empty state:** If local data is blank (no income, no expenses, no receipts), Hedgie always pulls from the cloud instead of pushing. A blank session can never overwrite real cloud data.

**Guard 2 — First sync with local data:** If you have real local data but the session has never synced before (e.g. after restoring from a backup), Hedgie fetches the cloud first and shows a confirmation dialog asking whether to pull or push. You choose explicitly — nothing happens automatically.

### Conflict resolution

If both household members have made budget plan changes since the last sync, a conflict modal appears:

- **Take cloud version** — replaces local budget plan with cloud version
- **Keep my budget** — keeps local plan, discards cloud changes
- **Merge receipts, keep my budget** — merges receipts from both sides, keeps local budget

Receipts are always merged automatically regardless of choice — no receipts are lost.

### HTTPS requirement

HMAC signing requires a secure context (`https://` or `localhost`). Sync works from `file://` URLs but signatures are skipped. Deploy to Cloudflare Pages or GitHub Pages for full signing support.

---

## Multi-user households

### Setup

1. One person sets up cloud sync and generates a shared key (gear → Identity → **Generate**)
2. Copy the key (gear → Identity → **Copy**) and share via AirDrop or iMessage — never email
3. Partner opens Hedgie, enters their display name, pastes the shared key, enters the same sync credentials
4. Both tap **Sync** — receipts merge, budget plan is shared

### How it works

Each receipt is stamped with the display name of who logged it. The monthly report and Hibernation View show per-user spending breakdowns for categories and totals. The budget plan is shared between all users.

---

## Backups and data management

Hedgie stores data in browser `localStorage`. Data persists between sessions on the same browser, but clearing browser data or switching browsers will show a fresh app.

**Always keep a local backup.** Use **Save local** in Budget planner to download a `.json` file. Store it in iCloud Drive, Google Drive, or any syncing folder.

### Auto-archive

Receipts older than the prior calendar year are automatically moved to an archive on startup. Archived receipts don't count against the active receipt limit, don't appear in the monthly report, but are still visible in Hibernation View and exportable from Settings → Data.

### Payload limits

| Resource | Warning | Limit |
|---|---|---|
| Active receipts | 800 | 1,000 (auto-archives) |
| Vendor memory | 160 | 200 (auto-prunes oldest) |
| Sync payload | 80KB | ~100KB (JSONBin free tier) |

---

## Tips and tricks

**Use recurring bills for everything predictable.** Mortgage, car payment, subscriptions — log them once as recurring and Hedgie handles them automatically each month.

**Set your budget before the month starts.** The monthly report is only useful if the planner has real numbers. Spend 10 minutes at the start of each month adjusting for anything unusual.

**Log receipts at the point of purchase.** Vendor memory makes this a 10-second process for regular shops.

**Use custom notifications for your real patterns.** Set a rule for "Sin category month total exceeds $100" or "days since last receipt exceeds 7" — the built-in nudges are generic, custom rules are personal.

**Hibernation View is best at year-end.** Open it in December to see your full year at a glance — which months ran expensive, which categories went over, how the buffer held up.

**Export to Sheets for deeper analysis.** **Copy for Sheets** puts your budget plan on the clipboard in a format that pastes cleanly into Google Sheets or Excel.

**The rainy day buffer is a planning guide.** It shows proportional surplus allocation by category priority. You don't have to follow it exactly — use it as a starting point for deciding where extra money should go.
