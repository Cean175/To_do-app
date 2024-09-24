import React, { useState } from 'react';

function TodoApp() { 
  const [todos, setTodos] = useState([]);
  const [editTodoId, setEditTodoId] = useState(null);
  const [newTodo, setNewTodo] = useState('');
  const [editText, setEditText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleCompleteTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };

  const handleEditTodo = (id) => {
    const todo = todos.find(todo => todo.id === id);
    setEditTodoId(id);
    setEditText(todo.text);
  };

  const handleSaveTodo = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setEditTodoId(null);
  };

  const handleRemoveTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


return (
    <div className="todo-app">
      <h1>Todo List</h1>

      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul>
        {todos.length === 0 ? (
          <p>No todos available. Add a todo to get started!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id}>
              {editTodoId === todo.id ? (
                <div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
                </div>
              ) : (
                <div>
                  <span
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleCompleteTodo(todo.id)}
                    disabled={todo.completed || editTodoId !== null}
                  >
                    Complete
                  </button>
                  <button
                    onClick={() => handleEditTodo(todo.id)}
                    disabled={todo.completed || editTodoId !== null}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTodo(todo.id)}
                    disabled={editTodoId !== null}
                  >
                    Remove
                  </button>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoApp;