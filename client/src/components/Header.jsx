import "./Header.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../_actions/user_actions";
import { useDispatch } from "react-redux";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const RegisterButton = authBlind(Button, "GUEST");
  const LoginButton = authBlind(Button, "GUEST");
  const LogoutButton = authBlind(Button, "USER");

  const LogoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response) {
        nav("/login");
      }
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
        <RegisterButton
          onClickHandler={() => {
            nav("/register");
          }}
          text={"회원가입"}
        />

        <LoginButton
          onClickHandler={() => {
            nav("/login");
          }}
          text={"로그인"}
        />
        <LogoutButton onClickHandler={LogoutHandler} text={"로그아웃"} />
      </div>
    </div>
  );
};

export default Header;
