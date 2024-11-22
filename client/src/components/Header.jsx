import "./Header.css";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../_actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";
import { setSearchQuery } from "../../_actions/config_action";
import { useState } from "react";

const Header = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const user = useSelector((state) => state.user);
  //Button Blind for each rule
  const RegisterButton = authBlind(Button, "GUEST");
  const LoginButton = authBlind(Button, "GUEST");
  const LogoutButton = authBlind(Button, "USER");

  //Handler
  //SearchHandler
  const changeHandler = (e) => {
    setInputValue(e.target.value);
  };
  //SubmitHandler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setSearchQuery(inputValue));
    nav("/");
  };
  //LogoutHandler
  const LogoutHandler = () => {
    dispatch(logoutUser()).then((response) => {
      if (response) {
        nav("/login");
      }
    });
  };
  return (
    <nav
      className="navbar bg-dark border-bottom border-body"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <a
          className="navbar-brand"
          onClick={() => {
            setInputValue("");
            dispatch(setSearchQuery(""));
            nav("/");
          }}
          style={{ color: "white" }}
        >
          MyBlog
        </a>
        <form onSubmit={submitHandler} className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={inputValue}
            onChange={changeHandler}
          />
          <button className="btn btn-outline-success" type="submit">
            Search
          </button>
        </form>
        <div className="d-flex">
          {user.userData ? (
            <h6
              className="navbar-brand"
              style={{ color: "white" }}
            >{`${user.userData.name}`}</h6>
          ) : null}
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
