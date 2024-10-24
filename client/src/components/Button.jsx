import React from "react";

function Button({ text, onClickHandler }) {
  return (
    <div>
      <button onClick={onClickHandler}>{text}</button>
    </div>
  );
}

export default Button;
