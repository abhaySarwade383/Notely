import { useState, useEffect } from "react";
import api from "../api";
import Note from "../components/Note";
import "../styles/Home.css";

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        else alert("Failed to delete note.");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("Note created!");
        else alert("Failed to make note.");
        getNotes();
        setTitle("");
        setContent("");
      })
      .catch((err) => alert(err));
  };

  return (
<div className="page">

  <h2 className="section-title">Your Notes</h2>

  <div className="notes-grid">
    {notes.map(note => (
      <Note note={note} onDelete={deleteNote} key={note.id} />
    ))}
  </div>

  <h2 className="section-title">Create a Note</h2>

  <form onSubmit={createNote}>
    <label>Title:</label>
    <input value={title} onChange={(e) => setTitle(e.target.value)} />

    <label>Content:</label>
    <textarea value={content} onChange={(e) => setContent(e.target.value)} />

    <input type="submit" value="Submit" />
  </form>

</div>

  );
}

export default Home;
