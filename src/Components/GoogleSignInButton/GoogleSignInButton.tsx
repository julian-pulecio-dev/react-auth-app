import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "../../Context/useAuth";
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from "react";


type Props = {};

const GoogleSocialLoginButton = (props: Props) => {
  const { callbackSocialLoginUser, error: authError } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setError(null); 
    };
  }, [setError]);

  const handleSocialLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      callbackSocialLoginUser(codeResponse.code, 'Google');
    },
    onError: (err) => setError(err instanceof Error ? err.message : 'Login failed')
  });

  
  return (
    <>   
        {error && <p style={{ color: 'red' }}>{error}</p>}    
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