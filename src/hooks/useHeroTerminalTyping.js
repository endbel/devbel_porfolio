import { useEffect, useRef, useState } from "react";

const HERO_LINES = ["Hola,", "soy Belén", "Developer."];

export function useHeroTerminalTyping() {
  const [lines, setLines] = useState(["", "", ""]);
  const [activeLine, setActiveLine] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    let lineIdx = 0;
    let charIdx = 0;

    const typeNext = () => {
      if (lineIdx >= HERO_LINES.length) {
        setActiveLine(-1);
        setIsDone(true);
        return;
      }

      const fullLine = HERO_LINES[lineIdx];
      setActiveLine(lineIdx);
      setLines((prev) => {
        const next = [...prev];
        next[lineIdx] = fullLine.slice(0, charIdx + 1);
        return next;
      });

      if (charIdx + 1 < fullLine.length) {
        charIdx += 1;
        timeoutRef.current = setTimeout(typeNext, 70);
      } else {
        lineIdx += 1;
        charIdx = 0;
        timeoutRef.current = setTimeout(typeNext, 220);
      }
    };

    timeoutRef.current = setTimeout(typeNext, 260);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { lines, activeLine, isDone };
}
