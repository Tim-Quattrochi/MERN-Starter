import axios from "../hooks/useAxios";
import { handleDispatch, saveToLocal } from "../utils/authUtils";
import { APP_NAME } from "../config/constants";

/**
 *
 * @param {Object} userDetails - the user details to be used for registration.
 * @param {Function} authDispatch -the dispatch function from the authReducer to update the state.
 * @returns {Promise<void>} - A promise that resolves when the registration is successful and the user is logged in.
 * @throws {Error} - If the registration fails or there is an error during the process.
 *  * @example
 * const userDetails = { name: "John Doe", email: "john@example.com", password: "secretpassword" };
 * used in AuthProvider.
 * await registerUser(userDetails, authDispatch);
 */
const registerUser = async (userDetails, authDispatch) => {
  handleDispatch(authDispatch, "SET_IS_SUBMITTING", true);

  try {
    await axios.post("/auth/register", userDetails);
  } catch (error) {
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", false);
    console.log(error);

    if (error.response.data) {
      handleDispatch(
        authDispatch,
        "SET_ERROR",
        error.response.data.error
      );
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
};

/**
 *
 * @param {string} email - email value from user login input.
 * @param {string} password - password value from user login input.
 * @param {Function} authDispatch  -the dispatch function from the authReducer to update the state.
 *
 * * @example
 * email: "john@example.com", password: "secretpassword" };
 * used in AuthProvider.
 * await loginUser(userEmail,password, authDispatch);
 */
const loginUser = async (userEmail, password, authDispatch) => {
  handleDispatch(authDispatch, "SET_IS_SUBMITTING", true);
  handleDispatch(authDispatch, "SET_ERROR", null); //clear any errors in state.
  try {
    const response = await axios.post("/auth/login", {
      email: userEmail,
      password,
    });

    const { _id, name, email, accessToken } = response.data;
    const userInfo = { _id, name, email };
    saveToLocal(userInfo, accessToken);

    handleDispatch(authDispatch, "LOGIN", {
      user: userInfo,
      accessToken,
    });
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", false);
  } catch (error) {
    console.log(error);
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", false);

    if (error.response || error.response.data) {
      handleDispatch(
        authDispatch,
        "SET_ERROR",
        error.response.data.error
      );
      throw new Error(error.response.data.error);
    } else {
      throw error;
    }
  }
};

/**
 *
 * @param {Function} authDispatch - The dispatch function from the authReducer to update the state.
 * @returns {void}
 */
const logoutUser = async (authDispatch) => {
  handleDispatch(authDispatch, "SET_IS_SUBMITTING", true);

  try {
    await axios.post("/auth/logout");

    localStorage.removeItem(`${APP_NAME}`);
    handleDispatch(authDispatch, "LOGOUT", null);
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", false);
  } catch (error) {
    handleDispatch(authDispatch, "SET_IS_SUBMITTING", false);
    if (error.response || error.response) {
      handleDispatch(
        authDispatch,
        "SET_ERROR",
        error.response.data.error
      );
    }
    console.log(error);
  }
};

export { registerUser, loginUser, logoutUser };
