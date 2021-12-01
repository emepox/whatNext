import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// A wrapper for components that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute( { children } ) {
  let auth = useAuth();
  console.log(auth)
  return auth.isLoggedIn ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
