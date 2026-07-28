# Working in this repo

Staff training site for KLIM motorcycle gear. Static, no build, no dependencies.
Read `README.md` for the overview and `docs/ARCHITECTURE.md` before changing any
rendering logic.

## Ground rules

- **No build step, no framework, no package manager.** Everything must run from a
  plain static server. This is a hard constraint, not a preference.
- **Match the existing JS style:** IIFE-wrapped, `'use strict'`, `var`,
  `function` callbacks. Consistent across every file — keep it consistent.
- **Never concatenate raw content into HTML.** Use `K.escText` / `K.escAttr` /
  `K.inline` from `assets/js/parser.js`.
- **The markdown is the source of truth.** If a value can be derived from the
  product markdown, derive it rather than adding a field.

## Content work

`Files/PROJECT_BRIEF.md` is the content bible — file format, CE standards
reference, technology glossary, and the ten things staff most often get wrong.
`CONTRIBUTING.md` covers the mechanics of adding a product or comparison table.

Safety-critical rules when writing or editing product content:

- Never guess or infer a CE rating. Quote the exact standard and level from the
  product page; if it isn't published, say so explicitly.
- Never describe an uncertified product as certified.
- Keep Motolegends' critical quotes in — staff need the weaknesses, not just the
  pitch.
- Cross-reference klim.com, the Motolegends product page and review, and
  Motolegends YouTube before writing.

## Registration is manual

A new product needs a `<script>` line in **both** `index.html` and
`product.html`. A new comparison table needs one in `comparisons.html`. Easy to
half-do; check both files.

## Checking a change

```bash
python -m http.server 8000
```

Load the catalog, a product page, and the comparisons page. There should be zero
console errors. When a product section renders as a plain generic panel, the
heading keyword didn't match — check `classify()` in `assets/js/parser.js`.
