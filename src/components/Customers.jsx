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

import { Header, ClientCreator } from "../components";

import { customersGrid } from "../data/Grids";

const Customers = () => {
  const {
    createClient,
    setCreateClient,
    customerList,
    handleViewCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    selectedInvoice,
    selectedToEdit,
  } = useStateContext();

  const handleCommandClick = (args) => {
    const customerName = args.rowData.customerName;
    if (args.commandColumn.type === "View") {
      handleViewCustomer(customerName);
    } else if (args.commandColumn.type === "Edit") {
      handleEditCustomer(customerName);
    } else if (args.commandColumn.type === "Delete") {
      handleDeleteCustomer(customerName);
    }
  };

  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Company Settings"
        title="Customers"
        btnTitle="Add Customer"
        customFunc={() => setCreateClient(true)}
      />
      <GridComponent
        dataSource={customerList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        commandClick={handleCommandClick}
      >
        <ColumnsDirective>
          {customersGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createClient && <ClientCreator editDetails={selectedToEdit} />}
      {selectedInvoice && <ClientCreator customerDetails={selectedInvoice} />}
    </div>
  );
};

export { Customers };
