const Viewer = ({ createdDate, title, content }) => {
  return (
    <div>
      <div className="card">
        <div className="card-header">{title}</div>
        <div className="card-body">
          <blockquote className="blockquote mb-0">
            <p>{content}</p>
            <footer className="blockquote-footer">{createdDate}</footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
