import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_actions";
import { useNavigate } from "react-router-dom";

export default function authWithDispatch(
  SpecificComponent,
  option,
  adminRoute = null
) {
  //option
  //null 아무나 출입 가능
  //true 로그인한 유저만 출입 가능
  //false 로그인한 유저는 출입 불가능

  function AuthenticationCheck(props) {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      dispatch(auth())
        .then((response) => {
          if (!response.value || !response.value.isAuth) {
            //로그인 하지 않은 상태
            if (option) {
              nav("/login");
            }
          } else {
            //로그인 한 상태
            if (adminRoute && !response.value.isAdmin) {
              nav("/");
              alert("You are NOT Admin.");
            } else {
              if (option === null) {
                //항상 누구든 들어갈 수 있는 곳!
              } else if (!option) {
                //로그인한 유저는 출입 불가능한 곳!
                //false 즉 회원가입, 로그인!
                nav("/");
              }
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }, [dispatch, nav]);

    if (loading) {
      return <div>Loading</div>;
    }
    return <SpecificComponent {...props}></SpecificComponent>;
  }
  return <AuthenticationCheck></AuthenticationCheck>;
}
