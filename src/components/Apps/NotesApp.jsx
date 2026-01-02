import { useState, useEffect } from "react";
import "./NotesApp.css";
import { useSettings } from "../../context/SettingsContext";
import {
  FileText,
  ChevronRight,
  List,
  LayoutGrid,
  Search,
  MoreHorizontal,
  Folder,
  Trash2,
  Plus
} from "lucide-react";

const DEVELOPER_NOTES = [
  {
    id: "phil",
    title: "Coding Philosophy",
    modified: "Jan 1, 2026",
    content: "## How I Think\nSimple > Clever: Maintainable code is always better than a complex one-liner. Ship > Polish: Impact comes from software that is actually in users' hands. Readability Matters: Write code for the humans who will read it later. Data First: Decouple your logic from your data structures for maximum flexibility."
  },
  {
    id: "rules",
    title: "Engineering Rules",
    modified: "Dec 30, 2025",
    content: "## Rules for Success\n1. Measure twice, cut once. 2. Automate the boring stuff. 3. Test your edge cases. 4. Documentation is a feature."
  }
];

const folders = [
  { id: "all", label: "All Notes", icon: List },
  { id: "visitor", label: "Visitor Notes", icon: Folder },
  { id: "trash", label: "Recently Deleted", icon: Trash2 },
];

function NotesApp() {
  const { settings } = useSettings();
  const [activeFolder, setActiveFolder] = useState("all");
  const [activeNoteId, setActiveNoteId] = useState("phil");
  const [visitorNotes, setVisitorNotes] = useState(() => {
    const saved = localStorage.getItem("visitor_notes");
    return saved ? JSON.parse(saved) : [
      { id: "welcome", title: "Welcome Note", content: "Feel free to leave a note here! It stays in your browser.", modified: "Jan 2, 2026" }
    ];
  });

  useEffect(() => {
    localStorage.setItem("visitor_notes", JSON.stringify(visitorNotes));
  }, [visitorNotes]);

  const currentNotes = activeFolder === "all" ? DEVELOPER_NOTES : (activeFolder === "visitor" ? visitorNotes : []);
  const activeNote = currentNotes.find(n => n.id === activeNoteId) || currentNotes[0];

  const handleUpdateVisitorNote = (field, value) => {
    if (activeFolder !== "visitor") return;
    setVisitorNotes(prev => prev.map(n =>
      n.id === activeNoteId ? { ...n, [field]: value, modified: new Date().toLocaleDateString() } : n
    ));
  };

  const handleAddVisitorNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      modified: new Date().toLocaleDateString()
    };
    setVisitorNotes([newNote, ...visitorNotes]);
    setActiveNoteId(newNote.id);
  };

  const handleDeleteNote = (id) => {
    if (activeFolder !== "visitor") return;
    setVisitorNotes(prev => prev.filter(n => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  const renderMarkdown = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h2 key={i} className="md-h2">{line.replace('## ', '')}</h2>;
      if (line.match(/^\d+\. /)) return <li key={i} className="md-li"><strong>{line.split('. ')[0]}.</strong> {line.split('. ')[1]}</li>;
      if (line.startsWith('* ')) return <li key={i} className="md-li">{line.replace('* ', '')}</li>;
      return <p key={i} className="md-p">{line}</p>;
    });
  };

  return (
    <div className="notes-container">
      <aside className="notes-sidebar-nav">
        <div className="nav-section">
          {folders.map(folder => (
            <div
              key={folder.id}
              className={`nav-link ${activeFolder === folder.id ? 'active' : ''}`}
              onClick={() => {
                setActiveFolder(folder.id);
                const firstNote = folder.id === 'all' ? DEVELOPER_NOTES[0] : (folder.id === 'visitor' ? visitorNotes[0] : null);
                if (firstNote) setActiveNoteId(firstNote.id);
                else setActiveNoteId(null);
              }}
            >
              <folder.icon size={16} />
              <span>{folder.label}</span>
            </div>
          ))}
        </div>
      </aside>

      <div className="notes-main-area">
        <header className="notes-toolbar-alt">
          <div className="toolbar-left-group">
            <span className="folder-name-label">
              {folders.find(f => f.id === activeFolder)?.label}
            </span>
            <span className="count-badge">{currentNotes.length} notes</span>
          </div>

          <div className="toolbar-right-group">
            {activeFolder === "visitor" && (
              <button className="create-btn" onClick={handleAddVisitorNote} title="New Note">
                <Plus size={18} />
              </button>
            )}
            <button
              className={`action-btn ${activeFolder === 'all' ? 'disabled' : ''}`}
              onClick={() => activeNoteId && handleDeleteNote(activeNoteId)}
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </header>

        <div className="notes-content-split">
          <div className="notes-list-pane">
            <table className="list-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Modified</th>
                </tr>
              </thead>
              <tbody>
                {currentNotes.length === 0 && (
                  <tr><td colSpan="2" className="empty-state">No Notes</td></tr>
                )}
                {currentNotes.map(note => (
                  <tr
                    key={note.id}
                    className={`${activeNoteId === note.id ? 'active' : ''} ${activeFolder === 'trash' ? 'trashed' : ''}`}
                    onClick={() => setActiveNoteId(note.id)}
                  >
                    <td className="note-name-cell">
                      <FileText size={14} />
                      <span className="truncate">{note.title}</span>
                    </td>
                    <td className="note-date-cell">{note.modified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="notes-preview-pane">
            {activeNote ? (
              <div className="editor-wrapper">
                {activeFolder === "visitor" ? (
                  <div className="visitor-editor">
                    <div className="scratchpad-header">
                      Personal scratchpad — saved locally in your browser.
                    </div>
                    <input
                      className="visitor-title-input"
                      value={activeNote.title}
                      onChange={(e) => handleUpdateVisitorNote("title", e.target.value)}
                      placeholder="Note Title"
                      spellCheck="false"
                    />
                    <textarea
                      className="visitor-textarea"
                      value={activeNote.content}
                      onChange={(e) => handleUpdateVisitorNote("content", e.target.value)}
                      placeholder="Start typing..."
                      spellCheck="false"
                    />
                  </div>
                ) : (
                  <div className="readonly-content">
                    {renderMarkdown(activeNote.content)}
                  </div>
                )}

                {settings.notes.showWordCount && (
                  <div className="notes-status-bar">
                    {getWordCount(activeNote.content)} words
                  </div>
                )}
              </div>
            ) : (
              <div className="no-selection">No Note Selected</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesApp;
