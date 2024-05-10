import { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import AddQuestion from "./AddQuestion";
import axios from "axios";
import Loader from "../Loader";

function NotesContent({ lessonId }) {
  const [addNote, setAddNote] = useState(false);
  const [notes, setNotes] = useState();
  const [isLoading,setIsLoading]=useState(true);
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
      console.log(response.data);
    };
    getNotes();
  }, []);

  return (
    <>
      <h1>Notes</h1>
      {isLoading ? (
  <Loader />
) : (
  !addNote ? (
    <>
      <button className="add-note-btn" onClick={() => setAddNote(true)}>
        + Add Note
      </button>
      {notes && notes.map((note, index) => <NoteCard data={note} key={index} />)}
    </>
  ) : (
    <AddQuestion isReply={true} />
  )
)}

 
    </>
  );
}

export default NotesContent;
