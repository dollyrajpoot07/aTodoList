'use client'
import styles from './toDoList.module.css'
import { useState } from 'react';

const filters = ['All', 'Active', 'Completed'];

export default function TodoList() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState('All');

    function addToCart() {
        console.log(task);
        if (task.trim()) {
            setTodos([...todos, { task: task, done: false }]);
            setTask('');
        }
    }

    const toggleDone = (index) => {
        const updated = [...todos];
        updated[index].done = !updated[index].done;
        setTodos(updated);
    };

    const deleteTodo = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };


    const filterTodos = todos.filter(todo =>
        filter === 'All' ? true : filter === 'Active' ? !todo.done : todo.done
    );

    return (
        <div className={styles.container}>
            <h1>To-Do List</h1>
            <div className={styles.inputSection}>
                <input
                    value={task}
                    type='text'
                    placeholder='Add items to your cart'
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={addToCart}>Add to Cart</button>
            </div>

            <div className={styles.filters}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        disabled={filter === f}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <ul className={styles.todoList}>
                {filterTodos.map((todo, index) => {
                    const globalIndex = todos.findIndex(t => t.task === todo.task);

                    return (
                        <li key={index}>
                            <span onClick={() => toggleDone(globalIndex)}>{todo.task}</span>
                            {todo.done ? (
                                <span>✅ Completed</span>
                            ) : (
                                <button onClick={() => deleteTodo(globalIndex)}>Delete Task ❌</button>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    )
}