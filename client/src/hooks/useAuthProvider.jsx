import { useEffect, useReducer, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { authReducer, initialState } from "../context/AuthReducer";
import { handleDispatch } from "../utils/authUtils";
import { APP_NAME } from "../config/constants";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../services/authService";

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    initialState
  );
  const [checking, setIsChecking] = useState(true); //checking if user is authenticated for private route
  const navigate = useNavigate();

  const handleRegister = async (userDetails) => {
    const { email, password } = userDetails;

    try {
      await registerUser(userDetails, authDispatch);

      //log the user in after successful registration

      await handleLogin(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      await loginUser(email, password, authDispatch);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      logoutUser(authDispatch);
      navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", true);

    const authValue = JSON.parse(localStorage.getItem(`${APP_NAME}`));
    if (authValue) {
      handleDispatch(authDispatch, "LOGIN", authValue);
    } else {
      handleDispatch(authDispatch, "LOGOUT", null);
    }
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", false);
    setIsChecking(false);
  }, [authDispatch]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        handleRegister,
        handleLogin,
        handleLogout,
        checking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
