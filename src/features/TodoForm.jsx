import { useRef, useState, useEffect } from 'react';

import TextInputWithLabel from '../shared/TextInputWithLabel';

/* ============================================= */
function TodoForm({ onAddTodo, isSaving }) {
  const todoTitleInput = useRef('');

  const [workingTodo, setWorkingTodo] = useState('');

  useEffect(() => {
    console.log(workingTodo);
  }, [workingTodo]);

  function handleAddTodo(event) {
    event.preventDefault();

    onAddTodo(workingTodo); // new adding
    setWorkingTodo('');

    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="todoTitle"
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(event) => {
          setWorkingTodo(event.target.value);
        }}
      />

      {/* <label htmlFor="todoTitle">Todo</label> */}

      {/* <input
        type="text"
        id="todoTitle"
        name="title"
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(event) => {
          setWorkingTodo(event.target.value);
        }}
      /> */}

      {/* <button disabled={workingTodo === '' ? true : false}>Add Todo</button> */}
      <button disabled={!workingTodo}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </form>
  );
}

/* ============================================= */
export default TodoForm;

/* 
      <button disabled={workingTodo === '' ? true : false}>Add Todo</button>

*/
