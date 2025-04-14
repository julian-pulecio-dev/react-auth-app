import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../Context/useAuth";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { confirmSocialLogin } from '../../Services/Auth/ConfirmSocialLogin';


type Props = {};

const GoogleSocialLoginButton = (props: Props) => {
  const { loginSocialUser, error: authError } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSocialLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      console.log("Authorization code:", codeResponse.code);
      confirmSocialLogin(codeResponse.code, 'Google');
    },
    onError: (error) => console.error('Login Failed:', error),
  });

  
  return (
    <>       
        <button
            onClick={() => handleSocialLogin()}
            className="btn btn-outline-light mb-3 w-100 d-flex align-items-center justify-content-center"
        >
        <FaGoogle className="me-2" />
        </button>
    </>
  );
};

export default GoogleSocialLoginButton;