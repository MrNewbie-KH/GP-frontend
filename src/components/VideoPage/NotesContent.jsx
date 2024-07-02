import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import AddQuestion from "./AddQuestion";
import axios from "axios";
import Loader from "../Loader";

function NotesContent({ lessonId }) {
  const [addNote, setAddNote] = useState(false);
  const [notes, setNotes] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const re = () => {
    setReload((reload) => !reload);
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    const getNotes = async function () {
      const response = await axios.get(
        `https://e-learning-platform-uwoj.onrender.com/lesson/note/get-Notes?lessonId=${lessonId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(response.data.data);
      setIsLoading(false);
    };
    getNotes();
  }, [lessonId, reload]);

  return (
    <>
      <h1>Notes</h1>
      <button
        className="add-note-btn"
        onClick={() => setAddNote(true)}
      >
        + Add Note
      </button>
      {addNote ? (
        <AddQuestion id={lessonId} isNote={true} setAskQuestion={setAddNote} reload={re} />
      ) : (
        <></>
      )}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {notes &&
            notes.map((note, index) => <NoteCard data={note} key={index} reload={re} />)}
        </>
      )}
    </>
  );
}

export default NotesContent;
