import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_actions";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../components/hooks/usePageTitle";
import Button from "../components/Button";

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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign up for an account
        </h2>
        <form className="mt-8 space-y-6" onSubmit={onSubmitHandler}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={Email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="name"
                autoComplete="name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Name"
                value={Name}
                onChange={(e) => {
                  setName(e.currentTarget.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm password"
                value={ConfirmPassWord}
                onChange={(e) => {
                  setConfirmPassword(e.currentTarget.value);
                }}
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              text="Sign Up"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
