import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import AuthService from "../../services/auth.service";

export const useSignout = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signout = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const data = await AuthService.logout()
      console.log(data.message)
      dispatch({type: 'signout'})
      setIsLoading(false);
    } catch (err) {
      setError(err.response.data.message)
      setIsLoading(false);
      console.log(err.response.data.message)
    }    
  }

  return { signout, isLoading }
}