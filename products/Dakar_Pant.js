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
  id: 'Dakar_Pant',
  group: 'Pants',                        // catalog section this product is filed under
  category: 'Off-Road Pant',
  image: 'assets/img/Dakar_Pant.png',
  accent: '#FF4D1C',                       // optional: per-product accent colour
  badges: ['off-road', 'Dual-Sport riders', '630D Cordura®', 'Not CE certified'], // optional hero chips
  markdown: `# KLIM Dakar Pant

> 🥾 **Two versions, one key question: what boots is the customer wearing?** The standard Dakar goes **over** the boot; the In The Boot version tucks **inside** the boot. That's the first and most important thing to establish — everything else follows from it.
>
> ⚠️ **Neither pant is CE rated.** Both are classified as off-road/dual-sport riding trousers. They are not tested to EN 17092 and carry no CE protection rating. This matters if a customer is primarily road riding and expects a certification. See staff note below.

## What they are

The Dakar range is KLIM's off-road and dual-sport trouser line — built for riders who split their time between gravel, trails, and road sections. Both versions share the same 630D Cordura chassis, goat leather knee grip panels, zippered thigh vents, and stretch zones for aggressive movement. The difference is purely in how they sit relative to the boot — and that changes a few downstream features significantly.

The **Dakar Pant** (over the boot) is the fuller-featured version: it has armour pockets for knee and hip inserts, reflective detailing, hem snaps for muddy conditions, and comes in Regular and Tall leg lengths. The **Dakar In The Boot Pant** strips out everything that would add bulk inside the boot — no armour pockets, no lower-leg liner, single leg length — and comes in significantly more colour options.

---

## Dakar Pant vs. Dakar In The Boot — at a glance

| | Dakar Pant (3142-004) | Dakar In The Boot Pant (3182-005) |
|---|---|---|
| **Wear style** | Over the boot | Inside the boot |
| **Leg lengths** | Regular (30–42) + Tall (32–38) | Single length only (30–42) |
| **Armour pockets** | ✅ Knee + hip pad pockets (armour sold separately) | ❌ None |
| **Lower leg liner** | Full mesh liner throughout | No liner in lower leg (less bulk in boot) |
| **Hem closure** | Push-thru button snaps (muddy conditions) | None |
| **Reflective** | 3M™ Scotchlite™ Carbon Black on back of leg | Not included |
| **Colours** | Asphalt, Striking Petrol, Potter's Clay, Monument Gray, Black (5) | Striking Petrol, White/Black, Potter's Clay, Asphalt/Peyote, Ice Blue, Vivid Gray, Golden Brown/Petrol, Redrock, Black (9) |
| **CE rating** | ❌ Not CE rated — off-road designation | ❌ Not CE rated — off-road designation |
| **Shared features** | 630D Cordura chassis, 840D Cordura knees/seat, goat leather inner knees, stretch panels, DWR treatment, zippered thigh vents, silicone waistband, side waist adjusters | ← same |

**Choosing between them:** If the customer wears tall ADV boots with shin protection (Forma Terra Evo, Sidi Adventure, AXO etc.), the In The Boot version is the correct choice — the standard pant won't fit neatly over those boots anyway. If they ride in shorter boots or want the option of armour inserts, the standard Dakar is the one.

---

## Key features (shared across both)

- **Shell:** 630D Karbonite™ Cordura® twisted yarn chassis — controlled ventilation dual-sport/off-road construction
- **Reinforced zones:** 840D Cordura® knees and seat for durability
- **Goat leather** on inner knees — adds grip against the tank and heat/abrasion resistance
- **600D Cordura** inside knee panel — resists wear from knee brace contact
- **Breathable stretch woven panels** at back waist, above knees, back of legs, and crotch
- **DWR treatment** — sheds water, not waterproof
- **Adjustable zippered thigh vents** — glove-friendly, opens a wide temperature window
- **Vented TPU accents** on knees
- **2 zippered/billowed cargo pockets** — different zipper heads on pockets vs vents for easy gloved identification
- **Silicone waistband** — keeps jersey tucked, pant seated
- **Side waist adjusters**
- **Moisture-wicking breathable liner** with stretch zones

---

## Top selling points

1. **The first question sells the pant.** "What boots are you planning to wear?" — this immediately sorts customers into the right version and demonstrates that your staff know the product. Most customers don't realise two versions exist.

2. **Off-road DNA, dual-sport capable.** The Dakar range is built for serious dirt but functional on road connectors. It's the choice for riders whose routes involve both tarmac and gravel — more armoured and purposeful than the Marrakesh, less restrictive than a waterproof pant.

3. **Goat leather inner knees.** This is a premium detail that most competitors skip entirely at this price. It adds grip against the tank, takes heat from exhausts, and adds abrasion resistance right where the rider contacts the bike most. Worth pointing out.

4. **Zippered thigh vents with gloved ID.** The vent and pocket zipper heads are deliberately different so a rider can tell them apart by touch with gloves on. That's a thought-through design detail — KLIM's off-road engineering experience shows up in small things like this.

5. **Knee brace compatibility.** The 600D inner knee panel is there specifically to resist wear from knee brace straps. For customers who use knee braces — a significant portion of off-road riders — this is relevant and rare.

6. **Armour upsell (Dakar Pant only).** The pockets are there; the armour isn't included. D3O LP1 knee/elbow pads are $29.99 and hip pads are additional. This is an easy and honest add-on — the pant is better with armour and the customer should know that.

7. **More colour choice on In The Boot.** Nine colours vs five. If a customer wants something beyond the standard palette, the In The Boot version actually has the broader range.

## Notable quotes & callouts

- KLIM: *"This all-season off-road pant is equally at home conquering Dakar Rally stages as it is roosting your buddies on an all-day local ride."*
- KLIM (In The Boot): *"No mesh liner in lower leg area for reduced bulk inside boots."*
- Ultimate Motorcycling: *"Adventure and dual-sport ready."*

---

> ⚠️ **Staff notes — be upfront on these:**
>
> **1. Neither pant is CE rated.** The Dakar range is designated off-road use, which exempts it from EN 17092 testing. Customers who are primarily road riding and expect a CE-rated trouser need to be directed elsewhere — the Carlsbad Pant or Marrakesh Pant are the road-appropriate alternatives. Do not let a road rider buy a Dakar pant under the impression it carries CE protection.
>
> **2. Armour is NOT included in either pant.** The Dakar Pant has the pockets; the armour is a separate purchase. The In The Boot has no pockets at all. A customer assuming armour is in the box will be disappointed. The D3O LP1 knee/elbow pads are $29.99 — bundle the conversation at point of sale.
>
> **3. In The Boot has no armour pockets.** This is a significant constraint. If a customer wants to run knee or hip armour, they must go with the standard Dakar Pant — the In The Boot version cannot accommodate inserts. Clarify this before the sale.
>
> **4. Single leg length on In The Boot.** Taller riders (especially those who already struggle with trouser length) may find the single inseam doesn't work for them. The standard Dakar Pant has Regular and Tall options. Ask before assuming.

---

## Common questions customers might ask + good answers

**"What's the difference between the two Dakar pants?"**
One goes over the boot, one tucks inside. The standard Dakar Pant has armour pockets, reflective detailing, and hem snaps — it's the more complete pant. The In The Boot is slimmed down in the lower leg so it fits cleanly inside tall boots, but gives up the armour pockets and comes in one leg length. First question: what boots are they wearing?

**"Are these CE rated?"**
No — the Dakar range is classed as off-road riding wear and isn't tested to EN 17092. If they need a CE-rated pant, look at the Marrakesh (CE AA, warm weather) or the Carlsbad (CE AA, waterproof, year-round).

**"Does armour come included?"**
On the standard Dakar Pant, the pockets are included but the armour is sold separately. D3O LP1 knee/elbow sets are $29.99 and hip pads are available too. The In The Boot version has no armour pockets at all.

**"Can I use these for road riding?"**
They can physically be worn on the road, but they're not CE rated, so they carry no certified protection. For a customer who wants protection credentials on public roads, we'd point them to the Marrakesh (CE AA) or Carlsbad (CE AA).

**"Which goes better with the Dakar Jacket?"**
Both — the Dakar range is a system. Either pant pairs with the Dakar Jacket aesthetically. The practical choice between the two pants is still driven by what boots the customer wears.

---

## Sources

- **KLIM Dakar Pant (current):** [https://www.klim.com/Dakar-Pant-3142-004](https://www.klim.com/Dakar-Pant-3142-004) (SKU: 3142-004, $249.99)
- **KLIM Dakar In The Boot Pant (current):** [https://www.klim.com/Dakar-In-The-Boot-Pant-3182-005](https://www.klim.com/Dakar-In-The-Boot-Pant-3182-005) (SKU: 3182-005, $219.99)
- **Ultimate Motorcycling review:** [https://ultimatemotorcycling.com/2021/10/24/klim-dakar-pants-jersey-review-adventure-and-dual-sport-ready/](https://ultimatemotorcycling.com/2021/10/24/klim-dakar-pants-jersey-review-adventure-and-dual-sport-ready/)
- **Motolegends Dakar Pants:** [https://www.motolegends.com/klim-dakar-pants-in-potters-clay](https://www.motolegends.com/klim-dakar-pants-in-potters-clay)
`
});
