import TodoListItem from './TodoListItem';

/* ============================================= */
function TodoList() {
  const todos = [
    { id: 1, title: 'review resources' },
    { id: 2, title: 'take notes' },
    { id: 3, title: 'code out app' },
  ];

  return (
    <ul>
      {todos.map((todo) => (
        // <li key={todo.id}>{todo.title}</li>
        <TodoListItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

/* ============================================= */
export default TodoList;
