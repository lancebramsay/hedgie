# 🦔 Hedgie User Guide

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
- [Backups](#backups)
- [Tips and tricks](#tips-and-tricks)

---

## Getting started

1. Download `index.html` from the [releases page](https://github.com/lancebramsay/hedgie/releases) or the repo root
2. Open it in any modern browser — Chrome, Safari, Firefox, or Brave
3. When prompted, enter your display name (this stamps your receipts and sync events)
4. Head to **Budget planner** and fill in your income sources and monthly expenses
5. Start logging purchases in **Log receipt** as you spend

That's the whole setup. No account required, no internet connection needed for core features.

---

## Log receipt tab

This is your day-to-day view for tracking purchases as they happen.

### Logging a purchase

Fill in the quick-entry form at the top:

| Field | Notes |
|---|---|
| **Category** | Pick from your active categories |
| **Amount** | Dollar amount — decimals supported |
| **Vendor / store** | Optional but recommended — Hedgie remembers it |
| **Note** | Optional freeform note (e.g. "weekly grocery run") |
| **Date** | Defaults to today, fully editable |
| **Recurring** | See below |

Click **Add to log** to save the entry.

### Vendor memory

Once you log a purchase at a vendor, Hedgie remembers the name and the category you used. Next time you start typing that vendor's name, it will auto-suggest and pre-fill the category. This makes recurring purchases much faster to log.

To clear all saved vendors, type any vendor name and click **Clear saved vendors** at the bottom of the dropdown.

### Recurring bills

Toggle a receipt to **Monthly** before saving to mark it as a recurring bill. You'll be prompted for the day of month the bill is due (e.g. day 1 for a mortgage due on the 1st).

Once saved as recurring, Hedgie will automatically log that bill every month on or after its due date when you open the app — you won't need to re-enter it. Recurring entries are marked with a purple **↺ recurring** badge in the receipt list.

### Filtering receipts

Use the category pills below the form to filter the receipt list by category. The month selector lets you browse any past month's receipts.

### Deleting a receipt

Click the **×** button on the right side of any receipt row. This cannot be undone.

### Exporting receipts

Click **Export CSV** to download the current month's receipts as a spreadsheet-ready CSV file.

---

## Monthly report tab

A summary of how your spending compares to your budget for any given month.

### Reading the report

At the top you'll see four summary metrics: monthly income, total budgeted, actually spent, and income remaining after spending.

Below that, each category shows:
- A colored progress bar filling left to right as you spend toward the budget
- **Green** — comfortably under budget
- **Amber** — over 85% of budget used
- **Red** — over budget
- The exact amounts spent and remaining, plus the percentage used

If multiple household members are logging receipts, a user breakdown appears under each category showing who spent what.

### Changing the month

Use the month selector in the top right to browse any past month.

### Hibernation View

Click the **🌙 Hibernate** toggle to switch to a full-year view. This shows:

- A bar chart with one bar per month, color-coded by spending level
- A dashed reference line showing your monthly budget threshold
- A **now** label floating above the current month's bar
- Future months shown as faint placeholders
- A per-category breakdown with monthly sparklines for the year

Switch back to **Active** to return to the standard monthly view.

---

## Budget planner tab

This is where you set your income, expenses, and category budgets. Everything here drives the progress bars in the monthly report.

### Income sources

Click **+ Add source** to add an income line. Enter a label (e.g. "Primary salary") and a monthly amount. Add as many sources as you have — Hedgie sums them automatically.

### Expense lines

Each category has its own expense list. For each line you set:

| Field | Options |
|---|---|
| **Name** | Label for the expense (e.g. "Mortgage") |
| **Amount** | The cost |
| **Frequency** | **Mo** (monthly) or **Yr** (yearly) |
| **Priority** | High, Medium, or Low |

Yearly expenses are automatically divided by 12 and shown as a monthly equivalent so your budget math is always apples-to-apples.

Click **+ Add expense** at the bottom of any category section to add a new line. Click **×** to remove one.

### Filtering expenses

Use the **Category** pills to focus on one category at a time. Use the **Priority** pills to show only High, Medium, or Low priority lines.

### Rainy day buffer

At the bottom of the planner is the Rainy Day Buffer — your monthly surplus (income minus expenses) automatically distributed across categories as a reserve. The allocation is weighted by each category's priority and actual monthly cost, so high-cost, high-priority categories like Home get a bigger share.

This isn't money you spend — it's a per-category cushion for unexpected costs.

### Managing categories

Click **Manage categories** to expand the category manager. From here you can:

- **Change a category color** using the color picker (click the swatch)
- **Add a custom category** with **+ Add category**
- **Rename, reorder, or remove** custom categories using the inline controls
- **Reset to defaults** to restore the original six categories and colors

The six default categories — Home, Transportation, Food, Services, Debts, Savings — are locked and cannot be removed, but their colors are customizable.

### Saving and restoring

Use the buttons in the top-right corner of the planner:

| Button | What it does |
|---|---|
| **Save local** | Downloads a timestamped `.json` backup to your device |
| **Restore local** | Loads any `.json` backup file |
| **Export CSV** | Downloads your full budget plan as a CSV |
| **Copy for Sheets** | Copies tab-separated data to paste into Google Sheets |

---

## Notifications

The bell icon in the top-right of the tab bar shows a red badge when there are active notifications. Click it to open the notification panel.

### Notification types

| Icon | Type | When it appears |
|---|---|---|
| 📅 | **Upcoming bill** | A recurring bill is due within your reminder window |
| 🔴 | **Budget warning** | A category has hit 80% or more of its monthly budget |
| 🕖 | **Yearly expense** | A yearly expense line is approaching its period |
| ☁️ | **Sync staleness** | Cloud sync hasn't run in 7+ days, or has never been set up |
| ✏️ | **Logging nudge** | It's past the 20th of the month and no receipts have been logged |

Notifications are color-coded by urgency — red border for urgent, amber for heads up, and subtle for informational. Click **×** on any notification to dismiss it for the session, or **Dismiss all** to clear everything at once.

### Configuring notifications

Open the gear icon → **Notifications** to toggle each notification type on or off individually. You can also set your **bill reminder window** to either 1 week or 2 weeks out — this is per-user, so each household member can have their own preference.

---

## Settings

Access settings via the **gear icon** in the bottom-right corner. The drawer has four sections:

### Identity

- **Display name** — stamps your receipts and sync events so your household knows who logged what
- **Shared secret key** — a cryptographic key used to sign sync payloads (see [Cloud sync](#cloud-sync))

### Cloud sync

Choose a sync provider and enter your credentials. See [Cloud sync](#cloud-sync) for full setup instructions.

### Notifications

Toggle individual notification types and set your bill reminder window.

### Data

- **Data health panel** — shows payload size, active receipt count, archived receipt count, and vendor memory usage vs limits
- **Export archived receipts** — download all archived receipts (older than the prior calendar year) as a CSV
- **Reset all data** — wipes everything and returns Hedgie to factory defaults

---

## Cloud sync

Cloud sync is optional. Without it, your data lives only in your browser's local storage and in any `.json` backups you download. With it, you can sync between devices and share with a household partner.

### Choosing a provider

| Provider | Best for | Cost |
|---|---|---|
| **JSONBin.io** | Beginners, easiest setup | Free tier available |
| **GitHub Gist** | GitHub users | Free |
| **Self-hosted** | Homelab / full control | Free (your server) |
| **Dropbox** | Existing Dropbox users | Free tier available |

### JSONBin setup

1. Create a free account at [jsonbin.io](https://jsonbin.io)
2. Click **+ Create Bin** — initialize it with `{"_hedgie":true,"version":0}`
3. Copy the **Bin ID** and **Master Key** from the dashboard
4. In Hedgie: gear → Cloud sync → select **JSONBin** → paste both values
5. Click **Push** to write your data to the cloud

### GitHub Gist setup

1. Create a **private** Gist at [gist.github.com](https://gist.github.com) with a file named `hedgie.json`
2. Generate a Personal Access Token at [github.com/settings/tokens](https://github.com/settings/tokens) with the `gist` scope
3. In Hedgie: gear → Cloud sync → select **GitHub Gist** → paste your Gist ID and token

### Sync operations

| Button | What it does |
|---|---|
| **Pull** | Fetches the cloud version and applies it locally |
| **Push** | Sends your local data to the cloud |
| **Sync** (status bar) | Pulls first, then pushes — the safest everyday option |

**First sync rule:** On a fresh device or fresh session, always pull before pushing. Hedgie enforces this automatically — autosave will not push until you've completed at least one manual pull or push in the session, so you can't accidentally overwrite real cloud data with a blank local state.

### Conflict resolution

If both you and your household partner have made budget plan changes since the last sync, Hedgie detects the conflict and shows a resolution modal:

- **Take cloud version** — replaces your local budget plan with the cloud version
- **Keep my budget** — keeps your local plan and discards the cloud changes
- **Merge receipts, keep my budget** — merges all receipts from both sides, keeps your budget plan

Receipts are always merged automatically regardless of which option you choose — no receipts are ever lost in a conflict.

### HTTPS requirement

Hedgie uses the Web Crypto API for HMAC-SHA256 payload signing, which requires a secure context (`https://` or `localhost`). Sync still works when running from a local `file://` URL, but signatures are skipped. For full signing, deploy Hedgie to Cloudflare Pages or any HTTPS host.

---

## Multi-user households

Hedgie is designed for households where two or more people share finances.

### Setup

1. One person sets up cloud sync and generates a shared secret key (gear → Identity → **Generate**)
2. Copy the key (gear → Identity → **Copy**) and share it with your partner via AirDrop, iMessage, or another trusted channel — never email
3. Your partner opens Hedgie, enters their display name, pastes the shared key, and enters the same sync provider credentials
4. Both tap **Sync** — receipts are merged, budget plan is shared

### How it works

Each receipt is stamped with the display name of the person who logged it. In the monthly report and Hibernation View, a user breakdown shows each person's spending contribution per category. Both users see the same budget plan — it's shared, not per-person.

When both users sync, Hedgie automatically merges receipts by ID so there are never duplicates. If the budget plan differs, the conflict modal appears.

---

## Backups

Hedgie stores data in your browser's `localStorage`. This means:

- Data persists between sessions on the same browser
- Clearing browser data or using a different browser will show a fresh app
- Data does not sync automatically unless cloud sync is configured

**Always keep a local backup.** Use **Save local** in the Budget planner to download a `.json` file. Store it in iCloud Drive, Google Drive, or any folder that syncs between your devices.

To restore from a backup, use **Restore local** and select the `.json` file.

### Auto-archive

Receipts older than the prior calendar year are automatically moved to an archive on app startup. Archived receipts don't count against the active receipt limit and don't appear in the monthly report — but they're still included in Hibernation View for the year they belong to, and you can export them as CSV from **Settings → Data**.

### Payload limits

| Resource | Warning | Limit |
|---|---|---|
| Active receipts | 800 | 1,000 (auto-archives) |
| Vendor memory | 160 | 200 (auto-prunes oldest) |
| Sync payload | 80KB | ~100KB (JSONBin free tier) |

The **Data health panel** in Settings shows your current usage against these limits.

---

## Tips and tricks

**Use recurring bills for everything predictable.** Mortgage, car payment, subscriptions — log them once as recurring and they disappear from your to-do list. You'll still see them in the receipt list each month, but you won't have to remember to enter them.

**Set your budget before the month starts.** The monthly report is only meaningful if your budget planner has real numbers in it. Spend 10 minutes in the planner at the start of each month adjusting for anything unusual — a trip, an annual renewal, a big purchase.

**Log receipts at the point of purchase.** The fastest habit is tapping the app as you leave a store. The vendor memory makes this a 10-second process for regular shops.

**Use the note field for context.** "Weekly grocery run" vs "holiday groceries" vs "meal prep supplies" — notes make the receipt list useful months later when you're reviewing spending patterns.

**Hibernation View is best at year-end.** Open it in December and you'll see your full year's spending pattern at a glance — which months were expensive, which categories ran over, and how your buffer held up.

**Export to Sheets for deeper analysis.** The **Copy for Sheets** button puts your budget plan on the clipboard in a format that pastes cleanly into Google Sheets or Excel. From there you can build custom charts, run scenario analysis, or share a read-only view with a financial advisor.

**The rainy day buffer is a planning tool, not a rule.** It shows you where your surplus would go if you allocated it proportionally by priority. You don't have to follow it exactly — use it as a starting point for deciding where extra money should go each month.
