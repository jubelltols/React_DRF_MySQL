import {useCallback, useContext, useState} from 'react'
import { useNavigate } from "react-router-dom"

import AuthContext from '../context/AuthContext'
import AuthService from '../services/AuthService'
import JWTService from '../services/JWTService'

export function useAuth () {
    const navigate = useNavigate();
    const { user, setUser, jwt, setJWT, isAdmin, setIsAdmin } = useContext(AuthContext)
    const [status, setStatus] = useState({loading: false, serror: false})
    
    const signup = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.signup(data) 
        .then((res) => {
            setStatus({ loading: false, error: false });
            navigate('/signin');
        }).catch((error) => {
            setStatus({ loading: false, error: true });
        });
    },[setStatus, navigate]);

    const signin = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.login(data) 
        .then((res) => {
            setStatus({ loading: false, error: false });
            JWTService.saveToken(res.data.access)
            setJWT(res.data.access)
            navigate('/');
            window.location.reload(false);
        }).catch((error) => {
            setStatus({ loading: false, error: true });
        });
    },[setJWT, navigate]);

    const changePassword = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.changePassword(data) 
        .then((res) => {
            setStatus({ loading: false, error: false });
            navigate('/');
        }).catch((error) => {
            setStatus({ loading: false, error: true });
        });
    },[navigate]);

    const updateUser = useCallback((data) => {
        setStatus({ loading: true, error: false });
        AuthService.updateUser(data) 
        .then((response) => {
            setStatus({ loading: false, error: false });
            navigate('/');
        }).catch((error) => {
            setStatus({ loading: false, error: true });
        });
    },[navigate]);

    const isLogged = () => {
        if (JWTService.getToken() && user) {
            return true;
        }
        return false
    }

    const logout = useCallback(() => {
        JWTService.destroyToken()
        setUser(null)
        setJWT(null)
    }, [setJWT, setUser])

    return {jwt, user, isAdmin, setIsAdmin, status, signin, signup, changePassword, updateUser, logout, isLogged: isLogged()}
}