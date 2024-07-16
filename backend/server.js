const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
  
  // Create tables if they don't exist
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      text VARCHAR(255) NOT NULL,
      description TEXT,
      done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completion_date TIMESTAMP DEFAULT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  pool.query(createUsersTable, (err, res) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created or already exists.');
    }
  });

  pool.query(createTasksTable, (err, res) => {
    if (err) {
      console.error('Error creating tasks table:', err.message);
    } else {
      console.log('Tasks table created or already exists.');
    }
  });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *', [username, password]);
    res.json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error in /register:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query('SELECT id FROM users WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length > 0) {
      res.json({ success: true, userId: result.rows[0].id });
    } else {
      res.json({ success: false, error: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error in /login:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    res.json({ success: true, tasks: result.rows });
  } catch (error) {
    console.error('Error in /tasks/:userId:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  const { text, description } = req.body;
  if (!text || !description) {
    return res.status(400).json({ success: false, error: 'Text and description are required.' });
  }
  try {
    const result = await pool.query('INSERT INTO tasks (user_id, text, description) VALUES ($1, $2, $3) RETURNING *', [userId, text, description]);
    res.json({ success: true, taskId: result.rows[0].id });
  } catch (error) {
    console.error('Error in /tasks/:userId:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/delete', async (req, res) => {
  const { task_id } = req.body;
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [task_id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in /delete:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/delete_all', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }
  try {
    await pool.query('DELETE FROM tasks WHERE user_id = $1', [userId]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in /delete_all:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/complete', async (req, res) => {
  const { task_id } = req.body;
  try {
    await pool.query('UPDATE tasks SET done = TRUE WHERE id = $1', [task_id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in /complete:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/edit', async (req, res) => {
  const { task_id, title, description } = req.body;
  try {
    await pool.query('UPDATE tasks SET text = $1, description = $2 WHERE id = $3', [title, description, task_id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error in /edit:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
