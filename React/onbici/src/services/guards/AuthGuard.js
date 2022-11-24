import React, { useContext } from 'react'
import { Navigate, Outlet, useLocation } from "react-router-dom"

import AuthContext from "../../context/AuthContext"
import SpinnerLoading from "../../components/Spinner/SpinnerLoading"

function AuthGuard() {
    const { user, isLoading } = useContext(AuthContext) 

    return isLoading ? <SpinnerLoading /> : (user ? <Outlet/> : <Navigate to="/signin"/>)
}

export default AuthGuard;