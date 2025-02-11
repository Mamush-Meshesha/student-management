import { all } from "redux-saga/effects";
import watchGetCourses from "./courseSaga";
import watchGetStudent from "./studentSaga";
import watchAuth from "./authSaga";

function* rootSaga() {

    yield all([
        watchGetCourses(),
        watchGetStudent(),
        watchAuth()
    ])
}

export default rootSaga