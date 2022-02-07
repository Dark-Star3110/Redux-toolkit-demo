import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./reducers/todoSlice";

// store
const store = configureStore({
  reducer: {
    todoReducer,
  },
});

// root type
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
