const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Update CORS configuration to allow requests from your frontend
const allowedOrigins = ['https://to-do-react-frontend.onrender.com', 'http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));
app.use(bodyParser.json());

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const { data, error } = await supabase.from('users').insert([{ username, password }]);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, data });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const { data, error } = await supabase.from('users').select('*').eq('username', username).eq('password', password);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else if (data.length > 0) {
    res.json({ success: true, userId: data[0].id });
  } else {
    res.json({ success: false, error: 'Invalid username or password' });
  }
});

app.get('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase.from('tasks').select('*').eq('user_id', userId);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, tasks: data });
  }
});

app.post('/tasks/:userId', async (req, res) => {
  const { userId } = req.params;
  const { text, description } = req.body;
  const { data, error } = await supabase.from('tasks').insert([{ user_id: userId, text, description }]);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, taskId: data[0].id });
  }
});

app.post('/delete', async (req, res) => {
  const { task_id } = req.body;
  const { data, error } = await supabase.from('tasks').delete().eq('id', task_id);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, data });
  }
});

app.post('/delete_all', async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({ success: false, error: 'User ID is required' });
  }
  const { data, error } = await supabase.from('tasks').delete().eq('user_id', userId);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, data });
  }
});

app.post('/complete', async (req, res) => {
  const { task_id } = req.body;
  const { data, error } = await supabase.from('tasks').update({ done: true }).eq('id', task_id);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, data });
  }
});

app.post('/edit', async (req, res) => {
  const { task_id, title, description } = req.body;
  const { data, error } = await supabase.from('tasks').update({ text: title, description }).eq('id', task_id);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
  } else {
    res.json({ success: true, data });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
