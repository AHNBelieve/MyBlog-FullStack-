import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";
import { useNavigate } from "react-router-dom";

export default function (SpecificComponent, option, adminRoute = null) {
  //option값 설명
  //null 아무나 출입 가능
  //true 로그인한 유저만 출입 가능
  //false 로그인한 유저는 출입 불가능

  function AuthenticationCheck(props) {
    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(auth()).then((response) => {
        if (!response.value || !response.value.isAuth) {
          //로그인 하지 않은 상태
          if (option) {
            nav("/login");
            return;
          }
        } else {
          //로그인 한 상태
          if (adminRoute && !response.value.isAdmin) {
            nav("/");
            alert("관리자 전용임 ㅋㅋ");
            return;
          } else {
            if (option === null) {
              return;
            }
            if (!option) {
              nav("/");
              return;
            }
          }
        }
      });
    }, []);

    return <SpecificComponent></SpecificComponent>;
  }

  return <AuthenticationCheck></AuthenticationCheck>;
}
