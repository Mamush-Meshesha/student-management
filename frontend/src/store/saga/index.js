import { all } from "redux-saga/effects";
import watchGetCourses from "./courseSaga";
import watchGetStudent from "./studentSaga";
import {watchAuth, watchLogout } from "./authSaga";

function* rootSaga() {

    yield all([
        watchGetCourses(),
        watchGetStudent(),
        watchAuth(),
        watchLogout()
    ])
}

export default rootSaga