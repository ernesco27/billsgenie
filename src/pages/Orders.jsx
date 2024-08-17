import React, { useState } from "react";
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
} from "@syncfusion/ej2-react-grids";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import { InvoiceCreator } from "../components";

import {
  ordersData,
  newOrderData,
  contextMenuItems,
  ordersGrid,
} from "../data/dummy";

import { Header } from "../components";
import { DataGrid } from "../components";

const Orders = () => {
  const [createInvoice, setCreateInvoice] = useState(true);
  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
      <Header category="Sales" title="Sales Invoices" />
      <DataGrid info={newOrderData} columns={ordersGrid} />
      {createInvoice && <InvoiceCreator />}
    </div>
  );
};

export default Orders;
