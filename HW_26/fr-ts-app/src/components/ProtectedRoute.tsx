import React from 'react';
import { Navigate } from "react-router-dom";


interface ProtectedRouteProps {
    children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
    if (!localStorage.user) {
        return <Navigate to={'/login'} replace />;
    }
    return props.children;
};

export default ProtectedRoute;