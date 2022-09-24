import React, { useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos = () => {
    const [todo, setTodo] = useState([]);

    const deleteButton = async (id) => {
        try {
            const deleteButton = await fetch(
                `http://localhost:5000/todos/${id}`,
                {
                    method: 'DELETE',
                }
            );
            setTodo(todo.filter((todo) => todo.todo_id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch('http://localhost:5000/todos');
            const data = await response.json();

            setTodo(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <table class='table mt-5 text-center'>
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {todo.map((todo) => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td>
                            <EditTodo todo={todo} />
                        </td>
                        <td>
                            <button
                                className='btn btn-danger'
                                onClick={() => deleteButton(todo.todo_id)}
                            >
                                DELETE
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ListTodos;
