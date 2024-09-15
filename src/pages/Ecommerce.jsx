import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { RiCurrencyFill } from "react-icons/ri";
import { FaShoppingBasket } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

import { Link } from "react-router-dom";

import { Stacked, Pie, Button, SparkLine, MenuTile } from "../components";

import {
  earningData,
  SparklineAreaData,
  ecomPieChartData,
} from "../data/dummy";

import { useStateContext } from "../contexts/ContextProvider";

const Ecommerce = () => {
  const { currentColor } = useStateContext();

  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center gap-6 px-10">
        <Link to="">
          <MenuTile
            title="SALES"
            icon={<RiCurrencyFill />}
            customFunc={() => {}}
            height="24rem"
            width="24rem"
            iconSize="8rem"
            textSize="1.5rem"
            bgColor={currentColor}
          />
        </Link>
        <Link to="">
          <MenuTile
            title="PURCHASES"
            icon={<FaShoppingBasket />}
            customFunc={() => {}}
            height="24rem"
            width="24rem"
            iconSize="8rem"
            textSize="1.5rem"
            bgColor={currentColor}
          />
        </Link>
        <Link to="">
          <MenuTile
            title="STOCK MANAGEMENT"
            icon={<MdBorderColor />}
            customFunc={() => {}}
            height="24rem"
            width="24rem"
            iconSize="8rem"
            textSize="1.5rem"
            bgColor={currentColor}
          />
        </Link>
        <Link to="">
          <MenuTile
            title="REPORTS"
            icon={<IoBarChartSharp />}
            customFunc={() => {}}
            height="24rem"
            width="24rem"
            iconSize="8rem"
            textSize="1.5rem"
            bgColor={currentColor}
          />
        </Link>
        <Link to="/dashboard/admin">
          <MenuTile
            title="ADMIN"
            icon={<MdAdminPanelSettings />}
            customFunc={() => {}}
            height="24rem"
            width="24rem"
            iconSize="8rem"
            textSize="1.5rem"
            bgColor={currentColor}
          />
        </Link>
      </div>
    </div>
  );
};

export default Ecommerce;
