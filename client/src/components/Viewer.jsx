const Viewer = ({ createdDate, title, content }) => {
  return (
    <div>
      <div className="title">
        <h1>{title}</h1>
      </div>
      <h5>{createdDate}</h5>
      <div className="content">
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Viewer;
