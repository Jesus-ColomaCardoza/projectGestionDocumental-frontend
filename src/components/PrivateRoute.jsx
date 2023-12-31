import { useContext, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import UserContext from "../contexts/UserContext"

const PrivateRoute = () => {
    const { isAuth } = useContext(UserContext)
    return (
        <>
            {isAuth ? <Outlet /> : <Navigate to='/' />}
        </>
    )
}

export default PrivateRoute