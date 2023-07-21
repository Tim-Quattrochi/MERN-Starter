import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const DashBoard = () => {
  const [list, setList] = useState("");
  const axiosPrivate = useAxiosPrivate();

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
  return <div>DashBoard</div>;
};

export default DashBoard;
