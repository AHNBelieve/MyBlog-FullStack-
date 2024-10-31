import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_actions";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../components/hooks/usePageTitle";

function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  usePageTitle("로그인");

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //Redux활용!
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body))
      .then((response) => {
        // if (response.value && response.value.loginSuccess) {
        if (response.value) {
          console.log(response);
          nav("/");
        } else {
          alert("ERROR");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Password
            </label>
            <input
              type="password"
              value={Password}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <br />
          <button type="Submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
