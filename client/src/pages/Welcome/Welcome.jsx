import "./welcome.css";
import { useNavigate } from "react-router-dom";
import {
  BatterySvg,
  BagSvg,
  WalletSvg,
  HeartSvg,
  CodeSvg,
} from "../../assets/index";

const Welcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <div className="welcome-container">
      <div className="heading">MERN Starter Template</div>
      <span className="sub-heading">Good to see you here</span>
      <button className="btn" onClick={handleClick}>
        LETS START
      </button>
      <div className="icon-container">
        <BagSvg />
        <WalletSvg />
        <BatterySvg />
        <HeartSvg />
        <CodeSvg />
      </div>
    </div>
  );
};

export default Welcome;
