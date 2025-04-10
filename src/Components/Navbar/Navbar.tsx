import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";
import { useAuth } from "../../Context/useAuth";
import { useGoogleLogin } from '@react-oauth/google';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';

interface Props {}

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout, confirmSocialLoginCode  } = useAuth();

  const login = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      console.log("Authorization code:", codeResponse.code);
      confirmSocialLoginCode(codeResponse.code, 'Google');
    },
    onError: (error) => console.error('Login Failed:', error),
  });


  return (
    <nav className="relative container mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-20">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="hidden font-bold lg:flex">
            <Link to="/search" className="text-black hover:text-darkBlue">
              Search
            </Link>
          </div>
        </div>
        {isLoggedIn() ? (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <div className="hover:text-darkBlue">Welcome, {user?.userName}</div>
            <a
              onClick={logout}
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Logout
            </a>
          </div>
        ) : (
          <div className="hidden lg:flex items-center space-x-6 text-back">
            <Link to="/login" className="hover:text-darkBlue">
              Login
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 font-bold rounded text-white bg-lightGreen hover:opacity-70"
            >
              Signup
            </Link>
            <div>
              <button onClick={() => login()}>
                Sign in with Google
              </button>
            </div>
          </div>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;
