// ============================================
// BURGER MENU — Toggle navigation
// ============================================
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li a");
  const tabletBreakpoint = 1160;

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

  // Close menu with Escape key for better accessibility
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("nav-active")) {
      closeMenu();
    }
  });

  // Reset mobile/tablet menu state when returning to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > tabletBreakpoint) {
      closeMenu();
    }
  });

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
  const navLinks = Array.from(
    document.querySelectorAll('.nav-links li a[href^="#"]'),
  );
  const sections = navLinks
    .map((link) => {
      const id = link.getAttribute("href")?.slice(1);
      if (!id) return null;
      const element = document.getElementById(id);
      return element ? { id, element } : null;
    })
    .filter(Boolean);

  if (!sections.length || !navLinks.length) return;

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active-link",
        link.getAttribute("href") === `#${id}`,
      );
    });
  };

  const updateActiveLinkOnScroll = () => {
    const header = document.getElementById("main-header");
    const headerHeight = header ? header.offsetHeight : 70;
    const activationLine =
      window.scrollY +
      headerHeight +
      (window.innerHeight - headerHeight) * 0.38;
    const pageBottom = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    let currentSectionId = sections[0].id;

    for (let i = 0; i < sections.length; i++) {
      const currentTop = sections[i].element.offsetTop;
      const nextTop =
        i < sections.length - 1
          ? sections[i + 1].element.offsetTop
          : Number.POSITIVE_INFINITY;

      if (activationLine >= currentTop && activationLine < nextTop) {
        currentSectionId = sections[i].id;
        break;
      }
    }

    // Keep the last nav item active near the end of the page.
    if (documentHeight - pageBottom <= 4) {
      currentSectionId = sections[sections.length - 1].id;
    }

    setActiveLink(currentSectionId);
  };

  updateActiveLinkOnScroll();
  window.addEventListener("scroll", updateActiveLinkOnScroll, {
    passive: true,
  });
  window.addEventListener("resize", updateActiveLinkOnScroll);
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
// COMPETENCY CARDS — Hover desktop / tap mobile-tablet
// ============================================
const competencyCardsInteraction = () => {
  const cards = document.querySelectorAll(".portfolio-card");
  if (!cards.length) return;

  const closeAllCards = () => {
    cards.forEach((card) => {
      card.classList.remove("is-open");
      card.setAttribute("aria-expanded", "false");
    });
  };

  cards.forEach((card, index) => {
    if (!card.querySelector(".portfolio-details")) {
      const detailsPanel = document.createElement("div");
      detailsPanel.classList.add("portfolio-details");

      const detailRows = card.querySelectorAll(":scope > p");
      detailRows.forEach((row) => detailsPanel.appendChild(row));
      card.appendChild(detailsPanel);
    }

    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");
    card.setAttribute(
      "aria-label",
      `Afficher les details de la competence ${index + 1}`,
    );

    card.addEventListener("click", () => {
      const isOpen = card.classList.contains("is-open");

      closeAllCards();

      if (!isOpen) {
        card.classList.add("is-open");
        card.setAttribute("aria-expanded", "true");
      } else {
        card.setAttribute("aria-expanded", "false");
      }
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".portfolio-card")) {
      closeAllCards();
    }
  });
};

// ============================================
// PROJECT CAROUSELS — Navigate project visuals
// ============================================
const initProjectCarousels = () => {
  const carousels = document.querySelectorAll("[data-carousel]");
  if (!carousels.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  carousels.forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const slides = Array.from(carousel.querySelectorAll(".project-slide"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    const dotsContainer = carousel.querySelector(".project-carousel-dots");

    if (!track || !slides.length || !prevButton || !nextButton) return;

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
    }

    const dots = slides.map((_, slideIndex) => {
      if (!dotsContainer) return null;

      const dot = document.createElement("button");
      dot.className = "project-carousel-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `Voir l'image ${slideIndex + 1}`);
      dot.setAttribute("data-carousel-dot", `${slideIndex}`);
      dotsContainer.appendChild(dot);
      return dot;
    });

    if (slides.length === 1) {
      prevButton.hidden = true;
      nextButton.hidden = true;
      if (dotsContainer) {
        dotsContainer.hidden = true;
      }
      track.style.transform = "translateX(0%)";
      slides[0].classList.add("is-active");
      return;
    }

    prevButton.hidden = false;
    nextButton.hidden = false;
    if (dotsContainer) {
      dotsContainer.hidden = false;
    }

    let currentIndex = 0;
    let autoplayId = null;

    const updateCarousel = (index) => {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === currentIndex);
      });

      dots.forEach((dot, dotIndex) => {
        if (!dot) return;
        const isActive = dotIndex === currentIndex;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
    };

    const stopAutoplay = () => {
      if (autoplayId) {
        window.clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const startAutoplay = () => {
      if (prefersReducedMotion) return;
      stopAutoplay();
      autoplayId = window.setInterval(() => {
        updateCarousel(currentIndex + 1);
      }, 5000);
    };

    prevButton.addEventListener("click", () => {
      updateCarousel(currentIndex - 1);
      startAutoplay();
    });

    nextButton.addEventListener("click", () => {
      updateCarousel(currentIndex + 1);
      startAutoplay();
    });

    dots.forEach((dot, dotIndex) => {
      if (!dot) return;
      dot.addEventListener("click", () => {
        updateCarousel(dotIndex);
        startAutoplay();
      });
    });

    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
    carousel.addEventListener("focusin", stopAutoplay);
    carousel.addEventListener("focusout", (event) => {
      if (!carousel.contains(event.relatedTarget)) {
        startAutoplay();
      }
    });

    updateCarousel(0);
    startAutoplay();
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
    "nav.stack": "Stack technique",
    "nav.skills": "Compétences",
    "nav.projects": "Projets",
    "nav.journey": "Parcours",
    "nav.contact": "Contact",
    "hero.subtitle": "Étudiant en Informatique",
    "hero.cta.contact": "Me Contacter",
    "hero.cta.projects": "Voir mes projets",
    "hero.cta.cv": "Télécharger mon CV",
    "about.title": "À propos de moi",
    "about.p1":
      "Passionné par les possibilités que le développement nous offre, je cherche toujours à apprendre de nouvelles compétences, que ce soit en résolvant des problèmes ou tout simplement en trouvant des solutions qui permettent de simplifier et rendre plus agréable la vie du quotidien et l'expérience des utilisateurs.",
    "about.p2":
      "Ma discipline dans le sport (Calisthenics, Escalade) se reflète dans mon code : rigueur, persévérance et amélioration continue. J'aime créer des solutions qui allient performance et esthétique.",
    "skills.title": "Compétences",
    "stack.title": "Stack technique",
    "skills.frameworks": "Frameworks & Librairies",
    "skills.databases": "Bases de Données",
    "skills.tools": "Outils & DevOps",
    "skills.soft": "Soft Skills",
    "skills.soft.teamwork": "Travail d'équipe",
    "skills.soft.problem": "Résolution de problèmes",
    "skills.soft.autonomy": "Autonomie",
    "competencies.showMore": "Voir plus de compétences",
    "competencies.showLess": "Voir moins de compétences",
    "portfolio.title": "Compétences",
    "portfolio.label.context": "Contexte :",
    "portfolio.label.tech": "Techno :",
    "portfolio.label.tools": "Outils :",
    "portfolio.label.learned": "Ce que j'ai appris :",
    "portfolio.label.validated": "Compétence validée :",
    "portfolio.card1.title": "Développement d'application (Symfony & PHP)",
    "portfolio.card1.context":
      "Création d'un site web pour une association qui gère des événements.",
    "portfolio.card1.tech": "PHP, Symfony, HTML, CSS.",
    "portfolio.card1.learned":
      "Concevoir des applications complètes en partant des exigences clients jusqu'à la mise en production.",
    "portfolio.card1.validated":
      "Maintenir en conditions opérationnelles un site web et faire évoluer une application grâce à une structure de code propre avec Symfony.",
    "portfolio.card2.title": "Algorithme et optimisation (Python)",
    "portfolio.card2.context":
      "Algorithmes de recherche et de construction de labyrinthes.",
    "portfolio.card2.tech": "Python.",
    "portfolio.card2.learned":
      "Comparer des algorithmes pour trouver le plus efficace en prenant en compte l'impact sur les ressources (CPU, mémoire).",
    "portfolio.card2.validated":
      "Anticiper les résultats de diverses métriques, produire un code exigeant et l'optimiser.",
    "portfolio.card3.title": "Administration système (VM, OpenNebula)",
    "portfolio.card3.context":
      "Création de machines virtuelles et configuration.",
    "portfolio.card3.learned":
      "Configurer un poste de travail complet, gérer des réseaux virtuels et sécuriser des services.",
    "portfolio.card3.validated":
      "Installer et configurer un système d'exploitation et des outils de développement.",
    "portfolio.card4.title": "Soft skills et gestion (recueil de besoin)",
    "portfolio.card4.context":
      "Exercices de récupération des besoins client et simulation de création d'entreprise.",
    "portfolio.card4.learned":
      "Identifier les acteurs, les phases de vie d'un projet et formaliser les attentes.",
    "portfolio.card4.validated":
      "Appréhender les besoins du client et de l'utilisateur, concevoir un business plan et modéliser la gestion des stocks.",
    "portfolio.card5.title":
      "Gestion de versions et travail collaboratif (Git)",
    "portfolio.card5.context":
      "Gestion du code source lors du projet de site web pour l'association.",
    "portfolio.card5.tech": "Git, GitHub.",
    "portfolio.card5.learned":
      "Travailler sur des branches séparées, fusionner des modifications et résoudre des conflits sans perdre de données.",
    "portfolio.card5.validated":
      "Sécuriser le cycle de développement et garantir l'historique des modifications d'un projet.",
    "portfolio.card6.title":
      "Conception et manipulation de bases de données (SQL)",
    "portfolio.card6.context":
      "Architecture des données pour le système de gestion d'événements et de membres.",
    "portfolio.card6.tech":
      "MySQL / MariaDB (utilisé avec Doctrine sur Symfony).",
    "portfolio.card6.learned":
      "Modéliser des données complexes (MCD/MLD), optimiser les requêtes et assurer l'intégrité référentielle des informations.",
    "portfolio.card6.validated":
      "Concevoir une base de données relationnelle performante et adaptée aux besoins métier.",
    "portfolio.card7.title": "Gestion de projet et méthodes agiles",
    "portfolio.card7.context":
      "Organisation du travail en équipe pour des simulations de création d'entreprise.",
    "portfolio.card7.tools": "Méthode Scrum.",
    "portfolio.card7.learned":
      "Découper un projet en tâches, prioriser les fonctionnalités et respecter des délais stricts.",
    "portfolio.card7.validated":
      "Piloter un projet informatique avec une méthodologie structurée pour garantir la livraison.",
    "portfolio.card8.title": "Programmation orientée objet (C++)",
    "portfolio.card8.context": "Développement d'un jeu de plateau (Stratego).",
    "portfolio.card8.tech": "C++.",
    "portfolio.card8.learned":
      "Appliquer les principes de la POO (encapsulation, héritage, polymorphisme).",
    "portfolio.card8.validated":
      "Concevoir une architecture logicielle complexe et modulaire.",
    "portfolio.card9.title": "Services réseaux et infrastructure",
    "portfolio.card9.context":
      "Mise en place d'un réseau local et configuration de services serveurs.",
    "portfolio.card9.tech": "Protocoles TCP/IP, DNS, DHCP, adressage IP.",
    "portfolio.card9.learned":
      "Comprendre comment les données circulent entre les machines, configurer des routeurs et assurer la connectivité d'un parc informatique.",
    "portfolio.card9.validated":
      "Déployer et dépanner des infrastructures réseaux de base pour garantir l'interconnexion des systèmes.",
    "portfolio.card10.title": "Qualité de code et tests",
    "portfolio.card10.context":
      "Automatisation du contrôle qualité sur un projet de groupe.",
    "portfolio.card10.tech": "PHPUnit (Symfony).",
    "portfolio.card10.learned":
      "Écrire des tests unitaires et d'intégration pour prévenir les régressions et garantir que chaque fonctionnalité répond au cahier des charges.",
    "portfolio.card10.validated":
      "Assurer la fiabilité d'un livrable informatique par une démarche de test rigoureuse.",
    "projects.title": "Mes Projets",
    "projects.personal": "Personnel",
    "projects.school": "Scolaire",
    "projects.wip": "Personnel : En cours",
    "projects.wip.pro": "Professionnel : En cours",
    "projects.portfolio.title": "Portfolio Personnel",
    "projects.portfolio.desc":
      "Création de ce site vitrine pour présenter mon profil et mes compétences.",
    "projects.viewCode": "Voir le code",
    "projects.sacreetech.title": "Site Web SacreeTech",
    "projects.sacreetech.desc":
      "Application web pour une association qui organise des événements sportifs et culturels.",
    "projects.stratego.title": "Stratego",
    "projects.stratego.desc":
      "Reproduction du jeu de stratégie au tour par tour. Affrontez l'adversaire en capturant son drapeau tout en protégeant le vôtre, avec un système de pièces aux rangs.",
    "projects.airhh.title": "AIRHH",
    "projects.airhh.desc":
      "Développement d'un site web pour une agence de communication.",
    "projects.afleuro.title": "A Fleur d'Ô",
    "projects.afleuro.desc":
      "Développement d'un site web pour un fleuriste local, mettant en avant leurs produits et services.",
    "projects.valois.title": "Valois Nettoyage",
    "projects.valois.desc":
      "Développement d'un site web pour une entreprise de nettoyage, présentant leurs services et permettant aux clients de les contacter facilement.",
    "projects.worldmenu.title": "World Menu",
    "projects.worldmenu.desc":
      "Site proposant des idées de menus et des recettes pour partir à la découverte de la culture culinaire du monde entier.",
    "projects.pacman.title": "Pac-Man",
    "projects.pacman.desc":
      "Reproduction du jeu d'arcade Pac-Man avec gestion des fantômes, des niveaux et du score.",
    "projects.showMore": "Voir plus de projets",
    "projects.showLess": "Voir moins de projets",
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
    "nav.stack": "Tech Stack",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.journey": "Journey",
    "nav.contact": "Contact",
    "hero.greeting": "I'm",
    "hero.subtitle": "Computer Science Student",
    "hero.cta.contact": "Contact Me",
    "hero.cta.projects": "View my projects",
    "hero.cta.cv": "Download my CV",
    "about.title": "About me",
    "about.p1":
      "Passionate about the possibilities that development offers, I always strive to learn new skills, whether by solving problems or simply finding solutions that simplify everyday life and improve user experience.",
    "about.p2":
      "My discipline in sport (Calisthenics, Climbing) is reflected in my code: rigor, perseverance and continuous improvement. I love creating solutions that combine performance and aesthetics.",
    "skills.title": "Skills",
    "stack.title": "Tech Stack",
    "skills.frameworks": "Frameworks & Libraries",
    "skills.databases": "Databases",
    "skills.tools": "Tools & DevOps",
    "skills.soft": "Soft Skills",
    "skills.soft.teamwork": "Teamwork",
    "skills.soft.problem": "Problem solving",
    "skills.soft.autonomy": "Autonomy",
    "competencies.showMore": "Show more skills",
    "competencies.showLess": "Show fewer skills",
    "portfolio.title": "Skills",
    "portfolio.label.context": "Context:",
    "portfolio.label.tech": "Technologies:",
    "portfolio.label.tools": "Tools:",
    "portfolio.label.learned": "What I learned:",
    "portfolio.label.validated": "Validated skill:",
    "portfolio.card1.title": "Application Development (Symfony & PHP)",
    "portfolio.card1.context":
      "Creation of a website for an association that manages events.",
    "portfolio.card1.tech": "PHP, Symfony, HTML, CSS.",
    "portfolio.card1.learned":
      "Designing complete applications from client requirements to production deployment.",
    "portfolio.card1.validated":
      "Maintaining a website in operational condition and evolving an application with a clean Symfony code structure.",
    "portfolio.card2.title": "Algorithms and Optimization (Python)",
    "portfolio.card2.context":
      "Search algorithms and maze generation algorithms.",
    "portfolio.card2.tech": "Python.",
    "portfolio.card2.learned":
      "Comparing algorithms to find the most efficient one while considering resource usage (CPU, memory).",
    "portfolio.card2.validated":
      "Anticipating metric outcomes, producing demanding code and optimizing it.",
    "portfolio.card3.title": "System Administration (VM, OpenNebula)",
    "portfolio.card3.context":
      "Creation and configuration of virtual machines.",
    "portfolio.card3.learned":
      "Configuring a complete workstation, managing virtual networks and securing services.",
    "portfolio.card3.validated":
      "Installing and configuring an operating system and development tools.",
    "portfolio.card4.title":
      "Soft Skills and Management (Requirements Gathering)",
    "portfolio.card4.context":
      "Client requirement collection exercises and company creation simulations.",
    "portfolio.card4.learned":
      "Identifying stakeholders, project life-cycle phases and formalizing expectations.",
    "portfolio.card4.validated":
      "Understanding client and user needs, designing a business plan and modeling stock management.",
    "portfolio.card5.title": "Version Control and Collaborative Work (Git)",
    "portfolio.card5.context":
      "Source code management during the association website project.",
    "portfolio.card5.tech": "Git, GitHub.",
    "portfolio.card5.learned":
      "Working on separate branches, merging changes and resolving conflicts without data loss.",
    "portfolio.card5.validated":
      "Securing the development lifecycle and ensuring a reliable project change history.",
    "portfolio.card6.title": "Database Design and Manipulation (SQL)",
    "portfolio.card6.context":
      "Data architecture for the event and member management system.",
    "portfolio.card6.tech": "MySQL / MariaDB (used with Doctrine on Symfony).",
    "portfolio.card6.learned":
      "Modeling complex data (MCD/MLD), optimizing queries and ensuring referential integrity.",
    "portfolio.card6.validated":
      "Designing a high-performance relational database adapted to business needs.",
    "portfolio.card7.title": "Project Management and Agile Methods",
    "portfolio.card7.context":
      "Team work organization for company creation simulations.",
    "portfolio.card7.tools": "Scrum methodology.",
    "portfolio.card7.learned":
      "Breaking down a project into tasks, prioritizing features and meeting strict deadlines.",
    "portfolio.card7.validated":
      "Leading an IT project with a structured methodology to ensure delivery.",
    "portfolio.card8.title": "Object-Oriented Programming (C++)",
    "portfolio.card8.context": "Development of a board game (Stratego).",
    "portfolio.card8.tech": "C++.",
    "portfolio.card8.learned":
      "Applying OOP principles (encapsulation, inheritance, polymorphism).",
    "portfolio.card8.validated":
      "Designing a complex and modular software architecture.",
    "portfolio.card9.title": "Network Services and Infrastructure",
    "portfolio.card9.context":
      "Setting up a local network and configuring server services.",
    "portfolio.card9.tech": "TCP/IP, DNS, DHCP protocols, IP addressing.",
    "portfolio.card9.learned":
      "Understanding how data flows between machines, configuring routers and ensuring network connectivity.",
    "portfolio.card9.validated":
      "Deploying and troubleshooting basic network infrastructures to ensure system interconnection.",
    "portfolio.card10.title": "Code Quality and Testing",
    "portfolio.card10.context": "Automated quality control on a group project.",
    "portfolio.card10.tech": "PHPUnit (Symfony).",
    "portfolio.card10.learned":
      "Writing unit and integration tests to prevent regressions and ensure each feature meets specifications.",
    "portfolio.card10.validated":
      "Ensuring software deliverable reliability through a rigorous testing approach.",
    "projects.title": "My Projects",
    "projects.personal": "Personal",
    "projects.school": "Academic",
    "projects.wip": "Personal: In progress",
    "projects.wip.pro": "Professional: In progress",
    "projects.portfolio.title": "Personal Portfolio",
    "projects.portfolio.desc":
      "Creation of this showcase website to present my profile and skills.",
    "projects.viewCode": "View code",
    "projects.sacreetech.title": "SacreeTech Website",
    "projects.sacreetech.desc":
      "Web application for an association that organises sports and cultural events.",
    "projects.stratego.title": "Stratego",
    "projects.stratego.desc":
      "Reproduction of the turn-based strategy game. Challenge your opponent by capturing their flag while protecting yours, with a ranked pieces system.",
    "projects.airhh.title": "AIRHH",
    "projects.airhh.desc":
      "Development of a website for a communication agency.",
    "projects.afleuro.title": "A Fleur d'O",
    "projects.afleuro.desc":
      "Development of a website for a local florist, showcasing products and services.",
    "projects.valois.title": "Valois Cleaning",
    "projects.valois.desc":
      "Development of a website for a cleaning company, presenting its services and helping clients get in touch easily.",
    "projects.worldmenu.title": "World Menu",
    "projects.worldmenu.desc":
      "Website offering menu ideas and recipes to explore culinary cultures from around the world.",
    "projects.pacman.title": "Pac-Man",
    "projects.pacman.desc":
      "Reproduction of the classic Pac-Man arcade game with ghost management, levels and score system.",
    "projects.showMore": "Show more projects",
    "projects.showLess": "Show fewer projects",
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
  fr: ["Développeur", "Passionné"],
  en: ["Passionate", "Developer"],
};

let currentLang = localStorage.getItem("lang") || "fr";
const showMoreControllers = [];

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

const updateShowMoreButtonsLanguage = () => {
  showMoreControllers.forEach((updateLabel) => updateLabel());
};

const initShowMoreForSection = ({
  gridSelector,
  itemSelector,
  buttonSelector,
  sectionKey,
  maxVisible = 6,
}) => {
  const grid = document.querySelector(gridSelector);
  const button = document.querySelector(buttonSelector);
  if (!grid || !button) return;

  const items = Array.from(grid.querySelectorAll(itemSelector));
  const hideTimers = new WeakMap();
  if (items.length <= maxVisible) {
    button.style.display = "none";
    return;
  }

  let expanded = false;

  const updateLabel = () => {
    const key = expanded ? `${sectionKey}.showLess` : `${sectionKey}.showMore`;
    const fallback = expanded ? "Voir moins" : "Voir plus";
    button.textContent = translations[currentLang]?.[key] || fallback;
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
  };

  const updateVisibility = ({ animateCollapse = false } = {}) => {
    items.forEach((item, index) => {
      const wasHidden = item.classList.contains("is-hidden-by-limit");
      const existingTimer = hideTimers.get(item);

      if (existingTimer) {
        clearTimeout(existingTimer);
        hideTimers.delete(item);
      }

      if (!expanded && index >= maxVisible) {
        item.classList.remove("show-more-enter");

        if (animateCollapse && !wasHidden) {
          const reverseIndex = items.length - 1 - index;
          const delay = Math.max(reverseIndex, 0) * 35;

          item.style.setProperty("--show-more-delay", `${delay}ms`);
          item.classList.add("show-more-exit");

          const timer = setTimeout(() => {
            item.classList.add("is-hidden-by-limit");
            item.classList.remove("show-more-exit");
            item.style.removeProperty("--show-more-delay");
            hideTimers.delete(item);
          }, 280 + delay);

          hideTimers.set(item, timer);
        } else {
          item.classList.add("is-hidden-by-limit");
          item.classList.remove("show-more-exit");
          item.style.removeProperty("--show-more-delay");
        }
      } else {
        item.classList.remove("is-hidden-by-limit");
        item.classList.remove("show-more-exit");

        if (expanded && wasHidden) {
          const delay = Math.max(index - maxVisible, 0) * 55;
          item.style.setProperty("--show-more-delay", `${delay}ms`);
          item.classList.add("show-more-enter");

          const cleanupAnimationClass = () => {
            item.classList.remove("show-more-enter");
            item.style.removeProperty("--show-more-delay");
            item.removeEventListener("animationend", cleanupAnimationClass);
          };

          item.addEventListener("animationend", cleanupAnimationClass);
        }
      }
    });
    updateLabel();
  };

  button.addEventListener("click", () => {
    const wasExpanded = expanded;
    expanded = !expanded;
    updateVisibility({ animateCollapse: wasExpanded && !expanded });
  });

  showMoreControllers.push(updateLabel);
  updateVisibility({ animateCollapse: false });
};

const langToggle = () => {
  const buttons = Array.from(document.querySelectorAll(".lang-toggle"));
  if (!buttons.length) return;

  const updateButtons = () => {
    buttons.forEach((btn) => {
      const frLabel = btn.querySelector(".lang-fr");
      const enLabel = btn.querySelector(".lang-en");
      if (!frLabel || !enLabel) return;

      if (currentLang === "fr") {
        frLabel.style.display = "none";
        enLabel.style.display = "inline";
      } else {
        frLabel.style.display = "inline";
        enLabel.style.display = "none";
      }
    });
  };

  const switchLanguage = () => {
    currentLang = currentLang === "fr" ? "en" : "fr";
    localStorage.setItem("lang", currentLang);
    applyTranslations(currentLang);
    updateButtons();
    updateShowMoreButtonsLanguage();
  };

  updateButtons();
  applyTranslations(currentLang);

  buttons.forEach((btn) => btn.addEventListener("click", switchLanguage));
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
  initShowMoreForSection({
    gridSelector: ".portfolio-grid",
    itemSelector: ".portfolio-card",
    buttonSelector: "#competencies-show-more",
    sectionKey: "competencies",
    maxVisible: 6,
  });
  initShowMoreForSection({
    gridSelector: ".projects-grid",
    itemSelector: ".project-card",
    buttonSelector: "#projects-show-more",
    sectionKey: "projects",
    maxVisible: 6,
  });
  scrollReveal();
  typingEffect();
  scrollToTop();
  contactForm();
  langToggle();
  competencyCardsInteraction();
  initProjectCarousels();
});
