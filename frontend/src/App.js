import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotesList from './components/NotesList';
import AddEditNoteModal from './components/AddEditNoteModal';
import './index.css';

const API_BASE_URL = 'http://localhost:8000'; 

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableNote, setEditableNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/notes`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, []);

  const handleAddNewNote = () => {
    setEditableNote(null);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (note) => {
    try {
      if (note.id) {
        await axios.put(`${API_BASE_URL}/notes/${note.id}`, note);
        setNotes((prevNotes) =>
          prevNotes.map((n) => (n.id === note.id ? note : n))
        );
      } else {
        const response = await axios.post(`${API_BASE_URL}/notes-create`, note);
        setNotes((prevNotes) => [...prevNotes, response.data]);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditableNote(note);
    setIsModalOpen(true);
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>My Notes</h1>
        <div>
          <button onClick={handleAddNewNote}>Add New Note</button>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </header>
      <NotesList notes={filteredNotes} onDelete={handleDeleteNote} onEdit={handleEditNote} />
      <AddEditNoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNote}
        editableNote={editableNote}
      />
    </div>
  );
};

export default App;
