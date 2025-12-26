import "./SafariApp.css";

function SafariApp() {
    const projects = [
        {
            name: "RealityCheck",
            description: "Reality-First Project Management SaaS for high-stakes teams.",
            tech: ["React", "Express.js", "MongoDB", "Firebase"],
            link: "https://github.com/rajkoli/realitycheck",
            color: "#0071e3"
        },
        {
            name: "FreelancerFlow",
            description: "Automated workflow engine for freelance project management.",
            tech: ["Node.js", "Next.js", "Redis", "Docker"],
            link: "https://github.com/rajkoli/freelancerflow",
            color: "#34c759"
        },
        {
            name: "Awkward Potato",
            description: "Lightweight JS widget for detecting socially awkward typing patterns.",
            tech: ["Vanilla JS", "CSS Animations", "Webpack"],
            link: "https://github.com/rajkoli/awkward-potato",
            color: "#ff9500"
        },
        {
            name: "Portfolio OS",
            description: "A fully functional macOS desktop simulation built with React.",
            tech: ["React", "Vite", "Glassmorphism", "Git"],
            link: "https://github.com/rajkoli/macos-portfolio",
            color: "#af52de"
        }
    ];

    return (
        <div className="safari">
            <div className="safari-toolbar">
                <div className="safari-address-bar">
                    <span className="lock-icon">🔒</span>
                    rajkoli.dev/projects
                </div>
            </div>

            <div className="safari-content">
                <header className="projects-header">
                    <h1>Proof of Work</h1>
                    <p>Hand-picked projects that demonstrate technical depth and product thinking.</p>
                </header>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <div key={index} className="project-card">
                            <div className="project-accent" style={{ background: project.color }}></div>
                            <div className="project-body">
                                <h3>{project.name}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link">
                                    View Project <span className="arrow">↗</span>
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SafariApp;
