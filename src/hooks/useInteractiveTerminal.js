import { useEffect, useState } from "react";

const TERMINAL_SEQUENCES = {
  es: [
    { type: "val", text: "Hola, soy Belen, Full Stack Junior." },
    {
      type: "val",
      text: "Construyo productos web con foco en impacto real, claridad para usuarios y objetivos de negocio.",
    },
    {
      type: "val",
      text: "Stack principal: React, Next.js, TypeScript, Node.js, Prisma y SQL.",
    },
    {
      type: "val",
      text: "Tambien trabajo con REST API, Tailwind, Docker y MongoDB para soluciones full stack mantenibles.",
    },
    {
      type: "val",
      text: "Diferencial: combino experiencia en soporte tecnico + desarrollo para resolver incidentes y entregar soluciones estables.",
    },
    {
      type: "val",
      text: "Trabajo remoto (UTC-3), disponibilidad inmediata y comunicacion clara con equipos tecnicos y de negocio.",
    },
    {
      type: "val",
      text: "Ingles B2 para documentacion tecnica, colaboracion internacional y reuniones de proyecto.",
    },
  ],
  en: [
    { type: "val", text: "Hi, I'm Belen, a Junior Full Stack Developer." },
    {
      type: "val",
      text: "I build web products focused on real impact, user clarity, and business goals.",
    },
    {
      type: "val",
      text: "Core stack: React, Next.js, TypeScript, Node.js, Prisma, and SQL.",
    },
    {
      type: "val",
      text: "I also work with REST API, Tailwind, Docker, and MongoDB to build maintainable full stack solutions.",
    },
    {
      type: "val",
      text: "Differential: I combine technical support + development to solve incidents and deliver stable solutions.",
    },
    {
      type: "val",
      text: "I work remotely (UTC-3), with immediate availability and clear communication across technical and business teams.",
    },
    {
      type: "val",
      text: "English B2 for technical documentation, international collaboration, and project meetings.",
    },
  ],
};

export function useInteractiveTerminal(language = "es", shouldStart = true) {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (!shouldStart) {
      setHistory([]);
      return undefined;
    }

    const terminalSequence =
      TERMINAL_SEQUENCES[language] ?? TERMINAL_SEQUENCES.es;

    if (terminalSequence.length === 0) {
      setHistory([]);
      return undefined;
    }

    setHistory([{ type: terminalSequence[0].type, text: "" }]);

    let lineIndex = 0;
    let charIndex = 0;
    let timerId;

    const typeNext = () => {
      if (lineIndex >= terminalSequence.length) {
        return;
      }

      const currentLine = terminalSequence[lineIndex];
      const fullLine = currentLine.text;

      if (fullLine.length === 0) {
        lineIndex += 1;
        if (lineIndex < terminalSequence.length) {
          setHistory((prev) => [
            ...prev,
            { type: terminalSequence[lineIndex].type, text: "" },
          ]);
          timerId = setTimeout(typeNext, 40);
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
        timerId = setTimeout(typeNext, currentLine.type === "cmd" ? 10 : 6);
        return;
      }

      lineIndex += 1;
      charIndex = 0;

      if (lineIndex < terminalSequence.length) {
        setHistory((prev) => [
          ...prev,
          { type: terminalSequence[lineIndex].type, text: "" },
        ]);
        timerId = setTimeout(typeNext, 70);
      }
    };

    timerId = setTimeout(typeNext, 90);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [language, shouldStart]);

  return {
    history,
  };
}
