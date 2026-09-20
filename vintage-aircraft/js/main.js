/* Field guide behaviour. Three small jobs, no dependencies.
   1. Theme toggle (Paper / Blueprint), remembered per browser.
   2. Line drawings draw themselves the first time they scroll into view.
   3. Colophon counts the SVG elements on the page. */

(function () {
  const root = document.documentElement;
  const btn = document.querySelector('.theme');
  const label = btn && btn.querySelector('span');

  function current() {
    const set = root.getAttribute('data-theme');
    if (set) return set;
    return matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function render() {
    if (label) label.textContent = current() === 'dark' ? 'Paper' : 'Blueprint';
  }
  try {
    const saved = localStorage.getItem('guide-theme');
    if (saved === 'dark' || saved === 'light') root.setAttribute('data-theme', saved);
  } catch (e) {}
  render();
  if (btn) btn.addEventListener('click', function () {
    const next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('guide-theme', next); } catch (e) {}
    render();
  });
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', render);
})();

(function () {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const drawings = document.querySelectorAll('svg.draws');
  if (reduce || !('IntersectionObserver' in window)) {
    drawings.forEach(function (svg) { svg.classList.add('drawn'); });
    return;
  }
  const geometry = 'path, line, polyline, polygon, circle, ellipse, rect';
  drawings.forEach(function (svg) {
    let i = 0;
    svg.querySelectorAll(geometry).forEach(function (el) {
      if (el.closest('defs') || el.closest('clipPath') || el.closest('mask')) return;
      const stroke = getComputedStyle(el).stroke;
      if (!stroke || stroke === 'none') return;
      if (typeof el.getTotalLength !== 'function') return;
      let len;
      try { len = el.getTotalLength(); } catch (e) { return; }
      if (!len || !isFinite(len)) return;
      el.style.setProperty('--len', (len + 2).toFixed(1));
      el.style.setProperty('--i', String(i++));
      el.classList.add('ready');
    });
  });
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('drawn');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.25 });
  drawings.forEach(function (svg) { io.observe(svg); });
})();

(function () {
  const paths = document.querySelectorAll('svg path, svg line, svg polyline, svg polygon, svg circle, svg ellipse, svg rect').length;
  const svgs = document.querySelectorAll('svg').length;
  const out = document.querySelector('[data-count="shapes"]');
  const outSvg = document.querySelector('[data-count="drawings"]');
  if (out) out.textContent = paths.toLocaleString();
  if (outSvg) outSvg.textContent = String(svgs);
})();
