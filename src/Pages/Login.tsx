import React, { useState } from 'react';
import { loginSRP } from '../Services/Auth/LoginSRP';
import { useEffect } from "react";
import { useAuth } from "../Context/useAuth";
import GoogleSignInButton from "../Components/GoogleSignInButton/GoogleSignInButton";

const Login: React.FC = () => {
  const { loginUser, error: authError } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      setError(null); 
  };
  }, [setError]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      console.log('handleLogin')
      await loginUser(username, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <>
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Login</button>
    </form>
    <GoogleSignInButton />
    </>
  );
};

export default Login;