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
      state.error = null;
    },

    getCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
      },
      getCoursesFailure: (state, action) => {
          state.loading = false;
          state.error = action.payload;
      },

      
  },
});

export const { getCoursesFailure,
    getCoursesRequest,getCoursesSuccess
 } = courseSlice.actions

export default courseSlice.reducer;
