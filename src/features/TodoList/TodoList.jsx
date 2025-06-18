import { useEffect, useState } from 'react';

import TodoListItem from './TodoListItem';

import styles from './TodoList.module.css';

import { useSearchParams, useNavigate } from 'react-router';

/* ============================================= */
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [itemsPerPage, setItemsPerPage] = useState(5);

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  const currentPage = parseInt(searchParams.get('page') || '1', 10);

  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;

  // tự thêm vô
  const indexOfLastTodo = currentPage * itemsPerPage; // this is not mentioned in instruction

  const totalPages = Math.ceil(filteredTodoList.length / itemsPerPage);

  // uses previous values to slice out the appropriate subset to pass to `Page`
  // this is not mentioned in instruction , but is used in lesson example
  const currentEntries = filteredTodoList.slice(
    indexOfFirstTodo,
    indexOfLastTodo
  );

  // console.log('currentPage = ', currentPage);
  // console.log('totalPages = ', totalPages);
  // console.log('indexOfFirstTodo = ', indexOfFirstTodo);

  useEffect(() => {
    // console.log('useEffect currentPage = ', currentPage);

    //
    // if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    //   navigate('/');
    // }

    if (totalPages > 0) {
      if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
        navigate('/');
      }
    }

    //
  }, [currentPage, totalPages, navigate]);

  const handlePreviousPage = () => {
    //only page backwards if it is not the first page
    if (currentPage > 1) {
      setSearchParams((searchParams) => {
        searchParams.set('page', currentPage - 1);
        return searchParams;
      });
    }
  };

  const handleNextPage = () => {
    //only page forward if it is not the last page
    if (currentPage < totalPages) {
      setSearchParams((searchParams) => {
        searchParams.set('page', currentPage + 1);
        return searchParams;
      });
    }
  };

  function todosPerPage(e) {
    e.preventDefault();

    setItemsPerPage(e.target[0].value);
  }

  return (
    <>
      <ul className={styles.list_container}>
        {isLoading ? (
          <p>Todo list loading...</p>
        ) : (
          currentEntries.map((todo) => (
            <TodoListItem
              todo={todo}
              key={todo.id}
              onCompleteTodo={onCompleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))
        )}
      </ul>

      <div className={styles.paginationControls}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>

        <select
          id="select-box"
          value={itemsPerPage}
          onChange={(e) => {
            console.log('select = ', e.target.value);

            setItemsPerPage(e.target.value);
          }}
        >
          <option value="5">5 / page</option>
          <option value="10">10 / page</option>
          <option value="15">15 / page</option>
          <option value="20">20 / page</option>
        </select>
      </div>

      <form className={styles.paginationControls} onSubmit={todosPerPage}>
        <label htmlFor="quantity">Todos per page (max=20):</label>

        <input type="number" id="quantity" name="quantity" min="1" max="20" />

        <button>Submit</button>
      </form>
    </>
  );
}

/* ============================================= */
export default TodoList;
