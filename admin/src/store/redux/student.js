import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student: [],
  department: [],
  loading: false,
  error: null,
};

export const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    getStudentrequest: (state) => {
      state.loading = true;
    },
    getStudentsuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload;
    },
    getStudentfailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearStudent: (state) => {
      state.student = null;
    },

    createStudentRequest: (state) => {
      state.loading = true;
    },
    createStudentSuccess: (state, action) => {
      state.loading = false;
      state.student = action.payload;
    },
    createStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateStudentRequest: (state) => {
      state.loading = true;
    },
    updateStudentSuccess: (state, action) => {
      state.loading = false;
      state.student = state.student.map((stu) =>
        stu.id === action.payload.id ? action.payload : stu
      );
    },

    updateStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    deleteStudentRequest: (state) => {
      state.loading = true;
    },
    deleteStudentSuccess: (state, action) => {
      state.loading = false;
      state.student = state.student.filter(
        (student) => student.id !== action.payload
      );
    },
    deleteStudentFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getDepartement: (state) => {
      state.loading = true;
    },
    getDepartmentSuccess: (state, action) => {
      (state.loading = false), (state.department = action.payload);
    },
    getDepartmentFailure: (state, action) => {
      (state.loading = false), (state.error = action.payload);
    },
  },
});

export const {
  clearStudent,
  createStudentFailure,
  createStudentRequest,
  createStudentSuccess,
  deleteStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  getStudentfailure,
  getStudentrequest,
  getStudentsuccess,
  updateStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  getDepartement,
  getDepartmentFailure,
  getDepartmentSuccess
} = studentSlice.actions;

export default studentSlice.reducer;
