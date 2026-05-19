# Changelog

All notable changes to Open Hedgie are documented here.

---

## [2.5.8] — 2026-05-18

### Fix: first-sync guard — local data can no longer overwrite cloud

Entering a receipt before the first sync could silently overwrite all cloud data. Five
code paths are now protected:

- **`quickSync` Guard 2** — Cancel now aborts entirely (previously Cancel meant "push local to cloud and overwrite"). OK pulls cloud as authoritative and merges local entries in before pushing.
- **`firstSyncMerge` (new helper)** — Cloud-first merge used in all neverSynced paths. Cloud is authoritative for all fields (recurringBills, financing, savingsGoals, investments, budget). Only local receipts and vendors not already in cloud are added.
- **`quickSync` main merge path** — Falls back to `firstSyncMerge` if the Guard 2 cloud prefetch failed but the second fetch succeeds with real data.
- **`cloudPush`** — Uses `firstSyncMerge` instead of the local-first `mergePayloads` when neverSynced.
- **`cloudPull` first sync** — Rescues local receipts entered before first pull instead of replacing all local data with cloud.
- **Autosave** — Now shows "Saved locally — sync first to back up to cloud" instead of the misleading "cloud unreachable" message when push is intentionally blocked.

---

## [2.5.7] — 2026-05-11

### Accessibility options in Settings → Appearance

**Left-hand mode — extended**
- Card action buttons and button rows on tab pages now mirror alongside the top bar — `+ Add` buttons and action controls move to the left edge of their cards
- Left-hand mode description updated to reflect the broader scope

**Reduce motion** (new)
- Disables all CSS transitions and animations including the tab slide, accordion open/close, and status bar color fades
- Recommended for users with motion sensitivity or vestibular disorders

**Large text** (new)
- Increases font size on buttons, form fields, card titles, tab labels, and settings content
- Helps with low vision or use on small screens

**High contrast** (new)
- Strengthens text, border, and semantic status colors (green/amber/red/blue) for both light and dark mode
- Raises contrast ratios toward WCAG AA minimums; helps with low vision

### Fix: left-hand mode logo separator on wrong side

- In left-hand mode the tab logo moved to the right end of the bar but retained its `border-right`, placing the separator line on the outer edge instead of between the logo and the tabs
- Fixed by flipping to `border-left` with mirrored padding and margin when `body.left-hand` is active

---

## [2.5.6] — 2026-05-10

### Data section reorganized; Sync section tidied

- Export archived receipts, Export decrypted backup, and Receipt data retention moved from the Sync section into the Data accordion
- Data accordion now has three sub-groups: Backup & restore (Save local, Restore local, Export decrypted backup), Export (Export CSV, Copy for Sheets, Export archived receipts), and Retention (receipt data retention window)
- Force refresh moved to sit alongside the Pull and Push buttons in the Sync section
- Health panel (payload size indicator) remains in Sync

### Danger zone redesigned with granular options

- Danger zone removed from the bottom of the Sync section and promoted to its own **⚠ Danger zone** accordion at the bottom of Settings, visually separated with a red header
- Each action is now a labeled row with a description of exactly what is affected, rather than a row of unlabeled buttons
- Added three targeted clear actions:
  - **Clear receipts & archives** — removes all logged receipts and historical archives; budget structure is kept
  - **Clear vendor memory** — removes saved vendor autofill suggestions
  - **Clear Den data** — removes portfolio positions, liabilities, savings goals, and wallet data
- Existing full reset actions (Erase identity & sync, Erase budget & receipts, Erase everything) retained under a separate Full reset heading

---

## [2.5.5] — 2026-05-10

### Fix: Monthly report and Budget planner cut off when Den Preview disabled

- When Den Preview was toggled off, the Den panel remained in the flex layout even though it was removed from TAB_ORDER — shifting Monthly report and Budget planner one slot to the right so they displayed the wrong content
- Fix: `panel-den` is now hidden from the DOM layout (`display:none`) when Den Preview is off, keeping panel positions aligned with TAB_ORDER indices

---

## [2.5.4] — 2026-05-10

### Den tab repositioned; settings icon updated

- Den tab moved to second position in the tab bar, immediately after Log receipt — tab order is now Log receipt → Den → Monthly report → Budget planner
- Den panel order in the DOM updated to match, so swipe navigation is consistent
- Den settings section icon updated from ◈ to 🏠 to match the house icon used in the tab bar

---

## [2.5.3] — 2026-05-10

### Data management moved to Settings

- Removed Save local, Restore local, Export CSV, and Copy for Sheets buttons from the Budget Planner header — they are app-level operations, not planning tools
- Added a new **Data** accordion section in Settings (below Appearance) housing all four actions with a short description
- Added an "Export & backup →" shortcut link at the bottom of the Budget Planner that opens Settings directly to the Data section

---

## [2.5.2] — 2026-05-10

### Sync button outline and left-hand mode

**Sync button**
- Enlarged and given a visible outline: `border:2px solid var(--border)` on three sides (top, left, bottom with radius), open on the flush-right edge — stays within the ghost color scheme but is clearly distinguished from the status text

**Left-hand mode** (Settings → Appearance)
- New toggle mirrors the entire top bar layout: notification bell, dark mode button, and PWA icon move to the left; the logo moves to the right
- GSB sync button shifts to the left edge of the status bar with matching border and radius adjustments
- Gear icon moves from bottom-right to bottom-left
- Notification panel drops from the left edge of the notif-wrap instead of the right
- State persists in settings across sessions

---

## [2.5.1] — 2026-05-10

### Fix: sync button layout and color

- Removed right padding from the GSB inner row; sync button now stretches full height and sits flush against the right edge of the bar with `border-radius:0 0 var(--radius-md) 0` matching the bar's own bottom-right corner
- Sync button color updated to match the ghost-style top bar buttons: transparent background, `var(--text-soft)` color, subtle left border separator — consistent with the dark mode toggle and notification bell

---

## [2.5.0] — 2026-05-10

### Settings reorganization, sync button accessibility, and appearance controls

**Settings panel — 6 grouped sections**
- Settings drawer reorganized from 5 scattered sections into 6 clearly grouped sections: **Identity**, **Sync**, **Den**, **Wallet**, **Notifications**, **Appearance**
- **Sync** — merges the former "Cloud sync" and "Data" accordions; cloud provider, pull/push, data exports, retention, and danger zone are all in one place
- **Den** — renamed from "Den Preview"; same Den toggle and price feed controls
- **Wallet** (new) — Etherscan API key, auto-import toggle, direction (outgoing/incoming/both), and gas fees toggle moved here from the Den Wallet card, which was getting cluttered; the Wallet card now shows only the address input, chain toggles, import queue, and balances
- **Appearance** (new) — dark mode toggle (mirrors the tab bar button, stays in sync); option to hide the ☾ dark mode button from the tab bar while still controlling dark mode from Settings

**Sync button**
- GSB sync button enlarged: `min-height: 28px`, more padding, brown fill with white text — more distinct and easier to tap on touch screens; reduces accidental presses near the notification bell
- Increased gap between top bar icon buttons for better tap target separation

**Dark mode button**
- Dark mode toggle remains on the tab bar by default
- New **Show dark mode button in tab bar** toggle in Settings → Appearance lets users hide it; dark mode is still fully controllable from Settings

---

## [2.4.0] — 2026-05-10

### New: Wallet transaction import

**Etherscan V2 integration**
- Add an Etherscan API key (free at etherscan.io/apis) in the Wallet card to enable transaction history fetching across all enabled chains — Ethereum (1), Arbitrum (42161), Base (8453), and Polygon (137) — via a single key through the Etherscan V2 API
- Tap **↺ Refresh** to pull balances and fetch the latest transactions in one step; transaction activity is fetched automatically after each balance refresh when a key is configured

**Review queue (default)**
- New transactions arrive in an **Import queue** inside the Wallet card, sorted newest first
- Each pending item shows: direction arrow (↑ outgoing / ↓ incoming), date, chain, token amount, and a USD estimate based on the historical CoinGecko price at the time of the transaction
- **Import** expands an inline form with editable fields: date, amount ($), vendor, note, and category — pre-filled from the transaction data; click **Log receipt** to confirm and add to the receipt list
- **Dismiss** marks the transaction as skipped; dismissed entries are pruned after 90 days

**Auto-import mode**
- Toggle **Auto-import on sync** in the Wallet card to skip the review queue entirely — new transactions are immediately logged as uncategorized receipts; editable afterwards via the receipt list

**Import options**
- **Direction** — choose Outgoing (default), Incoming, or Both
- **Include gas fees** — when enabled, an additional ETH Gas receipt is logged for each transaction's network fee (review queue shows a checkbox per transaction; auto-import always includes it)

**Historical price lookup**
- USD estimates use CoinGecko's historical `/history` endpoint for the transaction date — ETH and POL use on-chain price data; USDC, USDT, DAI fixed at $1.00; unknown tokens show $0 (editable before import)
- Prices are cached in memory for the session to avoid redundant API calls
- Transactions with `tokenAmt < 0.0001` and direction = outgoing are skipped automatically as dust/failed transactions

**Payload persistence**
- `walletPendingTxs` is now included in the shared sync payload — pending, imported, and dismissed entries sync across devices; entries older than 90 days with a resolved status are pruned on next activity fetch

---

## [2.3.1] — 2026-05-10

### Den tab reorder and wallet double-count fix

**Section order**
- Den tab sections reordered to: Net Worth → Portfolio Mix → Performance → Portfolio → Wallet → Liabilities → Savings Goals

**"Tracked via wallet" toggle**
- Each non-CD portfolio position now has a **Tracked via wallet — exclude from net worth** checkbox at the bottom of its detail fields
- When checked, the position's value and cost basis are excluded from the Net Worth pie, metrics row (net worth, total assets, portfolio G/L), and Portfolio Mix pie — removing the double-count for holdings tracked in both Portfolio and Wallet
- The position still appears in the Portfolio list with full G/L and cost basis detail, and continues to feed the Performance chart
- Unchecked by default; existing positions are unaffected

---

## [2.3.0] — 2026-05-10

### New: Crypto wallet balance tracking

**Wallet section in Den**
- A new **Wallet** card appears at the bottom of the Den tab when Den Preview is enabled
- Paste any public 0x wallet address, or click **Connect** to auto-fill it from MetaMask, Brave Wallet, Coinbase Wallet, or any EIP-1193 compatible browser extension — read-only, no signing required
- Connect button only appears when a wallet provider is detected; paste input always available as fallback (works on all browsers including iOS Safari)

**Per-(chain, token) balance tracking**
- Balances are tracked as independent (chain, token) pairs — ETH on Arbitrum and ETH on Ethereum are separate entries, not aggregated
- Four chains supported: **Ethereum**, **Arbitrum**, **Base**, **Polygon**
- Each chain can be toggled on or off independently
- Assets tracked per chain: ETH (Ethereum / Arbitrum / Base), POL (Polygon native), USDC, USDT, DAI
- USDT is not tracked on Base (no official deployment); all other tokens available on all four chains

**Balance fetching**
- Uses public JSON-RPC endpoints — no API key required for balance reads
- Native balances via `eth_getBalance`; ERC-20 balances via `eth_call` with the standard `balanceOf` selector
- All chains fetched in parallel; individual chain failures do not block others from loading
- ETH and POL fiat values fetched from CoinGecko (uses configured demo key if set); stablecoins pegged at $1.00
- Staleness indicator appears when balances are more than 4 hours old

**Display**
- Balances grouped by token symbol with per-chain rows beneath each
- Multi-chain totals shown at the token level when the same token exists across multiple enabled chains
- Zero balances are omitted from the display

**Net Worth integration**
- Wallet crypto (ETH, POL) contributes a **Wallet crypto** segment to the Net Worth pie
- Wallet stablecoins (USDC, USDT, DAI) contribute a **Stablecoins** segment
- Both included in Total assets and Net worth metrics

**Data**
- Wallet address and enabled chains sync across household devices via the shared payload
- Latest balances cached in `walletAssets[]` in the payload and sync automatically after each refresh

---

## [2.2.0] — 2026-05-10

### New: Receipt → portfolio position link

**Log receipts as portfolio purchases**
- Stock, ETF, crypto, and other investment positions can now be linked directly from the receipt log form
- When logging a purchase, a new **Portfolio purchase** dropdown (Den Preview only) lets you tag the receipt to a specific portfolio position
- An optional **Units** field captures how many shares or tokens were acquired in the transaction
- Tagged receipts show a `◆ Position Name · X units` label in the receipt list for quick identification
- Receipt edit form also supports setting and updating the position link and unit count

**Automatic cost basis and units from receipts**
- Linked receipts automatically contribute to a position's cost basis — no need to manually enter what you already logged
- Unit counts from linked receipts are summed and added to any manually entered units
- The earliest linked receipt date serves as the effective purchase date for performance chart calculations when no manual purchase date is set
- Manual **Units / shares** and **Cost basis** fields in the portfolio card become "Additional units" and "Additional basis" when receipts are present — they supplement the receipt-derived values rather than replace them

**Purchases from receipts section**
- Each portfolio position that has linked receipts shows a **Purchases from receipts** list below its detail fields
- The list shows date, vendor, amount, and units per receipt, with a subtotal row at the bottom

**Den values reflect effective totals**
- Portfolio value, gain/loss, and cost basis in the positions list, group headers, Net Worth pie, Portfolio Mix pie, and net worth metrics all incorporate receipt-derived units and basis automatically
- No re-entry required — data already in the log powers the portfolio view

---

## [2.1.5] — 2026-05-10

### New: 1D and 1W chart ranges; purchase-date-aware performance for all ranges

**1D and 1W range buttons**
- Two new range buttons appear in the Performance chart: **1D** (today, hourly data) and **1W** (past 7 days)
- Range order: 1D · 1W · 1M · 3M · 6M · 1Y
- 1D uses intraday API endpoints — CoinGecko returns 5-minute intervals; Finnhub returns hourly candles (`resolution=60`); Twelve Data returns 24 hourly bars; Alpha Vantage uses `TIME_SERIES_INTRADAY` for equities (crypto falls back to last 2 daily closes since AV has no free intraday crypto endpoint)
- 1D data is cached separately from the daily cache (1W–1Y) — switching between 1D and longer ranges reuses both caches independently

**Purchase-date-aware performance for all ranges**
- Every range now respects each position's purchase date — if a position was bought within the selected window, it contributes $0 before its purchase date
- A position purchased 3 months ago will show no contribution in the earlier part of a 1Y chart; the aggregate line rises only when assets actually entered the portfolio
- "Since purchase" has been removed as a separate button — this behaviour is now built into every range

---

## [2.1.4] — 2026-05-09

### New: Performance chart caching

**Single fetch, instant range switching**
- The Performance chart now fetches historical price data once per session (or until positions change), covering the maximum window needed across all ranges
- Switching between 1M / 3M / 6M / 1Y / Since purchase range buttons is now instant — data is filtered client-side from the cached fetch rather than triggering a new API call each time
- Reduces API requests dramatically: N calls per range switch → 1 call per session per position set

**Cache invalidation**
- Cache clears automatically when: the price feed provider changes, a position's ticker symbol or price ID is edited, a purchase date changes, a position is added or deleted, or Refresh Prices completes (to pick up any updated data)

### Renamed charts

- **Breakdown** renamed to **Net Worth** — the net worth composition donut chart in the Den tab
- **Portfolio breakdown** renamed to **Portfolio Mix** — the investment portfolio composition donut chart

---

## [2.1.3] — 2026-05-10

### New: Purchase date on portfolio positions

**Purchase date field**
- Stock, ETF, crypto, and other positions now have an optional **Purchase date** field in the portfolio card
- Stored per position; survives cloud sync alongside other portfolio data

**Performance chart — Since purchase range**
- New **Since purchase** button in the Performance chart fetches history from the earliest purchase date across all charted positions
- Each position's data is filtered to start on its own purchase date — positions not yet held on a given date contribute $0 to the portfolio total, accurately reflecting when each asset entered the portfolio
- Falls back to 1Y range with a prompt if no purchase dates have been set

### Fixes

**Den tab layout**
- Both breakdown pie charts now use a consistent left-aligned layout so the pies line up vertically across cards
- Portfolio Breakdown moved to its own standalone card, separated from the positions list
- Den tab order: Net Worth metrics → Net Worth Breakdown → Portfolio Breakdown → Performance → Liabilities → Portfolio positions → Savings goals

---

## [2.1.2] — 2026-05-10

### Fixes

**Pie chart layout**
- Legend no longer stretches to fill remaining card width; pie and legend stay visually grouped together
- SVG reduced from 144px to 120px for a more balanced proportion

**Den tab card order**
- Portfolio card moved directly below Net Worth so both pie charts appear closer together

**Net worth metrics**
- Net worth, Total assets, and Total debt now appear as prominent metric boxes at the top of the Den tab, matching the layout of the monthly report
- Breakdown pie chart moved into its own card below the metrics row

---

## [2.1.1] — 2026-05-10

### Fixes

**Price provider preference now persists across refreshes**
- Selecting a price feed provider (CoinGecko, Finnhub, Twelve Data, Alpha Vantage) now saves immediately to localStorage
- Previously, the preference was only pushed to cloud sync; a force-refresh would revert to "None" by re-reading stale localStorage

**Performance chart — aggregate portfolio view**
- The Performance chart now shows total portfolio value over time across all eligible positions (stocks, ETFs, crypto), rather than charting a single selected position
- Historical data is fetched for all positions in parallel; values are aligned by date with forward-fill and summed into one curve
- The position selector dropdown has been removed
- Chart automatically reloads after Refresh Prices completes
- Performance card moved to appear directly below Net Worth in the Den tab

---

## [2.1.0] — 2026-05-09

### New: Performance chart, CD / Savings product type

**Performance chart**
- A new **Performance** card appears in the Den tab when at least one stock, ETF, or crypto position is in the portfolio
- Trading-style line chart with gradient fill, Y-axis price labels, and X-axis date labels
- Range selector: 1M, 3M, 6M, 1Y (default)
- Position selector dropdown — choose any eligible position to chart
- Historical price data fetched from the configured price feed provider (CoinGecko, Finnhub, Twelve Data, or Alpha Vantage)
- Chart is lazy-loaded: data is fetched once when the card first renders, not on every Den re-render

**CD / Savings product type**
- New **+ CD / Savings** button in the Portfolio card adds a savings product entry
- Fields: Name, Principal ($), APY (%), Deposit date
- Current value calculated automatically via compound interest: `principal × (1 + apy/100)^years`
- CD entries display a compound interest projection curve instead of a live price chart
- CD / Savings appears as its own segment in both pie charts (portfolio breakdown and net worth)
- CD entries are excluded from gain/loss calculations (no cost-basis comparison)

---

## [2.0] — 2026-05-09

### New: Den tab (Preview)

Enable via **Settings → Den Preview** to unlock a new fourth tab for tracking long-term assets and liabilities alongside your monthly budget.

**Liabilities**
- Track loan, credit, lease, and other financing accounts
- Fields: original balance, current balance, interest rate, term (months), and start date
- Payoff estimate calculated automatically via amortization formula (or simple division for 0% accounts)
- Link each account to a budget expense line for cross-reference
- Receipts can be tagged to a financing account from the log form when Den Preview is on

**Portfolio**
- Track stock, ETF, crypto, and other investment positions
- Fields: symbol, name, type, units held, cost basis, and current price
- Gain/loss and percentage shown per position and per group
- Staleness indicator (amber triangle) when the current price hasn't been updated today

**Savings goals**
- Named savings targets with a current saved amount and a target amount
- Progress bar, remaining balance, and percentage to goal
- Link each goal to a budget expense line

**Net worth summary with pie chart**
- SVG donut chart shows each asset class as a share of total worth
- Segments: loan equity (paid-off portion of liabilities), stocks, ETFs, crypto, other, savings
- Metrics row: total assets, total liabilities, net worth

**Price feed — live stock and crypto prices**
- Four optional providers, configured in Settings → Den Preview → Price Feed:
  - **CoinGecko** — crypto only, free, no API key required; uses CoinGecko coin slugs
  - **Finnhub** — stocks + crypto, free tier (60 req/min); parallel fetch per position
  - **Twelve Data** — stocks + crypto, free tier (800 req/day); batched symbol request
  - **Alpha Vantage** — stocks + crypto, free tier (25 req/day); sequential with 250 ms spacing
- **Refresh prices** button appears in the Portfolio card when a provider is active
- Per-position price ID field (CoinGecko slug, exchange-prefixed symbol, etc.) shown when a provider is configured; defaults to the ticker symbol if left blank
- API keys are stored on-device in localStorage only and are never included in cloud sync payloads
- Fetched prices update `currentPrice` and stamp `lastPriceUpdate` on each position for staleness tracking
- Success and error states shown inline below the refresh button

---

## [1.8.4] — 2026-05-02

### Changes

**Budget planner — set-aside toggle for non-monthly expenses**
- Yearly and N-month expense lines in the budget planner now have a "Set aside monthly towards this expense" checkbox
- When unchecked (e.g. the expense is already on a monthly payment plan), it is excluded from the Bill set-aside metric
- Existing expenses default to requiring set-aside (backward compatible)

**Bill set-aside in monthly report**
- The Bill set-aside metric now appears in the metrics row at the top of the monthly report, consistent with the log tab

**Identity — signature color picker**
- Signature color now uses a native color picker (same as category colors), giving full color freedom instead of fixed presets
- Available in Identity settings and on the welcome screen for new users
- Color is applied at render time by username, so all past and future receipts automatically reflect the current preference — no data migration needed

**Receipt notes — tap to expand**
- Tapping a truncated receipt note expands it to show the full text; tapping again collapses it
- Applies to both the log tab and the monthly report

**Bill set-aside — color coding**
- The Bill set-aside amount is now color-coded by how much headroom remains in your income: green if income remaining is above 120% of the set-aside, amber for 100–120%, and red if it falls below 100%
- Applies to both the log tab and monthly report

---

## [1.8.3] — 2026-05-02

### Changes

**Recurring bills fix — receipts now appear after cloud sync**
- Recurring bills due on the current day are now auto-logged into receipts immediately after cloud data is pulled, not just at initial app startup
- Previously, `processRecurringBills()` ran once at startup before cloud data arrived, so bills due today would show a "due today" notification but never appear in the receipt list until the next app reload

**Planner — label rename**
- "Buffer allocated" metric renamed to "Rainy day buffer"

**Receipt edit form — Payment Towards**
- The "Payment towards" financing selector is now available when editing a receipt, not just when first logging one
- For recurring receipts, saving the edit also updates the bill template so all future auto-logged receipts carry the financing account forward

**Log form — Payment Towards always visible**
- "Payment towards" now appears for all categories when Den Preview is enabled, not just Debts and Savings

---

## [1.8.2] — 2026-04-29

### Changes

**Notification panel fix — dismissing a single notification**
- Dismissing one notification no longer closes the panel — remaining notifications stay visible
- Previously, clicking the × on any notification re-rendered the list (detaching the button from the DOM), causing the outside-click listener to treat the detached element as an outside click and close the panel

---

## [1.8.1] — 2026-04-28

### Changes

**Mobile layout fix — log a purchase form**
- The date and recurring toggle row now stacks vertically on narrow screens (≤580px) — the date field takes full width on its own line, the recurring toggle fills the line below it
- Previously, the four-button recurring toggle (One-time / Monthly / Yearly / Custom) combined with the fixed-width date input exceeded the available width on phones, causing the form to overflow and clip on the right

**Swipe gesture fix — log a purchase panel**
- Horizontal swipe-to-change-tab now works when the swipe begins anywhere in the log form area, including to the right of the date picker
- Previously, the gesture handler excluded the entire form panel, blocking tab switches unless the swipe started outside it; individual interactive elements (inputs, selects, buttons) are still excluded as expected

---

## [1.8.0] — 2026-04-28

### Changes

**Recurring bills: yearly and custom intervals**
- Recurring bills now support two new frequencies alongside monthly: **Yearly** (specific month + day each year) and **N months** (every 2–24 months — covers quarterly, semi-annual, and any other cadence)
- All interval types auto-log a receipt when their due date is reached: yearly bills check once per calendar year; N-month bills track the last logged receipt and fire again N months later
- Receipt badge identifies the frequency — "yearly", "every 6mo", "every 3mo", etc. — so past entries are easy to distinguish
- Bill edit form shows the appropriate controls for each type (month + day selector for yearly; interval input for N-month) with an inline "set aside $X/mo" reminder
- Notification panel surfaces upcoming bills of all types within the configured reminder window, showing the due date and monthly set-aside amount
- Deletion confirm message correctly names the cadence ("future years", "future 6-month intervals", "future months")

**Budget planner: interval frequencies**
- Expense line items now support a third frequency option — **N mo** — alongside Monthly and Yearly; when selected, a number input appears to set the interval (2–24 months)
- Monthly equivalent (`moAmt`) is computed as amount ÷ N, so all budget math — category totals, income vs. expense flow bar, Hibernation View — automatically reflects custom-interval items
- The "Mo equiv" column now shows the monthly equivalent for any non-monthly item, including N-month ones
- The "· yearly items" label on category cards is updated to "· interval items" to reflect all non-monthly budget lines

**Per-category committed vs. budgeted**
- Each budget planner category card now shows a "Recurring bills" summary row below its expense lines when any recurring bills exist for that category
- Displays the total monthly equivalent of all recurring bills in that category (monthly + yearly + interval combined) with a ✓ if the category budget covers it, or an amber "X over" if it does not — making underfunded categories visible at a glance

**Bill set-aside metric**
- The log metrics row "Bill set-aside" tile (formerly "Yearly set-aside") now covers all non-monthly recurring bills — yearly and N-month — showing the total monthly provision needed across all interval commitments

---

## [1.7.7] — 2026-04-26

### Changes

**Auto-archive bug fix**
- `runAutoArchive()` previously ran at startup before any cloud data was loaded, making it a no-op in the normal sync flow — it now runs after every cloud pull and JSON restore via `refreshAll()`
- Archive and prune both trigger an autosave when they remove data, so cloud reflects the pruned state without requiring a manual user action

**Receipt data retention (auto-prune)**
- New "Receipt data retention" setting in Settings → Data — choose 1, 2, 3, 5, 7, or 10 years, or keep forever (default)
- Archived data older than the selected window is permanently deleted on the next sync or app open
- A hint below the select explains when deletion takes effect
- Health panel now shows current retention setting ("Forever" or "Nyr") alongside active receipts, archived count, and vendor count

**Active receipt limit removed**
- The 2,000 active receipt limit and its warning banner have been removed — the limit did not correspond to any real performance boundary; the natural two-year archive window and the per-provider payload size warning are the appropriate safeguards

**Local-only data safety**
- Status bar message for users without cloud sync changed from green "Saved locally" to amber "Not backed up — export a backup to keep your data" — the previous label implied persistence that does not exist; all budget data lives in browser memory only until synced or exported
- Sync status idle label changed from "Saved locally" to "Not backed up" for the same reason
- Browser now shows a native "Leave site?" confirmation when a local-only user with real data attempts to close or navigate away, preventing accidental loss from tab closure

**Credential input trimming**
- All provider credential fields (Gist ID, Gist token, JSONBin Bin ID, JSONBin Master Key, self-hosted URL, self-hosted token, Dropbox token) now trim whitespace on input — a trailing space or newline from pasting would silently cause auth failures (401/404) with no indication the credential itself was not the problem
- In-app Gist provider note updated to specify classic PAT (not fine-grained), the required initial file content, and that the token and Gist must belong to the same GitHub account

---

## [1.7.6] — 2026-04-26

### Changes

**Custom notification: note keyword total**
- New `note.total` condition field — sums amounts for all receipts whose note contains a keyword, and triggers when that total exceeds or is under a threshold
- Example: keyword `groceries`, operator `exceeds`, value `$500` fires when receipts tagged "groceries" in the note field collectively exceed $500 for the month
- Keyword matching is case-insensitive substring search
- Adds a second input to the condition row (keyword + dollar threshold)

**Dynamic payload size limits per sync provider**
- Payload limit is now derived from the active sync provider instead of a fixed 100 KB constant
  - JSONBin.io: 100 KB
  - GitHub Gist: 100 MB
  - Dropbox: 2 GB
  - Self-hosted: user-configurable (new "Payload size limit (KB)" field in provider settings, default 10 MB)
  - None / local-only: no limit shown
- Health panel progress bar, percentage, and warning notifications all reflect the active provider's limit
- Health panel updates immediately when provider or custom limit changes

**Cloud sync provider order**
- GitHub Gist promoted to first option in the provider dropdown (after None)
- Provider setup notes updated to include payload limits for each service

**Active receipt limit raised to 2,000**
- Limit raised from 1,000 to 2,000 — households logging ~78 receipts/month would have hit the old limit around month 13, before the auto-archive cycle could clear any data; 2,000 comfortably covers the 24-month active window (current + prior year) at that rate
- Warning threshold updated to 1,600 (80%)
- Fixed O(n²) duplicate check in the hibernation view — replaced `receipts.find()` loop over archived receipts with a Set lookup, keeping hibernation view rendering fast as data grows

**Log receipt / Monthly report alignment**
- Log tab metric "Logged [month]" renamed to "Spent [month]" — consistent with "Actually spent" label used in the monthly report
- Log tab metric "Monthly budget" renamed to "Total budgeted" — matches the monthly report label
- Monthly report transaction list now shows the ↺ recurring badge on recurring receipts, matching the log tab's appearance

---

## [1.7.5] — 2026-04-25

### Changes

**Den Preview cleanup**
- Removed savings goals UI from Den Preview settings — goals will be introduced with the full native Hedgie release; the `savingsGoals[]` schema field and data layer remain intact so any stored goals are preserved and will be read by the native app on day one

**Dark mode fix**
- Settings drawer text that uses `--text-faint` (sub-labels, helper text, accordion arrows) was rendering as very dark brown and hard to read in dark mode — lightened from `#5c4030` to `#7a6048`

**UI fixes**
- Financing Accounts type dropdown clipped at the bottom — bumped select height from 26px to 28px
- Settings drawer now matches the top banner width on wide screens — constrained to 860px and centered using `left:50%;width:min(860px,100%)` instead of stretching edge-to-edge
- Settings drawer accordions are now mutually exclusive — opening one closes the previously open section
- Accordion open/close animation replaced: height no longer animates (eliminating drawer bounce), inner content fades in/out at 0.18s instead
- Settings drawer section order resequenced: Identity → Cloud sync → Data → Notifications → Den Preview (Data promoted above Notifications as the more safety-critical action)
- Budget planner line items in savings and investment categories now labelled "Contribution" instead of "Expense" — column header, row placeholder, and add button all reflect the category type
- Removed default "Retirement (401k/IRA)" example line from the Savings category — investment products belong under an investment-typed category

---

## [1.7.4] — 2026-04-26

### Changes

**Category type awareness across reporting and notifications**
- **Income remaining** (log receipt, monthly report, and hibernation view) now only exempts savings-typed spending — savings receipts don't reduce income remaining since contributions stay liquid; investment receipts still reduce it since invested money (CDs, retirement contributions, etc.) is genuinely unavailable
- **Budget-warning notifications** no longer fire for savings or investment categories — exceeding a savings or investment budget is a good thing, not a warning
- **Hibernation view** budget-status outlines and progress bar colors on per-category bars now respect category type — savings and investment categories show plain bars with no red/amber status indicators
- Changes use the `isExpenseCat()` and `isSavingsCat()` helpers that read `category.type`, so any custom category inherits the correct behavior automatically

---

## [1.7.3] — 2026-04-25

### Bug fixes

- **Custom category name field on mobile** — the name input in the category manager no longer gets squished on narrow screens; on mobile it fills the full first line, with the color picker, type selector, and arrow/delete buttons grouped together on the line below
- **Default category types** — all six default categories now carry a pre-assigned type: Home, Transportation, Shopping, Services, and Debts are typed as Expense; Savings is typed as Savings; existing users get the defaults applied on next load if they haven't set a type manually

---

## [1.7.2] — 2026-04-25

### Changes

**Log receipt metric card order adjusted**
- Swapped Budget used and Income remaining: order now reads Logged → Monthly budget → Budget used → Income remaining
- Budget used sits next to Monthly budget where it is more directly comparable

**Custom category financing flag visible in category manager**
- A "Financing" checkbox now appears on custom categories in the category manager when Den Preview is enabled
- Checking it adds the category to the "Payment towards" picklist in Log receipt, alongside the built-in Debts and Savings categories
- The picklist updates immediately when the checkbox is toggled
- Already implemented in `updateCatFinancing` and `updateDenLogFieldVisibility` — this release wires it correctly to the startup sequence

**Den fields hidden until Den Preview is enabled**
- `applyDenPreview()` now runs at startup after settings are loaded from localStorage
- Previously `rebuildCatUI()` ran before `checkWelcome()` (which loads settings), so the Den UI could appear briefly in an incorrect state
- Both the Log receipt payment field and the category manager financing controls are now reliably hidden until the Den Preview toggle is explicitly enabled

### Bug fixes

**Log receipt Income remaining matches monthly report**
- Income remaining on the log tab was using a different calculation than the monthly report
- Now consistently computed as total income minus actual receipts logged for the selected month

**Den Preview preference synced in cloud payload**
- `denPreview` setting now included in the cloud payload alongside `darkMode` and `pwaInstalled`
- Toggling Den Preview on one device now carries through to synced devices

---

## [1.7.1] — 2026-04-25

### Changes

**Den Preview: financing account tagging replaces events and funding sources**
- Den Preview receipt form updated to tag receipts against a financing account (loan, credit line, or lease) rather than events and funding sources
- Provides a direct link to Den's debt tracking features and ensures payment history is readable by the native app on day one

**Den payment picklist scoped to Debts and Savings categories**
- The "Payment towards" Den field in Log receipt now only appears when the selected category is Debts or Savings
- Previously visible for all categories when Den Preview was enabled — this aligns the feature with its intended use (debt payments and savings contributions)
- The field hides/shows dynamically as the user changes category
- Also hidden correctly after a receipt is saved and the form resets

---

## [1.7.0] — 2026-04-25

### New features

**Den Preview — forward-compatible schema and opt-in UI**
- New **Den Preview** accordion in Settings lets users opt in to early Den data features; all data is stored immediately and will be read natively by the Hedgie app when released
- **Financing accounts** — create and manage loans, credit lines, and leases (name + type); tag receipts as payments towards a specific account from the log form so native Hedgie can read the full payment history on day one without users having to retag anything
- Financing account name appears as a badge on tagged receipt rows in both the log and monthly report tabs
- **Savings goals** — create named savings targets with an optional target amount; persisted and synced alongside all other data
- **Category types** — each category (default and custom) can be assigned a type: Expense, Savings, or Investment; type selector appears in the category manager when Den Preview is enabled
- Schema additions: `savingsGoals[]` array and `receipt.financeId?` and `category.type?` optional fields are now persisted and flow through all sync paths

---

## [1.6.3] — 2026-04-25

### New features

**Hibernation view: category-colored bars with budget-status outlines**
- Per-category mini bar charts in "Year by category" now always render in each category's own color instead of budget-status colors
- Budget status is indicated by a dotted outline: green for under budget, amber for near limit (≥80%), red for over budget
- A small legend beneath the "Year by category" card header explains the outline meanings
- Savings category is excluded from budget-status outlines — saving more than budgeted is not a warning, so no outline is applied

---

## [1.6.2] — 2026-04-25

### New features

**Receipt totals on log and monthly report tabs**
- A running total row now appears at the bottom of the receipt list on the Log a Purchase tab, showing item count and sum for the active month/filter
- The Transactions card on the Monthly Report tab also shows a total row at the bottom

**Category filter pills on monthly report tab**
- The same category filter pills from the Log a Purchase tab are now available in the Transactions card on the Monthly Report tab
- Selecting a category filters the transaction list and updates both the item count in the card header and the total row
- Filter persists when switching between months; resets independently of the log tab filter

---

## [1.6.1] — 2026-04-25

### Bug fixes

**Upcoming bill notifications use correct days-in-month**
- Bill due-day is now clamped to the actual number of days in the current month before computing days-away, so months shorter than 31 days (April, June, etc.) no longer report an incorrect countdown
- The next-month look-ahead also clamps to that month's real length, correctly handling February and other short months
- When a bill's due day is clamped, the notification title now appends the actual date (e.g. "· Apr 30") so the exact fall date is visible
- Day counts are derived dynamically from the real calendar year, so leap year Februaries (29 days) are handled automatically

---

## [1.6.0] — 2026-04-24

### New features

**New user wiki banner**
- Soft parchment-toned banner appears below the tab bar for the first 3 sessions
- Links to the Open Hedgie GitHub wiki with "Get started →"
- Dismissible with × (persisted in localStorage, never reappears after dismiss)
- Automatically stops appearing after 3 sessions without any user action
- Uses only CSS variables — renders correctly in both light and dark mode

**Wiki link in Settings drawer**
- Tappable "📖 Open Hedgie Wiki & User Guide →" row at the top of the Settings drawer, above all accordions
- Always accessible regardless of scroll position

**Wiki link on welcome splash**
- Muted "📖 Read the wiki before you begin" text link below the Get started button
- Targets first-time users at exactly the right moment

**Sync timestamp history in Cloud sync drawer**
- Three persistent timestamps in the Cloud sync accordion: Last push, Last pull, Last sync
- Recent times shown as relative ("2 hours ago"), older times as absolute ("Apr 23 at 3:14 PM")
- Updates live whenever the drawer is open during a sync operation
- Timestamps stored in syncMeta and persisted to localStorage
- Shows — when an operation has never been performed

### Fixes

**Gear button too bright in dark mode**
- Settings gear button background darkened to `#352b1f` in dark mode
- Consistent with the dark espresso tones used elsewhere in the dark theme

**Vendor autocomplete unresponsive after sync**
- Swipe handler was intercepting touches on vendor suggestion dropdown items
- Added `element.closest()` check to bail out for touches inside `.quick-form` or `#vendor-dd`
- Future-proofs against any new interactive elements inside the log form

**Settings drawer accordions default closed**
- Identity accordion (and all others) now start collapsed on every drawer open
- Drawer presents a clean list of sections rather than jumping straight into Identity

## [1.5.8] — 2026-04-23

### Bug fix

**Support Open Hedgie donate button unresponsive after cloud sync**
- Same root cause as the v1.5.7 form field fix — the swipe gesture handler was intercepting taps that originated on or near the donate button
- `<a>` anchor tags were not in the blocklist, so touches on links entered the drag state and `preventDefault` cancelled the tap before the browser could follow the link
- Added `A` to the element blocklist in both `onTouchStart` and `onTouchMove` — touches on any anchor now pass straight through to the browser

## [1.5.7] — 2026-04-23

### Bug fixes

**Form fields unresponsive to touch after sync**
- The swipe gesture handler was calling `e.preventDefault()` too aggressively — any touch that started on or near a form element could get intercepted before the input received focus
- `onTouchStart` now exits immediately (sets `dragging=false`) if the touch originates on an `INPUT`, `SELECT`, `TEXTAREA`, or `BUTTON` element
- `onTouchMove` also bails out early on those elements and additionally requires >8px of horizontal movement before calling `preventDefault` — short taps on fields are never cancelled
- Swipe still works everywhere else in the tab content area

**Category dropdown arrow black and hard to see**
- Browser-native select arrows inherit OS default styling (black) and ignore CSS `color`
- Added `-webkit-appearance:none; appearance:none` to strip the native arrow
- Replaced with a custom SVG chevron via `background-image` in the same white/semi-transparent colour as the form labels (`rgba(255,255,255,0.65)`)
- Applied to `.quick-form select` so the log form's category and recurring pickers both benefit

## [1.5.6] — 2026-04-23

### Bug fixes

**`ReferenceError: can't find variable cd` on sync conflict**
- `showConflictModal` referenced `cd` (shorthand for `cloud.data||{}`) without ever declaring it in its own scope
- `const cd` was correctly added to `mergePayloads` and `budgetChanged` during the `toPlainPayload` patching session but was accidentally omitted from `showConflictModal`
- Any sync that reached the conflict modal threw a ReferenceError and failed immediately

**Excess scroll below content on Log receipt and Monthly report tabs**
- Off-screen panels were contributing their full height to the document, causing the page to scroll far past the visible content
- Inactive panels now use `height:0; overflow:hidden` to collapse out of flow; active panel restores `height:auto; overflow:visible`

**Force refresh button for stale PWA cache (iOS)**
- Added ↻ Force refresh button in Settings → Data
- Navigates to `index.html?v=<timestamp>` to bust iOS Safari's PWA HTTP cache, then immediately strips the param via `history.replaceState` so the clean URL is restored
- Added `no-cache, no-store, must-revalidate` meta headers so future deploys arrive fresh without needing the button

## [1.5.5] — 2026-04-23

### New features

**Tab swipe gestures (iOS, Android, any touch screen)**
- Swipe left/right anywhere in the tab content area to move between Log receipt, Monthly report, and Budget planner
- Panels follow your finger in real time then snap to the target tab on release with a smooth `cubic-bezier` transition
- Vertical scroll is fully preserved — a swipe is only committed when horizontal displacement exceeds 50px and the gesture angle is within 40° of horizontal
- Uses `passive: false` on `touchmove` only to allow `preventDefault` during horizontal drags; `passive: true` on start/end for maximum scroll performance
- Works in Safari, Brave, Chrome, and any WebKit/Blink touch browser on iOS, iPadOS, and Android

### Bug fixes

**Notification urgency `info` showed as "undefined"**
- `urgLabels`, `urgColors`, `urgBorderColor`, and `urgBg` lookup maps in `renderNotifList` were missing the `info` key introduced in v1.5.0
- `info` notifications now render with a blue left border, blue title color, and the section header reads "Heads up"
- Added `||` fallbacks so any unrecognized urgency level degrades gracefully

**Custom notification save/cancel buttons cut off at bottom**
- Button row wrapped in `.notif-rule-btns` which applies `padding-bottom: env(safe-area-inset-bottom, 12px)`
- Ensures buttons clear the home indicator on iPhone and the bottom of the drawer on all devices

**Payload limit corrected to 100 KB**
- `LIMITS.payloadKB` updated from 80 to 100 to reflect actual JSONBin/Gist provider limits

---

## [1.5.4] — 2026-04-23

### Fix

**iOS install banner: reverted `navigator.share()` approach**
- `navigator.share()` opens the generic iOS share sheet which does not include Add to Home Screen — that option only appears in the browser's own toolbar Share button, which cannot be triggered programmatically on iOS
- Replaced the button with a clear inline instruction showing the Safari Share icon (SVG) followed by "Share in your browser toolbar, then Add to Home Screen"
- Removed the dead `iosShareInstall()` function

---

## [1.5.3] — 2026-04-23

### Changes *(superseded by 1.5.4)*

- Attempted to trigger iOS share sheet via `navigator.share()` — did not include Add to Home Screen; reverted in 1.5.4

**Dark mode: receipt log box darkened**
- `.quick-log` card overridden in `body.dark` to `#2a1f14` — deep espresso tone instead of the too-bright inverted tan
- Input and select fields inside the log form also darkened with a matching overlay

---

## [1.5.2] — 2026-04-23

### Bug fixes

**iOS/iPadOS install button not appearing (Safari and Brave)**
- `beforeinstallprompt` is Chrome/Android-only and never fires on iOS — the tab-bar 📲 button was permanently hidden on all iOS browsers
- iOS banner was also gated behind `settings.pwaInstalled` (could be `true` from another device's sync) and a localStorage dismissal flag, silently blocking the banner on fresh sessions
- `checkIosInstallBanner()` now shows both the tab-bar button and the instruction banner whenever the UA is iOS/iPadOS and the app is not already running in standalone mode — no sync flag, no dismissal gate
- Added iPadOS 13+ detection: `navigator.maxTouchPoints > 1` on a macOS UA catches iPad in desktop mode
- Standalone check (`window.navigator.standalone === true`) means the button and banner stay hidden once the app is actually installed and open as a PWA

---

## [1.5.1] — 2026-04-23

### Bug fixes

**`undefined is not an object (evaluating 'cloud.data.income')` crash on restore + push**
- All three sync functions (`quickSync`, `cloudPull`, `cloudPush`) passed raw cloud objects directly to `budgetChanged`, `mergePayloads`, and `showConflictModal` without checking for missing or encrypted `.data`
- Added `toPlainPayload(payload)` helper — decrypts AES-GCM payloads and guarantees `.data` always exists, falling back to empty defaults for malformed or empty payloads
- `quickSync`, `cloudPull`, and `cloudPush` all call `toPlainPayload` before any `.data.*` access
- `mergePayloads` and `budgetChanged` additionally use `cloud.data||{}` defensively
- `showConflictModal` uses `(cd.receipts||[]).length` instead of bare `cloud.data.receipts.length`

**iOS home screen install instructions not appearing**
- Added `checkIosInstallBanner()` with iOS UA detection and standalone check
- Shows a dismissible blue banner with Share → Add to Home Screen instructions on iOS/iPadOS when not already installed

---

## [1.5.0] — 2026-04-23

### New features

**Dark mode**
- Moon/sun toggle button in the tab bar, left of the notification bell
- Preference saved in `settings.darkMode` and synced in the cloud payload so it follows the user across devices
- Full CSS variable override via `body.dark` — no hardcoded colors
- Receipt log card (`quick-log`) uses a dedicated dark espresso override so it doesn't appear too bright

**PWA / home screen install**
- `manifest.json` with 192×192 and 512×512 hedgehog PNG icons, app name "Open Hedgie 🦔"
- 📲 install button in tab bar — visible on Android/desktop via `beforeinstallprompt`; visible on iOS via UA detection with Share → Add to Home Screen instruction banner
- Apple meta tags for iOS home screen compatibility
- `pwaInstalled` flag synced in cloud payload

### Notification improvements

**Four-tier urgency sort: high → med → low → info**
- Added `info` tier (blue) below `low`
- Bell badge color matches the highest-priority item in the queue (red / amber / green / blue)

**First-sync notification demoted to `info`**
- Fires when data is empty and a provider is configured — shown as a blue heads-up, not a red alert

**Monthly local backup reminder (new)**
- `info` urgency, fires on the 1st of each month in local-only mode when data exists
- Independently toggleable as "Monthly local backup reminder" in Settings → Notifications

### Status bar fixes
- Local-only mode now reads "Saved locally" when data exists, or "No data yet" when blank
- `triggerAutosave` refreshes drawer status after local saves

### Other fixes
- Welcome screen hedgehog now matches the tab bar logo (legs were missing)
- Custom notification placeholder changed from "Sin over $100" to "Leisure over $100"

### Data safety fix
- `triggerAutosave` now checks `localHasData` before any cloud push — preference-only changes (dark mode toggle, PWA install) on a blank session can never overwrite real cloud data
- Same guard added to `cloudPushSilent` as a hard backstop

---

## [1.4.5] — 2026-04-22

**First-sync notification independently toggleable**
- Separated from the sync staleness toggle into its own `notifs.firstSync` key
- Existing users get it defaulted to `true` automatically

---

## [1.4.4] — 2026-04-22

**Encrypt sync payload moved to Identity**
- Toggle relocated from Cloud sync to Identity section, directly below the shared key
- Encryption derives from the shared key — both settings belong together

---

## [1.4.3] — 2026-04-22

**Donate button on all three tabs**
- "Support Open Hedgie" Liberapay button in Log receipt, Monthly report, and Budget planner footers
- Rendered from a single `renderDonateBtns()` function — one source of truth

**Encrypt toggle auto-checked on pull**
- Pulling an encrypted payload now automatically checks the "Encrypt sync payload" toggle and saves the setting

**Food → Shopping category rename**
- Default category renamed in `DEFAULT_CATS`, `DEF`, and all static HTML
- Existing data tagged `Food` continues to display correctly

---

## [1.4.2] — 2026-04-22

**Donation button**
- Liberapay "Support Open Hedgie" button in Budget planner footer
- Inline SVG logo — no external script, consistent with zero-dependency philosophy

**First-session sync notification fix**
- Fires whenever local data is empty and a provider is configured, regardless of prior sync history

---

## [1.4.1] — 2026-04-22

### Notification fixes
- First-session sync prompt added (fires when no data + provider configured)
- Logging nudge now only fires when budget data exists (income or expense lines present)

### Schema additions *(backward compatible, all fields optional)*

**`financing[]` array**
- Top-level field in payload `data` — empty in Open Hedgie, populated by Hedgie native (Den features)
- Preserved through all sync, merge, conflict resolution, and restore operations

**`category.financing` flag**
- Optional boolean on category objects — signals Den linking eligibility
- No effect in Open Hedgie

**`expense.financeId` / `recurringBill.financeId`**
- Optional string linking an expense or recurring bill to a Den financing account
- No effect in Open Hedgie

---

## [1.4.0] — 2026-04-22

### AES-GCM payload encryption (opt-in)

- Toggle in Settings → Identity: "Encrypt sync payload"
- AES-256-GCM via Web Crypto API; key derived from shared secret via PBKDF2 (100,000 iterations, salt `hedgie-aes-v1`)
- HMAC signature covers `ciphertext+iv` when encrypted, `data` when plain
- Requires HTTPS and a shared key — shows specific alerts when either is missing

**Decrypted export**
- "Export decrypted backup" always produces plain JSON regardless of encryption state
- Compatible with Restore local and future Hedgie native app

**Encrypted payload schema:**
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

---

## [1.3.0] — 2026-04-22

### Inline receipt editing
- Pencil edit button on every receipt row — expands in-place, no modal
- Editable: category, amount, vendor, note, date
- Recurring receipt edits update the bill template; Delete recurring bill removes the template

---

## [1.2.0] — 2026-04-21

- Version display in tab bar and footer
- Granular erase options (identity & sync / budget & receipts / everything)
- Custom notification rule builder
- Sync guards for blank-state and first-sync scenarios

---

## [1.1.0] — 2026-04-21

### Open Hedgie edition established

- Custom notifications (11 fields, AND/OR, 3 conditions, Low/Med/High urgency)
- Sync reliability guards (empty-state pull, first-sync confirm dialog)
- Custom categories reconstructed from expense keys on pull/push

---

## [1.0.0] — 2026-04-20

### Initial public release

- Budget planner (income, expenses, 6 default categories, rainy day buffer)
- Receipt logging with vendor memory and recurring bills
- Monthly report with budget vs actual and user breakdown
- Hibernation View (yearly bar chart)
- Cloud sync: JSONBin, GitHub Gist, self-hosted, Dropbox
- HMAC-SHA256 signed payloads
- Built-in notifications: bills, budget, sync staleness, logging nudge
- Auto-archive, CSV export, local backup/restore
- Single HTML file, zero dependencies, works offline
