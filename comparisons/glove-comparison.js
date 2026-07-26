/*
 * Comparison table: "Which glove is right for you?"
 * Sibling of jacket-comparison.js / pant-comparison.js — same renderer, same
 * cell types. Registers into window.KLIM_COMPARISONS.
 *
 * Data transcribed from the staff sheet Files/KLIM_Glove_Comparison_Table.md
 * (cross-referenced against the individual glove product files). Gloves are
 * differentiated primarily by protection material, so this table adds two
 * short-text rows (knuckle protector, palm protection) alongside the usual
 * scannable symbols — a glove-specific departure from the jacket/pant tables.
 *
 * Cell types: sec / sym ('y'|'n'|'a') / symc {code,note} / tag {text,tone} /
 *   ce {rating,note} / num / price / text (plain string).
 */
window.KLIM_COMPARISONS = window.KLIM_COMPARISONS || [];
window.KLIM_COMPARISONS.push({
  id: 'gloves',
  navLabel: 'Gloves',
  title: 'Which glove is right for you?',
  subtitle: 'Cross-referenced against staff training files | Confirm current in-store prices and stock',
  rowHeader: 'Gloves',

  columns: [
    { num: '1',  name: 'Induction',      img: 'assets/img/Induction_Glove.png' },
    { num: '2',  name: 'Marrakesh',      img: 'assets/img/Marrakesh_Glove.png' },
    { num: '3',  name: 'Dakar',          img: 'assets/img/Dakar_Glove.png' },
    { num: '4',  name: 'Dakar Pro',      img: 'assets/img/Dakar_Pro_Glove.png' },
    { num: '5',  name: 'Rebelle', sub: "Women's", img: 'assets/img/Rebelle_Glove.png' },
    { num: '6',  name: 'Adventure GTX',  img: 'assets/img/Adventure_GTX_Glove.png' },
    { num: '7',  name: 'Vanguard Short', img: 'assets/img/Vanguard_Glove.png' },
    { num: '7A', name: 'Vanguard Long',  img: 'assets/img/Vanguard_Glove.png' },
    { num: '8',  name: 'Badlands Aero',  img: 'assets/img/Badlands_Aero_Glove.png' },
    { num: '9',  name: 'Badlands GTX',   img: 'assets/img/Badlands_GTX_Glove.png' }
  ],

  rows: [
    { type: 'sec', label: 'Waterproofing' },
    { type: 'sym', label: 'Waterproof', cells: ['a', 'a', 'a', 'a', 'a', 'y', 'y', 'y', 'a', 'y'] },
    { type: 'tag', label: 'Membrane', cells: [
      { text: 'None',       tone: 'none' },
      { text: 'None',       tone: 'none' },
      { text: 'None',       tone: 'none' },
      { text: 'None',       tone: 'none' },
      { text: 'None',       tone: 'none' },
      { text: 'GTX + Grip', tone: 'gtx2' },
      { text: 'GTX + Grip', tone: 'gtx2' },
      { text: 'GTX + Grip', tone: 'gtx2' },
      { text: 'None',       tone: 'none' },
      { text: 'GTX + Grip', tone: 'gtx2' }
    ] },

    { type: 'sec', label: 'Climate & ventilation' },
    { type: 'sym', label: 'Insulated',            cells: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'y', 'a', 'y'] },
    { type: 'sym', label: 'Perforated / vented',  cells: ['y', 'y', 'y', 'y', 'y', 'a', 'a', 'a', 'y', 'a'] },
    { type: 'sym', label: 'Best for hot weather', cells: ['y', 'y', 'y', 'y', 'y', 'a', 'a', 'a', 'y', 'a'] },
    { type: 'sym', label: 'Best for cold weather',cells: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'y', 'a', 'y'] },

    { type: 'sec', label: 'Protection' },
    { type: 'sym', label: 'CE certified (EN 13594)', cells: ['y', 'y', 'a', 'y', 'a', 'y', 'y', 'y', 'y', 'y'] },
    { type: 'ce', label: 'CE knuckle level', cells: [
      { rating: 'KP1' },
      { rating: 'KP1' },
      { rating: 'None' },
      { rating: 'KP1' },
      { rating: 'None' },
      { rating: 'KP1' },
      { rating: 'KP1' },
      { rating: 'KP1' },
      { rating: 'KP1' },
      { rating: 'KP1' }
    ] },
    { type: 'text', label: 'Knuckle protector', cells: [
      'Carbon hard', 'Rubber guard', 'TPR soft', 'XRD foam (no shell)', 'TPU guard',
      'Carbon hard', 'Rubber + XRD', 'Confirm in store', 'Carbon + poly', 'Polycarbonate'
    ] },
    { type: 'text', label: 'Palm protection', cells: [
      '5mm XRD', '3mm XRD + leather', 'Silicone grip', '5mm XRD', '3mm XRD',
      'XRD + ceramic', '5mm XRD', '5mm XRD', 'XRD + ceramic', 'XRD + ceramic'
    ] },
    { type: 'sym', label: 'Outseam finger stitching', cells: ['y', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'y', 'a'] },

    { type: 'sec', label: 'Fit & features' },
    { type: 'text', label: 'Cuff length', cells: [
      'Short', 'Short', 'Short', 'Short', 'Short',
      'Short', 'Short', 'Gauntlet', 'Short', 'Gauntlet'
    ] },
    { type: 'sym', label: 'Wrist seal (neoprene)', cells: ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'y'] },
    { type: 'text', label: 'Closure', cells: [
      'Velcro + zip', 'Velcro strap', 'Velcro strap', 'Velcro strap', 'Velcro strap',
      'Velcro strap', 'Velcro + zip', 'Dual strap', 'Velcro strap', 'Dual strap'
    ] },
    { type: 'text', label: 'Visor / goggle wiper', cells: [
      'Water', 'Water', '—', 'Goggle', 'Sweat',
      'Water', 'Water', '—', 'Water', 'Dual (water + ice)'
    ] },

    { type: 'sec', label: 'Riding use' },
    { type: 'sym', label: 'Adventure / off-road', cells: ['a', 'y', 'y', 'y', 'y', 'y', 'a', 'a', 'y', 'y'] },
    { type: 'sym', label: 'Touring / road',       cells: ['y', 'y', 'a', 'y', 'a', 'y', 'y', 'y', 'y', 'y'] },
    { type: 'sym', label: 'Daily / commuting',    cells: ['y', 'y', 'a', 'a', 'a', 'y', 'y', 'y', 'a', 'y'] }
  ],

  notes: [
    { lead: 'Dakar & Rebelle:', rest: 'No CE certification at all — staff must not present these as certified motorcycle gloves. Every other glove in this range is CE KP1 (EN 13594:2015).' },
    { lead: 'Waterproof gloves:', rest: 'All use Gore-Tex + Gore Grip bonded directly to the leather outer (laminate) — they will not wet out in extended rain, unlike cheaper loose-liner construction.' },
    { lead: 'Vanguard GTX Long:', rest: "File does not confirm knuckle type or a neoprene wrist gasket — verify in store. Neoprene gasket is confirmed on the Badlands GTX Long only." },
    { lead: 'Badlands GTX Long wiper:', rest: 'Dual wiper is unique in the range — left index = water wiper, right index = ice scraper. No other KLIM glove has this.' },
    { lead: 'Badlands Aero pricing:', rest: 'Closeout SKU 3924-001 = $159.99 (limited sizes SM/MD/2X/3X); current SKU 3924-003 = $179.99 (full XS–3X range).' },
    { lead: 'Rebelle & Adventure:', rest: "Rebelle is a women's-specific glove (dedicated fit, not a downsized unisex). The Adventure GTX Short also has a separate women's variant — stock varies." }
  ]
});
