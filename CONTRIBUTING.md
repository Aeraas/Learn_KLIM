# Adding content

Two kinds of content live here: **product cards** (driven by markdown) and
**comparison tables** (driven by structured data). They're added differently.

Before writing anything, read `Files/PROJECT_BRIEF.md` — it holds the file
format, the CE standards reference, the technology glossary, and the list of
things staff most often get wrong.

---

## 1. Add a product

### Step 1 — write the research file

Create `Files/KLIM_<Product_Name>.md` using exactly these headings. The parser
recognises them by keyword, so the wording matters:

```markdown
# KLIM [Product Name]

## What it is
One paragraph. What it is, what it does, who it's aimed at.

## Who it's for
- **Bullet list** of ideal customers
- Finish with a "Not suited to" line

## Key features
- **Label:** value — the `**Label:**` prefix becomes the left column of the spec grid
- Technical specs, materials, protection systems. Be precise.

## Top selling points
1. **Headline sentence.** Then the body — what to lead with, how to pitch it.
2. Numbered, 1–5. These become the big pitch cards; they're the hero of the page.

## Price
- **US:** $XXX.XX
- **UK:** confirm in-store

## Notable quotes
- *"Quoted line from Motolegends editorial or a customer review."*

## Common questions + answers
**Will it keep me dry in heavy rain?**
The honest answer, including the caveats.

## Sources
- [KLIM product page](https://…)
- [Motolegends product page](https://…)
- [Motolegends YouTube review](https://…)
```

Optional extra section: a `## At a glance` or `## Gen 2 vs Gen 3` markdown table
for multi-generation products — it renders as a comparison table inside the
card.

**Research rules — non-negotiable:**

- Cross-reference three sources before writing: klim.com, the Motolegends
  product page + written review, and Motolegends YouTube.
- Never guess a CE rating. State the exact standard and level. If the level
  isn't published, say so explicitly — do not infer it.
- Never present an uncertified product as certified.
- Preserve Motolegends quotes exactly, including the critical ones. If they've
  called out a weakness, staff need to know it.
- Same product across generations with similar specs → **one file** with a
  comparison table at the top. Genuinely different positioning → separate files.

### Step 2 — create the data file

Copy `products/marrakesh.js` to `products/<Your_Product>.js` and edit:

```js
window.KLIM_PRODUCTS = window.KLIM_PRODUCTS || [];
window.KLIM_PRODUCTS.push({
  id: 'Badlands_Pro_Jacket',              // required — the ?id= in the URL, must be unique
  group: 'Jackets',                       // catalog section (see table below)
  category: 'Adventure/Touring Jacket',   // small label above the card title
  image: 'assets/img/Badlands_Pro_Jacket.png',
  accent: '#FF4D1C',                      // optional per-product accent colour
  badges: ['CE AA', 'GTX 3L Pro', 'Level 2 Armour'],  // max 3 show on the card
  markdown: `# KLIM Badlands Pro Jacket
  …paste the whole research file here…
`
});
```

| Field | Required | Notes |
|---|---|---|
| `id` | yes | Used in `product.html?id=…`. Keep it identical to the filename. |
| `markdown` | yes | Everything on screen is derived from this. |
| `group` | no | Defaults to `Other`. Valid: `Jackets`, `Pants`, `Gloves`, `Boots`, `Helmets`, `Layers`, `Accessories`, `Other`. Anything else sorts to the end. |
| `category` | no | Free text. |
| `image` | no | Falls back to the product's initials if omitted. |
| `accent` | no | Any CSS colour. Overrides `--accent` on that product's page. |
| `badges` | no | Hero chips. The catalog card shows the first three. |

> **Watch the `group` spelling.** It must match `GROUP_ORDER` in
> `assets/js/render-index.js` exactly. The existing boot files say `'Boot'`
> instead of `'Boots'`, which is why boots currently sort last.

The markdown goes in a template literal, so escape any backticks and `${` inside
it.

### Step 3 — register it

Add one line inside the `<!-- PRODUCTS -->` block in **both** `index.html` and
`product.html`:

```html
<script src="products/Badlands_Pro_Jacket.js"></script>
```

Miss one and the product either vanishes from the catalog or 404s when opened.

### Step 4 — check it

```bash
python -m http.server 8000
```

Open the catalog, confirm the card appears in the right group, click through,
and check every section rendered as the right *type* — a mis-keyworded heading
falls back to a generic panel, which is the usual symptom of a typo.

---

## 2. Add a comparison table

Comparison tables are **not** markdown — the cells carry typed meaning (CE
badges, ventilation meters, membrane tags), so they're written as data.

Copy `comparisons/glove-comparison.js` as a starting point:

```js
window.KLIM_COMPARISONS = window.KLIM_COMPARISONS || [];
window.KLIM_COMPARISONS.push({
  id: 'gloves',
  navLabel: 'Gloves',                    // tab rail label
  title: 'Which glove is right for you?',
  subtitle: 'Confirm current in-store prices and stock',
  rowHeader: 'Gloves',                   // top-left corner cell

  columns: [
    { num: '1', name: 'Induction', sub: "Women's", img: 'assets/img/Induction_Glove.png' }
  ],

  rows: [
    { type: 'sec', label: 'Waterproofing' },
    { type: 'sym', label: 'Waterproof', cells: ['y', 'a', 'y'] }
  ],

  notes: [
    { lead: 'Dakar:', rest: 'No CE certification at all — off-road only.' }
  ]
});
```

Every `cells` array must have exactly the same length as `columns`.

### Row types

| `type` | Cell shape | Renders as |
|---|---|---|
| `sec` | *(no cells — uses `label` only)* | Full-width section divider row |
| `sym` | `'y'` or `'a'` | ✓ / — symbol |
| `symc` | `{ code, note }` | Symbol plus a short caption underneath |
| `tag` | `{ text, tone }` | Pill. Tones: `gtx3`, `gtx2`, `dwr`, `none` |
| `ce` | `{ rating, note }` | CE badge. Ratings: `AAA`, `AA`, `A`, `B`, `None`, `NP` |
| `vent` | `{ dots, label }` | 5-dot meter plus a label — `dots` is 0–5 |
| `num` | `'12'` | Emphasised number |
| `price` | `'$299.99'` | Price cell |
| `text` | `'Carbon fibre'` | Plain escaped text |

`notes` renders as the ⚠ **STAFF MUST KNOW** callout under the table — use it for
anything that would embarrass a staff member who didn't know it.

The legend below each table is defined once in `assets/js/render-comparisons.js`
(the `LEGEND` array) and is shared by every table. Add new symbols there.

Finally, register the file in `comparisons.html` inside the
`<!-- COMPARISONS -->` block:

```html
<script src="comparisons/glove-comparison.js"></script>
```

---

## 3. Add an image

Drop the file in `assets/img/` named after the product
(`Badlands_Pro_Jacket.png`), and reference it from the product's `image` field
and from any comparison column that shows it.

Source images are large. Before committing, resize to roughly 800 px on the long
edge — several files in `assets/img/` are over 1 MB and shouldn't be.
`assets/img_orig_backup/` holds the untouched originals.

---

## House style

- **Vanilla JS, no build, no dependencies.** Everything must work from a plain
  static server. Don't add a framework or a package manager.
- **ES5-flavoured, IIFE-wrapped.** Match the existing files: `'use strict'`,
  `var`, `function` callbacks. It's consistent throughout — keep it that way.
- **Escape everything.** Use `K.escText` / `K.escAttr` for plain values and
  `K.inline` where markdown formatting should survive. Never concatenate raw
  content into HTML.
- **Derive, don't duplicate.** If something on screen can be read out of the
  markdown, read it out of the markdown.
- Two-space indent, single quotes, semicolons.
