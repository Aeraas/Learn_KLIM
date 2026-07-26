# KLIM Motolegends Staff Training — Project Brief
**For: New Claude session · Paste this at the start of a new chat**

---

## What this project is

Building a staff training resource library for **Motolegends** motorcycle gear store — staff selling **KLIM products**. Each product gets a standalone markdown file that staff can scan in under 2 minutes on the shop floor.

All files live at: `C:\Users\danie\Documents\Learn_KLIM\Files\`

---

## File format — every product follows this exact structure

```
# KLIM [Product Name]

## What it is
One paragraph. What the product is, who makes it, what it does.

## Who it's for
Bullet list of ideal customers. Include "Not suited to" at the end.

## Key features
Bullet list. Technical specs, materials, protection systems. Be precise.

## Top selling points
Numbered list (1–5). Staff-focused — what to lead with, how to pitch it.

## Price
USD price. Note UK as "confirm in-store." Note any closeout/multi-gen pricing.

## Notable quotes
Block quotes from Motolegends editorial or customer reviews.

## Common questions + answers
Q&A format. Real objections staff will face.

## Sources
Links to KLIM product page, Motolegends page, YouTube videos.
```

---

## Rules — non-negotiable

**Multi-gen / variants:**
- Same product name, similar specs across gens → **ONE file** with a comparison table at the top
- Very different specs (e.g. different CE rating, different materials) → still ONE file, comparison table flags the difference
- Completely different product positioning → SEPARATE files

**CE ratings — never guess, never misstate:**
- Always state the exact CE standard and level from the product page
- If the CE level isn't listed on the page, say so explicitly — do not infer
- Never present an uncertified product as CE certified

**Motolegends editorial voice:**
- Preserve their quotes exactly, including critical or candid ones
- If Motolegends have criticised something (e.g. CE A on the Latitude, Kodiak 2) — include it; staff need to know

**Sources:**
- Always research from three places: (1) klim.com product page, (2) Motolegends product page + written review, (3) Motolegends YouTube
- Cross-reference all three before writing

---

## CE standards reference (critical knowledge)

### Jackets — EN 17092
- EN 17092-2 = **AAA** (highest — only the Badlands Pro A3 in range)
- EN 17092-3 = **AA** (high — most KLIM jackets)
- EN 17092-4 = **A** (standard — Latitude current gen, Altitude women's, Kodiak 2)
- Armour protectors are graded separately: Level 1 or Level 2

### Gloves — EN 13594:2015
- **KP1** = Level 1 knuckle protection
- **KP2** = Level 2 knuckle protection (none in current KLIM range)
- CE only covers knuckle protection — not overall abrasion resistance

### Boots — EN 13634:2017
- Four-digit rating: shaft height / abrasion / rigidity / ankle protection
- "WR" = water resistant certified; "WAD" = wide access design (BOA)
- Outlander GTX: 1112 WR WAD
- Blak Jak non-GTX: 1221
- Blak Jak GTX: EN 13634:2017 (level not published on product page)
- Transition GTX: **NO CE certification** — lifestyle boot, NOT a motorcycle boot

---

## Technology glossary (use these correctly in files)

| Term | What it means |
|---|---|
| **Gore-Tex + Gore Grip** | Membrane bonded to outer leather — won't wet out (vs loose liner which eventually saturates) |
| **Gore-Tex 3-layer Pro** | Most durable GTX construction; stiffer but longest-lasting |
| **Gore-Tex 2-layer** | More supple; same waterproof guarantee; better everyday feel |
| **XRD® Impact Protection** | Non-Newtonian foam — soft in use, stiffens on impact |
| **D3O** | Competitor foam with similar non-Newtonian properties |
| **Rogue™ armour** | KLIM's own in-house CE Level 1 or 2 protectors; lighter than D3O |
| **Rogue™ EXP** | Expanded-coverage version of Rogue — broader protective surface |
| **SuperFabric®** | Ceramic-print abrasion overlay — highest abrasion resistance in KLIM range |
| **Vectran™ fibre** | Liquid-crystal polymer shell fabric — only in the Badlands Pro A3; enables CE AAA |
| **NESTFIT** | KLIM anatomically-optimised footbed |
| **BOA Fit System** | Dial-tighten lacing with BOA Lifetime Guarantee on dials and lace |
| **Karbonite™ Micromesh** | KLIM's 1000D Cordura micromesh — windproof but breathes through the whole panel |
| **Outseam stitching** | Finger seams on the outside — no internal seam pressure on the finger; a key comfort differentiator |

---

## Completed files — jackets

| File | Key notes |
|---|---|
| `KLIM_Marrakesh_Jacket.md` | CE AA · Not waterproof (DWR) · Best-selling jacket · Motolegends #1 pick for hot weather · Runs large (size down) |
| `KLIM_Dakar_Jacket.md` | **No CE certification** · No armour included (pockets only) · Off-road only · Zip-off sleeves |
| `KLIM_Altitude_Jacket.md` | **Women's only** · CE A · Gore-Tex 2L · 6 vents · Level 1 armour |
| `KLIM_Latitude_Jacket.md` | CE A (dropped from AA in current gen — stretch panels) · Gore-Tex 2L · 6 vents · Level 1 armour |
| `KLIM_Kodiak_Jacket.md` | Gen 4 = CE AA · Kodiak 2 = CE A (flag this!) · GTX 3L Pro · 10 vents · Maverick Down bundled · Perforated goat leather overlays |
| `KLIM_Badlands_Pro_Jacket.md` | CE AA · GTX 3L Pro · 12 vents · Level 2 armour · Kidney belt · MOLLE panel |
| `KLIM_Badlands_Pro_A3_Jacket.md` | **CE AAA — world's first Gore-Tex CE AAA jacket** · GTX 3L Pro · Vectran fibre · 12 vents · Level 2 + chest pads included |
| `KLIM_Maverick_Down_Jacket.md` | **NOT a riding jacket** · No CE · No armour · Mid-layer only · 800-fill goose down · Bundled with Kodiak |
| `KLIM_Artemis_Jacket.md` | **Women's** · CE AA · GTX 2L · 10 vents · Level 2 Rogue armour · Gen 3 current |
| `KLIM_Artemis_Jacket_Gen2.md` | Women's Gen 2 version — separate file |
| `KLIM_Carlsbad_Jacket.md` | CE AA · GTX 2L · 6 vents · Level 2 armour · Motolegends prefer it over Badlands Pro for most riders |
| `KLIM_Zephyr_Wind_Shirt.md` | Done |

---

## Completed files — gloves

| File | Key notes |
|---|---|
| `KLIM_Induction_Glove.md` | CE KP1 · Carbon fibre hard shell · 5mm XRD palm · **Outseam stitching** · Summer road glove · $149.99 |
| `KLIM_Marrakesh_Glove.md` | CE KP1 · Rubber guard · 3mm XRD palm · Lap-seam · Summer companion to Marrakesh jacket · $99.99 |
| `KLIM_Dakar_Glove.md` | **No CE** · TPR soft shell · Silicone palm grip only · Off-road entry · $44.99 |
| `KLIM_Dakar_Pro_Glove.md` | CE KP1 · XRD foam only (no hard shell) · 5mm XRD palm · Goggle squeegee · Dual-sport · $84.99 |
| `KLIM_Rebelle_Glove.md` | **Women's · No CE** · TPU guard · 3mm XRD foam palm (better than men's Dakar Glove at same price) · $44.99 |
| `KLIM_Adventure_GTX_Short_Glove.md` | CE KP1 · Gore-Tex + Gore Grip · Carbon fibre hard shell · Short cuff · Leather · $179.99 · Women's variant exists (5027-001) |
| `KLIM_Vanguard_GTX_Gloves.md` | **TWO variants in one file:** Short ($169.99, no insulation, short cuff) + Long ($179.99, 60g Thinsulate, gauntlet) · Both CE KP1 · Gore-Tex + Gore Grip |
| `KLIM_Badlands_Aero_Pro_Short_Glove.md` | **TWO gens in one file** (closeout 3924-001 $159.99 vs current 3924-003 $179.99) · CE KP1 · **Dual ventilation** (perforations + air scoops) · **Outseam stitching** · Summer adventure glove |
| `KLIM_Badlands_GTX_Long_Glove.md` | CE KP1 · Gore-Tex + Gore Grip · 60g Thinsulate · Polycarbonate hard shell · **Neoprene wrist gasket** · **Dual visor wiper (water + ice)** · Winter/all-weather · $269.99 |

---

## Completed files — boots

| File | Key notes |
|---|---|
| `KLIM_Outlander_GTX_Boot.md` | CE 1112 WR WAD · Gore-Tex · BOA · XRD ankle + metatarsal pads · **Size up one full size** · $299.99 |
| `KLIM_Blak_Jak_Boot.md` | **TWO variants in one file** · Non-GTX (1221, perforated, welted sole, $219.99) + GTX (CE level unconfirmed, full-grain leather, bonded sole, $259.99) · Note spelling: "Blak Jak" not "Black Jack" |
| `KLIM_Transition_GTX_Boot.md` | **NOT a motorcycle boot** · No CE EN 13634 · No XRD · No structural protection · Lifestyle/commuter only · CRITICAL: staff must never present as certified motorcycle footwear · Currently out of stock |

---

## Comparison tables completed

| File | What it covers |
|---|---|
| `KLIM_Glove_Comparison_Table.md` | All 10 gloves · 18 rows · Ready for web integration |
| Jacket comparison table | Built as an interactive HTML widget in chat — not saved as a file yet |

---

## Pending work

- **Jacket comparison table** needs saving as a file (currently only exists as a chat widget)
- Pants, base layers, and other product categories not yet started
- Carlsbad Jacket file exists but task list had it marked in-progress — confirm it's complete

---

## Key "gotchas" — things staff most often get wrong

1. **Dakar Jacket**: No CE certification, no armour. Staff must know this before selling.
2. **Transition GTX Boot**: Not a motorcycle boot. Never present as CE certified.
3. **Kodiak 2 vs Gen 4**: Kodiak 2 = CE A; Gen 4 = CE AA. Always check which gen is on the floor.
4. **Latitude current gen**: CE A, not AA. Was AA in previous gen — some customers may know this.
5. **Maverick Down Jacket**: Mid-layer only. Not a standalone riding jacket.
6. **Blak Jak spelling**: KLIM writes it "Blak Jak" — not "Black Jack."
7. **Outlander GTX sizing**: Go one full size up from normal shoe size.
8. **Badlands A3 vs Badlands Pro**: A3 = CE AAA + Vectran fibre. Not the same product. Never confuse them.
9. **Gore Grip laminate**: Membrane bonded to outer leather — completely different from a loose-liner waterproof glove. This distinction matters when selling.
10. **Rebelle Glove vs Dakar Glove**: Same price ($44.99), but Rebelle has XRD foam palm pad; men's Dakar Glove does not.

---

## How Danielius (the user) works

- Direct and concise — no fluff, no recapping
- Wants files saved to `C:\Users\danie\Documents\Learn_KLIM\Files\` immediately
- Uses informal spelling in messages ("ventalaion", "sum") — interpret intent, don't correct
- Prefers to review and provide feedback rather than be asked lots of clarifying questions upfront
- When doing research: always check (1) klim.com, (2) motolegends.com, (3) Motolegends YouTube before writing
- Always cross-reference data against existing files before writing new ones
- CE ratings and safety specs must be confirmed from source — never assumed
