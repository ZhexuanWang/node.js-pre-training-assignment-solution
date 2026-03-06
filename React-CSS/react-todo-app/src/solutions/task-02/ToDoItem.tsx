import React from 'react';
import {TodoItemProps} from '../../types';

/**
 * Task 2: ToDoItem Component
 *
 * Theory: Conditional Rendering and JSX
 *
 * Conditional rendering in React allows you to show different content based on certain conditions.
 * This is one of React's most powerful features, enabling dynamic and interactive UIs.
 *
 * Common Conditional Rendering Patterns:
 *
 * 1. Ternary Operator: condition ? trueValue : falseValue
 *    - Most common for simple conditions
 *    - Example: {isCompleted ? 'Done' : 'Pending'}
 *
 * 2. Logical AND (&&): condition && element
 *    - Shows element only if condition is true
 *    - Example: {isCompleted && <span>✓</span>}
 *
 * 3. Logical OR (||): condition || fallback
 *    - Shows fallback if condition is false
 *    - Example: {title || 'Untitled'}
 *
 * 4. Switch-like patterns with multiple conditions
 *
 * JSX (JavaScript XML) is a syntax extension that allows you to write HTML-like code in JavaScript.
 * It gets compiled to regular JavaScript function calls.
 *
 * Key Concepts:
 * - JSX expressions must have a single parent element
 * - Use className instead of class for CSS classes
 * - Use camelCase for attributes (onClick, style, etc.)
 * - JavaScript expressions can be embedded using {}
 */
export const ToDoItem: React.FC<TodoItemProps> = ({todo}) => {
    // TODO: Implement the ToDoItem component
    //
    // Requirements:
    // 1. Display the todo title
    // 2. Show completion status using conditional rendering
    // 3. Use different styling for completed vs active todos
    // 4. Make the component reusable for any todo object
    //
    // Example usage:
    // <ToDoItem todo={{ id: 1, title: 'Learn React', completed: true }} />

    const { title, completed } = todo;

    return (
        <div
            className={`todo-item ${completed ? 'completed' : 'active'}`}
            style={{
                padding: '12px',
                margin: '8px 0',
                borderRadius: '4px',
                backgroundColor: completed ? '#f0f0f0' : '#ffffff',
                border: `1px solid ${completed ? '#cccccc' : '#007bff'}`,
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
            }}
        >
      <span
          className="todo-title"
          style={{
              flex: 1,
              textDecoration: completed ? 'line-through' : 'none',
              color: completed ? '#666' : '#333',
          }}
      >
        {title || 'Untitled Task'}
      </span>

            <span className="todo-status">
        {completed ? 'Completed' : 'Active'}
      </span>
        </div>
    );
}; 