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
import defaultWallpaper from "../../assets/mac-wallpaper.jpg";
import peakWallpaper from "../../assets/macos-sierra-mountain-peak-sunset-evening-stock-5k-5120x3684-3987.jpg";

const APP_COMPONENTS = {
  finder: FinderApp,
  terminal: TerminalApp,
  notes: NotesApp,
  safari: SafariApp,
  settings: SettingsApp,
  mail: MailApp,
  vscode: VSCodeApp
};

const APP_DOCK_ORDER = ['finder', 'terminal', 'notes', 'safari', 'mail', 'vscode', 'settings', 'trash'];

function Desktop() {
  const { settings } = useSettings();
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

  const getWallpaperStyle = () => {
    switch (settings.desktop.wallpaper) {
      case "peak": return { backgroundImage: `url(${peakWallpaper})` };
      case "ocean": return { background: "linear-gradient(135deg, #00c6fb 0%, #005bea 100%)" };
      case "minimal": return { background: "#121212" };
      case "default":
      default: return { backgroundImage: `url(${defaultWallpaper})` };
    }
  };

  const getDesktopAreaStyle = () => {
    const pos = settings.dock.position;
    if (pos === 'left') return { paddingLeft: '100px', paddingBottom: '40px' };
    if (pos === 'right') return { paddingRight: '100px', paddingBottom: '40px' };
    return { paddingBottom: '100px' }; // Default bottom
  };

  const handleOpenApp = (appId, appName) => {
    const AppComponent = APP_COMPONENTS[appId];
    if (AppComponent) {
      openApp(appId, appName, AppComponent);
    }
  };

  const getDockX = (appId) => {
    // Basic centering logic, Dock itself handles detailed layout
    // This prop helps the Genie effect know where to minimize to
    // For now we default to center as capturing exact dock item position is complex without refs
    return '50vw';
  };

  return (
    <div className="desktop" style={getWallpaperStyle()}>
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
