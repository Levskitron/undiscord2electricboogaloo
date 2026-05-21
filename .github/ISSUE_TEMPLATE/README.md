# GitHub issue templates

When someone clicks **New issue** on this repository, GitHub reads the YAML files in this folder and shows a **chooser** (not a single `ISSUES.md` file).

| Template | Use when |
|----------|----------|
| **Deletion / search not working** | Failed runs, 403/429, empty pages, fingerprint Full/Partial, wrong counts |
| **Bug report (UI, install, other)** | Panel layout, trash button, token vault UI, gallery, checkpoints, install |
| **Question / help** | How-to, settings advice, timelines — not a reproducible bug |
| **Feature request** | New behavior or improvements |
| **Documentation issue** | README / USER_GUIDE / PRIVACY wrong or unclear |

`config.yml` disables blank issues and adds quick links to the User Guide, README, Privacy doc, and upstream Undiscord.

### Labels (optional but recommended)

Create these labels in **Settings → Labels** so templates auto-apply:

- `bug`, `run`, `enhancement`, `question`, `documentation`

Issues still work if labels are missing; GitHub simply skips unknown labels.

### Maintainer note

Templates are [issue forms](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/syntax-for-issue-forms) (YAML). Edit fields here when the UI or troubleshooting flow changes.
