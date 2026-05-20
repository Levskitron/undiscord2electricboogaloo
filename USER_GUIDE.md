# Undiscord 2: Electric Boogaloo — User Guide

**Who this is for:** Anyone who wants to delete their own messages on Discord — no coding experience required. Developers can use the same guide; technical details are in boxes where helpful.

**Version covered:** 1.3.1 · Script: [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js)

---

## Table of contents

1. [What is this?](#what-is-this)
2. [Important warnings (read first)](#important-warnings-read-first)
3. [What you need](#what-you-need)
4. [Install the tool](#install-the-tool)
5. [Open the tool on Discord](#open-the-tool-on-discord)
6. [The panel — quick tour](#the-panel--quick-tour)
7. [Run profiles (pick your mode)](#run-profiles-pick-your-mode)
8. [Step-by-step: common jobs](#step-by-step-common-jobs)
9. [Every setting explained](#every-setting-explained)
10. [Footer buttons](#footer-buttons)
11. [When something goes wrong](#when-something-goes-wrong)
12. [Privacy in plain English](#privacy-in-plain-english)
13. [Glossary](#glossary)
14. [FAQ](#faq)
15. [More help](#more-help)

---

## What is this?

**Undiscord 2: Electric Boogaloo** is a small add-on (“userscript”) for your **web browser**. When you use Discord in the browser (not the phone app), it adds a **trash can button** and a control panel.

The tool helps you **delete many of your own messages at once** — faster than clicking delete on each message by hand.

**What it does NOT do:**

- It does not delete other people’s messages on purpose.
- It does not run on Discord’s phone app by itself — you need Discord in a **browser** on a computer (or a browser on your phone).
- It is not made or approved by Discord the company.

Think of it as a **helper robot** that finds *your* old messages and asks Discord to remove them, one batch at a time, while you keep the browser tab open.

---

## Important warnings (read first)

### Your Discord account can be banned

Discord’s rules say you are **not allowed to automate a normal user account** (a “self-bot”) the way this tool does. Using it **can get your account suspended or permanently banned**, even if you only delete your own messages.

**You choose to use this at your own risk.** The people who made this tool are not responsible if Discord takes action against your account.

Official Discord links (for adults / guardians to read):

- [Discord Terms of Service](https://discord.com/terms)
- [Automated User Accounts (Self-Bots)](https://support.discord.com/hc/en-us/articles/115002192352-Automated-User-Accounts-Self-Bots)

### Only install from a source you trust

A fake copy of the script could **steal your account**. Install from this project’s official file, or a copy you have checked yourself:

- [Official script on GitHub](https://github.com/Levskitron/undiscord2electricboogaloo/raw/main/undiscord-electric-boogaloo.user.js)

### Author ID is required

If **Author ID** (your user ID) is empty, the tool may search the whole channel and try to delete messages you **cannot** delete. You will see errors like **403** and nothing useful will happen.

Always make sure **Author ID** is filled before you press **Delete**. Click **Me** if it is blank.

---

## What you need

| You need | Why |
|----------|-----|
| A computer or device with a **browser** (Chrome, Edge, Firefox, Brave, etc.) | The script runs inside the browser |
| **Discord open in the browser** at [discord.com/app](https://discord.com/app) | Not the desktop app alone unless it opens the web version |
| A **userscript manager** (add-on for the browser) | This runs the script for you |
| Your Discord account logged in | The tool uses your login like the website does |

**Recommended userscript managers:**

- [Tampermonkey](https://www.tampermonkey.net/) (Chrome, Edge, Firefox, etc.)
- [Violentmonkey](https://violentmonkey.github.io/)

When the manager asks about **GM_download**, say **yes** if you want organized folders for saved photos and log files on your computer. The script only uses that to save files **to your PC**, not to send data to strangers.

---

## Install the tool

### Step 1 — Install Tampermonkey (or similar)

1. Open your browser’s extension store.
2. Search for **Tampermonkey** (or Violentmonkey).
3. Click **Add to browser** / **Install**.
4. Finish any setup screens.

### Step 2 — Install Undiscord Electric Boogaloo

1. Open this link (or ask a trusted adult to open it):  
   [undiscord-electric-boogaloo.user.js](https://github.com/Levskitron/undiscord2electricboogaloo/raw/main/undiscord-electric-boogaloo.user.js)
2. Tampermonkey should show an **Install** screen.
3. Click **Install**.
4. If asked about **GM_download**, allow it (for backups and logs).

**Manual install:** Copy the file from this folder into a new script in Tampermonkey and save.

### Step 3 — Check it works

1. Go to [Discord in the browser](https://discord.com/app).
2. Log in.
3. Open any server and channel.
4. Look for a **trash can** icon near the top of the channel (or a floating trash button if Discord’s layout hides it).

If you see the trash icon, installation worked.

---

## Open the tool on Discord

1. Open the **channel** (or DM) you want to clean — the chat where your messages live.
2. Click the **trash can** icon in the toolbar.  
   - A panel opens on the side.  
   - Click the trash icon again to **hide** the panel — that does **not** stop a job that is already running.
3. If you do not see the trash icon, refresh the page (F5) and wait a few seconds for Discord to load.

**While a delete job is running:** keep the **browser tab open**. You can switch to another tab, but do not close Discord’s tab completely if you want the job to continue.

---

## The panel — quick tour

The panel has two main areas:

### Left side (settings)

Fold-out sections you can open and close:

| Section | What it’s for |
|---------|----------------|
| **Run profile** | Pick the mode: fast delete, careful, photos, whole server, or custom |
| **Target** | *Where* to delete: your user ID, server, channel |
| **Filters** | *Which* of your messages match (text, links, files, etc.) |
| **Media review** | Only for “Review photos & backup” mode |
| **Limits** | Only delete messages before/after a date or message ID |
| **Bulk archive** | Import channel list from a Discord data export file |
| **Session & logs** | Save log files, resume server wipe, count messages first |
| **Advanced** | Speed, delays, token, expert options |

### Bottom (actions and log)

| Button / area | What it does |
|---------------|--------------|
| **▶ Delete** | Start deleting |
| **🛑 Stop** | Stop deleting (use this — closing the panel is not enough) |
| **Log area** | Shows progress, errors, and how many messages were deleted |
| **Copy log / Clear log** | Copy text out or wipe the log window |
| **Privacy mode** | Hides sensitive numbers on screen (good if someone is watching) |

---

## Run profiles (pick your mode)

At the top of the panel, **“What are you doing?”** is the **run profile**. It is like choosing a preset on a washing machine.

Changing random settings after you pick a profile usually switches you to **Custom** — that is normal.

---

### Fast wipe (default) — “Just delete my messages in this chat”

**Best for:** One channel or DM with lots of messages; you want to walk away.

**What happens:**

1. You click **Delete**.
2. It starts **immediately** — no “Are you sure?” popup.
3. It searches for your messages and deletes them in batches.
4. Waits between searches and deletes so Discord does not get angry (rate limits).

**Good for:** Thousands or hundreds of thousands of messages in **one** channel.

**Not good for:** Saving every photo first (use Review photos & backup).

**Analogy:** Robot vacuum — press start and let it run. Keep the tab open.

| Setting (automatic) | Value |
|---------------------|-------|
| Speed | Normal search wait (~30 s), ~1 s between deletes |
| Confirmation popup | No |
| Server-wide | No (one channel unless you typed several IDs) |

---

### Careful wipe — “Go slower and ask me once first”

**Best for:** First time using the tool, or you hit errors / rate limits before.

**What happens:**

1. You click **Delete**.
2. A **browser popup** asks if you are sure and shows a rough preview.
3. Runs **slower** than Fast wipe (longer waits).
4. Retries more times if Discord returns “empty” search pages.

**Analogy:** Same robot vacuum, but it rings the doorbell before starting and moves slower.

| Setting (automatic) | Value |
|---------------------|-------|
| Confirmation popup | Yes, once before the first batch |
| Delays | Slower than Fast wipe |
| Empty page retries | More (4) |

---

### Review photos & backup — “Save pictures/files, then choose what to delete”

**Best for:** Channels where you posted images, videos, or attachments you might want on your computer.

**What happens:**

1. You click **Delete**.
2. Every so often (default: **50 messages**), the tool **pauses**.
3. A **gallery** appears with thumbnails.
4. You select items and press a button, for example:
   - **Backup & keep selected** — download to your PC, do not delete those
   - **Delete all** — remove the whole batch
   - **Skip batch** — leave this batch alone for now
5. You must **stay at the computer** and click through batches.

**Important rules:**

- **One channel only** — do not turn on “All message channels in this server.”
- Not for deleting 100,000 text-only messages — that would take forever. Use **Fast wipe** for that.

**Downloads go to:** `Undiscord_Media/YourName/ServerName/ChannelName/` on your computer (when GM_download works).

**Analogy:** Sorting a photo box before throwing away old papers.

---

### Server wipe (all channels) — “Delete my messages everywhere in this server”

**Best for:** You are leaving a server and want your messages removed from **many channels** (#general, #memes, threads, etc.).

**What happens:**

1. Turns on **“All message channels in this server.”**
2. Finds channels using Discord’s API (and a backup method if that fails).
3. May **count** how many of your messages it finds, then show a **big confirmation** popup.
4. Goes through **each channel one by one**.
5. If you click **Stop**, you can **Resume** later (checkpoint saved in your browser).

**Not good for:**

- Direct messages (DMs) — use `@me` as server ID only for DM workflows, not full server wipe.
- One channel only — **Fast wipe** is simpler.

**Analogy:** Cleaning your stuff out of every room in a house, not just one room.

| Setting (automatic) | Value |
|---------------------|-------|
| All channels | Yes |
| Pre-count + confirm | Yes |
| Checkpoint on stop | Yes |
| Delete delay | Slower (~1.5 s) — do not rush server-wide jobs |

---

### Custom — “I will choose every option myself”

**Best for:** People who already understand the sections below.

**What happens:** Nothing special is preset. You pick **Direct** or **Interactive** pipeline and set delays, filters, and server-wide options yourself.

If you are new, **stay on Fast wipe** until you know what you need.

---

### Which profile should I pick?

| I want to… | Pick this |
|------------|-----------|
| Delete all my messages in **this one chat** | **Fast wipe** |
| Same, but I’m nervous / got errors before | **Careful wipe** |
| **Save photos and files** before deleting | **Review photos & backup** |
| Delete my stuff in **every channel in a server** | **Server wipe** |
| I know exactly what I’m doing | **Custom** |

---

## Step-by-step: common jobs

### Job A — Delete everything I said in one channel (most common)

1. Open Discord in the browser.
2. Click the channel you want to clean.
3. Open the trash panel.
4. **Run profile:** leave **Fast wipe**.
5. **Target:**
   - **Author ID** — must be filled. Click **Me** if empty.
   - **Server ID** — click **Current** (or type `@me` for a DM).
   - **Channel ID** — click **Current**.
   - Leave **“All message channels in this server”** **unchecked**.
6. **Filters:** leave everything empty unless you only want certain messages (see [Filters](#filters)).
7. Click **▶ Delete**.
8. Watch the log. It can take **hours or days** for huge channels.
9. To pause: click **🛑 Stop** (not just close the panel).

**Tip:** If the run stops early saying there are no more messages but you know there are more, open **Advanced** and raise **Empty page retries** to 4 or 6, then run again.

---

### Job B — First time, I want to be careful

Same as Job A, but set **Run profile** to **Careful wipe** and read the confirmation popup before clicking OK.

---

### Job C — Save memes/photos, then delete

1. Open **one** channel.
2. **Run profile:** **Review photos & backup**.
3. Fill **Target** (Author, Server, Channel) — **one** channel ID only.
4. Click **Delete**.
5. When the gallery opens:
   - Click pictures you want to keep.
   - Use **Backup & keep selected** or similar.
   - Use **Delete all** or **Delete selected** when you are ready to remove messages.
6. Repeat for each batch until done.

---

### Job D — Leave a server, delete my messages in all its channels

1. Open **any channel** in that server.
2. **Run profile:** **Server wipe (all channels)**.
3. **Target:**
   - **Author ID** — **Me**.
   - **Server ID** — **Current** (must be a real server ID, not `@me`).
   - You can ignore Channel ID for the list — server wipe finds channels automatically.
4. Optional: under **Session & logs**, leave **Pre-count** and **Checkpoint** on (defaults for this profile).
5. Click **Delete**.
6. Read the pre-count and confirmation — big numbers mean **days** of runtime.
7. Keep the tab open. If you must stop, click **Stop**, then later click **Resume** on the banner under Target.

---

### Job E — Several specific channels (not the whole server)

1. **Run profile:** **Fast wipe** (not Review photos).
2. In **Channel ID**, paste IDs separated by **commas**: `123456789,987654321`
3. Or use **Bulk archive** to import from a Discord export `messages/index.json`.
4. Fill Author and Server, then **Delete**.

---

### Job F — Only delete messages with certain words or links

1. Pick **Fast wipe** or **Careful wipe**.
2. Open **Filters**:
   - **Text contains** — only messages including that word/phrase.
   - **Has link** / **Has file** — only those types.
   - **Regex pattern** — advanced pattern matching (optional).
3. Fill **Target**, then **Delete**.

---

### Job G — Only delete messages from a certain date range

1. Open **Limits**.
2. Use **Start date** / **End date** (not both with message ID limits at the same time).
3. Fill **Target**, pick profile, **Delete**.

---

## Every setting explained

### Target

| Setting | Simple explanation |
|---------|-------------------|
| **Author ID** | Your Discord user number. Tells the tool “only **my** messages.” **Required.** |
| **Server ID** | The server (guild) the channel belongs to. Use `@me` for direct messages. |
| **Channel ID** | The specific chat. Comma = several channels in one run. |
| **Me** button | Fills your Author ID from your logged-in account. |
| **Current** buttons | Fills Server and/or Channel from the chat you are looking at now. |
| **All message channels in this server** | Server wipe: every text channel + threads the tool can find. |
| **Include NSFW channels** | For server search only — include age-restricted channels. |
| **Auto-fill IDs when I change channel** | When you click another channel in Discord, the form updates (recommended on). |
| **Resume / Discard** | Appears if you stopped a server wipe — continue or throw away saved progress. |

---

### Filters

| Setting | Simple explanation |
|---------|-------------------|
| **Text contains** | Only delete messages that include this text. |
| **Has link** | Only messages with a link. |
| **Has file** | Only messages with an attachment. |
| **Delete pinned messages** | If **on**, pinned messages can be deleted too. If **off**, pins are skipped. |
| **Include bot / app messages** | Usually leave **off** — deleting bot messages often fails. |
| **Regex pattern** | Advanced: only messages matching a pattern. |
| **Keep messages (inverse)** | Checked = **do not delete** those (e.g. keep all messages with links, delete the rest). |

---

### Media review

(Only for **Review photos & backup** or Custom → Interactive.)

| Setting | Simple explanation |
|---------|-------------------|
| **Media only** | Gallery shows messages that have attachments. |
| **All messages** | Every message in the batch can appear in the gallery. |
| **Batch size** | How many messages to load before pausing for you (5–100). |

**Gallery buttons (short guide):**

| Button | Meaning |
|--------|---------|
| **Select all** | Highlight everything in the batch |
| **Keep selected** | Do not delete selected; delete the rest |
| **Backup & keep selected** | Download selected, do not delete them |
| **Skip batch** | Do not delete anything this round |
| **Delete all** | Delete every message in the batch |
| **Abort** | Stop the whole run |

---

### Limits

| Setting | Simple explanation |
|---------|-------------------|
| **After message / Before message** | Only delete messages newer or older than a specific message ID. **Pick** reads from chat. |
| **Start date / End date** | Only delete in that date range. |

Do not mix message ID limits and date limits in ways that confuse you — use one approach at a time unless you know what you are doing.

---

### Bulk archive

For people who requested a **copy of their Discord data**:

1. Unzip Discord’s export.
2. Click import and choose `messages/index.json`.
3. The tool fills channel IDs and sets DM server to `@me`.

See Discord’s guide: [Requesting all of your data](https://support.discord.com/hc/en-us/articles/360004957031).

---

### Session & logs

| Setting | Simple explanation |
|---------|-------------------|
| **Auto-save & clear log hourly** | Every hour, save the log to `Undiscord_Logs/` and clear the on-screen log. |
| **Auto-save log on stop / finish** | When the run ends or you stop, save a log file. |
| **Messages only in saved logs** | Saved files contain less technical detail. |
| **Auto-clear log hourly (no save)** | Wipe the log display every hour without saving. |
| **Pre-count before server wipe** | Count your messages per channel before starting (recommended). |
| **Save checkpoint (resume later)** | Remember which channels are left after **Stop** on server wipe. |

---

### Advanced

| Setting | Simple explanation |
|---------|-------------------|
| **Search delay** | Seconds to wait between searching for the next page of messages (default 30). |
| **Delete delay** | Seconds between each single delete (default 1). Raise if you get rate limited. |
| **Empty page retries** | How many times to retry when search says “nothing found” but you expect more (default 2). |
| **Confirm before first delete batch** | One “Are you sure?” popup with preview. |
| **Unarchive threads before delete** | Try to unarchive old threads so messages inside can be deleted. |
| **Token → Fill** | Lets the tool read your login token from Discord (like the website uses). Only needed if delete fails with auth errors. |

> **Token warning:** Your token is like a password for your account. Never share it. Use **Privacy mode** if someone can see your screen.

---

## Footer buttons

| Control | What it does |
|---------|--------------|
| **▶ Delete** | Starts the run |
| **🛑 Stop** | Cancels the run — use this to actually stop |
| **Copy log** | Copies the log text to clipboard |
| **Clear log** | Empties the log window |
| **Privacy mode** | Masks IDs and sensitive text in the form and log |
| **Auto scroll** | Log follows new lines automatically |
| **Verbose log** | More technical details in the log |
| **Log each deletion** | Writes every single deleted message in the log (very long on big jobs) |

---

## When something goes wrong

### “Author ID is required” or deletes fail with 403

- Click **Me** under Author ID.
- Make sure you are logged into the **same** Discord account in the browser.
- Do not start until Author ID is filled.

### “Rate limited” or everything is slow / HTTP 429

- Discord is telling you to slow down.
- Wait — the tool increases delays automatically.
- Open **Advanced** and raise **Delete delay** (try 2–3 seconds or more).
- Use **Careful wipe** next time.

### Run stopped but I still have thousands of messages left

- Discord’s search index can lag on huge channels.
- Increase **Empty page retries** (try 4–6) in **Advanced**.
- Run **Delete** again — it will continue searching.

### I closed the panel but it’s still deleting

- That is normal. Closing the panel only **hides** the window.
- Click **🛑 Stop** to cancel, or reopen the trash icon to watch the log.

### I closed the browser tab

- The run **stops**. Open Discord again and start over (or **Resume** if server wipe checkpoint exists).

### Server wipe — “cannot use interactive media review”

- You picked photo review together with all channels. Use **Fast wipe** or **Server wipe** instead.

### Nothing happens when I click Delete

- Check Author ID, Server ID, and Channel ID.
- For server wipe, Server ID must not be `@me`.
- Open **Advanced → Token → Fill** if you see authorization errors in the log.

### Errors on other people’s messages (wrong author)

- Almost always means **Author ID** was wrong or empty. Fix Author ID before running again.

---

## Privacy in plain English

- The script runs **only in your browser** on Discord’s website.
- It talks to **Discord’s servers** to search and delete — not to this GitHub project’s servers (there are none).
- Your **token** stays on your computer and is sent to **discord.com** only, like the normal website.
- Optional **log files** and **photo backups** are saved **on your computer** only.
- **Server wipe resume** data is stored in your browser’s **local storage** until you resume or discard.

Full details: **[PRIVACY.md](./PRIVACY.md)**

---

## Glossary

| Word | Meaning |
|------|---------|
| **Channel** | A text chat (#general, a DM, a thread). |
| **Server / Guild** | A Discord community with many channels. |
| **Author ID** | Your numeric user ID on Discord. |
| **Server ID / Guild ID** | The numeric ID of a server. |
| **Channel ID** | The numeric ID of one chat. |
| **DM** | Direct message — private chat between users. Use `@me` as server ID. |
| **Userscript** | A small program your browser runs on specific websites. |
| **Run profile** | Preset mode: Fast, Careful, Photos, Server, Custom. |
| **Pipeline** | **Direct** = automatic delete; **Interactive** = pause for gallery. |
| **Rate limit** | Discord slowing you down because there were too many requests. |
| **403** | “Not allowed” — often trying to delete someone else’s message. |
| **Checkpoint** | Saved list of channels left to do after you stopped a server wipe. |
| **GM_download** | Tampermonkey feature to save files into folders on your PC. |

---

## FAQ

**Is this official Discord?**  
No. It is a community tool. Discord can ban accounts for using it.

**Will it delete my friends’ messages?**  
Not if **Author ID** is correct — it targets **your** messages only.

**Can I use it on my phone?**  
Only if you use a **mobile browser** with a userscript manager that supports Discord’s website. The Discord phone app alone does not run this script.

**How long will 100,000 messages take?**  
Often many hours or multiple days. Depends on delays and rate limits. The log shows an estimated time remaining (ETA).

**Can I undo?**  
**No.** Deleted messages are gone. Use **Review photos & backup** or export data first if you might regret it.

**Does closing the trash panel stop deletion?**  
**No.** Use **Stop**.

**What’s the difference between README and this guide?**  
**README** is a project overview for GitHub. **This guide** is for humans using the tool day to day.

---

## More help

| Resource | Link |
|----------|------|
| Project README (features & install) | [README.md](./README.md) |
| Privacy & security | [PRIVACY.md](./PRIVACY.md) |
| Original Undiscord wiki (filter help links in UI) | [github.com/victornpb/undiscord/wiki](https://github.com/victornpb/undiscord/wiki) |
| Report bugs | [GitHub Issues](https://github.com/Levskitron/undiscord2electricboogaloo/issues) |

---

**Original project:** [Undiscord by Victornpb](https://github.com/victornpb/undiscord)  
**This fork:** [Levskitron / undiscord2electricboogaloo](https://github.com/Levskitron/undiscord2electricboogaloo)

*You are responsible for how you use this tool. When in doubt, stop with **🛑 Stop**, read the log, and fix **Author ID** and **Target** before trying again.*
