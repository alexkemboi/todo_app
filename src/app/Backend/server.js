// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

// MySQL Connection
const db = mysql.createConnection({
  host: '172.105.62.175',
  user: 'root',
  password: 'Ikon24',
  database: 'todo_db',
});

db.connect(
    (error) => {
        if (error) {
          console.error("Error connecting to database", error);
        } else {
          console.log("Connected to database");
        }
      }
);

app.use(bodyParser.json());
app.use(cors());
// Get all tasks
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

// Add a new task
app.post('/api/addtasks', (req, res) => {
  const { task_name } = req.body;
  db.query('INSERT INTO tasks (task_name) VALUES (?)', [task_name], (error) => {
    if (error) throw error;
    res.send('Task added successfully');
  });
});

// Update task completion status
app.put('/api/updatetasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (error) => {
    if (error) throw error;
    res.send('Task updated successfully');
  });
});

// Delete a task
app.delete('/api/deletetasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (error) => {
    if (error) throw error;
    res.send('Task deleted successfully');
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
