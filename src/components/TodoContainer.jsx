import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  TableBody,
  Modal,
  Box,
  Typography,
  Input,
  TextField,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import { supabase } from "../supabaseClient";
import { addTodo, setTodos } from "../features/todoSlice";
const TodoContainer = () => {
  const { todoList } = useSelector((store) => store.todos);
  const [filter, setFilter] = useState("ALL");
  const [isOpened, setIsOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [newTodo, setNewTodo] = useState({
    todoDescription: "",
    todoStatus: true,
  });
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  const handleToggle = () => {
    setIsOpened(!isOpened);
  };
  const dispatch = useDispatch();

  const handleTodoDescChange = (e) => {
    const todo = { ...newTodo, todoDescription: e.target.value };
    setNewTodo(todo);
  };

  const handleTodoStatusChange = (e) => {
    const todo = { ...newTodo, todoStatus: e.target.value === "PENDING" };
    setNewTodo(todo);
  };

  const handleSave = async (e) => {
    await dispatch(addTodo(newTodo));
    await fetchTodo();
    handleToggle();
    setNewTodo({
      todoDescription: "",
      todoStatus: true,
    });
  };

  const fetchTodo = async () => {
    let { data, error } = await supabase.from("todos").select("*");
    if (error) {
      console.log(error);
    } else {
      dispatch(setTodos(data));
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "40%", fontSize: "18px" }}>
                Task
              </TableCell>
              <TableCell align="center" sx={{ width: "50" }}>
                <FormControl id="filter" variant="outlined">
                  <InputLabel id="filter-label-id">Status</InputLabel>
                  <Select
                    labelId="filter-label-id"
                    value={filter}
                    label="Filter"
                    onChange={handleChange}
                  >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="COMPLETED">COMPLETED</MenuItem>
                    <MenuItem value="PENDING">PENDING</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell align="center">
                <Button variant="contained" onClick={handleToggle}>
                  Add Todo
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todoList.map((todo) => {
              if (filter == "ALL" || todo.todoStatus === (filter === "PENDING"))
                return <Todo key={todo.id} todo={todo} fetchTodo={fetchTodo} />;
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={isOpened} onClose={handleToggle}>
        <Box
          component={"div"}
          sx={{
            position: "absolute",
            width: "500px",
            height: "250px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
            boxShadow: 80,
          }}
        >
          <Typography variant="h4">ADD TODO</Typography>
          <Typography
            component={"div"}
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <TextField
              id="outlined-controlled"
              label="TODO"
              value={newTodo.todoDescription}
              sx={{
                margin: "10px 10px",
                width: "60%",
              }}
              onChange={handleTodoDescChange}
            />
            <FormControl sx={{ width: 140 }}>
              <InputLabel id="status-label-id">Status</InputLabel>
              <Select
                labelId="status-label-id"
                label="Status"
                defaultValue="PENDING"
                sx={{
                  margin: "10px 10px",
                  width: "100%",
                }}
                onChange={handleTodoStatusChange}
              >
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="PENDING">Pending</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={newTodo.todoDescription == ""}
          >
            Insert
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default TodoContainer;
