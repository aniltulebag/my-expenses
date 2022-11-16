import { useEffect, useState } from 'react';

// firebase
import { projectAuth } from '../firebase/config';

// custom hooks
import useAuthContext from './useAuthContext';

const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      // login user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      if (!res.user) {
        throw new Error('Could not complete login');
      }

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        console.log(error);
        setIsPending(false);
        setError(error);
      }
    }
  };

  // cleanup on unmount
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { isPending, error, login };
};

export default useLogin;
