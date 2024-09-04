import React, { useState, useRef } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { SiShopware } from "react-icons/si";
import { FaDownload } from "react-icons/fa6";
import { MdLocalPrintshop } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { Button } from "../components";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import ReactToPrint from "react-to-print";

import { useStateContext } from "../contexts/ContextProvider";

const InvoiceTemplate = ({ invoiceDetails, customFunc }) => {
  console.log(invoiceDetails);
  const [open, setOpen] = useState(true);

  const { setSelectedInvoice } = useStateContext();

  const invoiceRef = useRef();

  return (
    <Dialog open={open} onClose={() => setOpen(true)} className="relative z-10">
      <DialogBackdrop
        transition
        className=" fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10  overflow-y-auto flex justify-center w-11/12 ">
        <DialogPanel
          transition
          className="page flex flex-col justify-between p-8 w-9/12 min-h-screen  rounded-2xl relative transform overflow-scroll  bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in "
        >
          <div
            ref={invoiceRef}
            className="p-4 flex flex-col  min-h-screen print text-sm page"
          >
            <div>
              <div className="flex justify-between">
                <div className="gap-3 ml-3 mt-4 flex text-4xl font-extrabold tracking-tight dark:text-white text-slate-900">
                  <SiShopware />
                  <span>BillsGenie</span>
                </div>
                <div className="ml-3 mt-4 flex text-3xl font-extrabold tracking-tight dark:text-white text-slate-900">
                  {invoiceDetails.InvoiceNo && invoiceDetails.CustomerName
                    ? "SALES INVOICES"
                    : invoiceDetails.ReturnNo && invoiceDetails.CustomerName
                    ? "SALES RETURNS"
                    : invoiceDetails.InvoiceNo && invoiceDetails.SupplierName
                    ? "PURCHASES INVOICE"
                    : "PURCHASES RETURN"}
                </div>
              </div>
              <div className="mx-3 mt-16 flex justify-between">
                <div className="flex flex-col gap-4 ">
                  <p className="text-lg font-bold invoice-content">
                    {invoiceDetails.CustomerName ? " BILLED TO:" : "PAID TO:"}
                  </p>
                  <div className="flex flex-col gap-2 bg-gray-100 p-4 rounded-lg">
                    <div className="flex gap-4 invoice-content">
                      <p className="font-bold">
                        {invoiceDetails.CustomerName
                          ? "CUSTOMER NAME:"
                          : "SUPPLIER NAME:"}
                      </p>
                      <p>
                        {invoiceDetails.CustomerName ||
                          invoiceDetails.SupplierName}
                      </p>
                    </div>
                    <div className="flex gap-4 invoice-content">
                      <p className="font-bold">
                        {invoiceDetails.CustomerName
                          ? "CUSTOMER TIN:"
                          : "SUPPLIER TIN"}
                      </p>
                      <p>
                        {invoiceDetails.CustomerTIN ||
                          invoiceDetails.SupplierTIN}
                      </p>
                    </div>
                    <div className="flex gap-4 invoice-content">
                      <p className="font-bold">ADDRESS:</p>
                      <p>
                        {invoiceDetails.CustomerAddress ||
                          invoiceDetails.SupplierAddress}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between gap-4 ">
                    <p className="text-lg font-bold invoice-content">
                      {invoiceDetails.ReturnNo ? "RETURN NO:" : "INVOICE NO:"}
                    </p>
                    <p className="text-lg invoice-content">
                      {invoiceDetails.ReturnNo || invoiceDetails.InvoiceNo}
                    </p>
                  </div>
                  <div className="flex justify-between ">
                    <p className="text-lg font-bold invoice-content">DATE:</p>
                    <p className="text-lg invoice-content">
                      {invoiceDetails.ReturnDate || invoiceDetails.OrderDate}
                    </p>
                  </div>
                </div>
              </div>
              <div className=" mt-10 flex items-center gap-5">
                <p className="text-lg font-bold invoice-content">
                  PAYMENT MODE:
                </p>
                <p className="text-lg invoice-content">
                  {invoiceDetails.TranType}
                </p>
              </div>
            </div>
            <div className="page-break mt-10">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="">
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tl-lg rounded-bl-lg bg-green-300 header">
                      LINE
                    </th>
                    <th className="text-left py-2 px-4  w-1/4 text-sm font-semibold text-gray-700 uppercase tracking-wider  bg-green-300 header">
                      ITEM DESCRIPTION
                    </th>
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider  bg-green-300 header">
                      QUANTITY
                    </th>
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider  bg-green-300 header">
                      UNIT PRICE
                    </th>
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider  bg-green-300 header">
                      DISCOUNT
                    </th>
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider  bg-green-300 header">
                      AMOUNT TE
                    </th>
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider  bg-green-300 header">
                      VAT
                    </th>
                    <th className="py-2 px-4  text-left text-sm font-semibold text-gray-700 uppercase tracking-wider rounded-tr-lg rounded-br-lg bg-green-300 header">
                      AMOUNT TI
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceDetails.Items.map((detail, index) => (
                    <tr
                      className="hover:bg-gray-100 odd:bg-gray-50 even:bg-gray-100"
                      key={index}
                    >
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content ">
                        {detail.Line}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content ">
                        {detail.Item}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content">
                        {detail.Quantity}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content ">
                        {detail.Price}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content ">
                        {detail.Discount}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content">
                        {detail.AmountExVat}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content">
                        {detail.Tax}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm text-gray-600 invoice-content">
                        {detail.Amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="no-break flex justify-between mt-8">
                <div>
                  <p className="pb-2 invoice-content">Remarks:</p>
                  <div className="bg-gray-100 w-72 min-h-28 rounded-lg">
                    <p className="p-3">{invoiceDetails.Remarks}</p>
                  </div>
                </div>

                <div className="p-2">
                  <div className="flex justify-between invoice-content">
                    <p>SUB TOTAL:</p>
                    <p className="text-lg font-bold invoice-content">
                      {invoiceDetails.SubTotal}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="invoice-content">DISCOUNT:</p>
                    <p className="text-lg font-bold text-red-600 invoice-content">
                      {invoiceDetails.TotalDiscount}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="invoice-content">VAT:</p>
                    <p className="text-lg font-bold invoice-content">
                      {invoiceDetails.TotalTax}
                    </p>
                  </div>
                  <div className="flex justify-between gap-4">
                    <p className="text-lg invoice-content">AMOUNT PAYABLE:</p>
                    <p className="text-lg font-bold invoice-content">
                      {invoiceDetails.TotalAmount}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="no-break ">
              <div className="footer bg-green-300 w-full min-h-24 mt-20  rounded-lg flex flex-col items-center justify-center">
                <div className="bg-green-800 w-11/12 h-10 rounded-2xl flex items-center justify-between p-4 text-white  invoice-content">
                  <p>BillsGenie Enterprise</p>
                  <p>0242089437/0277465206</p>
                  <p>Address: CO 786,Tema - Mankoadze</p>
                  <p>TIN No: C0005984912</p>
                </div>
                <p className="mt-2 text-lg font-bold header">
                  THANK YOU FOR YOUR PATRONAGE!
                </p>
              </div>
            </div>
          </div>
        </DialogPanel>
        <div className="mt-2 ml-4 flex gap-3">
          {invoiceDetails && (
            <ReactToPrint
              trigger={() => (
                <div>
                  <TooltipComponent
                    position="BottomCenter"
                    content="Print Invoice"
                  >
                    <Button
                      icon={<MdLocalPrintshop />}
                      width="4rem"
                      height="2rem"
                      bgColor="#4ade80"
                    />
                  </TooltipComponent>
                </div>
              )}
              content={() => invoiceRef.current}
            />
          )}

          <div>
            <TooltipComponent position="BottomCenter" content="Close Invoice">
              <Button
                customFunc={() => {
                  setOpen(false);
                  setSelectedInvoice(null);
                }}
                icon={<MdCancel />}
                width="4rem"
                height="2rem"
                bgColor="#ef4444"
              />
            </TooltipComponent>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InvoiceTemplate;
