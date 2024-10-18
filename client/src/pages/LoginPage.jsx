import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  //Redux활용!
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        nav("/");
      } else {
        alert("ERROR");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          value={Email}
          onChange={(e) => {
            setEmail(e.currentTarget.value);
          }}
        ></input>
        <label>Password</label>
        <input
          type="password"
          value={Password}
          onChange={(e) => {
            setPassword(e.currentTarget.value);
          }}
        ></input>
        <br />
        <button type="Submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
