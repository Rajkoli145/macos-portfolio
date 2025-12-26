import { useState, useCallback } from "react";

export const useWindowManager = () => {
    const [openWindows, setOpenWindows] = useState([]);
    const [topZIndex, setTopZIndex] = useState(100);

    const focusWindow = useCallback((appId) => {
        setTopZIndex((prev) => {
            const nextZ = prev + 1;
            setOpenWindows((windows) =>
                windows.map((w) =>
                    w.id === appId ? { ...w, zIndex: nextZ, isMinimized: false } : w
                )
            );
            return nextZ;
        });
    }, []);

    const openApp = useCallback((appId, appName, Component) => {
        setOpenWindows((prev) => {
            // If already open, just focus/restore it
            const existing = prev.find((w) => w.id === appId);
            if (existing) {
                focusWindow(appId);
                return prev;
            }

            // New window
            const newZ = topZIndex + 1;
            setTopZIndex(newZ);

            const newWindow = {
                id: appId,
                name: appName,
                Component: Component,
                zIndex: newZ,
                position: { x: 100 + prev.length * 30, y: 50 + prev.length * 30 },
                isMinimized: false,
                isMaximized: false,
                prevPosition: null // For restoring from maximized
            };

            return [...prev, newWindow];
        });
    }, [topZIndex, focusWindow]);

    const closeWindow = useCallback((appId) => {
        setOpenWindows((prev) => prev.filter((w) => w.id !== appId));
    }, []);

    const minimizeWindow = useCallback((appId) => {
        setOpenWindows((prev) =>
            prev.map((w) => (w.id === appId ? { ...w, isMinimized: true } : w))
        );
    }, []);

    const toggleMaximize = useCallback((appId) => {
        setOpenWindows((prev) =>
            prev.map((w) => {
                if (w.id === appId) {
                    return { ...w, isMaximized: !w.isMaximized, isMinimized: false };
                }
                return w;
            })
        );
    }, []);

    const updateWindowPosition = useCallback((appId, newPos) => {
        setOpenWindows((prev) =>
            prev.map((w) => (w.id === appId && !w.isMaximized ? { ...w, position: newPos } : w))
        );
    }, []);

    return {
        openWindows,
        openApp,
        closeWindow,
        focusWindow,
        minimizeWindow,
        toggleMaximize,
        updateWindowPosition
    };
};
