import React, { useState, useContext } from "react";

import { InvoiceCreator } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

import { Header } from "../components";
import { DataGrid } from "../components";

const Orders = () => {
  const { createInvoice, setCreateInvoice, ordersGrid, salesList } =
    useStateContext();

  const newInvoice = () => setCreateInvoice(true);

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
      <Header category="Sales" title="Sales Invoices" customFunc={newInvoice} />
      <DataGrid info={salesList} columns={ordersGrid} />
      {createInvoice && <InvoiceCreator />}
    </div>
  );
};

export default Orders;
