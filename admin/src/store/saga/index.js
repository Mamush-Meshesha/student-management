import {all} from "redux-saga/effects"
import { watchCreateStudent, watchDeleteStudent, watchGetAllDepartments, watchGetStudent, watchUpdateStudent } from "./studentSaga"
import { watchCreateCourse, watchDeleteCourse, watchGetCourse, watchUpdateCourse } from "./courseSaga"
function* rootSaga() {

    yield all([
        watchCreateStudent(),
        watchDeleteStudent(),
        watchGetStudent(),
        watchUpdateStudent(),
        watchCreateCourse(),
        watchDeleteCourse(),
        watchGetCourse(),
        watchUpdateCourse(),
        watchGetAllDepartments()
    ])
}

export default rootSaga