import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    const ValidRole = auth?.roles?.find(role => allowedRoles?.includes(role))
    const ValidToken = auth?.accessToken?.find(token => allowedRoles?.includes(token))
    console.log(ValidRole)
    // console.log(ValidToken)

    return (

        auth?.roles?.find(role => allowedRoles?.includes(role)) ? <Outlet />
            : auth?.accessToken
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : ValidToken
                    ? <Navigate to="/OTP_digit" state={{ from: location }} replace />
                    : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;