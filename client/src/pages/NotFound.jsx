import usePageTitle from "../components/hooks/usePageTitle";

const NotFound = () => {
  usePageTitle("잘못된 페이지인디요..?");
  return <div>잘못된 페이지입니다</div>;
};

export default NotFound;
