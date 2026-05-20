# Privacy & security

**Undiscord 2: Electric Boogaloo** (v1.3.0) is a client-side userscript. It runs entirely in your browser on `discord.com`. There is no backend, no account system, and no analytics operated by this project.

This document explains what the script does with your data so you can decide whether you are comfortable using it.

> [!IMPORTANT]
> **Read the source before you run this.** Open source is not automatic trust. Audit [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js) yourself (or have someone you trust review it) so you know exactly what it does on your machine.

> [!CAUTION]
> **Account risk is separate from privacy.** Even when this project never sees your data, using the script can still get your Discord account **suspended or terminated** for self-bot / automation policy violations. See the **[README caution](./README.md)** for Discord’s official policy links.

## Summary

| Question | Answer |
|----------|--------|
| Does this project collect or store your messages on our servers? | **No.** We do not operate servers that receive your data. |
| Does it send your token or messages to Levskitron or third parties? | **No.** API traffic goes to **`discord.com` only** for search/delete (and attachment URLs for optional local backup). |
| Does it install malware or modify unrelated sites? | **No.** It only runs on Discord (`@match https://*.discord.com/*`). |
| Who can see what you delete? | **You**, on your machine. Deletion is between your browser and Discord. |
| What should you do before trusting it? | **Read the source**, install from this repository, use a reputable userscript manager. |

## How it works (data flow)

1. **You** open Discord in the browser and run the userscript via Tampermonkey, Violentmonkey, or similar.
2. The script builds a UI overlay. Settings you enter (IDs, filters, delays) stay in page memory for that session; some data may persist in **browser `localStorage`** (see below).
3. To delete messages, the script calls Discord’s API (`https://discord.com/api/v9/...`) with a **Bearer token** — the same authorization model the Discord web app uses.
4. Search and delete use the browser’s `fetch()`. Responses are handled in your tab and shown in the in-panel log.

Nothing in this flow uploads your chat history, token, or files to this GitHub project, because **this project does not run a service**.

## Userscript permissions (`@grant`)

The script header requests:

```text
@grant GM_download
```

**What that is used for (and only for):**

- Saving **log exports** to your disk as `Undiscord_Logs/*.txt` (hourly auto-save and/or save on stop).
- Saving **media backups** during interactive review to `Undiscord_Media/...` on your disk.

`GM_download` is provided by your userscript manager. Downloads use `blob:` URLs or Discord attachment URLs as the source; they are **not** sent to Levskitron or a third-party host. If `GM_download` is unavailable, the script falls back to a normal browser `<a download>` click.

**What is not requested:** `GM_xmlhttpRequest` to arbitrary domains, clipboard APIs, or cross-origin requests bypassing the browser — core search/delete still use `fetch()` to `discord.com` from the page context.

## What the script stores locally

### Discord authorization token

> [!CAUTION]
> **Your token is full account access.** Anyone who obtains it can act as you on Discord’s API. Never paste it into untrusted sites, share screenshots with Privacy mode off, or install a repackaged script you have not audited.

- Needed to search and delete on your behalf.
- **Fill** tries, in order: Discord `localStorage` (via a same-origin iframe), webpack module scan, classic webpack chunk push, then a short-lived **page-context script** that posts the token back via `window.postMessage` (no network; only if earlier methods fail).
- You may paste a token manually under **Advanced → Token**.
- The token is sent in the `Authorization` header to **`discord.com` only** — not to this repository.
- **We do not log, copy, or transmit your token to our servers** (we have none).

### Checkpoint resume (server wipe)

If **Save checkpoint (resume later)** is enabled and you stop during a **server-wide** batch run, the script may write to **`localStorage`** key `undiscord_eb_checkpoint_v1`:

- Server ID, author ID, filter settings (content, has link/file, etc.)
- List of **remaining channel IDs** and display names
- Progress metadata (how many channels finished)

**Not stored in the checkpoint:** your auth token, message bodies, or log text.

Checkpoints stay on **your device** in that browser profile until you resume, discard, or complete the batch. Use **Discard** in the panel to remove them.

### Userscript manager storage

Your manager may persist script settings or the script file itself. That is governed by the manager, not this project.

## What the script accesses during a run (and why)

### Message content and metadata

- Discord’s API returns message data (IDs, authors, content, timestamps, attachments) so the script can filter and delete.
- Used **only in your browser** for deletion, logging, and optional gallery preview.
- **Not** batch-uploaded to us or embedded in external analytics.

### Discord data export (`index.json`)

- **Bulk archive** import reads a file **you choose** from disk. Parsing is local to fill channel IDs.
- The file is **not** uploaded by this script to any non-Discord host.

### In-panel log

- Log lines are DOM text in the Undiscord window for that session.
- **Copy log** puts text on your clipboard only when you click it.
- Optional exports write a `.txt` file **locally** (see `GM_download` above).
- **Privacy mode** redacts sensitive fragments in the form and log (display only; not encryption).

### Media backup (interactive mode)

- Attachment URLs are fetched or downloaded **to your machine** when you choose backup actions.
- Paths are organized under `Undiscord_Media/`; Discord hosts the file bytes, not this project.

## What we do **not** do

- **No data harvesting** for the maintainer’s benefit.
- **No third-party analytics** (no telemetry URLs in the deletion path).
- **No requests to non-Discord hosts for core delete/search** — help links point to GitHub/wiki for docs; opening them is optional.
- **No unrelated site injection** — does not run on non-Discord URLs matched by the script header.
- **No executable downloads** beyond text logs and media you explicitly back up.

## Your relationship with Discord

- Deletion is **your action** through **your account** and **your filters**.
- Discord may log API usage, apply rate limits, and enforce the [Terms of Service](https://discord.com/terms).
- The tool targets messages your account is allowed to delete (typically your own). **Include bot / app messages** is off by default because deleting bot posts often fails with permission errors.

## Auditing the code yourself

Single file: [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js).

Quick checks:

1. **Header** — `@match` limited to `discord.com`; `@grant GM_download` only.
2. **Network** — search for `fetch(`; deletion/search should target `https://discord.com/api/v9/`.
3. **No hidden telemetry** — no unknown domains in the core loop.
4. **Token** — `getToken()` / `fillToken()`; no `fetch` of the token to third parties.
5. **Downloads** — `GM_download` / `saveLogToFile` use local blob URLs or Discord CDN attachment URLs.
6. **Checkpoint** — `localStorage` key `undiscord_eb_checkpoint_v1`; inspect `saveCheckpoint` / `loadCheckpoint`.

If a fork or mirror differs, diff it against this repository before trusting it.

## Userscript managers and supply chain

> [!WARNING]
> **A malicious fork only needs one changed line** to exfiltrate your token. Install from this repository (or a fork you have diffed), and **review manager updates** before accepting them.

- Prefer the raw file from [this repo](https://github.com/Levskitron/undiscord2electricboogaloo) or a release you verified.
- Auto-update can silently replace the script — disable or review updates if you need reproducibility.

## Maintainer stance

We provide a tool for **you** to delete **your** messages (or whatever you are allowed to delete). We are not interested in your chat logs, token, or identity beyond normal open-source collaboration (e.g. GitHub issues you choose to open).

If you find code that contradicts this document, please [open an issue](https://github.com/Levskitron/undiscord2electricboogaloo/issues) with details.

## Related

- [USER_GUIDE.md](./USER_GUIDE.md) — plain-language walkthrough for everyone  
- [README.md](./README.md) — installation, run profiles, configuration, usage  
- [LICENSE](./LICENSE) — MIT license and attribution  
