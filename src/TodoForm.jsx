import { useRef, useState, useEffect } from 'react';

/* ============================================= */
function TodoForm({ onAddTodo }) {
  const todoTitleInput = useRef('');

  const [workingTodo, setWorkingTodo] = useState('');

  useEffect(() => {
    console.log(workingTodo);
  }, [workingTodo]);

  function handleAddTodo(event) {
    event.preventDefault();

    // console.dir(event.target);
    // console.dir(event.target.title);
    // console.dir(event.target.title.value);

    // const title = event.target.title.value;
    // onAddTodo(title);
    // event.target.title.value = '';

    onAddTodo(workingTodo); // new adding
    setWorkingTodo('');

    todoTitleInput.current.focus();
  }

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>

      <input
        type="text"
        id="todoTitle"
        name="title"
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(event) => {
          setWorkingTodo(event.target.value);
        }}
      />

      {/* <button disabled={workingTodo === '' ? true : false}>Add Todo</button> */}
      <button disabled={!workingTodo}>Add Todo</button>
    </form>
  );
}

/* ============================================= */
export default TodoForm;

/* 
      <button disabled={workingTodo === '' ? true : false}>Add Todo</button>

*/
