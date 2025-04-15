import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginSRP } from "../Services/Auth/LoginSRP";
import { logout } from "../Services/Auth/Logout";
import { callbackSocialLogin } from "../Services/Auth/CallbackSocialLogin";
import { UserProfile,  } from "../Types/User";
import { decodeToken } from "../Helpers/DecodeJWt";
import React from "react";
import axios from "axios";


type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  error: string | null;
  loginUser: (username: string, password: string) => void;
  callbackSocialLoginUser: (code: string, provider:string) => void
  logoutUser: () => void;
  isLoggedIn: () => boolean;
  setError: (error: string | null) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const loginUser = async (username: string, password: string) => {
    await loginSRP(username, password)
      .then((res) => {
        const decodedToken = decodeToken(res?.idToken!);
        if (!decodedToken?.email) {
          throw new Error("Decoded token does not contain a valid email.");
        }
        const userObj = {
          userName: decodedToken.email,
          email: decodedToken.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", res?.accessToken);
        setToken(res?.accessToken!);
        setUser(userObj!);
      })  
  };

  const callbackSocialLoginUser = async (code: string, provider:string) => {
    await callbackSocialLogin(code, provider)
      .then((res) => {
        const decodedToken = decodeToken(res?.idToken!);
        if (!decodedToken?.email) {
          throw new Error("Decoded token does not contain a valid email.");
        }
        const userObj = {
          userName: decodedToken.email,
          email: decodedToken.email,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        localStorage.setItem("token", res?.accessToken);
        setToken(res?.accessToken!);
        setUser(userObj!);
      })

  };

  const logoutUser = async () => {
    await logout()
  };

  const isLoggedIn = () => {
    return !!user;
  };


  return (
    <UserContext.Provider
      value={{ loginUser, callbackSocialLoginUser, user, token, logoutUser, isLoggedIn, error, setError,}}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
