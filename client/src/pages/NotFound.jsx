import usePageTitle from "../components/hooks/usePageTitle";
import Loading from "../components/Loading";

const NotFound = () => {
  usePageTitle("잘못된 페이지인디요..?");
  return <Loading></Loading>;
};

export default NotFound;
