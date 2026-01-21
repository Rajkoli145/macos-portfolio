import React, { useState, useMemo, useRef, useEffect } from "react";
import "./Launchpad.css";
import { Search, MoreHorizontal } from "lucide-react";

// Mock categories to match Tahoe UI
const CATEGORIES = ["Productivity & Finance", "Utilities", "Developer Tools", "Entertainment", "Creativity", "Social", "Other"];

const Launchpad = ({ show, onClose, onOpenApp, apps }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("Productivity & Finance");
    const searchInputRef = useRef(null);

    useEffect(() => {
        if (show && searchInputRef.current) {
            // Delay slightly to ensure visibility transition has started
            setTimeout(() => searchInputRef.current?.focus(), 50);
        } else if (!show) {
            setSearchQuery(""); // Reset search on close
        }
    }, [show]);

    const filteredApps = useMemo(() => {
        // Filter out Launchpad itself and Trash
        const list = apps.filter(app => app.id !== 'launchpad' && !app.isTrash);
        if (!searchQuery) return list;
        return list.filter(app =>
            app.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [apps, searchQuery]);

    return (
        <div className={`launchpad-overlay ${show ? "visible" : ""}`} onClick={onClose}>
            <div className="launchpad-content-card" onClick={(e) => {
                // Only stop propagation if it's NOT the card background itself
                if (e.target.className === 'launchpad-content-card' || e.target.className === 'launchpad-grid-scroll' || e.target.className === 'launchpad-grid') {
                    onClose();
                } else {
                    e.stopPropagation();
                }
            }}>
                <header className="launchpad-tahoe-header">
                    <div className="header-left">
                        <div className="app-store-icon">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L2 22M12 2L22 22M12 2V22M2 22L22 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="header-title">Applications</span>
                    </div>

                    <div className="header-center">
                        <div className="launchpad-search">
                            <Search size={14} className="search-icon" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>

                    <div className="header-right">
                        <button className="more-btn" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={18} /></button>
                    </div>
                </header>

                <div className="launchpad-categories" onClick={(e) => e.stopPropagation()}>
                    <div className="categories-scroll-wrapper">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat}
                                className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveCategory(cat);
                                }}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="launchpad-grid-scroll">
                    <div className="launchpad-grid">
                        {filteredApps.map((app) => (
                            <div
                                key={app.id}
                                className="launchpad-app"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onOpenApp(app.id, app.name);
                                    onClose();
                                }}
                            >
                                <div className="app-icon-wrapper">
                                    <img src={app.icon} alt={app.name} className="app-icon" />
                                </div>
                                <span className="app-name">{app.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Launchpad;
