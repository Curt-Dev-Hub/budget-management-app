// this context can be used to control login state and refuse access to certain routes when user is not authenticated

import { createContext, useContext , useState, useEffect, useMemo } from "react"
import axios from "axios";

export const LoginContext = createContext(false)

export function useLoginStatus() { 
    return useContext(LoginContext)
}

// eslint-disable-next-line react/prop-types
export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [name, setName] = useState(null);
    // console.log("LoginProvider mounted");


    // Configure defaults
    useEffect(() => {
        // global configuration
        axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`;  // Base URL
        axios.defaults.withCredentials = true;
        
        // Add request interceptor for logging
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                // console.log('Axios Request Config:', config);
                return config;
            },
            error => {
                // console.error('Axios Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor for logging
        const responseInterceptor = axios.interceptors.response.use(
            response => {
                // console.log('Axios Full Response:', response);
                return response;
            },
            error => {
                // console.error('Axios Response Error:', error);
                return Promise.reject(error);
            }
        );

        // Cleanup
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);



    // user authentication check method
    const checkSession = async () => {
        try {
            const response = await axios.get('/includes/session.inc.php', {
                withCredentials: true,
                timeout: 5000
            });
            
            const parsedData = response.data;
            setName(parsedData.data.name || "Generic")
            setLoginStatus(parsedData.data.message || false)
        } catch(error) {
            console.error('There was an error while checking login status: ', error)
            setLoginStatus(false);
        } finally {
            setIsLoading(false);
        }
    }


    useEffect(() => {
        checkSession();
    }, []);


    // Centralised logout
    const logout = async () => {
        console.log("Attempting Logout");
        try {
            const response = await axios.get('/logout.php', {} , {
                withCredentials: true
            });
            if(response.data.status === "success") {
                setLoginStatus(false);
                setName("")
                window.location.href = `/logout?message=${encodeURIComponent(response.data.message)}`;   
            } else {
                console.error('Logout failed: ', response.data.message);
            }
            return response.data.status
        } catch(error) {
            console.error("Logout request failed: ", error)
            return false;
        }
    }    

    const value = useMemo(() => ({
        name,
        loginStatus,
        setLoginStatus,
        isLoading,
        setIsLoading,
        logout,
        checkSession,
    }), [name, loginStatus, isLoading, checkSession]);

    return <LoginContext.Provider value={value}>{children}</LoginContext.Provider>;
}    

