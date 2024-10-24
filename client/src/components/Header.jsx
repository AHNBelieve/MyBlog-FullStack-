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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          onClick={() => {
            nav("/");
          }}
          className="btn btn-dark me-auto" // 왼쪽 정렬
        >
          안현준의 블로그
        </button>
        <div className="d-flex">
          <RegisterButton
            onClickHandler={() => {
              nav("/register");
            }}
            text={"회원가입"}
            className="btn btn-outline-primary me-3" // 버튼 간격 조정
          />
          <LoginButton
            onClickHandler={() => {
              nav("/login");
            }}
            text={"로그인"}
            className="btn btn-outline-primary me-3" // 버튼 간격 조정
          />
          <LogoutButton
            onClickHandler={LogoutHandler}
            text={"로그아웃"}
            className="btn btn-outline-danger" // 버튼 스타일
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
