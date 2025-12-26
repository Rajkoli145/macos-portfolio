import { useState } from "react";
import "./FinderApp.css";

function FinderApp() {
  const [activeTab, setActiveTab] = useState("about");

  const sidebarItems = [
    { id: "about", icon: "👤", label: "About Me" },
    { id: "experience", icon: "💼", label: "Experience" },
    { id: "education", icon: "🎓", label: "Education" },
  ];

  return (
    <div className="finder">
      <aside className="finder-sidebar">
        <div className="sidebar-section">
          <p className="sidebar-title">Favorites</p>
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`finder-item ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="finder-icon">{item.icon}</span>
              <span className="finder-label">{item.label}</span>
            </div>
          ))}
        </div>
      </aside>

      <main className="finder-content">
        {activeTab === "about" && (
          <div className="tab-pane">
            <header className="content-header">
              <h1>Raj Koli</h1>
              <p className="subtitle">Product Engineer & Problem Solver</p>
            </header>

            <section className="snapshot-grid">
              <div className="snapshot-card">
                <span className="card-emoji">👨‍💻</span>
                <h3>Role</h3>
                <p>Full Stack Developer</p>
              </div>
              <div className="snapshot-card">
                <span className="card-emoji">🎯</span>
                <h3>Focus</h3>
                <p>Productivity & DevTools</p>
              </div>
              <div className="snapshot-card">
                <span className="card-emoji">⚡</span>
                <h3>Interests</h3>
                <p>AI Agents & Web3</p>
              </div>
            </section>

            <section className="bio-section">
              <h3>Short Bio</h3>
              <p>
                I build clean, practical web applications with a focus on structure,
                clarity, and performance. I believe in software that solves real
                problems without the fluff. Currently obsessed with the intersection
                of AI agents and developer experience.
              </p>
            </section>
          </div>
        )}

        {activeTab === "experience" && (
          <div className="tab-pane">
            <h1>Experience</h1>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Freelance Developer</h3>
                  <p className="timeline-date">2023 - Present</p>
                  <p>Building custom web solutions and SaaS MVPs for global clients.</p>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <h3>Open Source Contributor</h3>
                  <p className="timeline-date">2022 - 2023</p>
                  <p>Contributing to various React and Node.js developer tools.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "education" && (
          <div className="tab-pane">
            <h1>Education</h1>
            <div className="education-card">
              <h3>Computer Science & Engineering</h3>
              <p>Focusing on software architecture and distributed systems.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default FinderApp;
