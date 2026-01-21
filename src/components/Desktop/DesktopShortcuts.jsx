import React from 'react';
import { useSettings } from '../../context/SettingsContext';
import { Globe, FileText, Github, Linkedin, Mail, Zap } from 'lucide-react';

const DesktopShortcuts = ({ onOpenApp, onShowShortcuts }) => {
    const { settings } = useSettings();

    if (!settings.desktop.showIcons) return null;

    const shortcuts = [
        { id: 'projects', name: 'My Projects', icon: Globe, color: '#007aff', action: () => onOpenApp('safari', 'Safari') },
        { id: 'about', name: 'About Me', icon: FileText, color: '#ffcc00', action: () => onOpenApp('finder', 'Finder') },
        { id: 'skills', name: 'My Skills', icon: Zap, color: '#ff9500', action: () => onOpenApp('terminal', 'Terminal') },
        { id: 'github', name: 'GitHub', icon: Github, color: '#fff', action: () => window.open('https://github.com/Rajkoli145', '_blank') },
        { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, color: '#007aff', action: () => window.open('https://www.linkedin.com/in/raj-koli-626008318/', '_blank') },
        { id: 'shortcut-help', name: 'Shortcuts Help', icon: FileText, color: '#34c759', action: onShowShortcuts },
    ];

    return (
        <div className="desktop-shortcuts">
            {shortcuts.map(item => (
                <div
                    key={item.id}
                    className="desktop-icon"
                    onDoubleClick={item.action}
                >
                    <div className="icon-main">
                        <item.icon size={32} strokeWidth={1.5} style={{ color: item.color }} />
                    </div>
                    <span className="icon-text">{item.name}</span>
                </div>
            ))}

            <style jsx="true">{`
                .desktop-shortcuts {
                    position: absolute;
                    top: 60px;
                    right: 20px;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                    z-index: 1;
                }
                .desktop-icon {
                    width: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 6px;
                    cursor: default;
                    user-select: none;
                    transition: all 0.2s;
                    padding: 8px;
                    border-radius: 8px;
                }
                .desktop-icon:hover {
                    background: rgba(255, 255, 255, 0.1);
                }
                .desktop-icon:active {
                    background: rgba(255, 255, 255, 0.2);
                }
                .icon-main {
                    width: 50px;
                    height: 50px;
                    background: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(10px);
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 0.5px solid rgba(255, 255, 255, 0.1);
                    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
                }
                .icon-text {
                    font-size: 11px;
                    font-weight: 500;
                    color: white;
                    text-align: center;
                    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.8);
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            `}</style>
        </div>
    );
};

export default DesktopShortcuts;
