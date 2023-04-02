/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {createContext, useEffect, useState} from 'react';
import {User as FirebaseUserType, getAuth, signOut} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ChildrenInterface} from '../interfaces/general/ChildrenNode';

type PropsAuthContext = {
  user: FirebaseUserType;
  saveUser: (user: FirebaseUserType) => Promise<void>;
  removeUser: () => Promise<void>;
};

const DEFAULT_VALUE = {
  user: {} as FirebaseUserType,
};

const userKey = '@meteor-to-do:user';

const AuthContext = createContext({} as PropsAuthContext);

const AuthContextProvider: React.FC<ChildrenInterface> = ({children}) => {
  const [user, setUser] = useState<FirebaseUserType>(DEFAULT_VALUE.user);

  const auth = getAuth();

  async function saveUser(newUser: FirebaseUserType) {
    try {
      setUser(newUser);
      await AsyncStorage.setItem(userKey, JSON.stringify(newUser));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function removeUser() {
    setUser({} as FirebaseUserType);
    await AsyncStorage.removeItem(userKey);
    await signOut(auth);
  }

  async function loadUser() {
    const userString = await AsyncStorage.getItem(userKey);
    const userData = userString ? JSON.parse(userString) : null;

    setUser(userData);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        saveUser,
        removeUser,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export {AuthContextProvider};
export default AuthContext;
