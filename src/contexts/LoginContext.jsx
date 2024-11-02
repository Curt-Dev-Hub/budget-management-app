// this context can be used to control login state and refuse access to certain routes when



import { createContext, useContext , useState, useEffect } from "react"
import axios from "axios"

export const LoginContext = createContext(false)

export function useLoginStatus() { // was isLoggedIn
    return useContext(LoginContext)
}


export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false)

    useEffect(() => {
        axios.get("/path/to/session/status/endpoint")
        .then((response) => {
            setLoginStatus(response.data.loggedIn)
        })
        .catch((error) => {
            console.error("Something went wrong fetching the login status, see here:" + error);
        });
    }, [])

    // const confirmLogin = 

    return <LoginContext.Provider value={{
        loginStatus,
        setLoginStatus
    }}>{ children }</LoginContext.Provider>
}    