import { call, put } from "redux-saga/effects";
import { getUserFailure, getUserRequest, getUserSuccess } from "../redux/student";
import { takeEvery } from 'redux-saga/effects';
import api from "../../utils/api";

function* getStudent() {
    try {
        const res = yield call(api.get, "/students", {
            headers: {
                "Content-Type": "application/json"
            },
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