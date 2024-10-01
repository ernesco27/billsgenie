import React from "react";
import { Tabs } from "antd";

import { TaxSection } from "../components/TaxSection";
import { CtConfigs } from "./CtConfigs";

const items = [
  {
    key: "1",
    label: "Add/Manage Tax Rate",
    children: <TaxSection />,
  },

  {
    key: "2",
    label: "Currency & Tax Configs",
    children: <CtConfigs />,
  },
];

const CurrencyTaxSettings = () => {
  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        items={items}
        tabPosition="left"
        //size="large"
        className="custom-tabs"
      />
    </div>
  );
};

export default CurrencyTaxSettings;
