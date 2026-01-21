import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, CircleUser, Loader, Search, ChevronDown, MessageSquare } from 'lucide-react';
import './AIAssistant.css';

// Reuse the knowledge base
const KNOWLEDGE_BASE = {
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'assistant'],
        response: "Hi there! I'm your macOS AI Portfolio Assistant. I can tell you all about Raj's skills, projects, and experience. How can I help you today? 😊"
    },
    about: {
        keywords: ['about', 'who is', 'raj koli', 'experience', 'background'],
        response: "Raj Koli is a Full-Stack Developer based in Mumbai. He's passionate about building interactive web experiences and robust backend systems. He's currently a student-developer focusing on modern technologies like React and Node.js."
    },
    skills: {
        keywords: ['skills', 'tech', 'stack', 'technologies', 'use', 'know', 'languages'],
        response: "Raj's technical arsenal includes:\n• Frontend: React, Next.js, Vite, Tailwind CSS\n• Backend: Node.js, Express\n• Databases: PostgreSQL, MongoDB\n• Tools: Git, Docker, Figma, Vercel\nHe's also skilled in UI/UX design!"
    },
    projects: {
        keywords: ['projects', 'work', 'build', 'built', 'portfolio', 'apps'],
        response: "Raj has built some awesome projects:\n1. macOS Portfolio (This site! 💻)\n2. FreelancerFlow (Management platform)\n3. Umpire AI (Sports analytics)\n4. Student-Teacher Booking System\n5. Gym Management System\nYou can see details in the Finder app! 📂"
    },
    contact: {
        keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'hire', 'locate'],
        response: "You can reach Raj through these channels:\n• Email: 2024.rajk@isu.ac.in\n• LinkedIn: linkedin.com/in/raj-koli-626008318\n• GitHub: github.com/Rajkoli145\nFeel free to drop a message! 📩"
    },
    location: {
        keywords: ['location', 'where', 'mumbai', 'india', 'live', 'from'],
        response: "Raj is based in the vibrant city of Mumbai, India! 🇮🇳"
    },
    help: {
        keywords: ['help', 'can you do', 'what', 'navigate', 'how'],
        response: "I can help you explore Raj's portfolio! Ask me about his projects, skills, or contact info. I also recommend checking out the Finder app for his resume and more project details."
    },
    default: "That's interesting! I don't have a specific answer for that yet, but you can definitely find more info about it in the Finder app or by contacting Raj directly. 😊"
};

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getAIResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        for (const category in KNOWLEDGE_BASE) {
            if (category === 'default') continue;
            const { keywords, response } = KNOWLEDGE_BASE[category];
            if (keywords.some(keyword => lowerQuery.includes(keyword))) {
                return response;
            }
        }
        return KNOWLEDGE_BASE.default;
    };

    const handleSend = () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        setTimeout(() => {
            const responseText = getAIResponse(currentInput);
            const aiMessage = { role: 'assistant', content: responseText };
            setMessages(prev => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="ai-assistant-wrapper">
            {!isOpen ? (
                <button
                    className="ai-assistant-trigger"
                    onClick={() => setIsOpen(true)}
                >
                    <Sparkles size={24} />
                    <span className="trigger-text">Ask AI</span>
                </button>
            ) : (
                <div className="ai-assistant-panel">
                    <div className="ai-header">
                        <div className="ai-header-title">
                            <Sparkles size={18} />
                            <span>AI Assistant</span>
                        </div>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>
                            <X size={18} />
                        </button>
                    </div>

                    <div className="ai-messages">
                        {messages.length === 0 ? (
                            <div className="ai-welcome">
                                <Sparkles size={40} className="welcome-glow" />
                                <h3>How can I help you?</h3>
                                <p>Ask about Raj's experience, projects, or technical skills.</p>
                                <div className="quick-actions">
                                    <button onClick={() => setInput("Tell me about Raj")}>Tell me about Raj</button>
                                    <button onClick={() => setInput("What are his skills?")}>Technical Skills</button>
                                </div>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <div key={i} className={`message-bubble ${msg.role}`}>
                                    <div className="bubble-icon">
                                        {msg.role === 'assistant' ? <Sparkles size={12} /> : <CircleUser size={12} />}
                                    </div>
                                    <div className="bubble-content">
                                        {msg.content.split('\n').map((line, idx) => (
                                            <div key={idx}>{line}</div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="message-bubble assistant loading">
                                <div className="bubble-icon">
                                    <Loader size={12} className="ai-spinner" />
                                </div>
                                <div className="bubble-content">Thinking...</div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="ai-input-area">
                        <div className="input-container">
                            <textarea
                                placeholder="Message AI assistant..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                rows={1}
                            />
                            <button
                                className="send-btn"
                                onClick={handleSend}
                                disabled={!input.trim() || isLoading}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant;
