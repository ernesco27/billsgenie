import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Search,
  Toolbar,
} from "@syncfusion/ej2-react-grids";

import { employeesData, contextMenuItems, employeesGrid } from "../data/dummy";
import { usersGrid } from "../data/Grids";

import { Header } from "../components";

const Employees = () => {
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="User Management" title="Users" btnTitle="Add User" />
      <GridComponent
        //dataSource={employeesData}
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
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default Employees;
