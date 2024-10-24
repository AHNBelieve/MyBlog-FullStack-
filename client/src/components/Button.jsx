import React from "react";

function Button({ text, onClickHandler }) {
  return (
    <div>
      <button onClick={onClickHandler} className="btn btn-secondary">
        {text}
      </button>
    </div>
  );
}

export default Button;
