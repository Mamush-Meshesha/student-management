import axios from "axios";
import { call, put } from "redux-saga/effects";
import { getUserFailure, getUserRequest, getUserSuccess } from "../redux/student";
import { takeEvery } from 'redux-saga/effects';

function* getStudent() {
    try {
        const res = yield call(axios.get, "http://localhost:5000/api/students", {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })

        yield put(getUserSuccess(res.data.user))
    } catch (error) {
        yield put(getUserFailure(error.message))
    }
}

function* watchGetStudent() {
    yield takeEvery(getUserRequest, getStudent)
}

export default watchGetStudent