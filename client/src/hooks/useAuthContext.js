import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/**
 * @description  Custom hook to Make it easier to access AuthContext.
 *  @returns {object}  The value of AuthContext
 */
const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
