import { useEffect, useRef } from "react";
import { useCursor } from "./hooks/useCursor";
import { useHeroTerminalTyping } from "./hooks/useHeroTerminalTyping";
import { useInteractiveTerminal } from "./hooks/useInteractiveTerminal";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useSidebar } from "./hooks/useSidebar";

function App() {
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
  const { history } = useInteractiveTerminal();
  const { lines: heroLines, activeLine, isDone } = useHeroTerminalTyping();
  const terminalBodyRef = useRef(null);

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
            <a href="#about" data-num="01">
              sobre mí
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02">
              proyectos
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03">
              skills
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04">
              contacto
            </a>
          </li>
        </ul>
        <button
          className={`hamburger ${sidebarOpen ? "active" : ""}`}
          id="hamburger"
          aria-label="menú"
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
          aria-label="cerrar menú"
          onClick={closeSidebar}
        >
          ✕
        </button>
        <a href="#hero" className="sidebar-logo" onClick={closeSidebar}>
          dev<span>bel_</span>
        </a>
        <ul className="sidebar-links">
          <li>
            <a href="#about" data-num="01" onClick={closeSidebar}>
              sobre mí
            </a>
          </li>
          <li>
            <a href="#projects" data-num="02" onClick={closeSidebar}>
              proyectos
            </a>
          </li>
          <li>
            <a href="#skills" data-num="03" onClick={closeSidebar}>
              skills
            </a>
          </li>
          <li>
            <a href="#contact" data-num="04" onClick={closeSidebar}>
              contacto
            </a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="https://github.com/endbel" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/miperfilbelenrodriguez/"
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
          <p className="hero-tag"> JUNIOR DEVELOPER — DISPONIBLE</p>
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
          <div
            className="recruiter-scan"
            aria-label="Resumen para reclutadores"
          >
            <p className="scan-title">scan rápido — perfil</p>
            <ul className="scan-list">
              <li>stack: React, JavaScript, Node.js, TypeScript, SQL</li>
              <li>foco: frontend con criterio de producto y UX</li>
              <li>
                modalidad: remoto/híbrido · UTC-3 · disponibilidad inmediata
              </li>
            </ul>
          </div>
          <div className="hero-cta">
            <a href="#projects" className="btn-primary">
              Ver proyectos
            </a>
            <a href="#contact" className="btn-outline">
              Contactar
            </a>
          </div>
        </div>
        <div className="scroll-hint">scroll</div>
      </section>

      {/* ABOUT */}
      <section id="about" ref={aboutRef}>
        <div
          className={`reveal ${aboutVisible ? "visible" : ""} ${aboutSeen ? "seen" : ""}`}
        >
          <p className="section-label">01 — sobre mí</p>
          <div className="about-snapshot">
            <p className="about-snapshot-title">perfil y habilidades clave</p>
            <div
              className="about-pills"
              aria-label="Resumen de stack y habilidades"
            >
              <span>Frontend: HTML, CSS, JavaScript, React, TypeScript</span>
              <span>
                Backend y datos: Node.js, PHP, Python, Java, MySQL, MongoDB,
                Prisma
              </span>
              <span>
                Tooling y calidad: Vite, Git/GitHub, GitHub Actions, ESLint,
                npm, Docker
              </span>
              <span>
                Fortalezas: resolución de problemas y trabajo en equipo
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
                <span className="t-title">Codigo con proposito.</span>
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
            <p className="section-label">02 — proyectos</p>
            <h2 className="section-title">
              Lo que
              <br />
              he construido.
            </h2>
          </div>
        </div>

        <div
          className={`project-grid reveal ${projectsVisible ? "visible" : ""}`}
        >
          <div className="project-card">
            <p className="project-num">// 001</p>
            <h3 className="project-title">App del Clima</h3>
            <p className="project-desc">
              Aplicación web que consulta una API pública para mostrar el clima
              actual según la ciudad ingresada. Trabajé con fetch, manejo de
              JSON y diseño responsive.
            </p>
            <p className="project-impact">
              Impacto: reduje el tiempo de consulta percibido con feedback
              visual de carga y validaciones en tiempo real.
            </p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">API REST</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/endbel/mi-proyecto-clima"
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
            <h3 className="project-title">Conversor de Monedas</h3>
            <p className="project-desc">
              Aplicación de consola en Java que convierte entre distintas
              monedas. Consolidé el uso de programación orientada a objetos,
              estructuras de control y manejo de entrada/salida.
            </p>
            <p className="project-impact">
              Impacto: mejoré la mantenibilidad separando lógica de conversión y
              validación de entrada en componentes reutilizables.
            </p>
            <div className="project-tags">
              <span className="tag">Java</span>
              <span className="tag">POO</span>
              <span className="tag">CLI</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/endbel/ConversorDeMonedasJava"
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
            <h3 className="project-title">Voz Ciudadana</h3>
            <p className="project-desc">
              Plataforma full stack desarrollada en equipo que permite a
              ciudadanos reportar y visualizar problemas urbanos. Participé en
              frontend y backend con React, TypeScript y Node.js bajo
              metodología ágil.
            </p>
            <p className="project-impact">
              Impacto: entregas iterativas en sprint con mejoras funcionales
              semanales y reducción de issues de integración entre frontend y
              backend.
            </p>
            <div className="project-tags">
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Node.js</span>
              <span className="tag">Vite</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/endbel/vozCiudadana"
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
            <h3 className="project-title">ToDos App</h3>
            <p className="project-desc">
              App de gestión de tareas desarrollada en equipo para la UTN.
              Incluye registro de usuarios, prioridades, categorías, filtros y
              diseño mobile-first. Participé en frontend y backend.
            </p>
            <p className="project-impact">
              Impacto: organicé el flujo de tareas por prioridades y categorías,
              mejorando la velocidad de uso en pruebas funcionales.
            </p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
              <span className="tag">PHP</span>
              <span className="tag">MySQL</span>
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
            <h3 className="project-title">Demo Clínica</h3>
            <p className="project-desc">
              Sistema de gestión clínica desarrollado en equipo. Incluye
              autenticación, dashboard, gestión de pacientes y turnos. Participé
              en el frontend y base de datos con Next.js, Prisma y TypeScript.
            </p>
            <p className="project-impact">
              Impacto: optimicé flujos administrativos clave y colaboré en un
              esquema de datos más claro para turnos y pacientes.
            </p>
            <div className="project-tags">
              <span className="tag">Next.js</span>
              <span className="tag">React</span>
              <span className="tag">TypeScript</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Prisma</span>
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
            <h3 className="project-title">CICI App</h3>
            <p className="project-desc">
              Plataforma de gestión para academia de inglés desarrollada en
              equipo. Administra alumnos, clases y profesores. Participé en
              frontend y backend con contenedorización mediante Docker.
            </p>
            <p className="project-impact">
              Impacto: estandaricé el entorno de desarrollo con contenedores
              para acelerar onboarding técnico del equipo.
            </p>
            <div className="project-tags">
              <span className="tag">JavaScript</span>
              <span className="tag">HTML/CSS</span>
              <span className="tag">Tailwind</span>
              <span className="tag">Prisma</span>
              <span className="tag">Docker</span>
            </div>
            <div className="project-links">
              <a
                href="https://github.com/endbel/cici-app"
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
            <p className="section-label">03 — habilidades</p>
            <h2 className="section-title">Mi stack.</h2>
            <p className="skills-context">
              Tooling del proyecto: Vite + React + ESLint, con flujo de
              integración/despliegue usando GitHub Actions.
            </p>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-react-original"></i>
                  React
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-nodejs-plain"></i>
                  Node.js
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-php-plain"></i>
                  PHP
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-python-plain"></i>
                  Python
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-java-plain"></i>
                  Java
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-mysql-plain"></i>
                  MySQL
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-git-plain"></i>
                  Git
                </span>
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="50"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-vitejs-plain"></i>
                  Vite
                </span>
                <span className="skill-bar-level">intermedio</span>
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
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-prisma-original"></i>
                  Prisma
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-mongodb-plain"></i>
                  MongoDB
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="35"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-eslint-original"></i>
                  ESLint
                </span>
                <span className="skill-bar-level">intermedio</span>
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
                  APIs
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="50"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-docker-plain"></i>
                  Docker
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="30"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i className="devicon-bash-plain"></i>
                  Bash
                </span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="30"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">
                  <i
                    className="fa-solid fa-comments"
                    style={{ color: "var(--accent)" }}
                  ></i>
                  Inglés
                </span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="55"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" ref={contactRef}>
        <div className={`reveal ${contactVisible ? "visible" : ""}`}>
          <p className="section-label">04 — contacto</p>
          <h2 className="contact-big">
            ¿Trabajamos
            <br />
            <span className="accent">juntos?</span>
          </h2>
          <p className="contact-sub">
            Abierta a oportunidades, proyectos freelance y colaboraciones.
          </p>
          <div className="availability-box" aria-label="Disponibilidad laboral">
            <p className="availability-title">disponibilidad</p>
            <ul className="availability-list">
              <li>Inicio: inmediata</li>
              <li>Modalidad: remoto o híbrido</li>
              <li>Franja horaria: UTC-3 con superposición LATAM y Europa</li>
              <li>Rol objetivo: frontend trainee/junior o full stack junior</li>
            </ul>
          </div>
          <div className="contact-links">
            <a href="mailto:tu@email.com" className="btn-primary">
              ✉ enviar email
            </a>
            <a
              href="https://github.com/endbel"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              ⌥ GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/miperfilbelenrodriguez/"
              target="_blank"
              rel="noreferrer"
              className="btn-outline"
            >
              in LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2024 <span className="accent">Belén</span> ·{" "}
          <span className="accent">endbel</span> — diseñado y desarrollado
        </p>
        <p>
          hecho con <span className="accent">♥</span> y mucho mate
        </p>
      </footer>
    </>
  );
}

export default App;
