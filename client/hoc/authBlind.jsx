import React from "react";
import { useSelector } from "react-redux";

//아직 미완성

export default function authBlind(Component, option) {
  return function AuthBlindComponent(props) {
    const user = useSelector((state) => state.user);
    console.log(user);
    // 기본적으로 컴포넌트를 숨깁니다.
    let shouldRender = false;

    // 관리자인 경우
    if (option === "ADMIN") {
      shouldRender = user.userData && user.userData.isAdmin;
    }

    // 로그인한 유저만 접근 가능한 경우
    if (option === "LOGIN") {
      shouldRender = user.loginSuccess && user.loginSuccess.isAuth;
    }

    // 조건을 만족하는 경우에만 컴포넌트를 렌더링
    if (shouldRender) {
      return <Component {...props} />;
    }

    // 조건을 만족하지 않으면 아무것도 렌더링하지 않음
    return null;
  };
}
