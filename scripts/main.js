// ============================================
// KAYLAN ARGOLLO — Portfolio JS
// ============================================

(() => {
  'use strict';

  // ─── Cycling typewriter ───
  const heroTyped = document.getElementById('heroTyped');
  const roles = [
    'Desenvolvedor Full Stack.',
    'Desenvolvedor Front-end.',
    'Web Designer.',
  ];

  let roleIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;

  function typeLoop() {
    const current = roles[roleIndex];

    if (isDeleting) {
      heroTyped.textContent = current.slice(0, charIndex - 1);
      charIndex--;
    } else {
      heroTyped.textContent = current.slice(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? 38 : 72;

    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 350;
    }

    setTimeout(typeLoop, delay);
  }

  if (heroTyped) setTimeout(typeLoop, 600);

  // ─── Progress bar ───
  const progressBar = document.getElementById('headerProgress');

  function updateProgress() {
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }

  // ─── Smooth scroll with easing ───
  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function smoothScrollTo(target, duration) {
    const start    = window.scrollY;
    const distance = target - start;
    const d        = duration ?? Math.min(900, Math.max(500, Math.abs(distance) * 0.4));
    const startTime = performance.now();

    function step(now) {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / d, 1);
      window.scrollTo(0, start + distance * easeInOutCubic(progress));
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // ─── Header scroll + progress ───
  const header = document.getElementById('header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    updateProgress();
  }, { passive: true });

  updateProgress();

  // ─── Mobile menu ───
  const hamburger   = document.getElementById('hamburger');
  const mobileMenu  = document.getElementById('mobileMenu');
  const mobileClose = document.getElementById('mobileClose');

  function openMenu() {
    hamburger.classList.add('active');
    mobileMenu.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMenu);
  mobileClose?.addEventListener('click', closeMenu);
  mobileMenu?.querySelectorAll('.mobile-menu__link, .mobile-menu__cta').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ─── Smooth anchor scroll (replaces CSS scroll-behavior) ───
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      smoothScrollTo(top);
    });
  });

  // ─── Scroll reveal ───
  const revealEls = document.querySelectorAll(
    '.hero__stats, .about__left, .about__right,' +
    '.services__card, .process__item,' +
    '.projects__card, .softskills__item,' +
    '.quote-block, .footer__top'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '-20px' });

  revealEls.forEach(el => revealObs.observe(el));

  // ─── Counter animation ───
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const start  = performance.now();
      const dur    = 1400;

      function tick(now) {
        const p     = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(eased * target);
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      }

      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('[data-target]').forEach(el => counterObs.observe(el));

  // ─── Active nav link ───
  const navObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('.header__link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -60% 0px' });

  document.querySelectorAll('section[id]').forEach(s => navObs.observe(s));

  // ─── Projects carousel ───
  const track   = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const counter = document.getElementById('carouselCounter');

  if (track && prevBtn && nextBtn && counter) {
    const cards = track.querySelectorAll('.projects__card');
    const total = cards.length;
    let current = 0;

    function getVisible() { return window.innerWidth <= 768 ? 1 : 2; }
    function getMax()     { return total - getVisible(); }
    function pad(n)       { return String(n).padStart(2, '0'); }

    function updateCarousel() {
      const gap = 24;
      const w   = cards[0].getBoundingClientRect().width;
      track.style.transform = `translateX(-${current * (w + gap)}px)`;
      counter.textContent   = `${pad(current + 1)} / ${pad(total)}`;
      prevBtn.disabled      = current === 0;
      nextBtn.disabled      = current >= getMax();
    }

    prevBtn.addEventListener('click', () => { if (current > 0)        { current--; updateCarousel(); } });
    nextBtn.addEventListener('click', () => { if (current < getMax()) { current++; updateCarousel(); } });

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
      const delta = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(delta) < 50) return;
      if (delta > 0 && current < getMax()) { current++; updateCarousel(); }
      if (delta < 0 && current > 0)        { current--; updateCarousel(); }
    }, { passive: true });

    window.addEventListener('resize', () => {
      current = Math.min(current, getMax());
      updateCarousel();
    }, { passive: true });

    updateCarousel();
  }

})();
