import { createContext, useContext, useEffect, useState } from "react";
import userServices from "../services/app/user.service";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = async () => {
        setIsDarkMode(!isDarkMode)
        try {
            await userServices.toggleDarkMode({ darkMode: !isDarkMode })
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                let res = await userServices.userDetails();
                console.log(res);
                if (res.data) {
                    setIsDarkMode(res.data.dark_mode)
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchData()
    }, [])

    const contextValues = {
        toggleDarkMode,
        isDarkMode
    }

    return (
        <ThemeContext.Provider value={contextValues}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    return context;
}