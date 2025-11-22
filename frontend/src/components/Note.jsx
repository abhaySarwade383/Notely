import React from "react";
// Importing React so we can create a functional component.

import "../styles/Note.css"
// Importing CSS file to style the note UI.



function Note({ note, onDelete }) {
// Note component receives two props:
// 1. note → a single note object (contains id, title, content, created_at)
// 2. onDelete → a function passed from parent to delete this specific note



    const formattedDate = new Date(note.created_at).toLocaleDateString("en-US")
    // Convert the created_at timestamp into a readable date format (MM/DD/YYYY).



    return (
        <div className="note-container">
        {/* Wrapper div for styling each note */}



            <p className="note-title">{note.title}</p>
            {/* Display the note's title */}



            <p className="note-content">{note.content}</p>
            {/* Display the note's main content */}



            <p className="note-date">{formattedDate}</p>
            {/* Display the formatted creation date */}



            <button className="delete-button" onClick={() => onDelete(note.id)}>
                {/* Button triggers onDelete() function from parent component.
                    Passes the note's id so the parent knows which one to remove. */}

                Delete
                {/* Text shown inside the button */}
            </button>
        </div>
    );
}

export default Note
// Export component so other files (like Home.jsx) can import and use it.
