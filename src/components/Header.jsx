import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const Header = ({ category, title, customFunc, btnTitle }) => {
  const { currentColor } = useStateContext();

  return (
    <div className="mb-10 flex justify-between">
      <div>
        <p className="text-gray-400">{category}</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          {title}
        </p>
      </div>
      <div>
        <button
          type="button"
          onClick={customFunc}
          className="h-14 w-44 rounded-lg text-center font-bold text-xl flex items-center p-1 hover:shadow-md"
          style={{ backgroundColor: currentColor }}
        >
          <span className="text-xl">
            <IoMdAddCircle />
          </span>
          <span> {btnTitle}</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
