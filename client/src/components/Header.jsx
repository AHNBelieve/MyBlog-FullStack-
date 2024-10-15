import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const nav = useNavigate();
  return (
    <div className="Header">
      <div className="LeftChild">
        <button
          onClick={() => {
            nav("/");
          }}
        >
          안현준의 블로그
        </button>
      </div>
    </div>
  );
};

export default Header;
