import { useState } from "react";
import NoteCard from "./NoteCard";
import AddQuestion from "./AddQuestion";

function NotesContent({ information }) {
  const [addNote, setAddNote] = useState(false);

  return (
    <>
      <h1>Notes</h1>
      {!addNote ? (
        <>
          <button className="add-note-btn" onClick={() => setAddNote(true)}>
            + Add Note
          </button>
          {/* here to render all the notes */}
          <NoteCard />
          <NoteCard />
        </>
      ) : (
        <AddQuestion isReply={true} />
      )}
    </>
  );
}

export default NotesContent;
