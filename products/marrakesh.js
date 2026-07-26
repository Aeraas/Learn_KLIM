/*
 * PRODUCT DATA FILE
 * -----------------
 * One file = one product page. To add a new product:
 *   1. Copy this file (e.g. products/induction.js)
 *   2. Change `id`, paste the product markdown into `markdown`
 *   3. Add one <script> line to BOTH index.html and product.html
 *
 * Everything on the page (name, hook, sections, price) is DERIVED from the
 * markdown below by assets/js/parser.js — keep the markdown as the source of
 * truth. The fields above the markdown are optional cosmetic overrides.
 */
window.KLIM_PRODUCTS = window.KLIM_PRODUCTS || [];
window.KLIM_PRODUCTS.push({
  id: 'marrakesh',
  group: 'Jackets',                        // catalog section this product is filed under
  category: 'High-Airflow Jacket',
  image: 'assets/img/marrakesh.png',       // optional: card image (falls back to initials if omitted)
  accent: '#FF4D1C',                       // optional: per-product accent colour
  badges: ['CE AA Rated', 'D3O® Armour', '1000D Cordura®', 'Gen 2'], // optional hero chips
  markdown: `# KLIM Marrakesh Jacket

## What it is
A second-generation high-airflow motorcycle jacket built from 1000D stretch-woven Karbonite™ Micromesh Cordura®. It flows air through every panel, comes fully armoured as standard, and is widely regarded as the most comfortable riding jacket on the market.

## Who it's for
- **Tourers and adventure riders** who ride in warm/hot weather and want protection without suffering
- **Year-round riders** who layer up (mid-layer under, waterproof over) to extend the jacket across seasons
- **Commuters** looking for an everyday jacket that doesn't feel like armour
- Works for road, dual-sport, and casual off-road use — it's genuinely that versatile

## Key features
- **Shell:** 1000D Karbonite™ Micromesh Cordura® — stretch-woven, fully porous, air flows through every panel at low speeds
- **CE AA rated** to EN 17092-3 (highest standard for this jacket type — stronger than most mesh rivals)
- **Armour:** D3O® IP Ghost Level 1 vented shoulder + adjustable elbow pads; D3O® Viper CE Level 1 back pad fitted as standard
- **Upgradeable** to Rogue Armor Level 1 & 2
- **4-way stretch chassis** — moves with the rider, sits tight against the body so armour stays in place
- **DWR water-repellent treatment** — sheds light rain; not waterproof, but buys time
- **Ventilation:** entire jacket breathes; plus 2 wrist zip vents
- **3M™ Scotchlite™ Carbon Black Reflective** — invisible in daylight, bright at night
- **Pockets:** 1 chest, 1 internal chest, 2 hand pockets, 1 forearm ID card pocket
- **Liner:** moisture-wicking antimicrobial breathable mesh; comfort fleece at collar and cuffs
- **Waist adjuster cord** (Gen 2 addition — helps dial in fit)
- **YKK® zippers** with hypalon zipper garages
- Available in 5 colours (Stealth Black, Cool Gray, Winter Moss, Teak, Petrol/Potter's Clay), sizes SM–3XL

## Top selling points

1. **Comfort that closes the sale.** Motolegends describe it as "hands down the most comfortable motorcycle jacket people have ever tried on" — it wears like a tracksuit top, not armour. Let customers try it on; the jacket sells itself.

2. **AA-rated protection in a mesh-style jacket.** Most breathable jackets sacrifice safety. The Marrakesh doesn't — 1000D Cordura (heavier than competitors like the Rukka Forsair), full D3O armour including a back protector as standard, CE AA certified.

3. **Air through every panel, not just mesh inserts.** Unlike jackets with mesh windows, the entire shell is porous. Air flows even at low speeds, making it genuinely usable in summer heat.

4. **A jacket for all seasons with the right layers.** Add a mid-layer underneath and a waterproof over the top, and customers can wear this year-round. Motolegends customers regularly ride it through autumn and winter this way — a strong upsell angle.

5. **Motolegends' best-selling jacket.** It's not a niche product — it's a proven, trusted bestseller with a loyal customer base and an excellent track record. Easy to recommend with confidence.

## Notable quotes & callouts from reviews/videos

- *"Like a mesh jacket on steroids — from a strength and abrasion-resistance perspective, it's as strong a textile jacket as you'll find."* — Motolegends video review
- *"Hands down the most comfortable motorcycle jacket that people have ever tried on."* — Motolegends product page
- *"Since it arrived I have not worn another jacket on either of my bikes."* — customer review (Motolegends)
- *"Undoubtedly the Klim Marrakesh has become our best selling jacket."* — Motolegends
- Motolegends note the jacket **comes up large** — advise customers to size down from their usual.

## Common questions customers might ask + good answers

**"Is it waterproof?"**
No — it has a DWR treatment that sheds light drizzle, but it's not waterproof. The jacket is designed to be paired with a lightweight waterproof shell over the top in rain. That's actually a feature: you stay cooler on dry days because there's no membrane blocking airflow.

**"Won't I be cold in it?"**
In summer, no. In cooler weather, layer a mid-layer or heated vest underneath — the stretch means it still fits comfortably. Many customers wear it all year round this way.

**"How does it compare to other mesh jackets?"**
Most mesh jackets have mesh panels with a solid shell around them. The Marrakesh flows air through the entire jacket. It's also far stronger — 1000D Cordura vs lighter fabrics — and comes CE AA rated with a back protector included. It's genuinely in a different class.

**"Will the armour stay in place if I go down?"**
Yes. The 4-way stretch fits close to the body, which keeps the D3O pads seated on the elbows and shoulders rather than shifting around. This is one of the safety advantages over looser-fitting high-airflow rivals.

**"What size should I get?"**
The jacket runs large. Most customers drop one size from their normal fit — worth noting in the fitting conversation.
---

## Sources

- **KLIM product page:** [https://www.klim.com/Marrakesh-Jacket-3341-002](https://www.klim.com/Marrakesh-Jacket-3341-002)
- **Motolegends product page:** [https://www.motolegends.com/motorcycle-jackets/klim/marrakesh](https://www.motolegends.com/motorcycle-jackets/klim/marrakesh)
- **Motolegends written review (2019):** [https://www.motolegends.com/reviews/Klim-Marrakesh-jacket-review](https://www.motolegends.com/reviews/Klim-Marrakesh-jacket-review)
- **Motolegends video review page:** [https://www.motolegends.com/reviews/Klim-Marrakesh-jacket-video-review](https://www.motolegends.com/reviews/Klim-Marrakesh-jacket-video-review)
- **Motolegends YouTube — "The Klim Marrakesh. The world's best motorcycle jacket."** [https://www.youtube.com/watch?v=7Q6Jwxs8Rvo](https://www.youtube.com/watch?v=7Q6Jwxs8Rvo) *(full video covers the jacket throughout — timestamps not available as YouTube pages are JavaScript-rendered)*
- **Motolegends YouTube — "The Klim Marrakesh. Is it still the best high-airflow jacket?"** [https://www.youtube.com/watch?v=7kWgwVJmal4](https://www.youtube.com/watch?v=7kWgwVJmal4) *(more recent update video — timestamps not available)*
`
});
