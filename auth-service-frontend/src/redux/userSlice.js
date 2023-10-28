import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    isLoggedIn: false,
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState: { ...initialState },
    reducers: {
        registerStart(state) {
            state.loading = true
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true
        },
        registerError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        loginStart(state) {
            state.loading = true;
        },
        loginSuccess(state, action) {
            state.login = false;
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        loginError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getUserProfileStart(state) {
            state.loading = true
        },
        getUserProfileSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
            state.isLoggedIn = true
        },
        getUserProfileError(state, action) {
            state.loading = false;
            state.error = action.payload
        }
    }
});

export const { registerStart, registerSuccess, registerError, loginStart, loginSuccess, loginError, getUserProfileStart, getUserProfileSuccess, getUserProfileError } = userSlice.actions;
export default userSlice.reducer;