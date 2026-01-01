import { useState, useRef, useEffect } from "react";
import "./TerminalApp.css";
import { useSettings } from "../../context/SettingsContext";

function TerminalApp() {
    const { settings } = useSettings();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { cmd: null, output: "Welcome to Raj's Portfolio Terminal. Type 'help' for available commands." }
    ]);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const commands = {
        whoami: "Raj Koli — Full-Stack Developer specializing in high-performance web applications and premium user experiences.",
        skills: "Frontend: React, Next.js, Framer Motion, Tailwind\nBackend:  Node.js, Express, PostgreSQL, MongoDB\nTools:    Git, Docker, Figma, Vercel CI/CD",
        projects: "• MacOS Portfolio (v2.0)\n• Eco-Tracker Sustainability Dashboard\n• Crypto-Dash Real-time Analytics",
        contact: "Email:    2024.rajk@isu.ac.in\nGitHub:   github.com/rajkoli\nLinkedIn: linkedin.com/in/rajkoli",
        help: "Available commands: whoami, skills, projects, contact, help, clear"
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const trimmedInput = input.trim().toLowerCase();

            if (trimmedInput === "clear") {
                setHistory([]);
            } else {
                const output = trimmedInput === "" ? null : (commands[trimmedInput] || `command not found: ${trimmedInput}`);
                setHistory(prev => [...prev, { cmd: input || " ", output }]);
            }

            setInput("");
        }
    };

    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const getFontSizeClass = () => {
        switch (settings.terminal.fontSize) {
            case 'small': return 'text-sm';
            case 'large': return 'text-lg';
            default: return 'text-md';
        }
    };

    const RenderPrompt = () => {
        const style = settings.terminal.promptStyle;

        if (style === 'minimal') {
            return (
                <div className="terminal-prompt-wrapper minimal">
                    <span className="prompt-symbol purple">➜</span>
                </div>
            );
        }

        if (style === 'powerline') {
            return (
                <div className="terminal-prompt-wrapper powerline">
                    <span className="pl-segment user">raj</span>
                    <span className="pl-segment path">portfolio</span>
                    <span className="pl-segment symbol">⚡</span>
                </div>
            );
        }

        // Classic
        return (
            <div className="terminal-prompt-wrapper classic">
                <span className="prompt-user">raj@portfolio</span>
                <span className="prompt-path">~</span>
                <span className="prompt-symbol">$</span>
            </div>
        );
    };

    return (
        <div className={`terminal-app ${getFontSizeClass()}`} onClick={focusInput} ref={scrollRef}>
            <div className="terminal-session">
                {history.map((entry, index) => (
                    <div key={index} className="terminal-line-group">
                        {entry.cmd !== null && (
                            <div className="terminal-prompt-line">
                                <RenderPrompt />
                                <span className="prompt-text">{entry.cmd}</span>
                            </div>
                        )}
                        {entry.output && <pre className="terminal-output">{entry.output}</pre>}
                    </div>
                ))}

                <div className="terminal-prompt-line active">
                    <RenderPrompt />
                    <div className="input-wrapper">
                        <span className="input-mirror">{input}</span>
                        <input
                            ref={inputRef}
                            type="text"
                            className="terminal-input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            spellCheck="false"
                            autoComplete="off"
                        />
                        <span className="terminal-cursor"></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TerminalApp;
