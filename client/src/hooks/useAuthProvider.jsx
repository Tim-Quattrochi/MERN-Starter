import { createContext, useEffect, useReducer } from "react";
import axios from "../hooks/useAxios";
import { APP_NAME } from "../config/constants";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const authReducer = (state, action) => {
  const { user, accessToken } = action.payload;

  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user,
        accessToken,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user,
        accessToken: accessToken,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
      };
    case "UPDATE_ACCESS_TOKEN":
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, {});
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const authValue = JSON.parse(
        localStorage.getItem(`${APP_NAME}`)
      );
      if (authValue) {
        authDispatch({ type: "LOGIN", payload: authValue });
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const saveToLocal = (user, accessToken) => {
    const dataToStore = { user, accessToken };
    localStorage.setItem(`${APP_NAME}`, JSON.stringify(dataToStore));
  };

  const register = async (userDetails) => {
    const { password } = userDetails; //To log them in on line 85

    try {
      const response = await axios.post(
        "/auth/register",
        userDetails
      );

      if (response.status === 201) {
        const { _id, name, email, accessToken } = response.data;
        const userInfo = {
          _id,
          name,
          email,
        };
        saveToLocal(userInfo, accessToken);
        authDispatch({
          type: "REGISTER",
          payload: { user: userInfo, accessToken },
        });

        return await login(email, password);
      }
    } catch (error) {
      console.log(error);
      if (error.response || error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { _id, name, email, accessToken } = response.data;
        const userInfo = { _id, name, email };
        saveToLocal(userInfo, accessToken);
        authDispatch({
          type: "LOGIN",
          payload: { user: userInfo, accessToken },
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response || error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/auth/logout");

      localStorage.removeItem(`${APP_NAME}`);
      authDispatch({ type: "LOGOUT", payload: authState.user });
      // return navigate("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        register,
        login,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
