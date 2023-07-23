import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuthContext from "../../hooks/useAuthContext";

const DashBoard = () => {
  const [list, setList] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { handleLogout, authState } = useAuthContext();

  console.log(authState);

  useEffect(() => {
    axiosPrivate
      .get("/auth/list")
      .then((res) => {
        const { data } = res;
        console.log(res);
        setList(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashBoard;
