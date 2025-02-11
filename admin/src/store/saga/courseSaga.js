import axios from "axios";
import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga/effects";
import {
  createCouserRequest,
  deleteCouserRequest,
  getCoursesRequest,
  updateCouserRequest,
} from "../redux/course";
function* createCourse(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:5000/api/courses",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    yield put(res.data);
  } catch (error) {
    yield put(error.message);
  }
}

function* getCourse() {
  try {
    const res = yield call(
      axios.get,
      "http://localhost:5000/api/courses",
      { withCredentials: true }
    );
    yield put(res.data);
  } catch (error) {
    yield put(error.message);
  }
}

function* updateCourse(action) {
  try {
    const res = yield call(axios.put, `http://localhost:5000/api/courses/${action.payload.id}`, action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    yield put(res.data);
  } catch (error) {
    yield put(error.message);
  }
}

function* deleteCourse() {
  try {
    const res = yield call(
      axios.delete,
      "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      { withCredentials: true }
    );
    yield put(res.data);
  } catch (error) {
    yield put(error.message);
  }
}

function* watchCreateCourse() {
  yield takeEvery(createCouserRequest, createCourse);
}

function* watchGetCourse() {
  yield takeEvery(getCoursesRequest, getCourse);
}

function* watchUpdateCourse() {
  yield takeEvery(updateCouserRequest, updateCourse);
}

function* watchDeleteCourse() {
  yield takeEvery(deleteCouserRequest, deleteCourse);
}

export {
  watchCreateCourse,
  watchGetCourse,
  watchUpdateCourse,
  watchDeleteCourse,
};
