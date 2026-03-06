import React, { useState } from 'react';
import { Todo } from '../../types';

/**
 * Task 10: AddToDoForm Component
 * 
 * Theory: Controlled Components and Form Handling
 * 
 * Controlled components are React components where the form data is handled by the component's state.
 * This gives you full control over the form's behavior and makes it easier to validate and process data.
 * 
 * Controlled vs Uncontrolled Components:
 * 
 * Controlled Components:
 * - Form data is stored in component state
 * - Value is set by state, onChange updates state
 * - Example: <input value={value} onChange={setValue} />
 * - Benefits: Full control, easy validation, predictable behavior
 * 
 * Uncontrolled Components:
 * - Form data is handled by the DOM
 * - Use refs to access form values
 * - Example: <input ref={inputRef} />
 * - Benefits: Less code, better performance for simple forms
 * 
 * Form Handling Best Practices:
 * 
 * 1. Prevent Default Behavior:
 *    - Use event.preventDefault() in onSubmit
 *    - Prevents page reload on form submission
 *    - Example: const handleSubmit = (e) => { e.preventDefault(); }
 * 
 * 2. Input Validation:
 *    - Validate on change or submit
 *    - Show error messages to users
 *    - Disable submit button if form is invalid
 * 
 * 3. Form State Management:
 *    - Track multiple form fields in state
 *    - Use object to store form data
 *    - Example: const [formData, setFormData] = useState({ title: '', description: '' })
 * 
 * 4. Form Submission:
 *    - Handle submission in onSubmit handler
 *    - Process form data
 *    - Clear form after successful submission
 * 
 * Common Form Patterns:
 * 
 * 1. Single Input:
 *    - Track single value in state
 *    - Simple and straightforward
 * 
 * 2. Multiple Inputs:
 *    - Use object to store all form data
 *    - Update specific fields with spread operator
 *    - Example: setFormData({...formData, title: value})
 * 
 * 3. Dynamic Forms:
 *    - Add/remove form fields dynamically
 *    - Use arrays to store multiple items
 * 
 * 4. Form Validation:
 *    - Track validation state separately
 *    - Show/hide error messages
 *    - Disable submit when invalid
 * 
 * Key Concepts:
 * - Use controlled components for complex forms
 * - Always prevent default form submission
 * - Validate input data
 * - Provide user feedback for errors
 * - Clear form after successful submission
 */
export const AddToDoForm: React.FC = () => {
  // TODO: Implement the AddToDoForm component
  // 
  // Requirements:
  // 1. Create a controlled form with input field
  // 2. Add a submit button
  // 3. Handle form submission properly
  // 4. Clear the form after submission
  // 5. Validate that input is not empty
  // 
  // Example implementation:
  // const [title, setTitle] = useState('');
  // const [todos, setTodos] = useState<Todo[]>([]);
  // 
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!title.trim()) return;
  //   
  //   const newTodo: Todo = {
  //     id: Date.now(),
  //     title: title.trim(),
  //     completed: false
  //   };
  //   
  //   setTodos([...todos, newTodo]);
  //   setTitle('');
  // };

    const [title, setTitle] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (error) setError(null); // clear error as user types
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Todo title cannot be empty.');
            return;
        }

        if (title.trim().length < 3) {
            setError('Todo title must be at least 3 characters.');
            return;
        }

        const newTodo: Todo = {
            id: Date.now(),
            title: title.trim(),
            completed: false,
        };

        setTodos(prev => [...prev, newTodo]);
        setTitle('');
        setError(null);
    };

    const handleToggle = (id: number) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const handleDelete = (id: number) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    };

    const isSubmitDisabled = !title.trim();

    return (
        <div style={{ padding: '16px', maxWidth: '480px' }}>
            <h4 style={{ marginBottom: '12px' }}>Add a New Todo</h4>

            <form onSubmit={handleSubmit} noValidate>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '4px' }}>
                    <input
                        type="text"
                        value={title}
                        onChange={handleChange}
                        placeholder="Add todo"
                        aria-label="Todo title"
                        aria-invalid={!!error}
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            borderRadius: '6px',
                            border: `1px solid ${error ? '#fc8181' : '#cbd5e0'}`,
                            fontSize: '1rem',
                            outline: 'none',
                        }}
                    />
                    <button
                        type="submit"
                        disabled={isSubmitDisabled}
                        style={{
                            padding: '8px 16px',
                            borderRadius: '6px',
                            border: 'none',
                            backgroundColor: isSubmitDisabled ? '#a0aec0' : '#4299e1',
                            color: '#fff',
                            fontWeight: 600,
                            cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
                            transition: 'background-color 0.2s ease',
                        }}
                    >
                        Submit
                    </button>
                </div>

                {error && (
                    <p role="alert" style={{ color: '#c53030', fontSize: '0.85rem', margin: '4px 0 0' }}>
                        ⚠️ {error}
                    </p>
                )}
            </form>

            <ul style={{ listStyle: 'none', padding: 0, marginTop: '16px' }}>
                {todos.length === 0 && (
                    <p style={{ color: '#a0aec0', fontSize: '0.9rem' }}>No todos yet. Add one above!</p>
                )}
                {todos.map(todo => (
                    <li
                        key={todo.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            padding: '8px 0',
                            borderBottom: '1px solid #e2e8f0',
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo.id)}
                            aria-label={`Mark "${todo.title}" as ${todo.completed ? 'incomplete' : 'complete'}`}
                            style={{ cursor: 'pointer' }}
                        />
                        <span
                            style={{
                                flex: 1,
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed ? '#a0aec0' : '#2d3748',
                            }}
                        >
              {todo.title}
            </span>
                        <button
                            onClick={() => handleDelete(todo.id)}
                            aria-label={`Delete "${todo.title}"`}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: '#fc8181',
                                fontSize: '1rem',
                            }}
                        >
                            🗑️
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}; 