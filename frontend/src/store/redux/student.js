import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: [],
    loading: false,
    error: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserRequest: (state, action) => {
            state.user = action.payload
        },
        getUserSuccess: (state, action) => {
            state.loading = false
            state.loading = action.payload
        },
        getUserFailure: (state, action) => {
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { getUserRequest,getUserFailure,getUserSuccess} = userSlice.actions

export default userSlice.reducer