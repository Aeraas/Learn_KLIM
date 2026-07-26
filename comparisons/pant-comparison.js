/*
 * Comparison table: "Which pant is right for you?"
 * Sibling of jacket-comparison.js — same renderer, same cell types.
 *
 * Built from the staff product files for all 8 KLIM pants. Row set adapted for
 * pants (vs the jacket table): armour is split into Knee + Hip (pants armour
 * these zones separately); jacket-only rows (back-protector pocket, thermal
 * liner) are dropped; "CE jacket rating" → "CE pant rating"; and a Fit &
 * features section adds the pant-specific differentiators.
 *
 * Cell types: sec / sym ('y'|'n'|'a') / symc {code,note} / tag {text,tone} /
 *   vent {dots,label} / ce {rating,note} / num.
 */
window.KLIM_COMPARISONS = window.KLIM_COMPARISONS || [];
window.KLIM_COMPARISONS.push({
  id: 'pants',
  navLabel: 'Pants',
  title: 'Which pant is right for you?',
  subtitle: 'Cross-referenced against staff training files | Confirm current in-store prices and stock',
  rowHeader: 'Pants',

  columns: [
    { num: '1',  name: 'Marrakesh',    img: 'assets/img/Marrakesh_Pant.png' },
    { num: '2',  name: 'Dakar',        img: 'assets/img/Dakar_Pant.png' },
    { num: '3',  name: 'Carlsbad',     img: 'assets/img/Carlsbad_Pant.png' },
    { num: '4',  name: 'Latitude',     img: 'assets/img/Latitude_Pant.png' },
    { num: '5',  name: 'Kodiak',       img: 'assets/img/Kodiak_Pant.png' },
    { num: '6',  name: 'Badlands Pro', img: 'assets/img/Badlands_Pro_Pant.png' },
    { num: '6A', name: 'Badlands A3',  img: 'assets/img/Badlands_Pro_A3_Pant.png' },
    { num: '7',  name: 'Switchback',   img: 'assets/img/SwitchBack_Cargo_Pant.png' }
  ],

  rows: [
    { type: 'sec', label: 'Waterproofing' },
    { type: 'sym', label: 'Waterproof', cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'tag', label: 'Membrane', cells: [
      { text: 'DWR only',   tone: 'dwr'  },
      { text: 'DWR only',   tone: 'dwr'  },
      { text: 'GTX 2L',     tone: 'gtx2' },
      { text: 'GTX 2L',     tone: 'gtx2' },
      { text: 'GTX 3L Pro', tone: 'gtx3' },
      { text: 'GTX 3L Pro', tone: 'gtx3' },
      { text: 'GTX 3L Pro', tone: 'gtx3' },
      { text: 'DWR only',   tone: 'dwr'  }
    ] },

    { type: 'sec', label: 'Climate & ventilation' },
    { type: 'sym', label: 'Windproof', cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'vent', label: 'Ventilation', cells: [
      { dots: 5, label: 'Full airflow' },
      { dots: 4, label: 'Breathable'   },
      { dots: 2, label: '4 vents'      },
      { dots: 2, label: '4 vents'      },
      { dots: 2, label: '4 vents'      },
      { dots: 3, label: '6 vents'      },
      { dots: 3, label: '6 vents'      },
      { dots: 4, label: 'Breathable'   }
    ] },
    { type: 'sym', label: 'Best for hot weather',  cells: ['y', 'y', 'a', 'a', 'a', 'a', 'a', 'y'] },
    { type: 'sym', label: 'Best for cold weather', cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'sym', label: 'All-season use',        cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'sym', label: 'Best for layering',     cells: ['y', 'y', 'y', 'y', 'y', 'y', 'y', 'y'] },

    { type: 'sec', label: 'Protection' },
    { type: 'ce', label: 'CE pant rating', cells: [
      { rating: 'AA'   },
      { rating: 'None' },
      { rating: 'AA'   },
      { rating: 'A'    },
      { rating: 'AA', note: 'Gen 4 | Kodiak 2 = A' },
      { rating: 'AA'   },
      { rating: 'AAA'  },
      { rating: 'AA'   }
    ] },
    { type: 'symc', label: 'Knee armour', cells: [
      { code: 'y'},
      { code: 'a'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'}
    ] },
    { type: 'symc', label: 'Hip armour', cells: [
      { code: 'y'},
      { code: 'a'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'},
      { code: 'y'}
    ] },

    { type: 'sec', label: 'Fit & features' },
    { type: 'sym', label: 'Leather inner-knee (grip)', cells: ['a', 'y', 'y', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'sym', label: 'Fits over ADV boots',       cells: ['a', 'y', 'y', 'a', 'y', 'y', 'y', 'y'] },
    { type: 'sym', label: 'Connects to jacket (zip)',  cells: ['a', 'a', 'y', 'y', 'y', 'y', 'y', 'a'] },

    { type: 'sec', label: 'Storage' },
    { type: 'num', label: 'Storage pockets', cells: ['5', '2', '2', '1', '2', '2', '2', '7'] },

    { type: 'sec', label: 'Riding use' },
    { type: 'sym', label: 'Adventure / off-road', cells: ['a', 'y', 'y', 'a', 'y', 'y', 'y', 'y'] },
    { type: 'sym', label: 'Touring / road',       cells: ['y', 'a', 'y', 'y', 'y', 'y', 'y', 'a'] },
    { type: 'sym', label: 'Daily / commuting',    cells: ['y', 'a', 'y', 'y', 'a', 'a', 'a', 'y'] }
  ],

  notes: [
    { lead: 'Dakar:', rest: 'Not CE rated (off-road designation) — armour is sold separately (pad pockets only). For a CE-rated road pant, steer to the Marrakesh or Carlsbad.' },
    { lead: 'Latitude:', rest: 'CE A, not AA (EN 17092-4). Some older sources cite AA from earlier gens — quote the current CE A spec to informed buyers.' },
    { lead: 'Kodiak 2', rest: '(prev. gen on floor) pant is CE A; only Gen 4 restored CE AA via the seamless crotch. Always clarify which gen.' },
    { lead: 'Marrakesh & Switchback:', rest: 'DWR only, no membrane — not waterproof in sustained rain; recommend a waterproof over-layer. The Marrakesh leg also will not fit over tall ADV boots.' }
  ]
});
