// CallbackPage.jsx
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/useAuth";

import axios from 'axios';

const ConfirmSocialLoginCodePage = () => {
  const { confirmSocialLoginCode } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  
  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Extract code from URL query parameters
        const searchParams = new URLSearchParams(location.search);
        const code = searchParams.get('code');
        const error = searchParams.get('error');
        
        if (error) {
          throw new Error(`OAuth error: ${error}`);
        }

        if (!code) {
          throw new Error('Authorization code not found');
        }

        confirmSocialLoginCode(code, 'Google')

        // Redirect to home or protected page
        navigate('/');
      } catch (err) {
        console.error('Authentication failed:', err);
      }
    };

    handleCallback();
  }, [location, navigate]);

  return (
    <div className="callback-page">
      <h2>Processing login...</h2>
      <p>Please wait while we authenticate your account.</p>
    </div>
  );
};

export default ConfirmSocialLoginCodePage;
