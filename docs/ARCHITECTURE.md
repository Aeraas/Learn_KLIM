# Architecture

How the site is put together, and why it's built this way.

## The constraint that shapes everything

This runs on shop-floor machines and staff phones, gets opened off a USB stick or
a local server, and is maintained by whoever is writing the product research —
not by a front-end team. So: **no build step, no package manager, no framework.**
Three HTML files, one stylesheet, four scripts, and a pile of data files.

The trade-off is manual registration (every product needs a `<script>` tag) in
exchange for a codebase that will still open and run untouched in five years.

## Data flow

```
                    Files/KLIM_Marrakesh_Jacket.md     ← research, written first
                                  │
                                  │  (copied by hand)
                                  ▼
                        products/marrakesh.js
                                  │
                                  │  window.KLIM_PRODUCTS.push({ … })
                                  ▼
   ┌──────────────────── assets/js/parser.js ────────────────────┐
   │  parse(md) → { title, sections: [{ heading, type, lines }] } │
   └──────────────────────────────────────────────────────────────┘
                    │                          │
                    ▼                          ▼
        render-index.js                render-product.js
        catalog cards                  full product page
```

Every script is an IIFE that registers into a global. Load order in the HTML is
the dependency graph:

1. `parser.js` — publishes `window.KLIM` (the shared toolkit)
2. `products/*.js` — each pushes onto `window.KLIM_PRODUCTS`
3. `render-*.js` — reads both on `DOMContentLoaded`

## The parser

`assets/js/parser.js` is the only piece of shared logic. It publishes
`window.KLIM` with three groups of helpers.

### Structure

`parse(md)` walks the markdown line by line:

- `# Heading` → the product title
- `## Heading` → starts a new section, classified by keyword
- `---` → dropped
- everything else → accumulated into the current section's raw `lines`

`classify(heading)` does substring matching against lowercased headings and
returns a section *type*. The check order matters — `comparison` is tested before
`features`, so a heading like "Feature comparison" resolves to `comparison`.

Sections are then **re-sorted into a fixed teaching order**, regardless of the
order they appear in the file:

```js
['intro', 'selling', 'comparison', 'features', 'audience',
 'price', 'quotes', 'faq', 'generic', 'sources']
```

The pitch comes second and sources always come last. Unknown types sort with
`generic` and hold their relative position (the sort is stabilised by an `origin`
index captured before sorting).

### Blocks

`toBlocks(lines)` groups raw lines into `{ kind: 'p' | 'ul' | 'ol' | 'table' }`.
It handles indented continuation lines (they get appended to the previous list
item) and markdown pipe tables (the `|---|---|` separator row is dropped).

Two splitters carry most of the visual weight:

- `splitLabel('**Shell:** 1000D Cordura')` → `{ label: 'Shell', value: '1000D Cordura' }`
  — this is what turns a flat bullet list into the two-column spec grid.
- `splitHeadline('**Comfort closes the sale.** Motolegends describe…')` →
  `{ head, body }` — this is what turns a numbered list into pitch cards.

So the `**bold prefix**` convention in the research files isn't cosmetic; it's
the layout instruction.

### Derived summaries

`tagline()` and `priceSummary()` exist so the catalog card can be built from the
same markdown without a second data source. `tagline()` takes the first selling
point's headline, falling back to the first sentence of the intro.
`priceSummary()` regex-matches the first currency figure in the price section.

### Escaping

Three levels, and picking the right one matters because all rendering is string
concatenation:

| Helper | Use for |
|---|---|
| `escText(s)` | Plain text going into an element |
| `escAttr(s)` | Anything going into an attribute |
| `inline(s)` | Content where `**bold**`, `*italic*`, `` `code` `` and `[links](…)` should render |

`inline()` escapes first, then re-introduces the markdown constructs — so
untrusted angle brackets can't survive. Links get
`target="_blank" rel="noopener noreferrer"` automatically.

## The renderers

### `render-index.js`

Buckets products by `group`, orders the buckets by `GROUP_ORDER`, and renders
each as a collapsible `<section>`. Unknown groups sort alphabetically **after**
the known ones, with `Other` last.

Fold state persists per group in `localStorage` under `klim-catalog-folds`;
groups default to open. Cards fade in via `IntersectionObserver`, with a
no-observer fallback that just marks everything visible.

> **Known bug:** the boot product files declare `group: 'Boot'`, but
> `GROUP_ORDER` lists `'Boots'`. Boots therefore land in the unknown-group bucket
> and sort last. Fix by changing the three files in `products/` (or by adding the
> singular to `GROUP_ORDER`).

### `render-product.js`

Reads `?id=` from the URL, finds the product in `window.KLIM_PRODUCTS`, and falls
back to the first registered product if the id is missing or unknown.

The core is a lookup table from section type to render function:

```js
var RENDERERS = {
  intro, audience, features, selling, comparison,
  price, quotes, faq, sources, generic
};
```

Adding a new section type means adding a `classify()` keyword, a renderer, an
entry in `RENDERERS`, a label in `LABELS`, and a position in `ORDER`.

The `selling` section gets `.section--feature` — that's what makes the pitch
cards visually dominant.

Page interactivity is all in `wire()`:

- **Accordions** — FAQ answers animate via explicit `maxHeight` set from
  `scrollHeight` on toggle.
- **Reveal on scroll** — `IntersectionObserver`, skipped entirely under
  `prefers-reduced-motion: reduce`.
- **Scroll-spy** — a second observer with a `-45% 0px -50% 0px` root margin, so a
  section activates the side-nav dot when it crosses the middle of the viewport.
- **Progress bar** — a passive scroll listener driving `transform: scaleX()`.

### `render-comparisons.js`

The one place that doesn't read markdown. Comparison cells carry typed meaning —
a CE rating badge, a five-dot ventilation meter, a membrane pill — so the data is
authored as structured objects instead.

Row `type` selects a cell renderer (`cellHTML`). Zebra shading restarts under
every `sec` divider, matching the printed staff sheet the tables came from.

Tables are tab-panels: only one is visible at a time, wired with
`role="tablist"` / `aria-selected` / `hidden`.

> The `SYM` map defines only `y` (✓) and `a` (—). Several data files document a
> `'n'` code in their header comments, but it isn't implemented — it would fall
> back to the `a` glyph. No current data uses it; either implement it or correct
> those comments.

### `app.src.js`

Not loaded by any page. It's an in-progress rewrite that merges all three
renderers behind a hash router (`#/`, `#/p/<id>`, `#/compare`) and resolves
images through a `window.KLIM_IMG` base64 map, so the whole site can be shipped
as a single HTML file. `klim_demo.html` is an earlier output of that idea — it
inlines 12 products and has no comparisons view.

Decide one way or the other: finish the SPA and regenerate the single-file build
from all 42 products, or delete both and keep the multi-file site.

## CSS

One file, `assets/css/styles.css`, in five parts: design tokens, index page,
product page, motion, responsive — plus a comparisons block scoped under
`.page-comparisons`.

Tokens live in `:root`: a dark neutral ramp (`--bg` → `--panel-2` → `--line`),
text colours, one accent (`--accent`, KLIM yellow), three type families
(Oswald display / Inter body / JetBrains Mono), and layout constants.

Per-product accents work by overriding `--accent` on `documentElement` at render
time, and per-card accents via an inline `--card-accent` custom property. Page
themes are switched by a body class (`page-index`, `page-product`,
`page-comparisons`) rather than by loading different stylesheets.

Google Fonts is the only external request on any page. Everything else is local.

## Adding a new section type — worked example

Say research files start carrying a `## Fit & sizing` section that should render
as its own panel style:

1. **`parser.js` → `classify()`** — add
   `if (h.indexOf('fit') > -1 || h.indexOf('sizing') > -1) return 'fit';`
   above the `generic` fallback, minding the ordering against existing keywords.
2. **`parser.js` → `ORDER`** — insert `'fit'` where it belongs in the flow
   (probably after `features`).
3. **`render-product.js` → `LABELS`** — `fit: 'Fit & sizing'`.
4. **`render-product.js`** — write `renderFit(s)`, using `K.toBlocks(s.lines)`
   and `K.inline()`.
5. **`render-product.js` → `RENDERERS`** — register `fit: renderFit`.
6. **`styles.css`** — style it under the product-page block.

Until step 5 the section still renders — as a generic panel. That fallback is
deliberate: a new heading never breaks a page, it just looks plain.
