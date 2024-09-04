import React, { useRef } from "react";

import { Header, DataGrid, InvoiceTemplate } from "../components";
import { InvoiceCreator } from "../components";
import { useStateContext } from "../contexts/ContextProvider";

const SalesReturns = () => {
  const invoiceRef = useRef();

  const {
    createInvoice,
    setCreateInvoice,
    ordersGrid,

    handleViewSalesReturn,
    selectedInvoice,
    setSelectedInvoice,
    handleEditSalesReturn,
    selectedToEdit,
    setSelectedToEdit,
    handleDeleteSalesReturn,
    salesReturnsList,
    setSalesReturnsList,
    handleSaveSR,
    date,
    tranType,
    customer,
    itemList,
    totalAmount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
    returnsGrid,
    setPurchasesCreation,
  } = useStateContext();

  const newReturns = () => {
    setSelectedInvoice(null);
    setSelectedToEdit(null);
    setCreateInvoice(true);
    setPurchasesCreation(false);
  };

  return (
    <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl shadow-lg">
      <Header
        category="Sales"
        title="Sales Returns"
        btnTitle="New Return"
        customFunc={newReturns}
      />
      <DataGrid
        info={salesReturnsList}
        columns={returnsGrid}
        handleViewInvoice={handleViewSalesReturn}
        handleEditInvoice={handleEditSalesReturn}
        handleDeleteInvoice={handleDeleteSalesReturn}
      />

      {createInvoice && (
        <InvoiceCreator
          invoiceDetails={selectedToEdit}
          newTitle="Create Sales Return"
          editTitle="Edit Sales Return"
          previewTitle="RETURNS"
          customFunc={() =>
            handleSaveSR(
              date,
              tranType,
              customer,
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

export default SalesReturns;
