import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuthContext from "../../hooks/useAuthContext";
import LoadingSpinner from "../../components/Loading/LoadingSpinner";

const DashBoard = () => {
  const [list, setList] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { authState } = useAuthContext();
  const [loading, setLoading] = useState(false);

  /**
   * @description Right now this axios call is just a test
   * to test protected endpoints
   */

  useEffect(() => {
    setLoading(true);
    axiosPrivate
      .get("/auth/list")
      .then((res) => {
        const { data } = res;

        const { list } = data;
        setList(list);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  return (
    <div>
      <h1>Dashboard</h1>
      <span>IF you can see this list, you are authorized.</span>
      <ul>
        {list && list.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
};

export default DashBoard;
