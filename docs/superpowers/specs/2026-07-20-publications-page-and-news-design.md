# Design: Split publications onto their own page + add News/Updates to landing page

Date: 2026-07-20
Owner: Kevin Z. Lin

## Goal
Move the full research publication list off the `index.html` landing page onto a
dedicated page, and replace the freed space on the landing page with a "News and
Updates" bulleted section.

## Decisions (from brainstorming)
- New page filename/nav label: **`publications.html`** / "publications".
- The **Articles** section (Significance magazine piece) moves to `publications.html`
  along with the 3 research categories.
- **No new "news" nav item.** News lives on the landing page below the intro; the
  existing "research" nav cell is repointed to `publications.html` and relabeled
  "publications".

## Changes

### 1. New file `publications.html`
- Page shell (head / banner / nav / footer) cloned from `index.html`.
- `<title>` → "Publications — Kevin Z. Lin".
- Body content, in order:
  1. `<div class="title">Research</div>` + `<a class="anchor" id="research"></a>`
     (id kept so old `#research` deep-links still land).
  2. The `<!-- PAPERS:START … -->` / `<!-- PAPERS:END -->` markers. These now live
     ONLY here (removed from `index.html`), so `generate.py` populates this page.
  3. The **Articles** section, moved verbatim from `index.html`.
- Loads `<script src="script.js"></script>` at the end so author `data-link`
  homepages still resolve.

### 2. `index.html`
- Delete the Research block (title, `#research` anchor, PAPERS markers + content)
  and the Articles block.
- After the introduction's `<hr>`, add a **News and Updates** section: a
  `<div class="content">` with a `<div class="title">News and Updates</div>` and a
  `<ul>` bulleted list. First bullet:
  > CONGRATULATIONS to Yifan Lin for winning the
  > [Gilbert S. Omenn Award for Academic Excellence] (linked to the SPH blog URL),
  > a prestigious award given to only one Master's student in the School of Public
  > Health per year.
  - Award name is the hyperlink; typo "prestigous" → "prestigious".
  - Yifan Lin's name left as plain text (not linked) unless requested otherwise.
- Nav: "research" cell → "publications" → `publications.html` (relative).

### 3. `generate.py`
- Change target constant `HTML_PATH` from `index.html` → `publications.html`.
- Update docstring wording (`index.html` → `publications.html`).
- No change to `papers.yml`, sections, or render logic.

### 4. Nav bar consistency (all 5 HTML pages)
- Replace the `research` nav cell with a `publications` cell across
  `index.html`, `publications.html`, `people.html`, `resources.html`,
  `funding.html`.
- Relative link on `index.html`; absolute `https://linnykos.github.io/publications.html`
  on the sub-pages, matching their existing absolute-URL convention.

### 5. Docs
- `README.md` and `CLAUDE.md`: update "adding a paper" instructions so the generator
  writes `publications.html`, not `index.html`.

## Non-goals / unchanged
- `script.js` `websiteLinks` dictionary — unchanged.
- Paper content — moved byte-for-byte (generator regenerates identical markup); no
  manual retyping.
- Intro, Funding, Course-notes paragraphs on `index.html` — unchanged.

## Verification
- Run `python3 generate.py`; expect it to report writing papers to
  `publications.html` with the same counts as before.
- Grep: 0 remaining `PAPERS:` markers in `index.html`; markers present in
  `publications.html`.
- Grep: no `>research<` nav label remains; `publications.html` referenced in nav of
  all 5 pages.
- Eyeball both pages in a browser (nav works, papers render, News bullet links out).
