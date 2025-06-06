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
  console.log('filteredTodoList = ', filteredTodoList);

  // const itemsPerPage = 15;
  // const itemsPerPage = 5;

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

    // console.log('todosPerPage = ', e);
    // console.log('todosPerPage = ', e.target[0].value); // e.target[0] is input element

    setItemsPerPage(e.target[0].value);
  }

  return (
    <>
      <ul className={styles.list_container}>
        {isLoading ? (
          <p>Todo list loading...</p>
        ) : (
          // filteredTodoList.map((todo) => (
          //   <TodoListItem
          //     todo={todo}
          //     key={todo.id}
          //     onCompleteTodo={onCompleteTodo}
          //     onUpdateTodo={onUpdateTodo}
          //   />
          // ))

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

/* 

onInput={(e) => {
            console.log(e.target.value);
            setItemsPerPage(e.target.value);
          }}



One problem that arises is that the todos are initially empty while they are being fetched from Airtable. 

As the "useEffect" is currently written, it automatically navigates back to "/" if a user "refreshes" the page or navigates directly to a url that includes a page param. 
==>> chú ý chỗ này
==>> tức là ví dụ nếu ở Page=3 thì khi bấm refresh button thì tự động reset về Home Page ==>> "/"
==>> hoặc khi đang ở "http://localhost:5173/?page=2" mà nhập thẳng vô URL là ".../?page=3" thì cũng reset về Home Page

==>> có thể test bằng cách chọn 1 trong 2 đoạn code sau để thấy sự khác biệt (trong useEffect(() => {}, [...]) )

Code 1: ==>> về Home Page khi refresh hoặc nhập thẳng page number
if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
  navigate('/');
}

Code 2: ==>> không về Home Page khi refresh hoặc nhập thẳng page number
if (totalPages > 0) {
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
    navigate('/');
  }
}

At the time if this writing, isLoading is insufficient to prevent React-Router from navigating the user away. 

The render cycle sets that value to false before calculating any of the data used for pagination.

Wrap the contents of the useEffect in an if statement that evaluates totalPages.
      ==>>If it is greater than 0, permit the navigate("/") to fire.


Có thể kiểm tra lại bằng cách dùng console.log() để rà soát lại quá trình thay đổi
console.log('currentPage = ', currentPage);
console.log('totalPages = ', totalPages);


*/
