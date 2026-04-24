# 🦔 Open Hedgie — User Guide

> Version 1.5.7 · A single-file household budget planner. No server, no install, no dependencies.

## Table of contents

- [Getting started](#getting-started)
- [Navigating the app](#navigating-the-app)
- [Log receipt tab](#log-receipt-tab)
- [Monthly report tab](#monthly-report-tab)
- [Budget planner tab](#budget-planner-tab)
- [Notifications](#notifications)
- [Settings](#settings)
- [Cloud sync](#cloud-sync)
- [Multi-user households](#multi-user-households)
- [Backups and data management](#backups-and-data-management)
- [Installing to your home screen](#installing-to-your-home-screen)
- [Dark mode](#dark-mode)
- [Tips and tricks](#tips-and-tricks)

---

## Getting started

1. Download `index.html` from the [releases page](https://github.com/lancebramsay/hedgie/releases) or open the live version at [hedgie.pages.dev](https://hedgie.pages.dev)
2. Open in any modern browser — Chrome, Safari, Firefox, or Brave
3. When prompted, enter your display name (this stamps your receipts and sync events)
4. Head to **Budget planner** and fill in your income sources and monthly expenses
5. Start logging purchases in **Log receipt** as you spend

No account required. No internet needed for core features.

---

## Navigating the app

Three tabs sit at the top of the screen: **Log receipt**, **Monthly report**, and **Budget planner**.

- **Tap** any tab button to switch
- **Swipe left or right** anywhere in the content area to move between tabs — works on any touch screen including iPhone, iPad, and Android

The gear icon in the bottom-right corner opens **Settings**. The bell icon in the top-right opens **Notifications**.

---

## Log receipt tab

Your day-to-day view for tracking purchases as they happen.

### Logging a purchase

| Field | Notes |
|---|---|
| **Category** | Pick from your active categories |
| **Amount ($)** | Dollar amount, decimals supported |
| **Vendor / store** | Optional but recommended — Hedgie remembers it |
| **Note** | Optional freeform note |
| **Date** | Defaults to today, fully editable |
| **Recurring** | Toggle to Monthly to set up a recurring bill |

Tap **Add to log** to save.

### Vendor memory

Once you log a purchase at a vendor, Hedgie remembers the name and the category you used. Next time you type that vendor it auto-suggests and pre-fills the category. To clear all saved vendors, tap any vendor name and choose **Clear saved vendors** at the bottom of the dropdown.

### Recurring bills

Toggle a receipt to **Monthly** before saving to mark it as a recurring bill. Enter the day of month it's due. Hedgie automatically logs that bill every month on or after its due date when you open the app. Recurring entries show a purple **↺ recurring** badge.

Bills set to day 29, 30, or 31 are automatically clamped to the last day of shorter months.

### Filtering and exporting

Use the category pills to filter the receipt list. The month selector lets you browse any past month. Click **Export CSV** to download receipts as a spreadsheet file.

### Editing a receipt

Click the **✏️ pencil button** on any receipt row to expand an inline edit form. All fields are editable: category, amount, vendor, note, and date. Click **Save** to apply or **Cancel** to discard.

For **recurring receipts**, the edit form also shows the **due day** field. Saving updates the recurring bill template so all future auto-logged entries use the new values.

The **Delete recurring bill** button (visible only on recurring receipts) removes the template so it stops auto-logging in future months. Existing receipts are kept and just lose the recurring badge.

---

## Monthly report tab

### Summary metrics

Four cards at the top: amount logged this month, monthly budget total, remaining, and budget used percentage. Color coding: green when healthy, amber when over 80%, red when over budget.

### Category breakdown

Each category shows a progress bar:
- **Green** — comfortably under budget
- **Amber** — over 80% used
- **Red** — over budget

If multiple household members are logging, a user breakdown appears showing who spent what.

### Hibernation View

Click **🌙 Hibernate** to switch to the full-year view:

- Bar chart with one bar per month, color-coded by spending level
- Dashed reference line at your monthly budget threshold
- Current month highlighted with a **now** label
- Future months shown as faint placeholders
- Per-category sparklines with annual totals and a summary row

---

## Budget planner tab

### Income sources

Click **+ Add source** to add an income line with a label and monthly amount. Hedgie sums all sources automatically.

### Expense lines

For each expense:

| Field | Options |
|---|---|
| **Name** | Label for the expense |
| **Amount** | The cost |
| **Frequency** | **Mo** (monthly) or **Yr** (yearly — divided by 12 for the monthly equivalent) |
| **Priority** | **H** High, **M** Medium, or **L** Low |

Click **+ Add expense** at the bottom of any category section to add a line. Click **×** to remove one.

### Rainy day buffer

Your monthly surplus (income minus expenses) is distributed across categories as a reserve, weighted by each category's priority and actual monthly cost. This is a planning guide, not a rule.

### Managing categories

Click **Manage categories** to expand the category manager:

- **Change color** — click the color swatch next to any category
- **Add custom category** — **+ Add category**
- **Rename** — click the name on any custom category and type directly
- **Reorder** — use the ↑↓ arrows
- **Remove** — click **×** (any receipts in that category are moved to Shopping)
- **Reset to defaults** — restores the original six categories and their default colors

The six default categories (Home, Transportation, Shopping, Services, Debts, Savings) cannot be removed but their colors are customizable.

### Save and export

| Button | What it does |
|---|---|
| **Save local** | Downloads a timestamped `.json` backup file |
| **Restore local** | Loads any Hedgie `.json` backup |
| **Export CSV** | Downloads your budget plan as a CSV |
| **Copy for Sheets** | Copies tab-separated data for Google Sheets paste |

---

## Notifications

The bell icon in the tab bar shows a badge when there are active notifications. The badge color reflects the highest-priority active notification: red (high), amber (med), green (low), blue (info/heads up).

### Built-in notification types

| Icon | Type | Urgency | When it appears |
|---|---|---|---|
| 📅 | **Upcoming bill** | High | A recurring bill is due within your reminder window |
| 🔴 | **Budget warning** | Med | A category has hit 80%+ of its monthly budget |
| ☁️ | **Sync staleness** | Low | No cloud sync in 7+ days with a provider configured |
| ↓ | **Sync prompt** | Info | Session opened with no data and a provider configured |
| 💾 | **Local backup reminder** | Info | 1st of the month, local-only mode, data exists |
| ✏️ | **Logging nudge** | Low | Past day 20 with budget data set up but no receipts logged yet |

Tap **×** to dismiss a notification for the session, or **Dismiss all** to clear everything.

### Custom notifications

Gear → **Notifications → Custom notifications → + Add** to build your own alert rules.

Each rule has:
- A **label** shown in the notification panel
- An **urgency** level (Low, Medium, High)
- A **join** mode (AND — all conditions must match / OR — any condition must match)
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
| Month total by category ($) | exceeds / is under + category picker |
| Receipt count this month | exceeds / is under |
| Category budget used (%) | exceeds / is under + category picker |
| Days since last receipt | exceeds |
| Expense line amount ($) | exceeds / is under |

Saved rules can be toggled on/off, edited, or deleted inline.

### Configuring notifications

Gear → **Notifications** to toggle each built-in type on or off. Set your **bill reminder window** to 1 or 2 weeks.

---

## Settings

Access settings via the **gear icon** in the bottom-right corner.

### Identity

- **Display name** — stamps your receipts and sync events; shown in the monthly report user breakdown
- **Shared secret key** — cryptographic key used to sign and optionally encrypt sync payloads; generate once and share with household members via AirDrop or iMessage
- **Encrypt sync payload** — toggle to enable AES-256-GCM encryption on all cloud payloads (requires HTTPS and a shared key)

### Cloud sync

Choose a sync provider and enter your credentials. See [Cloud sync](#cloud-sync) for setup instructions.

### Notifications

Toggle each built-in notification type on or off, set the bill reminder window (1 or 2 weeks), and manage custom notification rules.

### Data

- **Data health panel** — payload size (of 100 KB limit), active receipt count, vendor count
- **Export archived receipts** — download all auto-archived receipts as CSV
- **Export decrypted backup** — always exports plain JSON regardless of whether encryption is enabled; use this to migrate devices or share data

**Danger zone:**

| Button | What it clears |
|---|---|
| **Erase identity & sync** | Display name, shared key, all provider credentials |
| **Erase budget & receipts** | Income, expenses, receipts, vendors, archives, sync metadata |
| **Erase everything** | All of the above plus all settings |

Each button shows a confirmation dialog describing exactly what will be cleared before doing anything.

---

## Cloud sync

Cloud sync is optional. Without it, data lives only in browser localStorage and in any `.json` backups you download.

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
| **Sync** (status bar) | Smart sync — pulls when cloud is newer, pushes when local is newer, merges when both have new receipts |

### Sync safety guards

**Guard 1 — Empty session:** If local data is blank (no income, no expenses, no receipts), Hedgie always pulls from the cloud. A blank session can never overwrite real cloud data — this also protects against preference-only changes (like toggling dark mode) accidentally wiping your data.

**Guard 2 — First sync with local data:** If you have real local data but the session hasn't synced yet (e.g. after restoring from a backup), Hedgie fetches the cloud first and shows a dialog asking whether to pull or push. You choose explicitly.

### Conflict resolution

If both household members have changed the budget plan since the last sync, a conflict modal appears:

- **Take cloud version** — replaces local budget plan with the cloud version
- **Keep my budget** — keeps local plan, discards cloud changes

Receipts are always merged automatically regardless of choice — no receipts are lost from either side.

### Encryption

Toggle **Encrypt sync payload** in Gear → Identity to enable AES-256-GCM encryption. The encryption key is derived from your existing shared secret — no new key to distribute. Requires HTTPS. When you pull an encrypted payload the toggle is automatically enabled on the receiving device.

To disable encryption: turn off the toggle and push — the next push will be plain JSON and all subsequent devices will see the unencrypted payload.

### HTTPS requirement

HMAC signing and AES encryption require a secure context (`https://` or `localhost`). Sync works from `file://` URLs but signatures are skipped. Deploy to Cloudflare Pages or GitHub Pages for full security.

---

## Multi-user households

### Setup

1. One person sets up cloud sync and generates a shared key (Gear → Identity → **Generate**)
2. Copy the key (Gear → Identity → **Copy**) and share via AirDrop or iMessage — never email
3. Partner opens Hedgie, enters their display name, pastes the shared key, and enters the same sync credentials
4. Both tap **Sync** — receipts merge, budget plan is shared

### How it works

Each receipt is stamped with the display name of who logged it. The Monthly report and Hibernation View show per-user breakdowns. The budget plan is shared — changes by either user sync to both devices.

---

## Backups and data management

Hedgie stores data in browser `localStorage`. Data persists between sessions on the same browser but is separate from other browsers or devices. Clearing browser data or switching browsers shows a fresh app.

**Always keep a local backup.** Use **Save local** in Budget planner to download a `.json` file and store it in iCloud Drive, Google Drive, or any syncing folder.

### Auto-archive

Receipts older than the prior calendar year are automatically moved to an archive on startup. Archived receipts don't appear in the monthly report or count against the active receipt limit, but are visible in Hibernation View and exportable from Gear → Data → **Export archived receipts**.

### Payload limits

| Resource | Warning | Limit |
|---|---|---|
| Active receipts | 800 | 1,000 (auto-archives) |
| Vendor memory | 160 | 200 (auto-prunes oldest) |
| Sync payload | 80 KB warning | 100 KB maximum |

---

## Installing to your home screen

### Android / desktop (Chrome, Edge, Brave)

A 📲 button appears in the tab bar when the browser supports installation. Tap it to install. Once installed the button disappears automatically.

### iOS / iPadOS (Safari, Brave)

A blue banner appears at the top of the page with instructions:

1. Tap **Share** ⬆ in your browser's toolbar
2. Tap **Add to Home Screen**
3. Tap **Add**

This is the only install path on iOS — Apple does not provide a programmatic install API. The banner only appears in browser mode; once you've opened the app from your home screen it stays hidden.

> **Note:** Add to Home Screen is only available in **Safari** on iOS. Other iOS browsers (Chrome, Brave) use Safari's WebKit but may not show the option in their share sheets. If you don't see it, open the page in Safari.

---

## Dark mode

Tap the **☾ moon button** in the tab bar to switch to dark mode. Tap again (now a ☀ sun) to return to light mode. Your preference is saved and synced in the cloud payload so it follows you across devices automatically.

---

## Tips and tricks

**Use recurring bills for everything predictable.** Mortgage, car payment, subscriptions — log them once as recurring and Hedgie handles them automatically each month.

**Set your budget before the month starts.** The monthly report is only meaningful if the planner has real numbers. Spend 10 minutes at the start of each month reviewing and adjusting for anything unusual.

**Log receipts at the point of purchase.** Vendor memory makes this a 10-second process for regular shops — one tap on the suggestion and the category is pre-filled.

**Use custom notifications for your real patterns.** Set a rule for "Leisure month total exceeds $150" or "days since last receipt exceeds 5" — the built-in nudges are generic, custom rules are personal.

**Hibernation View is best viewed at month-end or year-end.** Open it in December to see your full year at a glance — which months ran expensive, which categories went over, how the buffer held up.

**Export to Sheets for deeper analysis.** **Copy for Sheets** puts your budget plan on the clipboard in a format that pastes cleanly into Google Sheets or Excel for pivot tables and custom charts.

**The rainy day buffer is a planning guide, not a rule.** It shows how your surplus could be distributed proportionally by category priority. Use it as a starting point for deciding where extra money should go.

**Save a local backup on the 1st of each month.** Hedgie will remind you with a notification if you're in local-only mode. Store the file in iCloud Drive or Google Drive so it's accessible from any device.

**Dark mode preference syncs.** If you switch on dark mode on your phone, it will already be on the next time you open Hedgie on your laptop after a sync.
