# Undiscord 2: Electric Boogaloo

> [!WARNING]
> **This script violates Discord’s [Terms of Service](https://discord.com/terms).** Using it automates actions against Discord’s API in ways Discord does not permit. **Your account may be banned** — temporarily or permanently. Use this script only if you accept that risk, and proceed with **extreme caution**.

An overhauled, maintained fork of [Undiscord](https://github.com/victornpb/undiscord) — a userscript that bulk-deletes your own messages on Discord via the web client.

The original Undiscord project has been largely inactive for months, with [dozens of open issues and pull requests](https://github.com/victornpb/undiscord/issues) and a UI that no longer matches Discord’s current layout. **Undiscord 2: Electric Boogaloo** keeps the same core workflow while fixing styling, toolbar integration, and the kinds of papercuts that piled up upstream.

## Privacy

This script runs **only in your browser** on Discord. It does not send your messages, token, or chat history to us or any third-party service — network traffic for deletion goes to **Discord’s API** only.

We still want you to be comfortable before you run it:

- Read **[PRIVACY.md](./PRIVACY.md)** for a plain breakdown of what the script touches and what it does *not* do (no harvesting, no token stealing, no malware).
- **Audit the source** yourself: everything lives in one file, [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js). We encourage going through it piece by piece until you are satisfied.

What you delete, and what filters you use, is **your business**. This project is a tool you operate locally — not a service that collects your data.

## Features

- **Bulk message deletion** — search and delete your messages in a server channel or DM, with progress and time estimates.
- **Rich filtering** — text search, `has: link` / `has: file`, regex patterns, pinned messages, message ID ranges, and date ranges.
- **Batch jobs** — comma-separated channel IDs, or import `messages/index.json` from a [Discord data export](https://support.discord.com/hc/en-us/articles/360004957031) to wipe many channels at once.
- **Rate-limit aware** — adjusts search and delete delays when Discord throttles requests; configurable empty-page retries for long runs.
- **Modern UI** — Discord-dark theme, draggable/resizable window, sidebar sections, in-panel logging, and privacy mode to mask sensitive fields and log lines.
- **Up-to-date Discord integration** — toolbar button with resilient mount and re-attach when the client re-renders.

## Requirements

- A Chromium- or Firefox-based browser
- A userscript manager, such as:
  - [Tampermonkey](https://www.tampermonkey.net/)
  - [Violentmonkey](https://violentmonkey.github.io/)
  - [Greasemonkey](https://www.greasespot.net/) (Firefox)

## Installation

1. Install a userscript manager in your browser.
2. Open the raw userscript file:
   - [`undiscord-electric-boogaloo.user.js`](https://github.com/Levskitron/undiscord2electricboogaloo/raw/main/undiscord-electric-boogaloo.user.js)
3. Your manager should prompt you to install the script. Confirm.
4. Open [Discord](https://discord.com/app) in the browser (not the desktop app’s embedded browser, unless your manager supports it there).
5. Look for the trash-can icon in the channel toolbar and click it to open the Undiscord panel.

### Manual install

Copy the contents of [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js) into a new userscript in your manager, save, and reload Discord.

## Usage

1. Navigate to the server or DM whose messages you want to clean up.
2. Open the Undiscord panel from the toolbar button.
3. Fill in **Author ID** (use **Me**), **Server ID** (**Current**), and **Channel ID** (**Current**), or set them manually.
4. Optionally configure filters, limits, **Bulk archive** import, or **Advanced** timing and retries.
5. Click **Delete** and confirm the estimated count. Use **Stop** to cancel.

For field-by-field help, the in-app links point to the [original Undiscord wiki](https://github.com/victornpb/undiscord/wiki).

### Tips

- Start with conservative **search** and **delete** delays if you hit rate limits; the script will increase delays automatically when throttled.
- For very large jobs, raise **Empty page retries** (Advanced) if the run stops early while matches remain.
- Use **Privacy mode** before sharing your screen — it masks tokens, IDs, and deletion log content (toggle anytime).
- Deleting large histories can take a long time; keep the Discord tab open until the run finishes.

## Why this fork?

| | Original [undiscord](https://github.com/victornpb/undiscord) | This project |
|---|---|---|
| Maintenance | Stale; many unresolved issues/PRs | Active fixes and UI upkeep |
| Discord UI | Broken/outdated styling and layout | Theme aligned with current Discord |
| Toolbar button | Often missing after Discord updates | Resilient mount + observer re-attach |
| Long runs | Often stopped on transient empty search pages | Configurable empty-page retries |

This repository is not affiliated with Discord Inc. or the original Undiscord maintainers.

## Disclaimer

Using automation against Discord’s API may violate the [Discord Terms of Service](https://discord.com/terms). You are responsible for how you use this script. It only deletes messages **you** have permission to delete (typically your own). There is no warranty — see the license below.

For how data is handled in the browser, see **[PRIVACY.md](./PRIVACY.md)**.

## Contributing

Issues and pull requests are welcome on [GitHub](https://github.com/Levskitron/undiscord2electricboogaloo/issues).

## License

This project is licensed under the **MIT License**. See [`LICENSE`](./LICENSE).

### Copyright

- Copyright (c) 2019–2025 [Victornpb](https://github.com/victornpb) and contributors — original [Undiscord](https://github.com/victornpb/undiscord) project
- Copyright (c) 2026 [Levskitron](https://github.com/Levskitron) — this fork and subsequent changes

### Attribution (required)

Per the license, derivatives must retain attribution to the original project in the **code**, **README**, and **LICENSE**:

> Original project: [https://github.com/victornpb/undiscord](https://github.com/victornpb/undiscord)

The userscript header also includes `@attribution` pointing to the upstream repository.

### MIT notice

Permission is granted to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, subject to the conditions in [`LICENSE`](./LICENSE), including that the above copyright notice and permission notice appear in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND.
