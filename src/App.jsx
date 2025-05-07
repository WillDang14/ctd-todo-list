import { useState, useEffect } from 'react';

import './App.css';

import TodoList from './features/TodoList/TodoList';

import TodoForm from './features/TodoForm';

import fetchOptions from './shared/FetchOptions'; // for Stretch Goals: Refactor for Reusable Code ==>> Week 7
import fetchPayload from './shared/FetchPayload'; // for Stretch Goals: Refactor for Reusable Code ==>> Week 7

/* ============================================= */
const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

const token = `Bearer ${import.meta.env.VITE_PAT}`;

/* ============================================= */
function App() {
  const [todoList, setTodoList] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // useEffect(() => {
  //   console.log('todoList', todoList);
  // }, [todoList]);

  //
  useEffect(() => {
    //
    const fetchTodos = async () => {
      setIsLoading(true);

      // const options = {
      //   method: 'GET',
      //   headers: { Authorization: token },
      // };

      const options = fetchOptions('Get', token);

      try {
        const resp = await fetch(url, options);
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
  }, []);

  ///////////////////////////////////////////////////////////////////////////
  //
  // function handleAddTodo(newTask) {
  //   const newTodo = {
  //     title: newTask,
  //     id: Date.now(),
  //     isCompleted: false,
  //   };

  //   setTodoList([...todoList, newTodo]);
  // }

  // const handleAddTodo = async (newTodo) => {
  async function handleAddTodo(newTodo) {
    // Note: "POST" does not need "id"
    // const payload = {
    //   records: [
    //     {
    //       fields: {
    //         title: newTodo,
    //         isCompleted: false,
    //       },
    //     },
    //   ],
    // };

    const payload = fetchPayload(newTodo, false);

    //
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // };

    const options = fetchOptions('Post', token, payload);

    try {
      setIsSaving(true);

      const resp = await fetch(url, options);

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
      console.log('records = ', records);

      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: !records[0].fields.isCompleted ? false : true,
      };

      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      // console.log(error.message);

      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////
  //
  // function completeTodo(todoId) {
  //   const updatedTodos = todoList.map((todo) => {
  //     if (todo.id === todoId) {
  //       return { ...todo, isCompleted: true };
  //     }

  //     return todo;
  //   });

  //   setTodoList(updatedTodos);
  // }

  //
  async function completeTodo(todoId) {
    const originalTodo = todoList.find((todo) => todo.id === todoId);

    // Note: "PATCH" does need "id"
    // const payload = {
    //   records: [
    //     {
    //       id: originalTodo.id,
    //       fields: {
    //         title: originalTodo.title,
    //         isCompleted: true,
    //       },
    //     },
    //   ],
    // };

    const payload = fetchPayload(originalTodo.title, true, originalTodo.id);

    //
    // const options = {
    //   method: 'PATCH',
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // };

    const options = fetchOptions('patch', token, payload);

    try {
      setIsSaving(true);

      const resp = await fetch(url, options);

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

      // the "records" will return with "isCompleted: true"
      // because this function is for ticking "input"
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
  // function updateTodo(editedTodo) {
  //   // console.log('editedTodo = ', editedTodo);

  //   const updatedTodos = todoList.map((todo) => {
  //     if (todo.id === editedTodo.id) {
  //       return { ...editedTodo };
  //     }

  //     return todo;
  //   });

  //   // console.log('updatedTodos = ', updatedTodos);

  //   setTodoList(updatedTodos);
  // }

  async function updateTodo(editedTodo) {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    // Note: "PATCH" does need "id"
    // const payload = {
    //   records: [
    //     {
    //       id: editedTodo.id,
    //       fields: {
    //         title: editedTodo.title,
    //         isCompleted: editedTodo.isCompleted,
    //       },
    //     },
    //   ],
    // };

    const payload = fetchPayload(
      editedTodo.title,
      editedTodo.isCompleted,
      editedTodo.id
    );

    //
    // const options = {
    //   method: 'PATCH',
    //   headers: {
    //     Authorization: token,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(payload),
    // };

    const options = fetchOptions('patch', token, payload);

    try {
      setIsSaving(true);

      const resp = await fetch(url, options);

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

      // why need to do this step if update is OK
      // "updatedTodo" is same as "editedTodo" ?
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
