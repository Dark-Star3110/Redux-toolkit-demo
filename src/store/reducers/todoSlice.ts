import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "..";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

interface TodosState {
  allTodos: Todo[];
}

const initialState: TodosState = {
  allTodos: [],
};

export const getTodos = createAsyncThunk("todos/todosFetched", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/todos?_limit=5"
  );
  return response.data;
});

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (title: string) => {
    const newTodo = {
      id: nanoid(),
      title,
      completed: false,
    };
    await axios.post("https://jsonplaceholder.typicode.com/todos", newTodo);
    return newTodo;
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: string) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
    return id;
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // addTodo: {
    //   reducer(state, action: PayloadAction<Todo>) {
    //     state.allTodos.push(action.payload);
    //   },
    //   prepare(title) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         completed: false,
    //       },
    //     };
    //   },
    // },
    markCompleted: (state, action) => {
      const todoId = action.payload;
      state.allTodos = state.allTodos.map((todo) => {
        if (todo.id === todoId) todo.completed = !todo.completed;
        return todo;
      });
    },
    // deleteTodo: (state, action) => {
    //   const todoId = action.payload;
    //   state.allTodos = state.allTodos.filter((todo) => todo.id !== todoId);
    // },
    // todoFetched: (state, action) => {
    //   state.allTodos = action.payload;
    // }, => kiểu cũ
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        console.log("fetching data from server...");
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.allTodos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        console.log("fetching data error...");
      });
    builder
      .addCase(addTodo.pending, (state) => {
        console.log("loading...");
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.allTodos.push(action.payload);
      });
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.allTodos = state.allTodos.filter(
        (todo) => todo.id !== action.payload
      );
    });
  },
});

// async action create => kiểu cũ
// export const getTodos = () => {
//   return async (dispatch: Dispatch) => {
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/todos?_limit=5"
//       );
//       dispatch(todoFetched(response.data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// reducer
const todoReducer = todoSlice.reducer;

// selector
export const todoSelector = (state: RootState) => state.todoReducer.allTodos;

// action
export const { /*addTodo,*/ markCompleted /*, deleteTodo */ } =
  todoSlice.actions;

export default todoReducer;
