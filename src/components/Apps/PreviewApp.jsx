import React from 'react';
import { Download, FileText, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import './PreviewApp.css';

function PreviewApp({ type, data, onOpenApp }) {
    if (type === 'markdown' && data) {
        const { readme } = data;
        return (
            <div className="preview-app-container">
                <div className="preview-md-content">
                    <header className="md-header">
                        <div className="md-icon-large">
                            {data.icon && typeof data.icon !== 'string' ? (
                                <data.icon size={48} strokeWidth={1.5} style={{ color: data.color }} />
                            ) : (
                                <FileText size={48} strokeWidth={1.5} />
                            )}
                        </div>
                        <h1 className="md-title">{readme.title}</h1>
                        <span className="md-status-badge">{readme.status}</span>
                    </header>

                    <div className="md-body">
                        <section className="md-section">
                            <h3 className="md-section-title">Overview</h3>
                            <p className="md-description">{readme.description}</p>
                        </section>

                        <section className="md-section">
                            <h3 className="md-section-title">Tech Stack</h3>
                            <div className="md-tech-grid">
                                {readme.techStack && readme.techStack.map(tech => (
                                    <span key={tech} className="md-tech-tag">{tech}</span>
                                ))}
                            </div>
                        </section>

                        <section className="md-section">
                            <h3 className="md-section-title">Key Features</h3>
                            <ul className="md-features-list">
                                {readme.features && readme.features.map(f => (
                                    <li key={f} className="md-feature-item">
                                        <CheckCircle2 size={18} className="feature-check" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <footer className="md-links-footer">
                            {readme.github && (
                                <a href={readme.github} target="_blank" rel="noopener noreferrer" className="md-action-link">
                                    <Github size={20} /> View on GitHub
                                </a>
                            )}
                            {readme.demo && (
                                <a href={readme.demo} target="_blank" rel="noopener noreferrer" className="md-action-link secondary">
                                    <ExternalLink size={20} /> Live Demo
                                </a>
                            )}
                        </footer>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="preview-app-container">
            <div className="pdf-container">
                <iframe
                    src="/resume.pdf"
                    title="Resume Preview"
                    style={{ width: '100%', height: '100%', border: 'none' }}
                />
                <a
                    href="/resume.pdf"
                    download="Raj_Resume.pdf"
                    className="download-fab"
                    title="Download PDF"
                >
                    <Download size={24} />
                </a>
            </div>
        </div>
    );
}

export default PreviewApp;
