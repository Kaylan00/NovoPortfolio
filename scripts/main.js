// ============================================
// ROUTE: redirect to ?frontend by default
// ============================================
(() => {
  const params = new URLSearchParams(window.location.search);
  if (!params.has('frontend')) {
    params.set('frontend', '');
    window.location.replace(window.location.pathname + '?' + params.toString() + window.location.hash);
    return;
  }
})();

// ============================================
// ROUTE: /frontend — swap content for front-end focus
// ============================================
(() => {
  const isFrontend = window.location.pathname.includes('/frontend')
    || window.location.hash === '#frontend'
    || new URLSearchParams(window.location.search).has('frontend');

  if (!isFrontend) return;

  document.body.classList.add('route-frontend');

  // Page title
  document.title = 'KAYLAN.DEV — Front-end Developer';
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = 'Portfólio de Kaylan Argollo — Desenvolvedor Full Stack com foco em Front-end.';

  // Hero kicker
  const kicker = document.querySelector('.hero__content .kicker span:last-child');
  if (kicker) kicker.textContent = 'Front-end Developer · HTML · CSS · JavaScript';

  // Hero heading
  const heading = document.querySelector('.heading-h1');
  if (heading) heading.textContent = 'Desenvolvo interfaces com HTML, CSS3 e JavaScript — com foco em UI/UX, responsividade e boas práticas.';

  // Hero description
  const heroDesc = document.querySelector('.hero__content > .body-text');
  if (heroDesc) heroDesc.innerHTML = 'Desenvolvedor Front-end com experiência profissional em <span class="text-highlight">HTML</span>, <span class="text-highlight">CSS3</span> e <span class="text-highlight">JavaScript</span>, consumo de <span class="text-highlight">APIs REST</span> e princípios de <span class="text-highlight">UI/UX</span> e responsividade. Tenho experiência prática com <span class="text-highlight">SCSS</span> e <span class="text-highlight">PHP</span>, e atuo de forma colaborativa em squads de produto, alinhando entregas com designers e time de back-end.';

  // Tags
  const tagRow = document.querySelector('.tag-row');
  if (tagRow) {
    tagRow.innerHTML = `
      <span class="tag tag--primary tag--rounded">HTML5 / CSS3</span>
      <span class="tag tag--secondary tag--rounded">JavaScript</span>
      <span class="tag tag--info tag--rounded">APIs REST</span>
      <span class="tag tag--success tag--rounded">UI/UX</span>
      <span class="tag tag--warning tag--rounded">SCSS</span>
      <span class="tag tag--primary tag--rounded">PHP</span>
      <span class="tag tag--info tag--rounded">React</span>
      <span class="tag tag--secondary tag--rounded">Next.js</span>
    `;
    // Lock tags immediately (no entrance animation for route swap)
    tagRow.querySelectorAll('.tag').forEach(t => {
      t.style.animation = 'none';
      t.style.opacity = '1';
    });
  }

  // Code snippet
  const codeBody = document.querySelector('.code-snippet__body code');
  const codeFilename = document.querySelector('.code-snippet__filename');
  if (codeBody) {
    codeBody.innerHTML = `<span class="code-kw">const</span> <span class="code-var">frontDev</span> = {
  <span class="code-prop">nome</span>: <span class="code-str">"Kaylan Argollo"</span>,
  <span class="code-prop">foco</span>: <span class="code-str">"Front-end"</span>,
  <span class="code-prop">stack</span>: [<span class="code-str">"HTML"</span>, <span class="code-str">"CSS/SCSS"</span>, <span class="code-str">"JS"</span>, <span class="code-str">"React"</span>, <span class="code-str">"Next.js"</span>],
  <span class="code-prop">extras</span>: [<span class="code-str">"PHP"</span>, <span class="code-str">"UI/UX"</span>, <span class="code-str">"Python"</span>, <span class="code-str">"Django"</span>, <span class="code-str">"Sentry"</span>, <span class="code-str">"PostHog"</span>, <span class="code-str">"Storybook"</span>],
  <span class="code-prop">disponivel</span>: <span class="code-bool">true</span>,
};`;
  }
  if (codeFilename) codeFilename.textContent = 'kaylan.tsx';

  // Photo role
  const role = document.querySelector('.hero__photo-role');
  if (role) role.textContent = 'Dev Front-end';

  // Stats — swap content
  const stats = document.querySelectorAll('.stat-card');
  const statData = [
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>', label: 'Front-end', title: 'HTML, CSS3 & JS', desc: 'Experiência profissional em HTML, CSS3 e JavaScript com foco em responsividade, boas práticas e princípios de UI/UX. Trabalho junto com designers para transformar protótipos em interfaces funcionais.' },
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>', label: 'Performance', title: 'Otimização & APIs', desc: 'Experiência no consumo de APIs REST, otimização de performance com React e Next.js, monitoramento de bugs com Sentry e testes em ambiente de homologação e produção.' },
    { icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>', label: 'Diferenciais', title: 'SCSS & PHP', desc: 'Experiência prática com SCSS — pré-processadores, variáveis e design systems — e com PHP em projetos reais. Atuação em squads de produto com metodologia ágil.' },
  ];
  stats.forEach((card, i) => {
    if (!statData[i]) return;
    const d = statData[i];
    card.querySelector('.stat-card__icon').innerHTML = d.icon;
    card.querySelector('.stat-card__label').textContent = d.label;
    card.querySelector('.stat-card__title').textContent = d.title;
    card.querySelector('.stat-card__desc').textContent = d.desc;
  });

  // Stack section — reorder and add PHP/SCSS
  const stackTrack = document.querySelector('.stack-track');
  if (stackTrack) {
    const stackItems = [
      { name: 'HTML5 / CSS3', cat: 'Front-end', cls: 'react',      icon: '<img src="https://cdn.simpleicons.org/html5/E34F26" alt="HTML5" width="30" height="30" />' },
      { name: 'JavaScript',  cat: 'Front-end', cls: 'python',     icon: '<img src="https://cdn.simpleicons.org/javascript/F7DF1E" alt="JavaScript" width="30" height="30" />' },
      { name: 'React.js',    cat: 'Front-end', cls: 'react',      icon: '<img src="https://cdn.simpleicons.org/react/61DAFB" alt="React" width="30" height="30" />' },
      { name: 'SCSS',        cat: 'Estilos',   cls: 'django',     icon: '<img src="https://cdn.simpleicons.org/sass/CC6699" alt="SCSS" width="30" height="30" />' },
      { name: 'TypeScript',  cat: 'Linguagem', cls: 'ts',         icon: '<img src="https://cdn.simpleicons.org/typescript/3178C6" alt="TypeScript" width="30" height="30" />' },
      { name: 'Next.js',     cat: 'Framework', cls: 'next',       icon: '<img src="https://cdn.simpleicons.org/nextdotjs/000000" alt="Next.js" width="30" height="30" />' },
      { name: 'PHP',         cat: 'Back-end',  cls: 'java',       icon: '<img src="https://cdn.simpleicons.org/php/777BB4" alt="PHP" width="30" height="30" />' },
      { name: 'Git',         cat: 'Versionamento', cls: 'git',    icon: '<img src="https://cdn.simpleicons.org/git/F05032" alt="Git" width="30" height="30" />' },
      { name: 'Sentry',      cat: 'Observabilidade', cls: 'sentry',   icon: '<img src="https://cdn.simpleicons.org/sentry/362D59" alt="Sentry" width="30" height="30" />' },
      { name: 'PostHog',     cat: 'Observabilidade', cls: 'posthog',  icon: '<img src="https://cdn.simpleicons.org/posthog/1D4AFF" alt="PostHog" width="30" height="30" />' },
      { name: 'Storybook',   cat: 'Front-end', cls: 'storybook',  icon: '<img src="https://cdn.simpleicons.org/storybook/FF4785" alt="Storybook" width="30" height="30" />' },
    ];

    stackTrack.innerHTML = stackItems.map(s => `
      <div class="stack-card box box--surface tilt-card magnetic">
        <div class="stack-card__icon-wrap stack-card__icon-wrap--${s.cls}">
          ${s.icon}
        </div>
        <h3 class="stack-card__name">${s.name}</h3>
        <p class="stack-card__category">${s.cat}</p>
      </div>
    `).join('');
  }

  // Experience section — keep the real Seazone data, no changes needed
  // The timeline already has the correct 3 experiences from Seazone

  // Projects — HTML already has the correct cards, no swap needed

  // Marquee — front-end focused
  const marqueeTrack = document.querySelector('.marquee__track');
  if (marqueeTrack) {
    const items = ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'SCSS', 'TypeScript', 'Next.js', 'PHP', 'UI/UX', 'Responsividade', 'Git', 'APIs REST'];
    const half = items.map(t => `<span class="marquee__item">${t}</span><span class="marquee__sep">/</span>`).join('');
    marqueeTrack.innerHTML = half + half;
  }

})();

// ============================================
// LOADING SCREEN
// ============================================
(() => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  function hideLoader() {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.classList.remove('loading');
    }, 1200);
  }

  // If page already loaded, hide immediately
  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
})();

// ============================================
// CURSOR GLOW — subtle light following mouse
// ============================================
(() => {
  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  glow.classList.add('active');

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animate);
  }
  animate();

  document.addEventListener('mouseleave', () => glow.classList.remove('active'));
  document.addEventListener('mouseenter', () => glow.classList.add('active'));
})();

// ============================================
// SKY — Stars (dark) + Sun/Moon visibility
// ============================================
(() => {
  const container = document.getElementById('starfield');
  if (!container) return;

  const sizes = ['sm', 'md', 'lg'];
  const twinkles = ['twinkle1', 'twinkle2', 'twinkle3'];
  const accents = ['', '', '', '', '', '', 'green', 'blue', 'warm'];

  // Generate stars (visible only in dark mode via CSS)
  const starCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 10000));

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    const size = sizes[Math.floor(Math.random() * sizes.length)];
    const twinkle = twinkles[Math.floor(Math.random() * twinkles.length)];
    const accent = accents[Math.floor(Math.random() * accents.length)];

    star.className = `star star--${size} star--${twinkle}${accent ? ' star--' + accent : ''}`;
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';

    // Stagger both twinkle and drift
    const delay = Math.random() * 8;
    star.style.animationDelay = `${delay}s, ${delay + Math.random() * 3}s`;

    container.appendChild(star);
  }

  // Shooting stars (dark mode only)
  function createShootingStar() {
    if (document.body.classList.contains('light')) return;

    const s = document.createElement('div');
    s.className = 'shooting-star';
    s.style.top = Math.random() * 50 + '%';
    s.style.left = Math.random() * 50 + '%';
    s.style.transform = `rotate(${-25 + Math.random() * -20}deg)`;
    container.appendChild(s);
    setTimeout(() => s.remove(), 1200);
  }

  function scheduleShoot() {
    setTimeout(() => {
      createShootingStar();
      scheduleShoot();
    }, 5000 + Math.random() * 6000);
  }
  scheduleShoot();

  // Moon — always visible in dark mode (controlled by CSS only)

  // Sun — appears and disappears randomly in light mode
  const sun = document.getElementById('skySun');
  if (sun) {
    function toggleSun() {
      if (document.body.classList.contains('light')) {
        const show = Math.random() > 0.4; // 60% chance to show
        sun.classList.toggle('visible', show);
      } else {
        sun.classList.remove('visible');
      }
    }
    toggleSun();
    setInterval(toggleSun, 12000);

    const themeBtn = document.getElementById('themeSwitch');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => setTimeout(toggleSun, 100));
    }
  }
})();

// ============================================
// SCROLL PROGRESS BAR
// ============================================
(() => {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + '%';
  }

  window.addEventListener('scroll', updateProgress, { passive: true });
})();

// ============================================
// BACK TO TOP BUTTON
// ============================================
(() => {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ============================================
// NAVBAR — SCROLL STATE
// ============================================
(() => {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });
})();

// ============================================
// MOBILE MENU (display toggle)
// ============================================
(() => {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!hamburger || !mobileMenu) return;
  const links = mobileMenu.querySelectorAll('.mobile-menu__link');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('open');

    if (!isOpen) {
      mobileMenu.style.display = 'flex';
      mobileMenu.setAttribute('aria-hidden', 'false');
      document.body.classList.add('no-scroll');
      requestAnimationFrame(() => {
        mobileMenu.classList.add('open');
      });
    } else {
      mobileMenu.classList.remove('open');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('no-scroll');
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 250);
    }

    hamburger.classList.toggle('active');
  });

  function closeMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    setTimeout(() => {
      mobileMenu.style.display = 'none';
    }, 250);
  }

  links.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu when tapping outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target) && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
})();

// ============================================
// ACTIVE NAV TAB ON SCROLL
// ============================================
(() => {
  const sections = document.querySelectorAll('section[id]');
  const tabs = document.querySelectorAll('.tab[href]');

  function updateTabs() {
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (!id) return;

      if (scrollPos >= top && scrollPos < top + height) {
        tabs.forEach(tab => {
          tab.classList.remove('active');
          if (tab.getAttribute('href') === '#' + id) {
            tab.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateTabs, { passive: true });
})();

// ============================================
// THEME SWITCH (light/dark)
// ============================================
(() => {
  const toggle = document.getElementById('themeSwitch');

  const saved = localStorage.getItem('theme');
  if (saved === 'light') {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
    toggle.setAttribute('aria-checked', 'false');
  } else {
    toggle.setAttribute('aria-checked', 'true');
  }

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const isLight = document.body.classList.contains('light');
    toggle.setAttribute('aria-checked', (!isLight).toString());
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
})();

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
  });
});

// ============================================
// SCROLL REVEAL (Intersection Observer)
// ============================================
(() => {
  const elements = document.querySelectorAll(
    '.stat-card, .stack-card, .project-card, .section-header, .footer__box, .section-divider, .text-reveal, .timeline__item, .about-skills, .about-story, .footer__heading-wrap, .footer__link, .hero__metrics'
  );

  elements.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '-30px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();

// ============================================
// MAGNETIC EFFECT (elements attract to cursor)
// ============================================
(() => {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const magnetics = document.querySelectorAll('.magnetic');

  magnetics.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const strength = 0.3;

      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        el.style.transition = '';
      }, 400);
    });
  });
})();

// ============================================
// 3D TILT EFFECT ON CARDS
// ============================================
(() => {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const cards = document.querySelectorAll('.tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const rotateX = (0.5 - y) * 8;
      const rotateY = (x - 0.5) * 8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      setTimeout(() => {
        card.style.transition = '';
      }, 500);
    });
  });
})();

// ============================================
// PARALLAX ON SCROLL
// ============================================
(() => {
  const photoCard = document.querySelector('.hero__photo-card');
  if (!photoCard) return;

  const isDesktop = window.matchMedia('(min-width: 768px)').matches;
  if (!isDesktop) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      photoCard.style.transform = `translateY(${scrollY * 0.12}px)`;
    }
  }, { passive: true });
})();

// ============================================
// TAG / CHIP — lock after entrance, bounce on hover
// ============================================
// After the tagPop entrance animation ends, remove it so hover
// animations never accidentally replay it (which causes opacity:0).
document.querySelectorAll('.tag-row .tag').forEach(tag => {
  function lockTag() {
    tag.style.animation = 'none';
    tag.style.opacity = '1';
    tag.style.transform = '';
    tag.removeEventListener('animationend', lockTag);
  }
  tag.addEventListener('animationend', lockTag);
});

// Bounce on hover (uses a class toggle instead of style.animation)
document.querySelectorAll('.tag, .mini-tag').forEach(tag => {
  tag.addEventListener('mouseenter', () => {
    tag.classList.add('tag--bounce');
  });
  tag.addEventListener('animationend', () => {
    tag.classList.remove('tag--bounce');
  });
});

// ============================================
// TYPING EFFECT ON HEADING
// ============================================
(() => {
  const heading = document.querySelector('.heading-h1');
  if (!heading) return;

  const text = heading.textContent;
  heading.textContent = '';
  heading.style.opacity = '1';
  heading.style.minHeight = '3em';

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      heading.textContent += text.charAt(i);
      i++;
      setTimeout(typeChar, 22);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(typeChar, 500);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(heading);
})();

// ============================================
// INJECT DYNAMIC KEYFRAMES
// ============================================
const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
  @keyframes tagBounce {
    0% { transform: scale(1); }
    40% { transform: scale(1.15) rotate(-3deg); }
    70% { transform: scale(0.95) rotate(1deg); }
    100% { transform: scale(1) rotate(0deg); }
  }
  .tag--bounce {
    animation: tagBounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) !important;
  }
`;
document.head.appendChild(dynamicStyles);

// ============================================
// DOT GRID BACKGROUND
// ============================================
(() => {
  const canvas = document.getElementById('dotGrid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let mouseX = -1000, mouseY = -1000;
  const dotSpacing = 40;
  const dotRadius = 0.8;
  const influenceRadius = 120;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const isLight = document.body.classList.contains('light');
    const baseColor = isLight ? '0,0,0' : '255,255,255';

    for (let x = dotSpacing; x < width; x += dotSpacing) {
      for (let y = dotSpacing; y < height; y += dotSpacing) {
        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / influenceRadius);

        const alpha = 0.06 + influence * 0.25;
        const size = dotRadius + influence * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${baseColor}, ${alpha})`;
        ctx.fill();

        // Draw connection lines between nearby influenced dots
        if (influence > 0.1) {
          // Check neighbor to the right
          const nx = x + dotSpacing;
          const ndx = mouseX - nx;
          const ndy = mouseY - y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);
          const nInfluence = Math.max(0, 1 - nDist / influenceRadius);
          if (nInfluence > 0.1 && nx < width) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(nx, y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${Math.min(influence, nInfluence) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
          // Check neighbor below
          const ny = y + dotSpacing;
          const bdy = mouseY - ny;
          const bDist = Math.sqrt(dx * dx + bdy * bdy);
          const bInfluence = Math.max(0, 1 - bDist / influenceRadius);
          if (bInfluence > 0.1 && ny < height) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(x, ny);
            ctx.strokeStyle = `rgba(74, 222, 128, ${Math.min(influence, bInfluence) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    }

    requestAnimationFrame(draw);
  }

  // Only run on desktop
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hasFinePointer) {
    draw();
  }
})();

// ============================================
// COUNTER ANIMATION (metrics)
// ============================================
(() => {
  const counters = document.querySelectorAll('.metric__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1500;
        const startTime = performance.now();

        function easeOutCubic(t) {
          return 1 - Math.pow(1 - t, 3);
        }

        function animate(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easeOutCubic(progress);
          el.textContent = Math.round(eased * target);
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        }

        requestAnimationFrame(animate);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ============================================
// TYPEWRITER EFFECT ON SECTION TITLES
// ============================================
(() => {
  const elements = document.querySelectorAll('.scramble-text');

  elements.forEach(el => {
    const finalText = el.textContent;
    el.textContent = '';
    el.classList.add('typewriter-ready');
    let hasTyped = false;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
          hasTyped = true;
          typewrite(el, finalText);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(el);
  });

  function typewrite(el, text) {
    let i = 0;
    el.classList.add('typewriter-active');

    function tick() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(tick, 45 + Math.random() * 35);
      } else {
        el.classList.remove('typewriter-active');
        el.classList.add('typewriter-done');
      }
    }

    tick();
  }
})();

// ============================================
// CARD GLOW TRACKING (mouse position for radial glow)
// ============================================
(() => {
  const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!hasFinePointer) return;

  const cards = document.querySelectorAll('.bento-card, .stack-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', x + '%');
      card.style.setProperty('--mouse-y', y + '%');
    });
  });
})();
