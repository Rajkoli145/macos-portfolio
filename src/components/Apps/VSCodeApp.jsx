import { useState } from "react";
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
    CircleUser
} from "lucide-react";

const FILE_STRUCTURE = [
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
        name: "components",
        type: "folder",
        children: [
            { name: "Window.tsx", type: "file", language: "typescript" },
            { name: "Dock.tsx", type: "file", language: "typescript" },
        ]
    },
    {
        name: "styles",
        type: "folder",
        children: [
            { name: "theme.css", type: "file", language: "css" },
        ]
    },
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
    "README.md": `# Portfolio Tech Stack

Built with purpose and restraint.

- **React 19**: Modern UI rendering
- **Vite**: Ultra-fast development
- **CSS3**: Pure custom styling
- **Lucide**: Clean iconography

*"Code is a liability. Write less, deliver more."*`
};

function VSCodeApp() {
    const [activeFile, setActiveFile] = useState("README.md");
    const [openFolders, setOpenFolders] = useState(["apps", "components", "styles"]);
    const [openTabs, setOpenTabs] = useState(["README.md", "Window.tsx", "Dock.tsx"]);

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
        return data.map((item) => {
            if (item.type === "folder") {
                const isOpen = openFolders.includes(item.name);
                return (
                    <div key={item.name}>
                        <div
                            className="explorer-item folder"
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
        });
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
        <div className="vscode-container">
            {/* Activity Bar */}
            <aside className="vscode-activity-bar">
                <div className="activity-top">
                    <div className="activity-icon active"><Files size={24} /></div>
                    <div className="activity-icon"><Search size={24} /></div>
                    <div className="activity-icon"><GitBranch size={24} /></div>
                    <div className="activity-icon"><LayoutGrid size={24} /></div>
                </div>
                <div className="activity-bottom">
                    <div className="activity-icon"><CircleUser size={24} /></div>
                    <div className="activity-icon"><Settings size={24} /></div>
                </div>
            </aside>

            {/* Sidebar Explorer */}
            <aside className="vscode-sidebar">
                <div className="sidebar-header">EXPLORER</div>
                <div className="explorer-section">
                    <div className="section-title">
                        <ChevronDown size={14} />
                        <span>PORTFOLIO</span>
                    </div>
                    <div className="explorer-tree">
                        {renderExplorer(FILE_STRUCTURE)}
                    </div>
                </div>
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
                                <FileCode size={120} opacity={0.1} />
                            </div>
                        </div>
                    )}
                </div>

                <footer className="editor-status-bar">
                    <div className="status-left">
                        <div className="status-item"><GitBranch size={12} /> main*</div>
                        <div className="status-item">0 ⚠ 0 ⓧ</div>
                    </div>
                    <div className="status-right">
                        <div className="status-item">UTF-8</div>
                        <div className="status-item">{activeFile?.endsWith('.md') ? 'Markdown' : 'TypeScript JSX'}</div>
                        <div className="status-item">Prettier</div>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default VSCodeApp;
