import { useState } from 'react'
import { Outlet } from "react-router";
import './App.css'
import { UserProvider } from "./Context/useAuth";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="736009949949-g5nmi6l81ef3s59ih4n35b01665t1fj8.apps.googleusercontent.com">
      <UserProvider>
        <Outlet />
      </UserProvider>
    </GoogleOAuthProvider>
  )
}

export default App
