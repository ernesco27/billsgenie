import React from "react";
import { Header } from "../components";
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

import { suppliersGrid } from "../data/Grids";

const SupplierManagement = () => {
  return (
    <div>
      <Header
        category="Warehouse"
        title="Supplier Management"
        //customFunc={newInvoice}
        btnTitle="Add Supplier"
      />
      <div className="mt-10">
        <GridComponent
          cssClass="custom-grid"
          id="gridcomp"
          //dataSource={data}
          allowPaging
          allowSorting
          //allowFiltering
          //toolbar={toolbarOptions}
          //commandClick={handleCommandClick}
        >
          <ColumnsDirective>
            {suppliersGrid.map((item, index) => (
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
    </div>
  );
};

export default SupplierManagement;
