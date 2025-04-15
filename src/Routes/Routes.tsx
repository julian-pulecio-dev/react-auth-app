import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../Pages/Login";
import CallbackSocialLoginPage from "../Pages/CallbackSocialLoginPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "social-login-confirm-code", element: <CallbackSocialLoginPage /> },
    ],
  },
]);
