import {
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "../hooks/useAxios";
import { APP_NAME } from "../config/constants";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({});

const initialState = {
  user: null,
  isAuthenticated: false,
  isSubmitting: false,
  accessToken: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
      };
    case "REGISTER":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
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
    case "SET_IS_SUBMITTING":
      return {
        ...state,
        isSubmitting: action.payload,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(
    authReducer,
    initialState
  );
  const [checking, setIsChecking] = useState(true); //checking if user is authenticated for private route
  const navigate = useNavigate();

  /**
   *
   * @param {string} caseToCall  - the action to dispatch.
   * @param {any} [value ] - the payload data for action (optional)
   * @returns {void}
   */
  const handleDispatch = (caseToCall, value) => {
    authDispatch({
      type: caseToCall,
      payload: value,
    });
  };

  const saveToLocal = (user, accessToken) => {
    const dataToStore = { user, accessToken };
    localStorage.setItem(`${APP_NAME}`, JSON.stringify(dataToStore));
  };

  const register = async (userDetails) => {
    const { password } = userDetails; //To log them in on line 85

    handleDispatch("SET_IS_SUBMITTING", true);

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

        handleDispatch("REGISTER", { user: userInfo, accessToken });
        handleDispatch("SET_IS_SUBMITTING", false);

        return await login(email, password);
      }
    } catch (error) {
      handleDispatch("SET_IS_SUBMITTING", false);

      console.log(error);

      if (error.response || error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const login = async (email, password) => {
    handleDispatch("SET_IS_SUBMITTING", true);

    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { _id, name, email, accessToken } = response.data;
        const userInfo = { _id, name, email };
        saveToLocal(userInfo, accessToken);

        handleDispatch("LOGIN", { user: userInfo, accessToken });
        handleDispatch("SET_IS_SUBMITTING", false);
      }
    } catch (error) {
      console.log(error);
      handleDispatch("SET_IS_SUBMITTING", false);

      if (error.response || error.response.data) {
        throw new Error(error.response.data.error);
      } else {
        throw error;
      }
    }
  };

  const handleLogout = async () => {
    handleDispatch("SET_IS_SUBMITTING", true);

    try {
      await axios.post("/auth/logout");

      localStorage.removeItem(`${APP_NAME}`);
      handleDispatch("LOGOUT", null);
      handleDispatch("SET_IS_SUBMITTING", false);

      return navigate("/welcome");
    } catch (error) {
      handleDispatch("SET_IS_SUBMITTING", false);

      console.log(error);
    }
  };

  useEffect(() => {
    handleDispatch("SET_IS_SUBMITTING", true);

    const authValue = JSON.parse(localStorage.getItem(`${APP_NAME}`));
    if (authValue) {
      handleDispatch("LOGIN", authValue);
    } else {
      handleDispatch("LOGOUT", null);
    }
    handleDispatch("SET_IS_SUBMITTING", false);
    setIsChecking(false);
  }, [authDispatch]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
        register,
        login,
        handleLogout,

        checking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
