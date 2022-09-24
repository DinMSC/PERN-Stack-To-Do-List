const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

// middleware
app.use(cors());
app.use(express.json()); //req.body

// Inserting a todo
app.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            'INSERT INTO todo (description) VALUES($1) RETURNING *',
            [description]
        );
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.log(err.message);
    }
});

// getting All my tasks
app.get('/todos', async (req, res) => {
    try {
        const getAllTodos = await pool.query('SELECT * FROM todo');
        res.json(getAllTodos.rows);
    } catch (error) {
        console.log(err);
    }
});

app.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const getTodo = await pool.query(
            'SELECT * FROM todo WHERE todo_id = $1',
            [id]
        );
        res.json(getTodo.rows);
    } catch (err) {
        console.log(err);
    }
});

//Update a todo
app.put('/todos/:id', async (req, res) => {
    try {
        const { description } = req.body;
        const { id } = req.params;
        const updateTodo = await pool.query(
            'UPDATE todo SET description =$1 WHERE todo_id =$2',
            [description, id]
        );
        res.json('The Todo was updated');
    } catch (err) {
        console.log(err);
    }
});

//delete TODO

app.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query(
            'DELETE FROM todo WHERE todo_id = $1 ',
            [id]
        );
        res.json('Todo Deleted');
    } catch (err) {
        console.log(err);
    }
});

app.listen(5000, () => {
    console.log('Server has started on port 5000');
});
