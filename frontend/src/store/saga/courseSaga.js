import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import { getCoursesFailure, getCoursesRequest, getCoursesSuccess } from "../redux/course";

function* getCourses() {
  try {
      const res = yield call(axios.get, "http://localhost:5000/api/courses", {
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