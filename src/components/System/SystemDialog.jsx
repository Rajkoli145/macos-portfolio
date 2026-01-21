import React from 'react';
import { AlertTriangle, Info, Power, LogOut, RotateCcw } from 'lucide-react';

const SystemDialog = ({
    isOpen,
    type = 'info',
    title,
    message,
    confirmLabel = 'OK',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'shutdown': return <Power size={48} className="dialog-icon power" />;
            case 'restart': return <RotateCcw size={48} className="dialog-icon restart" />;
            case 'logout': return <LogOut size={48} className="dialog-icon logout" />;
            case 'warning': return <AlertTriangle size={48} className="dialog-icon warning" />;
            default: return <Info size={48} className="dialog-icon info" />;
        }
    };

    return (
        <div className="system-dialog-overlay" onClick={onCancel}>
            <div className="system-dialog-card" onClick={e => e.stopPropagation()}>
                <div className="dialog-content">
                    <div className="dialog-icon-container">
                        {getIcon()}
                    </div>
                    <div className="dialog-text">
                        <h3 className="dialog-title">{title}</h3>
                        <p className="dialog-message">{message}</p>
                    </div>
                </div>
                <div className="dialog-actions">
                    <button className="dialog-btn cancel" onClick={onCancel}>{cancelLabel}</button>
                    <button className="dialog-btn confirm" onClick={onConfirm}>{confirmLabel}</button>
                </div>
            </div>

            <style jsx="true">{`
                .system-dialog-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(4px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 20000;
                    animation: fadeIn 0.2s ease-out;
                }
                .system-dialog-card {
                    background: rgba(40, 40, 42, 0.85);
                    backdrop-filter: blur(40px) saturate(180%);
                    border: 0.5px solid rgba(255, 255, 255, 0.2);
                    border-radius: 12px;
                    width: 320px;
                    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
                    color: white;
                    overflow: hidden;
                    text-align: center;
                    display: flex;
                    flex-direction: column;
                    animation: popUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .dialog-content {
                    padding: 24px 20px 20px;
                }
                .dialog-icon-container {
                    margin-bottom: 12px;
                    display: flex;
                    justify-content: center;
                }
                .dialog-icon {
                    opacity: 0.9;
                }
                .dialog-icon.power { color: #ff3b30; }
                .dialog-icon.restart { color: #ff9500; }
                .dialog-icon.logout { color: #007aff; }
                .dialog-icon.warning { color: #ffcc00; }
                .dialog-icon.info { color: #007aff; }

                .dialog-text {
                    margin-bottom: 4px;
                }
                .dialog-title {
                    margin: 0 0 8px;
                    font-size: 15px;
                    font-weight: 600;
                    color: white;
                }
                .dialog-message {
                    margin: 0;
                    font-size: 13px;
                    line-height: 1.4;
                    color: rgba(255, 255, 255, 0.7);
                }
                .dialog-actions {
                    display: flex;
                    border-top: 0.5px solid rgba(255, 255, 255, 0.1);
                    height: 44px;
                }
                .dialog-btn {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #007aff;
                    font-size: 14px;
                    cursor: pointer;
                    transition: background 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .dialog-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                }
                .dialog-btn:active {
                    background: rgba(255, 255, 255, 0.1);
                }
                .dialog-btn.confirm {
                    font-weight: 600;
                    border-left: 0.5px solid rgba(255, 255, 255, 0.1);
                }
                .dialog-btn.cancel {
                    color: white;
                    opacity: 0.8;
                }

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes popUp {
                    from { opacity: 0; transform: scale(0.9) translateY(10px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default SystemDialog;
