import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteCourse } from "../redux/courseSlice";
import CourseForm from "../components/CourseForm";

function Dashboard() {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [editCourse, setEditCourse] = useState(null);

  const handleAdd = () => {
    setEditCourse(null);
    setOpen(true);
  };

  const handleEdit = (course) => {
    setEditCourse(course);
    setOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditCourse(null);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Course Management Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Container sx={{ marginTop: 4 }}>
        <Button
          variant="contained"
          color="success"
          onClick={handleAdd}
          sx={{ marginBottom: 2 }}
        >
          + Add Course
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Course Code</b></TableCell>
                <TableCell><b>Course Name</b></TableCell>
                <TableCell><b>Credits</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
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
                    <IconButton
                      color="primary"
                      onClick={() => handleEdit(course)}
                    >
                      <EditIcon />
                    </IconButton>

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

        <CourseForm
          open={open}
          handleClose={handleClose}
          editCourse={editCourse}
        />
      </Container>
    </>
  );
}

export default Dashboard;