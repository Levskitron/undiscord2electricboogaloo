# Credits & lineage

**Undiscord 2: Electric Boogaloo** is maintained by [Levskitron](https://github.com/Levskitron). This document explains where the project comes from and how community forks influenced it — in good faith, without implying those projects endorse this fork.

## Original project (required attribution)

This fork descends from **[Undiscord](https://github.com/victornpb/undiscord)** by [Victornpb](https://github.com/victornpb) and contributors (MIT License).

- Core idea: bulk-delete **your own** messages via Discord’s web API from a userscript.
- The userscript header, [LICENSE](./LICENSE), and UI still point to the upstream project.

Per MIT, derivatives must keep attribution to victornpb/undiscord in code, README, and license.

## Is this a copy of other forks?

**No — not word-for-word.**

Electric Boogaloo is **this repository’s own codebase** (single userscript file, 5,000+ lines as of v1.4.1). It is not a merge of, nor a byte-for-byte copy of, SuicidaI-Idol, AerialJustice, TheCellMaster, or GreasyFork re-uploads.

What we did instead:

1. Started from the **victornpb** Undiscord lineage (as most community forks do).
2. **Rewrote and extended** the UI (sidebar, run profiles, privacy mode, Discord-themed layout, toolbar mounting).
3. **Studied** several active community forks and **reimplemented** specific *behaviors* in our own style — same goals, different structure, naming, and integration with profiles/checkpoints/logs.

If you diff our file against any other fork, you will see different organization, strings, and feature bundling. Similarity is intentional where the **problem** is the same (e.g. “retry when search returns an empty page”).

## Community forks that influenced features

Thank you to maintainers and contributors who published fixes and experiments the community relied on. Below: **what we took inspiration from**, not a claim that they shipped this exact repo.

| Project | Link | Influence on Electric Boogaloo |
|---------|------|--------------------------------|
| **Victornpb — Undiscord** | [github.com/victornpb/undiscord](https://github.com/victornpb/undiscord) | Base architecture: search → delete loop, filters, token, bulk archive import concept, wiki help links. |
| **TheCellMaster — undiscord** | [github.com/TheCellMaster/undiscord](https://github.com/TheCellMaster/undiscord) | **Empty page retries** — retry when Discord returns empty search pages instead of stopping immediately (related to upstream discussion/PR [#796](https://github.com/victornpb/undiscord/pull/796)). Reimplemented here with configurable 0–10 retries. |
| **SuicidaI-Idol — undiscord** | [github.com/SuicidaI-Idol/undiscord](https://github.com/SuicidaI-Idol/undiscord) | **Reliability layer** ideas ported in our own code: network retry on transient failures, HTTP 503 / 5xx handling on delete, empty-page streak vs `grandTotal`, quick re-search after batches, guild search fallbacks, channel **history scan** when search is unavailable (`50024`). Not their UI. |
| **AerialJustice — undiscord-fixed-2025** | [github.com/AerialJustice/undiscord-fixed-2025](https://github.com/AerialJustice/undiscord-fixed-2025) | **Interactive media review** — batch gallery, select attachments, backup via `GM_download` to `Undiscord_Media/...`, then delete/skip/keep actions. Reimplemented as **Review photos & backup** profile + `mediaReview` pipeline. |
| **SuicidaI-Idol & others (server-wide)** | (same ecosystem) | **Server-wide wipe** patterns: discover channels/threads via API (+ sidebar fallback), run channels sequentially (`runBatch`). Our **Server wipe** profile, pre-count, and checkpoint resume are **this fork’s** packaging. |
| **Upstream issues/PRs** | [victornpb/undiscord/issues](https://github.com/victornpb/undiscord/issues) | Many fixes here address reports on the original repo (toolbar mount, pinned messages, completion messages, etc.) — triaged and solved in this fork. |

### Original to this fork (not from other forks)

Examples of work that is **Electric Boogaloo–specific** (design/integration, not “lifted” from a named fork):

- Run profiles: Fast / Careful / Media / Server / Custom  
- Sidebar sections, privacy mode, copy log, session log export  
- Checkpoint resume (`localStorage`, `undiscord_eb_checkpoint_v1`)  
- Author ID required + autofill hardening (v1.3.1)  
- Hybrid ETA (`calcEtr`), run profiles wiring, README / PRIVACY / USER_GUIDE  
- Optional **Unarchive threads before delete** (toggle; behavior implemented here)  
- **Client-like API headers** (v1.4.0) — `discordApiFetch`, Full/Partial fingerprint bar, page traffic capture, synthetic `X-Super-Properties`, optional **Debug API headers** log toggle  
- **Account token vault** (v1.4.0) — dedicated sidebar danger section, acknowledgment gate, background autofill, gated Copy, masked token field  
- **Main panel layout** (v1.4.0) — fingerprint bar outside scrollable log, resizable window (default 1100px), segmented footer progress  
- **Firefox + Tampermonkey API fetch** (v1.4.1) — sandbox `fetch` when page-context `Response.body` is unreadable; Violentmonkey unchanged

## Third-party assets

- Trash icon lineage from upstream Undiscord assets ([victornpb.github.io/undiscord](https://victornpb.github.io/undiscord/images/icon128.png)) via userscript `@icon`.

## How to cite this project

If you fork or write about this repo:

1. Keep **victornpb/undiscord** attribution (MIT).  
2. Optionally link this repo: [Levskitron/undiscord2electricboogaloo](https://github.com/Levskitron/undiscord2electricboogaloo).  
3. Do not imply Victornpb, SuicidaI-Idol, AerialJustice, or TheCellMaster **endorse** your derivative unless they say so.

## Corrections

If a credit is wrong or a contributor is missing, please [open an issue](https://github.com/Levskitron/undiscord2electricboogaloo/issues) with the repo link and what should change.
