/* script.js — Dark Portfolio Interactivity */

// ===== Mobile menu toggle =====
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const icon = menuBtn.querySelector('i');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}

// ===== Scroll reveal for sections =====
const revealElements = document.querySelectorAll(
  '.hero-content, .hero-visual, .skill-card, .project-card, .about-text, .about-highlight, .contact-item, .contact-form'
);
revealElements.forEach(el => el.classList.add('fade-up'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealElements.forEach(el => revealObserver.observe(el));

// ===== Skill bar animation =====
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach((card, index) => {
  const fill = card.querySelector('.skill-fill');
  if (!fill) return;

  // Preserve the width set inline in HTML
  const targetWidth = fill.style.width;
  fill.style.width = '0%';
  fill.dataset.target = targetWidth;

  // Stagger the animation a bit
  card.style.transitionDelay = `${index * 50}ms`;
});

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        if (fill) {
          fill.style.width = fill.dataset.target || '85%';
        }
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillCards.forEach(card => skillObserver.observe(card));

// ===== Typing effect for hero subtitle =====
const typedEl = document.querySelector('.hero-typed');
if (typedEl) {
  const phrases = [
    'Computer Science Student',
    'Front-End Developer',
    'UI/UX Enthusiast',
    'Problem Solver'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 70;
  const deleteSpeed = 40;
  const pauseEnd = 1600;

  function typeLoop() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }

  typeLoop();
}

// ===== Contact form: client-side validation & feedback =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      alert('Please fill in all fields before sending.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      e.preventDefault();
      alert('Please enter a valid email address.');
      return;
    }

    // Allow FormSubmit to handle the actual submission
    const btn = contactForm.querySelector('button[type="submit"]');
    if (btn) {
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
    }
    // FormSubmit will redirect after sending; no further action needed.
  });
}

// ===== Smooth scrolling for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#' || href === '') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== Navbar background on scroll =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.style.background = 'rgba(10, 14, 23, 0.92)';
      navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    } else {
      navbar.style.background = 'rgba(10, 14, 23, 0.75)';
      navbar.style.boxShadow = 'none';
    }
  });
}

// ===== Profile image fallback (if pravatar fails) =====
const profileImg = document.getElementById('profileImg');
if (profileImg) {
  profileImg.addEventListener('error', () => {
    // Fallback to an inline SVG avatar
    profileImg.src =
      'data:image/svg+xml;utf8,' +
      encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">' +
        '<rect width="200" height="200" fill="#141b2d"/>' +
        '<circle cx="100" cy="80" r="36" fill="#6366f1"/>' +
        '<ellipse cx="100" cy="160" rx="60" ry="40" fill="#6366f1"/>' +
        '</svg>'
      );
  });
}