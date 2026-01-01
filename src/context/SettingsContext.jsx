import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(() => {
        const saved = localStorage.getItem("portfolio_settings");
        return saved ? JSON.parse(saved) : {
            appearance: {
                theme: "dark",
                accentColor: "blue",
                transparency: 80,
                reduceMotion: false,
            },
            desktop: {
                wallpaper: "default",
                showIcons: true,
                clockFormat: "12h",
            },
            dock: {
                position: "bottom",
                iconSize: 56,
                magnification: true,
                showRecents: true,
            },
            terminal: {
                fontSize: "medium",
                promptStyle: "minimal",
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
            }
        };
    });

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
        <SettingsContext.Provider value={{ settings, updateSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};
