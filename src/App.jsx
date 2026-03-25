import { useEffect, useRef, useState } from "react";
import { useCursor } from "./hooks/useCursor";
import { useHeroTerminalTyping } from "./hooks/useHeroTerminalTyping";
import { useInteractiveTerminal } from "./hooks/useInteractiveTerminal";
import { useResponsiveViewport } from "./hooks/useResponsiveViewport";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useSidebar } from "./hooks/useSidebar";

function App() {
  useResponsiveViewport();

  const profilePhoto =
    "https://avatars.githubusercontent.com/devbelen?size=512";

  const { cursorRef, ringRef, handleHoverEnter, handleHoverLeave } =
    useCursor();
  const { isOpen: sidebarOpen, openSidebar, closeSidebar } = useSidebar();
  const {
    ref: aboutRef,
    isVisible: aboutVisible,
    hasBeenVisible: aboutSeen,
  } = useRevealOnScroll(0.15, { once: false });
  const { ref: projectsRef, isVisible: projectsVisible } =
    useRevealOnScroll(0.15);
  const { ref: skillsRef, isVisible: skillsVisible } = useRevealOnScroll(0.15);
  const { ref: contactRef, isVisible: contactVisible } =
    useRevealOnScroll(0.15);
  const terminalBodyRef = useRef(null);
  const [photoUnlocked, setPhotoUnlocked] = useState(false);
  const [scrollHintOpacity, setScrollHintOpacity] = useState(1);
  const [language, setLanguage] = useState("es");
  const [isAboutTerminalActive, setIsAboutTerminalActive] = useState(false);

  const t = {
    es: {
      nav: {
        hero: "junior developer",
        about: "sobre mí",
        projects: "proyectos",
        skills: "skills",
        contact: "contacto",
        menu: "menú",
        closeMenu: "cerrar menú",
      },
      hero: {
        recruiterSummary: "Resumen para reclutadores",
        stackLine: "react · next.js · typescript · node.js · prisma · sql",
        line2: "full stack junior · foco en negocio · API REST",
        line3: "remoto inmediato · UTC-3 · soporte + desarrollo",
        projectsCta: "PROYECTOS",
        contactCta: "Contactar",
        scroll: "scroll",
      },
      about: {
        sectionLabel: "01 sobre mí",
        snapshotTitle: "perfil full stack con enfoque en impacto",
        pillsAria: "Resumen de stack y habilidades",
        terminalTitle: "Codigo con proposito.",
        hidePhoto: "Ocultar foto de perfil",
        revealPhoto: "Revelar foto de perfil",
        photoAlt: "Foto de perfil de Belén",
        lockHint: "click para bloquear",
        revealHint: "click para revelar",
      },
      projects: {
        sectionLabel: "02 proyectos",
        titleLine1: "Lo que",
        titleLine2: "he construido.",
        solo: "proyecto individual",
        team: "proyecto en equipo",
        problem: "problema",
        role: "mi rol",
        impact: "impacto",
      },
      skills: {
        sectionLabel: "03 habilidades",
        title: "Stack principal y capacidades.",
        intermediate: "intermedio alto",
        basic: "intermedio",
        english: "Inglés (B2)",
      },
      contact: {
        sectionLabel: "04 contacto",
        heading1: "¿Trabajamos",
        heading2: "juntos?",
        availabilityAria: "Disponibilidad laboral",
        availabilityTitle: "disponibilidad",
        item1: "Inicio inmediato",
        item2: "Modalidad remota",
        item3: "UTC-3 con superposición global",
        item4: "Rol objetivo: full stack junior",
        sendEmail: "✉ enviar email",
      },
      footer: {
        line1: "diseñado y desarrollado",
        line2: "hecho con",
        line3: "y mucho mate",
      },
    },
    en: {
      nav: {
        hero: "junior developer",
        about: "about me",
        projects: "projects",
        skills: "skills",
        contact: "contact",
        menu: "menu",
        closeMenu: "close menu",
      },
      hero: {
        recruiterSummary: "Recruiter summary",
        stackLine: "react · next.js · typescript · node.js · prisma · sql",
        line2: "junior full stack · business focus · REST API",
        line3: "remote now · UTC-3 · support + development",
        projectsCta: "PROJECTS",
        contactCta: "Contact",
        scroll: "scroll",
      },
      about: {
        sectionLabel: "01 about me",
        snapshotTitle: "full stack profile focused on impact",
        pillsAria: "Stack and skills summary",
        terminalTitle: "Code with purpose.",
        hidePhoto: "Hide profile photo",
        revealPhoto: "Reveal profile photo",
        photoAlt: "Belén profile photo",
        lockHint: "click to lock",
        revealHint: "click to reveal",
      },
      projects: {
        sectionLabel: "02 projects",
        titleLine1: "What",
        titleLine2: "I've built.",
        solo: "solo project",
        team: "team project",
        problem: "problem",
        role: "my role",
        impact: "impact",
      },
      skills: {
        sectionLabel: "03 skills",
        title: "Core stack and capabilities.",
        intermediate: "upper intermediate",
        basic: "intermediate",
        english: "English (B2)",
      },
      contact: {
        sectionLabel: "04 contact",
        heading1: "Shall we",
        heading2: "work together?",
        availabilityAria: "Work availability",
        availabilityTitle: "availability",
        item1: "Immediate start",
        item2: "Remote mode",
        item3: "UTC-3 with global overlap",
        item4: "Target role: junior full stack",
        sendEmail: "✉ send email",
      },
      footer: {
        line1: "designed and developed",
        line2: "made with",
        line3: "and lots of mate",
      },
    },
  }[language];

  const shouldStartAboutTerminal = isAboutTerminalActive || aboutVisible;
  const { history } = useInteractiveTerminal(
    language,
    shouldStartAboutTerminal,
  );
  const {
    lines: heroLines,
    activeLine,
    isDone,
  } = useHeroTerminalTyping(language);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "es" ? "en" : "es"));
  };

  const handleAboutNavClick = () => {
    setIsAboutTerminalActive(true);
  };

  const handleSidebarAboutNavClick = () => {
    setIsAboutTerminalActive(true);
    closeSidebar();
  };

  useEffect(() => {
    const links = document.querySelectorAll("a, button");
    links.forEach((link) => {
      link.addEventListener("mouseenter", handleHoverEnter);
      link.addEventListener("mouseleave", handleHoverLeave);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleHoverEnter);
        link.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, [handleHoverEnter, handleHoverLeave]);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const updateScrollHintOpacity = () => {
      if (!contactRef.current) return;

      const rect = contactRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 1;

      // Starts fading when contacto reaches the bottom edge, then fades out progressively.
      const fadeStart = viewportHeight;
      const fadeEnd = viewportHeight * 0.35;
      const progress = (fadeStart - rect.top) / (fadeStart - fadeEnd);
      const clamped = Math.min(Math.max(progress, 0), 1);

      setScrollHintOpacity(1 - clamped);
    };

    updateScrollHintOpacity();
    window.addEventListener("scroll", updateScrollHintOpacity, {
      passive: true,
    });
    window.addEventListener("resize", updateScrollHintOpacity);

    return () => {
      window.removeEventListener("scroll", updateScrollHintOpacity);
      window.removeEventListener("resize", updateScrollHintOpacity);
    };
  }, [contactRef]);

  return (
    <>
      <div ref={cursorRef} className="cursor"></div>
      <div ref={ringRef} className="cursor-ring"></div>

      {/* NAV */}
      <nav>
        <a href="#hero" className="logo">
          dev<span>bel_</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#hero" data-num="00">
              {t.nav.hero}
            </a>
          </li>
          <li>
            <a href="#about" data-num="01" onClick={handleAboutNavClick}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02">
              {t.nav.projects}
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03">
              {t.nav.skills}
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04">
              {t.nav.contact}
            </a>
          </li>
          <li className="nav-lang-item">
            <button
              type="button"
              className="lang-switch"
              onClick={toggleLanguage}
              aria-label={
                language === "es" ? "Switch to English" : "Cambiar a español"
              }
            >
              <span
                className={`lang-chip ${language === "es" ? "active" : ""}`}
              >
                ES
              </span>
              <span
                className={`lang-chip ${language === "en" ? "active" : ""}`}
              >
                EN
              </span>
            </button>
          </li>
        </ul>
        <button
          className={`hamburger ${sidebarOpen ? "active" : ""}`}
          id="hamburger"
          aria-label={t.nav.menu}
          onClick={openSidebar}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* SIDEBAR */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? "active" : ""}`}
        id="sidebarOverlay"
        onClick={closeSidebar}
      ></div>
      <aside className={`sidebar ${sidebarOpen ? "active" : ""}`} id="sidebar">
        <button
          className="sidebar-close"
          id="sidebarClose"
          aria-label={t.nav.closeMenu}
          onClick={closeSidebar}
        >
          ✕
        </button>
        <a href="#hero" className="sidebar-logo" onClick={closeSidebar}>
          dev<span>bel_</span>
        </a>
        <ul className="sidebar-links">
          <li>
            <a href="#hero" data-num="00" onClick={closeSidebar}>
              {t.nav.hero}
            </a>
          </li>
          <li>
            <a href="#about" data-num="01" onClick={handleSidebarAboutNavClick}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02" onClick={closeSidebar}>
              {t.nav.projects}
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03" onClick={closeSidebar}>
              {t.nav.skills}
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04" onClick={closeSidebar}>
              {t.nav.contact}
            </a>
          </li>
        </ul>
        <div className="sidebar-lang-switch-wrap">
          <button
            type="button"
            className="lang-switch"
            onClick={toggleLanguage}
            aria-label={
              language === "es" ? "Switch to English" : "Cambiar a español"
            }
          >
            <span className={`lang-chip ${language === "es" ? "active" : ""}`}>
              ES
            </span>
            <span className={`lang-chip ${language === "en" ? "active" : ""}`}>
              EN
            </span>
          </button>
        </div>
        <div className="sidebar-footer">
          <a
            href="https://github.com/devbelen"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/devbelen/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </aside>

      {/* HERO */}
      <section id="hero">
        <div className="glow-blob"></div>
        <div className="hero-inner">
          <p className="hero-tag"> 00 JUNIOR DEVELOPER</p>
          <h1 className="hero-name">
            <span className="hero-line">
              {heroLines[0]}
              {activeLine === 0 && <span className="hero-cursor"></span>}
            </span>
            <span className="hero-line">
              {heroLines[1].slice(0, 4)}
              <span style={{ color: "var(--accent)" }}>
                {heroLines[1].slice(4)}
              </span>
              {activeLine === 1 && <span className="hero-cursor"></span>}
            </span>
            <span className="hero-line line2">
              {heroLines[2]}
              {activeLine === 2 && (
                <span className="hero-cursor hero-cursor-outline"></span>
              )}
              {isDone && (
                <span className="hero-cursor hero-cursor-outline hero-cursor-final"></span>
              )}
            </span>
          </h1>
          <div className="hero-actions">
            <div
              className="recruiter-scan"
              aria-label={t.hero.recruiterSummary}
            >
              <div className="scan-shell">
                <ul className="scan-list">
                  <li className="scan-stack">{t.hero.stackLine}</li>
                  <li>{t.hero.line2}</li>
                  <li>{t.hero.line3}</li>
                </ul>
                <a
                  href="#projects"
                  className="scan-availability is-project-link"
                >
                  {t.hero.projectsCta}
                </a>
              </div>
            </div>
            <div className="hero-cta">
              <a href="mailto:devbel_@outlook.com" className="btn-outline">
                {t.hero.contactCta}
              </a>
              <div className="hero-social">
                <a
                  href="https://github.com/devbelen"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                >
                  GitHub
                </a>
                <span className="social-separator">·</span>
                <a
                  href="https://www.linkedin.com/in/devbelen/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-hint" style={{ opacity: scrollHintOpacity }}>
          {t.hero.scroll}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef}>
        <div
          className={`reveal ${aboutVisible ? "visible" : ""} ${aboutSeen ? "seen" : ""}`}
        >
          <p className="section-label">{t.about.sectionLabel}</p>
          <div className="about-snapshot">
            <p className="about-snapshot-title">{t.about.snapshotTitle}</p>
            <div className="about-pills" aria-label={t.about.pillsAria}>
              <span>
                {language === "es"
                  ? "Soporte técnico: diagnóstico, resolución y seguimiento de incidentes"
                  : "Technical support: diagnosis, resolution, and incident follow-up"}
              </span>
              <span>
                {language === "es"
                  ? "Comunicación efectiva con clientes y equipos técnicos"
                  : "Effective communication with customers and technical teams"}
              </span>
              <span>
                {language === "es"
                  ? "Trabajo colaborativo en entornos dinámicos y orientados a servicio"
                  : "Collaborative work in dynamic, service-oriented environments"}
              </span>
              <span>Tooling: Vite, npm, ESLint, Git, GitHub Actions</span>
              <span>
                {language === "es"
                  ? "Gestión de tickets, documentación y trazabilidad de casos"
                  : "Ticket management, documentation, and case traceability"}
              </span>
              <span>
                {language === "es"
                  ? "Atención multicanal y enfoque en experiencia de usuario"
                  : "Multi-channel support and user experience focus"}
              </span>
              <span>
                {language === "es"
                  ? "Resolución de problemas con enfoque analítico y proactivo"
                  : "Problem solving with an analytical and proactive approach"}
              </span>
              <span>
                {language === "es"
                  ? "Stack principal: React, Next.js, TypeScript, Node.js, Prisma y SQL"
                  : "Core stack: React, Next.js, TypeScript, Node.js, Prisma, and SQL"}
              </span>
              <span>
                {language === "es"
                  ? "Organización, priorización y gestión del tiempo"
                  : "Organization, prioritization, and time management"}
              </span>
            </div>
          </div>
          <div className="about-visual">
            <div className="terminal">
              <div className="terminal-bar">
                <span
                  className="t-dot"
                  style={{ background: "#ff5f57" }}
                ></span>
                <span
                  className="t-dot"
                  style={{ background: "#febc2e" }}
                ></span>
                <span
                  className="t-dot"
                  style={{ background: "#28c840" }}
                ></span>
                <span className="t-title">{t.about.terminalTitle}</span>
              </div>
              <div
                className="terminal-body terminal-body-static"
                ref={terminalBodyRef}
              >
                {history.map((line, idx) => (
                  <span className="t-line" key={`${line.type}-${idx}`}>
                    <span
                      className={
                        line.type === "val"
                          ? "t-val"
                          : line.type === "cmd"
                            ? "t-cmd"
                            : "t-out"
                      }
                    >
                      {line.text}
                    </span>
                    {idx === history.length - 1 && (
                      <span className="t-cursor"></span>
                    )}
                  </span>
                ))}
              </div>
            </div>
            <div className="about-profile-slot">
              <button
                type="button"
                className={`about-profile-lock ${photoUnlocked ? "unlocked" : "locked"}`}
                onClick={() => setPhotoUnlocked((prev) => !prev)}
                aria-pressed={photoUnlocked}
                aria-label={
                  photoUnlocked ? t.about.hidePhoto : t.about.revealPhoto
                }
              >
                <img
                  src={profilePhoto}
                  alt={t.about.photoAlt}
                  className="about-profile-photo"
                />
                <span className="about-profile-overlay" aria-hidden="true">
                  {photoUnlocked ? t.about.lockHint : t.about.revealHint}
                </span>
              </button>
            </div>
            <div className="accent-corner"></div>
            <div className="accent-corner2"></div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" ref={projectsRef}>
        <div
          className={`projects-header reveal ${projectsVisible ? "visible" : ""}`}
        >
          <div>
            <p className="section-label">{t.projects.sectionLabel}</p>
            <h2 className="section-title">
              {t.projects.titleLine1}
              <br />
              {t.projects.titleLine2}
            </h2>
          </div>
        </div>

        <div
          className={`project-grid reveal ${projectsVisible ? "visible" : ""}`}
        >
          <div className="project-card">
            <p className="project-num">// 001</p>
            <div className="project-headline">
              <h3 className="project-title">App del Clima</h3>
              <span className="project-role-badge">{t.projects.solo}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Aplicación web que consulta una API pública y devuelve el clima por ciudad con UX clara y feedback inmediato."
                : "Web app that queries a public API and returns city weather with clear UX and immediate feedback."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Las consultas sin feedback daban sensación de lentitud e incertidumbre al usuario."
                    : "Queries without feedback felt slow and created user uncertainty."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Implementé integración con API REST, validaciones y una interfaz responsive para agilizar consultas climáticas."
                    : "I implemented REST API integration, validations, and a responsive interface to streamline weather lookups."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Aumenté la confianza de uso al hacer más predecible cada consulta y reducir la fricción en la interacción."
                    : "I increased user confidence by making each lookup more predictable and reducing interaction friction."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">API REST</span>
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/mi-proyecto-clima"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 002</p>
            <div className="project-headline">
              <h3 className="project-title">Conversor de Monedas</h3>
              <span className="project-role-badge">{t.projects.solo}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Aplicación de consola en Java para convertir monedas con arquitectura modular orientada a mantenibilidad."
                : "Java console app for currency conversion with a modular architecture focused on maintainability."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "El cálculo y la validación estaban acoplados, dificultando mantenimiento y extensión."
                    : "Calculation and validation were coupled, making maintenance and extension harder."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Diseñé una arquitectura modular con POO, separando conversión, entrada/salida y validaciones para facilitar escalado."
                    : "I designed a modular OOP architecture, separating conversion, input/output, and validations to support scaling."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Reduje el costo de mantenimiento y aceleré nuevas incorporaciones gracias a una base modular más escalable."
                    : "I reduced maintenance cost and sped up new additions through a more scalable modular foundation."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">Java</span>
              <span className="tag">POO</span>
              <span className="tag">CLI</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/ConversorDeMonedasJava"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 003</p>
            <div className="project-headline">
              <h3 className="project-title">Voz Ciudadana</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Plataforma full stack para reportar y visualizar problemas urbanos con entregas funcionales por sprint."
                : "Full stack platform to report and visualize urban issues with functional sprint-based deliveries."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Había fricción entre integración frontend/backend y tiempos de entrega inconsistentes."
                    : "There was friction between frontend/backend integration and inconsistent delivery times."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Desarrollé funcionalidades en frontend y backend con React, TypeScript y Node.js para sostener entregas por sprint."
                    : "I developed frontend and backend features with React, TypeScript, and Node.js to sustain sprint deliveries."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Reducimos tiempos de integración y sostuvimos releases semanales con mejoras funcionales continuas."
                    : "We reduced integration time and sustained weekly releases with continuous functional improvements."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Node.js</span>
              <span className="tag">Vite</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/vozCiudadana"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 004</p>
            <div className="project-headline">
              <h3 className="project-title">ToDos App</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "App de gestión de tareas para UTN con prioridades, categorías y filtros para mejorar ejecución diaria."
                : "Task management app for UTN with priorities, categories, and filters to improve day-to-day execution."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "El flujo de tareas no priorizaba acciones y afectaba la velocidad de uso."
                    : "The task flow did not prioritize actions and reduced usage speed."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Implementé en frontend y backend filtros, categorías y prioridades para ordenar la ejecución de tareas."
                    : "I implemented frontend and backend filters, categories, and priorities to organize task execution."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Mejoré la ejecución diaria de tareas al priorizar acciones y reducir pasos innecesarios en el flujo."
                    : "I improved daily task execution by prioritizing actions and reducing unnecessary flow steps."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">PHP</span>
              <span className="tag">SQL (MySQL)</span>
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/DDarioBenitez/ToDos_app"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 005</p>
            <div className="project-headline">
              <h3 className="project-title">Demo Clínica</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Sistema de gestión clínica con autenticación, dashboard y módulos de pacientes/turnos para operación diaria."
                : "Clinical management system with authentication, dashboard, and patient/appointment modules for daily operations."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Los flujos administrativos eran lentos y el modelo de datos no era suficientemente claro."
                    : "Administrative flows were slow and the data model lacked clarity."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Implementé frontend y modelo de datos con Next.js, TypeScript y Prisma para flujos clínicos más consistentes."
                    : "I implemented frontend and data modeling with Next.js, TypeScript, and Prisma for more consistent clinical workflows."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Optimicé procesos administrativos críticos y mejoré la trazabilidad de turnos/pacientes para la operación diaria."
                    : "I optimized critical administrative workflows and improved appointments/patients traceability for daily operations."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">Next.js</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Prisma</span>
              <span className="tag">Tailwind</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/reedq1/demo-clinica"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>

          <div className="project-card">
            <p className="project-num">// 006</p>
            <div className="project-headline">
              <h3 className="project-title">CICI App</h3>
              <span className="project-role-badge">{t.projects.team}</span>
            </div>
            <p className="project-pitch">
              {language === "es"
                ? "Plataforma de gestión para academia de inglés con administración de alumnos, clases y docentes."
                : "Management platform for an English academy with students, classes, and teachers administration."}
            </p>
            <div className="project-breakdown">
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.problem}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "El onboarding técnico era lento por diferencias de entorno entre integrantes."
                    : "Technical onboarding was slow due to environment differences across team members."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.role}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Desarrollé módulos en frontend y backend y apliqué Docker para un entorno reproducible entre integrantes."
                    : "I developed frontend and backend modules and applied Docker for a reproducible environment across team members."}
                </p>
              </article>
              <article className="breakdown-item">
                <p className="breakdown-label">{t.projects.impact}</p>
                <p className="breakdown-text">
                  {language === "es"
                    ? "Estandaricé el entorno técnico, reduje bloqueos de setup y aceleré la productividad inicial del equipo."
                    : "I standardized the technical environment, reduced setup blockers, and accelerated initial team productivity."}
                </p>
              </article>
            </div>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">Prisma</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Docker</span>
              <span className="tag">HTML/CSS</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/devbelen/cici-app"
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                ⌥ github
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" ref={skillsRef}>
        <div className="skills-inner">
          <div className={`reveal ${skillsVisible ? "visible" : ""}`}>
            <p className="section-label">{t.skills.sectionLabel}</p>
            <h2 className="section-title">{t.skills.title}</h2>
          </div>

          <div
            className={`skills-categories reveal ${skillsVisible ? "visible" : ""}`}
          >
            <article className="skills-category-card">
              <p className="skills-category-title">
                {language === "es" ? "Stack principal" : "Core stack"}
              </p>
              <p className="skills-category-items">
                React, Next.js, TypeScript, Node.js, Prisma, SQL
              </p>
            </article>
            <article className="skills-category-card">
              <p className="skills-category-title">
                {language === "es" ? "Frontend y APIs" : "Frontend and APIs"}
              </p>
              <p className="skills-category-items">
                JavaScript, HTML5/CSS3, Tailwind CSS, REST API
              </p>
            </article>
            <article className="skills-category-card">
              <p className="skills-category-title">
                {language === "es"
                  ? "Lenguajes y Backend"
                  : "Languages and Backend"}
              </p>
              <p className="skills-category-items">
                Java, Python, PHP, MongoDB
              </p>
            </article>
            <article className="skills-category-card">
              <p className="skills-category-title">
                {language === "es"
                  ? "Toolchain de entrega"
                  : "Delivery toolchain"}
              </p>
              <p className="skills-category-items">
                Git, GitHub, Vite, npm, ESLint, GitHub Actions, Docker
              </p>
            </article>
            <article className="skills-category-card">
              <p className="skills-category-title">
                {language === "es"
                  ? "Soporte y Soft Skills"
                  : "Support & Soft Skills"}
              </p>
              <p className="skills-category-items">
                {language === "es"
                  ? "Inglés B2, comunicación, gestión de tickets, trabajo en equipo, empatía, resolución de incidentes"
                  : "English B2, communication, ticket management, teamwork, empathy, incident resolution"}
              </p>
            </article>
          </div>

          <div
            className={`skills-row reveal ${skillsVisible ? "visible" : ""}`}
          >
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-html5-plain"></i>
                  HTML
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="75"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-css3-plain"></i>
                  CSS
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="70"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-javascript-plain"></i>
                  JavaScript
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="65"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-typescript-plain"></i>
                  TypeScript
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="62"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-react-original"></i>
                  React
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="66"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-nextjs-plain devicon-nextjs-original"></i>
                  Next.js
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="61"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-tailwindcss-original"></i>
                  Tailwind CSS
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="57"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-nodejs-plain"></i>
                  Node.js
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="61"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-php-plain"></i>
                  PHP
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="52"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-python-plain"></i>
                  Python
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="56"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-java-plain"></i>
                  Java
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="52"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-mysql-plain"></i>
                  SQL (MySQL)
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="62"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-git-plain"></i>
                  Git
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-github-original"></i>
                  GitHub
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-npm-original-wordmark"></i>
                  npm
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-vitejs-plain"></i>
                  Vite
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="65"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-githubactions-plain"></i>
                  GitHub Actions
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="54"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-prisma-original"></i>
                  Prisma
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-mongodb-plain"></i>
                  MongoDB
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="52"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-eslint-plain devicon-eslint-original"></i>
                  ESLint
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i
                    className="fa-solid fa-plug"
                    style={{ color: "var(--accent)" }}
                  ></i>
                  REST API
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-docker-plain"></i>
                  Docker
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="62"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-bash-plain"></i>
                  Bash
                </span>
                <span className="skill-bar-level">{t.skills.basic}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="48"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i
                    className="fa-solid fa-comments"
                    style={{ color: "var(--accent)" }}
                  ></i>
                  {t.skills.english}
                </span>
                <span className="skill-bar-level">{t.skills.intermediate}</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="70"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef}>
        <div className={`reveal ${contactVisible ? "visible" : ""}`}>
          <p className="section-label">{t.contact.sectionLabel}</p>
          <h2 className="contact-big">
            {t.contact.heading1}
            <br />
            <span className="accent">{t.contact.heading2}</span>
          </h2>
          <div
            className="availability-box"
            aria-label={t.contact.availabilityAria}
          >
            <div className="availability-layout">
              <div className="availability-main">
                <p className="availability-title">
                  {t.contact.availabilityTitle}
                </p>
                <ul className="availability-list">
                  <li>{t.contact.item1}</li>
                  <li>{t.contact.item2}</li>
                  <li>{t.contact.item3}</li>
                  <li>{t.contact.item4}</li>
                  <li>
                    {language === "es"
                      ? "Diferencial: soporte técnico + desarrollo"
                      : "Differential: technical support + development"}
                  </li>
                </ul>
              </div>
              <div className="availability-actions">
                <div className="contact-links">
                  <a
                    href="mailto:devbel_@outlook.com"
                    className="btn-primary contact-email-btn"
                  >
                    {t.contact.sendEmail}
                  </a>
                  <a
                    href="https://github.com/devbelen"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/devbelen/"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-outline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2024 <span className="accent">Belén</span> ·{" "}
          <span className="accent">devbelen</span> — {t.footer.line1}
        </p>
        <p>
          {t.footer.line2} <span className="accent">♥</span> {t.footer.line3}
        </p>
      </footer>
    </>
  );
}

export default App;
