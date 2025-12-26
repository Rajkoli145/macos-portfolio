import MenuBar from "../MenuBar/MenuBar";
import Dock from "../Dock/Dock";
import Window from "../Window/Window";
import FinderApp from "../Apps/FinderApp";
import TerminalApp from "../Apps/TerminalApp";
import NotesApp from "../Apps/NotesApp";
import { useWindowManager } from "../../hooks/useWindowManager";
import "./Desktop.css";

const APP_COMPONENTS = {
  finder: FinderApp,
  terminal: TerminalApp,
  notes: NotesApp,
  settings: FinderApp,
  safari: FinderApp, // Placeholder
  mail: NotesApp,    // Placeholder
  vscode: TerminalApp // Placeholder
};

const APP_DOCK_ORDER = ['finder', 'terminal', 'notes', 'safari', 'mail', 'vscode', 'settings', 'trash'];

function Desktop() {
  const {
    openWindows,
    openApp,
    closeWindow,
    focusWindow,
    minimizeWindow,
    toggleMaximize,
    updateWindowPosition
  } = useWindowManager();

  const handleOpenApp = (appId, appName) => {
    const AppComponent = APP_COMPONENTS[appId];
    if (AppComponent) {
      openApp(appId, appName, AppComponent);
    }
  };

  const getDockX = (appId) => {
    const index = APP_DOCK_ORDER.indexOf(appId);
    if (index === -1) return '50vw';

    // Approximate calculation: Dock is centered, each icon is ~64px (56+8 gap)
    const iconWidth = 64;
    const totalDockWidth = APP_DOCK_ORDER.length * iconWidth;
    const leftOffset = (index * iconWidth) + (iconWidth / 2);
    return `calc(50vw - (${totalDockWidth / 2}px) + ${leftOffset}px)`;
  };

  return (
    <div className="desktop">
      <MenuBar onOpenApp={handleOpenApp} />

      <div className="desktop-area">
        {openWindows.map((win) => {
          const AppContent = win.Component;
          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.name}
              position={win.position}
              zIndex={win.zIndex}
              isMinimized={win.isMinimized}
              isMaximized={win.isMaximized}
              onClose={closeWindow}
              onFocus={focusWindow}
              onMinimize={minimizeWindow}
              onMaximize={toggleMaximize}
              onDrag={updateWindowPosition}
              dockX={getDockX(win.id)}
            >
              <AppContent />
            </Window>
          );
        })}
      </div>

      <Dock onOpenApp={handleOpenApp} openWindows={openWindows} />
    </div>
  );
}

export default Desktop;
