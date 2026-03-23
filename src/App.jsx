import { useEffect, useRef } from 'react';
import { useCursor } from './hooks/useCursor';
import { useSidebar } from './hooks/useSidebar';

function App() {
  const { cursorRef, ringRef, handleHoverEnter, handleHoverLeave } = useCursor();
  const { isOpen: sidebarOpen, openSidebar, closeSidebar } = useSidebar();

  useEffect(() => {
    const links = document.querySelectorAll('a, button');
    links.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverEnter);
      el.addEventListener('mouseleave', handleHoverLeave);
      el.addEventListener('click', closeSidebar);
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            // Trigger skill bars
            e.target.querySelectorAll('.skill-bar-fill').forEach((bar) => {
              bar.style.width = bar.dataset.width + '%';
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    reveals.forEach((r) => observer.observe(r));

    return () => {
      links.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverEnter);
        el.removeEventListener('mouseleave', handleHoverLeave);
        el.removeEventListener('click', closeSidebar);
      });
      reveals.forEach((r) => observer.unobserve(r));
    };
  }, [handleHoverEnter, handleHoverLeave, closeSidebar]);

  return (
    <>
      {/* Custom cursor */}
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-ring" ref={ringRef}></div>

      {/* NAV */}
      <nav>
        <a href="#hero" className="logo">
          endbel<span>.dev</span>
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
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="glow-blob"></div>
        <div className="hero-inner">
          <p className="hero-tag">Desarrollador Junior — disponible</p>
          <h1 className="hero-name">
            Hola,<br />
            soy <span style={{ color: 'var(--accent)' }}>Endbel</span>
            <br />
            <span className="line2">Developer.</span>
          </h1>
          <p className="hero-desc">
            Construyo experiencias web funcionales y elegantes. Apasionado por el código limpio, los proyectos de impacto y el aprendizaje
            continuo.
          </p>
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
      <section id="about">
        <div className="reveal">
          <p className="section-label">01 — sobre mí</p>
          <h2 className="section-title">
            Código con<br />
            propósito.
          </h2>
          <div className="about-text">
            <p>
              Soy un desarrollador junior con base en <strong>HTML, CSS, JavaScript, Node.js, React y Python</strong>. Me enfoco en construir
              proyectos reales que resuelvan problemas reales.
            </p>
            <p>
              Me interesa especialmente el desarrollo <strong>full-stack</strong> y los proyectos de alto impacto. Actualmente construyendo mi
              portfolio y sumando proyectos que demuestren mis capacidades.
            </p>
          </div>
          <div className="stack-grid">
            <div className="stack-item">
              <span className="stack-icon">🌐</span>
              <span className="stack-name">HTML/CSS/JS</span>
            </div>
            <div className="stack-item">
              <span className="stack-icon">⚛️</span>
              <span className="stack-name">React</span>
            </div>
            <div className="stack-item">
              <span className="stack-icon">🟢</span>
              <span className="stack-name">Node.js</span>
            </div>
            <div className="stack-item">
              <span className="stack-icon">🐍</span>
              <span className="stack-name">Python</span>
            </div>
            <div className="stack-item">
              <span className="stack-icon">🗄️</span>
              <span className="stack-name">Git/GitHub</span>
            </div>
            <div className="stack-item">
              <span className="stack-icon">📦</span>
              <span className="stack-name">npm/APIs</span>
            </div>
          </div>
        </div>
        <div className="about-visual reveal">
          <div className="avatar-frame">
            <div className="avatar-placeholder">
              <span className="avatar-icon">👤</span>
              <span>tu foto aquí</span>
            </div>
          </div>
          <div className="accent-corner"></div>
          <div className="accent-corner2"></div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="projects-header reveal">
          <div>
            <p className="section-label">02 — proyectos</p>
            <h2 className="section-title">
              Lo que<br />
              he construido.
            </h2>
          </div>
        </div>

        <div className="project-grid reveal">
          {/* Proyecto 1 — reemplazar con tu proyecto real */}
          <div className="project-card">
            <p className="project-num">// 001</p>
            <h3 className="project-title">Proyecto 1</h3>
            <p className="project-desc">
              Descripción breve de tu proyecto. Qué problema resuelve, qué aprendiste construyéndolo y cuál fue el mayor desafío.
            </p>
            <div className="project-tags">
              <span className="tag">HTML</span>
              <span className="tag">CSS</span>
              <span className="tag">JavaScript</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                ↗ demo en vivo
              </a>
              <a href="#" className="project-link">
                ⌥ github
              </a>
            </div>
          </div>

          {/* Proyecto 2 — reemplazar con tu proyecto real */}
          <div className="project-card">
            <p className="project-num">// 002</p>
            <h3 className="project-title">Proyecto 2</h3>
            <p className="project-desc">
              Descripción breve de tu proyecto. Qué problema resuelve, qué aprendiste construyéndolo y cuál fue el mayor desafío.
            </p>
            <div className="project-tags">
              <span className="tag">Node.js</span>
              <span className="tag">Express</span>
              <span className="tag">API REST</span>
            </div>
            <div className="project-links">
              <a href="#" className="project-link">
                ↗ demo en vivo
              </a>
              <a href="#" className="project-link">
                ⌥ github
              </a>
            </div>
          </div>

          {/* Slots para proyectos futuros */}
          <div className="project-card empty">
            <div className="empty-text">
              próximo proyecto<br />
              en construcción
            </div>
          </div>

          <div className="project-card empty">
            <div className="empty-text">
              próximo proyecto<br />
              en construcción
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="skills-inner">
          <div className="reveal">
            <p className="section-label">03 — habilidades</p>
            <h2 className="section-title">Mi stack.</h2>
          </div>

          <div className="skills-row reveal">
            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">HTML / CSS</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="70"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">JavaScript</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="65"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">React</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Node.js</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="45"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Python</span>
                <span className="skill-bar-level">básico</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="40"></div>
              </div>
            </div>

            <div className="skill-bar-item">
              <div className="skill-bar-header">
                <span className="skill-bar-name">Git / GitHub</span>
                <span className="skill-bar-level">intermedio</span>
              </div>
              <div className="skill-bar-track">
                <div className="skill-bar-fill" data-width="60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="reveal">
          <p className="section-label" style={{ justifyContent: 'center' }}>
            04 — contacto
          </p>
          <h2 className="contact-big">
            ¿Trabajamos<br />
            <span className="accent">juntos?</span>
          </h2>
          <p className="contact-sub">Abierto a oportunidades, proyectos freelance y colaboraciones.</p>
          <div className="contact-links">
            <a href="mailto:tu@email.com" className="btn-primary">
              ✉ enviar email
            </a>
            <a href="https://github.com/endbel" target="_blank" rel="noreferrer" className="btn-outline">
              ⌥ GitHub
            </a>
            <a href="https://linkedin.com/in/tuusuario" target="_blank" rel="noreferrer" className="btn-outline">
              in LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>
          © 2025 <span className="accent">endbel</span> — diseñado y desarrollado a mano
        </p>
        <p>
          hecho con <span className="accent">♥</span> y mucho café
        </p>
      </footer>
    </>
  );
}

export default App;
