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
  id: 'Dakar_Jacket',
  group: 'Jackets',                        // catalog section this product is filed under
  category: 'Off-Road Jacket',
  image: 'assets/img/Dakar_Jacket.png',
  accent: '#FF4D1C',                       // optional: per-product accent colour
  badges: ['Zip-off sleeves', 'Dual-Sport riders', '630D Cordura®', 'Not CE certified'], // optional hero chips
  markdown: `# KLIM Dakar Jacket

## What it is
A purpose-built dual-sport/off-road jacket designed for aggressive riding in multi-season conditions. It features zip-off sleeves, massive ventilation, and a cargo-heavy pocket layout — built to kit with the rest of the KLIM Dakar series.

## Who it's for
- **Off-road and dual-sport riders** — enduro, trail, green laning, adventure riding on mixed surfaces
- Riders who **prioritise mobility and airflow** over waterproofing
- Those who **ride as part of a system** — Dakar jacket + Dakar pants + Dakar jersey/gloves as a matched kit
- **Not recommended for road-only use** — no CE abrasion certification (more on this below)

## Key features
- **Shell:** 630D Cordura® twisted-yarn overlays on shoulders, elbows, and high-wear zones; 600D chest/hem/cuff panels; 500D breathable stretch-woven back panel and stretch zones for mobility
- **Zip-off sleeves** — store in the rear pocket; shoulder armour pockets remain functional with sleeves removed
- **Ventilation:** 2 massive adjustable wrist vents (dual zip), 2 bicep vents, 2 sleeve hole vents, 2 back vents, collar tab for upper chest airflow — extremely well vented
- **Armour pockets:** Integrated shoulder, elbow, and back pad pockets — **but no armour included**; compatible with Rogue™ Level 1 & 2 or D3O CE Level 1 pads (sold separately)
- **NOT CE certified** — no EN 17092 abrasion/tear/puncture rating
- **Storage:** Oversized chest pocket (doubles as vent), billowed chest cargo pocket, 2 billowed hand cargo pockets, rear sleeve-storage pocket, internal chest pocket
- **3M™ Scotchlite™ Carbon Black Reflective Material**
- **Fit system:** Moisture-wicking liner, comfort collar with shock cord adjust, in-pocket hem adjustment, Velcro cuffs
- Compatible with KLIM Tactical and Tactical Pro armoured base layers
- Part of the Dakar series — designed to kit with Dakar Pant, Dakar Glove, Dakar Jersey
- Colours: Black, Monument Gray, Monument Gray/Redrock, Vivid Blue, Striking Petrol, Peyote, Potter's Clay/Peyote
- Sizes: SM–3XL

## Top selling points

1. **Extreme ventilation for hard work off-road.** The Dakar is built for riders generating heat — zip-off sleeves plus six vent openings means serious airflow when pushing hard on trail. No membrane means nothing blocking the sweat from escaping.

2. **Zip-off sleeves = two jackets in one.** In cooler conditions it's a full jacket; when it heats up, pop the sleeves off and ride in the vest. Sleeves stow in the back pocket cleanly.

3. **Built as a complete system.** Dakar jacket + Dakar pants + Dakar gloves is a matched, purpose-designed kit that works together aesthetically and functionally. Great upsell for the off-road customer buying a full setup.

4. **Mobility-first construction.** The 500D stretch back panel and stretch zones in key areas mean the jacket moves freely when standing on the pegs or wrestling the bike through technical terrain.

5. **Value for a KLIM product.** it's among the more accessible KLIM jackets — a good entry point for new KLIM customers coming from the off-road world.

## Notable quotes or callouts from reviews/videos

- Motolegends (editorial, 2023): *"Klim's own Dakar jacket and pant… even though they come with armour pockets, haven't been certified in any way for abrasion, tear and puncture resistance."* — This is the key caveat to be aware of.
- Motolegends consistently steer customers asking about off-road jackets toward the Marrakesh instead, describing the Dakar as fine for pure off-road use but inadequate if the rider will spend time on road.

## Common questions customers might ask + good answers

**"Is the Dakar jacket safe for road riding?"**
Technically it's not CE certified — so it hasn't been independently tested for abrasion resistance the way road jackets are. For anyone riding roads regularly, the Marrakesh is a much better choice: it's CE AA rated, fully armoured as standard, and nearly as breathable. The Dakar is really best kept for dedicated off-road/trail use.

**"Does it come with armour?"**
No — the jacket has pad pockets for shoulders, elbows, and back, but no pads are included. You'll need to add D3O or Rogue armour separately. Factor that into the total cost when comparing to the Marrakesh, which includes a full D3O suite.

**"Can I buy just the jacket, or do I need the full Dakar kit?"**
Jacket only is fine. But the Dakar Pant is a natural pair-up — they're designed as a matched set and look cohesive together. Good upsell for the off-road customer.

**"Why are the sleeves removable?"**
Trail and enduro riding generates serious body heat. Being able to drop to a vest quickly without stopping — sleeves go straight in the back pocket — is genuinely useful when conditions change.

**"How does it compare to the Marrakesh?"**
Different tools for different jobs. The Dakar is purpose-built for off-road — more vents, removable sleeves, cargo-heavy pockets, better mobility. The Marrakesh is CE AA certified, comes with armour, and is better for mixed on/off-road or touring. If a customer rides mostly road and occasionally goes off-road, push the Marrakesh. If they're a serious trail rider who barely touches tarmac, the Dakar makes sense.

---

## Sources

- **KLIM product page:** [https://www.klim.com/Dakar-Jacket-3122-002](https://www.klim.com/Dakar-Jacket-3122-002)
- **Motolegends product page:** Not covered — Motolegends does not stock the KLIM Dakar Jacket. Dakar pants only are available: [https://www.motolegends.com/klim-dakar-pants-in-potters-clay](https://www.motolegends.com/klim-dakar-pants-in-potters-clay)
- **Motolegends editorial mention:** [https://www.motolegends.com/reviews/the-best-off-road-motorcycle-jacket](https://www.motolegends.com/reviews/the-best-off-road-motorcycle-jacket) — mentions the Dakar jacket (critically) as context for recommending the Marrakesh
- **Motolegends YouTube video(s):** Not covered — no Motolegends YouTube video specifically reviewing the Dakar jacket was found. Non-Motolegends YouTube reviews exist (e.g. [https://www.youtube.com/watch?v=Uaqaq82GhUQ](https://www.youtube.com/watch?v=Uaqaq82GhUQ)) but are not from the Motolegends channel.
`
});
