/* ================================================ */
export const actions = {
  //actions in useEffect that loads todos
  fetchTodos: 'fetchTodos',
  loadTodos: 'loadTodos',

  //found in useEffect and addTodo to handle failed requests
  setLoadError: 'setLoadError',

  //actions found in addTodo
  startRequest: 'startRequest',
  addTodo: 'addTodo',
  endRequest: 'endRequest',

  //found in helper functions
  updateTodo: 'updateTodo',
  completeTodo: 'completeTodo',

  //reverts todos when requests fail
  revertTodo: 'revertTodo',

  //action on Dismiss Error button
  clearError: 'clearError',

  //
  sortDirection: 'sortDirection',
  sortField: 'sortField',
  queryString: 'queryString',
};

/* ================================================ */
export const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: '',
  sortField: 'createdTime',
  sortDirection: 'desc',
  queryString: '',
};

/* ================================================ */
export function reducer(state = initialState, action) {
  switch (action.type) {
    case actions.fetchTodos: {
      console.log('fetchTodos state', state);

      return {
        ...state,
        isLoading: true,
      };
    }

    case actions.loadTodos: {
      console.log('loadTodos state', state);

      const fetchedRecords = action.records.map((record) => {
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

      console.log('loadTodos fetchedRecords', fetchedRecords);

      return {
        ...state,
        isLoading: false,
        todoList: [...fetchedRecords],
      };
    }

    case actions.setLoadError:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.error.message,
      };

    /* ================================================ */
    case actions.startRequest: {
      console.log('startRequest state = ', state);

      return {
        ...state,
        isSaving: true,
      };
    }

    case actions.addTodo: {
      console.log('addTodo state = ', state);

      const fetchedRecords = action.records.map((record) => {
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

      console.log('addTodo fetchedRecords = ', fetchedRecords);

      return {
        ...state,
        isSaving: false,
        todoList: [...fetchedRecords],
      };
    }

    case actions.endRequest: {
      console.log('endRequest state = ', state);

      return {
        ...state,
        isSaving: false,
        isLoading: false,
      };
    }

    /* ================================================ */
    case actions.updateTodo: {
      console.log('updateTodo state = ', state);

      return {
        ...state,
        isSaving: false,
        todoList: action.updatedTodos,
      };
    }

    case actions.completeTodo: {
      console.log('completeTodo state = ', state);

      return {
        ...state,
        isSaving: false,
        todoList: action.updatedTodos,
      };
    }

    case actions.revertTodo:
      return {
        ...state,
        isSaving: false,
        errorMessage: `${action.error.message}. Reverting todo...`,
      };

    /* ================================================ */

    case actions.clearError:
      return {
        ...state,
        errorMessage: '',
      };

    /* ================================================ */
    case actions.sortDirection: {
      console.log('sortDirection: ', action.sortDirection);

      return {
        ...state,
        sortDirection: action.sortDirection,
      };
    }

    case actions.sortField: {
      console.log('sortField: ', action.sortField);

      return {
        ...state,
        sortField: action.sortField,
      };
    }

    case actions.queryString: {
      console.log('queryString: ', action.queryString);

      return {
        ...state,
        queryString: action.queryString,
      };
    }
    /* ================================================ */

    default:
      return state;
  }
}

/* ================================================ */
