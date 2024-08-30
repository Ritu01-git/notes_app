const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./db'); 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world');
});

app.get('/notes', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM notes');
    res.json(rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM notes WHERE id = ?', [id]);
    if (rows.length === 0) return res.status(404).send('Note not found');
    res.json(rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/notes-create', async (req, res) => {
    const { title, content } = req.body;
    console.log('Received note data:', { title, content }); 
    try {
      const [result] = await pool.query(
        'INSERT INTO notes (title, content, created_at, updated_at) VALUES (?, ?, NOW(), NOW())',
        [title, content]
      );
      res.status(201).json({ id: result.insertId, title, content });
    } catch (error) {
      console.error('Database error:', error); 
      res.status(500).send(error.message);
    }
  });
  

app.put('/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    await pool.query(
      'UPDATE notes SET title = ?, content = ?, updated_at = NOW() WHERE id = ?',
      [title, content, id]
    );
    res.status(200).send('Note updated successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    res.status(200).send('Note deleted successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
