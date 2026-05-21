# Undiscord 2: Electric Boogaloo — User Guide

**Who this is for:** Anyone who wants to delete their own messages on Discord — no coding experience required. Developers can use the same guide; technical details are in boxes where helpful.

**Version covered:** 1.3.1 · Script: [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js)

> [!CAUTION]
> **Using this tool can get your Discord account suspended or permanently banned.** It automates your normal user account (what Discord calls a “self-bot”) — not an official bot. That breaks Discord’s rules even when you only delete **your own** messages.
>
> Discord may act **with or without warning**. You are solely responsible if you use this script. Read [Important warnings](#important-warnings-read-first) before installing or clicking **Delete**.

---

## Table of contents

1. [What is this?](#what-is-this)
2. [How long will this take? (be realistic)](#how-long-will-this-take-be-realistic)
3. [Important warnings (read first)](#important-warnings-read-first)
4. [What you need](#what-you-need)
5. [Install the tool](#install-the-tool)
6. [Open the tool on Discord](#open-the-tool-on-discord)
7. [The panel — quick tour](#the-panel--quick-tour)
8. [Run profiles (pick your mode)](#run-profiles-pick-your-mode)
9. [Step-by-step: common jobs](#step-by-step-common-jobs)
10. [Every setting explained](#every-setting-explained)
11. [Footer buttons](#footer-buttons)
12. [When something goes wrong](#when-something-goes-wrong)
13. [Privacy in plain English](#privacy-in-plain-english)
14. [Glossary](#glossary)
15. [Where did this tool come from?](#where-did-this-tool-come-from)
16. [FAQ](#faq)
17. [More help](#more-help)

---

## What is this?

**Undiscord 2: Electric Boogaloo** is a small add-on (“userscript”) for your **web browser**. When you use Discord in the browser (not the phone app), it adds a **trash can button** and a control panel.

The tool helps you **delete many of your own messages at once** — faster than clicking delete on each message by hand.

**What it does NOT do:**

- It does not delete other people’s messages on purpose.
- It does not run on Discord’s phone app by itself — you need Discord in a **browser** on a computer (or a browser on your phone).
- It is not made or approved by Discord the company.

Think of it as a **helper robot** that finds *your* old messages and asks Discord to remove them, one batch at a time, while you keep the browser tab open.

> [!IMPORTANT]
> **This is not made or approved by Discord.** Discord’s normal website does not offer bulk delete. If something goes wrong with your account, Discord support will not treat this as an official feature.

---

## How long will this take? (be realistic)

Bulk delete is **tedious and slow** on every tool like this — including this one. There is no magic “delete my whole history in five minutes” button. Discord only lets you remove messages **one at a time through the API**, with **waits** between searches and deletes so you do not overwhelm their servers.

> [!IMPORTANT]
> **Plan for hours, not minutes.** For most real cleanups you should expect the browser tab to stay open and the tool to run for a long time. That is normal, not a sign that something is broken.

### Rough guide (your mileage will vary)

| How many of **your** messages (approx.) | What to expect |
|----------------------------------------|----------------|
| A few hundred | Often **under an hour**, still not instant |
| A few thousand | Commonly **several hours** |
| **10,000+** | Very often **a full day or more** |
| Tens or hundreds of thousands | **Days** are common; **weeks** are possible on server-wide wipes or many channels |

The log may show an **estimated time remaining (ETA)**. Treat it as a rough guess — Discord rate limits, empty search pages, and your settings will change the real finish time.

### Why it cannot go much faster

1. **Discord throttles you** — If you delete or search too quickly, you get **rate limited** (HTTP 429). The tool then waits longer. Fighting that by cranking speeds down only makes limits worse.
2. **Built-in delays** — Even **Fast wipe** waits between search pages (~30 seconds) and between each delete (~1 second). Those pauses add up: thousands of messages means thousands of seconds minimum, before counting search time and retries.
3. **More messages = more time, full stop** — The biggest factor is simply **how many messages you have**. No profile avoids that math.

### Speed vs risk (settings matter, but only so much)

You can change **Search delay** and **Delete delay** under **Advanced** (or pick **Careful wipe** / **Fast wipe** presets):

| If you… | What usually happens |
|---------|----------------------|
| Use **slower** delays (Careful wipe, higher delete delay) | Longer total time, often fewer rate limits and less stress on your account |
| Use **faster** delays (lower numbers in Advanced) | Shorter time *if* Discord allows it — but **more rate limits**, more errors, and **more risk** to your account |

> [!WARNING]
> **Faster settings do not make bulk delete “safe.”** They only trade time for risk. Even at the **fastest** settings this tool offers, a very large history is **unlikely to finish in less than a day**:
>
> - **10,000+ messages** — plan for **at least ~24 hours** in many cases; often longer if rate limited  
> - **100,000+ messages** — think **days**  
> - **Server wipe** across many channels — think **days to weeks**

There is no responsible way to promise “done tonight” for huge archives. If someone claims their Undiscord fork deletes hundreds of thousands of messages in an hour, they are not describing how Discord’s limits work in practice.

### What you should do in real life

- Pick a time when your computer can stay on and the **Discord tab can stay open** (or use **checkpoint resume** on server wipe if you must stop).
- Use **Session & logs** options if you want a record of a multi-day run.
- Click **Stop** when you need a break; you can often run **Delete** again later (or **Resume** a server wipe).
- Do **not** expect to babysit a 200,000-message channel in one sitting unless you are using **Review photos & backup** (that mode is even slower because *you* click through every batch).

> [!TIP]
> **Smaller scope = less waiting.** One channel, a date range, or a text filter deletes fewer messages and finishes sooner — but only if that matches what you actually want gone.

---

## Important warnings (read first)

> [!CAUTION]
> **Account termination**
>
> Discord forbids automating normal user accounts outside the official bot system. Bulk deletion through this script is **self-bot automation**. Discord’s policies include:
>
> - **[Terms of Service](https://discord.com/terms)** — you must not use unauthorized automation, scraping tools, or software that modifies the service (see *Restrictions on your use of Discord’s services*).
> - **[Automated User Accounts (Self-Bots)](https://support.discord.com/hc/en-us/articles/115002192352-Automated-User-Accounts-Self-Bots)** — automating a user account can result in **account termination**.
> - **[Developer Terms](https://discord.com/developers/docs/legal)** — this tool is not a registered Discord application using OAuth2.
>
> **You choose to use this at your own risk.** The maintainers of this project are not responsible if Discord suspends or bans your account.

> [!WARNING]
> **Install only from a source you trust**
>
> A modified copy of the script can **steal your login token** and take over your account, or delete the wrong things. Prefer the official file:
>
> - [undiscord-electric-boogaloo.user.js (official raw link)](https://github.com/Levskitron/undiscord2electricboogaloo/raw/main/undiscord-electric-boogaloo.user.js)
>
> If your userscript manager **auto-updates** scripts, review updates before accepting them — a bad update has the same risk as a bad download.

> [!CAUTION]
> **Deletion is permanent**
>
> There is **no undo**. Messages removed through Discord’s API are gone. If you might regret it, use **Review photos & backup**, export your [Discord data](https://support.discord.com/hc/en-us/articles/360004957031), or run a small test channel first.

> [!IMPORTANT]
> **Author ID is required before every run**
>
> If **Author ID** is empty, the tool may search the whole channel and attempt to delete messages you **do not own**. You will see **403** errors, wasted time, and risk stressing Discord’s API for no benefit.
>
> Always confirm **Author ID** is filled, then click **Me** if it is blank. The script blocks starting without it, but double-check anyway.

> [!WARNING]
> **Read the source if you can**
>
> Open source is not automatic safety. Before trusting any userscript, skim [`undiscord-electric-boogaloo.user.js`](./undiscord-electric-boogaloo.user.js) (or ask someone technical you trust). See **[PRIVACY.md](./PRIVACY.md)** for what it stores and where it sends data.

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
- [Violentmonkey](https://violentmonkey.github.io/) (Firefox-friendly; recommended if Tampermonkey acts odd)
- [Greasemonkey](https://www.greasespot.net/) (Firefox)

When the manager asks for permissions, allow **GM_download** (save logs/media to folders), **unsafeWindow**, and **GM_addElement** if offered — the last two help token autofill and client-style API headers in your Discord tab. After an update, re-open the script’s permission screen if **Fill** or delete fails with auth errors.

> [!IMPORTANT]
> **GM_download** is only used to save log and media files **onto your computer**. It is not used to upload your messages or token to this GitHub project or other third parties. Core delete/search still talks to **discord.com** only.

---

## Install the tool

### Step 1 — Install Tampermonkey (or similar)

1. Open your browser’s extension store.
2. Search for **Tampermonkey** (or Violentmonkey).
3. Click **Add to browser** / **Install**.
4. Finish any setup screens.

### Step 2 — Install Undiscord Electric Boogaloo

> [!WARNING]
> Do not install “Undiscord fixes” from random forums, Discord DMs, or unknown paste sites. **One changed line** in the script is enough to steal your token.

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

> [!WARNING]
> **Hiding the panel is not the same as stopping.** If deletion is running, you must click **🛑 Stop** to cancel. Closing the trash panel only hides the window.

> [!IMPORTANT]
> **While a delete job is running, keep the Discord browser tab open.** You can switch to another tab on the same browser, but closing Discord’s tab **stops** the run (except server wipe may offer **Resume** if you saved a checkpoint).

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
| **Advanced** | Speed, delays, expert options |
| **⚠ Account token** | Last item on the sidebar — login token danger zone (below Advanced) |

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

**Good for:** Thousands or hundreds of thousands of messages in **one** channel — as long as you accept it will run for **hours or days** (see [How long will this take?](#how-long-will-this-take-be-realistic)).

**Not good for:** Saving every photo first (use Review photos & backup). Not for “I need this done in ten minutes” on a huge history.

**Analogy:** Robot vacuum — press start and let it run. Keep the tab open.

> [!WARNING]
> **Fast wipe does not ask “Are you sure?”** once you click **Delete**, it starts immediately. Double-check **Author ID**, **Server ID**, and **Channel ID** before you press the button.

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

> [!IMPORTANT]
> **One channel only.** Do not enable **“All message channels in this server”** with this profile — interactive review cannot run server-wide.

> [!WARNING]
> Not for huge text-only histories (e.g. 100,000+ messages). You must click through every batch yourself. Use **Fast wipe** for large unattended deletes.

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

> [!CAUTION]
> **Server wipe can run for days or weeks** on active servers. Pre-count may show very large numbers. Read the confirmation popup carefully. Do not lower delete delays to “go faster” — that increases **rate limits** and **ban risk**, and still will not turn a massive server into an hour-long job.

> [!WARNING]
> Server wipe needs a **real server ID** (from **Current** in that server), not `@me`. DMs are not a server-wide wipe — use single-channel workflows instead.

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

> [!IMPORTANT]
> Before **Delete**: **Author ID** filled (**Me**), **Server** and **Channel** filled (**Current**), **“All message channels”** unchecked.

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
8. Watch the log — see [How long will this take?](#how-long-will-this-take-be-realistic). Small jobs: under an hour. **10,000+ messages: often a day or more.**
9. To pause: click **🛑 Stop** (not just close the panel).

> [!TIP]
> If the run stops early with “no more messages” but you know more exist, open **Advanced** → raise **Empty page retries** to 4–6 → run **Delete** again. Discord’s search index often lags on huge channels.

> [!CAUTION]
> Large jobs still count as forbidden automation no matter how long they take. Slower delays may reduce rate limits but **do not** make the process “allowed” by Discord — only somewhat less bumpy.

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

> [!CAUTION]
> You are about to delete across **every channel the tool can find** in that server. Confirm the **server name** in the pre-count / popup matches the server you intend. Wrong **Server ID** = wrong server or failed run.

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

> [!WARNING]
> Turning on **Include bot / app messages** can make the tool try to delete posts you did not write (bots, webhooks). That causes **403** errors and wasted API calls. Only enable if you understand why.
| **Regex pattern** | Advanced: only messages matching a pattern. |
| **Keep messages (inverse)** | Checked = **do not delete** those (e.g. keep all messages with links, delete the rest). |

> [!WARNING]
> **Inverse filters are easy to misunderstand.** If you check “Keep messages with links” without other filters, you may delete **everything else** in the channel — including messages you meant to keep. Start with no filters unless you know exactly what you want.

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

> [!CAUTION]
> Buttons like **Delete all** and **Delete selected** remove messages **immediately** for that batch. There is no recycle bin. Read the button label before you click.

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

### ⚠ Account token (own menu — bottom of sidebar)

This is its **own** red section — the **last** item in the sidebar, directly **under Advanced** (not inside it). It is **closed by default**.

| What you see | Meaning |
|--------------|---------|
| **Ready / Not set** badge on the header | Whether a token is loaded — **never shows the token itself** |
| **Auto-fill token in the background** (on by default) | Tries to detect your token automatically — you usually **never need to open** this section |
| Opening the section | Warning screen + checkbox — you must acknowledge risk before **Show token field** |
| **Fill / Clear** | Only after unlock — force detection or wipe the field (does not log you out of Discord) |
| **Copy** | Hidden until you tick **“I know what I am doing — show Copy”**; then **Copy token** appears. A confirmation dialog warns you again. The field **stays dotted** — only the clipboard gets the real value. |

> [!CAUTION]
> **Your token is full account access** — more sensitive than your password in practice. Anyone with it can act as you until Discord resets it. **Privacy mode masks other fields and log lines but does not remove the token from memory** while this section is unlocked. Never screenshot, stream, or paste the token into chats or random sites. **Clear** when done on a shared PC.

> [!TIP]
> For most runs, leave the section closed, keep **Auto-fill** on, and click **▶ Delete**. The tool fills the token quietly and retries on **Delete** if needed.

---

### Advanced

| Setting | Simple explanation |
|---------|-------------------|
| **Search delay** | Seconds to wait between searching for the next page of messages (default 30). Lower = faster searches but more risk of rate limits. |
| **Delete delay** | Seconds between each single delete (default 1). Lower = faster deletes but more risk. Raise if you get rate limited. See [How long will this take?](#how-long-will-this-take-be-realistic). |
| **Empty page retries** | How many times to retry when search says “nothing found” but you expect more (default 2). |
| **Confirm before first delete batch** | One “Are you sure?” popup with preview. |
| **Unarchive threads before delete** | Try to unarchive old threads so messages inside can be deleted. |

---

## Footer buttons

| Control | What it does |
|---------|--------------|
| **▶ Delete** | Starts the run |
| **🛑 Stop** | Cancels the run — use this to actually stop |
| **Copy log** | Copies the log text to clipboard |
| **Clear log** | Empties the log window |
| **Privacy mode** | Masks IDs and sensitive text in the form and log |

> [!TIP]
> Leave **Privacy mode** on if you stream, share your screen, or use Discord in public. It hides IDs and token fields from view — it does not encrypt your disk or stop a malicious script.
| **Auto scroll** | Log follows new lines automatically |
| **Verbose log** | More technical details in the log |
| **Log each deletion** | Writes every single deleted message in the log (very long on big jobs) |

---

## When something goes wrong

> [!WARNING]
> Repeated **rate limits (HTTP 429)** mean Discord wants you to slow down. Forcing faster delays does not make deletion “more legal” — it increases the chance of throttling or account action. Raise **Delete delay** and use **Careful wipe**.

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
- Wait a few seconds for **background auto-fill** (badge should say **Ready**), or open **⚠ Account token** at the bottom of the sidebar, unlock, and click **Fill**.

### Errors on other people’s messages (wrong author)

- Almost always means **Author ID** was wrong or empty. Fix Author ID before running again.

> [!IMPORTANT]
> **403 errors on someone else’s username** mean the tool tried to delete messages that are not yours. Stop, set **Author ID** with **Me**, and do not restart until it shows **your** ID.

---

## Privacy in plain English

- The script runs **only in your browser** on Discord’s website.
- It talks to **Discord’s servers** to search and delete — not to this GitHub project’s servers (there are none).
- Your **token** stays on your computer and is sent to **discord.com** only, like the normal website.
- Optional **log files** and **photo backups** are saved **on your computer** only.
- **Server wipe resume** data is stored in your browser’s **local storage** until you resume or discard.

Full details: **[PRIVACY.md](./PRIVACY.md)**

> [!IMPORTANT]
> This project does **not** run servers that receive your chats. If a script ever sends your token or messages to a domain other than **discord.com** for core delete/search, **stop using it** — that would not match this project’s documented behavior.

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

## Where did this tool come from?

**Undiscord 2: Electric Boogaloo** is a maintained fork of the original **[Undiscord](https://github.com/victornpb/undiscord)** by Victornpb — the project most people mean when they say “Undiscord.” Levskitron maintains this version; Victornpb and Discord do not.

> [!IMPORTANT]
> **We did not copy other forks word-for-word.** This file is our own implementation (~4,000+ lines). Other community forks solved similar problems; we **studied their approaches** and **rebuilt** those behaviors here (same goals, different code, UI, and packaging).

### Who we thank (ideas & fixes, not endorsement)

| Project | What we learned from them |
|---------|---------------------------|
| **[Victornpb / Undiscord](https://github.com/victornpb/undiscord)** | The whole concept — search, filters, delete loop, bulk archive import. **Required MIT credit.** |
| **[TheCellMaster / undiscord](https://github.com/TheCellMaster/undiscord)** | **Empty page retries** — don’t stop forever when Discord returns an empty search page. |
| **[SuicidaI-Idol / undiscord](https://github.com/SuicidaI-Idol/undiscord)** | **Reliability** patterns: network retries, better 503 handling, history scan when search fails, guild search fallbacks, finishing sooner when the index catches up. |
| **[AerialJustice / undiscord-fixed-2025](https://github.com/AerialJustice/undiscord-fixed-2025)** | **Review photos & backup** — pause on batches, show a gallery, download attachments, then choose what to delete. |

### What is unique to Electric Boogaloo

- **Run profiles** (Fast / Careful / Photos / Server / Custom)  
- This **sidebar UI**, privacy mode, session logs, checkpoints  
- **Server wipe** with pre-count + resume  
- **Author ID** safeguards and this **USER_GUIDE** / **PRIVACY** docs  
- **Client-like API headers** (v1.4+) so deletes look like the web app, not bare token-only requests  

Full detail and links: **[CREDITS.md](./CREDITS.md)**.

> [!NOTE]
> Using ideas from another open-source fork is normal in this ecosystem; it does **not** mean those authors reviewed or approve this repo. If you want the exact script someone else ships, use **their** install link — not ours.

---

## FAQ

**Is this official Discord?**  
No. It is a community tool. Discord can ban accounts for using it.

**Will it delete my friends’ messages?**  
Not if **Author ID** is correct — it targets **your** messages only.

**Can I use it on my phone?**  
Only if you use a **mobile browser** with a userscript manager that supports Discord’s website. The Discord phone app alone does not run this script.

**How long will 100,000 messages take?**  

> [!IMPORTANT]
> There is no exact answer — it depends on your delays, rate limits, and how often Discord makes the tool wait. **100,000 messages at ~1 second per delete is already ~28 hours of deleting alone**, before search time, empty-page retries, and 429 pauses. In practice, **plan for multiple days**. The same logic applies to **10,000+** (often **24+ hours** even on Fast wipe). See [How long will this take?](#how-long-will-this-take-be-realistic).

**Why is it so slow compared to clicking delete myself?**  
Because the tool still deletes **one message per API call** and must **wait** between actions so Discord does not block you. It saves your fingers, not Discord’s clock.

**Can I undo?**  

> [!CAUTION]
> **No.** Deleted messages cannot be restored by this tool or by this project. Plan ahead.

**Does closing the trash panel stop deletion?**  

> [!WARNING]
> **No.** Only **🛑 Stop** ends an active run.

**What’s the difference between README and this guide?**  
**README** is a project overview for GitHub. **This guide** is for humans using the tool day to day.

---

## More help

| Resource | Link |
|----------|------|
| Project README (features & install) | [README.md](./README.md) |
| Credits & fork lineage | [CREDITS.md](./CREDITS.md) |
| Privacy & security | [PRIVACY.md](./PRIVACY.md) |
| Original Undiscord wiki (filter help links in UI) | [github.com/victornpb/undiscord/wiki](https://github.com/victornpb/undiscord/wiki) |
| Report bugs | [GitHub Issues](https://github.com/Levskitron/undiscord2electricboogaloo/issues) |

---

**Original project:** [Undiscord by Victornpb](https://github.com/victornpb/undiscord)  
**This fork:** [Levskitron / undiscord2electricboogaloo](https://github.com/Levskitron/undiscord2electricboogaloo)

> [!CAUTION]
> You are responsible for how you use this tool — including account bans, accidental mass deletion, and data loss. When in doubt: **🛑 Stop**, read the log, fix **Author ID** and **Target**, then read [When something goes wrong](#when-something-goes-wrong) before trying again.
