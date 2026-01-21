import React, { useState, useRef, useEffect } from "react";
import "./TerminalApp.css";
import { useSettings } from "../../context/SettingsContext";

const TypewriterEffect = ({ text, onComplete, speed = 20 }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [currentIndex, text, speed, onComplete]);

    return <span>{displayedText}</span>;
};

function TerminalApp() {
    const { settings } = useSettings();
    const [input, setInput] = useState("");
    const [history, setHistory] = useState([
        { cmd: null, output: "Welcome to Raj's Portfolio Terminal. Type 'help' for available commands.", animate: false }
    ]);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const commands = {
        whoami: "Raj Koli — Full-Stack Developer specializing in high-performance web applications and premium user experiences.",
        skills: "Frontend: React, Next.js, Framer Motion, Tailwind\nBackend:  Node.js, Express, PostgreSQL, MongoDB\nTools:    Git, Docker, Figma, Vercel CI/CD",
        projects: "• MacOS Portfolio (v2.0)\n• Eco-Tracker Sustainability Dashboard\n• Crypto-Dash Real-time Analytics",
        contact: "Email:    2024.rajk@isu.ac.in\nGitHub:   github.com/Rajkoli145\nLinkedIn: linkedin.com/in/raj-koli-626008318",
        help: "Available commands: whoami, skills, projects, contact, help, clear"
    };

    useEffect(() => {
        return () => {
            if (settings.terminal.clearOnClose) {
                // Reset to welcome message instead of completely clearing
                setHistory([
                    { cmd: null, output: "Welcome to Raj's Portfolio Terminal. Type 'help' for available commands.", animate: false }
                ]);
            }
        }
    }, [settings.terminal.clearOnClose]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            const trimmedInput = input.trim().toLowerCase();

            if (trimmedInput === "clear") {
                setHistory([]);
            } else {
                const output = trimmedInput === "" ? null : (commands[trimmedInput] || `command not found: ${trimmedInput}`);
                setHistory(prev => [...prev, { cmd: input || " ", output, animate: false }]);
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
                    <span className="prompt-user">rajkoli</span>
                    <span className="prompt-symbol purple">➜</span>
                </div>
            );
        }

        if (style === 'powerline') {
            return (
                <div className="terminal-prompt-wrapper powerline">
                    <span className="pl-segment user">rajkoli</span>
                    <span className="pl-segment path">~</span>
                    <span className="pl-segment symbol">⚡</span>
                </div>
            );
        }

        // Classic
        return (
            <div className="terminal-prompt-wrapper classic">
                <span className="prompt-emoji">💻</span>
                <span className="prompt-user">rajkoli@Rajs-MacBook-Air-2</span>
                <span className="prompt-arrow">➜</span>
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
                        {entry.output && (
                            <div className="terminal-output">
                                {entry.animate ? (
                                    <TypewriterEffect
                                        text={entry.output}
                                        onComplete={scrollToBottom}
                                        speed={settings.terminal.typingSpeed || 20}
                                    />
                                ) : (
                                    <pre className="output-text">{entry.output}</pre>
                                )}
                            </div>
                        )}
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
