import "./FinderApp.css";

function FinderApp() {
  return (
    <div className="finder">
      <aside className="finder-sidebar">
        <div className="finder-item active">About Me</div>
        <div className="finder-item">Skills</div>
        <div className="finder-item">Experience</div>
      </aside>

      <main className="finder-content">
        <h2>Raj</h2>
        <p>
          I build clean, practical web applications with a focus on structure,
          clarity, and performance.
        </p>
      </main>
    </div>
  );
}

export default FinderApp;
