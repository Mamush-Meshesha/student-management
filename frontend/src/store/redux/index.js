import { combineReducers } from "@reduxjs/toolkit";
import coursesReducer from "./course";
import userReducer from "./student";
import authReducer from "./auth";

const rootReducer = combineReducers({
    courses: coursesReducer,
    user: userReducer,
    auth: authReducer
})

export default rootReducer