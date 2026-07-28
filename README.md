# KLIM Sales Floor

**A shop-floor product training resource for staff selling KLIM motorcycle gear.**

Every KLIM product in the range gets a researched markdown file and a matching
web card: the pitch, the specs, the CE rating, the price, and the answers to the
questions customers actually ask. Built to be scanned in under two minutes while
standing next to a customer.

Static site. No build step, no backend, no dependencies.

---

## Contents at a glance

| | |
|---|---|
| **Product cards** | 42 (17 jackets · 9 gloves · 8 pants · 3 boots · 3 helmets · 2 layers) |
| **Comparison tables** | 4 (jackets · pants · gloves · helmets) |
| **Research files** | 44 markdown files in `Files/` |
| **Dependencies** | None. Vanilla JS, one CSS file, Google Fonts over CDN |

---

## Run it

Serve the folder and open it in a browser:

```bash
python -m http.server 8000
```

Then visit <http://localhost:8000>.

Opening `index.html` straight off disk works too, but serving is better — image
paths and future `fetch`-based loading both behave properly that way.

### Pages

| URL | What it is |
|---|---|
| `index.html` | The catalog. Products bucketed into collapsible category groups. Fold state is remembered in `localStorage`. |
| `product.html?id=<id>` | One product card. Hero, the pitch, specs, audience, price, quotes, FAQ accordion, sources. |
| `comparisons.html` | Side-by-side comparison tables, one visible at a time via a tab rail. |
| `klim_demo.html` | Legacy single-file build (all CSS/JS/content inlined) for emailing or dropping on a USB stick. **Stale** — see [Known gaps](#known-gaps--next-steps). |

---

## How it works

The core idea: **the research markdown is the source of truth.** Nothing on
screen is hand-written HTML. A product file holds the markdown; the parser turns
headings into typed sections; a renderer draws each section type its own way.

```
Files/KLIM_Marrakesh_Jacket.md      research, written first
        │  (copied into)
        ▼
products/marrakesh.js               window.KLIM_PRODUCTS.push({ id, group, image, markdown })
        │
        ▼
assets/js/parser.js                 markdown → { title, sections[{ type, lines }] }
        │
        ├─→ assets/js/render-index.js      catalog cards (name, hook, price, badges)
        └─→ assets/js/render-product.js    the full product page
```

The parser classifies each `##` heading by keyword and the renderer picks a
layout to match:

| Heading contains | Section type | Rendered as |
|---|---|---|
| `what it is`, `overview`, `about` | `intro` | Intro lede |
| `top selling`, `selling point` | `selling` | **Big numbered pitch cards — the hero of the page** |
| `at a glance`, `comparison`, ` vs ` | `comparison` | Generation-comparison table |
| `feature` | `features` | Two-column technical spec grid |
| `who`, `audience` | `audience` | Bulleted audience list |
| `price`, `cost` | `price` | Price cards |
| `quote`, `notable`, `callout` | `quotes` | Quote wall |
| `question`, `faq` | `faq` | Expandable accordion |
| `source` | `sources` | Collapsed-by-default sources panel |
| anything else | `generic` | Clean generic panel |

Sections are re-ordered into a fixed sales-learning flow regardless of the order
they appear in the markdown — intro, pitch, comparison, features, audience,
price, quotes, FAQ, then sources last.

Comparison tables work differently: they are hand-structured data
(`comparisons/*.js`), not markdown, because the cells carry typed meaning — CE
badges, ventilation dot meters, membrane tags, price cells.

Full detail in **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)**.

---

## Repository layout

```
index.html                  catalog page
index_multifile.html        byte-identical copy of index.html (nav links point here)
product.html                single product page, reads ?id=
comparisons.html            comparison tables page
klim_demo.html              legacy self-contained single-file build

assets/
  css/styles.css            the entire design system — tokens, both page themes
  js/parser.js              markdown → structured sections (shared by every page)
  js/render-index.js        builds the catalog
  js/render-product.js      builds the product page
  js/render-comparisons.js  builds the comparison tables
  js/app.src.js             unwired SPA rewrite (hash router) — not loaded by any page
  img/                      42 product photos
  img_orig_backup/          pre-processing originals

products/                   one .js per product — the markdown lives here
comparisons/                one .js per comparison table — structured cell data
Files/                      the research markdown, plus PROJECT_BRIEF.md
```

---

## Adding content

Short version — a new product is three steps:

1. Write the research file in `Files/` following the standard section headings.
2. Copy `products/marrakesh.js` to `products/<Your_Product>.js`, set `id` /
   `group` / `image`, and paste the markdown in.
3. Add one `<script>` line inside the `<!-- PRODUCTS -->` block in **both**
   `index.html` and `product.html`.

Full instructions, the field reference, the comparison-table cell types, and the
non-negotiable content rules (CE ratings, sourcing, Motolegends quotes) are in
**[CONTRIBUTING.md](CONTRIBUTING.md)**.

`Files/PROJECT_BRIEF.md` is the content bible — the file format, the CE
standards reference, the technology glossary, and the ten gotchas staff most
often get wrong. Read it before writing a product file.

---

## Content rules worth repeating here

These exist because getting them wrong on the shop floor is a safety problem,
not a typo:

- **Never guess a CE rating.** State the exact standard and level from the
  product page. If it isn't published, say so explicitly — never infer it.
- **Never present an uncertified product as certified.** The Dakar Jacket has no
  CE certification and ships with no armour. The Transition GTX is not a
  motorcycle boot.
- **Keep critical quotes in.** Where Motolegends have been candid about a
  product's weaknesses, that stays in the file — staff need to know it before
  the customer does.
- **Cross-reference three sources** before writing: klim.com, the Motolegends
  product page and written review, and Motolegends YouTube.

---

## Known gaps / next steps

Honest list of what's rough:

- **Boots sort last in the catalog.** The three boot files declare
  `group: 'Boot'`, but `GROUP_ORDER` in `render-index.js` expects `'Boots'`, so
  they fall through to the unknown-group bucket. One-word fix in three files.
- **`index.html` and `index_multifile.html` are byte-identical duplicates**, and
  the site's nav links point at `index_multifile.html`. One should go.
- **Product registration is manual and duplicated** — every new product needs the
  same `<script>` line pasted into two HTML files. 42 products means 84 lines
  kept in sync by hand.
- **`Files/*.md` and `products/*.js` are copies of each other.** Editing the
  research file does not update the site; the markdown has to be re-pasted. A
  small build step (or `fetch`ing the `.md` at runtime) would remove this.
- **`assets/js/app.src.js` is not loaded by anything** — it's a started-but-
  unfinished SPA rewrite with a hash router that would replace all three
  renderers. Either finish it or delete it.
- **`klim_demo.html` is stale** — it bundles 12 products and has no comparisons
  view. Regenerate it or drop it.
- **Images are unoptimized.** ~22 MB of full-size PNGs, several over 1 MB each.
  Resizing to display size and converting to WebP would cut this by ~90%.
- **`Parexlank Stage Report.pdf` and `test.txt`** are unrelated to the project
  and are just sitting in the repo root.

Fixed along the way: `Files/KLIM_M~1.MD` (the Marrakesh Jacket research, saved
under a mangled 8.3 short name) collided with `KLIM_Marrakesh_Glove.md` on
Windows, so Windows clones silently ended up with the wrong content in one of
the two files. It's now `Files/KLIM_Marrakesh_Jacket.md`.

---

## Notes

Internal staff training prototype for Motolegends. Not affiliated with, endorsed
by, or produced by KLIM. All product names, photography, trademarks, and quoted
editorial remain the property of their respective owners and are used here for
internal reference only — not for publication or redistribution.

Prices are USD from klim.com and change often. UK pricing is always "confirm
in-store."
