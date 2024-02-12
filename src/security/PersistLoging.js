import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useAuth from "./hooks/useAuth";
import AuthContext from "./context/AuthProvider";
import useRefreshToken from "./RefreshToken";
import Cookies from "js-cookie";
import { useUserType } from "../components/Context/UserTypeContext";



const PersistLogin = () => {
  
    
    const refresh = useRefreshToken()
    const [isLoading, setisLoading] = useState(true)
    
    useEffect(() => {

        const verifyToken = () => {
            try {
                refresh()
            
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setisLoading(false)
            }
        }
        
        const token = Cookies.get('jwtToken')
        console.log(token)
        token ? verifyToken() : setisLoading(false)
        // !auth?.roles ? verifyToken() : setisLoading(false)
    }, [])

    return (
        <>
            {isLoading ? <p>Loading......</p> : <Outlet />}
        </>
    )
}
export default PersistLogin