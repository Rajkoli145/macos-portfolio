# macOS-Style Portfolio (MVP)

A **desktop-inspired personal portfolio** that mimics a macOS-like interface, built using **React + Vite + plain CSS**.  
This project focuses on **UI discipline, clean architecture, and thoughtful interaction design**, not gimmicks.

The goal is to present personal work, skills, and philosophy in a familiar desktop metaphor that developers and designers instantly understand.

---

## 🔥 Project Philosophy

> Form follows function.  
> Structure before animation.  
> Simplicity over cleverness.

This portfolio is intentionally:
- Frontend-only
- Lightweight
- Easy to reason about
- Desktop-first

It is **not** a macOS clone.  
It is **macOS-inspired UI**, built for the web.

---

## 🧱 Tech Stack

### Core
- **React** – Component-based UI
- **Vite** – Fast dev server & build tool
- **JavaScript (ES6+)**
- **Plain CSS** (NO Tailwind, NO CSS-in-JS)

### Styling
- CSS Variables for theme consistency
- Component-scoped CSS files
- Glassmorphism via `backdrop-filter`
- macOS-inspired spacing, blur, and shadows

### State & Logic
- React hooks only (`useState`, `useEffect`)
- Custom hook for window management (planned)
- No Redux / Zustand (intentionally avoided)

### Hosting (Planned)
- Netlify / Vercel / GitHub Pages

---

## ❌ What This Project Does NOT Use

- No backend
- No database
- No authentication
- No Tailwind
- No UI frameworks
- No Three.js / WebGL
- No overengineering

This is a **portfolio**, not a SaaS product.

---

## 📁 Project Structure
src/
├── main.jsx
├── App.jsx
│
├── assets/
│ └── wallpapers/
│
├── styles/
│ ├── globals.css
│ ├── variables.css
│
├── components/
│ ├── Desktop/
│ │ ├── Desktop.jsx
│ │ └── Desktop.css
│ │
│ ├── MenuBar/
│ │ ├── MenuBar.jsx
│ │ └── MenuBar.css
│ │
│ ├── Dock/
│ │ ├── Dock.jsx
│ │ └── Dock.css
│ │
│ ├── Window/
│ │ ├── Window.jsx
│ │ └── Window.css
│ │
│ └── Apps/
│ ├── FinderApp.jsx
│ ├── TerminalApp.jsx
│ ├── NotesApp.jsx
│ ├── SafariApp.jsx (planned)
│ └── MailApp.jsx (planned)
│
├── data/
│ ├── apps.config.js (planned)
│ └── projects.data.js (planned)
│
└── hooks/
└── useWindowManager.js (planned)


---

## 🖥️ UI Architecture Overview

### 1. Desktop
- Root layout
- Renders:
  - MenuBar (top)
  - Dock (bottom)
  - Active windows (center)

### 2. MenuBar
- Static macOS-style top bar
- Displays:
  - Name / brand
  - Menu labels
  - Time (static in MVP)

### 3. Dock
- App launcher UI
- Displays app icons
- Triggers window opening (logic added later)

### 4. Window (Reusable Shell)
- Shared window component for all apps
- Contains:
  - Title bar
  - Control buttons (close / minimize / maximize)
  - Content area
- Apps are rendered **inside** this shell

### 5. Apps
Apps are **content-only components**:
- They do not manage window logic
- They do not know about the desktop
- They only render UI + text

---

## 📦 Included Apps (MVP)

### Finder
- Acts as “About Me”
- Sidebar + content layout
- Shows:
  - Introduction
  - Skills
  - Experience (static)

### Terminal
- Developer-style skills display
- Fake CLI output
- Clean, non-gimmicky terminal look

### Notes
- Personal philosophy
- “Rules I Code By”
- Text-first, readable

---

## 🧠 Planned Logic (Next Phase)

### Window Manager
A custom hook will handle:
- Opening apps
- Closing windows
- Managing active window
- Z-index ordering

Planned API:
```js
const {
  openWindows,
  openApp,
  closeApp,
  focusApp
} = useWindowManager();


🖱️ Planned Interactions

Dock icon → open window

Click window → bring to front

Close button → remove window

Draggable windows (desktop only)

📱 Mobile Strategy

This project is desktop-first.

On mobile:

Show simplified fallback view

Or list-based navigation

Attempting to mimic desktop UI on mobile is avoided intentionally.

🚀 Getting Started
Prerequisites

Node.js v18+

Installation
npm create vite@latest macos-portfolio
cd macos-portfolio
npm install
npm run dev

🎯 MVP Goals

✔ Clean desktop UI
✔ Reusable window system
✔ Clear app separation
✔ No unnecessary complexity
✔ Fast load & smooth UX

🧨 Design Rules (Strict)

No excessive animations

No fake OS features

No hidden content behind gimmicks

UI must be usable without “wow effects”

🧠 Why This Portfolio Works

Familiar interaction model

Shows UI/UX thinking

Demonstrates component architecture

Shows restraint (a rare skill)

This portfolio is meant to impress:

Developers

Tech leads

Founders

Designers

Not ATS bots.

📌 Status

🚧 In Active Development (MVP Phase)

📄 License

MIT — free to learn from, not to clone blindly.

👤 Author

Raj
Frontend Developer
Focused on clean systems, thoughtful UI, and practical code.


---

If you want next, I can:
- Convert this into a **Notion-friendly README**
- Shorten it for **GitHub recruiters**
- Add **screenshots section**
- Or write a **project description for LinkedIn**

Just say what’s next.