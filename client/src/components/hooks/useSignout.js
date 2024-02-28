import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import AuthService from "../../services/auth.service";

export const useSignout = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const signout = async () => {
    setIsLoading(true)

    await AuthService.logout().then(() => {
      dispatch({type: 'signout'})
      setIsLoading(false);
    })
  }

  return { signout, isLoading }
}