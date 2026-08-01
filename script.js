document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  const header = document.querySelector('.header');
  const backToTop = document.querySelector('.back-to-top');
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (year) year.textContent = new Date().getFullYear();

  let lastScroll = 0;
  const handleScroll = () => {
    const current = window.scrollY;
    header?.classList.toggle('scrolled', current > 50);
    backToTop?.classList.toggle('show', current > 500);

    if (!menu?.classList.contains('active')) {
      header.style.transform = current > lastScroll && current > 350 ? 'translateY(-115%)' : 'translateY(0)';
    }
    lastScroll = Math.max(current, 0);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  const closeMenu = () => {
    menu?.classList.remove('active');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuToggle?.addEventListener('click', () => {
    const active = menu?.classList.toggle('active');
    menuToggle.classList.toggle('active', active);
    menuToggle.setAttribute('aria-expanded', String(active));
    document.body.classList.toggle('menu-open', active);
  });

  document.querySelectorAll('.menu a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });

  const reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('active'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -40px' });
    reveals.forEach((el) => observer.observe(el));
  }

  const testimonials = [...document.querySelectorAll('.testimonial')];
  const dotsContainer = document.querySelector('.testimonial-dots');
  let testimonialIndex = 0;
  let testimonialTimer;

  const showTestimonial = (index) => {
    testimonialIndex = index;
    testimonials.forEach((item, i) => item.classList.toggle('active', i === index));
    document.querySelectorAll('.testimonial-dot').forEach((dot, i) => dot.classList.toggle('active', i === index));
  };

  if (testimonials.length > 1 && dotsContainer) {
    testimonials.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `testimonial-dot${index === 0 ? ' active' : ''}`;
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver depoimento ${index + 1}`);
      dot.addEventListener('click', () => { showTestimonial(index); restartTestimonials(); });
      dotsContainer.appendChild(dot);
    });

    function restartTestimonials() {
      clearInterval(testimonialTimer);
      if (!reducedMotion) testimonialTimer = setInterval(() => showTestimonial((testimonialIndex + 1) % testimonials.length), 5500);
    }
    restartTestimonials();
  }

  const form = document.querySelector('#whatsappForm');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = {
      name: document.querySelector('#name')?.value.trim(),
      email: document.querySelector('#email')?.value.trim(),
      phone: document.querySelector('#phone')?.value.trim(),
      type: document.querySelector('#type')?.value,
      message: document.querySelector('#message')?.value.trim(),
    };
    const text = `Olá, gostaria de solicitar um projeto de arquitetura.\n\nNome: ${data.name}\nEmail: ${data.email}\nTelefone: ${data.phone}\nTipo de projeto: ${data.type}\n\nMensagem:\n${data.message}`;
    window.open(`https://wa.me/5583991497634?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  });

  const whatsapp = document.querySelector('.whatsapp');
  if (whatsapp) {
    whatsapp.href = 'https://wa.me/5583991497634';
    whatsapp.target = '_blank';
    whatsapp.rel = 'noopener noreferrer';
  }

  backToTop?.addEventListener('click', (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
      }
    });
  });

  const sections = [...document.querySelectorAll('main section[id]')];
  const menuLinks = [...document.querySelectorAll('.menu a[href^="#"]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          menuLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55%' });
    sections.forEach((section) => sectionObserver.observe(section));
  }
});
