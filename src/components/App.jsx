import React from "react";

import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import style from "../styles/App.module.css";

function App() {
  return (
    <div>
      <div className={style.nav}>
        <NavBar />
      </div>
      <div className={style.content}>
        <Outlet />
      </div>
    </div>
  );
}

export { App };
