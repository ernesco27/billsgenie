import React, { useState } from "react";
import { SiBookmeter } from "react-icons/si";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { PiArrowsLeftRightBold } from "react-icons/pi";
import { FaWarehouse } from "react-icons/fa";
import { FaPeopleArrows } from "react-icons/fa";

import { Link, Outlet, useLocation } from "react-router-dom";

import { MenuTile } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const Warehouse = () => {
  const { currentColor } = useStateContext();
  const [activeTile, setActiveTile] = useState("");

  const location = useLocation();

  const isOutletRendered = location.pathname !== "/dashboard/stock-management";

  const tileSize = isOutletRendered ? "10rem" : "15rem";
  const iconSize = isOutletRendered ? "3rem" : "8rem";
  const textSize = isOutletRendered ? "1rem" : "1.5rem";

  const handleTileClick = (title) => {
    setActiveTile(title);
  };
  return (
    <div>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg flex gap-6 justify-center">
        <Link to="/dashboard/stock-management/track-inventory">
          <MenuTile
            title="Track Inventory"
            icon={<SiBookmeter />}
            customFunc={() => {
              handleTileClick("track-inventory");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={
              activeTile === "track-inventory" ? currentColor : "#e2e8f0"
            }
          />
        </Link>
        <Link to="/dashboard/stock-management/stock-movement">
          <MenuTile
            title="Stock Movement"
            icon={<PiArrowsLeftRightBold />}
            customFunc={() => {
              handleTileClick("stock-movement");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={activeTile === "stock-movement" ? currentColor : "#e2e8f0"}
          />
        </Link>
        <Link to="/dashboard/stock-management/product-management">
          <MenuTile
            title="Product Management"
            icon={<MdOutlineProductionQuantityLimits />}
            customFunc={() => {
              handleTileClick("product-management");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={
              activeTile === "product-management" ? currentColor : "#e2e8f0"
            }
          />
        </Link>
        <Link to="/dashboard/stock-management/warehouse-management">
          <MenuTile
            title="Warehouse Management"
            icon={<FaWarehouse />}
            customFunc={() => {
              handleTileClick("warehouse-management");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={
              activeTile === "warehouse-management" ? currentColor : "#e2e8f0"
            }
          />
        </Link>
        <Link to="/dashboard/stock-management/supplier-management">
          <MenuTile
            title="Supplier Management"
            icon={<FaPeopleArrows />}
            customFunc={() => {
              handleTileClick("supplier-management");
            }}
            height={tileSize}
            width={tileSize}
            iconSize={iconSize}
            textSize={textSize}
            bgColor={
              activeTile === "supplier-management" ? currentColor : "#e2e8f0"
            }
          />
        </Link>
      </div>
      <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg gap-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Warehouse;
