import React from 'react';
import NoteCard from './NoteCard';

const NotesList = ({ notes, onDelete, onEdit }) => {
  return (
    <div className="notes-list">
      {notes.map(note => (
        <NoteCard 
          key={note.id} 
          note={note} 
          onDelete={onDelete} 
          onEdit={onEdit} 
        />
      ))}
    </div>
  );
};

export default NotesList;
