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

import { Header, WarehouseCreator } from "../components";

import { warehouseGrid } from "../data/Grids";

const Warehouse = () => {
  const {
    createWarehouse,
    setCreateWarehouse,
    warehouseList,
    handleDeleteWarehouse,
    handleEditWarehouse,
    selectedToEdit,
  } = useStateContext();

  const handleCommandClick = (args) => {
    const warehouseName = args.rowData.warehouseName;
    if (args.commandColumn.type === "Edit") {
      handleEditWarehouse(warehouseName);
    } else if (args.commandColumn.type === "Delete") {
      handleDeleteWarehouse(warehouseName);
    }
  };

  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Company Settings"
        title="Warehouses"
        btnTitle="Add W/H"
        customFunc={() => setCreateWarehouse(true)}
      />
      <GridComponent
        dataSource={warehouseList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        commandClick={handleCommandClick}
      >
        <ColumnsDirective>
          {warehouseGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createWarehouse && <WarehouseCreator editDetails={selectedToEdit} />}
    </div>
  );
};

export { Warehouse };
