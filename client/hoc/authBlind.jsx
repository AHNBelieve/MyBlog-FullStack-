import { useSelector } from "react-redux";

export default function authBlind(Component, option, writerCode = "") {
  return function AuthBlindComponent(props) {
    const user = useSelector((state) => state.user);
    let shouldRender = false;
    if (option === "ADMIN") {
      shouldRender = user.userData && user.userData.isAdmin;
      //해당 게시글 작성자만 보이도록
      if (writerCode) {
        shouldRender = shouldRender && writerCode === user.userData._id;
      }
    }
    if (option === "GUEST") {
      shouldRender = !user.userData;
    }
    if (option === "USER") {
      shouldRender = user.userData && user.userData.isAuth;
      //해당 유저에게만 보이는 처리.
      if (props.writerCode) {
        shouldRender = shouldRender && props.writerCode === user.userData._id;
      }
    }

    if (shouldRender) {
      return <Component {...props} />;
    }
    return null;
  };
}
