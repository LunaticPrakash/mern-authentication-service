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
            state.user = action.payload
        },
        registerError(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const { registerStart, registerSuccess, registerError } = userSlice.actions;
export default userSlice.reducer;