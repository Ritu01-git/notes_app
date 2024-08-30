import React from 'react';

const NoteCard = ({ note, onDelete, onEdit }) => {
  return (
    <div className="note-card">
      <h2>{note.title}</h2>
      <p>{note.content.substring(0, 100)}...</p>
      <button onClick={() => onEdit(note)}>Edit</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
    </div>
  );
};

export default NoteCard;
