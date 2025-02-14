import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./course";
import userReducer from "./student";
import authReducer from "./auth"

const rootReducer = combineReducers({
  auth: authReducer, 
  student: userReducer, 
  course: coursesReducer, 
});
export default rootReducer