import { call, put } from "redux-saga/effects";
import { takeEvery } from "redux-saga/effects";
import {
  createCouserFailure,
  createCouserRequest,
  createCouserSuccess,
  deleteCouserFailure,
  deleteCouserRequest,
  deleteCouserSuccess,
  getCoursesRequest,
  getCoursesSuccess,
  updateCouserRequest,
} from "../redux/course";
import api from "../../utils/api";
function* createCourse(action) {
  try {
    const res = yield call(
      api.post,
      "/courses",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    yield put(createCouserSuccess(res.data));
  } catch (error) {
    yield put(createCouserFailure(error.merror.message));
  }
}

function* getCourse() {
  try {
    const res = yield call(
      api.get,
      "/courses",
    
    );
    yield put(getCoursesSuccess(res.data));
  } catch (error) {
    yield put(error.message);
  }
}

function* updateCourse(action) {
  try {
    const res = yield call(api.put, `/courses/${action.payload.id}`, action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    yield put(res.data);
  } catch (error) {
    yield put(error.message);
  }
}

function* deleteCourse(action) {
  try {
    const res = yield call(
      api.delete,
        `/courses/${action.payload}`,
    );
    yield put(deleteCouserSuccess(res.data));
  } catch (error) {
    yield put(deleteCouserFailure(error.message));
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
