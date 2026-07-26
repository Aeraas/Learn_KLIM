/*
 * KLIM Sales Floor — single-page app.
 * Merges the old index / product / comparisons renderers behind a hash router
 * so everything lives in one file. Routes:
 *   #/            -> catalog
 *   #/p/<id>      -> one product
 *   #/compare     -> comparison tables
 * Images are resolved through window.KLIM_IMG (base64 map) with a plain-path
 * fallback, so the same code works whether or not photos are embedded.
 */
(function () {
  'use strict';
  var K = window.KLIM;

  // ---- image resolver ----------------------------------------------------
  function imgSrc(path) {
    if (!path) return '';
    var map = window.KLIM_IMG;
    if (map) {
      var hit = map[String(path).toLowerCase()];
      if (hit) return hit;
    }
    return path;
  }

  // =========================================================================
  // CATALOG
  // =========================================================================
  var GROUP_ORDER = ['Jackets', 'Pants', 'Gloves', 'Boots', 'Helmets', 'Layers', 'Accessories', 'Other'];
  var FOLD_KEY = 'klim-catalog-folds';
  var indexBuilt = false;

  function loadFolds() {
    try { return JSON.parse(localStorage.getItem(FOLD_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveFold(group, collapsed) {
    var folds = loadFolds();
    folds[group] = collapsed ? 'collapsed' : 'open';
    try { localStorage.setItem(FOLD_KEY, JSON.stringify(folds)); } catch (e) {}
  }

  function initials(name) {
    var clean = name.replace(/^KLIM\s+/i, '').trim();
    var parts = clean.split(/\s+/).slice(0, 2);
    return parts.map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }

  function cardHTML(p) {
    var parsed = K.parse(p.markdown);
    var name = parsed.title;
    var tag = K.tagline(parsed);
    var price = K.priceSummary(parsed);
    var accent = p.accent || 'var(--accent)';
    var badges = (p.badges || []).slice(0, 3).map(function (b) {
      return '<span class="chip chip--sm">' + K.escText(b) + '</span>';
    }).join('');
    var cat = p.category ? '<div class="card-cat">' + K.escText(p.category) + '</div>' : '';
    var visual = p.image
      ? '<img class="card-img" src="' + K.escAttr(imgSrc(p.image)) + '" alt="' + K.escAttr(name) + '" loading="lazy" />'
      : '<span class="card-mono">' + K.escText(initials(name)) + '</span>';

    return '<a class="card reveal" href="#/p/' + encodeURIComponent(p.id) + '"' +
      ' style="--card-accent:' + accent + '">' +
      '<div class="card-visual" aria-hidden="true">' + visual + '</div>' +
      '<div class="card-body">' +
        cat +
        '<h2 class="card-title">' + K.escText(name) + '</h2>' +
        (tag ? '<p class="card-hook">' + K.inline(tag) + '.</p>' : '') +
        '<div class="card-chips">' + badges + '</div>' +
        '<div class="card-foot">' +
          (price ? '<span class="card-price">' + K.escText(price) + '</span>' : '<span></span>') +
          '<span class="card-go">View card &rarr;</span>' +
        '</div>' +
      '</div></a>';
  }

  function wireFolds(root) {
    root.querySelectorAll('.cat-group').forEach(function (sec) {
      var btn = sec.querySelector('.cat-group-head');
      btn.addEventListener('click', function () {
        var collapsed = sec.classList.toggle('collapsed');
        btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        saveFold(sec.dataset.group, collapsed);
      });
    });
  }

  function buildIndex() {
    if (indexBuilt) return;
    indexBuilt = true;
    var list = window.KLIM_PRODUCTS || [];
    var root = document.getElementById('catalog');
    if (!list.length) {
      root.innerHTML = '<p class="lede">No products registered yet.</p>';
      return;
    }
    var buckets = {};
    list.forEach(function (p) {
      var g = (p.group || 'Other').trim() || 'Other';
      (buckets[g] || (buckets[g] = [])).push(p);
    });
    var groups = Object.keys(buckets).sort(function (a, b) {
      var ai = GROUP_ORDER.indexOf(a); var bi = GROUP_ORDER.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
    var folds = loadFolds();
    root.innerHTML = groups.map(function (g) {
      var items = buckets[g];
      var collapsed = folds[g] === 'collapsed';
      var cards = items.map(cardHTML).join('');
      return '<section class="cat-group' + (collapsed ? ' collapsed' : '') + '" data-group="' +
          K.escAttr(g) + '">' +
        '<button class="cat-group-head" type="button" aria-expanded="' + (collapsed ? 'false' : 'true') + '">' +
          '<span class="cat-group-idx">//</span>' +
          '<span class="cat-group-title">' + K.escText(g) + '</span>' +
          '<span class="cat-group-count">' + ('0' + items.length).slice(-2) + '</span>' +
          '<span class="cat-group-ico" aria-hidden="true"></span>' +
        '</button>' +
        '<div class="cat-group-body"><div class="cat-group-inner">' +
          '<div class="catalog-grid">' + cards + '</div>' +
        '</div></div>' +
      '</section>';
    }).join('');
    wireFolds(root);
    revealIn(root.querySelectorAll('.reveal'));
    var count = document.getElementById('catCount');
    if (count) count.textContent = ('0' + list.length).slice(-2);
  }

  // =========================================================================
  // PRODUCT
  // =========================================================================
  var LABELS = {
    intro: 'What it is', selling: 'The pitch', features: 'Key features',
    audience: "Who it's for", price: 'Price', quotes: 'Voices from the field',
    faq: 'On the floor', sources: 'Sources'
  };

  function el(html) {
    var d = document.createElement('div'); d.innerHTML = html.trim();
    return d.firstElementChild;
  }

  function renderIntro(s) {
    var blocks = K.toBlocks(s.lines);
    var html = blocks.map(function (b) {
      if (b.kind === 'p') return '<p class="lede">' + K.inline(b.text) + '</p>';
      return listHTML(b);
    }).join('');
    return panelBody(html);
  }
  function renderAudience(s) {
    var ul = K.toBlocks(s.lines).filter(function (b) { return b.kind === 'ul'; })[0];
    var items = (ul ? ul.items : []).map(function (it) {
      var lv = K.splitLabel(it);
      var body = lv.label
        ? '<strong>' + K.inline(lv.label) + '</strong> ' + K.inline(lv.value)
        : K.inline(lv.value);
      return '<li class="aud-item"><span class="aud-mark">&#9656;</span><span>' + body + '</span></li>';
    }).join('');
    return panelBody('<ul class="aud-list">' + items + '</ul>');
  }
  function renderFeatures(s) {
    var ul = K.toBlocks(s.lines).filter(function (b) { return b.kind === 'ul'; })[0];
    var rows = (ul ? ul.items : []).map(function (it) {
      var lv = K.splitLabel(it);
      if (lv.label) {
        return '<div class="spec"><div class="spec-k">' + K.inline(lv.label) + '</div>' +
          '<div class="spec-v">' + K.inline(lv.value) + '</div></div>';
      }
      return '<div class="spec spec--full"><div class="spec-v">' + K.inline(lv.value) + '</div></div>';
    }).join('');
    return panelBody('<div class="spec-grid">' + rows + '</div>');
  }
  function renderSelling(s) {
    var ol = K.toBlocks(s.lines).filter(function (b) { return b.kind === 'ol'; })[0];
    var cards = (ol ? ol.items : []).map(function (it, i) {
      var hb = K.splitHeadline(it);
      var n = ('0' + (i + 1)).slice(-2);
      return '<article class="sell-card reveal">' +
        '<div class="sell-num">' + n + '</div>' +
        '<h3 class="sell-head">' + K.inline(hb.head || '') + '</h3>' +
        '<p class="sell-body">' + K.inline(hb.body) + '</p>' +
        '</article>';
    }).join('');
    return '<div class="sell-grid">' + cards + '</div>';
  }
  function renderPrice(s) {
    var ul = K.toBlocks(s.lines).filter(function (b) { return b.kind === 'ul'; })[0];
    var cards = (ul ? ul.items : []).map(function (it) {
      var lv = K.splitLabel(it);
      var m = lv.value.match(/^([£$€]\s?[\d.,]+)([\s\S]*)$/);
      var big = m ? m[1] : lv.value;
      var note = m && m[2] ? '<div class="price-note">' + K.inline(m[2].replace(/^\s*\(?/, '').replace(/\)?\s*$/, '')) + '</div>' : '';
      return '<div class="price-card reveal">' +
        '<div class="price-region">' + K.inline(lv.label || 'Price') + '</div>' +
        '<div class="price-amt">' + K.inline(big) + '</div>' + note + '</div>';
    }).join('');
    return panelBody('<div class="price-grid">' + cards + '</div>');
  }
  function renderQuotes(s) {
    var ul = K.toBlocks(s.lines).filter(function (b) { return b.kind === 'ul'; })[0];
    var cards = (ul ? ul.items : []).map(function (it) {
      var isQuote = /^\*"|^\*“/.test(it.trim()) || /^\*/.test(it.trim());
      return '<figure class="quote-card reveal' + (isQuote ? '' : ' quote-card--note') + '">' +
        '<blockquote>' + K.inline(it) + '</blockquote></figure>';
    }).join('');
    return panelBody('<div class="quote-grid">' + cards + '</div>');
  }
  function renderFaq(s) {
    var items = K.toFaq(s.lines).map(function (qa) {
      var ans = qa.a.map(function (l) { return '<p>' + K.inline(l) + '</p>'; }).join('');
      return '<div class="acc" data-acc>' +
        '<button class="acc-q" type="button" aria-expanded="false">' +
        '<span>' + K.inline(qa.q) + '</span><span class="acc-ico" aria-hidden="true">+</span></button>' +
        '<div class="acc-a"><div class="acc-a-inner">' + ans + '</div></div></div>';
    }).join('');
    return panelBody('<div class="acc-list">' + items + '</div>');
  }
  function renderSources(s) {
    var ul = K.toBlocks(s.lines).filter(function (b) { return b.kind === 'ul'; })[0];
    var items = (ul ? ul.items : []).map(function (it) {
      return '<li class="src-item">' + K.inline(it) + '</li>';
    }).join('');
    return '<details class="src"><summary class="src-sum">' +
      '<span>Sources &amp; references</span>' +
      '<span class="src-count">' + (ul ? ul.items.length : 0) + '</span></summary>' +
      '<ul class="src-list">' + items + '</ul></details>';
  }
  function renderGeneric(s) {
    var html = K.toBlocks(s.lines).map(function (b) {
      if (b.kind === 'p') return '<p>' + K.inline(b.text) + '</p>';
      if (b.kind === 'table') return tableHTML(b);
      return listHTML(b);
    }).join('');
    return panelBody(html);
  }
  function renderComparison(s) {
    var html = K.toBlocks(s.lines).map(function (b) {
      if (b.kind === 'table') return tableHTML(b);
      if (b.kind === 'p') return '<p>' + K.inline(b.text) + '</p>';
      return listHTML(b);
    }).join('');
    return panelBody(html);
  }
  function tableHTML(b) {
    var rows = b.rows || [];
    if (!rows.length) return '';
    var head = '<thead><tr>' + rows[0].map(function (c) {
      return '<th>' + K.inline(c) + '</th>';
    }).join('') + '</tr></thead>';
    var body = rows.slice(1).map(function (r) {
      return '<tr>' + r.map(function (c, i) {
        var cls = i === 0 ? ' class="cmp-rowhead"' : '';
        return '<td' + cls + '>' + K.inline(c) + '</td>';
      }).join('') + '</tr>';
    }).join('');
    return '<div class="cmp-wrap"><table class="cmp-table">' + head +
      '<tbody>' + body + '</tbody></table></div>';
  }
  function listHTML(b) {
    var tag = b.kind === 'ol' ? 'ol' : 'ul';
    var items = b.items.map(function (it) { return '<li>' + K.inline(it) + '</li>'; }).join('');
    return '<' + tag + ' class="md-list">' + items + '</' + tag + '>';
  }
  function panelBody(html) { return '<div class="panel-body">' + html + '</div>'; }

  var RENDERERS = {
    intro: renderIntro, audience: renderAudience, features: renderFeatures,
    selling: renderSelling, comparison: renderComparison, price: renderPrice,
    quotes: renderQuotes, faq: renderFaq, sources: renderSources, generic: renderGeneric
  };

  function findProduct(id) {
    var list = window.KLIM_PRODUCTS || [];
    if (id) {
      var hit = list.filter(function (p) { return p.id === id; })[0];
      if (hit) return hit;
    }
    return list[0] || null;
  }

  function buildProduct(id) {
    var p = findProduct(id);
    var sectionsRoot = document.getElementById('sections');
    if (!p) {
      document.getElementById('hero').innerHTML = '';
      document.getElementById('sectionNav').innerHTML = '';
      sectionsRoot.innerHTML =
        '<div class="container"><p class="lede" style="padding:6rem 0">No product found. ' +
        'Return to the <a href="#/">catalog</a>.</p></div>';
      return;
    }
    var parsed = K.parse(p.markdown);
    document.title = parsed.title + ' — KLIM Sales Floor';
    // per-product accent (reset to brand default first so it never leaks)
    document.documentElement.style.setProperty('--accent', p.accent || DEFAULT_ACCENT);

    buildHero(p, parsed);
    buildNav(parsed);
    buildSections(parsed);
    wireProduct();
  }

  function buildHero(p, parsed) {
    var tag = K.tagline(parsed);
    var price = K.priceSummary(parsed);
    var badges = (p.badges || []).map(function (b) {
      return '<span class="chip">' + K.escText(b) + '</span>';
    }).join('');
    var cat = p.category ? '<div class="hero-cat">' + K.escText(p.category) + '</div>' : '';
    var firstSlug = parsed.sections.length ? parsed.sections[0].slug : '';
    var hero = document.getElementById('hero');
    hero.innerHTML =
      '<div class="hero-grid-bg" aria-hidden="true"></div>' +
      '<div class="hero-inner container">' +
        cat +
        '<h1 class="hero-title">' + K.escText(parsed.title) + '</h1>' +
        (tag ? '<p class="hero-hook">' + K.inline(tag) + '.</p>' : '') +
        '<div class="hero-chips">' + badges + '</div>' +
        (price ? '<div class="hero-meta"><span class="hero-price-label">From</span>' +
          '<span class="hero-price">' + K.escText(price) + '</span></div>' : '') +
      '</div>' +
      (firstSlug ? '<a href="#sec-' + firstSlug + '" class="hero-cue" data-anchor="sec-' + firstSlug + '" aria-label="Scroll to content">' +
        '<span>Scroll</span><span class="hero-cue-line"></span></a>' : '');
  }

  function buildNav(parsed) {
    var nav = document.getElementById('sectionNav');
    nav.innerHTML = parsed.sections.map(function (s, i) {
      var label = LABELS[s.type] || s.heading;
      return '<a class="dot" href="#sec-' + s.slug + '" data-anchor="sec-' + s.slug + '" data-target="sec-' + s.slug + '">' +
        '<span class="dot-mark"></span>' +
        '<span class="dot-label">' + ('0' + (i + 1)).slice(-2) + ' &middot; ' + K.escText(label) + '</span></a>';
    }).join('');
  }

  function buildSections(parsed) {
    var root = document.getElementById('sections');
    root.innerHTML = parsed.sections.map(function (s, i) {
      var label = LABELS[s.type] || s.heading;
      var feature = (s.type === 'selling');
      var body = (RENDERERS[s.type] || renderGeneric)(s);
      return '<section id="sec-' + s.slug + '" class="section reveal' +
        (feature ? ' section--feature' : '') + '" data-type="' + s.type + '">' +
        '<div class="container">' +
          '<header class="section-head">' +
            '<span class="section-idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
            '<h2 class="section-title">' + K.escText(label) + '</h2>' +
            '<span class="section-rule"></span>' +
          '</header>' +
          body +
        '</div></section>';
    }).join('');
  }

  var productObservers = [];
  function clearObservers() {
    productObservers.forEach(function (o) { try { o.disconnect(); } catch (e) {} });
    productObservers = [];
  }

  function wireProduct() {
    // in-page anchors (dots + hero cue) — scroll without touching the hash router
    document.querySelectorAll('#view-product [data-anchor]').forEach(function (a) {
      a.addEventListener('click', function (ev) {
        ev.preventDefault();
        var t = document.getElementById(a.dataset.anchor);
        if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    // accordions
    document.querySelectorAll('#view-product [data-acc]').forEach(function (acc) {
      var btn = acc.querySelector('.acc-q');
      var panel = acc.querySelector('.acc-a');
      btn.addEventListener('click', function () {
        var open = acc.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
      });
    });

    revealIn(document.querySelectorAll('#view-product .reveal'));

    // scroll-spy for the side nav
    var dots = [].slice.call(document.querySelectorAll('#view-product .dot'));
    var sections = [].slice.call(document.querySelectorAll('#view-product .section'));
    if ('IntersectionObserver' in window) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            dots.forEach(function (d) {
              d.classList.toggle('active', d.dataset.target === e.target.id);
            });
          }
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      sections.forEach(function (s) { spy.observe(s); });
      productObservers.push(spy);
    }
  }

  // shared progress bar (product view only)
  var bar = document.getElementById('progress');
  function onScroll() {
    if (bar.hidden) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
  }
  document.addEventListener('scroll', onScroll, { passive: true });

  // =========================================================================
  // COMPARISONS
  // =========================================================================
  var cmpBuilt = false;
  var esc = (K && K.escText) || function (s) {
    return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  };
  var SYM = { y: { g: '✓', cls: 'is-yes' }, a: { g: '—', cls: 'is-na' } };
  var LEGEND = [
    { kind: 'sym', sym: 'y', desc: 'Yes / included' },
    { kind: 'sym', sym: 'a', desc: 'Not recommended / N/A' },
    { kind: 'badge', sym: 'AAA', desc: 'Highest CE rating' },
    { kind: 'badge', sym: 'AA', desc: 'High CE rating' },
    { kind: 'badge', sym: 'A', desc: 'Standard CE rating' },
    { kind: 'badge', sym: 'B', desc: 'CE B (EN 17092-5) — abrasion only, no impact zones' },
    { kind: 'badge', sym: 'None', desc: 'No CE certification' },
    { kind: 'badge', sym: 'NP', desc: 'CE rating not published — confirm in-store' },
    { kind: 'tag', tone: 'gtx3', sym: 'GTX 3L Pro', desc: 'Gore-Tex 3-layer Pro shell' },
    { kind: 'tag', tone: 'gtx2', sym: 'GTX 2L', desc: '2-layer laminate; never wets out' },
    { kind: 'tag', tone: 'dwr', sym: 'DWR only', desc: 'Fully porous; air flows through every panel at low speeds' }
  ];
  function cmpSym(code) {
    var s = SYM[code] || SYM.a;
    return '<span class="cmpc-sym ' + s.cls + '">' + s.g + '</span>';
  }
  function cmpCell(type, cell) {
    switch (type) {
      case 'sym': return cmpSym(cell);
      case 'symc':
        return cmpSym(cell.code) +
          (cell.note ? '<span class="cmpc-note ' +
            (cell.code === 'n' ? 'is-no-note' : 'is-yes-note') + '">' +
            esc(cell.note) + '</span>' : '');
      case 'tag':
        return '<span class="cmpc-tag tone-' + esc(cell.tone) + '">' + esc(cell.text) + '</span>';
      case 'vent':
        var dots = '';
        for (var k = 0; k < 5; k++) dots += '<span class="cmpc-dot' + (k < cell.dots ? ' on' : '') + '"></span>';
        return '<span class="cmpc-dots">' + dots + '</span>' +
          '<span class="cmpc-vlabel">' + esc(cell.label) + '</span>';
      case 'ce':
        return '<span class="cmpc-badge ce-' + esc(cell.rating) + '">' + esc(cell.rating) + '</span>' +
          (cell.note ? '<span class="cmpc-note is-mute">' + esc(cell.note) + '</span>' : '');
      case 'num': return '<span class="cmpc-num">' + esc(cell) + '</span>';
      case 'price': return '<span class="cmpc-price">' + esc(cell) + '</span>';
      default: return esc(cell);
    }
  }
  function cmpTable(c) {
    var cols = c.columns || [];
    var head = '<thead><tr>' +
      '<th class="cmpc-corner">' + esc(c.rowHeader || '') + '</th>' +
      cols.map(function (col) {
        return '<th class="cmpc-colhead">' +
          '<span class="cmpc-colnum">' + esc(col.num) + '</span>' +
          (col.img ? '<span class="cmpc-colimg"><img src="' + esc(imgSrc(col.img)) +
            '" alt="' + esc(col.name) + '" loading="lazy" /></span>' : '') +
          '<span class="cmpc-colname">' + esc(col.name) + '</span>' +
          (col.sub ? '<span class="cmpc-colsub">' + esc(col.sub) + '</span>' : '') +
          '</th>';
      }).join('') + '</tr></thead>';
    var alt = false;
    var body = (c.rows || []).map(function (r) {
      if (r.type === 'sec') {
        alt = false;
        return '<tr class="cmpc-sec"><td colspan="' + (cols.length + 1) + '">' +
          esc(r.label).toUpperCase() + '</td></tr>';
      }
      var cells = (r.cells || []).map(function (cell) {
        var multi = (r.type === 'symc' && cell && cell.note) ||
                    r.type === 'vent' ||
                    (r.type === 'ce' && cell && cell.note);
        return '<td class="cmpc-cell type-' + r.type + (multi ? ' is-stacked' : '') + '">' +
          cmpCell(r.type, cell) + '</td>';
      }).join('');
      var rowCls = alt ? ' class="cmpc-altrow"' : '';
      alt = !alt;
      return '<tr' + rowCls + '><th class="cmpc-rowlabel" scope="row">' + esc(r.label) + '</th>' + cells + '</tr>';
    }).join('');
    return '<div class="cmpc-tablewrap"><table class="cmpc-table">' + head +
      '<tbody>' + body + '</tbody></table></div>';
  }
  function cmpNotes(notes) {
    if (!notes || !notes.length) return '';
    var lines = notes.map(function (n) {
      return '<p class="cmpc-note-line"><strong>' + esc(n.lead) + '</strong> ' + esc(n.rest) + '</p>';
    }).join('');
    return '<div class="cmpc-callout">' +
      '<div class="cmpc-callout-head">⚠ STAFF MUST KNOW</div>' + lines + '</div>';
  }
  function cmpLegend() {
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
  function cmpPanel(c, i) {
    return '<section class="cmpc-panel" id="cmp-panel-' + esc(c.id) + '" ' +
      'role="tabpanel" aria-labelledby="cmp-tab-' + esc(c.id) + '"' +
      (i === 0 ? '' : ' hidden') + '>' +
      '<header class="cmpc-panel-head">' +
        '<h2 class="cmpc-panel-title">' + esc(c.title) + '</h2>' +
        (c.subtitle ? '<p class="cmpc-panel-sub">' + esc(c.subtitle) + '</p>' : '') +
      '</header>' +
      cmpTable(c) + cmpNotes(c.notes) + cmpLegend() +
    '</section>';
  }
  function cmpTab(c, i) {
    return '<button class="cmpc-tab' + (i === 0 ? ' active' : '') + '" type="button" ' +
      'role="tab" id="cmp-tab-' + esc(c.id) + '" aria-controls="cmp-panel-' + esc(c.id) + '" ' +
      'aria-selected="' + (i === 0 ? 'true' : 'false') + '" data-target="cmp-panel-' + esc(c.id) + '">' +
      '<span class="cmpc-tab-idx">' + ('0' + (i + 1)).slice(-2) + '</span>' +
      '<span class="cmpc-tab-label">' + esc(c.navLabel || c.title) + '</span>' +
      '<span class="cmpc-tab-ico" aria-hidden="true">&rarr;</span>' +
    '</button>';
  }
  function buildComparisons() {
    if (cmpBuilt) return;
    cmpBuilt = true;
    var list = window.KLIM_COMPARISONS || [];
    var tabsRoot = document.getElementById('cmpTabs');
    var panelsRoot = document.getElementById('cmpPanels');
    if (!tabsRoot || !panelsRoot) return;
    if (!list.length) {
      panelsRoot.innerHTML = '<p class="lede">No comparison tables registered yet.</p>';
      return;
    }
    tabsRoot.innerHTML = list.map(cmpTab).join('');
    panelsRoot.innerHTML = list.map(cmpPanel).join('');
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
  }

  // =========================================================================
  // shared helpers + router
  // =========================================================================
  var DEFAULT_ACCENT = (getComputedStyle(document.documentElement)
    .getPropertyValue('--accent') || '#FF4D1C').trim();

  function prefersReduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  function revealIn(nodes) {
    nodes = [].slice.call(nodes);
    if ('IntersectionObserver' in window && !prefersReduced()) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      nodes.forEach(function (r) { io.observe(r); });
    } else {
      nodes.forEach(function (r) { r.classList.add('in'); });
    }
  }

  var views = {
    index: document.getElementById('view-index'),
    product: document.getElementById('view-product'),
    comparisons: document.getElementById('view-comparisons')
  };
  var navLinks = {
    catalog: document.querySelector('[data-nav="catalog"]'),
    comparisons: document.querySelector('[data-nav="comparisons"]'),
    back: document.querySelector('[data-nav="back"]')
  };

  function showView(name) {
    Object.keys(views).forEach(function (k) {
      views[k].hidden = (k !== name);
    });
    var onProduct = (name === 'product');
    bar.hidden = !onProduct;
    document.body.className = 'page-' + (name === 'index' ? 'index' : name === 'product' ? 'product' : 'comparisons');
    // topbar state
    navLinks.catalog.classList.toggle('active', name === 'index');
    navLinks.comparisons.classList.toggle('active', name === 'comparisons');
    navLinks.catalog.hidden = onProduct;
    navLinks.comparisons.hidden = onProduct;
    navLinks.back.hidden = !onProduct;
  }

  function route() {
    var hash = location.hash || '#/';
    var m = hash.match(/^#\/p\/([^?&]+)/);
    clearObservers();
    if (m) {
      buildProduct(decodeURIComponent(m[1]));
      showView('product');
      window.scrollTo(0, 0);
      onScroll();
    } else if (/^#\/compare/.test(hash)) {
      buildComparisons();
      showView('comparisons');
      document.title = 'Comparisons — KLIM Sales Floor';
      window.scrollTo(0, 0);
    } else {
      buildIndex();
      showView('index');
      document.title = 'KLIM Sales Floor';
      // reset accent to brand default when leaving a product
      document.documentElement.style.setProperty('--accent', DEFAULT_ACCENT);
      window.scrollTo(0, 0);
    }
  }

  window.addEventListener('hashchange', route);
  document.addEventListener('DOMContentLoaded', route);
  // DOMContentLoaded may have already fired by the time this inline script runs
  if (document.readyState !== 'loading') route();
})();
