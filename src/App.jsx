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

  //
  function handleAddTodo(newTask) {
    const newTodo = {
      title: newTask,
      id: Date.now(),
      isCompleted: false,
    };

    setTodoList([...todoList, newTodo]);
  }

  function completeTodo(todoId) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: true };
      }

      return todo;
    });

    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <TodoList todoList={todoList} onCompleteTodo={completeTodo} />
    </div>
  );
}

/* ============================================= */
export default App;
