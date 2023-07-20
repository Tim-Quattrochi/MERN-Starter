import { useContext } from "react";
import { AuthContext } from "./useAuthProvider";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
