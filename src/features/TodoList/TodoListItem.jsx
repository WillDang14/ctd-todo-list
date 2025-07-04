import { useState, useEffect } from 'react';

import TextInputWithLabel from '../../shared/TextInputWithLabel';

import styles from './TodoListItem.module.css';

/* ============================================================ */
function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  // console.log(todo);
  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title);

  useEffect(() => {
    setWorkingTitle(todo.title);
  }, [todo]);

  function handleCancel() {
    setWorkingTitle(todo.title);

    setIsEditing(false);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    event.preventDefault();

    if (!isEditing) return;

    onUpdateTodo({ ...todo, title: workingTitle });

    setIsEditing(false);
  }

  return (
    <li className={styles.listItem}>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />

            <button type="button" onClick={handleCancel}>
              Cancel
            </button>

            <button type="button" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>

            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

/* ============================================================ */
export default TodoListItem;
