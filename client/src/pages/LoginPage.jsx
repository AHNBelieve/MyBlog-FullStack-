import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../_actions/user_actions";
import { useNavigate } from "react-router-dom";
import usePageTitle from "../components/hooks/usePageTitle";
import Button from "../components/Button";

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
    <div className="min-h-[calc(100vh-4rem)] bg-gray-30 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign in to your account
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
          </div>

          <div>
            <Button
              type="submit"
              text="Sign In"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
