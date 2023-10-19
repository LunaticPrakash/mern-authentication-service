import axios from "axios";
import { registerError, registerStart, registerSuccess } from "../userSlice";

export const registerUser = async (dispatch, user) => {
    dispatch(registerStart());
    try {
        const res = await axios.post("/api/user/register", user);
        dispatch(registerSuccess(res.data));
    }
    catch (error) {
        console.log(error.response.data);
        dispatch(registerError(error.response ? error.response.data : error));
    }

}