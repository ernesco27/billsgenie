import React, { useState } from "react";

import { FaUsersCog } from "react-icons/fa";
import { MdAssuredWorkload } from "react-icons/md";
import { GrMoney } from "react-icons/gr";
import { GrSystem } from "react-icons/gr";
import { MdDesignServices } from "react-icons/md";

import { Link, Outlet, useLocation } from "react-router-dom";

import { MenuTile } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Admin = () => {
  const { currentColor } = useStateContext();
  const [activeTile, setActiveTile] = useState("");

  const location = useLocation();

  const currentPath = location.pathname;

  // Function to check if the current path matches the tile
  const isActive = (path) => currentPath.includes(path);

  const isOutletRendered = location.pathname !== "/dashboard/admin";

  const tileSize = isOutletRendered ? "10rem" : "15rem";
  const iconSize = isOutletRendered ? "3rem" : "8rem";
  const textSize = isOutletRendered ? "1rem" : "1.5rem";

  const handleTileClick = (title) => {
    setActiveTile(title);
  };
  return (
    <div>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg flex gap-6 justify-center">
        <Link to="/dashboard/admin/company-settings">
          <MenuTile
            title="Company Settings"
            icon={<MdAssuredWorkload />}
            customFunc={() => {
              handleTileClick("company-settings");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={isActive("company-settings") ? currentColor : "#e2e8f0"}
          />
        </Link>
        <Link to="/dashboard/admin/user-management">
          <MenuTile
            title="User Management"
            icon={<FaUsersCog />}
            customFunc={() => {
              handleTileClick("user-management");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={isActive("user-management") ? currentColor : "#e2e8f0"}
          />
        </Link>
        <Link to="/dashboard/admin/financial-settings">
          <MenuTile
            title="Financial Settings"
            icon={<GrMoney />}
            customFunc={() => {
              handleTileClick("financial-settings");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={isActive("financial-settings") ? currentColor : "#e2e8f0"}
          />
        </Link>
        <Link to="/dashboard/admin/system-configuration">
          <MenuTile
            title="System Configuration"
            icon={<GrSystem />}
            customFunc={() => {
              handleTileClick("system-configuration");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={
              isActive("system-configuration") ? currentColor : "#e2e8f0"
            }
          />
        </Link>
        <Link to="/dashboard/admin/ui-customization">
          <MenuTile
            title="UI Customization"
            icon={<MdDesignServices />}
            customFunc={() => {
              handleTileClick("ui-customization");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={isActive("ui-customization") ? currentColor : "#e2e8f0"}
          />
        </Link>
      </div>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg gap-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Admin;
