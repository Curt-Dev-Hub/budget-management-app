// this context can be used to control login state and refuse access to certain routes when
// user is not logged in


import { createContext, useContext , useState } from "react"

const LoginContext = createContext(false)

export function isLoggedIn() {
    return useContext(LoginContext)
}


export const LogInProvider({ children }) => {
    
}