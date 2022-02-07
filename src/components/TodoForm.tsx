import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { addTodo } from "../store/reducers/todoSlice";

const TodoForm = () => {
  const [title, setTitle] = useState("");

  const dispatch = useDispatch<AppDispatch>(); // them generic dispatch cho hoanh trang chu ko can thiet

  const addSingleTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addTodo(title));
    setTitle("");
  };
  return (
    <div>
      <form onSubmit={addSingleTodo}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default TodoForm;
