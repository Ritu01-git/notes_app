import React, { useState, useEffect } from 'react';

const AddEditNoteModal = ({ isOpen, onClose, onSave, editableNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editableNote) {
      setTitle(editableNote.title);
      setContent(editableNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editableNote]);

  const handleSave = () => {
    const note = {
      id: editableNote ? editableNote.id : Date.now(),
      title,
      content,
    };
    onSave(note);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>{editableNote ? 'Edit Note' : 'Add Note'}</h2>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Enter note title" 
      />
      <textarea 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        placeholder="Enter note content" 
      />
      <button onClick={handleSave}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddEditNoteModal;
