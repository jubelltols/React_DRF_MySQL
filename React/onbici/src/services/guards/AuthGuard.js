import React from 'react'
import { Navigate } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"

function AuthGuard({children}) {
    const { isLogged } = useAuth()
    return isLogged ? children : <Navigate to="/signin"/>
}

export default AuthGuard;