import { useState } from "react";
import { useAuthContext } from "./useAuthContext.js";
import UserService from "../../services/user.service.js";

export const useGetQuiz = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const getquiz = async () => {
    setIsLoading(true)
    setError(null)

    try {
      await UserService.getQuiz()
      dispatch({type: 'signin'})
      setIsLoading(false);
    } catch (error) {
      const errorMessage = error.response.data.message
      setError(errorMessage)
      setIsLoading(false)
    }
  }

  return { getquiz, isLoading, error }
}