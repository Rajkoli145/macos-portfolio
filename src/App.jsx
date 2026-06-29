import Desktop from "./components/Desktop/Desktop";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import LockScreen from "./components/System/LockScreen";
import PowerOverlay from "./components/System/PowerOverlay";
import ShortcutsHelp from "./components/System/ShortcutsHelp";
import SystemDialog from "./components/System/SystemDialog";
import { useState, useEffect } from "react";

function AppContent() {
  const { systemStatus, setSystemStatus } = useSettings();
  const [isInitialBoot, setIsInitialBoot] = useState(true);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [dialogConfig, setDialogConfig] = useState(null);

  const triggerDialog = (config) => {
    setDialogConfig(config);
  };

  const closeDialog = () => {
    setDialogConfig(null);
  };

  useEffect(() => {
    // Initial boot sequence
    const timer = setTimeout(() => {
      setIsInitialBoot(false);
      // We start at locked screen for authentic experience
      setSystemStatus('locked');
    }, 4500); // 4.5s for realistic progress bar
    return () => clearTimeout(timer);
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Command/Meta + L to lock
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setSystemStatus('locked');
      }

    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSystemStatus]);

  // Safety: Clear dialogs when locking
  useEffect(() => {
    if (systemStatus === 'locked') {
      closeDialog();
    }
  }, [systemStatus]);

  return (
    <>
      {isInitialBoot ? (
        <PowerOverlay type="boot" />
      ) : (
        <>
          <div className={`main-content ${systemStatus === 'locked' ? 'is-locked' : 'is-running'}`}>
            <Desktop
              onShowShortcuts={() => setShowShortcutsHelp(true)}
              triggerDialog={triggerDialog}
            />
          </div>
          {systemStatus === 'locked' && <LockScreen />}
          {showShortcutsHelp && <ShortcutsHelp onClose={() => setShowShortcutsHelp(false)} />}

          <SystemDialog
            isOpen={!!dialogConfig}
            onCancel={closeDialog}
            onConfirm={() => {
              const config = dialogConfig;
              closeDialog();
              if (config?.onConfirm) config.onConfirm();
            }}
            {...dialogConfig}
          />
          {(systemStatus === 'shutdown' || systemStatus === 'restart') && (
            <PowerOverlay type={systemStatus} />
          )}
          {systemStatus === 'sleep' && (
            <div
              className="system-overlay sleep-mode"
              onClick={() => setSystemStatus('running')}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                background: 'black',
                zIndex: 10000,
                cursor: 'none'
              }}
            />
          )}

        </>
      )}
    </>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;
