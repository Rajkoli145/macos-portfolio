import React from 'react';
import { X } from 'lucide-react';

const ShortcutsHelp = ({ onClose }) => {
    const shortcutGroups = [
        {
            title: "System",
            items: [
                { keys: ["⌘", "L"], action: "Lock Screen" },
                { keys: ["⌘", "⇧", "Q"], action: "Log Out" },
                { keys: ["⌘", "Space"], action: "Spotlight Search" },
                { keys: ["⌃", "⌘", "F"], action: "Enter Full Screen" },
            ]
        },
        {
            title: "Window Management",
            items: [
                { keys: ["⌘", "W"], action: "Close Window" },
                { keys: ["⌘", "M"], action: "Minimize Window" },
                { keys: ["⌘", "Q"], action: "Quit App" },
                { keys: ["⌘", "Tab"], action: "Switch Apps" },
            ]
        },
        {
            title: "Finder & Files",
            items: [
                { keys: ["⌘", "N"], action: "New Window" },
                { keys: ["⌘", "⇧", "N"], action: "New Folder" },
                { keys: ["⌘", "Delete"], action: "Move to Trash" },
                { keys: ["⌘", "I"], action: "Get Info" },
            ]
        }
    ];

    return (
        <div className="shortcuts-help-overlay" onClick={onClose}>
            <div className="shortcuts-help-panel" onClick={e => e.stopPropagation()}>
                <header className="shortcuts-header">
                    <h2>Keyboard Shortcuts</h2>
                    <button className="close-btn" onClick={onClose}><X size={18} /></button>
                </header>
                <div className="shortcuts-body">
                    {shortcutGroups.map((group, idx) => (
                        <section key={idx} className="shortcut-group">
                            <h3>{group.title}</h3>
                            <div className="shortcut-list">
                                {group.items.map((item, iIdx) => (
                                    <div key={iIdx} className="shortcut-item">
                                        <span className="shortcut-action">{item.action}</span>
                                        <div className="shortcut-keys">
                                            {item.keys.map((key, kIdx) => (
                                                <React.Fragment key={kIdx}>
                                                    <kbd>{key}</kbd>
                                                    {kIdx < item.keys.length - 1 && <span className="key-plus">+</span>}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
                <footer className="shortcuts-footer">
                    <p>Pro Tip: Use <kbd>⌘</kbd> + <kbd>L</kbd> anytime to lock your screen!</p>
                </footer>
            </div>

            <style jsx="true">{`
                .shortcuts-help-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0,0,0,0.3);
                    backdrop-filter: blur(5px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                    animation: fadeIn 0.2s ease-out;
                }
                .shortcuts-help-panel {
                    background: rgba(45, 45, 48, 0.85);
                    backdrop-filter: blur(30px) saturate(180%);
                    border: 0.5px solid rgba(255,255,255,0.2);
                    border-radius: 12px;
                    width: 480px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                    color: white;
                    overflow: hidden;
                    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
                }
                .shortcuts-header {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 0.5px solid rgba(255,255,255,0.1);
                }
                .shortcuts-header h2 {
                    margin: 0;
                    font-size: 16px;
                    font-weight: 600;
                }
                .close-btn {
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.6);
                    cursor: pointer;
                    padding: 4px;
                    display: flex;
                    transition: color 0.2s;
                }
                .close-btn:hover { color: white; }
                .shortcuts-body {
                    padding: 20px;
                    max-height: 400px;
                    overflow-y: auto;
                }
                .shortcut-group { margin-bottom: 24px; }
                .shortcut-group h3 {
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    color: rgba(255,255,255,0.4);
                    margin-bottom: 12px;
                }
                .shortcut-list {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .shortcut-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .shortcut-action { font-size: 13.5px; color: rgba(255,255,255,0.9); }
                .shortcut-keys { display: flex; align-items: center; gap: 4px; }
                kbd {
                    background: rgba(255,255,255,0.1);
                    border: 0.5px solid rgba(255,255,255,0.2);
                    border-radius: 4px;
                    padding: 2px 6px;
                    min-width: 24px;
                    text-align: center;
                    font-size: 11px;
                    font-weight: 500;
                    box-shadow: 0 1px 0 rgba(0,0,0,0.2);
                }
                .key-plus { color: rgba(255,255,255,0.3); font-size: 12px; }
                .shortcuts-footer {
                    padding: 12px 20px;
                    background: rgba(0,0,0,0.1);
                    border-top: 0.5px solid rgba(255,255,255,0.1);
                }
                .shortcuts-footer p {
                    margin: 0;
                    font-size: 11px;
                    color: rgba(255,255,255,0.5);
                    text-align: center;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default ShortcutsHelp;
