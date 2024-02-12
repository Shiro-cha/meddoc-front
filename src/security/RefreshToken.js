import { useUserType } from "../components/Context/UserTypeContext";
import useAuth from "./hooks/useAuth";
import Cookies from "js-cookie";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { setuserType } = useUserType();

    const refresh = () => {
        // ==================TEST=================
        // const refreshToken = "accessToken"
        // const roles = 12005
        
        const role = Cookies.get("role")
        const refreshToken = Cookies.get("jwtTokenOTP")

        console.log(role, refreshToken)
        setuserType(role)

        setAuth(prev => {
            return { ...prev, accessToken: [refreshToken], roles: [role] }
        })

    }
    return refresh
}
export default useRefreshToken