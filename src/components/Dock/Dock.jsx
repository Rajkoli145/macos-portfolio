import { useState } from "react";
import "./Dock.css";
import { useSettings } from "../../context/SettingsContext";

// Import icon assets
import finderIcon from "../../assets/finder.png";
import terminalIcon from "../../assets/terminal.png";
import notesIcon from "../../assets/notes.png";
import trashIcon from "../../assets/trash.png";
import safariIcon from "../../assets/safari.png";
import mailIcon from "../../assets/mail.png";
import vscodeIcon from "../../assets/vscode.png";
import settingsIcon from "../../assets/settings.png";
import launchpadIcon from "../../assets/launchpad.png";

function Dock({ onOpenApp, openWindows = [], bouncingAppId, isMaximized }) {
  const { settings } = useSettings();
  const [mouseX, setMouseX] = useState(null);
  const [activeApp, setActiveApp] = useState(null);
  const [draggedAppIndex, setDraggedAppIndex] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [bouncingApp, setBouncingApp] = useState(null);
  const [apps, setApps] = useState([
    { id: "finder", name: "Finder", icon: finderIcon },
    { id: "launchpad", name: "Launchpad", icon: launchpadIcon },
    { id: "terminal", name: "Terminal", icon: terminalIcon },
    { id: "notes", name: "Notes", icon: notesIcon },
    { id: "safari", name: "Safari", icon: safariIcon },
    { id: "mail", name: "Mail", icon: mailIcon },
    { id: "vscode", name: "VS Code", icon: vscodeIcon },
    { id: "settings", name: "Settings", icon: settingsIcon },
    { id: "trash", name: "Trash", icon: trashIcon, isTrash: true }
  ]);

  const handleMouseMove = (e) => {
    const dock = e.currentTarget;
    const rect = dock.getBoundingClientRect();
    const isVertical = settings.dock.position !== 'bottom';
    const mousePos = isVertical ? e.clientY - rect.top : e.clientX - rect.left;
    setMouseX(mousePos);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const getIconTransform = (index) => {
    if (mouseX === null || settings.dock.magnification === 0) return { scale: 1, translateX: 0, translateY: 0 };

    const iconSize = settings.dock.iconSize;
    const gap = 8;
    const iconCenter = index * (iconSize + gap) + iconSize / 2;
    const distance = Math.abs(mouseX - iconCenter);

    const magValue = settings.dock.magnification; // 0 to 100
    const maxScale = 1.0 + (magValue / 100) * 0.8; // Max magnification 1.8
    const minScale = 1;
    const range = 150;

    let scale = minScale;
    if (distance < range) {
      const normalizedDistance = distance / range;
      const smoothFactor = Math.cos(normalizedDistance * Math.PI / 2);
      scale = minScale + (maxScale - minScale) * smoothFactor;
    }

    let translateX = 0;
    let translateY = 0;

    if (scale > 1) {
      const offset = (scale - 1) * 10;
      if (settings.dock.position === 'bottom') {
        translateY = -offset;
      } else if (settings.dock.position === 'left') {
        translateX = offset;
      } else if (settings.dock.position === 'right') {
        translateX = -offset;
      }
    }

    return { scale, translateX, translateY };
  };

  const handleAppClick = (appId, appName) => {
    if (settings.dock.appAnimation && appId !== 'launchpad') {
      setBouncingApp(appId);
      setTimeout(() => setBouncingApp(null), 900); // 0.9s bounce
    }

    if (onOpenApp) {
      onOpenApp(appId, appName);
    }
  };

  // Drag and Drop Logic
  const handleDragStart = (e, index) => {
    if (apps[index].id === 'finder' || apps[index].isTrash) {
      e.preventDefault();
      return;
    }

    setDraggedAppIndex(index);
    setMouseX(null); // Stop magnification while dragging

    // Create a transparent drag ghost to hide default browser behavior
    const img = new Image();
    img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    e.dataTransfer.setDragImage(img, 0, 0);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    // Finder (index 0) and Trash (last index) should not move
    if (draggedAppIndex === null || draggedAppIndex === index) return;
    if (index === 0 || index === apps.length - 1) return;

    const reorderedApps = [...apps];
    const draggedApp = reorderedApps[draggedAppIndex];
    reorderedApps.splice(draggedAppIndex, 1);
    reorderedApps.splice(index, 0, draggedApp);

    setDraggedAppIndex(index);
    setApps(reorderedApps);
  };

  const handleDrop = () => {
    setDraggedAppIndex(null);
  };

  // Create a list that includes a divider before the Trash
  const dockItems = [];
  apps.forEach(app => {
    if (app.isTrash) {
      dockItems.push({ id: 'divider', isDivider: true });
    }
    dockItems.push(app);
  });

  const trashIndex = apps.findIndex(a => a.isTrash);

  return (
    <div
      className={`dock-wrapper ${settings.dock.position} ${(settings.dock.autoHide || isMaximized) ? 'auto-hide' : ''} ${isRevealed ? 'revealed' : ''}`}
    >
      <div
        className="dock-sensor"
        onMouseEnter={() => {
          if (settings.dock.autoHide || isMaximized) {
            setIsRevealed(true);
          }
        }}
        style={isMaximized ? {
          position: 'fixed',
          left: settings.dock.position === 'left' ? 0 : 'auto',
          right: settings.dock.position === 'right' ? 0 : 'auto',
          bottom: settings.dock.position === 'bottom' ? 0 : 'auto',
          top: settings.dock.position !== 'bottom' ? '150px' : 'auto', // Avoid top corner
          height: settings.dock.position !== 'bottom' ? 'calc(100% - 300px)' : '2px',
          width: settings.dock.position !== 'bottom' ? '2px' : 'calc(100% - 300px)',
          zIndex: 10000
        } : {}}
      />
      <div
        className="dock"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setIsRevealed(false);
          handleMouseLeave();
        }}
        onDrop={handleDrop}
      >
        {dockItems.map((item, index) => {
          const { scale, translateX, translateY } = getIconTransform(index);
          const baseSize = settings.dock.iconSize;
          const isVertical = settings.dock.position !== 'bottom';

          if (item.isDivider) {
            return (
              <div
                key="dock-divider"
                className="dock-divider-wrapper"
                style={{
                  width: isVertical ? `${baseSize}px` : `${(baseSize / 4) * scale}px`,
                  height: isVertical ? `${(baseSize / 4) * scale}px` : `${baseSize}px`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  className="dock-divider"
                  style={{
                    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                    transformOrigin: settings.dock.position === 'bottom' ? 'bottom center' :
                      settings.dock.position === 'left' ? 'center left' : 'center right'
                  }}
                />
              </div>
            );
          }

          const app = item;
          const isOpen = app.id === 'finder' || openWindows.some(win => win.id === app.id);
          const isDragging = draggedAppIndex === (index > (trashIndex + 1) ? index - 1 : index);
          const isPinned = app.id === 'finder' || app.isTrash;

          return (
            <div
              key={app.id}
              className={`dock-item-wrapper ${isDragging ? 'dragging' : ''} ${isPinned ? 'pinned' : ''}`}
              draggable={!isPinned}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              style={{
                width: isVertical ? `${baseSize}px` : `${baseSize * scale}px`,
                height: isVertical ? `${baseSize * scale}px` : `${baseSize}px`,
                transition: mouseX === null && !isDragging ? 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                opacity: isDragging ? 0.3 : 1
              }}
              onClick={() => handleAppClick(app.id, app.name)}
            >
              <div className={`dock-item-bounce ${(bouncingApp === app.id || bouncingAppId === app.id) ? 'bouncing' : ''}`}>
                <div
                  className="dock-icon"
                  style={{
                    width: `${baseSize}px`,
                    height: `${baseSize}px`,
                    transform: `scale(${scale}) translate(${translateX}px, ${translateY}px)`,
                    transformOrigin: settings.dock.position === 'bottom' ? 'bottom center' :
                      settings.dock.position === 'left' ? 'center left' : 'center right'
                  }}
                  onMouseEnter={() => setActiveApp(app.name)}
                  onMouseLeave={() => setActiveApp(null)}
                >
                  {activeApp === app.name && !isDragging && (
                    <div className="dock-tooltip">
                      {app.name}
                    </div>
                  )}
                  <img src={app.icon} alt={app.name} className="dock-icon-image" draggable="false" />
                  {isOpen && <div className="dock-active-indicator" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dock;
