import React, { useState, useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';
import './LockScreen.css';

const LockScreen = () => {
    const { settings, setSystemStatus } = useSettings();
    const [time, setTime] = useState(new Date());
    const [isUnlocking, setIsUnlocking] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [password, setPassword] = useState('');

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        const animTimer = setTimeout(() => setIsActive(true), 10);
        return () => {
            clearInterval(timer);
            clearTimeout(animTimer);
        };
    }, []);

    const handleUnlock = (e) => {
        if (e) e.preventDefault();
        setIsUnlocking(true);
        // Seamless transition back to desktop
        setTimeout(() => {
            setSystemStatus('running');
        }, 450);
    };

    const formatDate = (date) => {
        const options = { weekday: 'long', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const formatTime = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).replace(/\s?[AP]M/i, '');
    };

    return (
        <div
            className={`lock-screen ${isActive ? 'active' : ''} ${isUnlocking ? 'fade-out' : ''} interact-active`}
        >
            <div className="lock-screen-content">
                <div className="lock-clock-section shrunk">
                    <div className="lock-date">{formatDate(time)}</div>
                    <div className="lock-time">{formatTime(time)}</div>
                </div>

                <div className="lock-user-section visible">
                    <div className="lock-user-container">
                        <div className="user-avatar">
                            {settings?.user?.customAvatar ? (
                                <img src={settings.user.customAvatar} alt="User" className="lock-avatar-img" />
                            ) : (
                                <span role="img" aria-label="user">{settings?.user?.avatar || "💀"}</span>
                            )}
                        </div>
                        <div className="user-name">{settings?.user?.name || "Raj Koli"}</div>

                        <form onSubmit={handleUnlock} className="password-form" autoComplete="off">
                            {/* Dummy inputs to fool browser password managers */}
                            <input type="text" name="fake-username" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" autoComplete="username" />
                            <input type="password" name="fake-password" style={{ display: 'none' }} tabIndex="-1" aria-hidden="true" autoComplete="current-password" />
                            <div className="password-input-wrapper">
                                <input
                                    type="text"
                                    autoFocus
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="password-input"
                                    autoComplete="current-password"
                                    spellCheck="false"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleUnlock(e);
                                    }}
                                    disabled={isUnlocking}
                                />
                                {password && (
                                    <div className="password-submit-btn" onClick={handleUnlock}>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M9 18l6-6-6-6" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                            <div className="unlock-hint">Enter any Password to Open</div>
                            <button type="submit" style={{ display: 'none' }} />
                        </form>
                    </div>
                </div>
            </div>

            <div className="lock-status-bar faded">
                <div className="status-item">U.S.</div>
                <div className="status-item">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 19C12.5523 19 13 18.5523 13 18C13 17.4477 12.5523 17 12 17C11.4477 17 11 17.4477 11 18C11 18.5523 11.4477 19 12 19Z" fill="currentColor" />
                        <path d="M18.364 12.636C14.8492 9.12132 9.15076 9.12132 5.63604 12.636" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M21.1924 9.80761C16.1147 4.72993 7.88527 4.72993 2.80759 9.80761" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                        <path d="M15.5355 15.4645C13.5829 13.5119 10.4171 13.5119 8.46447 15.4645" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                </div>
                <div className="status-item">88%</div>
                <div className="status-item battery">
                    <div className="battery-icon"></div>
                </div>
            </div>
        </div>
    );
};

export default LockScreen;
