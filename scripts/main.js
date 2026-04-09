// ============================================
// KAYLAN ARGOLLO — Portfolio JS
// ============================================

(() => {
  'use strict';

  // ─── Typing effect ───
  const heroNameText = document.querySelector('.hero__name-text');
  const fullName = 'Desenvolvedor Full Stack';
  let typed = false;

  function typeHeroName() {
    if (typed) return;
    typed = true;
    let i = 0;
    const interval = setInterval(() => {
      heroNameText.textContent = fullName.slice(0, i + 1);
      i++;
      if (i >= fullName.length) clearInterval(interval);
    }, 60);
  }

  // Start typing after a short delay
  setTimeout(typeHeroName, 300);

  // (rotating text removed)

  // ─── Header scroll state ───
  const header = document.getElementById('header');
  function updateHeaderScroll() {
    if (window.scrollY > 10) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // ─── Mobile menu ───
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('.mobile-menu__link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ─── Smooth scroll for anchor links ───
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // (horizontal scroll removed — projects use grid now)

  // ─── Scroll reveal ───
  const revealTargets = document.querySelectorAll(
    '.about__grid, .about__content, ' +
    '.projects__card, ' +
    '.other-projects__card, ' +
    '.skills__group, .skills__heading, .skills__list--soft, ' +
    '.experience__heading, .experience__item, ' +
    '.footer__name, .footer__contact, .footer__social, .footer__credit-col, ' +
    '.hero__bottom'
  );

  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-30px'
  });

  revealTargets.forEach(el => revealObserver.observe(el));

  // ─── Counter animation ───
  const counterEls = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const duration = 1500;
      const start = performance.now();

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counterEls.forEach(el => counterObserver.observe(el));

  // ─── Active nav link highlighting ───
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.header__link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -60% 0px'
  });

  sections.forEach(section => navObserver.observe(section));
})();
