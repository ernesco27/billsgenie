import React, { useState, useEffect } from "react";
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

const DataGrid = ({ info, columns }) => {
  const toolbarOptions = ["Search", "Print"];

  const [data, setData] = useState(info);

  useEffect(() => {
    setData(info);
  }, [info]);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return new Date(`${year}/${month}/${day}`);
  };

  const handleDateRangeChange = (e) => {
    const [startDate, endDate] = e.value || [];
    if (startDate && endDate) {
      const start = new Date(startDate).setHours(0, 0, 0, 0);
      const end = new Date(endDate).setHours(23, 59, 59, 999);

      const filteredData = info.filter((item) => {
        const itemDate = parseDate(item.OrderDate).setHours(0, 0, 0, 0);
        return itemDate >= start && itemDate <= end;
      });

      setData(filteredData);
    } else {
      setData(info); // Reset to the original data if no date range is selected
    }
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <DateRangePickerComponent change={handleDateRangeChange} />
      <GridComponent
        cssClass="custom-grid"
        id="gridcomp"
        dataSource={data}
        allowPaging
        allowSorting
        //allowFiltering
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {columns.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject
          services={[
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
  );
};

export default DataGrid;
