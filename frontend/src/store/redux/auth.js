import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    token: null,
    isAuth: false,
    isLoading: false,
    error: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.isLoading = true
        },
        authSuccess: (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuth = true
        },
        authFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuth = false
        }
    }
})
export const { authRequest, authSuccess, authFailure, logout } = authSlice.actions

export default authSlice.reducer