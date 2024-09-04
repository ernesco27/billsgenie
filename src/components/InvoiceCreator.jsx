import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
//import Select from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { InputMultiline, UseInput } from "../components/MultiInput";
import { DropdownSelector } from "../components/MultiInput";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSave } from "react-icons/io";
import { IoTrashBinSharp } from "react-icons/io5";
import { SiShopware } from "react-icons/si";

import { InputNumber, Space, Select } from "antd";

import { NumberInputAdornments } from "./NumberInput";
import { AutoSelect } from "./AutoInput";
import { Button, ConfirmModal } from "../components";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Resize,
  CommandColumn,
  Edit,
  isEditable,
} from "@syncfusion/ej2-react-grids";
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

import { useStateContext } from "../contexts/ContextProvider";

const customers = ["Cash", "MaxMart", "Shoprite", "Melcom"];
const suppliers = ["Cash", "Izako", "Harimat", "G-cube"];

const items = [
  "Super Chocolate",
  "Eskimo Vanilla",
  "Momment Strawberry",
  "Delice Cone Caramel",
];

const vat = [
  { label: "3%", value: 0.003 },
  { label: "15%", value: 0.15 },
  { label: "21.9%", value: 0.219 },
];
const trxn = [
  { label: "Cash", value: "Cash" },
  { label: "Credit", value: "Credit" },
];

const discountList = [
  { label: "None", value: "None" },
  { label: "Selective", value: "Selective" },
  { label: "General", value: "General" },
];

const InvoiceCreator = ({
  invoiceDetails,
  newTitle,
  editTitle,
  customFunc,
}) => {
  const {
    setCreateInvoice,
    tin,
    setTin,
    product,
    setProduct,
    quantity,
    setQuantity,
    price,
    setPrice,
    tax,
    setTax,
    vatAmount,
    setVatAmount,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    discountAmount,
    setDiscountAmount,
    handleQtyChange,
    handleDisc,
    handlePriceInput,
    date,
    setDate,
    tranType,
    setTranType,
    customer,
    setCustomer,
    supplier,
    setSupplier,
    address,
    setAddress,
    amount,
    itemList,
    setItemList,
    handleAddItem,
    remarks,
    setRemarks,
    tranDate,
    setTranDate,
    subTotal,
    setSubTotal,
    totalAmount,
    setTotalAmount,
    totalTax,
    setTotalTax,
    totalDiscount,
    setTotalDiscount,
    generalDiscount,
    setGeneralDiscount,
    generalDiscAmount,
    handleSave,
    purchasesCreation,
    setPurchasesCreation,
  } = useStateContext();

  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);
  const [isCancelClicked, setIsCancelClicked] = useState(false);

  const editOptions = { allowEditing: true, allowDeleting: true };

  useEffect(() => {
    console.log("invoice details:", invoiceDetails);
    if (invoiceDetails && invoiceDetails.CustomerName) {
      //setDate(invoiceDetails.OrderDate);
      setTranType(invoiceDetails.TranType);
      setCustomer(invoiceDetails.CustomerName);
      //setAddress(invoiceDetails.address);
      setItemList(invoiceDetails.Items);
      // Set other fields as needed
    } else if (invoiceDetails && invoiceDetails.SupplierName) {
      setTranType(invoiceDetails.TranType);
      setSupplier(invoiceDetails.SupplierName);
      setItemList(invoiceDetails.Items);
    }
  }, [invoiceDetails]);

  const itemsGrid = [
    {
      field: "Line",
      headerText: "LINE",
      width: "80",
      textAlign: "Center",
      isPrimaryKey: true,
    },
    {
      field: "Item",
      headerText: "ITEM",
      width: "250",
      textAlign: "Center",
    },
    {
      field: "Quantity",
      headerText: "QUANTITY",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Price",
      headerText: "PRICE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Discount",
      headerText: "DISCOUNT",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Tax",
      headerText: "TAX",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Amount",
      headerText: "AMOUNT",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Action",
      headerText: "ACTION",
      width: "150",
      textAlign: "Center",

      commands: [
        {
          type: "Edit",
          buttonOption: {
            cssClass: "e-flat",
            iconCss: "e-edit e-icons",
          },
        },
        {
          type: "Delete",
          buttonOption: {
            cssClass: "e-flat",
            iconCss: "e-delete e-icons",
          },
        },
      ],
    },
  ];

  useEffect(() => {
    !quantity || !product || !price
      ? setIsAddBtnDisabled(true)
      : setIsAddBtnDisabled(false);
  }, [quantity, product, price]);

  useEffect(() => {
    itemList.length !== 0
      ? setIsSaveBtnDisabled(false)
      : setIsSaveBtnDisabled(true);
  }, [itemList]);

  const addItem = () => {
    let updatedList;

    // Remove commas from price string before parsing
    const sanitizedPrice = parseFloat(price).toFixed(2);
    const sanitizedTax = parseFloat(vatAmount).toFixed(2);
    const sanitizedDiscount = parseFloat(discountAmount).toFixed(2);
    const sanitizedAmount = parseFloat(amount).toFixed(2);
    const finalAmount = parseFloat(amount - discountAmount + vatAmount).toFixed(
      2,
    );

    if (editingItemIndex !== null) {
      // Editing an existing item
      updatedList = [...itemList];
      updatedList[editingItemIndex] = {
        Line: editingItemIndex + 1, // Ensure line number is retained correctly
        Item: product,
        Quantity: quantity,
        Price: sanitizedPrice,
        AmountExVat: sanitizedAmount,
        Discount: sanitizedDiscount,
        Tax: sanitizedTax,
        Amount: finalAmount,
      };

      setItemList(updatedList);
      setEditingItemIndex(null); // Reset editing index after updating
    } else {
      // Adding a new item
      const newItem = {
        Line: itemList.length + 1, // Line number as the last index + 1
        Item: product,
        Quantity: quantity,
        Price: sanitizedPrice,
        AmountExVat: sanitizedAmount,
        Discount: sanitizedDiscount,
        Tax: sanitizedTax,
        Amount: finalAmount,
      };

      setItemList([...itemList, newItem]);
    }

    // Reset the input fields
    setProduct("");
    setQuantity("");
    setPrice("");
    setTax("");
    setDiscountType("None");
    setDiscountValue("");
    setDiscountAmount(0);
    setVatAmount(0);
  };

  const handleEditItem = (args) => {
    const itemData = args.rowData;

    setEditingItemIndex(itemData.Line - 1); // Assuming 'Line' represents the item's index
    setProduct(itemData.Item);
    setQuantity(itemData.Quantity);
    setPrice(itemData.Price);
    setTax("");
    setDiscountAmount(itemData.Discount);
    setVatAmount(itemData.Tax);
  };

  const handleDeleteItem = (args) => {
    console.log("handleDeleteItem args:", args);
    let updatedList = [...itemList];

    // Check if data is available in args
    if (args.data && args.data.length > 0) {
      // Assuming args.data contains the deleted row(s)
      const deletedItem = args.data[0]; // Get the first item from data array
      updatedList = itemList.filter((item) => item.Item !== deletedItem.Item);
      setItemList(updatedList);
    } else {
      console.error("No data available in args.");
    }
  };

  const cancelInvoice = () => {
    setCreateInvoice(false);
    setIsCancelClicked(false);
    setPurchasesCreation(false);
    // Reset the input fields
    setCustomer("");
    setProduct("");
    setQuantity("");
    setPrice("");
    setTax("");
    setDiscountType("None");
    setDiscountValue("");
    setDiscountAmount(0);
    setVatAmount(0);
    setItemList([]);
  };

  const returnToInvoice = () => {
    setIsCancelClicked(false);
  };

  return (
    <div className=" bg-off-white w-11/12 min-h-screen absolute top-8 right-16 rounded-2xl">
      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl m-4">
          {invoiceDetails ? editTitle : newTitle}
        </p>
        <div className="flex gap-4 mr-6">
          <Button
            bgColor={isSaveBtnDisabled ? "#9ca3af" : "#34d399"}
            text={invoiceDetails ? "Update" : "Save"}
            icon={<IoIosSave />}
            customFunc={customFunc}
            width="7rem"
            height="3rem"
            disabled={isSaveBtnDisabled}
          />

          <Button
            bgColor="#dc2626"
            text="Cancel"
            icon={<IoMdCloseCircle />}
            customFunc={() => {
              setIsCancelClicked(true);
            }}
            width="6.5rem"
            height="3rem"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex w-3/5  bg-light-gray shadow-lg  p-8 rounded-2xl">
          <form action="">
            <div className="mb-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Trxn Date"
                    value={date}
                    onChange={(newValue) => setDate(newValue)}
                    sx={{
                      borderRadius: "0.5rem",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      border: "1px solid #e5e7eb",
                      "&:active": {
                        outline: "4px solid transparent",
                        outlineOffset: "2px",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="flex flex-col mb-8">
              <label htmlFor="">Trxn Type</label>
              <Select
                style={{ height: 40, width: 120 }}
                value={tranType}
                options={trxn}
                onChange={(value) => setTranType(value)}
              />
            </div>
            {purchasesCreation ? (
              <div>
                <div className="mb-5">
                  <Autocomplete
                    disablePortal
                    value={supplier}
                    onChange={(e, newValue) => setSupplier(newValue)}
                    id="suppliers"
                    options={suppliers}
                    //sx={{ width: 600 }}
                    sx={{
                      width: 600,
                      borderRadius: "0.5rem",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      border: "1px solid #e5e7eb",
                      "&:active": {
                        outline: "4px solid transparent",
                        outlineOffset: "2px",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Supplier" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                </div>
                <div className="mb-8">
                  <div className="flex justify-between gap-4">
                    <span>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Supplier Details"
                        multiline
                        maxRows={4}
                        //sx={{ width: 300 }}
                        sx={{
                          width: 300,
                          borderRadius: "0.5rem",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          border: "1px solid #e5e7eb",
                          "&:active": {
                            outline: "4px solid transparent",
                            outlineOffset: "2px",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                          },
                        }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        value={tin}
                        onChange={(e) => setTin(e.target.value)}
                        id="tin"
                        label="TIN Number"
                        sx={{
                          borderRadius: "0.5rem",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          border: "1px solid #e5e7eb",
                          "&:active": {
                            outline: "4px solid transparent",
                            outlineOffset: "2px",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                          },
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-5">
                  <Autocomplete
                    disablePortal
                    value={customer}
                    onChange={(e, newValue) => setCustomer(newValue)}
                    id="customers"
                    options={customers}
                    //sx={{ width: 600 }}
                    sx={{
                      width: 600,
                      borderRadius: "0.5rem",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      border: "1px solid #e5e7eb",
                      "&:active": {
                        outline: "4px solid transparent",
                        outlineOffset: "2px",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Customer" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                </div>
                <div className="mb-8">
                  <div className="flex justify-between gap-4">
                    <span>
                      <TextField
                        id="outlined-multiline-flexible"
                        label="Customer Details"
                        multiline
                        maxRows={4}
                        //sx={{ width: 300 }}
                        sx={{
                          width: 300,
                          borderRadius: "0.5rem",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          border: "1px solid #e5e7eb",
                          "&:active": {
                            outline: "4px solid transparent",
                            outlineOffset: "2px",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                          },
                        }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </span>
                    <span>
                      <TextField
                        value={tin}
                        onChange={(e) => setTin(e.target.value)}
                        id="tin"
                        label="TIN Number"
                        sx={{
                          borderRadius: "0.5rem",
                          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                          border: "1px solid #e5e7eb",
                          "&:active": {
                            outline: "4px solid transparent",
                            outlineOffset: "2px",
                          },
                          "&:focus": {
                            outline: "none",
                            boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                          },
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            )}

            <Divider>
              <Chip label="Item Detail" size="large" />
            </Divider>
            {(customer || supplier) && (
              <div>
                <div className="mb-5 mt-5">
                  <Autocomplete
                    disablePortal
                    value={product}
                    onChange={(e, newValue) => setProduct(newValue)}
                    id="product"
                    options={items}
                    sx={{
                      width: 600,
                      borderRadius: "0.5rem",
                      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      border: "1px solid #e5e7eb",
                      "&:active": {
                        outline: "4px solid transparent",
                        outlineOffset: "2px",
                      },
                      "&:focus": {
                        outline: "none",
                        boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)",
                      },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Product" />
                    )}
                    isOptionEqualToValue={(option, value) =>
                      option === value || value === ""
                    }
                  />
                </div>
                <div className="flex justify-between ">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="quantity">Quantity</label>
                    <InputNumber
                      value={quantity}
                      style={{ height: 40, width: 120 }}
                      min={1}
                      onChange={(value) => setQuantity(value)}
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label htmlFor="price">Price</label>

                    <InputNumber
                      style={{ height: 40, width: 120 }}
                      prefix="GHC"
                      min={0.01}
                      formatter={(value) =>
                        `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value.replace(/[^0-9.]/g, "")}
                      value={price}
                      onChange={handlePriceInput}
                    />
                  </div>
                  <div className="flex flex-col mb-8">
                    <label htmlFor="">Tax</label>
                    <Select
                      value={tax}
                      style={{ width: 120, height: 40 }}
                      options={vat}
                      onChange={(value) => setTax(value)}
                    />
                  </div>
                  <div className="flex flex-col mb-8">
                    <label htmlFor="">Discount</label>
                    <Select
                      style={{ height: 40, width: 120 }}
                      options={discountList}
                      onChange={(value) => setDiscountType(value)}
                      value={discountType}
                    />
                  </div>
                </div>
                {discountType === "Selective" ? (
                  <div className="flex flex-col gap-1 -mt-6 mb-6">
                    <label htmlFor="price">Discount (%)</label>

                    <InputNumber
                      style={{ height: 40, width: 120 }}
                      min={0}
                      value={discountValue}
                      onChange={(value) => setDiscountValue(value)}
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="flex justify-between mt-2">
                  <div>
                    {editingItemIndex !== null ? (
                      <Button
                        bgColor={isAddBtnDisabled ? "#9ca3af" : "#34d399"}
                        text="Update Item"
                        icon={<IoMdAddCircle />}
                        customFunc={addItem}
                        width="11rem"
                        height="3rem"
                        disabled={isAddBtnDisabled}
                      />
                    ) : (
                      <Button
                        bgColor={isAddBtnDisabled ? "#9ca3af" : "#34d399"}
                        text="Add Item"
                        icon={<IoMdAddCircle />}
                        customFunc={addItem}
                        width="11rem"
                        height="3rem"
                        disabled={isAddBtnDisabled}
                      />
                    )}
                  </div>
                  <div className="w-2/5 h-32 bg-white rounded-lg shadow-sm flex-col">
                    <div className="flex justify-between p-1">
                      <p>Amount Ex-VAT:</p>
                      <p className="font-semibold"> {amount.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between p-1">
                      <p>Discount:</p>
                      <p className="font-semibold text-red-600">
                        {parseFloat(discountAmount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between p-1">
                      <p>VAT:</p>
                      <p className="font-semibold">
                        {parseFloat(vatAmount).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between p-1">
                      <p className="text-xl"> Line Total:</p>
                      <p className="font-semibold text-xl">
                        {parseFloat(
                          amount - discountAmount + vatAmount,
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Add Remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  multiline
                  maxRows={4}
                  sx={{
                    width: 300,
                    marginTop: 4,
                    //padding: "1rem", // p-4

                    borderRadius: "0.5rem", // rounded-lg
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)", // shadow-sm
                    border: "1px solid #e5e7eb", // border border-gray-200
                    "&:active": {
                      outline: "4px solid transparent", // active:outline and active:outline-4
                      outlineOffset: "2px", // outline-offset-2
                    },
                    "&:focus": {
                      outline: "none", // focus:outline-none
                      boxShadow: "0 0 0 3px rgba(147, 197, 253, 0.5)", // focus:ring focus:ring-blue-300
                    },
                  }}
                />
              </div>
            )}
          </form>
        </div>
        <div className="flex flex-col w-full  bg-light-gray shadow-lg p-8 rounded-2xl">
          <div className="flex justify-between items-center p-3 bg-gray-200 rounded-md">
            <div className="text-5xl font-bold">
              <div className="items-center gap-3 ml-3 mt-4 flex text-4xl font-extrabold tracking-tight dark:text-white text-slate-900">
                <SiShopware />
                <span>BillsGenie</span>
              </div>
            </div>
            <div>
              <p className="text-4xl font-bold">INVOICE</p>
              <div className="flex items-center gap-5">
                <p className="text-lg">Issued On:</p>
                <p>{date.format("DD-MM-YYYY")}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center  mt-10 mb-5">
            <p className="text-xl font-bold">Customer Name:</p>
            <span className="text-xl pl-4">{customer}</span>
          </div>

          <div>
            <GridComponent
              cssClass="custom-grid"
              id="gridcomp"
              dataSource={itemList}
              editSettings={editOptions}
              enableStickyHeader
              height={400}
              actionComplete={(args) => {
                if (args.requestType === "beginEdit") {
                  handleEditItem(args);
                }
                if (args.requestType === "delete") {
                  handleDeleteItem(args);
                }
              }}
            >
              <ColumnsDirective>
                {itemsGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>

              <Inject services={[Edit, CommandColumn]} />
            </GridComponent>{" "}
          </div>
          <div className="flex justify-between">
            <div className="w-2/5 h-20 bg-white rounded-lg shadow-sm flex-col mt-4 overflow-hidden">
              <p className="mt-2 p-2 text-wrap">{remarks}</p>
            </div>
            <div className="w-2/5 h-48 bg-white rounded-lg shadow-sm flex flex-col gap-3 mt-4 ">
              <div className="flex justify-between">
                <p className="font-medium pl-5 mt-3">SUB TOTAL:</p>
                <p className="text-lg font-bold pr-6">{subTotal}</p>
              </div>

              <div className="flex items-center gap-4 justify-between pr-6">
                <div className="flex items-center gap-3">
                  <p className="font-medium pl-5">DISCOUNT:</p>
                  {discountType === "General" ? (
                    <div className="">
                      <InputNumber
                        style={{ height: 40, width: 80 }}
                        min={0}
                        value={generalDiscount}
                        onChange={(value) => setGeneralDiscount(value)}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <p className="text-lg font-bold text-red-600 ">
                  {generalDiscAmount}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium pl-5">VAT:</p>
                <p className="text-lg font-bold pr-6">{totalTax}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-xl font-bold pl-5">AMOUNT PAYABLE:</p>
                <p className="text-lg font-bold pr-6">{totalAmount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isCancelClicked && (
        <ConfirmModal
          title="Invoice Cancellation"
          info="Invoice creation will be cancelled. Are you sure?"
          action1="Yes. Cancel"
          action2="Return"
          customFunc1={cancelInvoice}
          customFunc2={returnToInvoice}
        />
      )}
    </div>
  );
};

export default InvoiceCreator;
