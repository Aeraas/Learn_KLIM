/*
 * Renders a single product page from its markdown into interactive panels.
 * Reads ?id= from the URL, looks the product up in window.KLIM_PRODUCTS.
 */
(function () {
  'use strict';
  var K = window.KLIM;

  function getParam(name) {
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\+/g, ' ')) : null;
  }
  function el(html) {
    var d = document.createElement('div'); d.innerHTML = html.trim();
    return d.firstElementChild;
  }
  function product() {
    var list = window.KLIM_PRODUCTS || [];
    var id = getParam('id');
    if (id) {
      var hit = list.filter(function (p) { return p.id === id; })[0];
      if (hit) return hit;
    }
    return list[0] || null;
  }

  // ---- section renderers -------------------------------------------------
  var LABELS = {
    intro: 'What it is', selling: 'The pitch', features: 'Key features',
    audience: "Who it's for", price: 'Price', quotes: 'Voices from the field',
    faq: 'On the floor', sources: 'Sources'
  };

  function renderIntro(s) {
    var blocks = K.toBlocks(s.lines);
    var html = blocks.map(function (b) {
      if (b.kind === 'p') return '<p class="lede">' + K.inline(b.text) + '</p>';
      return list(b);
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
      return '<li class="aud-item"><span class="aud-mark">▸</span><span>' + body + '</span></li>';
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
    var items = K.toFaq(s.lines).map(function (qa, i) {
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
      if (b.kind === 'table') return table(b);
      return list(b);
    }).join('');
    return panelBody(html);
  }

  // New-vs-old generation comparison: a table plus any surrounding notes.
  function renderComparison(s) {
    var html = K.toBlocks(s.lines).map(function (b) {
      if (b.kind === 'table') return table(b);
      if (b.kind === 'p') return '<p>' + K.inline(b.text) + '</p>';
      return list(b);
    }).join('');
    return panelBody(html);
  }

  function table(b) {
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

  function list(b) {
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

  // ---- page build --------------------------------------------------------
  function build(p) {
    var parsed = K.parse(p.markdown);
    document.title = parsed.title + ' — KLIM Sales Floor';
    if (p.accent) document.documentElement.style.setProperty('--accent', p.accent);

    buildHero(p, parsed);
    buildNav(parsed);
    buildSections(parsed);
    wire();
  }

  function buildHero(p, parsed) {
    var tag = K.tagline(parsed);
    var price = K.priceSummary(parsed);
    var badges = (p.badges || []).map(function (b) {
      return '<span class="chip">' + K.escText(b) + '</span>';
    }).join('');
    var cat = p.category ? '<div class="hero-cat">' + K.escText(p.category) + '</div>' : '';
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
      '<a href="#sec-' + parsed.sections[0].slug + '" class="hero-cue" aria-label="Scroll to content">' +
        '<span>Scroll</span><span class="hero-cue-line"></span></a>';
  }

  function buildNav(parsed) {
    var nav = document.getElementById('sectionNav');
    nav.innerHTML = parsed.sections.map(function (s, i) {
      var label = LABELS[s.type] || s.heading;
      return '<a class="dot" href="#sec-' + s.slug + '" data-target="sec-' + s.slug + '">' +
        '<span class="dot-mark"></span>' +
        '<span class="dot-label">' + ('0' + (i + 1)).slice(-2) + ' · ' + K.escText(label) + '</span></a>';
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

  // ---- interactivity -----------------------------------------------------
  function wire() {
    // accordions
    document.querySelectorAll('[data-acc]').forEach(function (acc) {
      var btn = acc.querySelector('.acc-q');
      var panel = acc.querySelector('.acc-a');
      btn.addEventListener('click', function () {
        var open = acc.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
      });
    });

    // reveal on scroll
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !prefersReduced()) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      reveals.forEach(function (r) { io.observe(r); });
    } else {
      reveals.forEach(function (r) { r.classList.add('in'); });
    }

    // scroll-spy for the side nav
    var dots = [].slice.call(document.querySelectorAll('.dot'));
    var sections = [].slice.call(document.querySelectorAll('.section'));
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
    }

    // progress bar
    var bar = document.getElementById('progress');
    function onScroll() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? h.scrollTop / max : 0) + ')';
    }
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function prefersReduced() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  // ---- boot --------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', function () {
    var p = product();
    if (!p) {
      document.getElementById('sections').innerHTML =
        '<div class="container"><p class="lede" style="padding:6rem 0">No product found. ' +
        'Check the <code>?id=</code> in the URL, or return to the <a href="index.html">index</a>.</p></div>';
      return;
    }
    build(p);
  });
})();
