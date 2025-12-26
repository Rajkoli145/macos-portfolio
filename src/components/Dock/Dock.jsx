import { useState } from "react";
import "./Dock.css";

// Import icon assets
import finderIcon from "../../assets/finder.png";
import terminalIcon from "../../assets/terminal.png";
import notesIcon from "../../assets/notes.png";
import trashIcon from "../../assets/trash.png";
import safariIcon from "../../assets/safari.png";
import mailIcon from "../../assets/mail.png";
import vscodeIcon from "../../assets/vscode.png";
import settingsIcon from "../../assets/settings.png";

function Dock({ onOpenApp, openWindows = [] }) {
  const [mouseX, setMouseX] = useState(null);
  const [activeApp, setActiveApp] = useState(null);
  const [draggedAppIndex, setDraggedAppIndex] = useState(null);
  const [apps, setApps] = useState([
    { id: "finder", name: "Finder", icon: finderIcon },
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
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const getIconTransform = (index) => {
    if (mouseX === null) return { scale: 1, translateY: 0 };

    const iconWidth = 56;
    const gap = 8;
    const iconCenter = index * (iconWidth + gap) + iconWidth / 2;

    const distance = Math.abs(mouseX - iconCenter);

    const maxScale = 1.7;
    const minScale = 1;
    const range = 150;

    let scale;
    if (distance < range) {
      const normalizedDistance = distance / range;
      const smoothFactor = Math.cos(normalizedDistance * Math.PI / 2);
      scale = minScale + (maxScale - minScale) * smoothFactor;
    } else {
      scale = minScale;
    }

    const translateY = scale > 1 ? -12 * Math.pow(scale - 1, 1.2) : 0;

    return { scale, translateY };
  };

  const handleAppClick = (appId, appName) => {
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

  return (
    <div className="dock-wrapper">
      <div className="dock-separator" />
      <div
        className="dock"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onDrop={handleDrop}
      >
        {apps.map((app, index) => {
          const { scale, translateY } = getIconTransform(index);
          const baseWidth = 56;
          const isOpen = app.id === 'finder' || openWindows.some(win => win.id === app.id);
          const isDragging = draggedAppIndex === index;
          const isPinned = app.id === 'finder' || app.isTrash;

          return (
            <div
              key={app.id}
              className={`dock-item-wrapper ${isDragging ? 'dragging' : ''} ${isPinned ? 'pinned' : ''}`}
              draggable={!isPinned}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              style={{
                width: `${baseWidth * scale}px`,
                height: `${baseWidth}px`,
                transition: mouseX === null && !isDragging ? 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)' : 'none',
                opacity: isDragging ? 0.3 : 1
              }}
              onClick={() => handleAppClick(app.id, app.name)}
            >
              {app.isTrash && <div className="dock-divider" />}
              <div
                className="dock-icon"
                style={{
                  width: `${baseWidth}px`,
                  height: `${baseWidth}px`,
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  transformOrigin: 'bottom center'
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
          );
        })}
      </div>
    </div>
  );
}

export default Dock;
