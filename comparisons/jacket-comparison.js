/*
 * Comparison table: "Which jacket is right for you?"
 * One comparison = one file. Registers into window.KLIM_COMPARISONS, exactly
 * like products register into window.KLIM_PRODUCTS.
 *
 * Data transcribed verbatim from the staff comparison sheet (klim_jacket_comparison).
 * Row `type` drives how each cell renders:
 *   sec   = full-width section divider (label only)
 *   sym   = symbol only      → 'y' ✓ / 'n' ✗ / 'a' — (not recommended)
 *   symc  = symbol + caption  → { code:'y'|'n'|'a', note:'…' }
 *   tag   = coloured text tag → { text, tone }
 *   vent  = 1–5 dot rating + label → { dots:Number, label:'…' }
 *   ce    = CE badge (+ optional note) → { rating:'AAA'|'AA'|'A'|'None', note:'…' }
 *   num   = big plain number
 *   price = gold £ guide
 */
window.KLIM_COMPARISONS = window.KLIM_COMPARISONS || [];
window.KLIM_COMPARISONS.push({
  id: 'jackets',
  navLabel: 'Jackets',
  title: 'Which jacket is right for you?',
  subtitle: 'Cross-referenced against staff training files | Confirm current in-store prices and stock',
  rowHeader: 'Jackets',

  columns: [
    { num: '1',  name: 'Marrakesh',    img: 'assets/img/marrakesh.png' },
    { num: '2',  name: 'Dakar',        img: 'assets/img/Dakar_Jacket.png' },
    { num: '3',  name: 'Carlsbad',     img: 'assets/img/Carlsbad_Jacket.png' },
    { num: '4',  name: 'Latitude',     img: 'assets/img/Latitude_Jacket.png' },
    { num: '5',  name: 'Kodiak',       img: 'assets/img/Kodiak_Jacket.png' },
    { num: '6',  name: 'Badlands Pro', img: 'assets/img/Badlands_Pro_Jacket.png' },
    { num: '6A', name: 'Badlands A3',  img: 'assets/img/Badlands_Pro_A3_Jacket.png' },
    { num: '7',  name: 'Altitude', sub: "Women's", img: 'assets/img/Altitude_Jacket.png' },
    { num: '8',  name: 'Artemis', sub: "Women's", img: 'assets/img/Artemis_Jacket.png' },
    { num: '9',  name: 'Marrakesh', sub: "Women's", img: 'assets/img/marrakesh.png' },
    { num: '10', name: 'Induction Pro',   img: 'assets/img/Induction_Pro_Jacket.png' },
    { num: '11', name: 'Baja',            img: 'assets/img/Baja_Jacket.png' },
    { num: '12', name: 'Traverse GTX',    img: 'assets/img/Traverse_GTX_Jacket.png' },
    { num: '13', name: 'Raptor GTX', sub: 'Overshell', img: 'assets/img/Raptor_GTX_Overshell_Jacket.png' },
    { num: '14', name: 'Adventure Rally', img: 'assets/img/Adventure_Rally_Jacket.png' },
    { num: '15', name: 'Sixxer', sub: 'Leather', img: 'assets/img/Sixxer_Leather_Jacket.png' }
  ],

  rows: [
    { type: 'sec', label: 'Waterproofing' },
    { type: 'sym', label: 'Waterproof', cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'y', 'y','a', 'a', 'a', 'y', 'y', 'y', 'a'] },
    { type: 'tag', label: 'Membrane', cells: [
      { text: 'DWR only',   tone: 'dwr'  },
      { text: 'None',       tone: 'none' },
      { text: 'GTX 2L',     tone: 'gtx2' },
      { text: 'GTX 2L',     tone: 'gtx2' },
      { text: 'GTX 3L Pro', tone: 'gtx3' },
      { text: 'GTX 3L Pro', tone: 'gtx3' },
      { text: 'GTX 3L Pro', tone: 'gtx3' },
      { text: 'GTX 2L',     tone: 'gtx2' },
      { text: 'GTX 2L',     tone: 'gtx2' },
      { text: 'DWR only',   tone: 'dwr'  },
      { text: 'None',       tone: 'none' },
      { text: 'DWR only',   tone: 'dwr'  },
      { text: 'GTX Shell',  tone: 'gtx2' },
      { text: 'GTX 3L',     tone: 'gtx3' },
      { text: 'GTX 3L',     tone: 'gtx3' },
      { text: 'None',       tone: 'none' }
    ] },

    { type: 'sec', label: 'Climate & ventilation' },
    { type: 'sym', label: 'Windproof', cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'y', 'y','a', 'a', 'a', 'y', 'y', 'y', 'a'] },
    { type: 'vent', label: 'Ventilation', cells: [
      { dots: 5, label: 'Full mesh' },
      { dots: 4, label: '8+ vents'  },
      { dots: 3, label: '6 vents'   },
      { dots: 3, label: '6 vents'  },
      { dots: 4, label: '8 vents'  },
      { dots: 5, label: '12 vents'   },
      { dots: 5, label: '12 vents'  },
      { dots: 3, label: '6 vents'   },
      { dots: 4, label: '10 vents'  },
      { dots: 5, label: 'Full mesh' },
      { dots: 5, label: 'Full mesh' },
      { dots: 5, label: 'Full mesh' },
      { dots: 2, label: 'Pit zips'  },
      { dots: 3, label: '6 vents'   },
      { dots: 5, label: '12 vents'  },
      { dots: 2, label: 'Perforated'}
    ] },
    { type: 'sym', label: 'Best for hot weather',  cells: ['y', 'y', 'a', 'a', 'a', 'a', 'a', 'a', 'a','y', 'y', 'y', 'a', 'a', 'a', 'a'] },
    { type: 'sym', label: 'Best for cold weather', cells: ['a', 'a', 'y', 'a', 'y', 'y', 'y', 'y', 'y','a', 'a', 'a', 'y', 'y', 'y', 'a'] },
    { type: 'sym', label: 'All-season use',        cells: ['y', 'a', 'y', 'y', 'y', 'y', 'y', 'y', 'y','y', 'a', 'a', 'y', 'y', 'y', 'a'] },
    { type: 'symc', label: 'Thermal liner', cells: [
      { code: 'a' }, { code: 'a' }, { code: 'a' }, { code: 'a' },
      { code: 'y' }, { code: 'a' }, { code: 'a' },
      { code: 'a' }, { code: 'a' }, { code: 'a' },
      { code: 'a' }, { code: 'a' }, { code: 'a' },
      { code: 'a' }, { code: 'a' }, { code: 'a' },
    ] },
    { type: 'symc', label: 'Best for layering', cells: [
      { code: 'y' }, { code: 'a' }, { code: 'y' }, { code: 'y' },
      { code: 'y' }, { code: 'y' }, { code: 'y' },
      { code: 'y' }, { code: 'y' }, { code: 'y' },
      { code: 'y' }, { code: 'y' }, { code: 'y' },
      { code: 'y' }, { code: 'y' }, { code: 'y' },
    ] },

    { type: 'sec', label: 'Protection' },
    { type: 'ce', label: 'CE jacket rating', cells: [
      { rating: 'AA'   },
      { rating: 'None' },
      { rating: 'AA'    },
      { rating: 'A'   },
      { rating: 'AA', note: 'Gen 4 | Gen 2 = A'  },
      { rating: 'AA'    },
      { rating: 'AAA' },
      { rating: 'A'   },
      { rating: 'AA'   },
      { rating: 'AA'   },
      { rating: 'AA'   },
      { rating: 'AA'   },
      { rating: 'NP', note: 'Not published' },
      { rating: 'B',  note: 'EN 17092-5' },
      { rating: 'NP', note: 'Not published' },
      { rating: 'NP', note: 'Not published' }
    ] },
    { type: 'symc', label: 'Armour included', cells: [
      { code: 'y'},
      { code: 'a'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y', note: 'No back pad' },
      { code: 'a', note: 'Sold separately' },
      { code: 'a', note: 'Sold separately' },
      { code: 'a', note: 'Sold separately' }
    ] },
    { type: 'sym', label: 'Back protector pocket', cells: ['y', 'y', 'y', 'y', 'y', 'y', 'y', 'y', 'y','y', 'y', 'y', 'y', 'a', 'a', 'y'] },

    { type: 'sec', label: 'Storage' },
    { type: 'num', label: 'Storage pockets', cells: ['5', '6', '12+', '7', '8+', '12+', '12+', '6', '10','3', '8', '8+', '4', '4', '8+', '5'] },

    { type: 'sec', label: 'Riding use' },
    { type: 'sym', label: 'Adventure / off-road', cells: ['y', 'y', 'y', 'a', 'y', 'y', 'y', 'y', 'y','y', 'a', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'sym', label: 'Touring / road',       cells: ['y', 'a', 'y', 'y', 'y', 'y', 'y', 'y', 'y','y', 'y', 'a', 'y', 'a', 'y', 'y'] },
    { type: 'sym', label: 'Daily / commuting',    cells: ['y', 'a', 'y', 'y', 'y', 'a', 'a', 'y', 'a','y', 'a', 'a', 'y', 'a', 'a', 'y'] }
  ],

  // "Staff must know" callout. Each line: lead (bold) + rest.
  notes: [
    { lead: 'Dakar:', rest: 'No CE certification at all — no armour included (pockets only). Off-road only. For road use, direct customers to the Marrakesh instead.' },
    { lead: 'Latitude & Altitude:', rest: 'Current gen is CE A, not AA — stretch panels caused a rating drop from the previous AA generation. Be transparent with informed buyers.' },
    { lead: 'Kodiak 2', rest: '(prev. gen on floor) is also CE A. Only Gen 4 is back to CE AA. Always clarify which gen a customer is looking at.' },
    { lead: 'Raptor & Adventure Rally:', rest: 'Over-armour shells — no armour included, must be worn over a KLIM Tactical armour layer or airbag. Raptor is CE B (EN 17092-5, abrasion only); Adventure Rally has no published EN 17092 rating. Neither is comparable to the AA jackets.' },
    { lead: 'Sixxer:', rest: 'Leather jacket with no armour included and no published CE rating — fit D3O/Rogue Level 1/2 pads before it is ridden.' },
    { lead: 'Traverse GTX:', rest: 'No published CE garment rating; ships with Level 1 shoulder/elbow armour only — no back pad (sold separately). Cheapest Gore-Tex KLIM jacket.' },
    { lead: 'Baja vs Baja S4:', rest: 'The "S4" is the OLDER Gen 2 (D3O Level 1); the plain "Baja" is the newer Gen 3 (Rogue Level 1). Check the SKU and armour, not the name.' }
  ]
});
