// ============================================
// PROJECTS CONFIG — Edit this file only
// ============================================
window.portfolioProjectsConfig = {
  ui: {
    fr: {
      placeholderBadge: "Bientôt",
      placeholderMessage: "Des images arrivent bientôt",
      placeholderAria: "Images du projet à venir",
      carouselPrev: "Image précédente",
      carouselNext: "Image suivante",
      carouselGallery: "Galerie du projet",
      carouselDot: "Voir l'image",
    },
    en: {
      placeholderBadge: "Soon",
      placeholderMessage: "Images are coming soon",
      placeholderAria: "Project images coming soon",
      carouselPrev: "Previous image",
      carouselNext: "Next image",
      carouselGallery: "Project gallery",
      carouselDot: "View image",
    },
  },
  projects: [
    {
      context: { fr: "Personnel", en: "Personal" },
      title: { fr: "Portfolio Personnel", en: "Personal Portfolio" },
      description: {
        fr: "Création de ce site vitrine pour présenter mon profil et mes compétences.",
        en: "Creation of this showcase website to present my profile and skills.",
      },
      tags: ["HTML", "CSS", "JavaScript"],
      link: {
        href: "https://ethan-serville.vercel.app/",
        targetBlank: false,
        label: { fr: "Voir le site", en: "View site" },
      },
      images: [
        {
          src: "assets/projects/portfolio-1.png",
          alt: {
            fr: "Aperçu du portfolio personnel, section d'accueil et présentation",
            en: "Personal portfolio preview, home and intro section",
          },
        },
        {
          src: "assets/projects/portfolio-2.png",
          alt: {
            fr: "Aperçu du portfolio personnel, section projets et détails visuels",
            en: "Personal portfolio preview, projects section and visual details",
          },
        },
        {
          src: "assets/projects/portfolio-3.png",
          alt: {
            fr: "Aperçu du portfolio personnel, section compétences et expériences",
            en: "Personal portfolio preview, skills and experience section",
          },
        },
        {
          src: "assets/projects/portfolio-4.png",
          alt: {
            fr: "Aperçu du portfolio personnel, section compétences et expériences",
            en: "Personal portfolio preview, skills and experience section",
          },
        },
      ],
    },
    {
      context: { fr: "Scolaire", en: "Academic" },
      title: { fr: "Site Web SacreeTech", en: "SacreeTech Website" },
      description: {
        fr: "Application web pour une association qui organise des événements sportifs et culturels.",
        en: "Web application for an association that organises sports and cultural events.",
      },
      tags: ["PHP", "Symfony", "Bootstrap"],
      link: {
        href: "https://github.com/EthanS0107/sacreeTech",
        targetBlank: true,
        label: { fr: "Voir le code", en: "View code" },
      },
      images: [
        {
          src: "assets/projects/sacreetech-1.png",
          alt: {
            fr: "Aperçu du site SacreeTech",
            en: "SacreeTech website preview",
          },
        },
        {
          src: "assets/projects/sacreetech-2.png",
          alt: {
            fr: "Aperçu du site SacreeTech",
            en: "SacreeTech website preview",
          },
        },
        {
          src: "assets/projects/sacreetech-3.png",
          alt: {
            fr: "Aperçu du site SacreeTech",
            en: "SacreeTech website preview",
          },
        },
        {
          src: "assets/projects/sacreetech-4.png",
          alt: {
            fr: "Aperçu du site SacreeTech",
            en: "SacreeTech website preview",
          },
        },
      ],
    },
    {
      context: { fr: "Personnel : En cours", en: "Personal: In progress" },
      contextClassName: "badge-wip",
      title: { fr: "Stratego", en: "Stratego" },
      description: {
        fr: "Reproduction du jeu de stratégie au tour par tour. Affrontez l'adversaire en capturant son drapeau tout en protégeant le vôtre, avec un système de pièces aux rangs.",
        en: "Reproduction of the turn-based strategy game. Challenge your opponent by capturing their flag while protecting yours, with a ranked pieces system.",
      },
      tags: ["C++"],
      link: {
        href: "https://github.com/EthanS0107/stratego",
        targetBlank: true,
        label: { fr: "Voir le code", en: "View code" },
      },
      images: [],
    },
    {
      context: {
        fr: "Professionnel : En cours",
        en: "Professional: In progress",
      },
      contextClassName: "badge-wip",
      title: { fr: "AIRHH", en: "AIRHH" },
      description: {
        fr: "Développement d'un site web pour une agence de communication.",
        en: "Development of a website for a communication agency.",
      },
      tags: ["JS", "React"],
      link: {
        href: "https://airhh.myboostlocal.com/",
        targetBlank: true,
        label: { fr: "Voir le site", en: "View site" },
      },
      images: [
        {
          src: "assets/projects/airhh-1.png",
          alt: {
            fr: "Aperçu d'AIRHH avec identité de marque et mise en page agence",
            en: "AIRHH preview with brand identity and agency layout",
          },
        },
        {
          src: "assets/projects/airhh-2.png",
          alt: {
            fr: "Aperçu d'AIRHH avec identité de marque et mise en page agence",
            en: "AIRHH preview with brand identity and agency layout",
          },
        },
        {
          src: "assets/projects/airhh-3.png",
          alt: {
            fr: "Aperçu d'AIRHH avec identité de marque et mise en page agence",
            en: "AIRHH preview with brand identity and agency layout",
          },
        },
        {
          src: "assets/projects/airhh-4.png",
          alt: {
            fr: "Aperçu d'AIRHH avec identité de marque et mise en page agence",
            en: "AIRHH preview with brand identity and agency layout",
          },
        },
      ],
    },
    /*
    {
      context: {
        fr: "Professionnel : En cours",
        en: "Professional: In progress",
      },
      contextClassName: "badge-wip",
      title: { fr: "A Fleur d'Ô", en: "A Fleur d'O" },
      description: {
        fr: "Développement d'un site web pour un fleuriste local, mettant en avant leurs produits et services.",
        en: "Development of a website for a local florist, showcasing products and services.",
      },
      tags: ["JS", "React"],
      link: {
        href: "https://a-fleur-d-o.myboostlocal.com/",
        targetBlank: true,
        label: { fr: "Voir le site", en: "View site" },
      },
      images: [
        {
          src: "assets/projects/a-fleur-d-o-1.png",
          alt: {
            fr: "Aperçu de A Fleur d'Ô avec univers floral et mise en avant des bouquets",
            en: "A Fleur d'O preview with floral identity and bouquet highlights",
          },
        },
        {
          src: "assets/projects/a-fleur-d-o-2.png",
          alt: {
            fr: "Aperçu de A Fleur d'Ô avec univers floral et mise en avant des bouquets",
            en: "A Fleur d'O preview with floral identity and bouquet highlights",
          },
        },
        {
          src: "assets/projects/a-fleur-d-o-3.png",
          alt: {
            fr: "Aperçu de A Fleur d'Ô avec catalogue et parcours boutique",
            en: "A Fleur d'O preview with catalog and shopping flow",
          },
        },
      ],
    },*/
    {
      context: {
        fr: "Professionnel : En cours",
        en: "Professional: In progress",
      },
      contextClassName: "badge-wip",
      title: { fr: "Valois Nettoyage", en: "Valois Cleaning" },
      description: {
        fr: "Développement d'un site web pour une entreprise de nettoyage, présentant leurs services et permettant aux clients de les contacter facilement.",
        en: "Development of a website for a cleaning company, presenting its services and helping clients get in touch easily.",
      },
      tags: ["JS", "React"],
      link: {
        href: "https://valois-nettoyage.myboostlocal.com/",
        targetBlank: true,
        label: { fr: "Voir le site", en: "View site" },
      },
      images: [
        {
          src: "assets/projects/valois-nettoyage-1.png",
          alt: {
            fr: "Aperçu de Valois Nettoyage avec présentation des services et blocs métier",
            en: "Valois Cleaning preview with services and business sections",
          },
        },
        {
          src: "assets/projects/valois-nettoyage-2.png",
          alt: {
            fr: "Aperçu de Valois Nettoyage avec présentation des services et blocs métier",
            en: "Valois Cleaning preview with services and business sections",
          },
        },
        {
          src: "assets/projects/valois-nettoyage-3.png",
          alt: {
            fr: "Aperçu de Valois Nettoyage avec présentation des services et blocs métier",
            en: "Valois Cleaning preview with services and business sections",
          },
        },
      ],
    },
    {
      context: { fr: "Personnel : En cours", en: "Personal: In progress" },
      contextClassName: "badge-wip",
      title: { fr: "World Menu", en: "World Menu" },
      description: {
        fr: "Site proposant des idées de menus et des recettes pour partir à la découverte de la culture culinaire du monde entier.",
        en: "Website offering menu ideas and recipes to explore culinary cultures from around the world.",
      },
      tags: ["JS", "React"],
      link: {
        href: "https://world-menu.vercel.app/",
        targetBlank: true,
        label: { fr: "Voir le site", en: "View site" },
      },
      images: [],
    },
    {
      context: { fr: "Personnel", en: "Personal" },
      title: { fr: "Pac-Man", en: "Pac-Man" },
      description: {
        fr: "Reproduction du jeu d'arcade Pac-Man avec gestion des fantômes, des niveaux et du score.",
        en: "Reproduction of the classic Pac-Man arcade game with ghost management, levels and score system.",
      },
      tags: ["Python", "Tkinter"],
      link: {
        href: "https://github.com/EthanS0107/pac-man",
        targetBlank: true,
        label: { fr: "Voir le code", en: "View code" },
      },
      images: [],
    },
    {
      context: { fr: "Professionnel", en: "Professional" },
      title: { fr: "MyBoostLocal", en: "MyBoostLocal" },
      description: {
        fr: "Site pour présenter les services de MyBoostLocal, mon agence de marketing digital spécialisée dans l'accompagnement des petites entreprises locales.",
        en: "Website to showcase the services of MyBoostLocal, my digital marketing agency specializing in supporting small local businesses.",
      },
      tags: ["HTML", "CSS", "JavaScript"],
      link: {
        href: "https://myboostlocal.com/",
        targetBlank: true,
        label: { fr: "Voir le site", en: "View site" },
      },
      images: [],
    },
  ],
};
