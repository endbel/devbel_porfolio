import { useEffect, useState } from "react";

const TERMINAL_SEQUENCE = [
  { type: "val", text: "Hola, soy Belen, Junior Developer." },
  {
    type: "val",
    text: "Construyo experiencias web funcionales y elegantes, con foco en codigo limpio y proyectos de impacto.",
  },
  {
    type: "val",
    text: "Stack principal: HTML, CSS, JavaScript, React, TypeScript, Node.js, MySQL y Java.",
  },
  {
    type: "val",
    text: "Tambien trabajo con MongoDB y Prisma para construir soluciones full stack mantenibles.",
  },
  {
    type: "val",
    text: "En el flujo diario aplico Vite, ESLint y GitHub Actions para mejorar velocidad, calidad y despliegue continuo.",
  },
  {
    type: "val",
    text: "Fortalezas: resolucion de problemas, trabajo en equipo y metodologia agil (Scrum).",
  },
  {
    type: "val",
    text: "Ingles intermedio para leer documentacion tecnica y comunicarme en entornos de trabajo.",
  },
];

export function useInteractiveTerminal() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let lineIndex = 0;
    let charIndex = 0;
    let timerId;

    setHistory([{ type: TERMINAL_SEQUENCE[0].type, text: "" }]);

    const typeNext = () => {
      if (lineIndex >= TERMINAL_SEQUENCE.length) {
        return;
      }

      const currentLine = TERMINAL_SEQUENCE[lineIndex];
      const fullLine = currentLine.text;

      if (fullLine.length === 0) {
        lineIndex += 1;
        if (lineIndex < TERMINAL_SEQUENCE.length) {
          setHistory((prev) => [
            ...prev,
            { type: TERMINAL_SEQUENCE[lineIndex].type, text: "" },
          ]);
          timerId = setTimeout(typeNext, 70);
        }
        return;
      }

      charIndex += 1;
      const partial = fullLine.slice(0, charIndex);

      setHistory((prev) => {
        const next = [...prev];
        next[next.length - 1] = { type: currentLine.type, text: partial };
        return next;
      });

      if (charIndex < fullLine.length) {
        timerId = setTimeout(typeNext, currentLine.type === "cmd" ? 16 : 11);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < TERMINAL_SEQUENCE.length) {
        setHistory((prev) => [
          ...prev,
          { type: TERMINAL_SEQUENCE[lineIndex].type, text: "" },
        ]);
        timerId = setTimeout(typeNext, 120);
      }
    };

    timerId = setTimeout(typeNext, 180);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, []);

  return {
    history,
  };
}
