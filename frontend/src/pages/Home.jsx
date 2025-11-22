import { useState, useEffect } from "react";
// useState → hold notes, title, content
// useEffect → run getNotes() when page loads

import api from "../api";
// Axios instance for backend API calls

import Note from "../components/Note";
// Component that displays a single note

import "../styles/Home.css";
// Styling for the Home page



function Home() {
// Home page shows: 
// 1. List of notes
// 2. Form to create a new note



  const [notes, setNotes] = useState([]);
  // Stores all notes returned from backend

  const [content, setContent] = useState("");
  // State for the note content textbox

  const [title, setTitle] = useState("");
  // State for the title input box



  useEffect(() => {
    getNotes();
    // Runs only once when Home component loads
  }, []);
  // Empty dependency array → componentDidMount behavior



  const getNotes = () => {
  // Fetch all notes from backend

    api
      .get("/api/notes/")
      // GET request to fetch notes list

      .then((res) => res.data)
      // Convert response → extract only data

      .then((data) => {
        setNotes(data);
        // Update notes state with fetched data

        console.log(data);
        // Debugging log to see notes in console
      })

      .catch((err) => alert(err));
      // Error handling
  };



  const deleteNote = (id) => {
  // Deletes a note by ID

    api
      .delete(`/api/notes/delete/${id}/`)
      // DELETE request to backend

      .then((res) => {
        if (res.status === 204) alert("Note deleted!");
        // 204 = successfully deleted

        else alert("Failed to delete note.");

        getNotes();
        // Refresh notes list after deletion
      })

      .catch((error) => alert(error));
      // Error handling
  };



  const createNote = (e) => {
  // Function to create a new note

    e.preventDefault();
    // Prevents page reload when submitting form

    api
      .post("/api/notes/", { content, title })
      // POST request to create a note
      // Sends data: title + content

      .then((res) => {
        if (res.status === 201) alert("Note created!");
        // 201 = successfully created

        else alert("Failed to make note.");

        getNotes();
        // Reload notes after new note creation

        setTitle("");
        // Clear title field

        setContent("");
        // Clear content field
      })

      .catch((err) => alert(err));
      // Error handling
  };



  return (
    <div className="page">
    {/* Page wrapper */}



      <h2 className="section-title">Your Notes</h2>
      {/* Section title for notes list */}



      <div className="notes-grid">
      {/* Grid layout for listing notes */}

        {notes.map(note => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
          // For each note:
          // Render a Note component
          // Pass note data + delete function
          // key helps React track list items
        ))}

      </div>



      <h2 className="section-title">Create a Note</h2>
      {/* Section title for create form */}



      <form onSubmit={createNote}>
      {/* Form that triggers createNote() */}

        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
        {/* Controlled input for title */}



        <label>Content:</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        {/* Controlled textarea for content */}



        <input type="submit" value="Submit" />
        {/* Button to create note */}

      </form>



    </div>
  );
}

export default Home;
// Export Home component for App.jsx
