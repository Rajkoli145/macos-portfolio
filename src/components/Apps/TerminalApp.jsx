import { useState, useEffect } from "react";
import "./TerminalApp.css";

function TerminalApp() {
  const [lines, setLines] = useState([]);

  const content = [
    { text: "raj@portfolio:~$ skills", delay: 500 },
    { text: "- JavaScript (ES6+)", delay: 800 },
    { text: "- React / Next.js", delay: 1000 },
    { text: "- Node.js / Express", delay: 1200 },
    { text: "- MongoDB / PostgreSQL", delay: 1400 },
    { text: "- CSS3 / Tailwind", delay: 1600 },
    { text: "", delay: 1700 },
    { text: "raj@portfolio:~$ tools", delay: 2200 },
    { text: "- VS Code", delay: 2400 },
    { text: "- Git / GitHub", delay: 2600 },
    { text: "- Docker / Redis", delay: 2800 },
    { text: "- Vercel / Render", delay: 3000 },
    { text: "", delay: 3100 },
    { text: "raj@portfolio:~$ _", delay: 3500, isCursor: true }
  ];

  useEffect(() => {
    content.forEach((item, index) => {
      setTimeout(() => {
        setLines(prev => [...prev, item]);
      }, item.delay);
    });
  }, []);

  return (
    <div className="terminal-container">
      <div className="terminal-body">
        {lines.map((line, i) => (
          <p key={i} className={line.isCursor ? "cursor-line" : ""}>
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default TerminalApp;
