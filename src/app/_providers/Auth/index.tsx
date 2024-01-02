"use client";
import React, { createContext, useCallback, useEffect, useState } from "react";

import {
  Profile,
  ActiveProfile,
  addProfile,
  addActiveProfile,
  getActiveProfile,
  deleteActiveProfile,
  getProfile,
} from "../../_services/database";

type Login = (args: { username: string }) => Promise<Profile>;
type Logout = () => Promise<void>;
type UpdateUser = () => Promise<ActiveProfile | null>;

type IContextType = {
  user: Profile | null;
  setUser: (user: Profile | null) => void;
  logout: Logout;
  updateUser: UpdateUser;
  login: Login;
  status: "loggedOut" | "loggedIn";
  loading: boolean;
};

export const AuthContext = createContext({} as IContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [status, setStatus] = useState<"loggedOut" | "loggedIn">("loggedOut");
  const [loading, setLoading] = useState<boolean>(false);

  const login = useCallback<Login>(async (args) => {
    try {
      let user = await getProfile(args.username);

      if (!user) {
        user = await addProfile(args.username);
      }

      addActiveProfile(user);

      setUser(user);
      setStatus("loggedIn");

      return user;
    } catch (e) {
      console.log(e);
      throw new Error("Произошла ошибка при получении учетной записи.");
    }
  }, []);

  const logout = useCallback<Logout>(async () => {
    try {
      deleteActiveProfile();
      setUser(null);
      setStatus("loggedOut");
    } catch (e) {
      console.log(e);
      throw new Error("Произошла ошибка при попытке выхода из системы.");
    }
  }, []);

  const updateUser = useCallback<UpdateUser>(async () => {
    try {
      const user = await getActiveProfile();
      setUser(user);
      user ? setStatus("loggedIn") : setStatus("loggedOut");
      return user;
    } catch (e) {
      console.log(e);
      return null;
    }
  }, []);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const user = await getActiveProfile();

        setUser(user);
        setLoading(true);
        user ? setStatus("loggedIn") : setStatus("loggedOut");
      } catch (e) {
        console.log(e);
        throw new Error("Произошла ошибка при получении учетной записи.");
      }
    };

    fetchMe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        updateUser,
        status,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
