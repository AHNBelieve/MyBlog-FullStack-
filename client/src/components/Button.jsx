import React from "react";

function Button({ text, onClickHandler, icon: Icon, className = "" }) {
  return (
    <div>
      <button
        onClick={onClickHandler}
        className={`cursor-pointer select-none px-4 py-2 rounded-md transition duration-300 flex items-center justify-center ${className}`}
      >
        {Icon && <Icon className="mr-2" />}
        {text}
      </button>
    </div>
  );
}

export default Button;
