import React, { useEffect, useState } from "react"

import JWTService from '../services/JWTService'
import AuthService from "../services/AuthService"
import SubscriptionService from "../services/SubscriptionService"

const Context = React.createContext({});

export function AuthContextProvider({ children }) {

    const [ user, setUser ] = useState();
    const [ subscription, setSubscription ] = useState();
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ jwt, setJWT ] = useState(JWTService.getToken());
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {  
        async function loadData() {
            await loadUser()
            await loadSubscription()
            await checkAdmin()
            setLoading(false)
        }
        loadData();
    }, [])

    const loadUser = async () => {
        await AuthService.getUser()
        .then(({ data }) => {
            setUser(data)
        })
        .catch(({ response }) => {
            JWTService.destroyToken();
            setUser(null)
        });
    }

    const loadSubscription = async () => {
        await SubscriptionService.getUserSubscription()
        .then(({ data }) => {
            setSubscription(data)
        })
        .catch(({ response }) => {
            setSubscription(null)
        });
    }

    const checkAdmin = async () => {
        await AuthService.isAdmin() 
        .then((response) => {
            setIsAdmin(true);
        }).catch((error) => {
            setIsAdmin(false);
        })
    }

    return (
        <Context.Provider value={{ loadUser, user, setUser, isLoading, subscription, setSubscription, isAdmin, setIsAdmin, jwt, setJWT }}>{children}</Context.Provider>
    );
}

export default Context;