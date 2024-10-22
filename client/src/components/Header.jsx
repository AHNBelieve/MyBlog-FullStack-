import "./Header.css";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const Header = () => {
  const nav = useNavigate();

  const LogoutHandler = () => {
    Axios.get("api/users/logout")
      .then((response) => {
        console.log(response);
        if (response.data.logoutSuccess) {
          alert("로그아웃 되었습니다.");
          nav("/login");
        } else {
          alert("Logout Failure");
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
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
      <div className="RightChild">
        <button
          onClick={() => {
            nav("/register");
          }}
        >
          회원가입
        </button>
        <button
          onClick={() => {
            nav("/login");
          }}
        >
          로그인
        </button>
        <button onClick={LogoutHandler}>로그아웃</button>
      </div>
    </div>
  );
};

export default Header;
