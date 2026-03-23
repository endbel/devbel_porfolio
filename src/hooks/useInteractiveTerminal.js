import { useMemo, useState } from "react";

const HOME = "/home/belen";

const DIR_CONTENT = {
  "/": ["home/"],
  "/home": ["belen/"],
  "/home/belen": ["about.txt", "contact.txt", "projects/", "skills.txt"],
  "/home/belen/projects": [
    "app-del-clima.md",
    "cici-app.md",
    "conversor-monedas.md",
    "demo-clinica.md",
    "todos-app.md",
    "voz-ciudadana.md",
  ],
};

const FILE_CONTENT = {
  "/home/belen/about.txt": "Belen - Junior Developer Full Stack.",
  "/home/belen/skills.txt":
    "HTML, CSS, JavaScript, TypeScript, React, Node.js, Python, PHP, Java, MySQL, Git, Docker",
  "/home/belen/contact.txt":
    "GitHub: github.com/endbel | LinkedIn: linkedin.com/in/miperfilbelenrodriguez",
  "/home/belen/projects/app-del-clima.md": "App del Clima",
  "/home/belen/projects/conversor-monedas.md": "Conversor de Monedas",
  "/home/belen/projects/voz-ciudadana.md": "Voz Ciudadana",
  "/home/belen/projects/todos-app.md": "ToDos App",
  "/home/belen/projects/demo-clinica.md": "Demo Clinica",
  "/home/belen/projects/cici-app.md": "CICI App",
};

function normalizePath(path) {
  const parts = path.split("/");
  const resolved = [];
  for (const part of parts) {
    if (!part || part === ".") {
      continue;
    }
    if (part === "..") {
      resolved.pop();
      continue;
    }
    resolved.push(part);
  }
  if (resolved.length === 0) {
    return "/";
  }
  return `/${resolved.join("/")}`;
}

function resolvePath(current, inputPath = "") {
  if (!inputPath || inputPath === "~") {
    return HOME;
  }
  if (inputPath.startsWith("~/")) {
    return normalizePath(`${HOME}/${inputPath.slice(2)}`);
  }
  if (inputPath.startsWith("/")) {
    return normalizePath(inputPath);
  }
  return normalizePath(`${current}/${inputPath}`);
}

function displayPath(path) {
  if (path === HOME) {
    return "~";
  }
  if (path.startsWith(`${HOME}/`)) {
    return `~/${path.slice(HOME.length + 1)}`;
  }
  return path;
}

export function useInteractiveTerminal() {
  const [cwd, setCwd] = useState(HOME);
  const [history, setHistory] = useState([
    { type: "out", text: "Welcome to belen-bash 1.0" },
    { type: "out", text: 'Type "help" to see available commands.' },
  ]);
  const [commandLog, setCommandLog] = useState([]);

  const prompt = useMemo(() => `belen@portfolio:${displayPath(cwd)}$`, [cwd]);

  const runCommand = (rawInput) => {
    const input = rawInput.trim();
    if (!input) {
      return;
    }

    const [command, ...args] = input.split(/\s+/);
    const cmd = command.toLowerCase();
    const currentPrompt = `belen@portfolio:${displayPath(cwd)}$`;
    const next = [{ type: "cmd", text: `${currentPrompt} ${input}` }];

    setCommandLog((prev) => [...prev, input]);

    if (cmd === "help") {
      next.push(
        { type: "out", text: "bash commands:" },
        {
          type: "out",
          text: "help, pwd, ls, cd, cat, echo, date, whoami, uname, history, clear",
        },
      );
    } else if (cmd === "pwd") {
      next.push({ type: "out", text: cwd });
    } else if (cmd === "ls") {
      const targetPath = resolvePath(cwd, args[0] || "");
      const list = DIR_CONTENT[targetPath];
      if (!list) {
        next.push({
          type: "out",
          text: `bash: ls: cannot access '${args[0] || "."}': No such file or directory`,
        });
      } else {
        next.push({ type: "out", text: list.join("  ") });
      }
    } else if (cmd === "cd") {
      const target = resolvePath(cwd, args[0] || "~");
      if (DIR_CONTENT[target]) {
        setCwd(target);
      } else {
        next.push({
          type: "out",
          text: `bash: cd: ${args[0] || ""}: No such file or directory`,
        });
      }
    } else if (cmd === "cat") {
      if (!args[0]) {
        next.push({ type: "out", text: "bash: cat: missing file operand" });
      } else {
        const target = resolvePath(cwd, args[0]);
        const content = FILE_CONTENT[target];
        if (!content) {
          next.push({
            type: "out",
            text: `bash: cat: ${args[0]}: No such file or directory`,
          });
        } else {
          next.push({ type: "val", text: content });
        }
      }
    } else if (cmd === "echo") {
      const raw = args
        .join(" ")
        .replaceAll("$PWD", cwd)
        .replaceAll("$HOME", HOME)
        .replaceAll("$USER", "belen");
      next.push({ type: "out", text: raw });
    } else if (cmd === "date") {
      next.push({ type: "out", text: new Date().toString() });
    } else if (cmd === "whoami") {
      next.push({ type: "out", text: "belen" });
    } else if (cmd === "uname") {
      const flag = args[0] || "";
      if (flag === "-a") {
        next.push({
          type: "out",
          text: "Linux portfolio 6.8.0 belen-bash x86_64 GNU/Linux",
        });
      } else {
        next.push({ type: "out", text: "Linux" });
      }
    } else if (cmd === "history") {
      const lines = [...commandLog, input].map(
        (item, idx) => `${idx + 1}  ${item}`,
      );
      next.push({ type: "out", text: lines.join("\n") || "" });
    } else if (cmd === "clear") {
      setHistory([]);
      return;
    } else {
      next.push({ type: "out", text: `bash: ${command}: command not found` });
    }

    setHistory((prev) => [...prev, ...next]);
  };

  return {
    prompt,
    history,
    runCommand,
  };
}
