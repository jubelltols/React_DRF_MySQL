import React from 'react'
import { Navigate } from "react-router-dom"

import { useAuth } from "../../hooks/useAuth"

function AdminGuard({children}) {
    const { isAdmin } = useAuth()
    return isAdmin ? children : <Navigate to="/signin"/>
}

export default AdminGuard;