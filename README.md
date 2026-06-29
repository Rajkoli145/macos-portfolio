# macOS Portfolio

A desktop-inspired personal portfolio built with **React 19 + Vite + plain CSS**, mimicking macOS Sequoia's UI. Presents work, skills, and philosophy in a familiar desktop metaphor.

## Philosophy

> Form follows function. Structure before animation. Simplicity over cleverness.

Frontend-only. Lightweight. Desktop-first. macOS-**inspired**, not a clone.

---

## Tech Stack

| Layer | Choice |
|---|---|
| UI | React 19 |
| Build | Vite 7 |
| Styling | Plain CSS, CSS Variables, Glassmorphism |
| State | React hooks + Context API |
| Icons | Lucide React |
| Email | EmailJS |

No Tailwind. No Redux. No UI frameworks. No backend.

---

## Project Structure

```
src/
├── App.jsx                    # Boot → lock → running flow
├── context/SettingsContext.jsx # Theme, wallpaper, dock, system state
├── hooks/useWindowManager.js  # Open/close/focus/min/max, z-index
├── components/
│   ├── Desktop/               # Root layout + wallpaper system
│   ├── MenuBar/               # Top bar with menus + Spotlight
│   ├── Dock/                  # App launcher with bounce + magnification
│   ├── Window/                # Reusable draggable/resizable shell
│   ├── Apps/                  # Content-only app components
│   │   ├── FinderApp          # About Me — bento grid
│   │   ├── TerminalApp        # Skills — fake CLI output
│   │   ├── NotesApp           # Philosophy
│   │   ├── SafariApp          # Browser (portfolio demo)
│   │   ├── MailApp            # Contact form via EmailJS
│   │   ├── VSCodeApp          # Projects viewer
│   │   ├── SettingsApp        # Theme/wallpaper/dock customization
│   │   └── PreviewApp         # Resume PDF + project READMEs
│   └── System/                # Launchpad, LockScreen, PowerOverlay
└── assets/
    └── wallpapers/            # Sequoia / Tahoe / Big Sur light+dark
```

---

## Apps

| App | Purpose |
|---|---|
| Finder | About Me — bento layout with bio, location, links |
| Terminal | Skills display — fake CLI output |
| Notes | Philosophy — "Rules I Code By" |
| Safari | Browser with portfolio links |
| Mail | Contact form (EmailJS) |
| VS Code | Projects with README previews |
| Settings | Theme, wallpaper, dock position, accent color |
| Preview | Resume PDF viewer |

---

## Features

- Boot sequence → lock screen → desktop
- Dynamic wallpaper system (6 wallpapers, light/dark auto-switch)
- Draggable + resizable windows with z-index focus management
- Dock magnification + bounce animation
- MenuBar auto-hide on maximize
- Launchpad with app grid
- Keyboard shortcut: `Cmd+L` to lock
- Animated glassmorphism cards (backdrop-filter)

---

## Getting Started

```bash
npm install
npm run dev
```

Node 18+ required.

---

## Author

**Raj Koli** — Full-Stack Developer  
[GitHub](https://github.com/Rajkoli145) · [LinkedIn](https://www.linkedin.com/in/raj-koli-626008318/)
