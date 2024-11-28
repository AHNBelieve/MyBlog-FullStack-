import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../_actions/user_actions";
import { useDispatch, useSelector } from "react-redux";
import authBlind from "../../hoc/authBlind";
import Button from "./Button";
import { setSearchQuery } from "../../_actions/config_action";
import { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";

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
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div
          className="text-2xl font-bold text-gray-800 cursor-pointer select-none"
          onClick={() => {
            setInputValue("");
            dispatch(setSearchQuery(""));
            nav("/");
          }}
        >
          MyBlog
        </div>
        <form onSubmit={submitHandler} className="flex-1 mx-4" role="search">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={changeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <Button
              text=""
              icon={FaSearch}
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            />
          </div>
        </form>
        <div className="flex items-center space-x-6">
          {user.userData ? (
            <div className="flex items-center space-x-2">
              <FaUser className="text-gray-600" />
              <span className="text-gray-800">{user.userData.name}</span>
            </div>
          ) : null}
          <LoginButton
            onClickHandler={() => {
              nav("/login");
            }}
            text={"LOGIN"}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
          <RegisterButton
            onClickHandler={() => {
              nav("/register");
            }}
            text={"REGISTER"}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />

          <LogoutButton
            onClickHandler={LogoutHandler}
            text={"LOGOUT"}
            className="bg-blue-500 text-white hover:bg-blue-600"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
