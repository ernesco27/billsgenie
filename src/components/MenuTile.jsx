import React, { useContext } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const MenuTile = ({
  title,
  icon,
  customFunc,
  height,
  width,
  iconSize,
  textSize,
  bgColor,
}) => {
  const { currentColor } = useStateContext();
  return (
    <button
      type="button"
      onClick={customFunc}
      className="flex flex-col items-center justify-center   rounded-lg hover:shadow-md "
      style={{ backgroundColor: bgColor, height, width }}
    >
      <div
        className=" text-gray-600 text-center mb-2"
        style={{ fontSize: iconSize }}
      >
        {icon}
      </div>
      <div className="font-bold" style={{ fontSize: textSize }}>
        {title}
      </div>
    </button>
  );
};

export default MenuTile;
