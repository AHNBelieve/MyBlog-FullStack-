const Viewer = ({ createdDate, title, content, writer }) => {
  //createdDate 활용 해야한다.
  return (
    <div>
      <div className="card">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{content}</p>
            <footer className="blockquote-footer">{writer}</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
