import React, { useState } from "react";
import "./SettingsApp.css";
import { useSettings } from "../../context/SettingsContext";
import {
    Monitor,
    Navigation,
    Terminal as TerminalIcon,
    Folder,
    FileText,
    Mail,
    Info,
    ChevronRight,
    Sun,
    Moon,
    Wifi,
    Bluetooth,
    Globe,
    Shield,
    Battery,
    Search,
    User,
    Settings as SettingsIcon,
    Accessibility,
    Palette,
    Wallpaper as WallpaperIcon,
    Speaker,
    Bell,
    Clock,
    Skull,
    History,
    HardDrive,
    BadgeCheck,
    RefreshCw,
    LogIn,
    Share2,
    ChevronLeft,
    ArrowRightLeft,
    Code,
    Briefcase,
    FileDown,
    Eye,
    Zap,
    Cpu,
    Timer,
    CheckCircle2
} from "lucide-react";

/** constants outside to avoid re-creation but within the same file scope **/
const SIDEBAR_GROUPS = [
    {
        id: "networking",
        items: [
            { id: "wifi", label: "Wi-Fi", icon: Wifi, color: "#007aff" },
            { id: "bluetooth", label: "Bluetooth", icon: Bluetooth, color: "#007aff" },
            { id: "network", label: "Network", icon: Globe, color: "#007aff" },
            { id: "battery", label: "Battery", icon: Battery, color: "#34c759" },
        ]
    },
    {
        id: "system",
        items: [
            { id: "general", label: "General", icon: SettingsIcon, color: "#8e8e93" },
            { id: "appearance", label: "Appearance", icon: Palette, color: "#34c759" },
            { id: "wallpaper", label: "Wallpaper", icon: WallpaperIcon, color: "#00a2ff" },
            { id: "dock", label: "Desktop & Dock", icon: Navigation, color: "#5856d6" },
        ]
    },
    {
        id: "personal",
        items: [
            { id: "notifications", label: "Notifications", icon: Bell, color: "#ff3b30" },
            { id: "sound", label: "Sound", icon: Speaker, color: "#ff3b30" },
            { id: "focus", label: "Focus", icon: Moon, color: "#5856d6" },
            { id: "screentime", label: "Screen Time", icon: Clock, color: "#5856d6" },
            { id: "terminal", label: "Terminal", icon: TerminalIcon, color: "#8e8e93" },
        ]
    }
];

const SETTINGS_SECTIONS = [
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "desktop", label: "Desktop", icon: Monitor },
    { id: "dock", label: "Dock", icon: Navigation },
    { id: "terminal", label: "Terminal", icon: TerminalIcon },
    { id: "finder", label: "Finder", icon: Folder },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "mail", label: "Mail", icon: Mail },
    { id: "about", label: "About System", icon: Info },
];

const ProgressBar = ({ value, label, color }) => (
    <div className="settings-progress-row">
        <div className="progress-info">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="progress-track">
            <div
                className="progress-fill"
                style={{ width: `${value}%`, backgroundColor: color }}
            />
        </div>
    </div>
);

const Toggle = ({ enabled, onToggle }) => (
    <button
        className={`mac-toggle ${enabled ? "enabled" : ""}`}
        onClick={() => onToggle(!enabled)}
    >
        <div className="toggle-handle" />
    </button>
);

const SettingsApp = () => {
    const [activeSection, setActiveSection] = useState("general");
    const [searchQuery, setSearchQuery] = useState("");
    const { settings, updateSetting } = useSettings();

    const renderHeader = (title, icon, description) => {
        const Icon = icon;
        return (
            <div className="section-header">
                <div className="section-header-icon">
                    <Icon size={40} />
                </div>
                <div className="section-header-text">
                    <h1>{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        );
    };

    const renderListItem = (label, icon, onClick) => {
        const Icon = icon;
        return (
            <div className="settings-list-item" onClick={onClick}>
                <div className="item-left">
                    {Icon && <div className="item-icon"><Icon size={16} /></div>}
                    <span>{label}</span>
                </div>
                <ChevronRight size={14} className="chevron" />
            </div>
        );
    };

    const renderSection = () => {
        switch (activeSection) {
            case "general":
                return (
                    <div className="settings-content">
                        {renderHeader("General", SettingsIcon, "Configure Raj Koli's profile, skills, and professional preferences.")}

                        <div className="settings-list-box">
                            {renderListItem("About Me", Info)}
                            {renderListItem("Skills & Tech Stack", Code)}
                            {renderListItem("Experience", Briefcase)}
                        </div>

                        <div className="settings-list-box">
                            {renderListItem("View Featured Projects", Folder)}
                            <div className="settings-list-item">
                                <div className="item-left">
                                    <div className="item-icon"><FileText size={16} /></div>
                                    <span>Resume</span>
                                </div>
                                <div className="item-actions">
                                    <button className="mac-btn small primary">View</button>
                                    <button className="mac-btn small">Download</button>
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <label>Availability</label>
                            <div className="settings-row-stack">
                                <div className="settings-row">
                                    <span>Available for Freelance</span>
                                    <Toggle
                                        enabled={settings.availability?.freelance}
                                        onToggle={(val) => updateSetting("availability", "freelance", val)}
                                    />
                                </div>
                                <div className="settings-row">
                                    <span>Open to Full-Time Roles</span>
                                    <Toggle
                                        enabled={settings.availability?.fullTime}
                                        onToggle={(val) => updateSetting("availability", "fullTime", val)}
                                    />
                                </div>
                                <div className="settings-row">
                                    <span>Remote Friendly</span>
                                    <Toggle
                                        enabled={settings.availability?.remote}
                                        onToggle={(val) => updateSetting("availability", "remote", val)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <label>Contact Preferences</label>
                            <div className="settings-row">
                                <span>Preferred Email</span>
                                <span className="settings-value-text">2024.rajk@isu.ac.in</span>
                            </div>
                            <div className="settings-row">
                                <span>Auto-reply enabled</span>
                                <Toggle
                                    enabled={settings.contact?.autoReply}
                                    onToggle={(val) => updateSetting("contact", "autoReply", val)}
                                />
                            </div>
                            <div className="settings-row">
                                <span>Typical Response Time</span>
                                <span className="settings-value-text">{settings.contact?.responseTime}</span>
                            </div>
                        </div>
                    </div>
                );
            case "appearance":
                return (
                    <div className="settings-content">
                        {renderHeader("Appearance", Palette, "Customize how your desktop looks and behaves.")}
                        <div className="settings-group-card">
                            <label>Appearance</label>
                            <div className="theme-selector">
                                <div
                                    className={`theme-option ${settings.appearance.theme === "light" ? "active" : ""}`}
                                    onClick={() => updateSetting("appearance", "theme", "light")}
                                >
                                    <div className="theme-preview light">
                                        <div className="p-top"></div>
                                        <div className="p-side"></div>
                                    </div>
                                    <span>Light</span>
                                </div>
                                <div
                                    className={`theme-option ${settings.appearance.theme === "dark" ? "active" : ""}`}
                                    onClick={() => updateSetting("appearance", "theme", "dark")}
                                >
                                    <div className="theme-preview dark">
                                        <div className="p-top"></div>
                                        <div className="p-side"></div>
                                    </div>
                                    <span>Dark</span>
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <label>Accent Color</label>
                                <div className="accent-colors">
                                    {["blue", "purple", "green", "orange"].map(color => (
                                        <div
                                            key={color}
                                            className={`accent-circle ${color} ${settings.appearance.accentColor === color ? "active" : ""}`}
                                            onClick={() => updateSetting("appearance", "accentColor", color)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <label>Reduce Motion</label>
                                <Toggle
                                    enabled={settings.appearance.reduceMotion}
                                    onToggle={(val) => updateSetting("appearance", "reduceMotion", val)}
                                />
                            </div>
                        </div>
                    </div>
                );
            case "dock":
                return (
                    <div className="settings-content">
                        {renderHeader("Desktop & Dock", Navigation, "Manage settings for your Dock and desktop environment.")}

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <label>Position on screen</label>
                                <select
                                    value={settings.dock.position}
                                    onChange={(e) => updateSetting("dock", "position", e.target.value)}
                                >
                                    <option value="bottom">Bottom</option>
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <label>Size</label>
                            <input
                                type="range"
                                min="32" max="80"
                                value={settings.dock.iconSize}
                                onChange={(e) => updateSetting("dock", "iconSize", parseInt(e.target.value))}
                            />
                        </div>

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <label>Magnification</label>
                                <Toggle
                                    enabled={settings.dock.magnification}
                                    onToggle={(val) => updateSetting("dock", "magnification", val)}
                                />
                            </div>
                        </div>
                    </div>
                );
            case "wallpaper":
                return (
                    <div className="settings-content">
                        {renderHeader("Wallpaper", WallpaperIcon, "Choose a desktop picture or solid color.")}
                        <div className="wallpaper-grid-large">
                            {["default", "peak", "ocean", "minimal"].map(wp => (
                                <div
                                    key={wp}
                                    className={`wallpaper-card ${wp} ${settings.desktop.wallpaper === wp ? "active" : ""}`}
                                    onClick={() => updateSetting("desktop", "wallpaper", wp)}
                                >
                                    <div className="wp-thumb" />
                                    <span>{wp.charAt(0).toUpperCase() + wp.slice(1)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case "battery":
                return (
                    <div className="settings-content">
                        {renderHeader("Battery", Battery, "Monitor Raj's work energy, endurance, and productivity cycles.")}

                        <div className="settings-group-card">
                            <label>Performance Metrics</label>
                            <div className="settings-progress-list">
                                <ProgressBar label="Work Energy Level" value={98} color="#34c759" />
                                <ProgressBar label="Coding Endurance" value={85} color="#007aff" />
                                <ProgressBar label="Deep Work Focus" value={92} color="#af52de" />
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <label>Peak Productivity Hours</label>
                                <span className="settings-value-text">9 PM - 3 AM</span>
                            </div>
                            <div className="settings-row">
                                <label>Low Latency Response</label>
                                <Toggle enabled={true} onToggle={() => { }} />
                            </div>
                        </div>
                    </div>
                );
            case "terminal":
                return (
                    <div className="settings-content">
                        {renderHeader("Terminal", TerminalIcon, "Simulate developer commands to explore the profile via CLI.")}

                        <div className="terminal-preview-box">
                            <div className="term-header">
                                <div className="term-dot red" />
                                <div className="term-dot yellow" />
                                <div className="term-dot green" />
                                <span className="term-title">rajkoli — -zsh</span>
                            </div>
                            <div className="term-body">
                                <div className="term-line"><span className="term-prompt">~</span> whoami</div>
                                <div className="term-out">Raj Koli | Frontend Developer | UI/UX Enthusiast</div>
                                <div className="term-line"><span className="term-prompt">~</span> skills</div>
                                <div className="term-out">React, Next.js, JavaScript, CSS, Node.js, AI Prompting</div>
                                <div className="term-line"><span className="term-prompt">~</span> projects --featured</div>
                                <div className="term-out">1. macOS Portfolio (Running)</div>
                                <div className="term-out">2. RealityCheck SaaS</div>
                                <div className="term-out">3. Spotify Clone Pro</div>
                                <div className="term-line"><span className="term-prompt">~</span> <span className="term-cursor">_</span></div>
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <label>Prompt Theme</label>
                                <select value={settings.terminal.promptStyle} onChange={(e) => updateSetting("terminal", "promptStyle", e.target.value)}>
                                    <option value="minimal">Minimal</option>
                                    <option value="powerline">Powerline</option>
                                    <option value="classic">Classic</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="settings-content placeholder">
                        {renderHeader(
                            activeSection.charAt(0).toUpperCase() + activeSection.slice(1),
                            SettingsIcon,
                            "Configuration options for this section."
                        )}
                        <div className="settings-list-box">
                            <p className="placeholder-text">This section is currently under development.</p>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="settings-app">
            <aside className="settings-sidebar">
                <div className="sidebar-top">
                    <div className="sidebar-search">
                        <Search size={14} className="search-icon" />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="sidebar-profile">
                        <div className="avatar">
                            <Skull size={32} />
                        </div>
                        <div className="profile-info">
                            <span className="name">Raj Koli</span>
                            <span className="subtitle">Frontend Developer</span>
                        </div>
                    </div>
                </div>

                <div className="sidebar-scrollable">
                    {SIDEBAR_GROUPS.map((group, gIdx) => (
                        <div key={group.id} className="sidebar-group">
                            {group.items.map(item => (
                                <div
                                    key={item.id}
                                    className={`sidebar-item ${activeSection === item.id ? "active" : ""}`}
                                    onClick={() => setActiveSection(item.id)}
                                >
                                    <div className="item-icon-wrapper" style={{ backgroundColor: item.color }}>
                                        <item.icon size={14} />
                                    </div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                            {gIdx < SIDEBAR_GROUPS.length - 1 && <div className="sidebar-separator" />}
                        </div>
                    ))}

                    <div className="sidebar-separator" />
                    <div className="sidebar-group">
                        {SETTINGS_SECTIONS.filter(s => !SIDEBAR_GROUPS.some(g => g.items.some(i => i.id === s.id))).map(section => (
                            <div
                                key={section.id}
                                className={`sidebar-item ${activeSection === section.id ? "active" : ""}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <div className="item-icon-wrapper grey">
                                    <section.icon size={14} />
                                </div>
                                <span>{section.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>
            <main className="settings-main">
                <nav className="settings-nav">
                    <div className="nav-buttons">
                        <button className="nav-btn"><ChevronLeft size={18} /></button>
                        <button className="nav-btn disabled"><ChevronRight size={18} /></button>
                    </div>
                </nav>
                <div className="main-scrollable">
                    {renderSection()}
                </div>
            </main>
        </div>
    );
};

export default SettingsApp;
