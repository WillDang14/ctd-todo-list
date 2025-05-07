import TodoListItem from './TodoListItem';

/* ============================================= */
// function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
//   const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

//   return (
//     <ul>
//       {todoList.length === 0 ? (
//         <p>Add todo above to get started</p>
//       ) : (
//         filteredTodoList.map((todo) => (
//           <TodoListItem
//             todo={todo}
//             key={todo.id}
//             onCompleteTodo={onCompleteTodo}
//             onUpdateTodo={onUpdateTodo}
//           />
//         ))
//       )}
//     </ul>
//   );
// }

/* ============================================= */
function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

  return (
    <ul>
      {isLoading ? (
        <p>Todo list loading...</p>
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
//

// Reloading and no todoList
// function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
//   const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

//   return (
//     <ul>
//       {isLoading ? (
//         <p>Todo list loading...</p>
//       ) : todoList.length === 0 ? (
//         <p>Add todo above to get started</p>
//       ) : (
//         filteredTodoList.map((todo) => (
//           <TodoListItem
//             todo={todo}
//             key={todo.id}
//             onCompleteTodo={onCompleteTodo}
//             onUpdateTodo={onUpdateTodo}
//           />
//         ))
//       )}
//     </ul>
//   );
// }

/* ============================================= */
//
// function TodoList({ todoList, onCompleteTodo, onUpdateTodo, isLoading }) {
//   const filteredTodoList = todoList.filter((todo) => !todo.isCompleted);

//   return (
//     <ul>
//       {(() => {
//         if (isLoading) {
//           return <p>Todo list loading...</p>;
//         } else {
//           if (todoList.length === 0) {
//             return <p>Add todo above to get started</p>;
//           } else {
//             return filteredTodoList.map((todo) => (
//               <TodoListItem
//                 todo={todo}
//                 key={todo.id}
//                 onCompleteTodo={onCompleteTodo}
//                 onUpdateTodo={onUpdateTodo}
//               />
//             ));
//           }
//         }
//       })()}
//     </ul>
//   );
// }
/* ============================================= */
export default TodoList;
