import React, { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import SpinnerLoading from "../../components/Spinner/SpinnerLoading"

function AuthSubscriptionGuard() {
    const { user, subscription, isLoading } =  useContext(AuthContext) 

    return isLoading ? <SpinnerLoading /> 
                    : ( user && subscription?.status === "active" ? <Outlet/> 
                                                                : <Navigate to="/checkout"/>)
}

export default AuthSubscriptionGuard;