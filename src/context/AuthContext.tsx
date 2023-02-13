import React, { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../db/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

interface User {
  email: string;
}

interface AuthContext {
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  logout: () => void;
  user: User | null;
}

const UserContext = createContext<AuthContext>({
  signUp: () => {},
  signIn: () => {},
  logout: () => {},
  user: null,
});

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (email: string, password: string) => {
    try {
      const existingDoc = await getDoc(doc(db, "users", email));
      if (existingDoc.exists()) {
        throw new Error(`A user with email ${email} already exists`);
      }

      await createUserWithEmailAndPassword(auth, email, password);
      return setDoc(doc(db, "users", email), {
        watchList: [],
      });
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser as User | null);
      } else {
        setUser(null);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, signIn, logout, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = (): AuthContext => {
  return useContext(UserContext);
};
