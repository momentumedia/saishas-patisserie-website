// Nav scroll state
const nav = document.querySelector('.nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }));
}

// Active nav link by path
(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });
})();

// Fade-up reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

// Menu page — scroll to category on tab click
const menuTabs = document.querySelectorAll('.menu-tab');
if (menuTabs.length) {
  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const target = tab.dataset.target;
      if (target === 'all') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(target);
        if (el) {
          const offset = 160; // for sticky nav + sticky tabs
          const y = el.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    });
  });
}

// Gallery filters
const filters = document.querySelectorAll('.gallery-filter');
const mItems  = document.querySelectorAll('.m-item');
if (filters.length && mItems.length) {
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x => x.classList.remove('active'));
    f.classList.add('active');
    const cat = f.dataset.filter;
    mItems.forEach(item => {
      item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
    });
  }));
}

// Lightbox
const lb    = document.querySelector('.lightbox');
const lbImg = lb?.querySelector('img');
const lbCls = lb?.querySelector('.lightbox-close');
const lbCap = lb?.querySelector('.lightbox-caption');
if (lb) {
  document.querySelectorAll('.m-item, .gf-item, .photo-tile').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('a') && e.target.closest('a') !== item) return;
      const img = item.querySelector('img');
      if (!img) return;
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      if (lbCap) {
        const name = item.dataset.name || item.querySelector('figcaption h4')?.textContent || img.alt || '';
        lbCap.textContent = name;
        lbCap.style.display = name ? 'block' : 'none';
      }
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  const close = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  };
  lbCls?.addEventListener('click', close);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}
