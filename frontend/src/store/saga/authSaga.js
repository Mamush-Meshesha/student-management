import axios from "axios";
import { call, put, takeLatest } from "redux-saga/effects";
import { authFailure, authRequest, authSuccess } from "../redux/auth";

function* login(action) {
    try {
        const res = yield call(axios.post, "http://localhost:5000/api/student/login", action.payload, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        yield put(authSuccess(res.data))
    } catch (error) {
        yield put(authFailure(error.message))
    }
}

function* watchAuth() {
    yield takeLatest(authRequest, login)
}

export default watchAuth