import React, { useState } from "react";
import { Segmented } from "antd";
import {
  UsergroupAddOutlined,
  UserAddOutlined,
  LoginOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import { UserRole, Users } from "../components";

const UserManagement = () => {
  const [selectedOption, setSelectedOption] = useState("user-roles");

  const options = [
    {
      label: "User Roles/Permission",
      value: "user-roles",
      icon: <UserAddOutlined />,
    },
    {
      label: "Add/Edit/Delete Users",
      value: "add-edit-delete-user",
      icon: <UsergroupAddOutlined />,
    },
    {
      label: "Password/Authentication Settings",
      value: "Password",
      icon: <LoginOutlined />,
    },
    {
      label: "User Activity Logs",
      value: "user-activity-log",
      icon: <BarsOutlined />,
    },
  ];

  return (
    <div>
      <Segmented
        size="large"
        options={options}
        onChange={(value) => setSelectedOption(value)}
        block
      />
      <div style={{ marginTop: "40px" }}>
        {selectedOption === "user-roles" && <UserRole />}
        {selectedOption === "add-edit-delete-user" && <Users />}
        {selectedOption === "Password" && (
          <div>Password/Authentication Settings Content</div>
        )}
        {selectedOption === "user-activity-log" && (
          <div>User Activity Logs Content</div>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
