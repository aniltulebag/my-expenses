import { createContext, useEffect, useReducer } from 'react';

// firebase
import { projectAuth } from '../firebase/config';

const INITIAL_AUTH_STATE = {
  user: null,
  authIsReady: false,
  dispatch: action => {},
};

export const AuthContext = createContext(INITIAL_AUTH_STATE);

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'AUTH_IS_READY':
      return { ...state, user: payload, authIsReady: true };
    case 'LOGIN':
      return { ...state, user: payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  useEffect(() => {
    // adds an observer is only triggered on sign-in or sign-out
    const unsubscribe = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user });

      unsubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
