import "./NotesApp.css";

function NotesApp() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="notes-app">
      <div className="notes-sidebar">
        <div className="notes-list-item active">
          <p className="note-title">Philosophy</p>
          <p className="note-date">Dec 26, {currentYear}</p>
          <p className="note-preview">“How I think” & “Rules I code by”</p>
        </div>
      </div>

      <div className="notes-editor">
        <div className="editor-header">
          <p className="editor-date">Dec 26, {currentYear} at 2:45 PM</p>
        </div>

        <div className="editor-body">
          <h1>How I Think</h1>

          <section className="philosophy-section">
            <h3>Rules I code by:</h3>
            <ul>
              <li><strong>Simple {">"} Clever:</strong> Maintainable code is always better than a complex one-liner.</li>
              <li><strong>Ship {">"} Polish:</strong> Impact comes from software that is actually in users' hands.</li>
              <li><strong>Readability Matters:</strong> Write code for the humans who will read it later, not just the compiler.</li>
              <li><strong>Data First:</strong> Decouple your logic from your data structures for maximum flexibility.</li>
            </ul>
          </section>

          <section className="philosophy-section">
            <h3>What I care about:</h3>
            <p>
              I care about the bridge between code and product. I don't just write
              functions; I build tools that help people move faster. I value clarity,
              honesty in engineering, and the "delete key" as a feature.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
