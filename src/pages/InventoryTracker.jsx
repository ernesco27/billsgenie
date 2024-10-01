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
import { inventoryTrackingGrid } from "../data/Grids";

const InventoryTracker = () => {
  const { gridColumns, stockItemList } = useStateContext();
  const toolbarOptions = ["Search", "Print"];

  const generateWarehouseColumns = (stockItems) => {
    const warehouseNames = new Set();
    stockItems.forEach((item) => {
      if (item.quantity) {
        item.quantity.forEach((q) => warehouseNames.add(q.warehouseName));
      }
    });

    return Array.from(warehouseNames).map((warehouse) => ({
      field: warehouse,
      headerText: warehouse,
      textAlign: "Left",
      width: "150",
    }));
  };

  const warehouseColumns = stockItemList
    ? generateWarehouseColumns(stockItemList)
    : [];

  // Transform stockItemList to include warehouse quantities as fields
  const transformedData = stockItemList?.map((item) => {
    const quantities = {};
    let totalQuantity = 0;
    console.log(item);

    item.quantity.forEach((q) => {
      quantities[q.warehouseName] = q.quantity;
      totalQuantity += q.quantity;
    });

    return {
      ...item,
      ...quantities,
      totalQuantity,
    };
  });

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
          //dataSource={data}
          dataSource={transformedData}
          allowPaging
          allowSorting
          //allowFiltering
          toolbar={toolbarOptions}
          //commandClick={handleCommandClick}
        >
          <ColumnsDirective>
            {inventoryTrackingGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
            {warehouseColumns.map((item, index) => (
              <ColumnDirective key={`warehouse-${index}`} {...item} />
            ))}
            <ColumnDirective
              field="totalQuantity"
              headerText="TOTAL QUANTITY"
              textAlign="Left"
              width="150"
            />
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
