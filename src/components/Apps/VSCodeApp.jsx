import { useState, useRef, useEffect } from "react";
import "./VSCodeApp.css";
import {
    FileCode,
    FileText,
    ChevronRight,
    ChevronDown,
    Files,
    Search,
    GitBranch,
    LayoutGrid,
    Settings,
    CircleUser,
    ArrowLeft,
    ArrowRight,
    Play,
    Square,
    MessageSquare,
    PawPrint,
    Package,
    PanelRight,
    Columns2,
    Radio,
    Clock,
    Bell,
    Check,
    X,
    Sparkles,
    Send,
    Loader
} from "lucide-react";

// Local Knowledge Base for Raj Koli (Moved from AIAssistant)
const KNOWLEDGE_BASE = {
    architecture: {
        keywords: ['how it works', 'architecture', 'built', 'how did you', 'code', 'technical', 'implementation', 'this portfolio'],
        response: "This macOS Portfolio is built as a complex Single Page Application using **React** and **Vite**. \n• **State Management**: Uses React Context API to manage the 'Global OS State' (boot status, wallpaper, active windows).\n• **Component-Based**: Each app (Finder, VS Code, Terminal) is a isolated component with its own local state.\n• **Window System**: A custom `useWindowManager` hook handles the drag-and-drop, z-index, and window resizing logic.\n• **Styling**: Pure **Vanilla CSS** with CSS Variables is used to recreate the glassmorphism and animations of macOS Sonoma.\n• **Simulated OS**: Features like the boot sequence, lock screen, and functional terminal are built to feel like a real operating system!"
    },
    freelancerflow: {
        keywords: ['freelancerflow', 'business management', 'financial reporting', 'invoice'],
        response: "FreelancerFlow is a production-ready platform for freelancers. \n• Tech: React 19, Node.js, Express, MongoDB, Tailwind. \n• Features: Client CRM, invoice generation, financial reporting with Recharts, and enterprise-level security. \nIt's built to handle every aspect of a freelance business!"
    },
    educonnect: {
        keywords: ['educonnect', 'student-teacher', 'booking', 'appointment'],
        response: "EduConnect is a student-teacher booking system. \n• Tech: Firebase, ES6+, HTML/CSS. \n• Features: Role-based access (Student/Teacher/Admin), real-time synchronization, and a comprehensive admin dashboard."
    },
    ardementia: {
        keywords: ['ar dementia', 'dementia aid', 'face recognition', 'assistive tech'],
        response: "AR Dementia Aid is a browser-based assistive tool built for MumbaiHacks 2025. \n• Tech: face-api.js, TensorFlow.js, WebRTC. \n• Features: Real-time face recognition and medicine reminders to help identify people and track health."
    },
    umpireai: {
        keywords: ['umpire ai', 'sports', 'umpire', 'decision assistant', 'computer vision'],
        response: "Umpire AI is an AI-powered sports decision assistant. \n• Tech: Python, TensorFlow, OpenCV, Flask, React. \n• Features: Real-time video analysis and computer vision for ball tracking and decision support."
    },
    gym: {
        keywords: ['gym management', 'workout', 'membership', 'attendance'],
        response: "The Gym Management System tracks memberships, attendance, and workout plans. \n• Tech: React, Node, Express, MongoDB. \n• Features: Member portal, billing management, progress tracking, and QR code check-ins."
    },
    projects: {
        keywords: ['projects', 'work', 'build', 'built', 'portfolio', 'apps'],
        response: "Raj has built some awesome projects:\n1. macOS Portfolio (This site! 💻)\n2. FreelancerFlow (Management platform)\n3. Umpire AI (Sports analytics)\n4. Student-Teacher Booking System\n5. Gym Management System\nYou can see details in the Finder app! 📂"
    },
    about: {
        keywords: ['about', 'who is', 'raj koli', 'experience', 'background'],
        response: "Raj Koli is a Full-Stack Developer based in Mumbai. He's passionate about building interactive web experiences and robust backend systems. He's currently a student-developer focusing on modern technologies like React and Node.js."
    },
    skills: {
        keywords: ['skills', 'tech', 'stack', 'technologies', 'use', 'know', 'languages'],
        response: "Raj's technical arsenal includes:\n• Frontend: React, Next.js, Vite, Tailwind CSS\n• Backend: Node.js, Express\n• Databases: PostgreSQL, MongoDB\n• Tools: Git, Docker, Figma, Vercel\nHe's also skilled in UI/UX design!"
    },
    contact: {
        keywords: ['contact', 'email', 'linkedin', 'github', 'reach', 'hire', 'locate'],
        response: "You can reach Raj through these channels:\n• Email: 2024.rajk@isu.ac.in\n• LinkedIn: linkedin.com/in/raj-koli-626008318\n• GitHub: github.com/Rajkoli145\nFeel free to drop a message! 📩"
    },
    location: {
        keywords: ['location', 'where', 'mumbai', 'india', 'live', 'from'],
        response: "Raj is based in the vibrant city of Mumbai, India! 🇮🇳"
    },
    greetings: {
        keywords: ['hi', 'hello', 'hey', 'greetings', 'who are you', 'assistant'],
        response: "Hi there! I'm Raj's AI Assistant, integrated directly into VS Code. I can tell you all about Raj's skills, projects, and experience. How can I help you today? 😊"
    },
    help: {
        keywords: ['help', 'can you do', 'what', 'navigate', 'how'],
        response: "I can help you explore Raj's portfolio! Ask me about his projects (like 'FreelancerFlow' or 'Umpire AI'), his skills, or even **how this portfolio itself was built** technically! I also recommend checking out the Finder app for more project details."
    },
    default: "That's interesting! I don't have a specific answer for that yet, but you can definitely find more info about it in Raj's Finder app or by contacting him directly. 😊"
};

const FILE_STRUCTURE = [
    {
        name: "src",
        type: "folder",
        children: [
            {
                name: "components",
                type: "folder",
                children: [
                    { name: "Window.tsx", type: "file", language: "typescript" },
                    { name: "Dock.tsx", type: "file", language: "typescript" },
                    { name: "Desktop.jsx", type: "file", language: "javascript" },
                ]
            },
            {
                name: "apps",
                type: "folder",
                children: [
                    { name: "terminal.ts", type: "file", language: "typescript" },
                    { name: "notes.ts", type: "file", language: "typescript" },
                    { name: "mail.ts", type: "file", language: "typescript" },
                ]
            },
            {
                name: "styles",
                type: "folder",
                children: [
                    { name: "theme.css", type: "file", language: "css" },
                ]
            },
            { name: "App.jsx", type: "file", language: "javascript" },
            { name: "main.jsx", type: "file", language: "javascript" },
        ]
    },
    {
        name: "public",
        type: "folder",
        children: [
            { name: "favicon.ico", type: "file", language: "image" },
            { name: "manifest.json", type: "file", language: "json" },
        ]
    },
    { name: "package.json", type: "file", language: "json" },
    { name: "vite.config.js", type: "file", language: "javascript" },
    { name: "README.md", type: "file", language: "markdown" }
];

const CODE_SNIPPETS = {
    "terminal.ts": `export class TerminalInstance {
  private history: string[] = [];
  
  constructor(public user: string) {}

  public execute(command: string): string {
    this.history.push(command);
    return \`Executing \${command} as \${this.user}...\`;
  }
}`,
    "notes.ts": `interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: Date;
}

export function saveNote(note: Note): void {
  // Read-only logic: Simulated save
  console.log("Saving note:", note.title);
}`,
    "mail.ts": `export async function sendEmail(data: ContactForm) {
  const result = await emailjs.send(
    process.env.SERVICE_ID,
    process.env.TEMPLATE_ID,
    data
  );
  return result.status === 200;
}`,
    "Window.tsx": `export function Window({ children, title, isMaximized }) {
  return (
    <div className={\`window \${isMaximized ? 'max' : ''}\`}>
      <div className="title-bar">
        <TrafficLights />
        <span>{title}</span>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}`,
    "Dock.tsx": `export function Dock({ apps }) {
  return (
    <nav className="dock-container">
      {apps.map(app => (
        <DockIcon 
          key={app.id} 
          icon={app.icon} 
          active={app.isOpen} 
        />
      ))}
    </nav>
  );
}`,
    "theme.css": `:root {
  --bg-primary: #1e1e1e;
  --accent-blue: #007aff;
  --text-main: #ffffff;
}

.window {
  background: var(--bg-primary);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}`,
    "Desktop.jsx": `import { MenuBar } from "../MenuBar/MenuBar";
import { Dock } from "../Dock/Dock";
import { WindowManager } from "../../hooks/useWindowManager";

export default function Desktop() {
  return (
    <div className="desktop-environment">
      <MenuBar />
      <main className="workspace">
        <WindowManager />
      </main>
      <Dock />
    </div>
  );
}`,
    "App.jsx": `import { OSProvider } from "./context/OSContext";
import Desktop from "./components/Desktop/Desktop";

function App() {
  return (
    <OSProvider>
      <Desktop />
    </OSProvider>
  );
}

export default App;`,
    "main.jsx": `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    "package.json": `{
  "name": "macos-portfolio",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "lucide-react": "^0.400.0"
  }
}`,
    "vite.config.js": `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  }
});`,
    "README.md": `# Portfolio Tech Stack

Built with purpose and restraint.

- **React 19**: Modern UI rendering
- **Vite**: Ultra-fast development
- **CSS3**: Pure custom styling
- **Lucide**: Clean iconography

*"Code is a liability. Write less, deliver more."*`
};

const SHORTCUTS = [
    { label: "Open Chat", keys: ["^", "⌘", "I"] },
    { label: "Show All Commands", keys: ["⇧", "⌘", "P"] },
    { label: "Open File or Folder", keys: ["⌘", "O"] },
    { label: "Open Recent", keys: ["^", "R"] },
    { label: "New Untitled Text File", keys: ["⌘", "N"] },
];

const SOURCE_CONTROL = [
    { id: 1, message: "Initial commit: MacOS Portfolio structure", date: "Jan 05", author: "Raj Koli" },
    { id: 2, message: "Feat: Add Finder and Terminal applications", date: "Jan 07", author: "Raj Koli" },
    { id: 3, message: "Style: Authenticate MacOS Big Sur design", date: "Jan 10", author: "Raj Koli" },
    { id: 4, message: "Fix: Window management and docking logic", date: "Jan 12", author: "Raj Koli" },
    { id: 5, message: "Feat: Integrate Copilot AI Assistant", date: "Jan 15", author: "Raj Koli" }
];

const EXTENSIONS = [
    { id: "react", name: "React", description: "A JavaScript library for building user interfaces", version: "19.2.0", icon: "⚛️", downloads: "25M", rating: 5 },
    { id: "vite", name: "Vite", description: "Next Generation Frontend Tooling", version: "7.2.4", icon: "⚡", downloads: "10M", rating: 5 },
    { id: "js", name: "JavaScript (ES6+)", description: "The language of the web", version: "ECMA-262", icon: "📜", downloads: "100M", rating: 5 },
    { id: "css", name: "CSS3", description: "Cascading Style Sheets for modern design", version: "W3C", icon: "🎨", downloads: "100M", rating: 5 },
    { id: "lucide", name: "Lucide React", description: "Beautiful & consistent icons for React", version: "0.562.0", icon: "🖼️", downloads: "5M", rating: 4.8 },
    { id: "emailjs", name: "EmailJS", description: "Send emails directly from frontend", version: "4.4.1", icon: "📧", downloads: "1.2M", rating: 4.5 },
    { id: "node", name: "Node.js", description: "JavaScript runtime built on Chrome's V8", version: "22.0.0", icon: "🟢", downloads: "40M", rating: 5 },
    { id: "git", name: "Git", description: "Distributed version control system", version: "2.4.0", icon: "🔧", downloads: "80M", rating: 5 },
    { id: "eslint", name: "ESLint", description: "Find and fix problems in your JavaScript code", version: "9.39.1", icon: "🔍", downloads: "30M", rating: 4.7 },
    { id: "postcss", name: "PostCSS", description: "A tool for transforming CSS with JavaScript", version: "8.4.0", icon: "📦", downloads: "15M", rating: 4.6 }
];

function VSCodeApp({ onClose, onMinimize, onMaximize }) {
    const [activeFile, setActiveFile] = useState(null); // Default to empty state
    const [openFolders, setOpenFolders] = useState(["apps", "components", "styles"]);
    const [openTabs, setOpenTabs] = useState([]);
    const [activeSidebar, setActiveSidebar] = useState('explorer');
    const [extSearch, setExtSearch] = useState('');

    // AI Chat State
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToChatBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isChatOpen) {
            scrollToChatBottom();
        }
    }, [messages, isChatOpen]);

    const getAIResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        for (const category in KNOWLEDGE_BASE) {
            if (category === 'default') continue;
            const { keywords, response } = KNOWLEDGE_BASE[category];
            if (keywords.some(keyword => {
                // Use a dynamic regex for word boundaries to avoid partial matches (e.g., 'hi' in 'this')
                const regex = new RegExp(`\\b${keyword}\\b`, 'i');
                return regex.test(lowerQuery);
            })) {
                return response;
            }
        }
        return KNOWLEDGE_BASE.default;
    };

    const handleSendChat = async () => {
        if (!chatInput.trim() || isChatLoading) return;

        const userMessage = { role: 'user', content: chatInput };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = chatInput;
        setChatInput('');
        setIsChatLoading(true);

        setTimeout(() => {
            const responseText = getAIResponse(currentInput);
            const aiMessage = { role: 'assistant', content: responseText };
            setMessages(prev => [...prev, aiMessage]);
            setIsChatLoading(false);
        }, 800);
    };

    const handleChatKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendChat();
        }
    };

    const toggleFolder = (folderName) => {
        setOpenFolders(prev =>
            prev.includes(folderName)
                ? prev.filter(f => f !== folderName)
                : [...prev, folderName]
        );
    };

    const handleFileClick = (fileName) => {
        setActiveFile(fileName);
        if (!openTabs.includes(fileName)) {
            setOpenTabs([...openTabs, fileName]);
        }
    };

    const closeTab = (e, fileName) => {
        e.stopPropagation();
        const newTabs = openTabs.filter(t => t !== fileName);
        setOpenTabs(newTabs);
        if (activeFile === fileName && newTabs.length > 0) {
            setActiveFile(newTabs[newTabs.length - 1]);
        } else if (newTabs.length === 0) {
            setActiveFile(null);
        }
    };

    const renderExplorer = (data, depth = 0) => {
        return (
            <div className="explorer-tree">
                {data.map((item) => {
                    if (item.type === "folder") {
                        const isOpen = openFolders.includes(item.name);
                        return (
                            <div key={item.name}>
                                <div
                                    className={`explorer-item folder ${isOpen ? 'open' : ''}`}
                                    style={{ paddingLeft: `${depth * 12 + 12}px` }}
                                    onClick={() => toggleFolder(item.name)}
                                >
                                    {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                                    <span>{item.name}</span>
                                </div>
                                {isOpen && renderExplorer(item.children, depth + 1)}
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={item.name}
                                className={`explorer-item file ${activeFile === item.name ? 'active' : ''}`}
                                style={{ paddingLeft: `${depth * 12 + 12}px` }}
                                onClick={() => handleFileClick(item.name)}
                            >
                                {item.name.endsWith('.md') ? <FileText size={14} /> : <FileCode size={14} />}
                                <span>{item.name}</span>
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    const renderSearch = () => {
        return (
            <div className="search-view">
                <div className="sidebar-header">SEARCH</div>
                <div className="search-input-container">
                    <input type="text" placeholder="Search" />
                    <div className="search-options">
                        <span title="Match Case">Ab</span>
                        <span title="Match Whole Word"><u>ab</u></span>
                        <span title="Use Regular Expression">.*</span>
                    </div>
                </div>
                <div className="search-results-placeholder">
                    <p>No results found. Try searching for "Raj" or "React".</p>
                </div>
            </div>
        );
    };

    const renderRunDebug = () => {
        return (
            <div className="debug-view">
                <div className="sidebar-header">RUN AND DEBUG</div>
                <div className="debug-content">
                    <div className="debug-welcome">
                        <Play size={32} className="debug-welcome-icon" />
                        <h3>Run and Debug</h3>
                        <p>Launch your portfolio to see it in action.</p>
                        <button className="debug-btn primary">Run and Debug (F5)</button>
                    </div>
                    <div className="section-title">
                        <ChevronDown size={14} />
                        <span>VARIABLES</span>
                    </div>
                    <div className="debug-placeholder-text">Not paused on debugger</div>
                    <div className="section-title">
                        <ChevronDown size={14} />
                        <span>WATCH</span>
                    </div>
                    <div className="debug-placeholder-text">Nothing to watch</div>
                </div>
            </div>
        );
    };

    const renderSourceControl = () => {
        return (
            <div className="source-control-view">
                <div className="sidebar-header">SOURCE CONTROL</div>
                <div className="scm-section">
                    <div className="section-title">
                        <ChevronDown size={14} />
                        <span>RECENT COMMITS</span>
                    </div>
                    <div className="commit-list">
                        {SOURCE_CONTROL.map(commit => (
                            <div key={commit.id} className="commit-item">
                                <GitBranch size={14} className="commit-icon" />
                                <div className="commit-info">
                                    <span className="commit-message">{commit.message}</span>
                                    <span className="commit-meta">{commit.author} • {commit.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="timeline-section">
                    <div className="section-title">
                        <ChevronDown size={14} />
                        <span>TIMELINE</span>
                    </div>
                    <div className="timeline-list">
                        <div className="timeline-item">
                            <span className="timeline-dot"></span>
                            <div className="timeline-content">
                                <span className="time-label">Just now</span>
                                <span className="time-desc">Refined VS Code UI & Expanded Tech Stack</span>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot"></span>
                            <div className="timeline-content">
                                <span className="time-label">2 hours ago</span>
                                <span className="time-desc">Integrated Copilot-style Chat</span>
                            </div>
                        </div>
                        <div className="timeline-item">
                            <span className="timeline-dot outline"></span>
                            <div className="timeline-content">
                                <span className="time-label">Yesterday</span>
                                <span className="time-desc">Optimized Desktop Window Management</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderExtensions = () => {
        const filteredExtensions = EXTENSIONS.filter(ext =>
            ext.name.toLowerCase().includes(extSearch.toLowerCase()) ||
            ext.description.toLowerCase().includes(extSearch.toLowerCase())
        );

        return (
            <div className="extensions-view">
                <div className="sidebar-header">EXTENSIONS</div>
                <div className="extension-search">
                    <input
                        type="text"
                        placeholder="Search Extensions in Marketplace"
                        value={extSearch}
                        onChange={(e) => setExtSearch(e.target.value)}
                    />
                </div>
                <div className="extensions-list">
                    <div className="section-title">
                        <ChevronDown size={14} />
                        <span>INSTALLED</span>
                    </div>
                    {filteredExtensions.map(ext => (
                        <div key={ext.id} className="extension-item">
                            <span className="extension-icon">{ext.icon}</span>
                            <div className="extension-details">
                                <div className="extension-name-row">
                                    <span className="ext-name">{ext.name}</span>
                                    <span className="ext-version">v{ext.version}</span>
                                </div>
                                <span className="ext-description">{ext.description}</span>
                                <div className="ext-stats">
                                    <span className="ext-downloads">📥 {ext.downloads}</span>
                                    <span className="ext-rating">⭐ {ext.rating}</span>
                                </div>
                                <div className="ext-tags">
                                    <span className="tag">Installed</span>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredExtensions.length === 0 && (
                        <div className="no-extensions">No extensions found for "{extSearch}"</div>
                    )}
                </div>
            </div>
        );
    };

    const highlightCode = (code, fileName) => {
        if (!code) return null;
        if (fileName && fileName.endsWith('.md')) {
            return code.split('\n').map((line, i) => {
                if (line.startsWith('#')) return <div key={i} className="hl-header">{line}</div>;
                if (line.startsWith('-')) return <div key={i} className="hl-bullet">{line}</div>;
                return <div key={i} className="hl-text">{line}</div>;
            });
        }

        // Very basic syntax highlighting for TS/JS/CSS
        return code.split('\n').map((line, i) => {
            const parts = line.split(/(\s+|[(){}[\].,;:=<>!+\-*/&|?]+|\".*?\"|'.*?'|\`.*?\`)/);
            return (
                <div key={i} className="editor-line">
                    <span className="line-number">{i + 1}</span>
                    <span className="line-content">
                        {parts.map((part, j) => {
                            if (/^(export|function|class|return|if|else|import|from|const|let|var|interface|type|public|private|async|await|case|break)$/.test(part)) {
                                return <span key={j} className="hl-keyword">{part}</span>;
                            }
                            if (/^(string|number|boolean|void|any|Date|AppType|Note|ContactForm|uuid)$/.test(part)) {
                                return <span key={j} className="hl-type">{part}</span>;
                            }
                            if (/^(\d+)$/.test(part)) return <span key={j} className="hl-number">{part}</span>;
                            if (/^(\".*?\"|'.*?'|\`.*?\`)$/.test(part)) return <span key={j} className="hl-string">{part}</span>;
                            if (/^(\/\/.*)$/.test(part)) return <span key={j} className="hl-comment">{part}</span>;
                            if (/^[A-Z][a-zA-Z0-9]*$/.test(part) && !/^[(){}[\].,;]$/.test(part)) return <span key={j} className="hl-component">{part}</span>;
                            return part;
                        })}
                    </span>
                </div>
            );
        });
    };

    return (
        <div className="vscode-wrapper">
            {/* Custom VS Code Title Bar */}
            <header className="vscode-title-bar drag-handle">
                <div className="title-left">
                    <div className="window-dots">
                        <span className="dot red" onClick={onClose}></span>
                        <span className="dot yellow" onClick={onMinimize}></span>
                        <span className="dot green" onClick={onMaximize}></span>
                    </div>
                    <div className="nav-controls">
                        <ArrowLeft size={16} />
                        <ArrowRight size={16} opacity={0.5} />
                    </div>
                </div>
                <div className="title-center">
                    <div className="search-box">
                        <Search size={14} />
                        <span>Search</span>
                        <div className={`chat-trigger ${isChatOpen ? 'active' : ''}`} onClick={() => setIsChatOpen(!isChatOpen)}>
                            <Sparkles size={14} strokeWidth={2.5} />
                            <ChevronDown size={12} />
                        </div>
                    </div>
                </div>
                <div className="title-right">
                    <MessageSquare size={16} />
                    <Columns2 size={16} />
                    <PanelRight size={16} />
                    <Square size={16} strokeWidth={1.5} />
                </div>
            </header>

            <div className="vscode-container">
                {/* Activity Bar */}
                <aside className="vscode-activity-bar">
                    <div className="activity-top">
                        <div
                            className={`activity-icon ${activeSidebar === 'explorer' ? 'active' : ''}`}
                            onClick={() => setActiveSidebar('explorer')}
                            title="Explorer (⇧⌘E)"
                        >
                            <Files size={24} strokeWidth={1.5} />
                        </div>
                        <div
                            className={`activity-icon ${activeSidebar === 'search' ? 'active' : ''}`}
                            onClick={() => setActiveSidebar('search')}
                            title="Search (⇧⌘F)"
                        >
                            <Search size={24} strokeWidth={1.5} />
                        </div>
                        <div
                            className={`activity-icon ${activeSidebar === 'scm' ? 'active' : ''}`}
                            onClick={() => setActiveSidebar('scm')}
                            title="Source Control (⇧⌃G)"
                        >
                            <GitBranch size={24} strokeWidth={1.5} />
                        </div>
                        <div
                            className={`activity-icon ${activeSidebar === 'debug' ? 'active' : ''}`}
                            onClick={() => setActiveSidebar('debug')}
                            title="Run and Debug (⇧⌘D)"
                        >
                            <Play size={24} strokeWidth={1.5} />
                        </div>
                        <div
                            className={`activity-icon ${activeSidebar === 'extensions' ? 'active' : ''}`}
                            onClick={() => setActiveSidebar('extensions')}
                            title="Extensions (⇧⌘X)"
                        >
                            <LayoutGrid size={24} strokeWidth={1.5} />
                        </div>
                        <div
                            className={`activity-icon ${activeSidebar === 'chat' ? 'active' : ''}`}
                            onClick={() => {
                                setIsChatOpen(true);
                                setActiveSidebar('chat');
                            }}
                            title="Chat (⇧⌘I)"
                        >
                            <MessageSquare size={24} strokeWidth={1.5} />
                        </div>
                        <div className="activity-icon"><PawPrint size={24} strokeWidth={1.5} /></div>
                        <div className="activity-icon"><Package size={24} strokeWidth={1.5} /></div>
                    </div>
                    <div className="activity-bottom">
                        <div className="activity-icon"><CircleUser size={24} strokeWidth={1.5} /></div>
                        <div className="activity-icon"><Settings size={24} strokeWidth={1.5} /></div>
                    </div>
                </aside>

                {/* Sidebar */}
                <aside className="vscode-sidebar">
                    {activeSidebar === 'explorer' && (
                        <>
                            <div className="sidebar-header">EXPLORER</div>
                            <div className="explorer-section">
                                <div className="section-title">
                                    <ChevronDown size={14} />
                                    <span>PORTFOLIO</span>
                                </div>
                                {renderExplorer(FILE_STRUCTURE)}
                            </div>
                        </>
                    )}
                    {activeSidebar === 'search' && renderSearch()}
                    {activeSidebar === 'scm' && renderSourceControl()}
                    {activeSidebar === 'debug' && renderRunDebug()}
                    {activeSidebar === 'extensions' && renderExtensions()}
                    {activeSidebar === 'chat' && (
                        <div className="sidebar-chat-placeholder">
                            <div className="sidebar-header">CHAT</div>
                            <div className="chat-placeholder-content">
                                <Sparkles size={32} />
                                <p>Chat is open in the side panel!</p>
                            </div>
                        </div>
                    )}
                </aside>

                {/* Editor Main */}
                <main className="vscode-main">
                    <div className="editor-tabs">
                        {openTabs.map(tab => (
                            <div
                                key={tab}
                                className={`tab ${activeFile === tab ? 'active' : ''}`}
                                onClick={() => setActiveFile(tab)}
                            >
                                {tab.endsWith('.md') ? <FileText size={14} /> : <FileCode size={14} />}
                                <span>{tab}</span>
                                <div className="close-tab" onClick={(e) => closeTab(e, tab)}>×</div>
                            </div>
                        ))}
                    </div>

                    <div className="editor-view">
                        {activeFile ? (
                            <div className="code-renderer">
                                {highlightCode(CODE_SNIPPETS[activeFile], activeFile)}
                            </div>
                        ) : (
                            <div className="editor-empty">
                                <div className="vscode-logo-watermark">
                                    <FileCode size={300} strokeWidth={0.5} />
                                </div>
                                <div className="shortcuts-list">
                                    {SHORTCUTS.map((s, i) => (
                                        <div key={i} className="shortcut-item">
                                            <span className="shortcut-label">{s.label}</span>
                                            <div className="shortcut-keys">
                                                {s.keys.map((k, j) => (
                                                    <span key={j} className="key">{k}</span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <footer className="editor-status-bar">
                        <div className="status-left">
                            <div className="status-item remote"><Radio size={12} /></div>
                            <div className="status-item"><GitBranch size={12} /> main*</div>
                            <div className="status-item"><X size={12} /> 0 <Bell size={12} /> 0</div>
                        </div>
                        <div className="status-right">
                            <div className="status-item"><Check size={12} /> Prettier</div>
                            <div className="status-item"><Radio size={12} /> Go Live</div>
                            <div className="status-item"><Clock size={12} /> 4h 9m</div>
                            <div className="status-item">Flow</div>
                        </div>
                    </footer>
                </main>

                {/* AI Chat Sidebar (Copilot-style) */}
                {isChatOpen && (
                    <aside className="vscode-chat-sidebar">
                        <div className="chat-header">
                            <div className="chat-header-left">
                                <Sparkles size={14} />
                                <span>CHAT</span>
                            </div>
                            <div className="chat-header-right">
                                <X size={16} onClick={() => setIsChatOpen(false)} style={{ cursor: 'pointer' }} />
                            </div>
                        </div>

                        <div className="chat-messages">
                            {messages.length === 0 ? (
                                <div className="chat-welcome">
                                    <Sparkles size={32} className="welcome-icon" />
                                    <h3>Build with Agent</h3>
                                    <p>AI responses may be inaccurate. Ask about Raj's codebase or skills.</p>
                                    <div className="chat-suggestions">
                                        <button onClick={() => setChatInput("Tell me about Raj")}>Tell me about Raj</button>
                                        <button onClick={() => setChatInput("Show projects")}>Show projects</button>
                                    </div>
                                </div>
                            ) : (
                                messages.map((msg, i) => (
                                    <div key={i} className={`chat-message ${msg.role}`}>
                                        <div className="message-header">
                                            {msg.role === 'assistant' ? <Sparkles size={12} /> : <CircleUser size={12} />}
                                            <span>{msg.role === 'assistant' ? 'Agent' : 'You'}</span>
                                        </div>
                                        <div className="message-content">
                                            {msg.content.split('\n').map((line, idx) => (
                                                <div key={idx}>{line}</div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                            {isChatLoading && (
                                <div className="chat-message assistant loading">
                                    <Loader size={16} className="spinner" />
                                    <span>Thinking...</span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>

                        <div className="chat-input-container">
                            <div className="chat-input-wrapper">
                                <textarea
                                    placeholder="Describe what to build next"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={handleChatKeyPress}
                                    rows={1}
                                />
                                <div className="chat-input-actions">
                                    <button className="send-btn" onClick={handleSendChat} disabled={!chatInput.trim() || isChatLoading}>
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                )}
            </div>
        </div>
    );
}

export default VSCodeApp;
