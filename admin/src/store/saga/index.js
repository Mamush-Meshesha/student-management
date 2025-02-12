import {all} from "redux-saga/effects"
import { watchCreateDepartment, watchCreateStudent, watchDeleteDepartment, watchDeleteStudent, watchGetAllDepartments, watchGetStudent, watchUpdateDepartment, watchUpdateStudent } from "./studentSaga"
import { watchCreateCourse, watchDeleteCourse, watchGetCourse, watchUpdateCourse } from "./courseSaga"
import { watchAuth, watchLogout } from "./authSaga"
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
        watchGetAllDepartments(),
        watchCreateDepartment(),
        watchLogout(),
        watchAuth(),
        watchDeleteDepartment(),
        watchUpdateDepartment()
    ])
}

export default rootSaga