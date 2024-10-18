import { LOGIN_USER } from "../_actions/types";

// const initialState = {
//   loginSuccess: false,
//   userId: null,
// };

export default function (state = initialState, action) {
  console.log(action);
  //여기가 지금 문제다. Promise를 다룰 수 있게 Redux Store를 바꿨음에도 불구하고
  //여기서 자꾸 pending상태의 Promise를 한번 썼다가 으엑 하고 뱉는다.
  //그래도 로그인은 잘 되지만 겁나 찝찝하다.
  switch (action.type) {
    case LOGIN_USER:
      // 요청이 시작될 때 상태 업데이트
      return { ...state, loading: true };
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.loginSuccess };
    default:
      return state;
  }
}
