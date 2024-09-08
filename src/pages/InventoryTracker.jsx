import React from "react";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";

import { useStateContext } from "../contexts/ContextProvider";

//import { Header, DataGrid } from "../components";

const InventoryTracker = () => {
  const { gridColumns } = useStateContext();
  const toolbarOptions = ["Search", "Print"];

  const data = [
    {
      No: 1,
      ProductName: "Eskimo Vanilla",
      Warehouse_0: 25,
      Warehouse_1: 35,
      Warehouse_2: 45,
      TotalQuantity: 105,
    },
    {
      No: 2,
      ProductName: "Mommnent Dessert Strawberry",
      Warehouse_0: 20,
      Warehouse_1: 30,
      Warehouse_2: 40,
      TotalQuantity: 90,
    },
    {
      No: 3,
      ProductName: "Super Chocolate",
      Warehouse_0: 10,
      Warehouse_1: 30,
      Warehouse_2: 70,
      TotalQuantity: 100,
    },
  ];

  return (
    <div>
      <div>
        <p className="text-gray-400">Warehouse</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Inventory Levels
        </p>
      </div>
      <div className="mt-10">
        <GridComponent
          cssClass="custom-grid"
          id="gridcomp"
          dataSource={data}
          allowPaging
          allowSorting
          //allowFiltering
          toolbar={toolbarOptions}
          //commandClick={handleCommandClick}
        >
          <ColumnsDirective>
            {gridColumns.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              CommandColumn,
              //Resize,
              Sort,
              //ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Edit,
              Toolbar,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
};

export default InventoryTracker;
