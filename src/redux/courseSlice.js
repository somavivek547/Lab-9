import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [
    {
      id: 1,
      code: "25CS2101",
      name: "Front End Development",
      credits: 3,
    },
    {
      id: 2,
      code: "25SC2006",
      name: "Object Oriented Programming",
      credits: 4,
    },
    {
      id: 3,
      code: "25CS2102",
      name: "Operating Systems",
      credits: 3,
    },
  ],
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.courses.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    updateCourse: (state, action) => {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );

      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },

    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
  },
});

export const { addCourse, updateCourse, deleteCourse } =
  courseSlice.actions;

export default courseSlice.reducer;