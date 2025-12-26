import { useRef, useEffect } from "react";
import "./Window.css";

function Window({
  title = "Window",
  children,
  id,
  position,
  zIndex,
  isMinimized,
  isMaximized,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onDrag,
  dockX
}) {
  const windowRef = useRef(null);
  const isDragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    onFocus(id);

    // Disable dragging if maximized
    if (isMaximized) return;

    // Only drag from titlebar
    if (e.target.closest('.window-titlebar') && !e.target.closest('.window-controls')) {
      isDragging.current = true;
      offset.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const newX = e.clientX - offset.current.x;
    const newY = e.clientY - offset.current.y;

    onDrag(id, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div
      className={`window ${isMaximized ? 'maximized' : ''} ${isMinimized ? 'minimized' : ''}`}
      ref={windowRef}
      onMouseDown={() => onFocus(id)}
      style={{
        zIndex: zIndex,
        transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)`,
        '--dock-x': dockX
      }}
    >
      <div className="window-titlebar" onMouseDown={handleMouseDown}>
        <div className="window-controls">
          <span className="control close" onClick={(e) => { e.stopPropagation(); onClose(id); }} />
          <span className="control minimize" onClick={(e) => { e.stopPropagation(); onMinimize(id); }} />
          <span className="control maximize" onClick={(e) => { e.stopPropagation(); onMaximize(id); }} />
        </div>

        <div className="window-title">{title}</div>
      </div>

      <div className="window-content">
        {children}
      </div>
    </div>
  );
}

export default Window;
