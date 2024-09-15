import React, { useState } from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Search,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";

import { useStateContext } from "../contexts/ContextProvider";

import { Header, UserCreator } from "../components";

import { usersGrid } from "../data/Grids";

const Users = () => {
  const { createUser, setCreateUser, userList } = useStateContext();
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="User Management"
        title="Users"
        btnTitle="Add User"
        customFunc={() => setCreateUser(true)}
      />
      <GridComponent
        dataSource={userList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
      >
        <ColumnsDirective>
          {usersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createUser && <UserCreator />}
    </div>
  );
};

export default Users;
