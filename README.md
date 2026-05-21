# Undiscord 2: Electric Boogaloo

**Version:** 1.4.0 · **Script:** [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js)

> [!CAUTION]
> **Using this script can get your Discord account terminated.** It automates **your normal user account** (a “self-bot”) via Discord’s HTTP API. That is **not** the supported bot/OAuth2 developer flow Discord allows.
>
> Discord’s policies that apply here include:
>
> - **[Terms of Service](https://discord.com/terms)** — under **“Restrictions on your use of Discord’s services”**, you must not, among other things:
>   - use the services to **“auto-messaging”** people through automated means;
>   - **scrape** the services without written consent using **“any … automatic device, process, or software”**;
>   - use **“unauthorized software designed to modify the services”**.
> - **[Automated User Accounts (Self-Bots)](https://support.discord.com/hc/en-us/articles/115002192352-Automated-User-Accounts-Self-Bots)** — Discord states that **automating normal user accounts outside of the OAuth2/bot API is forbidden** and **can result in account termination if found**.
> - **[Developer Terms of Service](https://discord.com/developers/docs/legal)** — if you use Discord’s APIs outside the approved developer/bot model, you are not operating under the permissions Discord grants to registered applications.
>
> Under the same Terms, Discord may **suspend or terminate your account** (with or without notice, at Discord’s discretion) if you breach these terms — including via automation like bulk deletion.
>
> **You are solely responsible** for using this tool. Only proceed if you understand and accept that risk.

An overhauled, maintained fork of [Undiscord](https://github.com/victornpb/undiscord) — a userscript that bulk-deletes **your own** messages on Discord through the web client, with optional media backup and server-wide wipe workflows.

The original Undiscord project has been largely inactive, with [many open issues and pull requests](https://github.com/victornpb/undiscord/issues) and a UI that no longer matches Discord’s layout. **Electric Boogaloo** keeps the familiar workflow, fixes integration and reliability papercuts, and adds configurable run modes without forcing one-size-fits-all behavior.

## Privacy

This script runs **only in your browser** on Discord. It does not send your messages, token, or chat history to this repository or any third-party service — network traffic for search and deletion goes to **Discord’s API** only.

- Read **[PRIVACY.md](./PRIVACY.md)** for what the script touches locally (token, logs, checkpoints, downloads).
- **Audit the source:** one file, [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js).

What you delete and which filters you use is **your business**. This project is a tool you run locally — not a hosted service.

## Requirements

- A **Chromium- or Firefox-based** browser with Discord open at `https://discord.com/app` (or channel URLs)
- A **userscript manager**, e.g. [Tampermonkey](https://www.tampermonkey.net/), [Violentmonkey](https://violentmonkey.github.io/), or [Greasemonkey](https://www.greasespot.net/) (Firefox)
- Grants used: **`GM_download`** (log/media saves), **`unsafeWindow`** and **`GM_addElement`** (token autofill and client-like API headers). Without `GM_download`, saves fall back to normal browser downloads.

## Installation

> [!WARNING]
> **Install only from a source you trust.** Prefer the official raw file below (or a release you have diffed against this repo). Third-party “fixed” mirrors can alter the script to steal your token or change what gets deleted.

1. Install a userscript manager.
2. Open the raw script (your manager should offer to install):
   - [`undiscord-electric-boogaloo.user.js`](https://github.com/Levskitron/undiscord2electricboogaloo/raw/main/undiscord-electric-boogaloo.user.js)
3. When prompted, allow **`GM_download`**, **`unsafeWindow`**, and **`GM_addElement`** if asked — downloads save log/media **to your computer** only; the other grants help token autofill and client-like API headers in your Discord tab.
4. Open [Discord](https://discord.com/app) in the browser.
5. Click the **trash** icon in the channel toolbar (or the floating fallback button) to open the panel.

### Manual install

Copy [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js) into a new userscript in your manager, save, and reload Discord.

## User guide

**New to this tool?** See **[USER_GUIDE.md](./USER_GUIDE.md)** — a full walkthrough in plain language (install, profiles, every setting, troubleshooting). Bulk delete is **slow by nature** (hours to days for large histories); the guide explains realistic timelines.

## Quick start

1. Open the channel (or server) you want to clean up.
2. Open the Undiscord panel → set **Run profile** to **Fast wipe** (default).
3. Under **Target**, confirm **Author ID** is filled (auto-fills on load; click **Me** if empty), then **Current** for server/channel — or enable **All message channels in this server** for a full server wipe.
4. Click **▶︎ Delete**. For **Fast wipe**, no confirmation popup after the first batch unless you enable it in Advanced.
5. Use **🛑 Stop** to cancel. Closing the panel with the trash icon **does not** stop a run in progress.

## Run profiles

Profiles set sensible defaults. Changing any control manually switches the profile to **Custom** (except profile-only toggles the preset applies).

| Profile | Best for | Pipeline | Notable defaults |
|---------|----------|----------|------------------|
| **Fast wipe** (default) | Large single-channel jobs, unattended | Direct search → delete | No confirm popup; 30 s search / 1 s delete delay |
| **Careful wipe** | Rate-limit nervous users | Direct | Confirm before first batch; slower delays; 4 empty-page retries |
| **Review photos & backup** | Save attachments before deleting | Interactive gallery every batch | Media-only scan; batch size 50; short delete delay in batch |
| **Server wipe (all channels)** | Leaving a server, footprint across channels | Direct, per-channel batch | Discovers all channels; pre-count + confirm; checkpoint on; 1.5 s delete delay |
| **Custom** | Full control | Your choice (Direct or Interactive) | All sections visible; you set every toggle |

**Direct pipeline** — searches Discord’s message index, deletes page by page (standard Undiscord behavior).

**Interactive pipeline** — buffers a batch of messages, opens a **Backup selection** gallery; you choose what to download and what to delete. **One channel only.** Not compatible with server-wide wipe.

## Features

### Deletion & search

- Bulk delete **your** messages in a channel, DM, comma-separated channel list, or **entire server** (all message channels).
- **Client-like API headers** on every `discord.com/api` call (`X-Super-Properties`, locale, timezone, channel `Referer`, `credentials: include`) — same idea as the web app, not “Authorization-only” deletes. **Full** vs **Partial** mode is shown in the fingerprint bar above the log; optional **Debug API headers** footer toggle logs safe request summaries.
- Discord **search API** with guild/channel scope fallbacks and optional **channel history scan** when search is unavailable (`50024`).
- **Hybrid time-remaining** estimate (modeled delays + observed throughput + rate-limit history).
- **Rate-limit aware** — raises delays on HTTP 429; retries empty search pages; network retry on 5xx / transient failures.
- **Quick check** after delete batches to finish early when the index is caught up.
- **Stop** cancels in-flight requests and pending waits promptly.

### Filtering

- Text contains, `has: link`, `has: file`, regex (case-insensitive).
- **Delete pinned messages** (on by default; turn off to skip pinned).
- **Include bot / app messages** (off by default — avoids many permission errors on bot posts).
- **Keep messages (inverse):** keep link / file / pinned messages; delete everything else that still matches.
- Message ID range (**Pick** from chat) or date range (not both with ID limits).
- **Include NSFW channels** for server-wide search.

### Server-wide wipe

- Discovers channels via `GET /guilds/{id}/channels`, **active threads**, and **archived** public/private threads; falls back to the **sidebar DOM** if the API fails.
- Optional **pre-count** (one search per channel) and confirmation before starting.
- **Checkpoint resume** — if you stop mid-run, remaining channels are saved in browser `localStorage`; **Resume** / **Discard** banner under Target.
- Progress shows `Ch N/M` during batch runs.

### Media review & backup

- Gallery with per-attachment preview; select items then choose an action (backup only, delete only, combinations, skip batch).
- Downloads to `Undiscord_Media/{user}/{server}/{channel}/` via `GM_download` when available.
- **Media only** or **all messages** scan modes; batch size 5–100.

### Session, logs & UI

- **Auto-save & clear log hourly** → `Undiscord_Logs/undiscord_log_*.txt` (optional **messages only**).
- **Auto-save log on stop / finish** (optional messages-only).
- **Auto-clear log hourly** without saving.
- **API fingerprint bar** (above log) — **Full** / **Partial** / unknown; shows locale, timezone, and whether `X-Super-Properties` is active (refreshed on **▶ Delete**).
- **Copy log** to clipboard; **Clear log**; footer toggles: **Auto scroll**, **Verbose log**, **Log each deletion**, **Debug API headers**.
- **Privacy mode** — masks IDs/token in the form and redacts log content (toggle anytime).
- **Account token vault** — red sidebar section (last item, below Advanced); acknowledgment gate; **background auto-fill** (default on); gated **Copy**.
- **Auto-fill IDs when I change channel** (default on).
- Sidebar sections: Run profile, Target, Filters, Media review, Limits, Bulk archive, Session & logs, Advanced, **Account token**.
- Default panel width **1100px** (min **880px**); drag edges/corners to resize within ~96% of viewport.
- Toolbar trash button with resilient mount; floating fallback if Discord re-renders the header.

### Bulk archive import

- Import `messages/index.json` from a [Discord data export](https://support.discord.com/hc/en-us/articles/360004957031) to fill comma-separated channel IDs (`@me` + your author ID).

### Advanced reliability

| Setting | Purpose |
|---------|---------|
| Search delay (1–60 s) | Pause between search pages (default 30 s) |
| Delete delay (0.1–10 s) | Pause between deletes (default 1 s) |
| Empty page retries (0–10) | Retry when Discord returns empty pages before stopping (default 2) |
| Confirm before first delete batch | One-time `confirm()` with preview (Careful / Server profiles) |
| Unarchive threads before delete | On archived-thread errors, PATCH unarchive and retry (off by default) |
| **Account token** (sidebar, below Advanced) | Red vault; background auto-fill; gated **Copy** (checkbox + confirm; field stays masked) |

## Configuration reference (sidebar)

| Section | What it controls |
|---------|------------------|
| **Run profile** | Preset bundle of pipeline, delays, server wipe, media options |
| **Target** | Author / server / channel IDs, server-wide wipe, NSFW, autofill, checkpoint banner |
| **Filters** | Content, has link/file, pinned, bot messages, regex, inverse keep rules |
| **Media review** | Scan mode, batch size (interactive pipeline only) |
| **Limits** | Min/max message ID (pick from chat), date range |
| **Bulk archive** | Import `index.json` from Discord export |
| **Session & logs** | Hourly log save/clear, save on stop, pre-count, checkpoint |
| **Advanced** | Delays, empty-page retries, confirm, unarchive |
| **Account token** | Own sidebar section (last item, below Advanced); gated vault, auto-fill, optional Copy |

### Toolbar, fingerprint bar & footer

| Control | Action |
|---------|--------|
| **▶︎ Delete** | Start run; refresh API fingerprint mode |
| **🛑 Stop** | Cancel run (panel can stay open or closed) |
| **Copy log** / **Clear log** | Clipboard export or empty log panel |
| **Privacy mode** | Redact sensitive UI/log content |
| **Fingerprint bar** | **Full** = `X-Super-Properties` + locale/timezone/Referer; **Partial** = reduced headers (deletes may still work) |
| **Progress row** (footer, while running) | Segmented **% (n/total)**, **Elapsed**, **Remaining** (full width) |
| **Auto scroll** | Keep log pinned to the latest line |
| **Verbose log** | More technical lines during run |
| **Log each deletion** | Log every deleted message in the panel |
| **Debug API headers** | Safe `[API debug]` summaries per endpoint (no token/cookie/full SP) |

## Common workflows

### Single channel (e.g. 100k+ messages)

1. **Fast wipe**
2. Fill Target (or autofill)
3. Raise **Empty page retries** under Advanced if the run stops early on empty pages
4. Keep the tab open; optional **Session & logs** hourly save for long runs

### Server-wide cleanup

1. **Server wipe (all channels)** profile
2. Real server ID (not `@me`); **Fill** token if needed
3. Review pre-count → confirm
4. Use **delete delay ≥ 1.5 s**; stop and **Resume** later if needed (checkpoint)

### Save photos, then delete

1. **Review photos & backup**
2. **One** channel ID only
3. Act on each batch in the gallery (backup / delete / skip)

### Multiple channels (manual list)

1. Comma-separated **Channel ID**s, or import **Bulk archive**
2. **Fast wipe** (not interactive media mode)
3. Runs channels sequentially in one batch job

## Tips

> [!TIP]
>
> - **Default for bulk delete:** Fast wipe — no gallery, no extra popups.
> - **Rate limits:** Increase delete delay; the script also auto-increases after 429 responses.
> - **Empty pages mid-run:** Increase **Empty page retries**; Discord’s search index can lag on huge histories.
> - **Screen sharing:** Leave **Privacy mode** on (default).
> - **Closing the panel** hides the UI only — use **Stop** to end deletion.
> - **Field help links** in the UI point to the [original Undiscord wiki](https://github.com/victornpb/undiscord/wiki) for filter semantics Discord documents.

## Why this fork?

| | Original [undiscord](https://github.com/victornpb/undiscord) | Electric Boogaloo |
|---|---|---|
| Maintenance | Stale; many unresolved issues/PRs | Active fixes and UI upkeep |
| Discord UI | Outdated styling / missing toolbar | Current theme + resilient trash button mount |
| Long runs | Often stopped on empty search pages | Empty-page retries, network retry, history scan fallback |
| Server leave | Manual channel ID list | API + DOM channel discovery, pre-count, checkpoint resume |
| Media | Delete only | Optional interactive backup gallery |
| Profiles | One behavior | Fast / Careful / Media / Server / Custom |
| ETA | Basic | Hybrid model + observed throughput |
| Token / API fingerprint | Single method | Chained autofill + client-like request headers |

This repository is **not** affiliated with Discord Inc. or the original Undiscord maintainers.

## Disclaimer

This userscript is **not** affiliated with, endorsed by, or approved by Discord Inc. It uses your authorization token to call `https://discord.com/api/v9/...` the same way the web client does. Discord classifies scripted bulk actions on user accounts as forbidden **self-bot** automation.

You are responsible for compliance with Discord’s [Terms](https://discord.com/terms), [Community Guidelines](https://discord.com/guidelines), and applicable law. The script only deletes messages **your account** is permitted to delete. There is no warranty — see [LICENSE](./LICENSE).

For local data handling (token, logs, checkpoints, downloads), see **[PRIVACY.md](./PRIVACY.md)**.

## Contributing

Issues and pull requests are welcome: [github.com/Levskitron/undiscord2electricboogaloo/issues](https://github.com/Levskitron/undiscord2electricboogaloo/issues).

Click **New issue** to pick a template (deletion problems, UI bugs, questions, features, docs). Templates live in [`.github/ISSUE_TEMPLATE/`](./.github/ISSUE_TEMPLATE/) — see that folder’s README for how they work. **Do not paste your Discord token** in issues; use log excerpts and `[API debug]` lines instead.

When changing behavior, update **README.md**, **PRIVACY.md**, **USER_GUIDE.md** (if user-facing), and the in-script version in the userscript header and `VERSION` constant.

## License

MIT — see [`LICENSE`](./LICENSE).

### Copyright

- Copyright (c) 2019–2025 [Victornpb](https://github.com/victornpb) and contributors — original [Undiscord](https://github.com/victornpb/undiscord)
- Copyright (c) 2026 [Levskitron](https://github.com/Levskitron) — this fork and subsequent changes

### Attribution (required)

Per the MIT license, derivatives must retain attribution to the original project in the **code**, **README**, and **LICENSE**:

> Original project: [https://github.com/victornpb/undiscord](https://github.com/victornpb/undiscord)

The userscript header includes `@attribution` pointing to the upstream repository.

### Community credits

Electric Boogaloo is **not** a word-for-word copy of other Undiscord forks. It reimplements ideas from the community (reliability fixes, media gallery, empty-page retries, server-wide batching) in **this project’s own code**, alongside original UI and features (run profiles, checkpoints, docs).

See **[CREDITS.md](./CREDITS.md)** for the full lineage table and links to [SuicidaI-Idol](https://github.com/SuicidaI-Idol/undiscord), [AerialJustice](https://github.com/AerialJustice/undiscord-fixed-2025), [TheCellMaster](https://github.com/TheCellMaster/undiscord), and upstream Undiscord.
