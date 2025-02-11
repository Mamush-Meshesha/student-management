import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./course";
import userReducer from "./student";
import authReducer from "./auth"

const rootReducer = combineReducers({
  auth: authReducer, // Persisted auth state
  student: userReducer, // Non-persisted student state
  course: coursesReducer, // Non-persisted course state
});
export default rootReducer