import axios from "./useAxios";
import useAuthContext from "./useAuthContext";

const useRefreshToken = () => {
  const { authDispatch } = useAuthContext();

  const refresh = async () => {
    try {
      const response = await axios.get("/auth/refresh", {
        //send with cookies
        withCredentials: true,
      });
      const { accessToken } = response.data;
      authDispatch({
        type: "UPDATE_ACCESS_TOKEN",
        payload: accessToken,
      });

      return accessToken;
    } catch (error) {
      console.log("Error refreshing token:", error);
      authDispatch({ type: "LOGOUT" });
    }
  };

  return refresh;
};

export default useRefreshToken;
