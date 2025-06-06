import { useState, useEffect, useCallback, useMemo, useReducer } from 'react';

import './App.css';
import styles from './App.module.css';

import TodoList from './features/TodoList/TodoList';

import TodoForm from './features/TodoForm';

import fetchOptions from './shared/FetchOptions'; // for Stretch Goals: Refactor for Reusable Code ==>> Week 7
import fetchPayload from './shared/FetchPayload'; // for Stretch Goals: Refactor for Reusable Code ==>> Week 7

import TodosViewForm from './features/TodosViewForm';

import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from './reducers/todos.reducer';

/* ============================================= */
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

// const token = `Bearer ${import.meta.env.VITE_PAT}`;
let token = `Bearer ${import.meta.env.VITE_PAT}`;

let n = 0;
/* ============================================= */
function App() {
  // const [todoList, setTodoList] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [isSaving, setIsSaving] = useState(false);

  // const [sortField, setSortField] = useState('createdTime');
  // const [sortDirection, setSortDirection] = useState('desc'); // giam dan
  // const [sortDirection, setSortDirection] = useState('asc'); //tang dan
  // const [queryString, setQueryString] = useState(''); //tang dan

  // useReducer week11
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  console.log(++n, ' todoState = ', todoState);

  // for testing error
  // if (n === 5) {
  //   token = `Bearer ${import.meta.env.VITE_PAT9}`;
  // }

  // useEffect(() => {
  //   console.log('todoList', todoList);
  // }, [todoList]);

  // Week9
  const encodeUrl = useCallback(() => {
    // let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let sortQuery = `sort[0][field]=${todoState.sortField}&sort[0][direction]=${todoState.sortDirection}`;

    let searchQuery = '';

    // if (queryString) {
    //   // searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    //   searchQuery = `&filterByFormula=SEARCH(LOWER("${queryString}"),LOWER({title}))`;
    // }

    if (todoState.queryString) {
      searchQuery = `&filterByFormula=SEARCH(LOWER("${todoState.queryString}"),LOWER({title}))`;
    }

    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [todoState.sortField, todoState.sortDirection, todoState.queryString]);

  ///////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    console.log('useEffect start!');

    //
    const fetchTodos = async () => {
      console.log('useEffect before dispatch fetchTodos!');

      // setIsLoading(true);
      dispatch({ type: todoActions.fetchTodos });

      const options = fetchOptions('Get', token);

      try {
        const resp = await fetch(encodeUrl(), options);
        // console.log('useEffect resp = ', resp);

        if (!resp.ok) {
          const status = resp.status;
          // console.log('status = ', status);

          const { error } = await resp.json();
          // console.log('error = ', error);
          // console.log('errorMessage type = ', error.type);
          // console.log('errorMessage message = ', error.message);

          // Chu y la khong co "resp.message"
          // throw new Error(error.message); // chu y lesson noi la "resp.message"

          if (status === 404) {
            throw new Error(error);
          } else {
            throw new Error(error.message);
          }
        }

        // extract Object property "records" from data response
        const { records } = await resp.json();
        console.log('Airtable records = ', records);

        // const fetchedRecords = records.map((record) => {
        //   //
        //   const todo = {
        //     id: record.id,
        //     title: record.fields.title,
        //     isCompleted: record.fields.isCompleted,
        //   };

        //   if (!todo.isCompleted) {
        //     todo.isCompleted = false;
        //   }

        //   return todo;
        // });

        // console.log('fetchedRecords=', fetchedRecords);

        // setTodoList([...fetchedRecords]);

        // week11
        console.log('useEffect before dispatch loadTodos!');

        dispatch({
          type: todoActions.loadTodos,
          records,
        });
      } catch (error) {
        console.log(error.message);

        // setErrorMessage(error.message);

        //
        dispatch({
          type: todoActions.setLoadError,
          error,
        });
      } finally {
        // setIsLoading(false);
        console.log('useEffect completed');
      }
    };

    fetchTodos();
    // }, [sortField, sortDirection, queryString]);
  }, [encodeUrl]);

  ///////////////////////////////////////////////////////////////////////////////////
  async function handleAddTodo(newTodo) {
    console.log('handleAddTodo Start!');

    const payload = fetchPayload(newTodo, false);

    const options = fetchOptions('Post', token, payload);

    try {
      console.log('handleAddTodo before dispatch startRequest!');

      // setIsSaving(true);
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        const status = resp.status;
        // console.log('status = ', status);

        const { error } = await resp.json();
        // console.log('error = ', error);
        // console.log('errorMessage type = ', error.type);
        // console.log('errorMessage message = ', error.message);

        // Chu y la khong co "resp.message"
        // throw new Error(error.message); // chu y lesson noi la "resp.message"

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      // const { records } = await resp.json();
      // console.log('records = ', records);

      // const savedTodo = {
      //   id: records[0].id,
      //   title: records[0].fields.title,
      //   isCompleted: !records[0].fields.isCompleted ? false : true,
      // };

      // setTodoList([...todoList, savedTodo]);

      // ====================================== //
      // tu them vo ==>> moi khi add them data thi tu dong sap xep lai
      const respNew = await fetch(encodeUrl(), fetchOptions('Get', token));

      const { records } = await respNew.json();
      // console.log('handleAddTodo records = ', records);

      // const fetchedRecords = records.map((record) => {
      //   //
      //   const todo = {
      //     id: record.id,
      //     title: record.fields.title,
      //     isCompleted: record.fields.isCompleted,
      //   };

      //   if (!todo.isCompleted) {
      //     todo.isCompleted = false;
      //   }

      //   return todo;
      // });

      // setTodoList([...fetchedRecords]);

      console.log('handleAddTodo before dispatch addTodo!');

      dispatch({
        type: todoActions.addTodo,
        records,
      });
    } catch (error) {
      // console.log(error.message);

      // setErrorMessage(error.message);

      //
      dispatch({
        type: todoActions.setLoadError,
        error,
      });
    } finally {
      // setIsSaving(false);

      console.log('handleAddTodo End!');

      dispatch({
        type: todoActions.endRequest,
      });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  // function completeTodo(todoId) {}
  async function completeTodo(todoId) {
    console.log('completeTodo start!');

    // const originalTodo = todoList.find((todo) => todo.id === todoId);
    const originalTodo = todoState.todoList.find((todo) => todo.id === todoId);
    console.log('completeTodo originalTodo : ', originalTodo);

    //
    const payload = fetchPayload(originalTodo.title, true, originalTodo.id);
    const options = fetchOptions('patch', token, payload);

    //
    try {
      console.log('completeTodo before dispatch startRequest!');

      // setIsSaving(true);
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        const status = resp.status;
        // console.log('status = ', status);

        const { error } = await resp.json();
        // console.log('error = ', error);
        // console.log('errorMessage type = ', error.type);
        // console.log('errorMessage message = ', error.message);

        // Chu y la khong co "resp.message"
        // throw new Error(error.message); // chu y lesson noi la "resp.message"

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      const { records } = await resp.json();
      // console.log('records = ', records);

      const updatedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: !records[0].fields.isCompleted ? false : true,
      };

      const updatedTodos = todoState.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }

        return todo;
      });

      // setTodoList([...updatedTodos]);

      console.log('completeTodo before dispatch completeTodo!');
      dispatch({
        type: todoActions.completeTodo,
        updatedTodos,
      });

      //
    } catch (error) {
      console.log(error.message);

      // setErrorMessage(`${error.message}. Reverting todo...`);

      // const revertedTodos = todoList.map((todo) => {
      //   if (todo.id === originalTodo.id) {
      //     return { ...originalTodo };
      //   }

      //   return todo;
      // });

      // setTodoList([...revertedTodos]);

      console.log('completeTodo Error => revertTodo!');

      dispatch({
        type: todoActions.revertTodo,
        error,
      });
    } finally {
      // setIsSaving(false);

      console.log('completeTodo End!');

      // dispatch({
      //   type: todoActions.endRequest,
      // });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  async function updateTodo(editedTodo) {
    console.log('updateTodo start!');

    // Thực ra cái này không cần đến ==>> xem revert có cần không
    // const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);
    // const originalTodo = todoState.todoList.find(
    //   (todo) => todo.id === editedTodo.id
    // );
    // console.log('updateTodo originalTodo : ', originalTodo);

    const payload = fetchPayload(
      editedTodo.title,
      editedTodo.isCompleted,
      editedTodo.id
    );

    const options = fetchOptions('Patch', token, payload);

    try {
      console.log('updateTodo before dispatch startRequest!');
      // setIsSaving(true);
      dispatch({ type: todoActions.startRequest });

      const resp = await fetch(encodeUrl(), options);

      if (!resp.ok) {
        const status = resp.status;
        // console.log('status = ', status);

        const { error } = await resp.json();
        // console.log('error = ', error);
        // console.log('errorMessage type = ', error.type);
        // console.log('errorMessage message = ', error.message);

        // Chu y la khong co "resp.message"
        // throw new Error(error.message); // chu y lesson noi la "resp.message"

        if (status === 404) {
          throw new Error(error);
        } else {
          throw new Error(error.message);
        }
      }

      const { records } = await resp.json();
      // console.log('updateTodo records = ', records);

      const updatedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: !records[0].fields.isCompleted ? false : true,
      };

      const updatedTodos = todoState.todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }

        return todo;
      });

      // console.log('updatedTodos = ', updatedTodos);

      // setTodoList([...updatedTodos]);

      console.log('updateTodo before dispatch updateTodo!');
      //
      dispatch({
        type: todoActions.updateTodo,
        updatedTodos,
      });
      //
    } catch (error) {
      console.log(error.message);

      // setErrorMessage(`${error.message}. Reverting todo...`);

      // Create a revertedTodos using the originalTodo to reset that todo's value to a previous state
      // const revertedTodos = todoState.todoList.map((todo) => {
      //   if (todo.id === originalTodo.id) {
      //     return { ...originalTodo };
      //   }

      //   return todo;
      // });

      // setTodoList([...revertedTodos]);

      console.log('updateTodo Error => revertTodo!');

      dispatch({
        type: todoActions.revertTodo,
        error,
      });
    } finally {
      // setIsSaving(false);

      console.log('updateTodo End!');

      // Cái này thực ra không cần, đã được thực hiện ở dispatch bên trên
      // dispatch({
      //   type: todoActions.endRequest,
      // });
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.container}>
      <h1>Todo List</h1>

      {/* <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} /> */}
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      <hr />

      {/* <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      /> */}

      <TodosViewForm
        sortDirection={todoState.sortDirection}
        setSortDirection={(sortDirection) =>
          dispatch({ type: todoActions.sortDirection, sortDirection })
        }
        sortField={todoState.sortField}
        setSortField={(sortField) =>
          dispatch({ type: todoActions.sortField, sortField })
        }
        queryString={todoState.queryString}
        setQueryString={(queryString) =>
          dispatch({ type: todoActions.queryString, queryString })
        }
      />

      {todoState.errorMessage ? (
        <>
          <hr />
          <div className={styles.error_message}>
            <p>{todoState.errorMessage}</p>

            {/* <button onClick={() => setErrorMessage('')}>
              Dismiss Error Message
            </button> */}

            <button onClick={() => dispatch({ type: todoActions.clearError })}>
              Dismiss Error Message
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

/* ============================================= */
export default App;
