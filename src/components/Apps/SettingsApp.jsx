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
    ArrowRightLeft
} from "lucide-react";

/** constants outside to avoid re-creation but within the same file scope **/
const SIDEBAR_GROUPS = [
    {
        id: "networking",
        items: [
            { id: "wifi", label: "Wi-Fi", icon: Wifi, color: "#007aff" },
            { id: "bluetooth", label: "Bluetooth", icon: Bluetooth, color: "#007aff" },
            { id: "network", label: "Network", icon: Globe, color: "#007aff" },
            { id: "vpn", label: "VPN", icon: Shield, color: "#007aff" },
            { id: "battery", label: "Battery", icon: Battery, color: "#34c759" },
        ]
    },
    {
        id: "system",
        items: [
            { id: "general", label: "General", icon: SettingsIcon, color: "#8e8e93" },
            { id: "accessibility", label: "Accessibility", icon: Accessibility, color: "#007aff" },
            { id: "appearance", label: "Appearance", icon: Palette, color: "#34c759" },
            { id: "wallpaper", label: "Wallpaper", icon: WallpaperIcon, color: "#00a2ff" },
            { id: "displays", label: "Displays", icon: Monitor, color: "#007aff" },
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
                        {renderHeader("General", SettingsIcon, "Manage your overall setup and preferences for Mac, such as software updates, device language, AirDrop, and more.")}

                        <div className="settings-list-box">
                            {renderListItem("About", Info)}
                            {renderListItem("Software Update", RefreshCw)}
                            {renderListItem("Storage", HardDrive)}
                        </div>

                        <div className="settings-list-box">
                            {renderListItem("AppleCare & Warranty", BadgeCheck)}
                        </div>

                        <div className="settings-list-box">
                            {renderListItem("AirDrop & Handoff", Navigation)}
                            {renderListItem("AutoFill & Passwords", Shield)}
                            {renderListItem("Date & Time", Clock)}
                            {renderListItem("Language & Region", Globe)}
                            {renderListItem("Login Items & Extensions", LogIn)}
                        </div>

                        <div className="settings-list-box">
                            {renderListItem("Sharing", Share2)}
                            {renderListItem("Startup Disk", HardDrive)}
                            {renderListItem("Time Machine", History)}
                        </div>

                        <div className="settings-list-box">
                            {renderListItem("Device Management", Shield)}
                        </div>

                        <div className="settings-list-box">
                            {renderListItem("Transfer or Reset", ArrowRightLeft)}
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
                            <span className="subtitle">Apple Account</span>
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
