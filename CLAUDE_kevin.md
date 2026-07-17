# CLAUDE_kevin.md — Kevin Lin's Context

## About Kevin
- Role in project: Owner / sole maintainer of the personal + lab website.
- Background: Tenure-track assistant professor, UW Biostatistics.
- Email: kzlin@uw.edu

## Environment (local paths)
- Repo root: `/Users/kevinlin/Library/CloudStorage/Dropbox/Collaboration-and-People/website/linnylin92.github.io`
- Also mirrored at: `/Users/kevinlin/Dropbox/Collaboration-and-People/website/linnylin92.github.io`
- Deploy: push to the default branch → GitHub Pages serves at https://linnykos.github.io/ (no build step).

## Project Status (as of 2026-07-17)
- Static site, four pages: `index.html` (about + publications), `people.html`, `resources.html`, `funding.html`.
- Session 1: full audit + correctness/mobile fixes. Session 2: cleared the entire remaining audit list EXCEPT the Jekyll refactor (see log + Open Questions).
- **Audit fully closed.** #15 (Jekyll `_includes`/layout refactor) was considered and **declined by Kevin on 2026-07-17** — keep the site as plain static HTML and accept the minor banner/head duplication across the 4 files. Do NOT re-propose the Jekyll conversion unless Kevin raises it. If the nav ever needs frequent edits, revisit then.

## Key Methodological Details
- Person homepages live in `script.js` `websiteLinks`, keyed `firstname_lastname`; HTML references them via `<a class="link" data-link="key">`. A missing/typo'd key = broken link.
- `script.js` now guards missing keys: renders plain text + `console.warn` instead of `href="undefined"` (changed 2026-07-17).

## Open Questions / Next Steps
1. Resolved (2026-07-17): Jekyll refactor #15 — declined; keep plain static HTML. See Project Status.
2. Open: Visual/browser verification — all Session 1/2 changes verified structurally (grep), but not yet eyeballed in a real browser at desktop + phone widths. Favicon and responsive media query especially worth a look.
3. Note: changes are in the working tree but NOT yet committed to git or pushed — Kevin hasn't asked to commit. `git rm --cached` was used for the junk files; `styles.css` was `git rm`'d.

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
