import React, { useRef } from "react";

import { Header, DataGrid, InvoiceTemplate } from "../components";
import { InvoiceCreator } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const PurchasesReturns = () => {
  const invoiceRef = useRef();

  const {
    createInvoice,
    setCreateInvoice,
    ordersGrid,

    handleViewPurchasesReturn,
    selectedInvoice,
    setSelectedInvoice,
    handleEditPurchasesReturn,
    selectedToEdit,
    setSelectedToEdit,
    handleDeletePurchasesReturn,
    purchasesReturnsList,
    setSalesReturnsList,
    handleSavePR,
    date,
    tranType,
    supplier,
    itemList,
    totalAmount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
    purchasesReturnsGrid,
    purchasesCreation,
    setPurchasesCreation,
  } = useStateContext();

  const newReturns = () => {
    setSelectedInvoice(null);
    setSelectedToEdit(null);
    setCreateInvoice(true);
    setPurchasesCreation(true);
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
      <Header
        category="Purchases"
        title="Purchases Returns"
        btnTitle="New Return"
        customFunc={newReturns}
      />
      <DataGrid
        info={purchasesReturnsList}
        columns={purchasesReturnsGrid}
        handleViewInvoice={handleViewPurchasesReturn}
        handleEditInvoice={handleEditPurchasesReturn}
        handleDeleteInvoice={handleDeletePurchasesReturn}
      />

      {createInvoice && (
        <InvoiceCreator
          invoiceDetails={selectedToEdit}
          newTitle="Create Purchases Return"
          editTitle="Edit Purchases Return"
          previewTitle="RETURNS"
          customFunc={() =>
            handleSavePR(
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

export default PurchasesReturns;
