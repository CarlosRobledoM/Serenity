import { createContext, useEffect, useState, React } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../api/firebase/firebase';
import { addUser, getUsers } from '../api/firebase/api';

//----------------------------------------------------------

export const userContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const searchUser = async (auth) => {
    const users = await getUsers();
    users.filter(async (user) =>
      user.email === auth.currentUser.email
        ? null
        : await addUser(auth.currentUser.uid, {
            name: auth.currentUser.displayName,
            email: auth.currentUser.uid,
            date: new Date(),
          }),
    );
  };

  const singUp = async (email, password, name) => {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    await addUser(auth.currentUser.uid, {
      name: name,
      email: email,
      date: new Date(),
    });
  };

  const singIn = (email, password) => {
    signInWithEmailAndPassword(auth, email, password);
  };

  const logInGoogle = async () => {
    const googleProvider = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, googleProvider);
    await searchUser(auth);
    return response;
  };

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
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
