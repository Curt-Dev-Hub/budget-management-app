// this context can be used to control login state and refuse access to certain routes when user is not authenticated

import { createContext, useContext , useState, useEffect } from "react"
import axios from "axios"
import PropTypes from 'prop-types';

export const LoginContext = createContext(false)

export function useLoginStatus() { 
    return useContext(LoginContext)
}


export const LoginProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Configure axios defaults
    useEffect(() => {
        // Configure axios globally
        axios.defaults.baseURL = 'http://localhost'; // Base URL
        axios.defaults.withCredentials = true;
        
        // Add request interceptor for logging
        const requestInterceptor = axios.interceptors.request.use(
            config => {
                console.log('Axios Request Config:', config);
                return config;
            },
            error => {
                console.error('Axios Request Error:', error);
                return Promise.reject(error);
            }
        );

        // Add response interceptor for logging
        const responseInterceptor = axios.interceptors.response.use(
            response => {
                console.log('Axios Full Response:', response);
                return response;
            },
            error => {
                console.error('Axios Response Error:', error);
                return Promise.reject(error);
            }
        );

        // Cleanup interceptors
        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);


    // Parsing function to handle extra characters appearing before the incoming JSON object
    const parseResponse = (responseString) => {
        // Find the first '{' to start parsing JSON
        const jsonStartIndex = responseString.indexOf('{');
        
        if (jsonStartIndex !== -1) {
          const jsonString = responseString.slice(jsonStartIndex);
          try {
            return JSON.parse(jsonString);
          } catch (error) {
            console.error('Error parsing response:', error);
            return null;
          }
        }
        
        return null;
      };

    // Session check method
    const checkSession = async () => {
        try {
            const response = await axios.get('/budget-api/includes/session.inc.php', {
                withCredentials: true
            });
            const parsedData = parseResponse(response.data)
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
    }, [])


    // Centralised logout
    const logout = async () => {
        try {
            const response = await axios.get('/budget-api/logout.php', {} , {
                withCredentials: true
            });
            if(response.data.status === "success") {
                setLoginStatus(false);
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
        
    return <LoginContext.Provider value={{
        loginStatus,
        setLoginStatus,
        logout,
        checkSession,
        isLoading
    }}>{ children }</LoginContext.Provider>
}    

LoginProvider.propTypes = {
    children: PropTypes.node
}