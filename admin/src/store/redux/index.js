import { combineReducers } from "@reduxjs/toolkit";
import studentReducer from "./student"
import courseReducer from "./course"
import authReducer from "./auth"

const rootReducer = combineReducers({
    student: studentReducer,
    course: courseReducer,
    auth: authReducer
})

export default rootReducer