import React, { useContext } from "react";
import { useStateContext } from "../contexts/ContextProvider";

const MenuTile = ({ title, icon, customFunc }) => {
  const { currentColor } = useStateContext();
  return (
    <button
      type="button"
      onClick={customFunc}
      className="flex flex-col items-center justify-center   h-96 w-96 rounded-lg hover:shadow-md "
      style={{ backgroundColor: currentColor }}
    >
      <div className="text-9xl text-gray-600 text-center mb-2">{icon}</div>
      <div className="text-2xl font-bold">{title}</div>
    </button>
  );
};

export default MenuTile;
