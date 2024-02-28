import { createContext, useReducer, useEffect } from "react";
import AuthService from "../services/auth.service";
export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'signin':
      return { user: AuthService.getCurrentUser() }
    case 'signout':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const user = AuthService.getCurrentUser()

    if (user) {
      dispatch({ type: 'signin' })
    }
  }, [])

  console.log('AuthContext state: ', state)

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
}