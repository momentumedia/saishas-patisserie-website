# CLAUDE.md

Guidance for any coding agent working on this repo. Read this first.

## Top rules (non-negotiable)

1. **Only real photos from `images/real/`.** Never introduce stock imagery (Unsplash/Pexels/etc.). If a menu item has no real photo, use the `.menu-item.no-photo` card variant.
2. **No em dashes (`—`) or en dashes (`–`) anywhere in prose.** Use periods, commas, or `·` (middle dot). Hyphens in compound words are fine. The client calls em dashes "too AI" — this is a hard rule.
3. **Never fabricate facts.** Don't invent stats ("three-day lamination"), press mentions, founder bios, or operational claims. The "French-Japanese" framing was inferred from menu items (yuzu, black sesame, Hokkaido matcha) and may be adjusted later.
4. **Order Online is a placeholder.** Every "Order Online" CTA uses `href="#"` until Square Orders API is wired. Do NOT point it to Uber Eats.
5. **"Accept Downtown Dollars", not "serve".** It's a local London, ON gift-certificate program, not food.
6. **Cloudflare blocks scraping `saishaspatisserie.ca`.** Don't waste effort trying; ask the user to paste real copy.

---

## Project overview

- **What:** Static marketing + menu website for Saisha's Pâtisserie, a bakery at Unit 4-208 Piccadilly Street, London, Ontario.
- **Users:** Prospective customers browsing the menu, ordering whole cakes, checking hours/location.
- **Business goal:** Replace the current Weebly-based `saishaspatisserie.ca`. Improve SEO, mobile, speed, brand feel, and conversion to first-party ordering.
- **Live URL:** https://momentumedia.github.io/saishas-patisserie-website/
- **Repo:** https://github.com/momentumedia/saishas-patisserie-website (public)

## Tech stack

- **Language:** HTML5 + CSS3 + vanilla JavaScript. No framework.
- **Package manager:** None. No `package.json`.
- **Build tools:** None. File-system static site.
- **External services:**
  - Google Fonts (Cormorant Garamond, Inter, Dancing Script)
  - Google Maps embed iframe (contact page)
  - Square gift card link (`app.squareup.com/gift/MLR6V0DSDRDC0/order`)
- **Hosting:** GitHub Pages (main branch, `/` root). Auto-deploys on push.
- **Env/config:** None. All values are hardcoded in HTML. No secrets in repo.

## Repo structure

```
saishas-patisserie/
├── index.html              Home
├── menu.html               Full menu (Individual Cakes, Whole Cakes, Pastries, Viennoiseries, Easter Chocolate Buddies, Drinks & Pantry)
├── about.html              Story + What We Believe + Neighbourhood. Keep SHORT.
├── gallery.html            Editorial chapters (Signatures, Viennoiseries, Tarts, Whole Cakes, Easter, Packaging)
├── order.html              Placeholder ordering page (not linked from nav)
├── contact.html            Quick-action tiles + hours + form + social + map
├── audit.html              Old-site audit (AIRMS-style: 3 Critical / 3 High / 3 Medium)
├── css/
│   ├── main.css            Tokens, reset, typography, layout, buttons, utilities
│   └── components.css      Nav, hero, marquee, cards, gallery, forms, footer, allergen, social SVG
├── js/
│   └── main.js             Nav scroll + mobile toggle, fade-up IntersectionObserver, menu tab scroll, gallery filters, lightbox
├── images/
│   ├── real/               ⭐ Real Saisha's photos. Source of truth.
│   ├── hero/               Hero backgrounds
│   ├── gallery/            Legacy copies of real photos
│   └── logo/               logo-dark.png (nav), logo-transparent.png (footer). Do NOT reference the .jpg versions.
├── CLAUDE.md               This file
└── .gitignore
```

No tests, scripts, docs, or shared directories exist. No backend.

## Local development

- **Install:** None. Just clone.
- **Dev / run:** `open index.html` on macOS. Or `python3 -m http.server 8000` from repo root.
- **Build:** None.
- **Test:** None.
- **Lint/format/typecheck:** None.

## Definition of done

Before calling any change complete:

1. **No broken image refs:**
   ```bash
   grep -hoE 'images/[a-zA-Z0-9/_.-]+\.(jpg|jpeg|png|webp|svg)' *.html css/*.css | sort -u | while read -r img; do [ ! -f "$img" ] && echo "MISSING: $img"; done
   ```
2. **No em dashes:** `grep -c '—' *.html` must return 0 for every page.
3. **Open `index.html`** in browser. Check: nav logo renders, hero reads, all sections load, no console errors.
4. **Mobile check:** dev tools at 375px. Nav collapses, grids stack.
5. **Cross-page nav check:** click every nav link on at least the page you changed.
6. **Commit pushed** to `main` — GitHub Pages redeploys automatically.

## Coding rules

### HTML
- Semantic: `<section>`, `<article>`, `<figure>`, `<nav>`, `<header>`, `<footer>`.
- Every `<img>` needs meaningful `alt`. Real product photos: use the item name.
- Every external link: `target="_blank" rel="noopener"`.
- Phone: `tel:`. Email: `mailto:`.
- Breadcrumb on every inner page.
- `<head>` block should stay consistent across pages (fonts, meta, favicon).

### CSS
- **Design tokens in `css/main.css :root`.** Don't hardcode colours — use `var(--rose)`, `var(--ink)`, etc.
- **Two stylesheets only:** `main.css` + `components.css`. Don't add more.
- Mobile-first: `@media (max-width: 900px)`, `(max-width: 540px)`, etc.
- Kebab-case classes. BEM-ish modifiers (`.menu-item.no-photo`, `.audit-issue.critical`).
- Animations use `var(--ease)` and `var(--t-fast|med|slow)`.
- New components go in `components.css` under a `/* ========= SECTION ========= */` header.

### JavaScript
- **One file only:** `js/main.js`. No deps, no modules, no frameworks.
- Feature-detect before attaching listeners (`if (lb) …`).
- Use IntersectionObserver for scroll reveals, never `scroll` events.
- Keep under ~200 lines.

### Writing / copy
- **Voice:** first-person plural ("we"), warm, confident, specific.
- Short sentences. Periods > commas.
- Prices: `$` prefix (Canadian context, omit "CAD" unless needed).
- Hours format: "Tuesday to Thursday · 9am to 5pm".
- **Banned phrases:** "three-day lamination", "photographed this morning", "passionately crafted", "curated selection", "artisan" (overused), made-up founder details.
- Google review quote lives on the **home page only**. Don't duplicate.

### File/component size
- HTML pages: all sections inline is fine; no partials.
- `components.css` is ~1000 lines — acceptable. Keep sections grouped.
- Keep `js/main.js` tight.

### Comments / docstrings
- Default to **no comments**. Only add when the why is non-obvious (workaround, constraint).
- Never comment what the code does — names should do that.

### Refactor vs patch
- **Patch** for small copy/style tweaks.
- **Refactor** only when a section has accumulated multiple inconsistent patterns (e.g. mixed logo paths, mixed CTA styles). Touch the minimum number of files.

## Testing guidance

- **No automated tests.** No `tests/` directory.
- **Manual verification only:** image refs (grep), em-dash check (grep), browser render, mobile viewport.
- Don't introduce a test framework without the user asking.

## UI/UX rules

- **Design system:**
  - Display font: Cormorant Garamond (italic for most headers)
  - Body: Inter
  - Script accent: Dancing Script (used sparingly, hero + intro signature)
  - Palette: cream/ivory bg, ink text, rose + gold accents. See `main.css :root`.
  - Button variants: `.btn-primary` (ink), `.btn-ghost` (outlined ink), `.btn-gold`, `.btn-outline-light` (on dark bg).
- **Responsive:** test at 375 / 768 / 1024 / 1440. Grids collapse to 1 column on mobile.
- **Accessibility:** `alt` on every image, `aria-label` on icon-only links, visible focus states, WCAG AA contrast.
- **Motion:** subtle `fade-up` on scroll + 1s ease hover scales on photos. No jarring animation.
- **One primary CTA per section.** About page had multiple menu CTAs — that was explicitly called out as wrong.
- **Loading/empty/error states:** N/A (fully static). If the Square API is integrated later, add proper states then.

## Menu data rules

- **Categories** mirror the real site exactly: Individual Cakes, Whole Cakes, Pastries, Viennoiseries, Easter Chocolate Buddies, Drinks & Pantry.
- **Verified direct prices:** Choux à la Crème $5.50, Raspberry-Almond Croissant $6.50, Tiramisu $14.25, Choco-Hazelnut Tart $10.75.
- Other prices likely came from Uber Eats (with marketplace markup) — leave a `TODO` in a comment if you see one that needs verification.
- **Allergens:** use the `.allergen` pill component for nuts. Goes under `.menu-item-tags`, separated by a dashed border.
- **Photoless items:** `.menu-item.no-photo` with `.mono` label (e.g. `— cake`, `— viennoiserie`).

## Gallery rules

- Organized by **chapter** (Signatures, Viennoiseries, etc.), not infinite masonry.
- Hover reveals `<figcaption>` with item name + one-line description.
- Click opens lightbox with caption (pulled from `data-name` or figcaption h4).
- **Don't show the same photo twice** in one chapter.

## API / data rules

- No APIs yet. Site is fully static.
- **Forms** (newsletter, contact, pre-order) use `mailto:` as the action. Not a real service.
- When the client wires up **Square Orders API** later:
  - Keep all keys/tokens out of the repo. Use env vars + a serverless function or dedicated backend.
  - Don't embed Square customer IDs or PII in the HTML.

## Security / privacy

- **No secrets in code.** Site is fully public.
- **No PII or analytics** currently shipped. If analytics is added, use a privacy-respecting option (Plausible, Fathom) — no Google Analytics without discussion.
- No auth or sessions.
- Google Maps iframe and Square gift card link are the only external embeds.

## Git / workflow rules

- **Remote:** `https://github.com/momentumedia/saishas-patisserie-website` (public, GitHub Pages deploys from `main`).
- **Default branch:** `main`. Working branches optional; small changes go straight to `main`.
- **Commits:** Short imperative subject. Body if it helps ("Fix nav logo sizing on mobile"). Don't commit AI boilerplate co-author lines unless the user wants them.
- **Never:** force-push `main`, rewrite history, or change the git remote without asking.
- **Don't commit:** `.DS_Store`, `.env`, secrets, or unrelated files. Keep commits focused on one change.
- **Deploy:** happens automatically via GitHub Pages on push to `main` (~1 minute).
- **Destructive actions** (deleting images, renaming routes, changing the remote) require explicit user approval.

## Review checklist (run before finishing)

- [ ] `grep -c '—' *.html` returns 0 on every page
- [ ] No broken image refs (run the grep from "Definition of done")
- [ ] Changed pages open in browser, no console errors
- [ ] Mobile layout at 375px doesn't break
- [ ] No new stock photos
- [ ] No fabricated facts added to copy
- [ ] Nav + footer still consistent across all 7 pages
- [ ] Single commit with a meaningful message
- [ ] Pushed to `main` (live site updates automatically)

## Known pitfalls

- **Cloudflare blocks `saishaspatisserie.ca` scraping.** Don't attempt; ask user for real copy.
- **`hero-croissants.jpg` is Unsplash**, not Saisha's. User explicitly approved. Don't swap unless replacing with a real photo.
- **`audit.html` has a different nav** (no Gift Card link, CTA says "New Site"). That's intentional.
- **`order.html` exists** but nothing links to it yet (all CTAs point to `#`). Don't delete; repurpose when Square is wired up.
- **Logo variants:** `logo-dark.png` for light bg (nav), `logo-transparent.png` for dark bg (footer). The `.jpg` files in `images/logo/` are legacy originals — don't use them.
- **Instagram grids are faked:** tiles link to @saisha.patisserie but display curated real product photos, not actual IG posts.
- **`components.css` is long.** Section headers matter. Don't break naming when adding new sections.
- **About page length is closely watched.** The user has asked for it to be more concise several times. Keep it minimal.

## TODOs

- [ ] Get real About page copy from the owner (currently inferred — "French-Japanese" framing not verified)
- [ ] Add a page for the owner's other restaurant (name + details pending from user)
- [ ] Wire Order Online buttons to Square Orders API when available
- [ ] Replace mailto newsletter with Mailchimp/Klaviyo or similar
- [ ] Swap `hero-croissants.jpg` for a real Saisha's hero photo when available
- [ ] Verify all remaining menu prices against direct-site pricing
- [ ] Proper multi-size favicon (currently a cropped PNG)
- [ ] Consider custom domain (e.g. `www.saishaspatisserie.ca`) instead of GitHub Pages URL
