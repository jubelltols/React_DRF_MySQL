import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import JWTService from '../services/JWTService'
import AuthService from "../services/AuthService"

const Context = React.createContext({});

export function AuthContextProvider({ children }) {

    const navigate = useNavigate();

    const check_auth = () => {
        if (JWTService.getToken()) {
            AuthService.getUser()
            .then(({ data }) => {
                setUser(data)
                chack_admin()
            })
            .catch(({ response }) => {
                JWTService.destroyToken();
                setUser(null)
                navigate('/home');
            });
        }
    }

    const chack_admin = () => {
        AuthService.isAdmin() 
        .then((response) => {
            setIsAdmin(true)
        }).catch((error) => {
            setIsAdmin(false)
        })
    }

    const [ user, setUser ] = useState(() => check_auth());
    const [ jwt, setJWT ] = useState(null);
    const [ isAdmin, setIsAdmin ] = useState(false)

    return (
        <Context.Provider value={{ user, isAdmin, setUser, jwt, setJWT }}>{children}</Context.Provider>
    );
}

export default Context;