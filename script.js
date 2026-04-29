/* ===========================
   script.js — Rehan Khan Portfolio
   =========================== */

// ─── NAV SCROLL ───────────────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── HAMBURGER / MOBILE MENU ──────────────────────────────────
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const mobileLinks = document.querySelectorAll('.mobile-link');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
  document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── TYPEWRITER EFFECT (HERO ROLE) ────────────────────────────
const roles = [
  'Web Security Analyst',
  'Penetration Tester',
  'Vulnerability Researcher',
  'CTF Player & Solver',
  'Ethical Hacker in Training',
];

const typedEl = document.getElementById('typedRole');
let roleIdx   = 0;
let charIdx   = 0;
let deleting  = false;
let typeTimer;

function typeRole() {
  const current = roles[roleIdx];

  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      deleting = true;
      typeTimer = setTimeout(typeRole, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      roleIdx  = (roleIdx + 1) % roles.length;
      typeTimer = setTimeout(typeRole, 400);
      return;
    }
  }

  typeTimer = setTimeout(typeRole, deleting ? 40 : 80);
}

typeRole();

// ─── INTERSECTION OBSERVER — FADE UP ─────────────────────────
const fadeTargets = document.querySelectorAll(
  '.section-tag, .section-heading, .about-text, .about-card-stack,' +
  '.skill-category, .project-card, .service-card, .contact-links,' +
  '.contact-form, .info-card, .hero-badge, .hero-name, .hero-role,' +
  '.hero-tagline, .hero-actions, .hero-stats, .contact-sub'
);

fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeTargets.forEach(el => observer.observe(el));

// ─── SKILL BARS ANIMATE ON SCROLL ────────────────────────────
const skillBars = document.querySelectorAll('.sl-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animated');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => barObserver.observe(bar));

// ─── ACTIVE NAV LINK ON SCROLL ───────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });

  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      if (!link.classList.contains('nav-cta')) {
        link.style.color = 'var(--accent)';
      }
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

// ─── CONTACT FORM — handled by Formspree (https://formspree.io/f/mgodwwyy) ──

// ─── SMOOTH SCROLL FOR ALL ANCHOR LINKS ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── STAGGERED FADE DELAYS ───────────────────────────────────
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.12}s`;
});

document.querySelectorAll('.service-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.info-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});

document.querySelectorAll('.skill-category').forEach((cat, i) => {
  cat.style.transitionDelay = `${i * 0.1}s`;
});

// ─── TERMINAL TYPING EFFECT (HERO) ────────────────────────────
// Adds a subtle animated appearance to terminal lines on page load
const termLines = document.querySelectorAll('#terminalBody .t-line');
termLines.forEach((line, i) => {
  line.style.opacity = '0';
  line.style.transform = 'translateX(-8px)';
  line.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

  setTimeout(() => {
    line.style.opacity = '1';
    line.style.transform = 'translateX(0)';
  }, 500 + i * 120);
});

// ─── CONSOLE EASTER EGG ───────────────────────────────────────
console.log('%c👾 Rehan Khan — Web Security Portfolio', 'color:#4a9eff;font-size:16px;font-weight:bold;');
console.log('%c Ethical. Analytical. Relentless. ', 'color:#38d9a9;font-size:13px;');
console.log('%c[i] No vulnerabilities here. Probably.', 'color:#5c7080;font-size:11px;font-style:italic;');
