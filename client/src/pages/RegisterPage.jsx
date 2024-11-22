import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_actions";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../components/hooks/usePageTitle";

function RegisterPage(props) {
  const nav = useNavigate();
  const dispatch = useDispatch();
  usePageTitle("회원가입");

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassWord, setConfirmPassword] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (Password !== ConfirmPassWord) {
      return alert("Password is not the same as the ConfirmPassword");
    }
    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.value.success) {
        nav("/");
        alert("계정이 성공적으로 만들어졌습니다!");
      } else {
        console.log(response.value);
        if (response.value.err.code === 11000) {
          if (Object.keys(response.value.err.keyValue)[0] === "email")
            alert("같은 메일로 아이디를 만들 수 없습니다.");
          else if (Object.keys(response.value.err.keyValue)[0] === "name")
            alert("이미 존재하는 이름입니다.");
        } else {
          alert("잘못된 형식입니다.");
        }
      }
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
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
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
              Name
            </label>
            <input
              type="text"
              value={Name}
              onChange={(e) => {
                setName(e.currentTarget.value);
              }}
              className="form-control"
              id="exampleInputName"
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

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              value={ConfirmPassWord}
              onChange={(e) => {
                setConfirmPassword(e.currentTarget.value);
              }}
              className="form-control"
              id="exampleInputPassword1"
            ></input>
          </div>
          <br />
          <button className="btn btn-success" type="Submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
