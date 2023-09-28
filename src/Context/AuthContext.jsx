import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

const AuthContextComponent = ({children}) => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("userInfo")) || {})
    const [isLogged, setIsLogged] = useState(JSON.parse(localStorage.getItem("isLogged")) || false)

    const loginContext = (userLogged) => {
        setUser(userLogged)
        setIsLogged(true)
        localStorage.setItem("userInfo", JSON.stringify(userLogged) )
        localStorage.setItem("isLogged", JSON.stringify(true) )
    }

    const logoutContext = () => {
        setUser({})
        setIsLogged(false)
        localStorage.removeItem("userInfo")
        localStorage.removeItem("isLogged")
    }

    const data = {
        user,
        isLogged,
        loginContext,
        logoutContext
    }

  return (
    <AuthContext.Provider value={data}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextComponent