/*
 * KLIM parser — turns a product markdown string into structured sections.
 * Shared by the index page and the product page so everything stays derived
 * from one source of truth. No dependencies, works from file://.
 */
(function (global) {
  'use strict';

  // ---- inline markdown (bold / italic / links / code) --------------------
  function escAttr(s) {
    return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escText(s) {
    return String(s).replace(/&(?![a-z#0-9]+;)/gi, '&amp;')
      .replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function inline(text) {
    var t = escText(text);
    t = t.replace(/\[([^\]]+)\]\(([^)]+)\)/g, function (m, label, url) {
      return '<a href="' + escAttr(url) + '" target="_blank" rel="noopener noreferrer">' +
        label + '<\/a>';
    });
    t = t.replace(/\*\*([^*]+)\*\*/g, '<strong>$1<\/strong>');
    t = t.replace(/\*([^*]+)\*/g, '<em>$1<\/em>');
    t = t.replace(/`([^`]+)`/g, '<code>$1<\/code>');
    return t;
  }

  // ---- classify a heading into a renderer type ---------------------------
  function classify(heading) {
    var h = heading.toLowerCase();
    if (h.indexOf('at a glance') > -1 || h.indexOf(' vs ') > -1 || h.indexOf('comparison') > -1) return 'comparison';
    if (h.indexOf('top selling') > -1 || h.indexOf('selling point') > -1) return 'selling';
    if (h.indexOf('source') > -1) return 'sources';
    if (h.indexOf('question') > -1 || h.indexOf('faq') > -1) return 'faq';
    if (h.indexOf('feature') > -1) return 'features';
    if (h.indexOf('who') > -1 || h.indexOf('audience') > -1) return 'audience';
    if (h.indexOf('price') > -1 || h.indexOf('cost') > -1) return 'price';
    if (h.indexOf('quote') > -1 || h.indexOf('notable') > -1 || h.indexOf('callout') > -1) return 'quotes';
    if (h.indexOf('what it is') > -1 || h.indexOf('overview') > -1 || h.indexOf('about') > -1) return 'intro';
    return 'generic';
  }

  // Display order on the detail page (sales-learning flow). Anything not in
  // this list keeps markdown order, just before sources.
  var ORDER = ['intro', 'selling', 'comparison', 'features', 'audience', 'price', 'quotes', 'faq', 'generic', 'sources'];

  function parse(md) {
    var lines = String(md).replace(/\r\n/g, '\n').split('\n');
    var title = '';
    var sections = [];
    var cur = null;

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (/^#\s+/.test(line)) { title = line.replace(/^#\s+/, '').trim(); continue; }
      if (/^##\s+/.test(line)) {
        cur = { heading: line.replace(/^##\s+/, '').trim(), lines: [] };
        cur.type = classify(cur.heading);
        sections.push(cur);
        continue;
      }
      if (/^---+\s*$/.test(line)) continue;          // horizontal rules
      if (cur) cur.lines.push(line);
    }

    sections.forEach(function (s, idx) {
      s.slug = slugify(s.type === 'generic' ? s.heading : s.type);
      s.origin = idx;
    });

    sections.sort(function (a, b) {
      var ai = ORDER.indexOf(a.type); var bi = ORDER.indexOf(b.type);
      if (ai === -1) ai = ORDER.indexOf('generic');
      if (bi === -1) bi = ORDER.indexOf('generic');
      if (ai !== bi) return ai - bi;
      return a.origin - b.origin;                    // stable within a group
    });

    return { title: title, sections: sections };
  }

  function slugify(s) {
    return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  }

  // ---- block helpers used by renderers -----------------------------------
  // Group raw lines into paragraphs, bullet lists and numbered lists.
  function toBlocks(lines) {
    var blocks = [];
    var para = [];
    function flushPara() {
      if (para.length) { blocks.push({ kind: 'p', text: para.join(' ') }); para = []; }
    }
    for (var i = 0; i < lines.length; i++) {
      var raw = lines[i];
      var line = raw.replace(/\s+$/, '');
      if (!line.trim()) { flushPara(); continue; }

      // markdown table row: | a | b | c |
      if (/^\s*\|.*\|\s*$/.test(line)) {
        flushPara();
        var cells = line.replace(/^\s*\|/, '').replace(/\|\s*$/, '').split('|')
          .map(function (c) { return c.trim(); });
        var isSep = cells.every(function (c) { return c === '' || /^:?-+:?$/.test(c); });
        var prev = blocks[blocks.length - 1];
        if (prev && prev.kind === 'table') {
          if (!isSep) prev.rows.push(cells);          // separator row is dropped
        } else if (!isSep) {
          blocks.push({ kind: 'table', rows: [cells] });
        }
        continue;
      }

      var ol = line.match(/^\s*\d+\.\s+(.*)$/);
      var ul = line.match(/^\s*[-*]\s+(.*)$/);
      if (ol) {
        flushPara();
        if (!blocks.length || blocks[blocks.length - 1].kind !== 'ol') blocks.push({ kind: 'ol', items: [] });
        blocks[blocks.length - 1].items.push(ol[1]);
      } else if (ul) {
        flushPara();
        if (!blocks.length || blocks[blocks.length - 1].kind !== 'ul') blocks.push({ kind: 'ul', items: [] });
        blocks[blocks.length - 1].items.push(ul[1]);
      } else {
        // continuation of a list item, or paragraph text
        var last = blocks[blocks.length - 1];
        if (last && (last.kind === 'ol' || last.kind === 'ul') && para.length === 0 && /^\s+/.test(raw)) {
          last.items[last.items.length - 1] += ' ' + line.trim();
        } else {
          para.push(line.trim());
        }
      }
    }
    flushPara();
    return blocks;
  }

  // Split "**Label:** value" → { label, value }. If no labelled colon, label is null.
  function splitLabel(item) {
    var m = item.match(/^\*\*([^*]+?):\*\*\s*([\s\S]*)$/);
    if (m) return { label: m[1].trim(), value: m[2].trim() };
    return { label: null, value: item.trim() };
  }

  // Split a selling point "**Headline.** body" → { head, body }.
  function splitHeadline(item) {
    var m = item.match(/^\*\*([^*]+)\*\*\s*([\s\S]*)$/);
    if (m) return { head: m[1].trim(), body: m[2].trim() };
    return { head: null, body: item.trim() };
  }

  // Parse a FAQ section's raw lines into [{q, a:[lines]}].
  function toFaq(lines) {
    var out = [];
    var cur = null;
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) continue;
      var q = line.match(/^\*\*(.+?)\*\*$/);
      if (q) {
        cur = { q: q[1].replace(/^["“]|["”]$/g, ''), a: [] };
        out.push(cur);
      } else if (cur) {
        cur.a.push(line);
      }
    }
    return out;
  }

  // ---- derived summaries (used by the index cards) -----------------------
  function firstSellingHeadline(parsed) {
    var s = find(parsed, 'selling');
    if (!s) return '';
    var blocks = toBlocks(s.lines);
    var ol = blocks.filter(function (b) { return b.kind === 'ol'; })[0];
    if (ol && ol.items.length) return splitHeadline(ol.items[0]).head || ol.items[0];
    return '';
  }
  function tagline(parsed) {
    var head = firstSellingHeadline(parsed);
    if (head) return head.replace(/\.$/, '');
    var intro = find(parsed, 'intro');
    if (intro) {
      var p = toBlocks(intro.lines).filter(function (b) { return b.kind === 'p'; })[0];
      if (p) return p.text.split('. ')[0];
    }
    return '';
  }
  function priceSummary(parsed) {
    var s = find(parsed, 'price');
    if (!s) return '';
    var ul = toBlocks(s.lines).filter(function (b) { return b.kind === 'ul'; })[0];
    if (ul && ul.items.length) {
      var lv = splitLabel(ul.items[0]);
      var m = lv.value.match(/[£$€]\s?[\d.,]+/);
      return m ? m[0] : lv.value;
    }
    return '';
  }
  function find(parsed, type) {
    return parsed.sections.filter(function (s) { return s.type === type; })[0] || null;
  }

  global.KLIM = {
    parse: parse,
    inline: inline,
    escText: escText,
    escAttr: escAttr,
    slugify: slugify,
    toBlocks: toBlocks,
    splitLabel: splitLabel,
    splitHeadline: splitHeadline,
    toFaq: toFaq,
    tagline: tagline,
    priceSummary: priceSummary,
    find: find
  };
})(window);
