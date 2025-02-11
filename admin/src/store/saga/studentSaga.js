import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import {
  createStudentFailure,
  createStudentRequest,
  createStudentSuccess,
  deleteStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  getDepartement,
  getDepartmentSuccess,
  getStudentrequest,
  getStudentsuccess,
  updateStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
} from "../redux/student";

function* createStudent(action) {
  try {
    const res = yield call(
      axios.post,
      "http://localhost:5000/api/student",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    yield put(createStudentSuccess(res.data));
  } catch (error) {
    yield put(createStudentFailure(error.message));
  }
}

function* getStudents() {
  try {
    const res = yield call(axios.get, "http://localhost:5000/api/students", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    yield put(getStudentsuccess(res.data));
  } catch (error) {
    yield put(deleteStudentRequest(error.message));
  }
}

function* updateStudent(action) {
  try {
    const res = yield call(axios.put,  `http://localhost:5000/api/student/${action.payload.id}`, action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    yield put(updateStudentSuccess(res.data));
  } catch (error) {
    yield put(updateStudentFailure(error.message));
  }
}

function* deleteStudent(action) {
  try {
    const res = yield call(axios.delete, `http://localhost:5000/api/student/${action.payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    yield put(deleteStudentSuccess(res.data));
  } catch (error) {
    yield put(deleteStudentFailure(error.message));
  }
}

function* getAllDepartments() {
    try {
        const res = yield call(axios.get, "http://localhost:5000/api/department", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        yield put(getDepartmentSuccess(res.data));
    } catch (error) {
        yield put(error);
    }
}

function* watchCreateStudent() {
  yield takeLatest(createStudentRequest, createStudent);
}

function* watchGetStudent() {
  yield takeLatest(getStudentrequest, getStudents);
}

function* watchUpdateStudent() {
  yield takeLatest(updateStudentRequest, updateStudent);
}

function* watchDeleteStudent() {
  yield takeLatest(deleteStudentRequest, deleteStudent);
}

function* watchGetAllDepartments() {
  yield takeLatest(getDepartement, getAllDepartments);
}

export {
  watchCreateStudent,
  watchGetStudent,
  watchUpdateStudent,
    watchDeleteStudent,
  watchGetAllDepartments
};
