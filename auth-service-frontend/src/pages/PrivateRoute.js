import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const PrivateRoute = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuth, setIsAuth] = useState(false);

    const getIsAuthenticated = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/user/", {
                withCredentials: true
            });
            setIsAuth(true);
        } catch (error) {
            setIsAuth(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getIsAuthenticated();
        return () => { };
    }, [isAuth]);

    if (isLoading) {
        return <>Loading...</>;
    }
    return isAuth ? children : <Navigate to="/login" />;
};