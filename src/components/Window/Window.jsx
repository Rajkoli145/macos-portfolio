import { useRef, useEffect, useState } from "react";
import "./Window.css";

function Window({
  title = "Window",
  children,
  id,
  position,
  size,
  zIndex,
  isMinimized,
  isMaximized,
  onClose,
  onFocus,
  onMinimize,
  onMaximize,
  onDrag,
  onResize,
  dockX,
  hideTitleBar = false
}) {
  const windowRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Refs to store transient values for mouse movements
  const dragData = useRef({ startX: 0, startY: 0, initialX: 0, initialY: 0 });
  const resizeData = useRef({ startX: 0, startY: 0, initialWidth: 0, initialHeight: 0, direction: '' });

  // Sync refs with props to avoid closure issues in event listeners
  const propsRef = useRef({ id, position, size, onDrag, onResize, isMaximized });
  useEffect(() => {
    propsRef.current = { id, position, size, onDrag, onResize, isMaximized };
  });

  const handleDragStart = (e) => {
    if (propsRef.current.isMaximized) return;
    if (e.target.closest('.window-controls')) return;

    // If title bar is hidden, only allow drag from elements with 'drag-handle' class
    if (hideTitleBar && !e.target.closest('.drag-handle')) return;

    setIsDragging(true);
    dragData.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: propsRef.current.position.x,
      initialY: propsRef.current.position.y
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragMove = (e) => {
    const deltaX = e.clientX - dragData.current.startX;
    const deltaY = e.clientY - dragData.current.startY;

    propsRef.current.onDrag(propsRef.current.id, {
      x: dragData.current.initialX + deltaX,
      y: dragData.current.initialY + deltaY
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleDragMove);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const handleResizeStart = (e, direction) => {
    e.preventDefault();
    e.stopPropagation();
    if (propsRef.current.isMaximized) return;

    setIsResizing(true);
    resizeData.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialWidth: propsRef.current.size.width,
      initialHeight: propsRef.current.size.height,
      initialX: propsRef.current.position.x,
      initialY: propsRef.current.position.y,
      direction
    };

    document.addEventListener('mousemove', handleResizeMove);
    document.addEventListener('mouseup', handleResizeEnd);
  };

  const handleResizeMove = (e) => {
    const { startX, startY, initialWidth, initialHeight, direction } = resizeData.current;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    let newWidth = initialWidth;
    let newHeight = initialHeight;

    if (direction.includes('e')) newWidth = Math.max(400, initialWidth + deltaX);
    if (direction.includes('s')) newHeight = Math.max(300, initialHeight + deltaY);

    // We can add w and n directions later if needed, for now focus on the easiest ones
    propsRef.current.onResize(propsRef.current.id, { width: newWidth, height: newHeight });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleResizeMove);
    document.removeEventListener('mouseup', handleResizeEnd);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('mousemove', handleResizeMove);
      document.removeEventListener('mouseup', handleResizeEnd);
    };
  }, []);

  return (
    <div
      className={`window ${id}-window ${isMaximized ? "maximized" : ""} ${isMinimized ? "minimized" : ""} ${isResizing ? "resizing" : ""} ${hideTitleBar ? "no-titlebar" : ""}`}
      ref={windowRef}
      onMouseDown={(e) => {
        onFocus(id);
        if (hideTitleBar) handleDragStart(e);
      }}
      style={{
        zIndex: zIndex,
        width: isMaximized ? '100%' : `${size.width}px`,
        height: isMaximized ? '100%' : `${size.height}px`,
        transform: isMaximized ? 'none' : `translate(${position.x}px, ${position.y}px)`,
        '--dock-x': dockX
      }}
    >
      {!hideTitleBar && (
        <div className="window-titlebar" onMouseDown={handleDragStart}>
          <div className="window-controls">
            <span className="control close" onClick={(e) => { e.stopPropagation(); onClose(id); }} />
            <span className="control minimize" onClick={(e) => { e.stopPropagation(); onMinimize(id); }} />
            <span className="control maximize" onClick={(e) => { e.stopPropagation(); onMaximize(id); }} />
          </div>
          <div className="window-title">{title}</div>
        </div>
      )}

      <div className="window-content">
        {children}
      </div>

      {/* Resize Handles */}
      <div className="resizer r" onMouseDown={(e) => handleResizeStart(e, 'e')} />
      <div className="resizer b" onMouseDown={(e) => handleResizeStart(e, 's')} />
      <div className="resizer rb" onMouseDown={(e) => handleResizeStart(e, 'se')}>
        <svg viewBox="0 0 10 10" className="resize-icon">
          <line x1="2" y1="8" x2="8" y2="2" stroke="currentColor" strokeWidth="1" opacity="0.4" />
          <line x1="5" y1="8" x2="8" y2="5" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        </svg>
      </div>
    </div>
  );
}

export default Window;
