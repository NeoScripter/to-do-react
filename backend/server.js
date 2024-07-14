const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_app'
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
});

const createTables = () => {
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(50) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      text VARCHAR(255) NOT NULL,
      description TEXT,
      done BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      completion_date DATETIME DEFAULT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  db.query(createUsersTable, (err, results) => {
    if (err) throw err;
    console.log('Users table created or already exists.');
  });

  db.query(createTasksTable, (err, results) => {
    if (err) throw err;
    console.log('Tasks table created or already exists.');
  });
};

createTables();

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true });
    }
  });
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT id FROM users WHERE username = ? AND password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else if (results.length > 0) {
      res.json({ success: true, userId: results[0].id });
    } else {
      res.json({ success: false });
    }
  });
});

app.get('/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  const query = 'SELECT * FROM tasks WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true, tasks: results });
    }
  });
});

app.post('/tasks/:userId', (req, res) => {
  const { userId } = req.params;
  const { text, description } = req.body;

  if (!text || !description) {
    return res.status(400).json({ success: false, error: 'Text and description are required.' });
  }

  const query = 'INSERT INTO tasks (user_id, text, description) VALUES (?, ?, ?)';
  db.query(query, [userId, text, description], (err, results) => {
    if (err) {
      res.status(500).json({ success: false, error: err.message });
    } else {
      res.json({ success: true, taskId: results.insertId });
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
