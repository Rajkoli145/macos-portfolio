import { useState } from "react";
import "./FinderApp.css";
import {
  ChevronLeft,
  ChevronRight,
  Folder,
  FileText,
  User,
  Briefcase,
  Zap,
  Mail,
  Trash2,
  FileCode,
  Globe,
  Eye,
  Download,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Coffee,
  Atom,
  SquareCode,
  Palette,
  Wind,
  Cpu,
  Layers,
  Terminal,
  Activity,
  LayoutGrid,
  List as ListIcon,
  Columns as ColumnsIcon,
  Search
} from "lucide-react";
import finderIcon from "../../assets/finder.png";
import terminalIcon from "../../assets/terminal.png";
import safariIcon from "../../assets/safari.png";
import mailIcon from "../../assets/mail.png";
import vscodeIcon from "../../assets/vscode.png";
import settingsIcon from "../../assets/settings.png";
import notesIcon from "../../assets/notes.png";
import meImg from "../../assets/me.png";

// Custom Finder Sidebar Icons
import applicationsIcon from "../../assets/finder-icons/applications.svg";
import projectIcon from "../../assets/finder-icons/project.svg";
import skillsIcon from "../../assets/finder-icons/skills.svg";
import notesIconSvg from "../../assets/finder-icons/notes.svg";
import aboutMeIcon from "../../assets/finder-icons/about-me.svg";
import resumeIcon from "../../assets/finder-icons/resume.svg";
import contactIcon from "../../assets/finder-icons/contact.svg";

function FinderApp({ onOpenApp }) {
  const [activeTab, setActiveTab] = useState("applications");
  const [viewMode, setViewMode] = useState("grid"); // grid, list, columns
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [navigationStack, setNavigationStack] = useState([]); // Array of {id: string, name: string}

  const sidebarGroups = [
    {
      label: "Favorites",
      items: [
        { id: "applications", label: "Applications", icon: applicationsIcon, view: "grid" },
        { id: "projects", label: "Projects", icon: projectIcon, view: "grid" },
        { id: "experience", label: "Experience", icon: Briefcase, view: "list" },
        { id: "skills", label: "Skills", icon: skillsIcon, view: "list" },
        { id: "notes", label: "Notes", icon: notesIconSvg, view: "list" },
      ]
    },
    {
      label: "Me",
      items: [
        { id: "about", label: "About Me", icon: aboutMeIcon, view: "list" },
        { id: "resume", label: "Resume.pdf", icon: resumeIcon, view: "list" },
        { id: "contact", label: "Contact", icon: contactIcon, view: "list" },
      ]
    },
    {
      label: "System",
      items: [
        { id: "trash", label: "Trash", icon: Trash2, view: "list" },
      ]
    }
  ];

  const contentData = {
    applications: [
      {
        id: "safari",
        name: "Safari",
        type: "Application",
        icon: safariIcon,
        info: "Application",
        size: "245 MB",
        version: "17.2",
        created: "15 December 2025 at 2:30 PM",
        modified: "19 December 2025 at 1:45 PM",
        opened: "7 January 2026 at 7:29 PM"
      },
      {
        id: "terminal",
        name: "Terminal",
        type: "Application",
        icon: terminalIcon,
        info: "Application",
        size: "89 MB",
        version: "2.14",
        created: "15 December 2025 at 2:30 PM",
        modified: "18 December 2025 at 3:15 PM",
        opened: "8 January 2026 at 9:12 AM"
      },
      {
        id: "vscode",
        name: "VS Code",
        type: "Application",
        icon: vscodeIcon,
        info: "Application",
        size: "512 MB",
        version: "1.85.2",
        created: "15 December 2025 at 2:30 PM",
        modified: "20 December 2025 at 4:20 PM",
        opened: "9 January 2026 at 10:45 AM"
      },
      {
        id: "mail",
        name: "Mail",
        type: "Application",
        icon: mailIcon,
        info: "Application",
        size: "156 MB",
        version: "16.0",
        created: "15 December 2025 at 2:30 PM",
        modified: "19 December 2025 at 1:45 PM",
        opened: "6 January 2026 at 8:30 AM"
      },
      {
        id: "notes",
        name: "Notes",
        type: "Application",
        icon: notesIcon,
        info: "Application",
        size: "78 MB",
        version: "5.3",
        created: "15 December 2025 at 2:30 PM",
        modified: "19 December 2025 at 1:45 PM",
        opened: "5 January 2026 at 3:15 PM"
      },
      {
        id: "settings",
        name: "Settings",
        type: "Application",
        icon: settingsIcon,
        info: "Application",
        size: "134 MB",
        version: "15.2",
        created: "15 December 2025 at 2:30 PM",
        modified: "19 December 2025 at 1:45 PM",
        opened: "10 January 2026 at 11:20 AM"
      },
    ],
    projects: [
      {
        id: "proj1",
        name: "macOS-Portfolio",
        type: "Folder",
        icon: Folder,
        color: "#ffcc00",
        info: "Project Folder",
        size: "2.4 MB",
        modified: "11 January 2026",
        readme: {
          title: "macOS Sequoia Portfolio",
          description: "A pixel-perfect recreation of macOS Sequoia as an interactive portfolio website. Features authentic system UI, working applications, and smooth animations.",
          techStack: ["React 18", "Vite", "Vanilla CSS", "Context API"],
          features: [
            "Authentic macOS Sequoia UI/UX",
            "Functional Finder with multiple view modes",
            "Working Terminal with custom commands",
            "Dynamic wallpaper system",
            "Customizable Settings app",
            "Smooth animations and transitions"
          ],
          github: "https://github.com/Rajkoli145/macos-portfolio",
          demo: "https://rajkoli-portfolio.vercel.app",
          status: "Active Development"
        }
      },
      {
        id: "proj2",
        name: "FreelancerFlow",
        type: "Folder",
        icon: Folder,
        color: "#34c759",
        info: "Project Folder",
        size: "4.2 MB",
        modified: "8 January 2026",
        readme: {
          title: "FreelancerFlow - Business Management Platform",
          description: "A production-ready, full-stack application designed to help freelancers manage every aspect of their business - from client relationships to financial reporting. Built with modern technologies and enterprise-level security practices.",
          techStack: ["React 19", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT", "Vite"],
          features: [
            "Client relationship management",
            "Project and task tracking",
            "Invoice generation and management",
            "Financial reporting with Recharts",
            "Secure JWT authentication",
            "Enterprise-level security (Helmet.js, XSS protection)",
            "Professional logging with Winston",
            "API documentation with Swagger"
          ],
          github: "https://github.com/Rajkoli145/FreelancerFlow",
          demo: "https://freelancerflow.vercel.app",
          status: "Production Ready"
        }
      },
      {
        id: "proj3",
        name: "EduConnect",
        type: "Folder",
        icon: Folder,
        color: "#af52de",
        info: "Project Folder",
        size: "1.8 MB",
        modified: "5 January 2026",
        readme: {
          title: "EduConnect - Student-Teacher Booking System",
          description: "A modern, responsive web application for managing student-teacher appointments with role-based access control. Features real-time synchronization and comprehensive admin dashboard.",
          techStack: ["HTML5", "CSS3", "JavaScript ES6+", "Firebase Auth", "Firestore", "Material Icons"],
          features: [
            "Role-based access (Student/Teacher/Admin)",
            "Real-time appointment booking",
            "Teacher availability management",
            "Admin dashboard with user management",
            "Activity logging and tracking",
            "Modern purple gradient theme",
            "Responsive design with CSS Grid/Flexbox",
            "Firebase real-time synchronization"
          ],
          github: "https://github.com/Rajkoli145/Student-teacher-booking",
          demo: "https://educonnect-booking.web.app",
          status: "Production Ready"
        }
      },
      {
        id: "proj4",
        name: "AR-Dementia-Aid",
        type: "Folder",
        icon: Folder,
        color: "#007aff",
        info: "Project Folder",
        size: "2.1 MB",
        modified: "3 January 2026",
        readme: {
          title: "AR Dementia Aid - Face Recognition Helper",
          description: "A browser-based assistive technology that uses face recognition to help identify people and provide medicine reminders. Built for MumbaiHacks 2025 hackathon.",
          techStack: ["JavaScript", "face-api.js", "TensorFlow.js", "HTML5", "CSS3", "WebRTC"],
          features: [
            "Real-time face recognition",
            "Person identification database",
            "Medicine reminder system",
            "Browser-based (no server required)",
            "Privacy-focused (local storage)",
            "Mobile-responsive design",
            "Camera integration with WebRTC",
            "TensorFlow.js model optimization"
          ],
          github: "https://github.com/Rajkoli145/MumbaiHacks-2025",
          demo: "https://ar-dementia-aid.vercel.app",
          status: "Hackathon Project"
        }
      },
      {
        id: "proj5",
        name: "Umpire-AI",
        type: "Folder",
        icon: Folder,
        color: "#ff9500",
        info: "Project Folder",
        size: "3.5 MB",
        modified: "28 December 2025",
        readme: {
          title: "Umpire AI - Sports Decision Assistant",
          description: "An AI-powered umpiring assistant for sports decision-making. Uses computer vision and machine learning to provide real-time analysis and decision support.",
          techStack: ["Python", "TensorFlow", "OpenCV", "Flask", "React", "WebSocket"],
          features: [
            "Real-time video analysis",
            "AI-powered decision support",
            "Computer vision for ball tracking",
            "WebSocket for live updates",
            "Historical decision analytics",
            "Multi-sport support framework",
            "RESTful API with Flask",
            "React-based dashboard"
          ],
          github: "https://github.com/Rajkoli145/Umpire-AI",
          demo: "https://umpire-ai-demo.vercel.app",
          status: "Beta Testing"
        }
      },
      {
        id: "proj6",
        name: "Gym-Management",
        type: "Folder",
        icon: Folder,
        color: "#ff3b30",
        info: "Project Folder",
        size: "2.7 MB",
        modified: "20 December 2025",
        readme: {
          title: "Gym Management System",
          description: "A comprehensive gym management solution for tracking memberships, attendance, payments, and workout plans. Features member portal and admin dashboard.",
          techStack: ["React", "Node.js", "Express", "MongoDB", "Bootstrap", "Chart.js"],
          features: [
            "Member registration and management",
            "Attendance tracking system",
            "Payment and billing management",
            "Workout plan creation",
            "Progress tracking with charts",
            "Admin dashboard analytics",
            "QR code check-in system",
            "Email notifications"
          ],
          github: "https://github.com/Rajkoli145/Gym-management-system",
          demo: "https://gym-management-demo.vercel.app",
          status: "Active Development"
        }
      },
      {
        id: "proj7",
        name: "Quiz-App",
        type: "Folder",
        icon: Folder,
        color: "#5856d6",
        info: "Project Folder",
        size: "1.2 MB",
        modified: "15 December 2025",
        readme: {
          title: "Interactive Quiz Application",
          description: "A dynamic quiz application with multiple categories, timer functionality, and score tracking. Features smooth animations and responsive design.",
          techStack: ["React", "JavaScript", "CSS3", "Local Storage API"],
          features: [
            "Multiple quiz categories",
            "Timer-based questions",
            "Score tracking and leaderboard",
            "Progress indicators",
            "Smooth animations",
            "Responsive design",
            "Local storage for progress",
            "Instant feedback on answers"
          ],
          github: "https://github.com/Rajkoli145/Quiz-App",
          demo: "https://quiz-app-rajkoli.vercel.app",
          status: "Completed"
        }
      },
      {
        id: "proj8",
        name: "Music-Player",
        type: "Folder",
        icon: Folder,
        color: "#ff2d55",
        info: "Project Folder",
        size: "1.5 MB",
        modified: "10 December 2025",
        readme: {
          title: "Modern Music Player",
          description: "A sleek, modern music player with playlist management, audio visualization, and custom controls. Inspired by Spotify's design language.",
          techStack: ["HTML5", "CSS3", "JavaScript", "Web Audio API", "Canvas API"],
          features: [
            "Custom audio controls",
            "Playlist management",
            "Audio visualization with Canvas",
            "Shuffle and repeat modes",
            "Volume control",
            "Progress bar with seek",
            "Responsive design",
            "Modern UI with gradients"
          ],
          github: "https://github.com/Rajkoli145/MusicPlayer",
          demo: "https://music-player-rajkoli.vercel.app",
          status: "Completed"
        }
      },
    ],
    experience: [
      { id: "exp1", name: "Senior Frontend Developer", info: "TechCorp Labs", date: "2023 - Now", icon: Briefcase, color: "#ff9500" },
      { id: "exp2", name: "UI/UX Developer", info: "Freelance", date: "2021 - 2023", icon: Palette, color: "#af52de" },
      { id: "exp3", name: "Web Junior Intern", info: "StartUp Inc", date: "2020 - 2021", icon: Terminal, color: "#34c759" },
    ],
    skills: [
      { id: "s1", name: "React.js", info: "Official Docs", date: "v18.x", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", url: "https://react.dev" },
      { id: "s2", name: "JavaScript", info: "MDN Web Docs", date: "ES6+", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
      { id: "s3", name: "Vanilla CSS", info: "MDN Web Docs", date: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
      { id: "s4", name: "Tailwind CSS", info: "Official Docs", date: "v3.w", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg", url: "https://tailwindcss.com" },
      { id: "s5", name: "System Design", info: "Reference", date: "2024", icon: Cpu, color: "#8E8E93", url: "https://github.com/donnemartin/system-design-primer" },
    ],
    notes: [
      { id: "n1", name: "Design Principles.txt", info: "8 KB", date: "Yesterday" },
      { id: "n2", name: "Project Ideas.md", info: "12 KB", date: "Jan 1" },
      { id: "n3", name: "Meeting Notes.pdf", info: "1.2 MB", date: "Dec 28" },
    ],
    about: [
      { id: "name", name: "Raj Koli", info: "Name", date: "Jan 2026", icon: User },
      { id: "role", name: "Full-Stack Developer & UI Enthusiast", info: "Role", date: "Jan 2026", icon: Briefcase },
      { id: "loc", name: "Mumbai, India", info: "Location", date: "Jan 2026", icon: MapPin },
      { id: "bio", name: "I build high-fidelity interactive web systems.", info: "Bio", date: "Jan 2026", icon: Zap },
    ],
    resume: [
      { id: "pdf", name: "Raj_Resume_2026.pdf", info: "250 KB", date: "Jan 2" },
    ],
    contact: [
      { id: "email", name: "2024.rajk@isu.ac.in", info: "Email", date: "Jan 2026", icon: Mail, url: "mailto:2024.rajk@isu.ac.in" },
      { id: "github", name: "github.com", info: "Link", date: "Jan 2026", icon: Github, url: "https://github.com/Rajkoli145" },
      { id: "linkedin", name: "linkedin.com", info: "Link", date: "Jan 2026", icon: Linkedin, url: "https://www.linkedin.com/in/raj-koli-626008318/" },
    ],
    trash: [
      { id: "t1", name: "Bugs_I_Fixed.zip", info: "0 KB", date: "Just now", icon: Trash2 },
      { id: "t2", name: "Old_Portfolio_v1.dark", info: "1.2 MB", date: "Dec 2025", icon: Folder },
      { id: "t3", name: "Empty_Coffee_Cup", info: "Refill needed", date: "Morning", icon: Coffee },
    ]
  };

  const currentPath = navigationStack.map(s => s.name).join(' / ');
  const currentFolder = navigationStack.length > 0 ? navigationStack[navigationStack.length - 1] : sidebarGroups.flatMap(g => g.items).find(i => i.id === activeTab);

  const handleBack = () => {
    if (navigationStack.length > 0) {
      setNavigationStack(prev => prev.slice(0, -1));
      setSelectedItem(null);
    }
  };

  const handleDoubleClick = (item) => {
    // Handle project folders - "enter" the folder
    if (activeTab === 'projects' && item.readme && navigationStack.length === 0) {
      setNavigationStack([...navigationStack, { ...item }]);
      setSelectedItem(null);
      return;
    }

    // Handle README preview
    if (item.isReadme) {
      const currentProject = navigationStack[navigationStack.length - 1];
      if (currentProject) {
        if (onOpenApp) onOpenApp('preview', 'README.md', { type: 'markdown', data: currentProject });
      }
      return;
    }

    if (item.id === 'pdf' || activeTab === 'resume') {
      if (onOpenApp) onOpenApp('preview', 'Preview - Resume');
      return;
    }

    // Handle opening documentation/links
    if ((activeTab === 'skills' || activeTab === 'contact') && item.url) {
      if (item.id === 'email') {
        if (onOpenApp) onOpenApp('mail', 'Mail');
      } else {
        window.open(item.url, '_blank');
      }
      return;
    }

    if (activeTab === 'applications') {
      if (onOpenApp) onOpenApp(item.id, item.name);
      return;
    }
  };

  const getFilteredData = () => {
    let data = [];
    if (activeTab === 'projects' && navigationStack.length > 0) {
      // Content of a project folder
      const project = navigationStack[navigationStack.length - 1];
      data = [
        {
          id: `${project.id}-readme`,
          name: "README.md",
          type: "Markdown File",
          icon: FileText,
          color: "#007aff",
          isReadme: true,
          readme: project.readme,
          info: "Documentation",
          size: project.size,
          modified: project.modified
        }
      ];
    } else {
      data = contentData[activeTab] || [];
    }

    return data.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredData = getFilteredData();

  return (
    <div className="finder-app">
      <aside className="finder-sidebar">
        {sidebarGroups.map((group, gIdx) => (
          <div key={gIdx} className="sidebar-group">
            <h4 className="sidebar-group-title">{group.label}</h4>
            {group.items.map((item) => (
              <div
                key={item.id}
                className={`sidebar-item ${activeTab === item.id ? "active" : ""}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setSelectedItem(null);
                  setNavigationStack([]);
                  if (item.view) setViewMode(item.view);
                }}
              >
                {typeof item.icon === 'string' ? (
                  <img src={item.icon} alt={item.label} className="sidebar-item-icon" />
                ) : (
                  <item.icon className="sidebar-item-icon" size={20} />
                )}
                <span className="sidebar-item-label">{item.label}</span>
              </div>
            ))}
          </div>
        ))}
      </aside>

      <div className="finder-main-area">
        <header className="finder-toolbar-utility">
          <div className="toolbar-left">
            <div className="toolbar-nav">
              <ChevronLeft
                size={18}
                className={`nav-icon ${navigationStack.length === 0 ? 'disabled' : ''}`}
                onClick={handleBack}
              />
              <ChevronRight size={18} className="nav-icon disabled" />
            </div>
            <span className="toolbar-folder-name">{currentFolder?.name || currentFolder?.label}</span>
          </div>

          <div className="toolbar-center">
            <div className="view-switcher">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Icon View"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <ListIcon size={14} />
              </button>
              <button
                className={`view-btn ${viewMode === 'columns' ? 'active' : ''}`}
                onClick={() => setViewMode('columns')}
                title="Column View"
              >
                <ColumnsIcon size={14} />
              </button>
            </div>
          </div>

          <div className="toolbar-right">
            <div className="search-pill">
              <Search size={14} className="search-icon" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main className="finder-view-content" onClick={() => setSelectedItem(null)}>
          {viewMode === "grid" ? (
            <div className="icon-view-grid">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className={`icon-item ${selectedItem === item.id ? 'selected' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setSelectedItem(item.id); }}
                  onDoubleClick={() => handleDoubleClick(item)}
                >
                  <div className="icon-wrapper">
                    {typeof item.icon === 'string' ? (
                      <img src={item.icon} alt={item.name} className="app-icon-img" />
                    ) : (
                      <item.icon
                        size={48}
                        strokeWidth={0.5}
                        fill={item.color || "none"}
                        style={{ color: item.color }}
                      />
                    )}
                  </div>
                  <span className="icon-label">{item.name}</span>
                </div>
              ))}
            </div>
          ) : viewMode === "columns" ? (
            <div className="column-view">
              <div className="column-browser">
                <div className="column-panel">
                  <div className="column-header">Categories</div>
                  <div className="column-items">
                    {sidebarGroups.map((group) => (
                      group.items.map((item) => (
                        <div
                          key={item.id}
                          className={`column-item ${activeTab === item.id ? 'selected' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(item.id);
                            setSelectedItem(null);
                            if (item.view) setViewMode('columns');
                          }}
                        >
                          {typeof item.icon === 'string' ? (
                            <img src={item.icon} alt={item.label} className="column-icon-img" />
                          ) : (
                            <item.icon size={16} className="column-icon" />
                          )}
                          <span>{item.label}</span>
                        </div>
                      ))
                    ))}
                  </div>
                </div>
                <div className="column-panel">
                  <div className="column-header">{currentFolder?.name || currentFolder?.label}</div>
                  <div className="column-items">
                    {filteredData.map((item) => (
                      <div
                        key={item.id}
                        className={`column-item ${selectedItem === item.id ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem(item.id);
                        }}
                        onDoubleClick={() => handleDoubleClick(item)}
                      >
                        {typeof item.icon === 'string' ? (
                          <img src={item.icon} alt="" className="column-icon-img" />
                        ) : item.icon ? (
                          <item.icon
                            size={16}
                            strokeWidth={0.5}
                            fill={item.color || "none"}
                            className="column-icon"
                            style={{ color: item.color }}
                          />
                        ) : (
                          currentFolder?.icon && typeof currentFolder.icon !== 'string' && <currentFolder.icon size={16} className="column-icon" />
                        )}
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
                {selectedItem && filteredData.find(i => i.id === selectedItem) && (
                  <div className="column-panel preview-panel">
                    <div className="column-header">Preview</div>
                    <div className="column-preview">
                      {(() => {
                        const item = filteredData.find(i => i.id === selectedItem);
                        if (item.isReadme) {
                          return (
                            <div className="preview-content readme-preview">
                              <div className="readme-header">
                                <FileText size={48} className="readme-icon" />
                                <h2>{item.readme.title}</h2>
                                <span className="readme-status">{item.readme.status}</span>
                              </div>
                              <div className="readme-body">
                                <section className="readme-section">
                                  <h4>Overview</h4>
                                  <p>{item.readme.description}</p>
                                </section>
                                <section className="readme-section">
                                  <h4>Tech Stack</h4>
                                  <div className="readme-tags">
                                    {item.readme.techStack.map(tech => <span key={tech} className="readme-tag">{tech}</span>)}
                                  </div>
                                </section>
                                <section className="readme-section">
                                  <h4>Features</h4>
                                  <ul>
                                    {item.readme.features.map(f => <li key={f}>{f}</li>)}
                                  </ul>
                                </section>
                                <section className="readme-section links">
                                  {item.readme.github && (
                                    <a href={item.readme.github} target="_blank" rel="noopener noreferrer" className="readme-link">
                                      <Github size={14} /> GitHub
                                    </a>
                                  )}
                                  {item.readme.demo && (
                                    <a href={item.readme.demo} target="_blank" rel="noopener noreferrer" className="readme-link">
                                      <ExternalLink size={14} /> Live Demo
                                    </a>
                                  )}
                                </section>
                              </div>
                            </div>
                          );
                        }
                        return (
                          <div className="preview-content">
                            <div className="preview-icon">
                              {typeof item.icon === 'string' ? (
                                <img src={item.icon} alt={item.name} className="preview-icon-img" />
                              ) : item.icon ? (
                                <item.icon
                                  size={64}
                                  strokeWidth={0.5}
                                  fill={item.color || "none"}
                                  style={{ color: item.color }}
                                />
                              ) : null}
                            </div>
                            <h3 className="preview-title">{item.name}</h3>
                            <p className="preview-subtitle">{item.type || 'Item'} {item.size && `- ${item.size}`}</p>

                            <div className="preview-divider"></div>

                            <div className="preview-details">
                              <div className="preview-section">
                                <div className="preview-section-title">Information</div>
                                {item.info && <div className="preview-row"><span className="preview-label">Kind:</span> <span className="preview-value">{item.info}</span></div>}
                                {item.size && <div className="preview-row"><span className="preview-label">Size:</span> <span className="preview-value">{item.size}</span></div>}
                                {item.version && <div className="preview-row"><span className="preview-label">Version:</span> <span className="preview-value">{item.version}</span></div>}
                              </div>

                              {(item.created || item.modified || item.opened) && (
                                <div className="preview-section">
                                  <div className="preview-section-title">Dates</div>
                                  {item.created && <div className="preview-row"><span className="preview-label">Created:</span> <span className="preview-value">{item.created}</span></div>}
                                  {item.modified && <div className="preview-row"><span className="preview-label">Modified:</span> <span className="preview-value">{item.modified}</span></div>}
                                  {item.opened && <div className="preview-row"><span className="preview-label">Last opened:</span> <span className="preview-value">{item.opened}</span></div>}
                                  {item.date && !item.modified && <div className="preview-row"><span className="preview-label">Date:</span> <span className="preview-value">{item.date}</span></div>}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="list-view-table">
              <div className="list-header">
                <div className="header-cell">Name</div>
                <div className="header-cell">Kind</div>
                <div className="header-cell">Last Modified</div>
                {(activeTab === 'resume' || activeTab === 'contact') && <div className="header-cell">Actions</div>}
              </div>
              <div className="list-body">
                {filteredData.length > 0 ? filteredData.map((item) => (
                  <div
                    key={item.id}
                    className={`list-row ${selectedItem === item.id ? 'selected' : ''}`}
                    onClick={(e) => { e.stopPropagation(); setSelectedItem(item.id); }}
                    onDoubleClick={() => handleDoubleClick(item)}
                  >
                    <div className="list-cell name-cell">
                      {typeof item.icon === 'string' ? (
                        <img src={item.icon} alt="" className="list-icon-img" />
                      ) : item.icon ? (
                        <item.icon
                          size={16}
                          strokeWidth={0.5}
                          fill={item.color || "none"}
                          className="list-icon"
                          style={{ color: item.color }}
                        />
                      ) : (
                        currentFolder?.icon && typeof currentFolder.icon !== 'string' && <currentFolder.icon size={16} className="list-icon" />
                      )}
                      <span>{item.name}</span>
                    </div>
                    <div className="list-cell info-cell">{item.info || (item.type === 'App' ? 'Application' : 'Folder')}</div>
                    <div className="list-cell date-cell">{item.date || "--"}</div>
                    {(activeTab === 'resume' || activeTab === 'contact') && (
                      <div className="list-cell actions-cell">
                        {activeTab === 'resume' ? (
                          <button className="action-btn" onClick={() => handleDoubleClick(item)} title="View"><Eye size={16} /></button>
                        ) : (
                          <button className="action-btn" onClick={() => handleDoubleClick(item)} title="Open"><ExternalLink size={16} /></button>
                        )}
                      </div>
                    )}
                  </div>
                )) : (
                  <div className="empty-state">No Items Found</div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

    </div>
  );
}

export default FinderApp;