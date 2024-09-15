import React from "react";

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

import { warehouseGrid } from "../data/Grids";

const Warehouse = () => {
  const { createUser, setCreateUser, warehouseList } = useStateContext();
  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Company Settings"
        title="Warehouses"
        btnTitle="Add W/H"
        customFunc={() => setCreateUser(true)}
      />
      <GridComponent
        dataSource={warehouseList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
      >
        <ColumnsDirective>
          {warehouseGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createUser && <UserCreator />}
    </div>
  );
};

export { Warehouse };
