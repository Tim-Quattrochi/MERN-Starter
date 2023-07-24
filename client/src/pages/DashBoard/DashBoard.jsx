import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuthContext from "../../hooks/useAuthContext";

const DashBoard = () => {
  const [list, setList] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { handleLogout, authState } = useAuthContext();

  /**
   * @description Right now this axios call is just a test
   * to test protected endpoints
   */

  useEffect(() => {
    axiosPrivate
      .get("/auth/list")
      .then((res) => {
        const { data } = res;

        const { list } = data;
        setList(list);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <span>IF you can see this list, you are authorized.</span>
      <ul>
        {list && list.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default DashBoard;
