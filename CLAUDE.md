# CLAUDE.md — Lin Lab Website (linnykos.github.io)

## Workflow Instructions
1. **Enter plan mode** before any non-trivial change (layout, CSS, restructuring).
2. **Use superpower skills** where relevant: `/code-review` for HTML/CSS/JS changes, `/verify` for anything claimed to render/deploy correctly.
3. **After every prompt**, update the current contributor's `CLAUDE_[name].md` with non-obvious decisions or context. Skip anything already visible in the code or git history.

## Project Context (High Level)
**Project**: Personal + lab website for Kevin Z. Lin (UW Biostatistics).
**Live URL**: https://linnykos.github.io/  (note: the repo folder is named `linnylin92.github.io` from an older GitHub username; the site is served from the `linnykos` account.)
**Hosting**: GitHub Pages, static — **no build step**. Files are served as-is from the repo root. Pushing to the default branch deploys.
**Goal**: Advertise the lab's research, papers, people, funding, and application resources.

## Repository Layout
- `index.html` — landing page: about + full publication list + articles. This is the largest, most-edited file.
- `people.html` — lab photos, current members, alumni.
- `resources.html` — application materials, teaching notes, job-posting links.
- `funding.html` — grants and awards.
- `script.js` — maps `data-link="key"` attributes on `<a class="link">` to external URLs via the `websiteLinks` dictionary. **Every person's homepage lives here**, keyed by `firstname_lastname`.
- `css/style.css` — the real stylesheet (all layout lives here); ends with a `max-width:600px` media query for phones.
- `images/` — `plot-*.png` are per-paper thumbnails; `lab-*.png` are member headshots; `selfie.png`, `banner.png`, `background.jpg`, `favicon.svg` (the "KL" tab icon).
- `papers/` — hosted PDFs (preprints, CV) linked from the pages.
- `application/` — Kevin's faculty-application materials (cover, cv, research, teaching, diversity, talk).

## Conventions
- **Adding a person's homepage**: add one entry to `websiteLinks` in `script.js`, then reference it in HTML with `<a class="link" href="" target="_blank" data-link="firstname_lastname">Name</a>`. The key must match exactly or the link resolves to the string `"undefined"` (a broken link).
- **Adding a paper**: copy an existing `<div class="block">` in `index.html`, drop a thumbnail in `images/plot-*.png`, and place it under the correct `<div class="subtitle">` section (Preprints / Highlighted / Other).
- **Bold author names** (`<span class="emph">`) denote Lin Lab members.
- New files Claude drafts for review get a `_claude` suffix before the human integrates them.
- The banner/nav/head block is duplicated across all four HTML files — edit them together to stay consistent.

## Who Is Using This Session?
Detect the current user with `echo $USER`, then read that person's context file immediately before any other work.

| Username (login) | File to read (first name) |
|---|---|
| `kevinlin` | `CLAUDE_kevin.md` |

If no match, ask who the user is and create `CLAUDE_[name].md` via `/project-state`.

## Post-Prompt Update Instructions
After each prompt, append to the relevant `CLAUDE_[name].md`: methodology/design decisions, open or resolved questions, and non-obvious change rationale. Do NOT record what is already in the HTML/CSS/JS or git history.
