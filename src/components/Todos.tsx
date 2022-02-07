import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import {
  deleteTodo,
  getTodos,
  markCompleted,
  todoSelector,
} from "../store/reducers/todoSlice";
import TodoForm from "./TodoForm";

const Todos = () => {
  const todos = useSelector(todoSelector);
  const dispatch = useDispatch<AppDispatch>();

  const toggleTodoCompleted = (id: string) => {
    // console.log(id);
    dispatch(markCompleted(id));
  };

  const deleteSingleTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };
  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);
  return (
    <div className="todo-list">
      <TodoForm />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? "completed" : ""}>
            {todo.title}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodoCompleted(todo.id)}
            />
            <button onClick={() => deleteSingleTodo(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;
