# HISTORY_kevin.md — Kevin's Session Log

> **Append-only, ascending chronological order** (oldest at top, newest at the bottom). Add each session's dated entry to the END of this file. Never read at session startup — consulted only on demand for deep history. Current project state lives in `CLAUDE_kevin.md`.
>
> **Owned by Kevin.** Only Kevin's session appends to this file. Other collaborators may read it but must not edit or rewrite entries.
>
> Sessions 1–4 (2026-07-17 through 2026-07-20) predate this file; their log lives in the "Session Log" section of `CLAUDE_kevin.md`. New sessions go here.

---

### 2026-09-17 (Session 5 — UW Shared Web Hosting research)
- Kevin wants the site on a UW-hosted URL as well as GitHub Pages; saved 9 UW-IT docs into `additional_context/` and asked for a summary, a steps guide, an email draft for gaps, and to gitignore the folder.
- Produced `additional_context/summary.md` (per-doc summaries, grouped by topic; format adapted from context-synthesis because these are IT help pages, not papers), `additional_context/UW_HOSTING_STEPS.md`, and `additional_context/email_draft_UWIT.md`.
- Resolved: Kevin's ssh+scp guess is correct — ovid.u.washington.edu, NetID login, files go in `~/public_html/`. Recommended `rsync` over `scp` for repeat deploys. Kevin's account already has Ovid Account + Web Publishing active (per his Manage NetID Resources page), so no activation step.
- Open: exact public URL (likely `faculty.washington.edu/kzlin/`, not confirmed by the docs), whether ovid SSH needs VPN/Duo, `.htaccess` redirect support, and the meaning of "localhome" — all in the email draft. Kevin to try Steps 1–4 first, email only if stuck.
- Open: whether to mirror (Option A) or just redirect the UW URL to GitHub (Option B). Kevin has not chosen.
- Open: the 4 subpages' nav links are absolute to `linnykos.github.io`; recommended converting to relative so the UW copy is self-contained. Not done — a site edit Kevin has not asked for yet.
- Added `additional_context/` to `.gitignore` (verified via `git check-ignore`); folder was never committed.
- Created this HISTORY file (project-state skill convention); did not migrate the older Session Log out of `CLAUDE_kevin.md`.
