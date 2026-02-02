import { useState, useEffect } from "react";
import "./SafariApp.css";
import {
    ChevronLeft,
    ChevronRight,
    RotateCw,
    ShieldCheck,
    Share,
    Plus,
    Copy,
    ExternalLink,
    Github,
    Linkedin,
    FileText,
    Mail,
    MapPin,
    Clock,
    Globe
} from "lucide-react";
import resumeIcon from "../../assets/finder-icons/resume.svg";

function SafariApp({ onOpenApp }) {
    const [openingLink, setOpeningLink] = useState(null);

    const profiles = [
        { id: 'github', label: 'GitHub', icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", url: 'https://github.com/Rajkoli145' },
        { id: 'linkedin', label: 'LinkedIn', icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg", url: 'https://www.linkedin.com/in/raj-koli-626008318/' },
        { id: 'resume', label: 'Resume', icon: resumeIcon, url: 'preview' },
        { id: 'portfolio', label: 'Portfolio', icon: Globe, url: 'https://rajkoli.vercel.app/' },
    ];

    const projects = [
        {
            title: "macOS Portfolio",
            desc: "A premium, interactive desktop experience built with React.",
            link: "https://github.com/Rajkoli145/macos-portfolio"
        },
        {
            title: "FreelancerFlow",
            desc: "Freelancer management platform with project tracking.",
            link: "https://github.com/Rajkoli145/FreelancerFlow"
        },
        {
            title: "Student-Teacher Booking",
            desc: "Appointment scheduling system for educational institutions.",
            link: "https://github.com/Rajkoli145/Student-teacher-booking"
        },
        {
            title: "Decathlon Clone",
            desc: "A feature-rich e-commerce clone of the Decathlon website.",
            link: "https://github.com/Rajkoli145/Decathlon-Clone"
        },
        {
            title: "Netflix Clone",
            desc: "A pixel-perfect Netflix UI clone with dynamic content.",
            link: "https://github.com/Rajkoli145/Netflix-clone"
        },
        {
            title: "New Chatting App",
            desc: "A real-time communication platform for modern teams.",
            link: "https://github.com/Rajkoli145/New-chatting-App"
        },
        {
            title: "Restaurant App",
            desc: "A digital menu and ordering system for dining establishments.",
            link: "https://github.com/Rajkoli145/Restaurant"
        }
    ];

    const handleExternalLink = (url, label) => {
        if (url === 'preview') {
            if (onOpenApp) onOpenApp('preview', 'Preview - Resume');
            return;
        }
        if (url === 'mail') {
            if (onOpenApp) onOpenApp('mail', 'Mail');
            return;
        }
        setOpeningLink(label);
        setTimeout(() => {
            window.open(url, '_blank', 'noopener,noreferrer');
            setOpeningLink(null);
        }, 1200);
    };

    return (
        <div className="safari-container">
            {/* Safari Toolbar */}
            <header className="safari-toolbar-view">
                <div className="toolbar-navigation-group">
                    <button className="nav-btn disabled"><ChevronLeft size={18} /></button>
                    <button className="nav-btn disabled"><ChevronRight size={18} /></button>
                </div>

                <div className="toolbar-address-bar">
                    <ShieldCheck size={13} className="shield-icon-safari" />
                    <span className="address-text">safari://start</span>
                    <RotateCw size={13} className="reload-icon-safari" />
                </div>

                <div className="toolbar-actions-group">
                    <button className="action-btn-safari"><Share size={17} /></button>
                    <button className="action-btn-safari"><Plus size={17} /></button>
                    <button className="action-btn-safari"><Copy size={17} /></button>
                </div>
            </header>

            {/* Start Page Content */}
            <main className="safari-content-view">
                <div className="safari-start-page">

                    {/* Header Section */}
                    <section className="start-hero-section">
                        <h1 className="start-title">Favorites</h1>
                        <div className="favorites-grid">
                            {profiles.map(profile => (
                                <div
                                    key={profile.id}
                                    data-id={profile.id}
                                    className="favorite-item"
                                    onClick={() => handleExternalLink(profile.url, profile.label)}
                                >
                                    <div className="favorite-icon-box">
                                        {typeof profile.icon === 'string' ? (
                                            <img src={profile.icon} alt={profile.label} className="favorite-img-icon" />
                                        ) : (
                                            <profile.icon size={28} />
                                        )}
                                    </div>
                                    <span className="favorite-label">{profile.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Selected Work Section */}
                    <section className="work-safari-section">
                        <h2 className="section-heading">Selected Work</h2>
                        <div className="projects-grid">
                            {projects.map((proj, i) => (
                                <div
                                    key={i}
                                    className="project-card"
                                    onClick={() => handleExternalLink(proj.link, proj.title)}
                                >
                                    <div className="proj-info">
                                        <span className="proj-title">{proj.title}</span>
                                        <p className="proj-desc">{proj.desc}</p>
                                    </div>
                                    <ExternalLink size={16} className="proj-ext" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Opening Link Feedback Overlay */}
                    {openingLink && (
                        <div className="opening-link-overlay">
                            <div className="opening-toast">
                                <RotateCw size={16} className="spin-icon" />
                                <span>Opening {openingLink}...</span>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default SafariApp;
