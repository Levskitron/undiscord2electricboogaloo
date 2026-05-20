# Privacy & security

**Undiscord 2: Electric Boogaloo** is a client-side userscript. It runs entirely in your browser on `discord.com`. There is no backend, no account system, and no analytics service operated by this project.

This document explains what the script does with your data so you can decide whether you are comfortable using it. **We strongly encourage you to read and audit [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js) yourself** (or have someone you trust review it) before installing or running it. Open source is not automatic trust — verification is your responsibility.

## Summary

| Question | Answer |
|----------|--------|
| Does this project collect or store your messages on our servers? | **No.** We do not operate servers that receive your data. |
| Does it send your token or messages to Levskitron or third parties? | **No.** Network requests go only to **Discord’s API** (`discord.com`), same as the normal web client. |
| Does it install malware or modify unrelated sites? | **No.** It only runs on Discord URLs (`@match https://*.discord.com/*`) and uses `@grant none` (no extra userscript-manager privileges). |
| Who can see what you delete? | **You**, on your machine. Deletion is between your browser and Discord. |
| What should you do before trusting it? | **Read the source**, install from this repository, and use a reputable userscript manager. |

## How it works (data flow)

1. **You** open Discord in the browser and run the userscript via Tampermonkey, Violentmonkey, or similar.
2. The script builds a small UI overlay on the page. Settings you enter (IDs, filters, delays) stay in the page memory for that session unless your manager persists them locally.
3. To delete messages, the script calls Discord’s **official HTTP API** (`https://discord.com/api/v9/...`) with a **Bearer token** — the same kind of authorization the Discord web app already uses.
4. Search and delete requests are made with the browser’s built-in `fetch()`. Responses are handled in your tab; results are shown in the in-panel log.

Nothing in this flow uploads your chat history, token, or files to this GitHub project or any other service we run, because **this project does not run a service**.

## What the script accesses (and why)

### Discord authorization token

- The script needs a token to call the API on your behalf (search messages, delete messages you are allowed to delete).
- By default it tries to read the token Discord already stored in **your browser’s** `localStorage` (the same origin as `discord.com`), or you can paste one into the **Token** field.
- The token **never leaves your machine** except when sent in the `Authorization` header to **`discord.com`** — exactly like the normal Discord client.
- **We do not log, copy, or transmit your token to this repository or any third-party server.**

Treat your token like a password. Anyone with it can act as your account on the API. Do not share screenshots of the form with Privacy mode off.

### Message content and metadata

- During a run, the script receives message data from Discord’s API (IDs, authors, content, timestamps, etc.) so it can filter and delete.
- That data is used **only in your browser** to drive deletion and optional on-screen logging.
- It is **not** batch-uploaded to us or embedded in external analytics.

### Discord data export (`index.json`)

- If you use **Bulk archive** import, you choose a file from your computer. Parsing happens locally in the browser to fill channel IDs.
- That file is **not** sent to us or any non-Discord host by this script.

### In-panel log

- Log lines are appended to a `<div>` in the Undiscord window on the page.
- They exist only in your browser session unless you copy them yourself.
- **Privacy mode** masks sensitive fields in the form and redacts message text, usernames, and IDs in the log (including lines already written). It is a display feature, not encryption.

## What we do **not** do

- **No data harvesting** — no collection of messages, contacts, servers, or tokens for the maintainer’s benefit.
- **No third-party tracking** — no Google Analytics, no ad pixels, no “phone home” URL in the script.
- **No `@grant` beyond `none`** — the userscript does not ask your manager for cross-origin `GM_xmlhttpRequest`, clipboard access, or other elevated APIs by default.
- **No requests to non-Discord hosts for core functionality** — deletion and search do not depend on Levskitron’s servers (there aren’t any). Links in the UI point to GitHub/wiki for help and attribution only; using the tool does not require opening them.
- **No virus or unrelated injection** — the script does not replace Discord’s login page, scrape other websites, or download executables.

## Your relationship with Discord

- All deletion is **your action** through **your account**, using **your filters**.
- Discord may log API usage, apply rate limits, and enforce the [Terms of Service](https://discord.com/terms). That is between you and Discord, not this repository.
- This tool only deletes messages you have permission to delete (typically your own). It does not grant access to other people’s private data beyond what Discord’s API already exposes to your account.

## Auditing the code yourself

This project ships as a **single readable userscript**: [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js).

Things you can verify quickly:

1. **Header** — `@grant none` and `@match` limited to `discord.com`.
2. **Network** — search for `fetch(`; calls should target `https://discord.com/api/v9/...` only.
3. **No hidden endpoints** — no `analytics`, `telemetry`, or unknown domains in the deletion path.
4. **Token** — `fillToken()` reads from Discord’s local storage in-page; it is not posted to GitHub.

If anything in a fork or repackaged copy differs, treat that copy as untrusted until you diff it against this repository.

## Userscript managers and supply chain

- Install from a source you trust (ideally this repo’s raw file or a release you compared to `main`).
- Your userscript manager can update scripts automatically — review updates before accepting them if you care about reproducibility.
- Managers may store script settings locally; that storage is governed by the manager, not this project.

## Maintainer stance

We provide a tool for **you** to delete **your** messages (or whatever you are allowed to delete). What you run, what you filter, and what you remove is **your business**. We are not interested in your chat logs, your token, or your identity beyond normal open-source collaboration (e.g. GitHub issues you choose to open).

If you find code that contradicts this document, please [open an issue](https://github.com/Levskitron/undiscord2electricboogaloo/issues) with details so it can be fixed or explained.

## Related

- [README.md](./README.md) — installation, usage, and Discord ToS warning  
- [LICENSE](./LICENSE) — MIT license and attribution  
