import { useState, useEffect } from 'react';

import './App.css';

import TodoList from './TodoList.jsx';

import TodoForm from './TodoForm.jsx';

/* ============================================= */
function App() {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    console.log('todoList', todoList);
  }, [todoList]);

  function handleAddTodo(newTask) {
    const newTodo = { title: newTask, id: Date.now() };

    setTodoList([...todoList, newTodo]);
  }

  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <TodoList todoList={todoList} />
    </div>
  );
}

/* ============================================= */
export default App;
