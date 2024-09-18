import React from "react";
import { Tabs } from "antd";

import { Customers } from "../components/Customers";
import { Suppliers } from "../components/Suppliers";

const items = [
  {
    key: "1",
    label: "Add/Manage Customers",
    children: <Customers />,
  },
  {
    key: "2",
    label: "Add/Manage Suppliers",
    children: <Suppliers />,
  },
  // {
  //   key: "3",
  //   label: "Tab 3",
  //   children: "Content of Tab Pane 3",
  // },
];

const BusinessPartnerSettings = () => {
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

export default BusinessPartnerSettings;
