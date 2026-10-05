import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addCourse, updateCourse } from "../redux/courseSlice";

function CourseForm({ open, handleClose, editCourse }) {
  const dispatch = useDispatch();

  const [course, setCourse] = useState({
    code: "",
    name: "",
    credits: "",
  });

  useEffect(() => {
    if (editCourse) {
      setCourse(editCourse);
    } else {
      setCourse({
        code: "",
        name: "",
        credits: "",
      });
    }
  }, [editCourse]);

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!course.code || !course.name || !course.credits) {
      alert("Please fill all fields");
      return;
    }

    if (editCourse) {
      dispatch(updateCourse(course));
    } else {
      dispatch(addCourse(course));
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {editCourse ? "Edit Course" : "Add Course"}
      </DialogTitle>

      <DialogContent>
        <TextField
          margin="dense"
          label="Course Code"
          name="code"
          value={course.code}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="dense"
          label="Course Name"
          name="name"
          value={course.name}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          margin="dense"
          label="Credits"
          name="credits"
          type="number"
          value={course.credits}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>

        <Button variant="contained" onClick={handleSubmit}>
          {editCourse ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CourseForm;