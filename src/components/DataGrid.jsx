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

// import {
//   ordersData,
//   newOrderData,
//   contextMenuItems,
//   ordersGrid,
// } from "../data/dummy";

//import { Header } from "../components";

const DataGrid = ({ info, columns }) => {
  const toolbarOptions = ["Search", "Print"];

  const [data, setData] = useState(info);

  const handleDateRangeChange = (e) => {
    const [startDate, endDate] = e.value;
    if (startDate && endDate) {
      const filteredData = newOrderData.filter((item) => {
        const itemDate = new Date(item.OrderDate);
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);

        return itemDate >= start && itemDate <= end;
      });

      setData(filteredData);
    } else {
      setData(newOrderData);
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <DateRangePickerComponent change={handleDateRangeChange} />
      <GridComponent
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        allowFiltering
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {columns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
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
  );
};

export default DataGrid;
