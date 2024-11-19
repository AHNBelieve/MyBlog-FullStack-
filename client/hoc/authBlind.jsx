import { useSelector } from "react-redux";

export default function authBlind(Component, option, writerCode = "") {
  return function AuthBlindComponent(props) {
    const user = useSelector((state) => state.user);
    let shouldRender = false;
    if (option === "ADMIN") {
      shouldRender = user.userData && user.userData.isAdmin;
      if (writerCode) {
        shouldRender = shouldRender && writerCode === user.userData._id;
      }
    }
    if (option === "GUEST") {
      shouldRender = !user.userData;
    }
    if (option === "USER") {
      shouldRender = user.userData && user.userData.isAuth;
    }

    if (shouldRender) {
      return <Component {...props} />;
    }
    return null;
  };
}
