/*
 * Renders the product index — products grouped into collapsible category
 * sections (Jackets, Pants, Gloves, Layers, …). Each product declares its
 * section via the `group` field in its data file; anything without one falls
 * into "Other". All card content is still derived from the markdown.
 */
(function () {
  'use strict';
  var K = window.KLIM;

  // Preferred display order for groups. Unknown groups are appended after
  // these (alphabetically), with "Other" always last.
  var GROUP_ORDER = ['Jackets', 'Pants', 'Gloves', 'Boots', 'Helmets', 'Layers', 'Accessories', 'Other'];
  var FOLD_KEY = 'klim-catalog-folds';     // remembers open/closed per group

  function loadFolds() {
    try { return JSON.parse(localStorage.getItem(FOLD_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveFold(group, collapsed) {
    var folds = loadFolds();
    folds[group] = collapsed ? 'collapsed' : 'open';
    try { localStorage.setItem(FOLD_KEY, JSON.stringify(folds)); } catch (e) {}
  }

  document.addEventListener('DOMContentLoaded', function () {
    var list = window.KLIM_PRODUCTS || [];
    var root = document.getElementById('catalog');

    if (!list.length) {
      root.innerHTML = '<p class="lede">No products registered yet.</p>';
      return;
    }

    // bucket products by group (preserving registration order within a group)
    var buckets = {};
    list.forEach(function (p) {
      var g = (p.group || 'Other').trim() || 'Other';
      (buckets[g] || (buckets[g] = [])).push(p);
    });

    // order the groups
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
      var collapsed = folds[g] === 'collapsed';     // default (undefined) = open
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

    // reveal cards on scroll
    var reveals = root.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
        });
      }, { threshold: 0.1 });
      reveals.forEach(function (r) { io.observe(r); });
    } else {
      reveals.forEach(function (r) { r.classList.add('in'); });
    }

    var count = document.getElementById('catCount');
    if (count) count.textContent = ('0' + list.length).slice(-2);
  });

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
      ? '<img class="card-img" src="' + K.escText(p.image) + '" alt="' + K.escText(name) + '" loading="lazy" />'
      : '<span class="card-mono">' + K.escText(initials(name)) + '</span>';

    return '<a class="card reveal" href="product.html?id=' + encodeURIComponent(p.id) + '"' +
      ' style="--card-accent:' + accent + '">' +
      '<div class="card-visual" aria-hidden="true">' + visual + '</div>' +
      '<div class="card-body">' +
        cat +
        '<h2 class="card-title">' + K.escText(name) + '</h2>' +
        (tag ? '<p class="card-hook">' + K.inline(tag) + '.</p>' : '') +
        '<div class="card-chips">' + badges + '</div>' +
        '<div class="card-foot">' +
          (price ? '<span class="card-price">' + K.escText(price) + '</span>' : '<span></span>') +
          '<span class="card-go">View card →</span>' +
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

  function initials(name) {
    var clean = name.replace(/^KLIM\s+/i, '').trim();
    var parts = clean.split(/\s+/).slice(0, 2);
    return parts.map(function (w) { return w.charAt(0); }).join('').toUpperCase();
  }
})();
