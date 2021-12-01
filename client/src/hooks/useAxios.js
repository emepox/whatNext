import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

export default function useAxios() {
  const auth = useAuth();
  const navigate = useNavigate();

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Add the token to the header for every request
    config.headers["authorization"] = "Bearer " + localStorage.getItem("token");
    return config;
  });

  // Add a response interceptor
  axios.interceptors.response.use(undefined, function (error) {
    console.log(error.response);
    if (error.response.status === 401) {
      // if the user is not authorized, log him out and redirect him to login page
      auth.signout(() => navigate("/login"));
    }
    return Promise.reject(error);
  });

  return axios;
}
