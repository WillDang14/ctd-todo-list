import { useState, useEffect } from 'react';

import './App.css';

import TodoList from './features/TodoList/TodoList';

import TodoForm from './features/TodoForm';

import fetchOptions from './shared/FetchOptions'; // for Stretch Goals: Refactor for Reusable Code ==>> Week 7
import fetchPayload from './shared/FetchPayload'; // for Stretch Goals: Refactor for Reusable Code ==>> Week 7

import TodosViewForm from './features/TodosViewForm';
/* ============================================= */
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

const token = `Bearer ${import.meta.env.VITE_PAT}`;

/* ============================================= */
const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  //
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;

  let searchQuery = '';

  if (queryString) {
    // searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;

    // tham khao ==>> https://community.latenode.com/t/how-to-search-airtable-database-using-filterbyformula-in-url/9400/3
    // "SEARCH" and "FIND" are same
    // searchQuery = `&filterByFormula=FIND(LOWER("${queryString}"),LOWER({title}))`;
    searchQuery = `&filterByFormula=SEARCH(LOWER("${queryString}"),LOWER({title}))`;
  }

  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

/* ============================================= */
function App() {
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [sortField, setSortField] = useState('createdTime');
  const [sortDirection, setSortDirection] = useState('desc'); // giam dan
  // const [sortDirection, setSortDirection] = useState('asc'); //tang dan
  const [queryString, setQueryString] = useState(''); //tang dan

  // useEffect(() => {
  //   console.log('todoList', todoList);
  // }, [todoList]);

  //
  useEffect(() => {
    //
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = fetchOptions('Get', token);

      try {
        // const resp = await fetch(url, options);
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );
        console.log('resp = ', resp);

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

        const fetchedRecords = records.map((record) => {
          //
          const todo = {
            id: record.id,
            title: record.fields.title,
            isCompleted: record.fields.isCompleted,
          };

          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }

          return todo;
        });

        // console.log('fetchedRecords=', fetchedRecords);

        setTodoList([...fetchedRecords]);
      } catch (error) {
        // console.log(error.message);

        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
        // console.log('action completed');
      }
    };

    fetchTodos();
  }, [sortField, sortDirection, queryString]);

  ///////////////////////////////////////////////////////////////////////////
  async function handleAddTodo(newTodo) {
    const payload = fetchPayload(newTodo, false);

    const options = fetchOptions('Post', token, payload);

    try {
      setIsSaving(true);

      // const resp = await fetch(url, options);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

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
      const respNew = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        fetchOptions('Get', token)
      );

      const { records } = await respNew.json();

      const fetchedRecords = records.map((record) => {
        //
        const todo = {
          id: record.id,
          title: record.fields.title,
          isCompleted: record.fields.isCompleted,
        };

        if (!todo.isCompleted) {
          todo.isCompleted = false;
        }

        return todo;
      });

      setTodoList([...fetchedRecords]);
    } catch (error) {
      // console.log(error.message);

      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  async function completeTodo(todoId) {
    const originalTodo = todoList.find((todo) => todo.id === todoId);

    const payload = fetchPayload(originalTodo.title, true, originalTodo.id);

    const options = fetchOptions('patch', token, payload);

    try {
      setIsSaving(true);

      // const resp = await fetch(url, options);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

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

      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }

        return todo;
      });

      setTodoList([...updatedTodos]);
      //
    } catch (error) {
      // console.log(error.message);

      setErrorMessage(`${error.message}. Reverting todo...`);

      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return { ...originalTodo };
        }

        return todo;
      });

      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = fetchPayload(
      editedTodo.title,
      editedTodo.isCompleted,
      editedTodo.id
    );

    const options = fetchOptions('patch', token, payload);

    try {
      setIsSaving(true);

      // const resp = await fetch(url, options);
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

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

      const updatedTodos = todoList.map((todo) => {
        if (todo.id === updatedTodo.id) {
          return { ...updatedTodo };
        }

        return todo;
      });

      setTodoList([...updatedTodos]);
      //
    } catch (error) {
      console.log(error.message);

      setErrorMessage(`${error.message}. Reverting todo...`);

      // Create a revertedTodos using the originalTodo to reset that todo's value to a previous state
      const revertedTodos = todoList.map((todo) => {
        if (todo.id === originalTodo.id) {
          return { ...originalTodo };
        }

        return todo;
      });

      setTodoList([...revertedTodos]);
    } finally {
      setIsSaving(false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  return (
    <div>
      <h1>Todo List</h1>

      <TodoForm onAddTodo={handleAddTodo} isSaving={isSaving} />

      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />

      <hr />

      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {errorMessage ? (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage('')}>
            Dismiss Error Message
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ============================================= */
export default App;
