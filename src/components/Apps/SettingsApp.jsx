import React, { useState } from "react";
import "./SettingsApp.css";
import { useSettings } from "../../context/SettingsContext";
import {
    Monitor,
    Layers,
    Navigation,
    Terminal as TerminalIcon,
    Folder,
    FileText,
    Mail,
    Info,
    ChevronRight,
    Sun,
    Moon,
    ToggleLeft,
    ToggleRight
} from "lucide-react";

const SETTINGS_SECTIONS = [
    { id: "appearance", label: "Appearance", icon: Layers },
    { id: "desktop", label: "Desktop", icon: Monitor },
    { id: "dock", label: "Dock", icon: Navigation },
    { id: "terminal", label: "Terminal", icon: TerminalIcon },
    { id: "finder", label: "Finder", icon: Folder },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "mail", label: "Mail", icon: Mail },
    { id: "about", label: "About System", icon: Info },
];

const Toggle = ({ enabled, onToggle }) => (
    <button
        className={`mac-toggle ${enabled ? "enabled" : ""}`}
        onClick={() => onToggle(!enabled)}
    >
        <div className="toggle-handle" />
    </button>
);

const SettingsApp = () => {
    const [activeSection, setActiveSection] = useState("appearance");
    const { settings, updateSetting } = useSettings();

    const renderSection = () => {
        switch (activeSection) {
            case "appearance":
                return (
                    <div className="settings-content">
                        <h2>Appearance</h2>
                        <div className="settings-group">
                            <label>Theme</label>
                            <div className="segmented-control">
                                <button
                                    className={settings.appearance.theme === "light" ? "active" : ""}
                                    onClick={() => updateSetting("appearance", "theme", "light")}
                                >
                                    <Sun size={14} /> Light
                                </button>
                                <button
                                    className={settings.appearance.theme === "dark" ? "active" : ""}
                                    onClick={() => updateSetting("appearance", "theme", "dark")}
                                >
                                    <Moon size={14} /> Dark
                                </button>
                            </div>
                        </div>
                        <div className="settings-group">
                            <label>Accent Color</label>
                            <div className="color-grid">
                                {["blue", "purple", "green", "orange"].map(color => (
                                    <button
                                        key={color}
                                        className={`color-btn ${color} ${settings.appearance.accentColor === color ? "active" : ""}`}
                                        onClick={() => updateSetting("appearance", "accentColor", color)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="settings-group">
                            <label>Window Transparency</label>
                            <div className="slider-box">
                                <input
                                    type="range"
                                    min="20" max="100"
                                    value={settings.appearance.transparency}
                                    onChange={(e) => updateSetting("appearance", "transparency", parseInt(e.target.value))}
                                />
                                <span>{settings.appearance.transparency}%</span>
                            </div>
                        </div>
                        <div className="settings-group row">
                            <label>Reduce Motion</label>
                            <Toggle
                                enabled={settings.appearance.reduceMotion}
                                onToggle={(val) => updateSetting("appearance", "reduceMotion", val)}
                            />
                        </div>
                    </div>
                );
            case "desktop":
                return (
                    <div className="settings-content">
                        <h2>Desktop</h2>
                        <div className="settings-group">
                            <label>Wallpaper</label>
                            <div className="wallpaper-grid">
                                {["default", "peak", "ocean", "minimal"].map(wp => (
                                    <div
                                        key={wp}
                                        className={`wallpaper-thumb ${wp} ${settings.desktop.wallpaper === wp ? "active" : ""}`}
                                        onClick={() => updateSetting("desktop", "wallpaper", wp)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="settings-group row">
                            <label>Show Desktop Icons</label>
                            <Toggle
                                enabled={settings.desktop.showIcons}
                                onToggle={(val) => updateSetting("desktop", "showIcons", val)}
                            />
                        </div>
                        <div className="settings-group">
                            <label>Clock Format</label>
                            <select
                                value={settings.desktop.clockFormat}
                                onChange={(e) => updateSetting("desktop", "clockFormat", e.target.value)}
                            >
                                <option value="12h">12-hour</option>
                                <option value="24h">24-hour</option>
                            </select>
                        </div>
                    </div>
                );
            case "dock":
                return (
                    <div className="settings-content">
                        <h2>Dock</h2>
                        <div className="settings-group">
                            <label>Position</label>
                            <select
                                value={settings.dock.position}
                                onChange={(e) => updateSetting("dock", "position", e.target.value)}
                            >
                                <option value="bottom">Bottom</option>
                                <option value="left">Left</option>
                                <option value="right">Right</option>
                            </select>
                        </div>
                        <div className="settings-group">
                            <label>Icon Size</label>
                            <div className="slider-box">
                                <input
                                    type="range"
                                    min="40" max="80"
                                    value={settings.dock.iconSize}
                                    onChange={(e) => updateSetting("dock", "iconSize", parseInt(e.target.value))}
                                />
                                <span>{settings.dock.iconSize}px</span>
                            </div>
                        </div>
                        <div className="settings-group row">
                            <label>Magnification</label>
                            <Toggle
                                enabled={settings.dock.magnification}
                                onToggle={(val) => updateSetting("dock", "magnification", val)}
                            />
                        </div>
                        <div className="settings-group row">
                            <label>Show Recent Apps</label>
                            <Toggle
                                enabled={settings.dock.showRecents}
                                onToggle={(val) => updateSetting("dock", "showRecents", val)}
                            />
                        </div>
                    </div>
                );
            case "terminal":
                return (
                    <div className="settings-content">
                        <h2>Terminal</h2>
                        <div className="settings-group">
                            <label>Font Size</label>
                            <select
                                value={settings.terminal.fontSize}
                                onChange={(e) => updateSetting("terminal", "fontSize", e.target.value)}
                            >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                            </select>
                        </div>
                        <div className="settings-group">
                            <label>Prompt Style</label>
                            <select
                                value={settings.terminal.promptStyle}
                                onChange={(e) => updateSetting("terminal", "promptStyle", e.target.value)}
                            >
                                <option value="minimal">Minimal ($)</option>
                                <option value="powerline">Powerline</option>
                                <option value="classic">Classic (user@host)</option>
                            </select>
                        </div>
                        <div className="settings-group">
                            <label>Typing Speed</label>
                            <input
                                type="range"
                                min="10" max="100"
                                value={settings.terminal.typingSpeed}
                                onChange={(e) => updateSetting("terminal", "typingSpeed", parseInt(e.target.value))}
                            />
                        </div>
                        <div className="settings-group row">
                            <label>Clear on Close</label>
                            <Toggle
                                enabled={settings.terminal.clearOnClose}
                                onToggle={(val) => updateSetting("terminal", "clearOnClose", val)}
                            />
                        </div>
                    </div>
                );
            case "about":
                return (
                    <div className="settings-content about-section">
                        <div className="about-header">
                            <div className="system-logo"></div>
                            <h2>macOS Web Edition</h2>
                            <p>Version 1.0.0 (Portfolio Build)</p>
                        </div>
                        <div className="details-list">
                            <div className="detail-item">
                                <span className="label">Developer</span>
                                <span className="value">Raj Koli</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Stack</span>
                                <span className="value">React, Lucide, CSS Modules</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Build Date</span>
                                <span className="value">January 2026</span>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="settings-content">
                        <h2>{activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Settings</h2>
                        <p className="placeholder-text">This section contains settings for {activeSection}. Future version will include more toggles.</p>
                    </div>
                );
        }
    };

    return (
        <div className="settings-app">
            <aside className="settings-sidebar">
                <div className="sidebar-list">
                    {SETTINGS_SECTIONS.map(section => (
                        <div
                            key={section.id}
                            className={`sidebar-item ${activeSection === section.id ? "active" : ""}`}
                            onClick={() => setActiveSection(section.id)}
                        >
                            <div className={`icon-box ${section.id}`}>
                                <section.icon size={16} />
                            </div>
                            <span>{section.label}</span>
                        </div>
                    ))}
                </div>
            </aside>
            <main className="settings-main">
                {renderSection()}
            </main>
        </div>
    );
};

export default SettingsApp;
