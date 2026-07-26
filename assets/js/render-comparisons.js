/*
 * Renders the Comparisons page. A left-hand list of headings (one per
 * comparison table) drives a tab/panel switch: clicking a heading shows that
 * table and hides the others — only one visible at a time. Mirrors the rest of
 * the site (one data file per table, derived rendering, shared CSS tokens).
 */
(function () {
  'use strict';
  var K = window.KLIM || {};
  var esc = K.escText || function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };

  var SYM = {
    y: { g: '✓', cls: 'is-yes' },
    a: { g: '—', cls: 'is-na' }
  };

  var LEGEND = [
    { kind: 'sym',   sym: 'y',    desc: 'Yes / included' },
    { kind: 'sym',   sym: 'a',    desc: 'Not recommended / N/A' },
    { kind: 'badge', sym: 'AAA',  desc: 'Highest CE rating' },
    { kind: 'badge', sym: 'AA',   desc: 'High CE rating' },
    { kind: 'badge', sym: 'A',    desc: 'Standard CE rating' },
    { kind: 'badge', sym: 'B',    desc: 'CE B (EN 17092-5) — abrasion only, no impact zones' },
    { kind: 'badge', sym: 'None', desc: 'No CE certification' },
    { kind: 'badge', sym: 'NP',   desc: 'CE rating not published — confirm in-store' },
    { kind: 'tag', tone: 'gtx3', sym: 'GTX 3L Pro', desc: 'Gore-Tex 3-layer Pro shell' },
    { kind: 'tag', tone: 'gtx2', sym: 'GTX 2L',     desc: '2-layer laminate; never wets out' },
    { kind: 'tag', tone: 'dwr',  sym: 'DWR only',   desc: 'Fully porous; air flows through every panel at low speeds' }
    ];

  // ---- cell renderers ----------------------------------------------------
  function sym(code) {
    var s = SYM[code] || SYM.a;
    return '<span class="cmpc-sym ' + s.cls + '">' + s.g + '</span>';
  }

  function cellHTML(type, cell) {
    switch (type) {
      case 'sym':
        return sym(cell);
      case 'symc':
        return sym(cell.code) +
          (cell.note ? '<span class="cmpc-note ' +
            (cell.code === 'n' ? 'is-no-note' : 'is-yes-note') + '">' +
            esc(cell.note) + '</span>' : '');
      case 'tag':
        return '<span class="cmpc-tag tone-' + esc(cell.tone) + '">' + esc(cell.text) + '</span>';
      case 'vent':
        var dots = '';
        for (var k = 0; k < 5; k++) {
          dots += '<span class="cmpc-dot' + (k < cell.dots ? ' on' : '') + '"></span>';
        }
        return '<span class="cmpc-dots">' + dots + '</span>' +
          '<span class="cmpc-vlabel">' + esc(cell.label) + '</span>';
      case 'ce':
        return '<span class="cmpc-badge ce-' + esc(cell.rating) + '">' + esc(cell.rating) + '</span>' +
          (cell.note ? '<span class="cmpc-note is-mute">' + esc(cell.note) + '</span>' : '');
      case 'num':
        return '<span class="cmpc-num">' + esc(cell) + '</span>';
      case 'price':
        return '<span class="cmpc-price">' + esc(cell) + '</span>';
      default:
        return esc(cell);
    }
  }

  function tableHTML(c) {
    var cols = c.columns || [];
    var head = '<thead><tr>' +
      '<th class="cmpc-corner">' + esc(c.rowHeader || '') + '</th>' +
      cols.map(function (col) {
        return '<th class="cmpc-colhead">' +
          '<span class="cmpc-colnum">' + esc(col.num) + '</span>' +
          (col.img ? '<span class="cmpc-colimg"><img src="' + esc(col.img) +
            '" alt="' + esc(col.name) + '" loading="lazy" /></span>' : '') +
          '<span class="cmpc-colname">' + esc(col.name) + '</span>' +
          (col.sub ? '<span class="cmpc-colsub">' + esc(col.sub) + '</span>' : '') +
          '</th>';
      }).join('') + '</tr></thead>';

    var alt = false;
    var body = (c.rows || []).map(function (r) {
      if (r.type === 'sec') {
        alt = false;   // shading restarts under each section, as on the sheet
        return '<tr class="cmpc-sec"><td colspan="' + (cols.length + 1) + '">' +
          esc(r.label).toUpperCase() + '</td></tr>';
      }
      var cells = (r.cells || []).map(function (cell, i) {
        var multi = (r.type === 'symc' && cell && cell.note) ||
                    r.type === 'vent' ||
                    (r.type === 'ce' && cell && cell.note);
        return '<td class="cmpc-cell type-' + r.type + (multi ? ' is-stacked' : '') + '">' +
          cellHTML(r.type, cell) + '</td>';
      }).join('');
      var rowCls = alt ? ' class="cmpc-altrow"' : '';
      alt = !alt;
      return '<tr' + rowCls + '><th class="cmpc-rowlabel" scope="row">' + esc(r.label) + '</th>' + cells + '</tr>';
    }).join('');

    return '<div class="cmpc-tablewrap"><table class="cmpc-table">' + head +
      '<tbody>' + body + '</tbody></table></div>';
  }

  function notesHTML(notes) {
    if (!notes || !notes.length) return '';
    var lines = notes.map(function (n) {
      return '<p class="cmpc-note-line"><strong>' + esc(n.lead) + '</strong> ' + esc(n.rest) + '</p>';
    }).join('');
    return '<div class="cmpc-callout">' +
      '<div class="cmpc-callout-head">⚠ STAFF MUST KNOW</div>' + lines + '</div>';
  }

  function legendHTML() {
    var items = LEGEND.map(function (l) {
      var mark;
      if (l.kind === 'sym') {
        mark = '<span class="cmpc-sym ' + (SYM[l.sym] || SYM.a).cls + '">' + (SYM[l.sym] || SYM.a).g + '</span>';
      } else if (l.kind === 'tag') {
        mark = '<span class="cmpc-tag tone-' + esc(l.tone) + '">' + esc(l.sym) + '</span>';
      } else {
        mark = '<span class="cmpc-badge ce-' + esc(l.sym) + '">' + esc(l.sym) + '</span>';
      }
      return '<span class="cmpc-leg-item">' + mark +
        '<span class="cmpc-leg-desc">' + esc(l.desc) + '</span></span>';
    }).join('');
    return '<div class="cmpc-legend">' + items + '</div>';
  }

  function panelHTML(c, i) {
    return '<section class="cmpc-panel" id="cmp-panel-' + esc(c.id) + '" ' +
      'role="tabpanel" aria-labelledby="cmp-tab-' + esc(c.id) + '"' +
      (i === 0 ? '' : ' hidden') + '>' +
      '<header class="cmpc-panel-head">' +
        '<h2 class="cmpc-panel-title">' + esc(c.title) + '</h2>' +
        (c.subtitle ? '<p class="cmpc-panel-sub">' + esc(c.subtitle) + '</p>' : '') +
      '</header>' +
      tableHTML(c) +
      notesHTML(c.notes) +
      legendHTML() +
    '</section>';
  }

  function tabHTML(c, i) {
    return '<button class="cmpc-tab' + (i === 0 ? ' active' : '') + '" type="button" ' +
      'role="tab" id="cmp-tab-' + esc(c.id) + '" aria-controls="cmp-panel-' + esc(c.id) + '" ' +
      'aria-selected="' + (i === 0 ? 'true' : 'false') + '" data-target="cmp-panel-' + esc(c.id) + '">' +
      '<span class="cmpc-tab-idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
      '<span class="cmpc-tab-label">' + esc(c.navLabel || c.title) + '</span>' +
      '<span class="cmpc-tab-ico" aria-hidden="true">→</span>' +
    '</button>';
  }

  document.addEventListener('DOMContentLoaded', function () {
    var list = window.KLIM_COMPARISONS || [];
    var tabsRoot = document.getElementById('cmpTabs');
    var panelsRoot = document.getElementById('cmpPanels');
    if (!tabsRoot || !panelsRoot) return;

    if (!list.length) {
      panelsRoot.innerHTML = '<p class="lede">No comparison tables registered yet.</p>';
      return;
    }

    tabsRoot.innerHTML = list.map(tabHTML).join('');
    panelsRoot.innerHTML = list.map(panelHTML).join('');

    var tabs = [].slice.call(tabsRoot.querySelectorAll('.cmpc-tab'));
    function activate(target) {
      tabs.forEach(function (t) {
        var on = t.dataset.target === target;
        t.classList.toggle('active', on);
        t.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      panelsRoot.querySelectorAll('.cmpc-panel').forEach(function (p) {
        p.hidden = (p.id !== target);
      });
    }
    tabs.forEach(function (t) {
      t.addEventListener('click', function () { activate(t.dataset.target); });
    });

    var count = document.getElementById('cmpCount');
    if (count) count.textContent = ('0' + list.length).slice(-2);
  });
})();
