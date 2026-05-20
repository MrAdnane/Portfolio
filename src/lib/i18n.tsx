import { createContext, useContext, useState, ReactNode } from "react";

export type Lang = "en" | "fr";

export const translations = {
  en: {
    logo: "MyPortfolio",
    nav: { home: "Home", projects: "Projects", skills: "Skills", about: "About", contact: "Contact" },
    hero: {
      greeting: "Hello, I'm",
      name: "Adnane Mouloudi",
      title: "Full Stack Web Developer",
      subtitle: "Creative. Passionate. Ambitious.",
      description: "I design and develop modern, high-performance, and intuitive web applications.",
      contact: "Contact Me",
      viewProjects: "View Projects",
    },
    projects: {
      heading: "My Projects",
      viewCode: "View Project",
    },
    skills: {
      heading: "My Skills",
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
    },
    about: {
      heading: "About Me",
      text: "Passionate web developer specialized in React, Node.js, Laravel, and Python. I enjoy building modern applications with clean UI/UX and scalable backend architecture.",
      downloadCV: "Download CV",
    },
    contact: {
      heading: "Contact Me",
      name: "Name",
      email: "Email",
      message: "Message",
      placeholderName: "Your name",
      placeholderEmail: "your@email.com",
      placeholderMessage: "Your message",
      send: "Send",
      location: "Marrakech, Morocco",
    },
    footer: "© 2026 Adnane Mouloudi. All rights reserved.",
    projectsList: [
      { title: "Quote Machine", desc: "Random quote generator with dynamic styling and API integration." },
      { title: "Pomodoro Clock", desc: "Productivity timer using the Pomodoro technique." },
      { title: "JavaScript Calculator", desc: "Interactive calculator with modern UI and keyboard support." },
    ],
  },
  fr: {
    logo: "MonPortfolio",
    nav: { home: "Accueil", projects: "Projets", skills: "Compétences", about: "À propos", contact: "Contact" },
    hero: {
      greeting: "Bonjour, je suis",
      name: "Adnane Mouloudi",
      title: "Développeur Web Full Stack",
      subtitle: "Créatif. Passionné. Ambitieux.",
      description: "Je conçois et développe des applications web modernes, performantes et intuitives.",
      contact: "Me Contacter",
      viewProjects: "Voir mes projets",
    },
    projects: {
      heading: "Mes Projets",
      viewCode: "Voir le projet",
    },
    skills: {
      heading: "Mes Compétences",
      frontend: "Frontend",
      backend: "Backend",
      database: "Base de données",
      devops: "DevOps",
    },
    about: {
      heading: "À Propos de Moi",
      text: "Développeur web passionné spécialisé en React, Node.js, Laravel et Python. J'aime créer des applications modernes avec une interface intuitive et une architecture backend performante.",
      downloadCV: "Télécharger CV",
    },
    contact: {
      heading: "Me Contacter",
      name: "Nom",
      email: "Email",
      message: "Message",
      placeholderName: "Votre nom",
      placeholderEmail: "votre@email.com",
      placeholderMessage: "Votre message",
      send: "Envoyer",
      location: "Marrakech, Maroc",
    },
    footer: "© 2026 Adnane Mouloudi. Tous droits réservés.",
    projectsList: [
      { title: "Quote Machine", desc: "Générateur de citations aléatoires avec style dynamique et intégration API." },
      { title: "Pomodoro Clock", desc: "Minuteur de productivité utilisant la technique Pomodoro." },
      { title: "JavaScript Calculator", desc: "Calculatrice interactive avec interface moderne et support clavier." },
    ],
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof translations)["en"] };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}