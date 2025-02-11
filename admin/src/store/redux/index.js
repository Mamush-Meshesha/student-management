import { combineReducers } from "@reduxjs/toolkit";
import studentReducer from "./student"
import courseReducer from "./course"

const rootReducer = combineReducers({
    student: studentReducer,
    course: courseReducer
})

export default rootReducer