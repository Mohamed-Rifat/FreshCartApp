import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../context/TokenContext/TokenContext";

export default function ProtectedRoutes({ children }) {
    const { token } = useContext(TokenContext);

    if (!localStorage.getItem('token')) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
