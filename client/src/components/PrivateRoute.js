import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// A wrapper for components that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute( { children } ) {
  let auth = useAuth();
  return auth.isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
