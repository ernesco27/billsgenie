import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { GoDotFill } from "react-icons/go";
import { RiCurrencyFill } from "react-icons/ri";
import { FaShoppingBasket } from "react-icons/fa";
import { MdBorderColor } from "react-icons/md";
import { IoBarChartSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

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
        <MenuTile
          title="SALES"
          icon={<RiCurrencyFill />}
          customFunc={() => {}}
        />
        <MenuTile
          title="PURCHASES"
          icon={<FaShoppingBasket />}
          customFunc={() => {}}
        />
        <MenuTile
          title="STOCK MANAGEMENT"
          icon={<MdBorderColor />}
          customFunc={() => {}}
        />
        <MenuTile
          title="REPORTS"
          icon={<IoBarChartSharp />}
          customFunc={() => {}}
        />
        <MenuTile
          title="ADMIN"
          icon={<MdAdminPanelSettings />}
          customFunc={() => {}}
        />
      </div>
    </div>
  );
};

export default Ecommerce;
