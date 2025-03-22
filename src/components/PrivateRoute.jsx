import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
    const isAuthenticated = localStorage.getItem("token") !== null;

    return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" />;
}

export default PrivateRoute;
