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

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 80;
  const deleteSpeed = 50;
  const pauseTime = 1300;

  const type = () => {
    const words = typingWords[currentLang] || typingWords.fr;
    const currentWord = words[wordIndex % words.length];

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
// FORM — Envoi via EmailJS
// 1. Créez un compte sur https://www.emailjs.com/
// 2. Ajoutez un service Gmail lié à ethanserville@gmail.com
// 3. Créez un template avec les variables : {{name}}, {{email}}, {{message}}
// 4. Remplacez les trois constantes ci-dessous par vos identifiants
// ============================================
const EMAILJS_PUBLIC_KEY = "KztzUUHvJS21ew28f"; // Account > API Keys
const EMAILJS_SERVICE_ID = "service_7oy25im"; // Email Services
const EMAILJS_TEMPLATE_ID = "template_5g2ic0y"; // Email Templates

const contactForm = () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const btn = form.querySelector(".btn-submit");
    const originalHTML = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    btn.disabled = true;

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(() => {
        btn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
        btn.style.background = "#27ae60";
        btn.style.borderColor = "#27ae60";
        form.reset();
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = "";
          btn.style.borderColor = "";
          btn.disabled = false;
        }, 3000);
      })
      .catch(() => {
        btn.innerHTML = '<i class="fas fa-times"></i> Erreur, réessayez.';
        btn.style.background = "#e74c3c";
        btn.style.borderColor = "#e74c3c";
        setTimeout(() => {
          btn.innerHTML = originalHTML;
          btn.style.background = "";
          btn.style.borderColor = "";
          btn.disabled = false;
        }, 3000);
      });
  });
};

// ============================================
// I18N — Traduction FR / EN
// ============================================
const translations = {
  fr: {
    "nav.home": "Accueil",
    "nav.about": "À propos",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.journey": "Parcours",
    "nav.contact": "Contact",
    "hero.greeting": "Bonjour, je suis",
    "hero.subtitle": "Étudiant en Informatique",
    "hero.cta.contact": "Me Contacter",
    "hero.cta.projects": "Voir mes projets",
    "hero.cta.cv": "Télécharger mon CV",
    "about.title": "À propos de moi",
    "about.p1":
      "Passionné par les possibilités que le développement nous offre, je cherche toujours à apprendre de nouvelles compétences, que ce soit en résolvant des problèmes ou tout simplement en trouvant des solutions qui permettent de simplifier et rendre plus agréable la vie du quotidien et l'expérience des utilisateurs.",
    "about.p2":
      "Ma discipline dans le sport (Calisthenics, Escalade) se reflète dans mon code : rigueur, persévérance et amélioration continue. J'aime créer des solutions qui allient performance et esthétique.",
    "skills.title": "Mes Compétences",
    "skills.frameworks": "Frameworks & Librairies",
    "skills.databases": "Bases de Données",
    "skills.tools": "Outils & DevOps",
    "skills.soft": "Soft Skills",
    "skills.soft.teamwork": "Travail d'équipe",
    "skills.soft.problem": "Résolution de problèmes",
    "skills.soft.autonomy": "Autonomie",
    "projects.title": "Mes Projets",
    "projects.personal": "Personnel",
    "projects.school": "Scolaire",
    "projects.wip": "Personnel : En cours",
    "projects.portfolio.title": "Portfolio Personnel",
    "projects.portfolio.desc":
      "Création de ce site vitrine pour présenter mon profil et mes compétences.",
    "projects.sacreetech.desc":
      "Application web pour une association qui organise des événements sportifs et culturels.",
    "projects.stratego.desc":
      "Reproduction du jeu de stratégie au tour par tour. Affrontez l'adversaire en capturant son drapeau tout en protégeant le vôtre, avec un système de pièces aux rangs.",
    "journey.title": "Mon Parcours",
    "journey.but.date": "2024 — Présent",
    "journey.but.title": "BUT Informatique",
    "journey.but.desc":
      "Apprentissage des fondamentaux du développement, bases de données, algorithmique et gestion de projets.",
    "journey.bac.title": "Baccalauréat",
    "journey.bac.desc":
      "Spécialités Mathématiques et NSI (Numérique et Sciences Informatiques).",
    "contact.title": "Me Contacter",
    "contact.intro": "Un projet ? Une question ? N'hésitez pas à m'écrire.",
    "contact.form.name": "Nom",
    "contact.form.namePh": "Votre nom",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.messagePh": "Votre message...",
    "contact.form.send": "Envoyer",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.journey": "Journey",
    "nav.contact": "Contact",
    "hero.greeting": "Hello, I'm",
    "hero.subtitle": "Computer Science Student",
    "hero.cta.contact": "Contact Me",
    "hero.cta.projects": "View my projects",
    "hero.cta.cv": "Download my CV",
    "about.title": "About me",
    "about.p1":
      "Passionate about the possibilities that development offers, I always strive to learn new skills, whether by solving problems or simply finding solutions that simplify everyday life and improve user experience.",
    "about.p2":
      "My discipline in sport (Calisthenics, Climbing) is reflected in my code: rigor, perseverance and continuous improvement. I love creating solutions that combine performance and aesthetics.",
    "skills.title": "My Skills",
    "skills.frameworks": "Frameworks & Libraries",
    "skills.databases": "Databases",
    "skills.tools": "Tools & DevOps",
    "skills.soft": "Soft Skills",
    "skills.soft.teamwork": "Teamwork",
    "skills.soft.problem": "Problem solving",
    "skills.soft.autonomy": "Autonomy",
    "projects.title": "My Projects",
    "projects.personal": "Personal",
    "projects.school": "Academic",
    "projects.wip": "Personal: In progress",
    "projects.portfolio.title": "Personal Portfolio",
    "projects.portfolio.desc":
      "Creation of this showcase website to present my profile and skills.",
    "projects.sacreetech.desc":
      "Web application for an association that organises sports and cultural events.",
    "projects.stratego.desc":
      "Reproduction of the turn-based strategy game. Challenge your opponent by capturing their flag while protecting yours, with a ranked pieces system.",
    "journey.title": "My Journey",
    "journey.but.date": "2024 — Present",
    "journey.but.title": "Bachelor in Computer Science",
    "journey.but.desc":
      "Learning the fundamentals of development, databases, algorithms and project management.",
    "journey.bac.title": "High School Diploma (Baccalauréat)",
    "journey.bac.desc":
      "Specialisations in Mathematics and Digital & Computer Science.",
    "contact.title": "Contact Me",
    "contact.intro": "A project? A question? Feel free to write to me.",
    "contact.form.name": "Name",
    "contact.form.namePh": "Your name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.messagePh": "Your message...",
    "contact.form.send": "Send",
  },
};

const typingWords = {
  fr: ["Ethan Serville", "Développeur", "Passionné"],
  en: ["Ethan Serville", "Developer", "Passionate"],
};

let currentLang = localStorage.getItem("lang") || "fr";

const applyTranslations = (lang) => {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[lang][key]) el.textContent = translations[lang][key];
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) el.placeholder = translations[lang][key];
  });
  document.documentElement.lang = lang;
};

const langToggle = () => {
  const btn = document.getElementById("lang-toggle");
  if (!btn) return;

  const updateBtn = () => {
    if (currentLang === "fr") {
      btn.querySelector(".lang-fr").style.display = "none";
      btn.querySelector(".lang-en").style.display = "inline";
    } else {
      btn.querySelector(".lang-fr").style.display = "inline";
      btn.querySelector(".lang-en").style.display = "none";
    }
  };

  updateBtn();
  applyTranslations(currentLang);

  btn.addEventListener("click", () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    localStorage.setItem("lang", currentLang);
    applyTranslations(currentLang);
    updateBtn();
  });
};

// ============================================
// EMAIL VALIDATION — Vérifier les adresses e-mail
// ============================================
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Exemple d'utilisation
console.log(isValidEmail("test@example.com")); // true
console.log(isValidEmail("invalid-email")); // false

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
  langToggle();
});
