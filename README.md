# KLIM Sales Floor — product card prototype

An interactive, static single-page prototype that turns a product research
markdown file into a premium, KLIM-styled product page for shop-floor staff.

## Run it

No build, no backend. Just open **`index.html`** in a browser.

- `index.html` → the catalog / landing page (lists every product)
- `product.html?id=marrakesh` → a single product card

> Tip: for the smoothest experience (and so future image assets load), serve
> the folder instead of opening the file directly:
> ```
> python -m http.server 8000
> ```
> then visit http://localhost:8000

## How it's organised

```
index.html              catalog page
product.html            single product page (reads ?id=)
assets/
  css/styles.css        the whole design system
  js/parser.js          markdown -> structured sections (shared)
  js/render-product.js  builds the product page panels
  js/render-index.js    builds the catalog cards
products/
  marrakesh.js          ONE product = ONE file (markdown is the source of truth)
```

Everything on screen — name, hook, tabs, specs, price — is **derived from the
markdown** in the product file. Edit the markdown and the page updates.

## Add another product (one md = one page)

1. Copy `products/marrakesh.js` to `products/<your-id>.js`.
2. Change `id`, and paste your research markdown into the `markdown` field.
   Keep the same headings (`## What it is`, `## Top selling points`,
   `## Sources`, etc.) — the parser recognises them and styles each one.
   Optional cosmetic fields: `category`, `accent`, `badges`.
3. Add one `<script>` line in **both** `index.html` and `product.html`, inside
   the `<!-- PRODUCTS -->` block:
   ```html
   <script src="products/<your-id>.js"></script>
   ```

That's it — the new product appears on the index and gets its own page.

## Recognised sections

| Heading contains      | Rendered as                          |
|-----------------------|--------------------------------------|
| what it is / overview | intro lede                           |
| who / audience        | bulleted audience list               |
| feature               | technical spec grid                  |
| top selling / selling | **big numbered pitch cards** (hero of the page) |
| price                 | price cards                          |
| quote / notable       | quote wall                           |
| question / faq        | expandable accordion                 |
| source                | collapsed-by-default sources panel   |

Unknown sections still render cleanly as generic panels.

> Internal prototype for demo purposes — not affiliated with KLIM.
