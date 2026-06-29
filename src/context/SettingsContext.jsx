import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [systemStatus, setSystemStatus] = useState('running'); // running, locked, sleep, shutdown
    const [settings, setSettings] = useState(() => {
        const defaultSettings = {
            appearance: {
                theme: "dark",
                accentColor: "blue",
                transparency: 80,
                reduceMotion: false,
            },
            desktop: {
                wallpaper: "sequoia",
                showIcons: true,
                clockFormat: "12h",
            },
            dock: {
                position: "bottom",
                iconSize: 64,
                magnification: 80,
                showRecents: true,
                autoHide: false,
                appAnimation: true,
            },
            notifications: {
                enabled: true,
                style: "banners",
                appToggles: {
                    terminal: true,
                    mail: true,
                    notes: true
                }
            },
            terminal: {
                fontSize: "medium",
                promptStyle: "classic",
                typingSpeed: 50,
                clearOnClose: true,
            },
            finder: {
                viewMode: "grid",
                sidebarSize: "normal",
                showExtensions: true,
                singleClick: false,
            },
            notes: {
                format: "markdown",
                autoSave: true,
                showWordCount: true,
            },
            mail: {
                method: "emailjs",
                autoReply: false,
                sound: true,
            },
            availability: {
                freelance: true,
                fullTime: false,
                remote: true,
            },
            contact: {
                autoReply: false,
                responseTime: "Within 24 hours",
            },
            user: {
                name: "Raj Koli",
                title: "Frontend Developer",
                avatar: "💀",
                email: "2024.rajk@isu.ac.in",
            }
        };

        const saved = localStorage.getItem("portfolio_settings");
        if (!saved) return defaultSettings;

        try {
            const parsed = JSON.parse(saved);
            // Merge defaults with saved to ensure new keys exist
            return {
                ...defaultSettings,
                ...parsed,
                // Ensure sub-objects are also merged (shallow merge for categories)
                appearance: { ...defaultSettings.appearance, ...parsed.appearance },
                desktop: { ...defaultSettings.desktop, ...parsed.desktop },
                dock: { ...defaultSettings.dock, ...parsed.dock },
                notifications: { ...defaultSettings.notifications, ...parsed.notifications },
                terminal: { ...defaultSettings.terminal, ...parsed.terminal },
                finder: { ...defaultSettings.finder, ...parsed.finder },
                notes: { ...defaultSettings.notes, ...parsed.notes },
                mail: { ...defaultSettings.mail, ...parsed.mail },
                availability: { ...defaultSettings.availability, ...parsed.availability },
                user: { ...defaultSettings.user, ...(parsed.user || {}) }
            };
        } catch (e) {
            return defaultSettings;
        }
    });

    // Visitor Analytics
    const [analytics, setAnalytics] = useState(() => {
        const saved = localStorage.getItem("portfolio_analytics");
        if (!saved) {
            const initial = {
                totalVisits: 1,
                firstVisit: new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                appUsage: {},
                sessionDuration: 0
            };
            localStorage.setItem("portfolio_analytics", JSON.stringify(initial));
            return initial;
        }

        try {
            const parsed = JSON.parse(saved);
            // Increment visit count
            const updated = {
                ...parsed,
                totalVisits: parsed.totalVisits + 1,
                lastVisit: new Date().toISOString()
            };
            localStorage.setItem("portfolio_analytics", JSON.stringify(updated));
            return updated;
        } catch (e) {
            return {
                totalVisits: 1,
                firstVisit: new Date().toISOString(),
                lastVisit: new Date().toISOString(),
                appUsage: {},
                sessionDuration: 0
            };
        }
    });

    // Track app usage
    const trackAppUsage = (appName) => {
        setAnalytics(prev => {
            const updated = {
                ...prev,
                appUsage: {
                    ...prev.appUsage,
                    [appName]: (prev.appUsage[appName] || 0) + 1
                }
            };
            localStorage.setItem("portfolio_analytics", JSON.stringify(updated));
            return updated;
        });
    };

    // Track session duration
    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const duration = Math.floor((Date.now() - startTime) / 1000);
            setAnalytics(prev => ({
                ...prev,
                sessionDuration: duration
            }));
        }, 5000); // Update every 5 seconds

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem("portfolio_settings", JSON.stringify(settings));

        // Apply theme to document
        document.documentElement.setAttribute("data-theme", settings.appearance.theme);
        document.documentElement.style.setProperty("--accent-color", getAccentHex(settings.appearance.accentColor));
    }, [settings]);

    const updateSetting = (category, key, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [key]: value
            }
        }));
    };

    function getAccentHex(color) {
        const colors = {
            blue: "#007aff",
            purple: "#af52de",
            green: "#34c759",
            orange: "#ff9500"
        };
        return colors[color] || colors.blue;
    }

    return (
        <SettingsContext.Provider value={{ settings, updateSetting, systemStatus, setSystemStatus, analytics, trackAppUsage }}>
            {children}
        </SettingsContext.Provider>
    );
};
