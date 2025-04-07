import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { loginAPI, registerAPI, confirmUserAPI, loginSRPAPI, socialLoginAPI, confirmSocialLoginCodeAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

import { 
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoRefreshToken
} from 'amazon-cognito-identity-js';


type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  socialLogin: () => void;
  confirmUser: (username: string, confirmation_code: string) => void;
  confirmSocialLoginCode: (code: string, provider:string) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
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

  const registerUser = async (
    username: string,
    password: string
  ) => {
    await registerAPI(username, password)
      .then((res) => {
        if (res) {
          toast.success("register Success!");
          navigate("/confirm-user");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (username: string, password: string) => {
    console.log('loginUser')
    await loginSRPAPI(username, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.token);
          const userObj = {
            userName: res?.userName,
            email: res?.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const confirmUser = async (username: string, confirmation_code: string) => {
    await confirmUserAPI(username, confirmation_code)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.token);
          const userObj = {
            userName: res?.userName,
            email: res?.email,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.token!);
          setUser(userObj!);
          toast.success("Login Success!");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const socialLogin = async () => {
    await socialLoginAPI()
      .then((res) => {
        
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const confirmSocialLoginCode = async (code: string, provider:string) => {
    await confirmSocialLoginCodeAPI(code, provider)
      .then((res) => {
        
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    try {
      const userPool = new CognitoUserPool({
        UserPoolId: 'us-east-1_3Tae1o0SV',
        ClientId: '786q0ubcs8367sqj0igip4002q'
      });
      const cognitoUser = userPool.getCurrentUser();
      
      if (cognitoUser) {
        // Async signout (some implementations may need await)
        cognitoUser.signOut();
        
        // Clear storage
        const clientId = userPool.getClientId();
        const prefix = `CognitoIdentityServiceProvider.${clientId}`;
        const keysToRemove = [];
        
        // Build list of all Cognito keys
        keysToRemove.push(`${prefix}.LastAuthUser`);
        
        const lastUser = localStorage.getItem(`${prefix}.LastAuthUser`);
        if (lastUser) {
          keysToRemove.push(
            `${prefix}.${lastUser}.idToken`,
            `${prefix}.${lastUser}.accessToken`,
            `${prefix}.${lastUser}.refreshToken`,
            `${prefix}.${lastUser}.userData`
          );
        }
        
        // Remove all items
        keysToRemove.forEach(key => {
          try {
            localStorage.removeItem(key);
          } catch (e) {
            console.warn(`Failed to remove ${key}`, e);
          }
        });
      }
      
      // Clear application-specific storage
      const appKeys = Object.keys(localStorage).filter(key => 
        key.startsWith('yourApp.')
      );
      appKeys.forEach(key => localStorage.removeItem(key));
      
      // Force client-side cleanup
      window.dispatchEvent(new Event('storage'));
      
    } catch (error) {
      console.error('Logout failed:', error);
      // Fallback: Nuclear option if something went wrong
      localStorage.clear();
      sessionStorage.clear();
    } finally {
      // Ensure UI updates even if errors occurred
      window.location.href = '/login';
    }
}

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser, confirmUser, socialLogin, confirmSocialLoginCode }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
