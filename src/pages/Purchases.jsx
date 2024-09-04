import React, { useRef } from "react";

import { InvoiceCreator } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

import { Header, DataGrid, InvoiceTemplate } from "../components";

const Purchases = () => {
  const invoiceRef = useRef();

  const {
    createInvoice,
    setCreateInvoice,
    purchasesGrid,
    purchasesList,
    handleViewInvoice,
    selectedInvoice,
    setSelectedInvoice,
    handleEditInvoice,
    selectedToEdit,
    setSelectedToEdit,
    handleDeleteInvoice,
    handleSavePurchases,
    date,
    tranType,
    supplier,
    itemList,
    totalAmount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
    setPurchasesCreation,
  } = useStateContext();

  const newInvoice = () => {
    setSelectedInvoice(null);
    setSelectedToEdit(null);
    setCreateInvoice(true);
    setPurchasesCreation(true);
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
      <Header
        category="Purchases"
        title="Purchases Invoices"
        customFunc={newInvoice}
        btnTitle="Create Invoice"
      />
      <DataGrid
        info={purchasesList}
        columns={purchasesGrid}
        handleViewInvoice={handleViewInvoice}
        handleEditInvoice={handleEditInvoice}
        handleDeleteInvoice={handleDeleteInvoice}
      />
      {createInvoice && (
        <InvoiceCreator
          invoiceDetails={selectedToEdit}
          newTitle="Create Invoice"
          editTitle="Edit Invoice"
          previewTitle="INVOICE"
          customFunc={() =>
            handleSavePurchases(
              date,
              tranType,
              supplier,
              itemList,
              totalAmount,
              generalDiscAmount,
              totalTax,
              subTotal,
              remarks,
            )
          }
        />
      )}
      {selectedInvoice && (
        <div ref={invoiceRef}>
          <InvoiceTemplate invoiceDetails={selectedInvoice} />
        </div>
      )}
    </div>
  );
};

export default Purchases;
