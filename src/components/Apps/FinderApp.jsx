import { useState } from "react";
import "./FinderApp.css";
import {
  ChevronLeft,
  User,
  Briefcase,
  Code,
  Zap,
  FileText,
  Download
} from "lucide-react";

function FinderApp() {
  const [activeTab, setActiveTab] = useState("about");

  const sidebarItems = [
    { id: "about", label: "About Me", icon: User },
    { id: "experience", label: "Experience", icon: Briefcase },
    { id: "projects", label: "Projects", icon: Code },
    { id: "skills", label: "Skills", icon: Zap },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "resume", label: "Resume", icon: Download },
  ];

  const contentData = {
    about: [
      { id: "who", title: "Who I Am", category: "About Me", description: "A passionate developer building the future of the web.", thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" },
      { id: "what", title: "What I Do", category: "About Me", description: "Specializing in React, complex UI/UX, and performance.", thumb: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" },
      { id: "learning", title: "Currently Learning", category: "About Me", description: "Exploring WebGL, AI integration, and advanced animations.", thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop" },
    ],
    experience: [
      { id: "exp1", title: "Senior Frontend Engineer", category: "Experience", label: "2023 - Present", description: "Leading engineering teams at TechCorp.", thumb: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop" },
      { id: "exp2", title: "Web Developer", category: "Experience", label: "2021 - 2023", description: "Building responsive applications for global clients.", thumb: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=400&h=300&fit=crop" },
    ],
    projects: [
      { id: "proj1", title: "Eco-Tracker App", category: "Project", description: "A sustainability tracking dashboard.", thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
      { id: "proj2", title: "Crypto Dash", category: "Project", description: "Real-time cryptocurrency visualization.", thumb: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400&h=300&fit=crop" },
      { id: "proj3", title: "Portfolio V2", category: "Project", description: "A unique macOS-inspired portfolio.", thumb: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" },
    ],
    skills: [
      { id: "skill1", title: "Frontend Development", category: "Skills", description: "React, Next.js, Framer Motion, CSS3.", thumb: "https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?w=400&h=300&fit=crop" },
      { id: "skill2", title: "Backend Systems", category: "Skills", description: "Node.js, GraphQL, PostgreSQL.", thumb: "https://images.unsplash.com/photo-1558494949-ef8b5655d936?w=400&h=300&fit=crop" },
      { id: "skill3", title: "UI/UX Design", category: "Skills", description: "Figma, Design Systems, Typography.", thumb: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop" },
    ],
    notes: [
      { id: "note1", title: "On Minimalism", category: "Note", description: "Why less is usually more in interface design.", thumb: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?w=400&h=300&fit=crop" },
      { id: "note2", title: "Performance First", category: "Note", description: "Optimizing the critical rendering path.", thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" },
    ],
    resume: [
      { id: "res1", title: "Download Full Resume", category: "Resume", label: "PDF Format", description: "Get the complete list of my qualifications.", thumb: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop" },
    ]
  };

  const activeItem = sidebarItems.find(item => item.id === activeTab);
  const activeTitle = activeItem ? activeItem.label : "Finder";

  return (
    <div className="finder">
      <aside className="finder-sidebar">
        <div className="traffic-lights-spacer"></div>
        <div className="sidebar-content">
          {sidebarItems.map((item) => (
            <div
              key={item.id}
              className={`sidebar-link ${activeTab === item.id ? "active" : ""}`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon className="sidebar-icon" size={20} />
              <span className="sidebar-label">{item.label}</span>
            </div>
          ))}
        </div>
      </aside>

      <div className="finder-main">
        <header className="finder-toolbar">
          <div className="toolbar-left">
            <button className="back-btn"><ChevronLeft size={24} /></button>
            <h2 className="toolbar-title">{activeTitle}</h2>
          </div>
        </header>

        <main className="finder-content">
          <div className="portfolio-grid">
            {contentData[activeTab]?.map((item) => (
              <div key={item.id} className="portfolio-card">
                <div className="card-thumb">
                  <img src={item.thumb} alt={item.title} />
                  {item.label && <span className="card-tag">{item.label}</span>}
                </div>
                <div className="card-info">
                  <span className="card-category">{item.category}</span>
                  <h3 className="card-title">{item.title}</h3>
                  <p className="card-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default FinderApp;
