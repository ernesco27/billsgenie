import React from "react";

import { Table } from "antd";

const columns = [
  {
    title: "Module",
    dataIndex: "module",
    key: "module",
    render: (text) => <span style={{ fontSize: "20px" }}>{text}</span>,
    onHeaderCell: () => ({
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
      },
    }),
  },

  {
    title: "Admin",
    dataIndex: "admin",
    key: "admin",
    render: (text) => <span style={{ fontSize: "20px" }}>{text}</span>,
    onHeaderCell: () => ({
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
      },
    }),
  },
  {
    title: "Manager",
    dataIndex: "manager",
    key: "manager",
    render: (text) => <span style={{ fontSize: "20px" }}>{text}</span>,
    onHeaderCell: () => ({
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
      },
    }),
  },
  {
    title: "Employee",
    dataIndex: "employee",
    key: "employee",
    render: (text) => <span style={{ fontSize: "20px" }}>{text}</span>,
    onHeaderCell: () => ({
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
      },
    }),
  },
  {
    title: "Viewer",
    dataIndex: "viewer",
    key: "viewer",
    render: (text) => <span style={{ fontSize: "20px" }}>{text}</span>,
    onHeaderCell: () => ({
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        backgroundColor: "#f0f0f0",
      },
    }),
  },
];

const data = [
  {
    key: "1",
    module: "Manage Users",
    admin: "Full",
    manager: "None",
    employee: "None",
    viewer: "None",
  },
  {
    key: "2",
    module: "Manage Invoices",
    admin: "Full",
    manager: "Full",
    employee: "Partial",
    viewer: "View",
  },
  {
    key: "3",
    module: "Inventory",
    admin: "Full",
    manager: "Full",
    employee: "Partial",
    viewer: "View",
  },
  {
    key: "4",
    module: "Reporting",
    admin: "Full",
    manager: "Full",
    employee: "View",
    viewer: "View",
  },
  {
    key: "5",
    module: "Settings",
    admin: "Full",
    manager: "Partial",
    employee: "None",
    viewer: "None",
  },
];

const UserRole = () => {
  return (
    <div>
      {" "}
      <Table columns={columns} dataSource={data} size="large" />
    </div>
  );
};

export default UserRole;
