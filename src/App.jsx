import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  addCourse,
  updateCourse,
  deleteCourse,
} from "./redux/courseSlice";

function App() {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const [editCourse, setEditCourse] = useState(null);

  const [course, setCourse] = useState({
    code: "",
    name: "",
    credits: "",
  });

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = () => {
    setEditCourse(null);

    setCourse({
      code: "",
      name: "",
      credits: "",
    });

    setOpen(true);
  };

  const handleEdit = (selectedCourse) => {
    setEditCourse(selectedCourse);

    setCourse({
      code: selectedCourse.code,
      name: selectedCourse.name,
      credits: selectedCourse.credits,
    });

    setOpen(true);
  };

  const handleSave = () => {
    if (!course.code || !course.name || !course.credits) {
      alert("Please fill all fields");
      return;
    }

    if (editCourse) {
      dispatch(
        updateCourse({
          id: editCourse.id,
          ...course,
        })
      );
    } else {
      dispatch(addCourse(course));
    }

    setOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteCourse(id));
  };

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Course Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        {/* Add Course Button */}
        <Button
          variant="contained"
          color="success"
          onClick={handleAdd}
          sx={{ marginBottom: 2 }}
        >
          Add Course
        </Button>

        {/* Course Table */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>ID</b>
                </TableCell>

                <TableCell>
                  <b>Course Code</b>
                </TableCell>

                <TableCell>
                  <b>Course Name</b>
                </TableCell>

                <TableCell>
                  <b>Credits</b>
                </TableCell>

                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.id}</TableCell>

                  <TableCell>{course.code}</TableCell>

                  <TableCell>{course.name}</TableCell>

                  <TableCell>{course.credits}</TableCell>

                  <TableCell>
                    {/* Edit */}
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(course)}
                    >
                      <EditIcon />
                    </IconButton>

                    {/* Delete */}
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(course.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Add / Edit Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle>
          {editCourse ? "Edit Course" : "Add Course"}
        </DialogTitle>

        <DialogContent>
          <TextField
            label="Course Code"
            name="code"
            value={course.code}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          <TextField
            label="Course Name"
            name="name"
            value={course.name}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />

          <TextField
            label="Credits"
            name="credits"
            type="number"
            value={course.credits}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
          >
            {editCourse ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;