# CLAUDE_kevin.md — Kevin Lin's Context

## About Kevin
- Role in project: Owner / sole maintainer of the personal + lab website.
- Background: Tenure-track assistant professor, UW Biostatistics.
- Email: kzlin@uw.edu

## Environment (local paths)
- Repo root: `/Users/kevinlin/Library/CloudStorage/Dropbox/Collaboration-and-People/website/linnylin92.github.io`
- Also mirrored at: `/Users/kevinlin/Dropbox/Collaboration-and-People/website/linnylin92.github.io`
- Deploy: push to the default branch → GitHub Pages serves at https://linnykos.github.io/ (no build step).

## Project Status (as of 2026-09-17)
- Static site, five pages: `index.html` (about + news), `publications.html`, `people.html`, `resources.html`, `funding.html`.
- **UW hosting (Sessions 5-7, 2026-09-17):** Kevin is setting up a second copy on UW Shared Web Hosting (`ovid.u.washington.edu`, files in `~/public_html/`). Guide + email draft live in `additional_context/` (gitignored, local only). See `HISTORY_kevin.md` for the sessions; per-session logs now go there, not in this file. **The UW URL is confirmed: https://faculty.washington.edu/kzlin/** (200, serving UW's placeholder; `staff.washington.edu/kzlin/` 302s there; HTTPS/HTTP-2, Apache). **Status: Steps 1-2 done** (SSH access confirmed — no Duo, no VPN; nav links relative). **Kevin chose Option A (full mirror) on 2026-09-17.** Deploy with `additional_context/deploy_uw.sh --live` (dry run by default). Publishing is now a TWO-step habit: `git push` updates GitHub Pages, the script updates UW — skip the second and the copies silently drift.
- Session 1: full audit + correctness/mobile fixes. Session 2: cleared the entire remaining audit list EXCEPT the Jekyll refactor (see log + Open Questions).
- **Audit fully closed.** #15 (Jekyll `_includes`/layout refactor) was considered and **declined by Kevin on 2026-07-17** — keep the site as plain static HTML and accept the minor banner/head duplication across the 4 files. Do NOT re-propose the Jekyll conversion unless Kevin raises it. If the nav ever needs frequent edits, revisit then.

## Key Methodological Details
- **ovid serves via group `www`, and this repo's local file modes are a trap.** `~/public_html/` is `drwxr-s---  kzlin www` (setgid) and UW's placeholder file is `-rw-r-----  kzlin www`, so the web server reads through the group, not world. 37 of 112 local files are mode `600` (including `index.html`, `script.js`, `css/style.css`) — `rsync -a` preserves modes, so any upload without `--chmod` publishes a 403'd site. Do not "fix" the local modes instead: git tracks only the execute bit, so they are invisible on GitHub Pages and would resurface on any fresh clone. Server-side fallback is `chmod -R g+rX ~/public_html/` (not `a+rX` — shared host).
- **Use the SYMBOLIC `--chmod` spelling.** This Mac has only `/usr/bin/rsync` = **rsync 2.6.9** (Apple 2006, no Homebrew rsync), which hard-errors on the modern octal `--chmod=D755,F644`. Use `--chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r`. Same caveat applies to any future rsync/`-a` flag copied from modern docs onto this machine.
- **Deploy payload is 63 files / 5 dirs / 46 MB** (not the 12 MB first estimated): `application/` 19 MB, `papers/` 16 MB, `images/` 11 MB; `application/talk.pdf` alone is 15 MB. Verified by running the real rsync into a local directory.
- **`deploy_uw.sh` lives in `additional_context/`, not the repo root, on purpose:** the repo root is served verbatim by both hosts, so a script there would be publicly fetchable at `linnykos.github.io/deploy_uw.sh`. `additional_context/` is gitignored and rsync-excluded, so it reaches neither host. Its `UW_TARGET` env var overrides the destination — that is the testing hook used to verify it without an ovid password.
- Person homepages live in `script.js` `websiteLinks`, keyed `firstname_lastname`; HTML references them via `<a class="link" data-link="key">`. A missing/typo'd key = broken link.
- `script.js` now guards missing keys: renders plain text + `console.warn` instead of `href="undefined"` (changed 2026-07-17).

## Open Questions / Next Steps
0. Open (Sessions 5-7): UW hosting. Steps 1-2 DONE and the URL is confirmed (2026-09-17). Kevin to do Steps 3-4 (rsync upload + browser check). Remaining unknowns, now 4 not 6, in `email_draft_UWIT.md`: rsync availability/quota, SSH keys, `.htaccess` overrides, "localhome" — and the first two resolve themselves on the first upload. **Still undecided: full mirror (Option A) vs. redirect-only (Option B)** — the one decision blocking the rest, open since Session 5.
1. Resolved (2026-07-17): Jekyll refactor #15 — declined; keep plain static HTML. See Project Status.
2. Open: Visual/browser verification — Session 3 changes WERE eyeballed in Chrome (localhost). Session 1/2 changes still only grep-verified.
3. Note: changes are in the working tree but NOT yet committed to git or pushed — Kevin hasn't asked to commit.
4. Open (Session 3): `pip3 install pyyaml` must be run on any machine that will run `generate.py` (Kevin's machine has it now, Python 3.7). Consider `pip3 freeze > requirements.txt` if collaborators appear.

## Docs (Session 3, 2026-07-19)
- `README.md` (repo root) is the **human-facing** guide for Kevin (how to add papers/photos/people, deploy) — merged in on 2026-07-19 per Kevin's request (he doesn't expect anyone to browse the GitHub repo, only the public site, so the long guide living in README is fine). Keep it in sync when the workflow changes — it duplicates some of what's here, but written for a person, not for Claude. (There was briefly a separate `HOW_TO_UPDATE.md`; it was folded into README and deleted.)

## Paper generator (Session 3, 2026-07-19)
- Papers on `index.html` are now generated from `papers.yml` via `python3 generate.py` (chosen over client-side fetch to keep deployed HTML fully static / Scholar-friendly / `file://`-previewable). Workflow: edit yml → run script → push.
- Generator rewrites ONLY between `<!-- PAPERS:START ... -->` / `<!-- PAPERS:END -->`. Do not hand-edit inside.
- `venue` is verbatim free-form HTML on purpose — the per-journal citation line varies too much (`<i>`, volume, year, linked journal name) to structure. `links` are structured `{label,url}`; rare grouped links use a `{raw: "(...)"}` escape hatch (only `binseg`'s "git 1, git 2"). `extra` is free HTML appended after links (only `NetworkSoSD`'s "Data (4.15 Gb…)" line). `note` handles `(*Equal contributions)` (only autism/Science).
- Generator always emits a consistent Oxford "and" before the last author. This DELIBERATELY standardized 5 previously-inconsistent author lines (Clonotrace, sensGAN, GeoAdvAE, Tilted-CCA, autism/Science) — the only rendering changes vs the old hand-written HTML; abstracts/titles/venues/links/author-names are byte-identical. Autism's `*` after K.Z.Lin is now inside the bold span (bold asterisk) — cosmetically negligible.
- Migration was done by a throwaway parser (scratchpad `extract_papers.py`) + round-trip diff (`verify.py`) against a backup, not hand-transcription — so `papers.yml` is faithful by construction.

## Photo carousel (Session 3, 2026-07-19)
- `people.html` "Lab photos" is now a self-contained carousel (inline `<style>`+vanilla JS scoped under `#labCarousel`; jQuery untouched). Newest-first slide order: 2026, 2025, 2024.
- Uniform footprint achieved with a fixed `aspect-ratio: 5/3` stage + `object-fit: contain` over white bg → wider photos (2024/2025) get white letterbox bars, no cropping. This is the answer to Kevin's "add white if needed" ask.
- Captions handwritten, mapped by last digit of the photo year (2026→2025-26, etc.), in the JS `captions[]` array — keep that array in sync with slide order if photos are added.

## Publications split + News (Session 4, 2026-07-20)
- Research publications (all 3 sections) moved OFF `index.html` onto a new dedicated page **`publications.html`**. Nav item relabeled `research` → `publications` on all 5 pages. Chosen over `research.html`/`papers.html` by Kevin.
- The "Articles" section (Significance piece) moved to `publications.html` too — `index.html` is now intro + funding/course-notes + a new **"News and Updates"** bulleted `<ul>` (below the intro `<hr>`, `id="news"` anchor, plain `<ul>` using the generic `ul`/`ul li` CSS — no custom class; a stale `ul#news li` rule already exists in style.css but the id lives on the anchor, so the generic `ul` styling is what applies).
- First news bullet: congrats to Yifan Lin (Gilbert S. Omenn Award), award name linked to the SPH blog URL. Yifan's name left as plain text (has a `yifan_lin` key in script.js if we ever want to link it). Fixed the "prestigous"→"prestigious" typo from Kevin's dictation.
- **`generate.py` now targets `publications.html`** (was `index.html`): `HTML_PATH` const + docstring + error/summary strings updated. Markers `<!-- PAPERS:START/END -->` now live ONLY in `publications.html`. Workflow unchanged otherwise: edit `papers.yml` → `python3 generate.py`. Confirmed idempotent (25 papers: 4/13/8).
- publications.html built as an empty-marker shell, then populated by the generator (not hand-transcribed) — so paper markup is byte-identical to the old index.
- Nav on subpages originally used absolute `https://linnykos.github.io/...` while index used relative; **all nav links are relative as of Session 6 (2026-09-17)** — keep new nav edits relative.
- Docs synced: `README.md` (files table now lists publications.html; added a "News and Updates" edit pointer; "four"→"five" HTML files) and `CLAUDE.md` (repo layout, adding-a-paper convention, banner-duplication note).
- Spec: `docs/superpowers/specs/2026-07-20-publications-page-and-news-design.md`.
- NOT yet browser-verified (structural/grep-verified only) and NOT committed — Kevin hasn't asked to commit.

## Session Log

### 2026-07-17 (Session 1 — initial audit + bug/mobile fixes)
- Read all four HTML pages, `script.js`, `css/style.css`; produced a full QoL audit.
- Created master `CLAUDE.md` and this file.
- Approved scope: "bugs + mobile only." Fixes applied:
  - Broken author links: `yixin_wangi`→`yixin_wang` (LCL); added `manu_setty` URL (Setty Lab, Fred Hutch) for SCOPE; M. Snyder in MaxFuse re-pointed from `shuxiao_chen`→`michael_snyder`.
  - `script.js`: guard against undefined keys (see Key Methodological Details).
  - Added `<meta charset="utf-8">` + `<meta name="viewport">` to all four pages.
  - `css/style.css`: `#main`/`#header` given `max-width:100%; box-sizing:border-box`; added a `max-width:600px` media query (stacked banner/nav, full-width floated images).
- Verified: no undefined `data-link` keys remain; meta tags present on all four pages.

### 2026-07-17 (Session 2 — cleared the rest of the audit)
- Approved scope: "all remaining audit items." Done:
  - Removed duplicate jQuery include from all 4 pages (kept 1); deleted empty root `styles.css` (git rm) and its link in index.
  - Untracked `.DS_Store` (×3) + `.Rhistory` via `git rm --cached`; added `.DS_Store` to `.gitignore`.
  - Fixed invalid `#navigator` selector (trailing comma) in `css/style.css`.
  - Standardized all footers to "2015 - 2026 … Last Updated: July 17, 2026"; added a footer to funding.html (previously had none).
  - Added `alt` text to every image (25 research thumbnails, 10 lab headshots incl. lab-shirley.jpg, selfie).
  - Fixed prose typos: Enndolysosomal, "the the precentage", barcoe, disproportiate, millenials (index); vartional + missing `<br>` after ymzhao97 email (people); "statments" (resources).
  - Per-page `<title>`s: People / Resources / Funding & Awards; index kept as home title.
  - Added `images/favicon.svg` ("KL" on #333) + `<link rel="icon">` on all 4 pages.
- Deferred #15 (Jekyll refactor) — see Project Status / Open Questions.
- Edits applied via two scratchpad scripts (fix_typos_alt.py, fix_structure.py), each reporting matched/not-found; all matched. Verified post-hoc by grep: 1 jQuery + 1 favicon per page, distinct titles, uniform footers, 0 images without alt, 0 broken data-link keys, 0 residual typos.

### 2026-09-25 (Author homepage links for Qiao et al. 2026)
- Added `script.js` keys `david_fardo`, `mariano_gabitto`, `josh_morganti`, `peter_nelson` and linked them in `papers.yml`; regenerated `publications.html`.
- `josh_morganti`: key uses "Josh" (J. M. Morganti goes by Josh at UKy) — assumption; rename if Kevin prefers another key.
- Not committed.
