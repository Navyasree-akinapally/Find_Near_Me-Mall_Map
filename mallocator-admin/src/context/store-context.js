import { createContext, useContext, useEffect, useRef, useState } from "react";
import mallServices from "../services/mall.service";
import authServices from "../services/auth.service";
import { useAuth } from "./auth-context";
import { useLocation } from "react-router-dom";

const storeContext = createContext()

export const StoreProvider = ({ children }) => {
    const [mallsData, setMallsData] = useState(null)
    const dropdownRef = useRef(null);
    const [likedStores, setLikedStores] = useState([]);
    const location = useLocation()
    const [isAuth, setIsAuth] = useState(false);
    const ls = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (ls !== null) {
            setIsAuth(true)
        }
    }, [ls, location])

    const values = {
        mallsData,
        dropdownRef,
        likedStores,
        setLikedStores
    }

    return (
        <storeContext.Provider value={values}>
            {children}
        </storeContext.Provider>
    )
}

const useStore = () => {
    const context = useContext(storeContext)

    return context
}

export default useStore