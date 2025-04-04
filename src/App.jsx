import { useState } from 'react';

import './App.css';

import TodoList from './TodoList.jsx';

import TodoForm from './TodoForm.jsx';

/* ============================================= */
function App() {
  const [newTodo, setNewTodo] = useState('Example Text');

  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm />

      <p>{newTodo}</p>

      <TodoList />
    </div>
  );
}

/* ============================================= */
export default App;
