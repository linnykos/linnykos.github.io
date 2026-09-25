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

### 2026-09-17 (Session 6 — relative nav links, UW_HOSTING_STEPS Step 2)
- Did the edit recommended in Session 5 / `UW_HOSTING_STEPS.md` Step 2: the nav bars on `people.html`, `resources.html`, `funding.html`, `publications.html` now use relative hrefs. 16 links changed (4 per page), not "about 20" as the guide estimated — the guide counted the `cv` cell, which was already relative.
- Scoped the replacement to lines containing `nav_cell` on purpose: three body links that look similar are NOT self-links and were left absolute — `linnykos.github.io/scOmicNotes/` (index.html:104, resources.html:61) and the eSVD2 / tiltedCCA pkgdown tutorial sites (publications.html:318, 362). Those are separate GitHub Pages projects and must stay absolute on any host.
- Subpage "about" → `index.html`, not `index.html#about`: the `#about` form is only on `index.html` itself, where it is a same-page scroll target driven by the jQuery smooth-scroll handler. Using the anchor cross-page would have worked but changes scroll behavior on arrival; kept it plain per the guide's wording.
- Verified by script: parsed every `nav_cell` href out of all five pages and confirmed each relative target exists on disk (25 links, 0 missing). Not browser-verified — the nav is the same flat-directory layout on both hosts, so relative resolution is unambiguous.
- Not committed (consistent with prior sessions; Kevin hasn't asked).

### 2026-09-17 (Session 7 — Ovid login confirmed, hosting guide corrected)
- Kevin pasted his ovid SSH transcript (`additional_context/ovid_confirmation.txt`) and asked to update the instructions. Updated `UW_HOSTING_STEPS.md` and `email_draft_UWIT.md`; no site files touched.
- Resolved from the transcript: no Duo, no VPN on that connection; home `/rc00/d33/kzlin` with `public_html -> /hw00/d33/kzlin`; `~/public_html/` already holds UW's 670-byte placeholder `index.html`.
- **Main finding — a real trap the old guide would have walked into.** ovid serves through group `www` (`drwxr-s---` dir, `-rw-r-----` placeholder), and 37 of the repo's 112 files are locally mode `600` (index/people/resources/funding.html, script.js, css/style.css, banner, background, 14 of 26 plot thumbnails, 12 of 13 PDFs). The guide's `rsync -avz` preserves modes, so it would have published a 403'd site. Step 3 now carries `--chmod=D755,F644`, which is the durable fix (it applies to every future upload, unlike a post-hoc chmod). Local modes deliberately left alone — they are invisible to GitHub Pages since git tracks only the execute bit, and normalizing them would be a 37-file diff for no benefit.
- Step 5 changed from `a+rX` to `g+rX`: group www is what the server actually needs, and the shared host has other users. `a+rX` kept as the fallback line.
- Noted that the URL question can be settled *before* uploading, since the placeholder makes the UW URL already live — the rsync overwrites it, so check first.
- Email draft trimmed 6 questions → 5 (VPN/Duo, public_html existence, and permissions dropped; SSH keys split out of the old #2 into its own item). Remaining: public URL, rsync/quota, SSH keys, redirect syntax, "localhome".
- Steps 1 and 2 marked ✅ DONE in the guide. Stale Session-5 line about absolute nav links removed from the "Short answer" section.
- Counts in the guide were verified by `stat`, not estimated. Not browser-verified (nothing uploaded yet). No commit (folder is gitignored; site files unchanged).

### 2026-09-17 (Session 7b — UW URL confirmed)
- Kevin screenshotted the ovid placeholder (`additional_context/ovid_index-html.png`). It is generic UW boilerplate and does **not** name the site's own address, so the "cat the placeholder to learn the URL" tip I had just added to the guide was wrong; replaced it with a note saying so.
- Settled the URL by requesting the candidates instead: `faculty.washington.edu/kzlin/` → 200 serving that same placeholder (content-length 670, matching the server-side `ls -la` byte for byte), `staff.washington.edu/kzlin/` → 302 to faculty, `students.washington.edu/kzlin/` and `www.washington.edu/~kzlin/` → 404. **Canonical URL: https://faculty.washington.edu/kzlin/.**
- Response headers also killed the HTTPS `[unconfirmed]` (HTTP/2 + TLS) and identified the server as **Apache**, which reframes Option B: `.htaccess` `Redirect 301` is the right syntax, but whether `AllowOverride` is on for user dirs is unknown, so the guide now leads with a meta-refresh `index.html` (needs no server cooperation) and treats `.htaccess` as the upgrade.
- Email draft down to 4 questions (public URL dropped). Noted in it that questions 1-2 (rsync availability, quota) answer themselves on the first upload, so the email is realistically only for a persistent failure.

### 2026-09-17 (Session 7c — Option A chosen, deploy script written)
- Kevin chose **Option A (full mirror)**. Recorded in `UW_HOSTING_STEPS.md`; Option B kept as a record of the alternative. Wrote `additional_context/deploy_uw.sh` and rewrote Step 3 around it.
- **Two breakers found by simulating the upload locally before Kevin ran anything.** (a) macOS ships rsync **2.6.9**, which hard-errors on the octal `--chmod=D755,F644` I had put in the guide an hour earlier (`Invalid argument passed to --chmod`); the symbolic `--chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r` works and was verified to turn a mode-600 source file into 644 at the destination. (b) The payload is **46 MB, not the ~12 MB** the guide had estimated since Session 5 — `application/talk.pdf` is 15 MB by itself. Both corrected in the guide; the size also updated in the email draft, where the quota question now matters more.
- Verified the exact rsync arg list by running it into a scratch directory: 63 files, 5 dirs, every file 644, every dir 755, correct top-level contents, and no `CLAUDE*.md` / `HISTORY*.md` / `README.md` / `generate.py` / `papers.yml` / `docs/` / `additional_context/` / git metadata leaking through. Added `HISTORY*.md` and `.Rhistory` to the excludes, which the Session-5 list was missing.
- Script defaults to `--dry-run`; `--live` uploads, `--delete` optional. Tested both paths plus idempotence (2nd live run moved 1.6 KB of metadata). Caught a real bug in testing: under `set -u`, macOS's bash 3.2 treats `"${EMPTY_ARRAY[@]}"` as an unbound variable, so the original two-array design aborted before rsync ran — restructured into one always-non-empty ARGS array.
- Script placed in `additional_context/` rather than the repo root so it is not itself published (repo root is served verbatim by both hosts). `UW_TARGET` env var exists as the local-testing hook.
- The live upload itself is NOT done — it needs Kevin's NetID password interactively. Handed him the command to run.

### 2026-09-24 (Session 8 — content update from `additional_context/TODO_2026-09-23.txt`)
- Details the TODO left out came from public APIs, since Wiley and RePORTER web pages are bot-blocked (403 / JS-only). Authors, volume, and issue came from **Crossref** (`api.crossref.org/works/10.1002/alz.71810`): 10 authors, K. Z. Lin 4th, *Alzheimer's & Dementia* 22(9), e71810. Grant details came from the **RePORTER API** (`api.reporter.nih.gov/v2/projects/search`): Kevin is sole/contact PI, NIA; year-1 direct was $387,962. Use these two endpoints next time.
- R01 added to `funding.html` **without a total-direct figure**. The R35/ADRC/RRF entries list the whole-award total direct, but RePORTER only has year 1, so a number there would be wrong. Kevin needs to supply the total. News bullet (09/2026) added to `index.html`.
- New paper `LATE-NC` put in **highlighted**, not "other". Every recent paper, including collaborator-led ones (Glia, multiresistance), sits in highlighted, and "other" holds only pre-2024 papers. Kevin can move it.
- GeoAdvAE moved up next to sensGAN/LCL so the "To be published" entries stay together. Its venue is now JCB (to be published 2026), still linking RECOMB. JCB is now published by Sage: liebertpub.com/loi/cmb redirects to journals.sagepub.com, so the new link points to Sage.
- **Open: GeoAdvAE author list.** The JCB acceptance email CCs Tom Chartrand (Allen), Suman Jayadev, and Katherine Prater, and lists 5 affiliations. The journal version probably has 5 authors, but the site still shows Du and Lin only. Not changed: the author order is unknown.
- **Open: thumbnail.** No open-access figure was available, so `images/plot-latenc.svg` is a text placeholder (the generator only needs a path, and SVG works in `<img>`). Replace it with a real `plot-latenc.png` and update `image:` in papers.yml.
- ePRS: author order updated to bioRxiv v6, and C. S. Latimer added ("Catilin" in the TODO is presumably Caitlin, but only initials are shown). Corbin's initials are now "C. S. C.", per the new list. `pubtitle` changed to the new title. The short display `title` and the abstract were kept. "Y. F. Lin" (Yu Fan Lin) stays plain, not bolded. Open: is this lab member Yifan Lin?
- Verified: generator ran clean (26 papers, 4/14/8), diff inside PAPERS markers matches the intended changes only, SVG parses, all data-link keys resolve. Not browser-verified. Not committed.
- Follow-up (same day), open items resolved by Kevin: R01 total direct $2,658,676 added. Thumbnail is Kevin's `images/plot-late.png` (panel H volcano, astrocytes ADNC vs. mixed); placeholder SVG deleted. GeoAdvAE now lists 5 authors (Du, Chartrand, Jayadev, Prater, Lin), with only Du and Lin bolded. "Yu Fan Lin" on ePRS is a different person from lab member Yifan Lin: keep it plain and never link it to `yifan_lin`. On ePRS, only Kevin is bold (already the case).
- Follow-up 2: the "Funding" sentence on `index.html` now names the NIA R01 first, then R35 and ADRC. sensGAN and LCL now have a `link` to their ICML 2026 poster pages (icml.cc/virtual/2026/poster/64215 and /60771), placed before biorxiv. Their venue text already said "To be published 2026", which already tells readers the proceedings are not out yet, so it was left as is. When the PMLR proceedings appear, replace the poster links and update the venue.
