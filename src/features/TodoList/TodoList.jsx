import TodoListItem from './TodoListItem';

/* ============================================= */
function TodoList({ todoList, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <ul>
      {todoList.length === 0 ? (
        <p>Add todo above to get started</p>
      ) : (
        filteredTodoList.map((todo) => (
          <TodoListItem
            todo={todo}
            key={todo.id}
            onCompleteTodo={onCompleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))
      )}
    </ul>
  );
}

/* ============================================= */
export default TodoList;
