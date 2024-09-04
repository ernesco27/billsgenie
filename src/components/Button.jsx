import React from "react";

const Button = ({
  disabled,
  bgColor,
  text,
  icon,
  customFunc,
  width,
  height,
}) => {
  return (
    <div>
      <button
        disabled={disabled}
        type="button"
        onClick={customFunc}
        className=" rounded-lg text-center font-bold text-xl flex items-center justify-center gap-2 p-1 hover:shadow-md"
        style={{ backgroundColor: bgColor, width, height }}
      >
        <span className="text-xl">{icon}</span>
        <span> {text}</span>
      </button>
    </div>
  );
};

export default Button;
