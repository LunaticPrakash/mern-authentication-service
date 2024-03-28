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
            state.loading = true;
            state.error = null;
            state.isLoggedIn = false;
            state.user = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        registerError(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedIn = false;
            state.user = null;
        },
        loginStart(state) {
            state.loading = true;
            state.error = null;
            state.isLoggedIn = false;
            state.user = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        loginError(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedIn = false;
            state.user = null;
        },
        getUserProfileStart(state) {
            state.loading = true;
            state.error = null;
        },
        getUserProfileSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        getUserProfileError(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedIn = false;
            state.user = null;
        },
        logoutUserStart(state) {
            state.loading = true;
            state.error = null;
        },
        logoutUserSuccess(state) {
            state.loading = false;
            state.error = null;
            state.isLoggedIn = false;
            state.user = null;
        },
        logoutUserError(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.isLoggedIn = false;
            state.user = null;
        }

    }
});

export const { registerStart, registerSuccess, registerError, loginStart, loginSuccess, loginError, getUserProfileStart, getUserProfileSuccess, getUserProfileError, logoutUserStart, logoutUserSuccess, logoutUserError } = userSlice.actions;
export default userSlice.reducer;