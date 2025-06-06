import TodoList from '../features/TodoList/TodoList';

import TodoForm from '../features/TodoForm';

import TodosViewForm from '../features/TodosViewForm';

/* ======================================== */
function TodosPage({
  todoState,
  todoActions,
  dispatch,
  handleAddTodo,
  completeTodo,
  updateTodo,
}) {
  return (
    <div>
      <TodoForm onAddTodo={handleAddTodo} isSaving={todoState.isSaving} />

      <TodoList
        todoList={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      <hr />

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
    </div>
  );
}

/* ======================================== */
export default TodosPage;
