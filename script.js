// =========================================================
// Navbar: solid background once the page is scrolled
// =========================================================
const mainNav = document.getElementById('mainNav');

function updateNavBackground() {
  if (window.scrollY > 20) {
    mainNav.classList.add('is-scrolled');
  } else {
    mainNav.classList.remove('is-scrolled');
  }
}
updateNavBackground();
window.addEventListener('scroll', updateNavBackground);

// =========================================================
// Close the mobile menu after a nav link is tapped
// =========================================================
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('show')) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navMenu);
      bsCollapse.hide();
    }
  });
});

// =========================================================
// Scrollspy: highlight the nav link for the section in view
// =========================================================
const sections = document.querySelectorAll('section[id]');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((section) => spyObserver.observe(section));

// =========================================================
// Hero role typing effect
// =========================================================
const roleEl = document.getElementById('roleText');
const roles = ['Frontend Developer', 'Backend Engineer', 'Problem Solver', 'Open Source Contributor'];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (roleEl && !prefersReducedMotion) {
  let roleIndex = 0;
  let charIndex = roles[0].length;
  let deleting = false;

  function tick() {
    const current = roles[roleIndex];

    if (!deleting) {
      charIndex++;
      if (charIndex > current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      if (charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        charIndex = 0;
      }
    }

    roleEl.textContent = roles[roleIndex].slice(0, charIndex);
    setTimeout(tick, deleting ? 40 : 80);
  }

  setTimeout(tick, 1400);
}

// =========================================================
// Contact form (front-end only — no backend wired up)
// =========================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formNote.textContent = "Thanks for reaching out — I'll reply within a day or two.";
    contactForm.reset();
  });
}