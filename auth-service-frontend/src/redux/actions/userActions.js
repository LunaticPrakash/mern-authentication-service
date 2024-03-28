import axios from "axios";
import { getUserProfileError, getUserProfileStart, getUserProfileSuccess, loginError, loginStart, loginSuccess, logoutUserError, logoutUserStart, logoutUserSuccess, registerError, registerStart, registerSuccess } from "../userSlice";

export const registerUser = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("/api/user/register", user);
        console.log("registerUser() > res.data : ", res.data);
        return dispatch(registerSuccess(res.data));
    }
    catch (error) {
        console.log("registerUser() > error.response.data: ", error.response.data);
        return dispatch(registerError(error.response.data.message));
    }
}

export const loginUser = async (dispatch, email, password) => {
    dispatch(loginStart());
    try {
        const res = await axios.post("/api/user/login", { email, password });
        console.log("loginUser() > res.data : ", res.data);
        return dispatch(loginSuccess(res.data));
    }
    catch (error) {
        console.log("loginUser() > error.response.data: ", error.response.data);
        return dispatch(loginError(error.response.data));
    }
}

export const getUserProfile = async (dispatch) => {
    dispatch(getUserProfileStart());
    try {
        const res = await axios.get("/api/user/", {
            withCredentials: true
        });
        console.log("getUserProfile() > res.data : ", res.data);
        return dispatch(getUserProfileSuccess(res.data));
    }
    catch (error) {
        console.log("getUserProfile() > error.response.data : ", error.response.data);
        return dispatch(getUserProfileError(error.response.data));
    }
}

export const logoutUser = async (dispatch) => {
    dispatch(logoutUserStart());
    try {
        const res = await axios.get("/api/user/logout");
        console.log("logoutUser() > res.data : ", res.data);
        return dispatch(logoutUserSuccess());
    }
    catch (error) {
        console.log("logoutUser() > error.response.data : ", error.response.data);
        return dispatch(logoutUserError(error.response.data));
    }
}