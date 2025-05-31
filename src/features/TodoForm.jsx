import { useRef, useState, useEffect } from 'react';

import TextInputWithLabel from '../shared/TextInputWithLabel';

import styled from 'styled-components';
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
    // <form onSubmit={handleAddTodo}>
    <StyledForm onSubmit={handleAddTodo}>
      <TextInputWithLabel
        labelText="Todo"
        elementId="todoTitle"
        ref={todoTitleInput}
        value={workingTodo}
        onChange={(event) => {
          setWorkingTodo(event.target.value);
        }}
      />

      <button disabled={!workingTodo}>
        {isSaving ? 'Saving...' : 'Add Todo'}
      </button>
    </StyledForm>
    // </form>
  );
}

/* ============================================= */
const StyledForm = styled.form`
  & button:disabled {
    font-style: italic;
  }

  & button {
    padding: 8px 14px;

    transition: 0.3s;
  }

  & button:hover {
    background: #a7a7a7;
  }
`;

/* ============================================= */
export default TodoForm;

/* 
      <button disabled={workingTodo === '' ? true : false}>Add Todo</button>

*/
