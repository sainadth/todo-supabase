import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateTodo, deleteTodo } from "../features/todoSlice";
import "../styles/todoContainer.css";

const Todo = (props) => {
  const dispatch = useDispatch();
  const todo = props.todo;
  const { todoDescription, todoStatus } = todo;
  const [isOpened, setIsOpened] = useState(false);
  const [newTodo, setNewTodo] = useState({
    todoDescription: "",
    todoStatus: true,
  });
  const handleTodoDescChange = (e) => {
    const todo = { ...newTodo, todoDescription: e.target.value };
    setNewTodo(todo);
  };

  const handleTodoStatusChange = (e) => {
    const todo = { ...newTodo, todoStatus: e.target.value === "PENDING" };
    setNewTodo(todo);
  };
  const handleToggle = () => {
    setIsOpened(!isOpened);
  };
  const handleEdit = (e) => {
    handleToggle();
    setNewTodo({
      todoDescription: e.todoDescription,
      todoStatus: e.todoStatus,
    });
  };

  const handleDelete = async (e) => {
    await dispatch(deleteTodo(e.id));
    await props.fetchTodo();
  };

  const handleSave = async (e) => {
    await dispatch(updateTodo({ ...newTodo, id: e.id }));
    await props.fetchTodo();
    handleToggle();
  };

  return (
    <>
      <TableRow sx={{ fontSize: 24 }} className="todo-row">
        <TableCell align="center">
          <div>{todoDescription}</div>
        </TableCell>
        <TableCell align="center">
          {todoStatus ? "PENDING" : "COMPLETED"}
        </TableCell>
        <TableCell align="center">
          <Button variant="text" size="small" onClick={() => handleEdit(todo)}>
            <EditIcon />
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => handleDelete(todo)}
          >
            <DeleteIcon />
          </Button>
        </TableCell>
      </TableRow>
      <Modal open={isOpened} onClose={handleToggle}>
        <Box
          component={"div"}
          sx={{
            position: "absolute",
            width: "500px",
            height: "200px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
            textAlign: "center",
            boxShadow: 24,
          }}
        >
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
              }}
              onChange={handleTodoDescChange}
            />
            <FormControl id="status">
              <InputLabel id="status-label-id">Status</InputLabel>
              <Select
                labelId="status-label-id"
                label="Status"
                defaultValue="PENDING"
                sx={{
                  margin: "10px 10px",
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
            onClick={() => handleSave(todo)}
            disabled={newTodo.todoDescription == ""}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </>
  );
};
export default memo(Todo);
