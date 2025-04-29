import { useState, useEffect } from 'react';

import './App.css';

import TodoList from './features/TodoList/TodoList';

import TodoForm from './features/TodoForm';

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

  function updateTodo(editedTodo) {
    // console.log('editedTodo = ', editedTodo);

    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return { ...editedTodo };
      }

      return todo;
    });

    // console.log('updatedTodos = ', updatedTodos);

    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm onAddTodo={handleAddTodo} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
      />
    </div>
  );
}

/* ============================================= */
export default App;
