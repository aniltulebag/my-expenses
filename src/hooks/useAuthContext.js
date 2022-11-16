import { useContext } from 'react';

// context
import { AuthContext } from '../context/AuthContext';

const useAuthContext = () => {
  const authCtx = useContext(AuthContext);

  if (!authCtx) {
    throw Error('useAuthContext must be inside an AuthContextProvider');
  }

  return authCtx;
};

export default useAuthContext;
