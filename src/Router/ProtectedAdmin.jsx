import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAdmin = () => {

    const { user } = useContext(AuthContext)

    return <>
        {user.role === import.meta.env.VITE_ADMIN_CODE ? <Outlet /> : <Navigate to={'/'} />}
    </>
}

export default ProtectedAdmin