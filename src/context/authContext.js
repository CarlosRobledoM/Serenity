import { createContext, useEffect, useState, React } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth } from '../api/firebase/firebase';

//----------------------------------------------------------

export const userContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const singUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password);
  };

  const singIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logInGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(currentUser);
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        singUp,
        singIn,
        logInGoogle,
        logOut,
      }}
    >
      {children}
    </userContext.Provider>
  );
}

//----------------------------------------------------------
