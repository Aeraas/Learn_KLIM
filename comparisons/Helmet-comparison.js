/*
 * Comparison table: "Which helmet is right for you?"
 * Sibling of jacket-comparison.js / pant-comparison.js / glove-comparison.js —
 * same renderer, same cell types. Registers into window.KLIM_COMPARISONS.
 *
 * Data transcribed from the staff sheet Files/KLIM_Helmet_Comparison_Table.md
 * (cross-referenced against the individual helmet product files). The three
 * helmets split cleanly by body style — GT1 = modular flip-up touring, X1 Alpha
 * = road-primary adventure-touring (peaked), Krios Pro = off-road-leaning ADV
 * (peaked, lightest & cheapest) — so this table leans on short-text rows for the
 * construction/vent/comfort specs that differentiate them, plus a Price section
 * (helmets are bought heavily on price, and the sheet flags a stale-price
 * gotcha). Columns are ordered as the file was started: X1 · Krios · GT1.
 *
 * Cell types: sec / sym ('y'|'n'|'a') / symc {code,note} / tag {text,tone} /
 *   ce {rating,note} / num / price / text (plain string).
 */
window.KLIM_COMPARISONS = window.KLIM_COMPARISONS || [];
window.KLIM_COMPARISONS.push({
  id: 'helmets',
  navLabel: 'Helmets',
  title: 'Which helmet is right for you?',
  subtitle: 'Cross-referenced against staff training files | Confirm current in-store prices and stock',
  rowHeader: 'Helmets',

  columns: [
    { num: '1', name: 'X1 Alpha',       img: 'assets/img/X1-Alpha-Helmet.png' },
    { num: '2', name: 'Krios Pro',      img: 'assets/img/Krios-pro-Helmet.png' },
    { num: '3', name: 'GT1 Expedition', img: 'assets/img/GT1-Expedition-Helmet.png' }
  ],

  rows: [
    { type: 'sec', label: 'Helmet' },
    { type: 'tag', label: 'Type', cells: [
      { text: 'Full-face + peak',  tone: 'none' },
      { text: 'Full-face + peak',  tone: 'none' },
      { text: 'Modular / flip-up', tone: 'none' }
    ] },
    { type: 'text', label: 'Primary use', cells: [
      'Adventure-touring (road-primary)', 'ADV / off-road-leaning', 'Road touring'
    ] },

    { type: 'sec', label: 'Construction' },
    { type: 'text', label: 'Shell material', cells: [
      'Hand-laid carbon', 'Hand-laid carbon', 'Carbon (+ carbon chin bar)'
    ] },
    { type: 'text', label: 'Impact liner', cells: [
      'KOROYD® + EPS', 'Mostly KOROYD®', 'KOROYD® + EPS'
    ] },
    { type: 'text', label: 'Certification', cells: [
      'ECE / DOT (see note)', 'ECE 22.06 / DOT', 'ECE 22.06 / DOT'
    ] },
    { type: 'text', label: 'Weight (size M)', cells: [
      '~1500 g', '~1350 g', '~1661 g (3rd-party)'
    ] },
    { type: 'text', label: 'Weight (size L)', cells: [
      '1550 g', '1450 g', 'Confirm'
    ] },

    { type: 'sec', label: 'Sizing' },
    { type: 'text', label: 'Shell sizes', cells: [
      '3', 'Confirm (Motolegends: 2)', '3'
    ] },
    { type: 'text', label: 'EPS sizes', cells: [
      '5', 'Confirm', '5'
    ] },
    { type: 'text', label: 'Size range', cells: [
      'XS–3X', 'XS–3X', 'XS–3X'
    ] },

    { type: 'sec', label: 'Face shield & visor' },
    { type: 'symc', label: 'Peak visor', cells: [
      { code: 'y', note: 'Tool-free adjust' },
      { code: 'y' },
      { code: 'a' }
    ] },
    { type: 'sym', label: 'Flip-up chin bar', cells: ['a', 'a', 'y'] },
    { type: 'sym', label: 'Clear face shield', cells: ['y', 'y', 'y'] },
    { type: 'sym', label: 'Photochromic shield included', cells: ['y', 'y', 'y'] },
    { type: 'symc', label: 'Pinlock included', cells: [
      { code: 'y', note: '120 XLT' },
      { code: 'y' },
      { code: 'y' }
    ] },
    { type: 'symc', label: 'Optical Class 1 shield', cells: [
      { code: 'y' },
      { code: 'a', note: 'Confirm' },
      { code: 'y' }
    ] },
    { type: 'symc', label: 'Internal drop-down sun visor', cells: [
      { code: 'a' },
      { code: 'a' },
      { code: 'a' }
    ] },
    { type: 'symc', label: 'Goggle compatible', cells: [
      { code: 'y' },
      { code: 'y', note: 'Shield removed' },
      { code: 'a' }
    ] },

    { type: 'sec', label: 'Ventilation' },
    { type: 'text', label: 'Intake vents', cells: [
      '4 (2 forehead + 2 chin)', 'Adjustable chin / forehead', '3 (1 forehead + 2 chin)'
    ] },
    { type: 'text', label: 'Exhaust vents', cells: [
      '4', 'a', '4'
    ] },

    { type: 'sec', label: 'Comfort & fit' },
    { type: 'text', label: 'Comfort liner', cells: [
      'Brrr° Pro', 'KLIMATEK™', 'Brrr°'
    ] },
    { type: 'text', label: 'Chin strap', cells: [
      'Titanium D-ring', 'Fidlock® magnetic', 'Micrometric ratchet'
    ] },
    { type: 'text', label: 'Comms integration', cells: [
      'Recessed pockets (adhesive mount)', 'SENA 10U compatible', 'Recessed speaker pockets'
    ] },
    { type: 'text', label: 'Ride modes', cells: [
      '4 (ADV / Dual-Sport / Off-Road / Street)', '4 (Street / Adventure / Dirt / Trail)', '— (touring)'
    ] },

    { type: 'sec', label: 'Riding use' },
    { type: 'sym', label: 'Touring / road', cells: ['y', 'a', 'y'] },
    { type: 'sym', label: 'Adventure', cells: ['y', 'y', 'a'] },
    { type: 'symc', label: 'Off-road / dirt', cells: [
      { code: 'y', note: 'Occasional' },
      { code: 'y' },
      { code: 'a' }
    ] },
],

  notes: [
    { lead: 'X1 Alpha certification:', rest: 'The KLIM page lists only "ECE / DOT" — the ECE version (22.05 vs 22.06) is NOT printed. Do not state 22.06 as fact for the X1; confirm the exact standard in-store. GT1 Expedition and Krios Pro both state ECE 22.06 / DOT — quote those with confidence.' },
    { lead: 'Price gotcha:', rest: "Quote the product-page prices (X1 $899.99 · Krios $724.99 · GT1 $999.99). KLIM's cross-sell / \"also bought\" tiles show STALE prices (e.g. X1 as $699.99, Krios as $599.99) — never quote those; use the product page or confirm in-store." },
    { lead: 'Weight:', rest: 'KLIM does NOT publish a GT1 Expedition weight — the ~1661 g (M) figure is third-party (Champion Helmets); present it as an independent measurement, not KLIM-official. Lightest → heaviest: Krios Pro (~1350 g) < X1 Alpha (~1500 g) < GT1 Expedition (~1661 g). Modulars are heavier by nature.' },
    { lead: 'KOROYD® construction:', rest: 'X1 Alpha and GT1 sandwich KOROYD® between two EPS layers → cooler and quieter (X1: KLIM claim 42% more impact absorption than EPS-only). The Krios Pro is mostly KOROYD® — lighter, but transmits more shell noise, which is why the X1 is the quieter helmet.' },
    { lead: 'Chin straps differ:', rest: 'X1 Alpha = titanium D-ring (KLIM dropped the Fidlock here); Krios Pro = Fidlock® magnetic (now only on the Krios — some riders specifically want it); GT1 = micrometric ratchet (quick-release, typical of touring/modular helmets).' },
    { lead: '"Confirm" cells:', rest: 'Where a cell reads Confirm, the KLIM product page does not state that spec (e.g. GT1 size-L weight; Krios optical class, shell count, exhaust vent count). Verify in-store rather than infer.' },
    { lead: 'How to route the customer:', rest: 'Flip-up convenience for big touring miles (open at stops, easy over glasses) → GT1 Expedition. A peak plus mostly-road with some off-road → X1 Alpha (the road-primary all-rounder). Rides off-road a lot / wants the lightest / tighter budget → Krios Pro (also in cheaper closeout colours).' }
  ]
});
