// ============================================
// BURGER MENU — Toggle navigation
// ============================================
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li a");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.classList.add("nav-overlay");
  document.body.appendChild(overlay);

  const openMenu = () => {
    nav.classList.add("nav-active");
    burger.classList.add("toggle");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeMenu = () => {
    nav.classList.remove("nav-active");
    burger.classList.remove("toggle");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    if (nav.classList.contains("nav-active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu when clicking the overlay
  overlay.addEventListener("click", closeMenu);

  // Close menu when clicking a link (mobile)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("nav-active")) {
        closeMenu();
      }
    });
  });
};

// ============================================
// HEADER — Shrink on scroll
// ============================================
const headerScroll = () => {
  const header = document.getElementById("main-header");
  if (!header) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
};

// ============================================
// ACTIVE NAV LINK — Highlight on scroll
// ============================================
const activeNavOnScroll = () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links li a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active-link");
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("active-link");
            }
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -70% 0px",
    },
  );

  sections.forEach((section) => observer.observe(section));
};

// ============================================
// SCROLL REVEAL — Animate elements on scroll
// ============================================
const scrollReveal = () => {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -60px 0px",
    },
  );

  reveals.forEach((el) => observer.observe(el));
};

// ============================================
// TYPING EFFECT — Hero section
// ============================================
const typingEffect = () => {
  const element = document.querySelector(".typing-text");
  if (!element) return;

  const words = ["Ethan Serville", "Développeur", "Passionné"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 50;
  const pauseTime = 1300;

  const type = () => {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  };

  // Start after a short delay
  setTimeout(type, 600);
};

// ============================================
// SCROLL TO TOP — Button
// ============================================
const scrollToTop = () => {
  const btn = document.querySelector(".scroll-top");
  if (!btn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  });

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

// ============================================
// FORM — Prevent default & feedback
// ============================================
const contactForm = () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector(".btn-submit");
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-check"></i> Envoyé !';
    btn.style.background = "#27ae60";

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = "";
      form.reset();
    }, 2500);
  });
};

// ============================================
// INIT — Launch everything
// ============================================
document.addEventListener("DOMContentLoaded", () => {
  navSlide();
  headerScroll();
  activeNavOnScroll();
  scrollReveal();
  typingEffect();
  scrollToTop();
  contactForm();
});
