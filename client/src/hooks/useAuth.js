import { useContext } from "react";
import authContext from "../contexts/auth";

function useAuth() {
  return useContext(authContext);
}

export default useAuth;
