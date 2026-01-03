import React, { useState } from "react";
import "./SettingsApp.css";
import { useSettings } from "../../context/SettingsContext";
import {
    Monitor,
    Navigation,
    Compass,
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
        id: "apple-section",
        items: [
            { id: "general", label: "General", icon: SettingsIcon, color: "#8e8e93" },
            { id: "appearance", label: "Appearance", icon: Palette, color: "#34c759" },
            { id: "dock", label: "Desktop & Dock", icon: Navigation, color: "#5856d6" },
        ]
    },
    {
        id: "preferences-section",
        items: [
            { id: "notifications", label: "Notifications", icon: Bell, color: "#ff3b30" },
            { id: "terminal", label: "Terminal", icon: TerminalIcon, color: "#1c1c1e" },
        ]
    },
    {
        id: "apps-section",
        items: [
            { id: "notes", label: "Notes", icon: FileText, color: "#ffcc00" },
            { id: "mail", label: "Mail", icon: Mail, color: "#007aff" },
        ]
    },
    {
        id: "info-section",
        items: [
            { id: "about_portfolio", label: "About Portfolio", icon: Info, color: "#8e8e93" },
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

    const renderHeader = (title, icon, subtitle) => (
        <div className="render-header-container">
            <div className="header-icon-wrapper">
                {React.createElement(icon, { size: 32 })}
            </div>
            <div className="header-text-content">
                <h1>{title}</h1>
                <p className="header-subtitle">{subtitle}</p>
            </div>
        </div>
    );

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
                        {renderHeader("General", SettingsIcon, "Professional profile and configurations.")}

                        <div className="settings-group-label">About Me</div>
                        <div className="settings-group-card">
                            <div className="settings-row" style={{ padding: '0 16px 12px 16px' }}>
                                <p className="section-description-text">
                                    I am a passionate Frontend Developer with a focus on building immersive web experiences.
                                    I love working with React, modern CSS, and exploring the boundaries of UI/UX design.
                                </p>
                            </div>
                        </div>

                        <div className="settings-group-label">Professional Info</div>
                        <div className="settings-list-box">
                            {renderListItem("Skills & Tech Stack", Code)}
                            {renderListItem("Experience", Briefcase)}
                            {renderListItem("View Featured Projects", Folder)}
                        </div>

                        <div className="settings-group-label">Resume</div>
                        <div className="settings-group-card">
                            <div className="settings-list-item">
                                <div className="item-left">
                                    <div className="item-icon"><FileText size={16} /></div>
                                    <span>Download Latest Resume</span>
                                </div>
                                <div className="item-actions">
                                    <button className="mac-btn primary">View</button>
                                    <button className="mac-btn">Download</button>
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-label">Availability</div>
                        <div className="settings-group-card">
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
                );
            case "appearance":
                return (
                    <div className="settings-content">
                        {renderHeader("Appearance", Palette, "Customize how your desktop looks and behaves.")}
                        <div className="settings-group-label">Appearance Theme</div>
                        <div className="settings-group-card">
                            <div className="theme-selector">
                                <div
                                    className={`theme-option ${settings.appearance.theme === "light" ? "active" : ""}`}
                                    onClick={() => updateSetting("appearance", "theme", "light")}
                                >
                                    <div className="theme-preview light" />
                                    <span>Light</span>
                                </div>
                                <div
                                    className={`theme-option ${settings.appearance.theme === "dark" ? "active" : ""}`}
                                    onClick={() => updateSetting("appearance", "theme", "dark")}
                                >
                                    <div className="theme-preview dark" />
                                    <span>Dark</span>
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-label">Accent Color</div>
                        <div className="settings-group-card" style={{ padding: '4px 12px' }}>
                            <div className="accent-color-grid">
                                {["blue", "purple", "green", "orange"].map(color => (
                                    <div
                                        key={color}
                                        className={`accent-dot ${color} ${settings.appearance.accentColor === color ? "active" : ""}`}
                                        onClick={() => updateSetting("appearance", "accentColor", color)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="settings-group-card">
                            <div className="settings-row">
                                <span>Window Transparency</span>
                                <Toggle
                                    enabled={settings.appearance.transparency > 0}
                                    onToggle={(val) => updateSetting("appearance", "transparency", val ? 80 : 0)}
                                />
                            </div>
                            <div className="settings-row">
                                <span>Reduce Motion</span>
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
                        {renderHeader("Desktop & Dock", Compass, "Manage settings for your Dock and desktop environment.")}

                        <div className="settings-group-label">DOCK</div>
                        <div className="settings-group-card">
                            <div className="slider-group-row">
                                <div className="slider-column">
                                    <span className="slider-label">Size</span>
                                    <div className="mac-range-container">
                                        <input
                                            type="range"
                                            min="32"
                                            max="80"
                                            value={settings.dock.iconSize}
                                            onChange={(e) => updateSetting("dock", "iconSize", parseInt(e.target.value))}
                                            className="mac-range"
                                            style={{
                                                background: `linear-gradient(to right, #007aff 0%, #007aff ${(settings.dock.iconSize - 32) / (80 - 32) * 100}%, rgba(255,255,255,0.1) ${(settings.dock.iconSize - 32) / (80 - 32) * 100}%, rgba(255,255,255,0.1) 100%)`
                                            }}
                                        />
                                        <div className="range-hints">
                                            <span>Small</span>
                                            <span>Large</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="slider-column">
                                    <span className="slider-label">Magnification</span>
                                    <div className="mac-range-container">
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={settings.dock.magnification}
                                            onChange={(e) => updateSetting("dock", "magnification", parseInt(e.target.value))}
                                            className="mac-range"
                                            style={{
                                                background: `linear-gradient(to right, #007aff 0%, #007aff ${settings.dock.magnification}%, rgba(255,255,255,0.1) ${settings.dock.magnification}%, rgba(255,255,255,0.1) 100%)`
                                            }}
                                        />
                                        <div className="range-hints magnification-hints">
                                            <span>Off</span>
                                            <span>Small</span>
                                            <span>Large</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="settings-group-label">POSITION ON SCREEN</div>
                        <div className="settings-group-card">
                            <div className="settings-row">
                                <span>Position</span>
                                <select
                                    value={settings.dock.position}
                                    onChange={(e) => updateSetting("dock", "position", e.target.value)}
                                    className="mac-select"
                                >
                                    <option value="bottom">Bottom</option>
                                    <option value="left">Left</option>
                                    <option value="right">Right</option>
                                </select>
                            </div>
                        </div>

                        <div className="settings-group-label">Dock Features</div>
                        <div className="settings-group-card">
                            <div className="settings-row">
                                <span>Auto-hide dock</span>
                                <Toggle
                                    enabled={settings.dock.autoHide}
                                    onToggle={(val) => updateSetting("dock", "autoHide", val)}
                                />
                            </div>
                            <div className="settings-row">
                                <span>App icon animation</span>
                                <Toggle
                                    enabled={settings.dock.appAnimation}
                                    onToggle={(val) => updateSetting("dock", "appAnimation", val)}
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
            case "notifications":
                return (
                    <div className="settings-content">
                        {renderHeader("Notifications", Bell, "Control how and when you receive updates.")}

                        <div className="settings-group-label">Global Settings</div>
                        <div className="settings-group-card">
                            <div className="settings-row">
                                <span>Allow Notifications</span>
                                <Toggle
                                    enabled={settings.notifications?.enabled}
                                    onToggle={(val) => updateSetting("notifications", "enabled", val)}
                                />
                            </div>
                            <div className="settings-row">
                                <span>Show Previews</span>
                                <select
                                    className="mac-select"
                                    value={settings.notifications?.style}
                                    onChange={(e) => updateSetting("notifications", "style", e.target.value)}
                                >
                                    <option value="banners">When Unlocked</option>
                                    <option value="always">Always</option>
                                    <option value="never">Never</option>
                                </select>
                            </div>
                        </div>

                        <div className="settings-group-label">App Notifications</div>
                        <div className="settings-list-box">
                            <div className="settings-row">
                                <span>Finder</span>
                                <Toggle enabled={true} onToggle={() => { }} />
                            </div>
                            <div className="settings-row">
                                <span>Mail</span>
                                <Toggle
                                    enabled={settings.notifications?.appToggles.mail}
                                    onToggle={(val) => updateSetting("notifications", "appToggles", { ...settings.notifications.appToggles, mail: val })}
                                />
                            </div>
                            <div className="settings-row">
                                <span>Terminal</span>
                                <Toggle
                                    enabled={settings.notifications?.appToggles.terminal}
                                    onToggle={(val) => updateSetting("notifications", "appToggles", { ...settings.notifications.appToggles, terminal: val })}
                                />
                            </div>
                        </div>
                    </div>
                );
            case "about_portfolio":
                return (
                    <div className="settings-content">
                        {renderHeader("About Portfolio", Info, "Technical details and credits for this project.")}
                        <div className="settings-group-card">
                            <div className="settings-row">
                                <span>Portfolio Version</span>
                                <span className="settings-value-text">2.1.0</span>
                            </div>
                            <div className="settings-row">
                                <span>Last Updated</span>
                                <span className="settings-value-text">Jan 2026</span>
                            </div>
                        </div>
                        <div className="settings-group-card">
                            <label>Tech Stack</label>
                            <div className="settings-row">
                                <span>Core</span>
                                <span className="settings-value-text">React, Vite</span>
                            </div>
                            <div className="settings-row">
                                <span>Styling</span>
                                <span className="settings-value-text">Vanilla CSS, Lucide</span>
                            </div>
                            <div className="settings-row">
                                <span>Deployment</span>
                                <span className="settings-value-text">Vercel</span>
                            </div>
                        </div>
                        <div className="settings-group-card">
                            <div className="settings-list-item">
                                <div className="item-left">
                                    <div className="item-icon"><Code size={16} /></div>
                                    <span>View Source Code</span>
                                </div>
                                <div className="item-actions">
                                    <button className="mac-btn">GitHub Repo</button>
                                </div>
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
                        <div className="search-wrapper">
                            <Search size={13} className="search-icon-inside" />
                            <input
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="sidebar-profile">
                        <div className="profile-icon">
                            <User size={24} />
                        </div>
                        <div className="profile-info">
                            <div className="title">Raj Koli</div>
                            <div className="subtitle">Frontend Developer</div>
                        </div>
                    </div>
                </div>

                <div className="sidebar-scrollable">
                    {SIDEBAR_GROUPS.map(group => (
                        <div key={group.id} className="sidebar-group-container minimalist">
                            <div className="sidebar-group">
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
                            </div>
                        </div>
                    ))}
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
