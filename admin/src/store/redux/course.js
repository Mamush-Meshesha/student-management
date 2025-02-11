import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    getCoursesRequest(state) {
      state.loading = true;
    },
    getCoursesSuccess(state, action) {
      state.loading = false;
      state.courses = action.payload;
    },
    getCoursesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    createCouserRequest(state) {
      state.loading = true;
    },
    createCouserSuccess(state, action) {
      state.loading = false;
      state.courses = [...state.courses, action.payload];
    },
    createCouserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    deleteCouserRequest(state) {
      state.loading = true;
    },
    deleteCouserSuccess(state, action) {
      state.loading = false;
      state.courses = state.courses.filter(
        (course) => course._id !== action.payload
      );
    },
    deleteCouserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    updateCouserRequest(state) {
      state.loading = true;
    },
    updateCouserSuccess(state, action) {
      state.loading = false;
      state.courses = state.courses.map((course) =>
        course._id === action.payload._id ? action.payload : course
      );
    },
    updateCouserFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createCouserFailure,
  createCouserRequest,
  createCouserSuccess,
  deleteCouserFailure,
  deleteCouserRequest,
  deleteCouserSuccess,
  getCoursesFailure,
  getCoursesRequest,
  getCoursesSuccess,
  updateCouserFailure,
  updateCouserRequest,
  updateCouserSuccess,
} = courseSlice.actions;

export default courseSlice.reducer;
