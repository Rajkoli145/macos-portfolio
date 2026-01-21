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
    Clock
} from "lucide-react";

function SafariApp({ onOpenApp }) {
    const [openingLink, setOpeningLink] = useState(null);

    const profiles = [
        { id: 'github', label: 'GitHub', icon: Github, url: 'https://github.com/Rajkoli145' },
        { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/raj-koli-626008318/' },
        { id: 'resume', label: 'Resume', icon: FileText, url: 'preview' },
        { id: 'portfolio', label: 'Portfolio', icon: RotateCw, url: 'https://rajkoli.vercel.app/' },
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
                                    className="favorite-item"
                                    onClick={() => handleExternalLink(profile.url, profile.label)}
                                >
                                    <div className="favorite-icon-box">
                                        <profile.icon size={24} />
                                    </div>
                                    <span className="favorite-label">{profile.label}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* About & Contact Grid */}
                    <div className="content-columns">
                        <div className="column-left">
                            <section className="about-safari-section">
                                <h2 className="section-heading">About This Developer</h2>
                                <div className="about-details">
                                    <h3 className="dev-name">Raj Koli</h3>
                                    <p className="dev-role">Full-Stack Developer</p>
                                    <p className="dev-philosophy">Building tools that empower, interfaces that inspire.</p>
                                    <div className="status-grid">
                                        <div className="status-item">
                                            <MapPin size={14} />
                                            <span>Mumbai, India</span>
                                        </div>
                                        <div className="status-item">
                                            <Clock size={14} />
                                            <span>IST (UTC+5:30)</span>
                                        </div>
                                        <div className="status-item available">
                                            <div className="pulse-dot"></div>
                                            <span>Open for new projects</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="contact-safari-section">
                                <h2 className="section-heading">Contact</h2>
                                <div
                                    className="contact-card"
                                    onClick={() => handleExternalLink("mail", "Email")}
                                >
                                    <Mail size={18} />
                                    <span>2024.rajk@isu.ac.in</span>
                                    <ExternalLink size={14} className="ext-icon" />
                                </div>
                            </section>
                        </div>

                        <div className="column-right">
                            <section className="work-safari-section">
                                <h2 className="section-heading">Selected Work</h2>
                                <div className="projects-vertical">
                                    {projects.map((proj, i) => (
                                        <div
                                            key={i}
                                            className="project-row"
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
                        </div>
                    </div>

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
