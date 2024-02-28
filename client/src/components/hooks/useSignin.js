import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import AuthService from "../../services/auth.service";

export const useSignin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signin = async (username, password) => {
    setIsLoading(true)
    setError(null)

    await AuthService.login(username, password).then(() => {
      dispatch({type: 'signin'})
      setIsLoading(false);
    }, (error) => {
      const errorMessage = error.response.data.message
      setError(errorMessage)
      setIsLoading(false);
    })
  }

  return { signin, isLoading, error }
}