import { call, put, takeLatest } from "redux-saga/effects";
import { getCoursesFailure, getCoursesRequest, getCoursesSuccess } from "../redux/course";
import api from "../../utils/api";

function* getCourses() {
  try {
      const res = yield call(api.get, "/courses", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
      });
      yield put(getCoursesSuccess(res.data))
  } catch (error) {
      yield put(getCoursesFailure(error.message))
  }
}




function* watchGetCourses() {
    yield takeLatest(getCoursesRequest, getCourses)
}

export default watchGetCourses