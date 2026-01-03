import React, { useState, useEffect } from "react";
import MenuBar from "../MenuBar/MenuBar";
import Dock from "../Dock/Dock";
import Window from "../Window/Window";
import FinderApp from "../Apps/FinderApp";
import TerminalApp from "../Apps/TerminalApp";
import NotesApp from "../Apps/NotesApp";
import SafariApp from "../Apps/SafariApp";
import MailApp from "../Apps/MailApp";
import VSCodeApp from "../Apps/VSCodeApp";
import SettingsApp from "../Apps/SettingsApp";
import { useSettings } from "../../context/SettingsContext";
import { useWindowManager } from "../../hooks/useWindowManager";
import "./Desktop.css";

// Wallpaper Assets
import sequoiaLight from "../../assets/wallpapers/macos-sequoia-light.jpg";
import sequoiaDark from "../../assets/wallpapers/macos-sequoia-dark.jpg";
import tahoeLight from "../../assets/wallpapers/macos-tahoe-light.jpg";
import tahoeDark from "../../assets/wallpapers/macos-tahoe-dark.jpg";
import bigSurLight from "../../assets/wallpapers/macos-big-sur-light.jpg";
import bigSurDark from "../../assets/wallpapers/macos-big-sur-dark.jpg";

const WALLPAPER_MAP = {
  sequoia: { light: sequoiaLight, dark: sequoiaDark, dynamic: true },
  tahoe: { light: tahoeLight, dark: tahoeDark, dynamic: true },
  "big-sur": { light: bigSurLight, dark: bigSurDark, dynamic: true },
};

const APP_COMPONENTS = {
  finder: FinderApp,
  terminal: TerminalApp,
  notes: NotesApp,
  safari: SafariApp,
  settings: SettingsApp,
  mail: MailApp,
  vscode: VSCodeApp
};

function Desktop() {
  const { settings } = useSettings();

  // Initialize with current settings to avoid flash/fade on first load
  const getWp = (wpId, theme) => {
    const wpConfig = WALLPAPER_MAP[wpId] || WALLPAPER_MAP.sequoia;
    return theme === "dark" ? wpConfig.dark : wpConfig.light;
  };

  const [currentWallpaper, setCurrentWallpaper] = useState(() =>
    getWp(settings.desktop.wallpaper, settings.appearance.theme)
  );
  const [prevWallpaper, setPrevWallpaper] = useState("");
  const [isFading, setIsFading] = useState(false);

  const {
    openWindows,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition,
    updateWindowSize
  } = useWindowManager();

  useEffect(() => {
    const nextWp = getWp(settings.desktop.wallpaper, settings.appearance.theme);

    if (nextWp !== currentWallpaper) {
      setPrevWallpaper(currentWallpaper);
      setCurrentWallpaper(nextWp);
      setIsFading(true);
      const timer = setTimeout(() => setIsFading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [settings.desktop.wallpaper, settings.appearance.theme, currentWallpaper]);

  const getDesktopAreaStyle = () => {
    const pos = settings.dock.position;
    if (pos === 'left') return { paddingLeft: '100px', paddingBottom: '40px' };
    if (pos === 'right') return { paddingRight: '100px', paddingBottom: '40px' };
    return { paddingBottom: '100px' };
  };

  const handleOpenApp = (appId, appName) => {
    const AppComponent = APP_COMPONENTS[appId];
    if (AppComponent) {
      openApp(appId, appName, AppComponent);
    }
  };

  const getDockX = (appId) => {
    return '50vw';
  };

  return (
    <div className="desktop">
      {/* Dynamic Wallpaper Layers */}
      <div
        className="wallpaper-layer wallpaper-prev"
        style={{ backgroundImage: `url(${prevWallpaper})` }}
      />
      <div
        className={`wallpaper-layer wallpaper-current ${isFading ? 'fading' : ''}`}
        style={{ backgroundImage: `url(${currentWallpaper})` }}
      />

      <MenuBar onOpenApp={handleOpenApp} />

      <div className="desktop-area" style={getDesktopAreaStyle()}>
        {openWindows.map((window) => (
          <Window
            key={window.id}
            {...window}
            onClose={closeWindow}
            onFocus={focusWindow}
            onMinimize={minimizeWindow}
            onMaximize={toggleMaximize}
            onDrag={updateWindowPosition}
            onResize={updateWindowSize}
            dockX={getDockX(window.id)}
          >
            {window.Component && <window.Component />}
          </Window>
        ))}
      </div>

      <Dock onOpenApp={handleOpenApp} openWindows={openWindows} />
    </div>
  );
}

export default Desktop;
