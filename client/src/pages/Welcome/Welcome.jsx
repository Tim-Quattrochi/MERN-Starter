import "./welcome.css";
import { useNavigate } from "react-router-dom";
import {
  BatterySvg,
  BagSvg,
  WalletSvg,
  HeartSvg,
  CodeSvg,
  Line1,
  Line2,
  Line3,
  BLline,
  RightTopLine,
  RightMiddleLine,
  RightBottomLine,
} from "../../assets/index";

const Welcome = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <>
      <div className="rt-line">
        <RightTopLine />
        <RightMiddleLine />
      </div>
      <div className="line-container">
        <Line1 />
        <span className="line2">
          <Line2 />
          <Line3 />
        </span>
      </div>

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
      <div className="bl-line">
        <BLline />
        <RightBottomLine />
      </div>
    </>
  );
};

export default Welcome;
