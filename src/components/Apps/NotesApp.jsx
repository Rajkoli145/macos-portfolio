import { useState, useEffect } from "react";
import "./NotesApp.css";
import { useSettings } from "../../context/SettingsContext"; // Import context
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

// ... (Constants DEVELOPER_NOTES and DEVELOPER_DRAFTS remain unchanged)

function NotesApp() {
  const { settings } = useSettings(); // Use settings
  const [activeFolder, setActiveFolder] = useState("all");
  const [activeNoteId, setActiveNoteId] = useState("phil");
  // ... (State initialization remains same)

  // ... (Helper functions remain same)

  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
  };

  return (
    <div className="notes-container">
      {/* Sidebar (unchanged) */}
      <aside className="notes-sidebar-nav">
        <div className="nav-section">
          {folders.map(folder => (
            <div
              key={folder.id}
              className={`nav-link ${activeFolder === folder.id ? 'active' : ''}`}
              onClick={() => {
                setActiveFolder(folder.id);
                // logic unchanged
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
        {/* Toolbar (unchanged) */}
        <header className="notes-toolbar-alt">
          {/* ... toolbar content ... */}
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
            {/* Table Logic Unchanged */}
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
