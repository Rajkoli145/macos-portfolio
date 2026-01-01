import { useState } from "react";
import "./MailApp.css";
import { Send, User, CheckCircle, RotateCw, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

/**
 * 🛠 EMAILJS CONFIGURATION
 * 1. Go to https://www.emailjs.com/
 * 2. Create an account and a Service (e.g., Gmail)
 * 3. Create an Email Template
 * 4. Replace the following IDs with your own:
 */
const EMAILJS_SERVICE_ID = "service_h1hvz1i";
const EMAILJS_TEMPLATE_ID = "template_9blrhui";
const EMAILJS_PUBLIC_KEY = "iZ9X6AvWF4KE1fWnd";

function MailApp() {
    const [formData, setFormData] = useState({
        from_email: "",
        subject: "",
        message: ""
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(null);

    const developerEmail = "2024.rajk@isu.ac.in";

    const handleSend = (e) => {
        e.preventDefault();

        // Safety check for placeholders
        if (EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID") {
            setError("EmailJS not configured. Please add your credentials in MailApp.jsx");
            return;
        }

        setIsSending(true);
        setError(null);

        const templateParams = {
            from_email: formData.from_email,
            to_email: developerEmail,
            subject: formData.subject,
            message: formData.message,
        };

        emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        )
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                setIsSending(false);
                setIsSent(true);
            }, (err) => {
                console.log('FAILED...', err);
                setIsSending(false);
                setError("Failed to send. Please check your credentials.");
            });
    };

    const handleReset = () => {
        setFormData({ from_email: "", subject: "", message: "" });
        setIsSent(false);
        setError(null);
    };

    if (isSent) {
        return (
            <div className="mail-sent-state">
                <CheckCircle size={48} className="success-icon" />
                <h2>Message Sent</h2>
                <p>Your message has been sent successfully. I'll get back to you soon!</p>
                <button className="reset-btn" onClick={handleReset}>Write Another</button>
            </div>
        );
    }

    return (
        <div className="mail-compose-container">
            <header className="mail-compose-header">
                <div className="compose-title">New Message</div>
                <button
                    className="mail-send-btn"
                    onClick={handleSend}
                    disabled={!formData.from_email || !formData.message || isSending}
                >
                    {isSending ? <RotateCw size={16} className="spin-icon" /> : <Send size={16} />}
                    <span>{isSending ? "Sending..." : "Send"}</span>
                </button>
            </header>

            {error && (
                <div className="mail-error-banner">
                    <AlertCircle size={14} />
                    <span>{error}</span>
                </div>
            )}

            <div className="mail-compose-fields">
                <div className="compose-field">
                    <label>To:</label>
                    <div className="field-value-readonly">
                        <div className="recipient-chip">
                            <User size={12} />
                            <span>Raj Koli &lt;{developerEmail}&gt;</span>
                        </div>
                    </div>
                </div>

                <div className="compose-field">
                    <label>From:</label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={formData.from_email}
                        onChange={(e) => setFormData({ ...formData, from_email: e.target.value })}
                        spellCheck="false"
                        disabled={isSending}
                    />
                </div>

                <div className="compose-field">
                    <label>Subject:</label>
                    <input
                        type="text"
                        placeholder="Regarding..."
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        spellCheck="false"
                        disabled={isSending}
                    />
                </div>
            </div>

            <div className="mail-message-area">
                <textarea
                    placeholder="Write your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    spellCheck="false"
                    disabled={isSending}
                />
            </div>
        </div>
    );
}

export default MailApp;
