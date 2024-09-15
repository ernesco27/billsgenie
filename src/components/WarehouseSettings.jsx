import React from "react";
import { Tabs } from "antd";

import { Warehouse } from "../components/Warehouse";

const items = [
  {
    key: "1",
    label: "Add/Manage Warehouses",
    children: <Warehouse />,
  },
  {
    key: "2",
    label: "Stock Management Configs",
    children: "Content of Tab Pane 2",
  },
  // {
  //   key: "3",
  //   label: "Tab 3",
  //   children: "Content of Tab Pane 3",
  // },
];

const WarehouseSettings = () => {
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

export default WarehouseSettings;
