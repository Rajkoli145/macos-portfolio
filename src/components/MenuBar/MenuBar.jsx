import { useState, useEffect, useRef } from "react";
import "./MenuBar.css";
import siriIcon from "../../assets/siri.png";
import finderIcon from "../../assets/finder.png";
import terminalIcon from "../../assets/terminal.png";
import notesIcon from "../../assets/notes.png";
import safariIcon from "../../assets/safari.png";
import mailIcon from "../../assets/mail.png";
import vscodeIcon from "../../assets/vscode.png";
import settingsIcon from "../../assets/settings.png";

function MenuBar({ onOpenApp }) {
  const [date, setDate] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState(null);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [availability, setAvailability] = useState("Open to Work");
  const [language, setLanguage] = useState("English");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const appleMenuRef = useRef(null);
  const finderMenuRef = useRef(null);
  const editMenuRef = useRef(null);
  const viewMenuRef = useRef(null);
  const goMenuRef = useRef(null);
  const windowMenuRef = useRef(null);
  const helpMenuRef = useRef(null);
  const wifiMenuRef = useRef(null);
  const langMenuRef = useRef(null);
  const utilityMenuRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Sync with real battery status
  useEffect(() => {
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };

        updateBattery();

        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);

        return () => {
          battery.removeEventListener('levelchange', updateBattery);
          battery.removeEventListener('chargingchange', updateBattery);
        };
      });
    }
  }, []);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const refs = [
        appleMenuRef, finderMenuRef, editMenuRef, viewMenuRef,
        goMenuRef, windowMenuRef, helpMenuRef,
        wifiMenuRef, langMenuRef, utilityMenuRef, searchRef
      ];
      const isClickInside = refs.some(ref => ref.current && ref.current.contains(event.target));

      if (!isClickInside) {
        setActiveMenu(null);
        if (event.target.closest('.spotlight-search') === null) {
          setIsSearchOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    const minStr = minutes < 10 ? `0${minutes}` : minutes;

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    return `${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()}  ${hour12}:${minStr} ${ampm}`;
  };

  const handleMenuToggle = (menuName) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleMenuHover = (menuName) => {
    setActiveMenu(menuName);
  };

  const handleMenuItemClick = (action) => {
    setActiveMenu(null);
    if (!action) return;

    // Contact/Resume special cases
    if (action === 'resume') {
      window.open('/resume.pdf', '_blank');
      return;
    }

    // Clipboard actions
    if (action === 'copy-email') {
      navigator.clipboard.writeText('hello@rajkoli.me');
      return;
    }
    if (action === 'copy-github') {
      navigator.clipboard.writeText('https://github.com/rajkoli');
      return;
    }
    if (action === 'copy-linkedin') {
      navigator.clipboard.writeText('https://linkedin.com/in/rajkoli');
      return;
    }

    const appMap = {
      about: { id: 'finder', name: 'Finder' },
      projects: { id: 'safari', name: 'Safari' },
      skills: { id: 'terminal', name: 'Terminal' },
      notes: { id: 'notes', name: 'Notes' },
      experience: { id: 'finder', name: 'Finder' },
      contact: { id: 'mail', name: 'Mail' }
    };

    const app = appMap[action];
    if (app && onOpenApp) {
      onOpenApp(app.id, app.name);
    }
  };

  const handleGoToSearchItem = (item) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    if (onOpenApp) {
      onOpenApp(item.appId, item.name);
    }
  };

  const searchableItems = [
    { name: 'Finder', appId: 'finder', type: 'App', icon: finderIcon },
    { name: 'Terminal', appId: 'terminal', type: 'App', icon: terminalIcon },
    { name: 'Notes', appId: 'notes', type: 'App', icon: notesIcon },
    { name: 'Safari', appId: 'safari', type: 'App', icon: safariIcon },
    { name: 'Mail', appId: 'mail', type: 'App', icon: mailIcon },
    { name: 'VS Code', appId: 'vscode', type: 'App', icon: vscodeIcon },
    { name: 'Settings', appId: 'settings', type: 'App', icon: settingsIcon },
    { name: 'Projects', appId: 'safari', type: 'Section', icon: safariIcon },
    { name: 'Skills', appId: 'terminal', type: 'Section', icon: terminalIcon },
  ].filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const topHit = searchQuery && searchableItems.length > 0 ? searchableItems[0] : null;

  return (
    <div className="menu-bar">
      {isSearchOpen && (
        <div className="spotlight-overlay" onClick={() => setIsSearchOpen(false)}>
          <div className="spotlight-search" onClick={e => e.stopPropagation()} ref={searchRef}>
            <div className="search-input-wrapper">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Spotlight Search"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && topHit) handleGoToSearchItem(topHit);
                  }}
                />
                {topHit && searchQuery && (
                  <div className="top-hit-hint">
                    — Open
                  </div>
                )}
              </div>
              {topHit && (
                <img src={topHit.icon} alt="" className="search-bar-app-icon" />
              )}
            </div>
            {searchQuery && (
              <div className="search-results">
                {searchableItems.length > 0 ? (
                  searchableItems.map((item, i) => (
                    <div key={i} className={`search-result-item ${i === 0 ? 'top-hit' : ''}`} onClick={() => handleGoToSearchItem(item)}>
                      <div className="result-left-with-icon">
                        <img src={item.icon} alt="" className="search-result-icon" />
                        <div className="result-text">
                          <span className="result-name">{item.name}</span>
                          <span className="result-type">{item.type}</span>
                        </div>
                      </div>
                      <div className="result-right">
                        <span className="search-hint">Search {item.name}</span>
                        <div className="tab-badge">tab</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-results">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="menu-left">
        {/* Apple Menu */}
        <div
          className={`menu-item apple-logo ${activeMenu === 'apple' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('apple')}
          onMouseEnter={() => handleMenuHover('apple')}
          ref={appleMenuRef}
        >
          <svg viewBox="0 0 170 170" width="16" height="16" fill="currentColor">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.7 3.17-5.22 2.13-9.51 3.24-12.86 3.35-5.14.12-10.03-2.01-14.7-6.35-3.17-2.63-7.07-7.27-11.69-13.92-9.06-12.98-13.55-27.97-13.55-45 0-11.45 2.13-21.3 6.39-29.5 4.26-8.2 10.13-14.54 17.61-19.01 7.47-4.47 15.66-6.71 24.57-6.71 4.58 0 9.8 1.15 15.66 3.44 5.86 2.3 10.13 3.44 12.83 3.44 2.12 0 6.6-1.32 13.44-3.95 6.84-2.63 12.6-3.83 17.32-3.6 11.23.23 19.96 4.3 26.21 12.21-10.82 6.53-16.22 15.54-16.22 27.02 0 9.07 3.19 16.71 9.57 22.92 3.18 3.18 6.94 5.61 11.28 7.28-.77 2.22-1.54 4.1-2.31 5.64zM104.28 34.15c0-8.25 2.87-15.62 8.6-22.11 6.39-7.23 14.28-11.22 22.93-12.04.11 1.07.17 2.01.17 2.83 0 7.74-3.13 15.34-9.39 22.8-5.91 7.03-13.73 11.23-22.31 11.32-.12-1-.18-1.92-.18-2.8z" />
          </svg>
          {activeMenu === 'apple' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('about')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="12" rx="2" /><path d="M2 18h20" /><path d="M10 20h4" /></svg>
                  <span>About Me</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('notes')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
                  <span>App Philosophy</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('resume')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  <span>Download Resume</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('contact')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Finder Menu */}
        <div
          className={`menu-item bold ${activeMenu === 'finder' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('finder')}
          onMouseEnter={() => handleMenuHover('finder')}
          ref={finderMenuRef}
        >
          Finder
          {activeMenu === 'finder' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('projects')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  <span>Projects</span>
                </div>
              </div>
              <div className="dropdown-item">
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  <span>Recent Projects</span>
                </div>
                <div className="item-right">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M9 18l6-6-6-6" /></svg>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('skills')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                  <span>Skills</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('experience')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                  <span>Experience</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Edit Menu */}
        <div
          className={`menu-item ${activeMenu === 'edit' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('edit')}
          onMouseEnter={() => handleMenuHover('edit')}
          ref={editMenuRef}
        >
          Edit
          {activeMenu === 'edit' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('copy-email')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><path d="M22 6l-10 7L2 6" /></svg>
                  <span>Copy Email</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('copy-github')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  <span>Copy GitHub Link</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('copy-linkedin')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                  <span>Copy LinkedIn Link</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View Menu */}
        <div
          className={`menu-item ${activeMenu === 'view' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('view')}
          onMouseEnter={() => handleMenuHover('view')}
          ref={viewMenuRef}
        >
          View
          {activeMenu === 'view' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('toggle-theme')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                  <span>Toggle Dark / Light Mode</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('toggle-motion')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                  <span>Toggle Reduce Motion</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('reset-view')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                  <span>Reset View</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Go Menu */}
        <div
          className={`menu-item ${activeMenu === 'go' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('go')}
          onMouseEnter={() => handleMenuHover('go')}
          ref={goMenuRef}
        >
          Go
          {activeMenu === 'go' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('about')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="12" rx="2" /><path d="M2 18h20" /><path d="M10 20h4" /></svg>
                  <span>About Me</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('projects')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                  <span>Projects</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('skills')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                  <span>Skills</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('experience')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
                  <span>Experience</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('contact')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  <span>Contact</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Window Menu */}
        <div
          className={`menu-item ${activeMenu === 'window' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('window')}
          onMouseEnter={() => handleMenuHover('window')}
          ref={windowMenuRef}
        >
          Window
          {activeMenu === 'window' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('minimize-all')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" /></svg>
                  <span>Minimize All</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('close-all')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></svg>
                  <span>Close All</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('front-all')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="7" y="7" width="14" height="14" rx="2" ry="2" /><path d="M3 11a2 2 0 0 1 2-2h4m6 0a2 2 0 0 1 2 2v4" /></svg>
                  <span>Bring All to Front</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Menu */}
        <div
          className={`menu-item ${activeMenu === 'help' ? 'active' : ''}`}
          onClick={() => handleMenuToggle('help')}
          onMouseEnter={() => handleMenuHover('help')}
          ref={helpMenuRef}
        >
          Help
          {activeMenu === 'help' && (
            <div className="dropdown-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('how-to')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  <span>How to Use This Portfolio</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('shortcuts')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" /></svg>
                  <span>Keyboard Shortcuts</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('about-portfolio')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                  <span>About This Portfolio</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="menu-right">
        <div className="menu-item icon">
          <span className="battery-percent">{batteryLevel}%</span>
          <div className="battery-container">
            <svg width="22" height="11" viewBox="0 0 22 11" fill="none">
              <rect x="0.5" y="0.5" width="18" height="10" rx="3" stroke="currentColor" strokeOpacity="0.8" />
              <path d="M20.5 3.5C21.3284 3.5 22 4.17157 22 5V6C22 6.82843 21.3284 7.5 20.5 7.5V3.5Z" fill="currentColor" fillOpacity="0.8" />
              <rect
                x="2.5"
                y="2.5"
                width={(batteryLevel / 100) * 14}
                height="6"
                rx="1.5"
                fill={batteryLevel <= 20 ? "#ff3b30" : "currentColor"}
              />
            </svg>
            {isCharging && (
              <svg className="charging-bolt" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            )}
          </div>
        </div>
        <div
          className={`menu-item icon ${activeMenu === 'wifi' ? 'active' : ''}`}
          ref={wifiMenuRef}
          onClick={() => handleMenuToggle('wifi')}
          onMouseEnter={() => handleMenuHover('wifi')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19Z" fill="currentColor" />
            <path d="M18.364 12.636C14.8492 9.12132 9.15076 9.12132 5.63604 12.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M21.1924 9.80761C16.1147 4.72993 7.88527 4.72993 2.80759 9.80761" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M15.5355 15.4645C13.5829 13.5119 10.4171 13.5119 8.46447 15.4645" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {activeMenu === 'wifi' && (
            <div className="dropdown-menu dropdown-right wifi-menu">
              <div className="dropdown-header">Availability Status</div>
              {["Open to Work", "Available for Freelance", "Actively Building"].map(status => (
                <div key={status} className="dropdown-item" onClick={() => { setAvailability(status); setActiveMenu(null); }}>
                  <div className="item-left">
                    <span>{status}</span>
                  </div>
                  {availability === status && <div className="item-right">✓</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div
          className={`menu-item icon ${activeMenu === 'lang' ? 'active' : ''}`}
          ref={langMenuRef}
          onClick={() => handleMenuToggle('lang')}
          onMouseEnter={() => handleMenuHover('lang')}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="3" />
            <path d="M6 8h1" />
            <path d="M9 8h1" />
            <path d="M12 8h1" />
            <path d="M6 11h3" />
            <path d="M6 14h5" />
            <path d="M15 12h4" />
            <path d="M15 15h4" />
          </svg>
          {activeMenu === 'lang' && (
            <div className="dropdown-menu dropdown-right lang-menu">
              <div className="dropdown-header">Website Language</div>
              {["English", "Hindi"].map(l => (
                <div key={l} className="dropdown-item" onClick={() => { setLanguage(l); setActiveMenu(null); }}>
                  <div className="item-left">
                    <span>{l}</span>
                  </div>
                  {language === l && <div className="item-right">✓</div>}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="menu-item icon" onClick={() => setIsSearchOpen(true)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
        <div
          className={`menu-item icon ${activeMenu === 'utility' ? 'active' : ''}`}
          ref={utilityMenuRef}
          onClick={() => handleMenuToggle('utility')}
          onMouseEnter={() => handleMenuHover('utility')}
        >
          <div className="utility-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="6" width="16" height="5" rx="2.5" />
              <rect x="4" y="13" width="16" height="5" rx="2.5" />
              <circle cx="16" cy="8.5" r="1.2" fill="currentColor" />
              <circle cx="8" cy="15.5" r="1.2" fill="currentColor" />
            </svg>
          </div>
          {activeMenu === 'utility' && (
            <div className="dropdown-menu dropdown-right utility-menu">
              <div className="dropdown-item" onClick={() => handleMenuItemClick('toggle-theme')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>
                  <span>Toggle Dark / Light Mode</span>
                </div>
              </div>
              <div className="dropdown-item" onClick={() => handleMenuItemClick('toggle-motion')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                  <span>Toggle Reduce Motion</span>
                </div>
              </div>
              <div className="dropdown-divider" />
              <div className="dropdown-item" onClick={() => handleMenuItemClick('reset-view')}>
                <div className="item-left">
                  <svg className="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                  <span>Reset View</span>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="menu-item date-time">
          {formatTime(date)}
        </div>
      </div>
    </div>
  );
}

export default MenuBar;
