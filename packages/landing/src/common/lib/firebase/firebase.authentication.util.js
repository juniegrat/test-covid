import { useState, useEffect } from 'react';
import { auth } from './firebase';

const formatAuthUser = (user) => ({
  uid: user.uid,
  email: user.email
});

export default function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState) => {
    if (!authState) {
      setAuthUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    setLoading(false);
  };

  const signInWithEmail = async (email, password) =>
    await auth.signInWithEmailAndPassword(email, password);
  const signUpWithEmailAndPassword = async (email, password) =>
    await auth.createUserWithEmailAndPassword(email, password);

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const signOut = () => auth.signOut();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signInWithEmail,
    signUpWithEmailAndPassword,
    resetPassword,
    signOut
  };
}
