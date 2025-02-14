import { call, put, takeLatest } from "redux-saga/effects";
import {
  createDepartmentFailure,
  createDepartmentRequest,
  createDepartmentSuccess,
  createStudentFailure,
  createStudentRequest,
  createStudentSuccess,
  deleteDepartmentRequest,
  deleteStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  getDepartement,
  getDepartmentSuccess,
  getStudentrequest,
  getStudentsuccess,
  updateDepartmentFailure,
  updateDepartmentRequest,
  updateDepartmentSuccess,
  updateStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
} from "../redux/student";
import api from "../../utils/api";

function* createStudent(action) {
  try {
    const res = yield call(
      api.post,
      "/student",
      action.payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    yield put(createStudentSuccess(res.data));
  } catch (error) {
    yield put(createStudentFailure(error.message));
  }
}

function* getStudents() {
  try {
    const res = yield call(api.get, "/students", {
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    yield put(getStudentsuccess(res.data));
  } catch (error) {
    yield put(deleteStudentRequest(error.message));
  }
}

function* updateStudent(action) {
  try {
    const res = yield call(api.put,  `/student/${action.payload.id}`, action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    yield put(updateStudentSuccess(res.data));
  } catch (error) {
    yield put(updateStudentFailure(error.message));
  }
}

function* deleteStudent(action) {
  try {
    const res = yield call(api.delete, `/student/${action.payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      
    });
    yield put(deleteStudentSuccess(res.data));
  } catch (error) {
    yield put(deleteStudentFailure(error.message));
  }
}

function* getAllDepartments() {
    try {
        const res = yield call(api.get, "/department", {
            headers: {
                "Content-Type": "application/json",
            },
        });
        yield put(getDepartmentSuccess(res.data));
    } catch (error) {
        yield put(error);
    }
}

function* createDepartment(action) {
  try {
    const res = yield call(api.post, "/department", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      
      
    })

    yield put(createDepartmentSuccess(res.data));
  } catch (error) {
    yield put(createDepartmentFailure(error.message))
  }
}

function* upateDepartment(action) {
  try {
    const res = yield call(api.post, "/department", action.payload, {
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    yield put(updateDepartmentSuccess(res.data));
      
  } catch (error) {
    yield put(updateDepartmentFailure(error.message))
    
  }
}

function* deleteDepartment(action) {
  try {
    const res = yield call(api.delete, `/department/${action.payload}`, {
      headers: {
        "Content-Type": "application/json",
      },
      
    })
    yield put(updateDepartmentSuccess(res.data));

  } catch (error) {
    yield put(updateDepartmentFailure(error.message))

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
function* watchCreateDepartment() {
  yield takeLatest(createDepartmentRequest, createDepartment);
}

function* watchDeleteDepartment() {
  yield takeLatest(deleteDepartmentRequest, deleteDepartment);
}

function * watchUpdateDepartment() {
  yield takeLatest(updateDepartmentRequest, upateDepartment);
}
export {
  watchCreateStudent,
  watchGetStudent,
  watchUpdateStudent,
    watchDeleteStudent,
  watchGetAllDepartments,
  watchCreateDepartment,
  watchDeleteDepartment,
  watchUpdateDepartment
};
