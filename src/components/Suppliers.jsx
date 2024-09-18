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

import { Header, SupplierCreator } from "../components";

import { suppliersGrid } from "../data/Grids";

const Suppliers = () => {
  const {
    // createClient,
    // setCreateClient,
    supplierList,
    handleViewSupplier,
    handleEditSupplier,
    handleDeleteSupplier,
    selectedSupplier,
    selectedToEdit,
    createSupplier,
    setCreateSupplier,
  } = useStateContext();

  const handleCommandClick = (args) => {
    const supplierName = args.rowData.supplierName;
    if (args.commandColumn.type === "View") {
      handleViewSupplier(supplierName);
    } else if (args.commandColumn.type === "Edit") {
      handleEditSupplier(supplierName);
    } else if (args.commandColumn.type === "Delete") {
      handleDeleteSupplier(supplierName);
    }
  };

  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Company Settings"
        title="Suppliers"
        btnTitle="Add Supplier"
        customFunc={() => setCreateSupplier(true)}
      />
      <GridComponent
        dataSource={supplierList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        commandClick={handleCommandClick}
      >
        <ColumnsDirective>
          {suppliersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createSupplier && <SupplierCreator editDetails={selectedToEdit} />}
      {selectedSupplier && (
        <SupplierCreator supplierDetails={selectedSupplier} />
      )}
    </div>
  );
};

export { Suppliers };
