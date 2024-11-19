import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../helpers/localstorage";
import { useLocation } from "react-router-dom";
import authServices from "../services/auth.service";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const [auth, setAuth] = useState(null);
    const [isAdminAuth, setIsAdminAuth] = useState(false)
    const [isMallAdminAuth, setIsMallAdminAuth] = useState(false)
    const location = useLocation()
    const [userDetails, setUserDetails] = useState({})
    const [isProfileOpen, setIsProfileOpen] = useState(false)


    useEffect(() => {
        if (auth && auth.user.role === 'superadmin') {
            setIsAdminAuth(true)
        }
    }, [auth, location])

    useEffect(() => {
        if (auth && auth.user.role === 'malladmin') {
            setIsMallAdminAuth(true)
        }
    }, [auth, location])

    useEffect(() => {
        if (isAuthenticated()) {
            setIsAuth(true);
            setAuth({
                user: isAuthenticated()
            })
        }
    }, [location])

    useEffect(() => {
        if (isAuth) {
            setIsAuth(true);
            setAuth({
                user: isAuthenticated()
            })
        }
    }, [isAuth])

    const handleLogout = () => {
        authServices.logout();
        setIsAuth(false)
        setIsProfileOpen(false)
    }

    const contextValues = {
        setIsAuth,
        isAuth,
        isAdminAuth,
        auth,
        userDetails,
        isProfileOpen,
        handleLogout,
        setIsProfileOpen,
        isMallAdminAuth
    }

    return (
        <AuthContext.Provider value={contextValues}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context;
}