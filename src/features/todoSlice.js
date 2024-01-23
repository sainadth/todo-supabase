import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../supabaseClient";

const initialState = {
  todoList: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState: initialState,
  reducers: {
    addTodo: (state, action) => {
      const { todoDescription, todoStatus } = action.payload;
      const insertTodo = async () => {
        const { data, error } = await supabase
          .from("todos")
          .insert([
            {
              todoDescription: todoDescription,
              todoStatus: todoStatus,
            },
          ])
          .select();
        if (error) console.log(error);
        else console.log(data);
      };

      insertTodo();
    },
    setTodos: (state, action) => {
      state.todoList = action.payload;
    },
    updateTodo: (state, action) => {
      const update = async () => {
        const { id, todoDescription, todoStatus } = action.payload;
        const { data, error } = await supabase
          .from("todos")
          .update({ todoDescription: todoDescription, todoStatus: todoStatus })
          .eq("id", id)
          .select();
      };
      update();
    },
    deleteTodo: (state, action) => {
      const del = async () => {
        const { error } = await supabase
          .from("todos")
          .delete()
          .eq("id", action.payload);
      };
      del();
    },
  },
});

export const { addTodo, setTodos, updateTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
