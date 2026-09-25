/* Resilient Shores — site scripts (loaded on every page, each feature checks for its elements) */
(function () {
  // Mobile menu
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menuBtn');
  if (nav && menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open);
    });
  }

  const toastEl = document.getElementById('toast');
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 2400);
  }

  // Share links (footer)
  const canonical = document.querySelector('link[rel="canonical"]');
  const pageUrl = canonical ? canonical.href : location.href;
  const shareText = 'Resilient Shores: Adapting to Climate Change Through Storytelling';
  const u = encodeURIComponent(pageUrl), t = encodeURIComponent(shareText);
  const setHref = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };
  setHref('sh-li', 'https://www.linkedin.com/sharing/share-offsite/?url=' + u);
  setHref('sh-fb', 'https://www.facebook.com/sharer/sharer.php?u=' + u);
  setHref('sh-em', 'mailto:?subject=' + t + '&body=' + encodeURIComponent(shareText + '\n' + pageUrl));
  const copyBtn = document.getElementById('sh-more');
  if (copyBtn) copyBtn.addEventListener('click', async () => {
    try { await navigator.clipboard.writeText(pageUrl); toast('Link copied'); }
    catch (e) { toast(pageUrl); }
  });

  // Worksheets: scale down on narrow screens so they keep the printed layout
  const WS_WIDTH = 1040;
  function fitWorksheets() {
    document.querySelectorAll('.ws-scale').forEach(box => {
      const ws = box.firstElementChild;
      const s = Math.min(1, box.clientWidth / WS_WIDTH);
      ws.style.transform = s < 1 ? `scale(${s})` : '';
      box.style.height = s < 1 ? (ws.offsetHeight * s) + 'px' : '';
    });
  }
  if (document.querySelector('.ws-scale')) {
    fitWorksheets();
    window.addEventListener('resize', fitWorksheets);
    if (document.fonts) document.fonts.ready.then(fitWorksheets);
  }

  // Let's chat form: builds an email to the address in data-email
  const cf = document.getElementById('chatForm');
  if (cf) {
    const story = document.getElementById('c-story');
    const wc = document.getElementById('wc');
    const err = document.getElementById('chatError');
    const words = s => (s.trim().match(/\S+/g) || []).length;
    story.addEventListener('input', () => {
      const n = words(story.value);
      wc.textContent = n + ' / 100 words';
      wc.classList.toggle('over', n > 100);
    });
    cf.addEventListener('submit', e => {
      e.preventDefault();
      err.textContent = '';
      const f = cf.elements;
      const name = f.name.value.trim(), email = f.email.value.trim();
      if (!name) { err.textContent = 'Enter your name.'; f.name.focus(); return; }
      if (!/^\S+@\S+\.\S+$/.test(email)) { err.textContent = 'Enter a valid email address so Bob can reply.'; f.email.focus(); return; }
      if (words(story.value) > 100) { err.textContent = 'Shorten your story to 100 words or fewer.'; story.focus(); return; }
      const help = [...cf.querySelectorAll('input[name=help]:checked')].map(i => i.value).join(', ') || 'Not specified';
      const body = `Name: ${name}\nEmail: ${email}\nOrganization: ${f.org.value.trim() || '—'}\n\nStory context, probable crisis, resolutions:\n${story.value.trim() || '—'}\n\nHow can we help: ${help}`;
      location.href = 'mailto:' + cf.dataset.email + '?subject=' + encodeURIComponent("Let's chat — " + name) + '&body=' + encodeURIComponent(body);
      toast('Opening your email app…');
    });
  }
})();
