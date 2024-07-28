/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { decodeToken } from 'react-jwt'

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
    const [ token, setToken ] = useState(localStorage.getItem("token"))
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ user, setUser ] =  useState(null)
  
    useEffect(()=>{
        const jwttoken = localStorage.getItem("token")
        if(jwttoken){
            setToken(jwttoken)
            setIsLoggedIn(true)
            const decodedData = decodeToken(jwttoken)
            setUser(decodedData.user)
        }
    }, [token])

    const login = (token) => {
        localStorage.setItem("token", token)
        setToken(token)
        setIsLoggedIn(true)
    }
    const logout = () =>{
        localStorage.removeItem("token")
        setToken(null)
        setIsLoggedIn(false)
    }
    
    return(
        <AuthContext.Provider value={{token, isLoggedIn, login, logout, user}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>{
    const authContext = useContext(AuthContext)
    return authContext
}