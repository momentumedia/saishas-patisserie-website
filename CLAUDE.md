# CLAUDE.md

Instructions for any coding agent working on this repo. Read this first.

## Top priorities (non-negotiable)

1. **Only use real photos from `images/real/`** — never introduce stock photos (Unsplash, Pexels, etc.) without explicit user approval. If a menu item has no real photo, use the `.no-photo` card variant.
2. **No em dashes (`—`) or en dashes (`–`) in prose.** Use periods, commas, or `·` (middle dot). Hyphens in compound words (pre-order, three-day) are fine. This is a hard rule — the user finds em dashes "too AI."
3. **Never fabricate facts.** Don't invent stats ("three-day lamination", "photographed this morning"), press mentions, founder backstories, or operational details. The brand positioning ("French-Japanese fusion") was inferred from menu items (black sesame choux, yuzu tart, Hokkaido matcha). If unsure, leave a TODO.
4. **Order Online CTA is a placeholder.** `href="#"` everywhere until the client wires up Square's Orders API. Do NOT link it to Uber Eats.
5. **Downtown Dollars means accept, not serve.** It's a local London, ON gift-certificate program. "Accept Downtown Dollars" is correct.

## Project overview

- **What it is:** Static marketing + menu website for Saisha's Pâtisserie, a real bakery at Unit 4-208 Piccadilly Street, London, Ontario.
- **Primary users:** Prospective customers browsing the menu, ordering whole cakes, visiting the shop. Secondary: the owner reviewing the rebuild vs. old site.
- **Business goal:** Replace the current Weebly/EditMySite-based `saishaspatisserie.ca`. Improve SEO, mobile, speed, brand feel, and conversion to first-party ordering.
- **The old site:** JavaScript-rendered behind Cloudflare. Scraping blocked. The `audit.html` page documents the old site's problems; do not delete it.

## Tech stack

- **Pure static:** HTML5 + CSS3 + vanilla JavaScript. No framework, no bundler, no package.json.
- **No build step.** Open `index.html` in a browser — that's the dev loop.
- **External deps:** Google Fonts (Cormorant Garamond, Inter, Dancing Script), Google Maps embed iframe.
- **Deployment target:** TODO — not yet deployed. Should deploy to Netlify, Cloudflare Pages, or GitHub Pages (no server required).

## Repo structure

```
saishas-patisserie/
├── index.html              Home
├── menu.html               Full menu (Individual Cakes, Whole Cakes, Pastries, Viennoiseries, Easter, Drinks & Pantry)
├── about.html              Story + What We Believe + Neighbourhood (kept SHORT)
├── gallery.html            Editorial magazine-style chapters (Signatures, Viennoiseries, Tarts, Whole Cakes, Seasonal, Packaging)
├── order.html              Placeholder ordering page
├── contact.html            Quick-action tiles + hours + form + social + map
├── audit.html              Old-site audit (AIRMS-style: 3 Critical / 3 High / 3 Medium)
├── css/
│   ├── main.css            Design tokens, typography, layout, buttons, utilities
│   └── components.css      Nav, hero, marquee, cards, gallery, forms, footer, allergen, social SVG
├── js/
│   └── main.js             Nav scroll state, mobile toggle, fade-up IntersectionObserver, menu tab smooth-scroll, gallery filters, lightbox
└── images/
    ├── real/               ⭐ All real Saisha's product photos (webp mostly). Source of truth.
    ├── hero/               hero-croissants.jpg (homepage background), hero-real.jpg (spread)
    ├── gallery/            Copies of real photos for legacy refs
    └── logo/               logo-dark.png (nav, black-on-transparent), logo-transparent.png (footer, white-on-transparent). DO NOT use .jpg versions.
```

## Local development

- **Dev loop:** `open index.html` on macOS. No server needed.
- **Live-reload (optional):** `python3 -m http.server 8000` from repo root, then `http://localhost:8000`.
- **No install/build/test/lint commands** — intentionally no tooling.

## Definition of done

Before calling any change complete:

1. **No broken image refs.** Run:
   ```bash
   grep -hoE 'images/[a-zA-Z0-9/_.-]+\.(jpg|jpeg|png|webp|svg)' *.html css/*.css | sort -u | while read -r img; do [ ! -f "$img" ] && echo "MISSING: $img"; done
   ```
2. **No em dashes.** Run: `grep -c '—' *.html` — must be 0 for every file.
3. **Open `index.html`** in browser. Check: nav logo + CTA render, hero reads correctly, all sections load, no console errors.
4. **Mobile check:** browser dev tools at 375px. Nav collapses, hero is readable, grids stack.
5. **All nav links work** across every page (check for dead links after structural changes).

## Coding rules

### HTML
- Semantic tags: `<section>`, `<article>`, `<figure>`, `<nav>`, `<header>`, `<footer>`.
- Every image needs `alt` text. Real product photos: use the actual item name.
- Every external link: `target="_blank" rel="noopener"`.
- Phone numbers use `tel:`, emails use `mailto:`.
- Breadcrumb on every inner page.

### CSS
- **Design tokens live in `css/main.css` `:root`.** Don't hardcode colours — use `var(--rose)`, `var(--ink)`, etc.
- **Two stylesheets only:** `main.css` (tokens, reset, type, layout, utilities) and `components.css` (everything else). Don't create new CSS files.
- Mobile-first media queries: `@media (max-width: 900px)` etc.
- **Consistent naming:** kebab-case classes (`.menu-item`, `.hero-content`). BEM-ish modifiers (`.menu-item.no-photo`, `.audit-issue.critical`).
- Animations: use `var(--ease)` (`cubic-bezier(0.16, 1, 0.3, 1)`) and the existing `var(--t-fast|med|slow)` durations.

### JavaScript
- **One file only:** `js/main.js`. Don't add dependencies or split into modules.
- Pure vanilla DOM. No jQuery, no frameworks.
- Feature-detect (`if (lb)` before attaching lightbox listeners, etc.).
- Use IntersectionObserver for any scroll-triggered reveal — never scroll events for performance.

### Writing / copy
- **Voice:** first-person plural ("we"), warm, confident, specific. Not "passionate" or "curated."
- **Short sentences.** Use periods not commas when possible.
- **Prices always with `$` prefix** (Canadian context, no "CAD" unless explicitly needed).
- **Hours format:** "Tuesday to Thursday · 9am to 5pm" (not "9am-5pm" or "9am–5pm").
- **No phrases to avoid:** "three-day lamination", "photographed this morning", "signature since 1992", "artisan" (overused), "curated selection", "passionately crafted".
- **Google review quote** lives on home page only. Don't duplicate.

### File/component size
- HTML pages: all sections inline is fine (no partials). Keep `<head>` consistent across pages.
- CSS: `components.css` is long (1000+ lines). Acceptable. New components go in logical sections with a `/* ========= */` comment header.
- JS: keep it under 200 lines. Split only if it legitimately doubles.

## UI/UX rules

- **Design system:**
  - Fonts: Cormorant Garamond (display, italic for headers), Inter (body), Dancing Script (script accent)
  - Palette: cream/ivory backgrounds, ink text, rose + gold accents. See `main.css :root`.
  - Buttons: `.btn-primary` (ink), `.btn-ghost` (outlined ink), `.btn-gold` (gold), `.btn-outline-light` (on dark).
- **Responsive:** test at 375 / 768 / 1024 / 1440. Grids must reflow to 1 column on mobile.
- **Accessibility:** alt text on all images, aria-labels on icon-only links, focus states on interactive elements. Colour contrast passes WCAG AA.
- **Animations:** subtle `fade-up` on scroll, hover scales on photos (1s ease). No jarring motion.
- **One primary CTA per section.** Multiple menu CTAs on the About page was explicitly called out as wrong.

## Menu data rules

- **Categories** match the real site exactly: Individual Cakes, Whole Cakes, Pastries, Viennoiseries, Easter Chocolate Buddies, Drinks & Pantry.
- **Prices** on menu.html come from multiple sources — Uber Eats JSON-LD has markup, direct-site prices are lower. Always prefer direct-site prices when known.
  - Known verified direct prices: Choux à la Crème $5.50, Raspberry-Almond Croissant $6.50, Tiramisu $14.25, Choco-Hazelnut Tart $10.75.
  - Uber Eats prices left elsewhere need verification — mark with TODO if changing.
- **Allergens:** use the `.allergen` pill component for Nuts (and future dairy/gluten). Goes under the `.menu-item-tags` row, separated by a dashed border.
- **Photoless items:** use `.menu-item.no-photo` with `.mono` label (e.g. `— cake`, `— viennoiserie`).

## Gallery rules

- Photos are organized by **chapter**, not infinite masonry.
- Hover reveals `<figcaption>` with item name + one-line description.
- Click opens lightbox with caption (pulled from `data-name` or figcaption h4).
- **Never show the same photo twice in one chapter.**

## Git / workflow rules

- Remote: `https://github.com/momentumedia/saishas-patisserie-website` (private).
- Default branch: `main`.
- Commit messages: short subject + body when needed. Current convention: "Initial commit: ..." style.
- **Never commit** `.DS_Store`, `.env`, or any files ignored by `.gitignore`.
- **Never rewrite history** on `main` (no force-push).
- **Ask before** deleting images, renaming routes, or changing the git remote.

## Known pitfalls

- **Cloudflare blocks scraping of `saishaspatisserie.ca`.** Don't spend effort trying to fetch content from it. Ask the user to paste real copy.
- **The `hero-croissants.jpg` image is Unsplash**, not Saisha's. User approved it specifically — don't remove unless replacing with a real equivalent.
- **`audit.html` has a different nav** (no Gift Card link, "New Site" button instead of "Order Online"). Keep that intentional.
- **`order.html` exists** but all nav/CTAs link to `#` instead. The page itself remains until Square API is wired up.
- **Logos:** `logo-dark.png` is for light backgrounds (nav), `logo-transparent.png` is for dark backgrounds (footer). The `.jpg` versions in the logo folder are legacy originals, don't reference them.
- **Instagram embed is faked** — tiles link to @saisha.patisserie but use curated real photos, not actual IG posts.
- **Newsletter form** posts to `mailto:saishaspatisserie@gmail.com`. No real email service integration. TODO: wire Mailchimp/Klaviyo.

## TODOs

- [ ] Replace hero-croissants.jpg with a real Saisha's photo when one is available
- [ ] Wire Order Online buttons to Square Orders API when available
- [ ] Replace mailto-based newsletter with Mailchimp/Klaviyo
- [ ] Get the real About page copy from the owner (currently inferred)
- [ ] Add a page for the owner's other restaurant (name + details pending)
- [ ] Deploy: Netlify or Cloudflare Pages recommended
- [ ] Favicon optimization (use a proper multi-size .ico)
- [ ] Verify all menu.html prices against direct-site pricing

## Review checklist before finishing any task

- [ ] `grep -c '—' *.html` returns 0 on every page
- [ ] No broken image refs (run the grep command in Definition of Done)
- [ ] Changed pages open in browser without console errors
- [ ] Mobile layout doesn't break at 375px
- [ ] No new stock photos introduced
- [ ] No fabricated facts added to copy
- [ ] Nav + footer consistent with other pages
- [ ] Git commit has meaningful message, no unrelated files staged
