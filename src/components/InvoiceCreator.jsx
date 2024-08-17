import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
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

import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSave } from "react-icons/io";

import { CustomNumberInput } from "./NumberInput";
import { AutoSelect } from "./AutoInput";
import { Button } from "../components";

import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Resize,
} from "@syncfusion/ej2-react-grids";

import {
  ordersData,
  newOrderData,
  contextMenuItems,
  ordersGrid,
} from "../data/dummy";

import { DataGrid } from "../components";

const customers = ["Cash", "MaxMart", "Shoprite", "Melcom"];
const items = [
  "Super Chocolate",
  "Eskimo Vanilla",
  "Momment Strawberry",
  "Delice Cone Caramel",
];

const vat = [
  { label: "3%", value: 1.003 },
  { label: "15%", value: 1.15 },
  { label: "21.9%", value: 1.219 },
];
const trxn = [
  { label: "Cash", value: 1 },
  { label: "Credit", value: 2 },
];

const itemsGrid = [
  {
    field: "Line",
    headerText: "LINE",
    width: "80",
    textAlign: "Center",
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
  },
];
const itemList = [
  {
    Line: 1,
    Item: "Sadia Full Griller",
    Quantity: 10,
    Price: 560.0,
    Amount: 5600,
    Action: "pending",
  },
  {
    Line: 2,
    Item: "Sadia Chicken Sausage",
    Quantity: 20,
    Price: 350.0,
    Amount: 7000,
    Action: "pending",
  },
  {
    Line: 3,
    Item: "1Omm Coated Fries",
    Quantity: 5,
    Price: 200.0,
    Amount: 1000.0,
    Action: "pending",
  },
  {
    Line: 4,
    Item: "Brazil Chicked Leg Qtr",
    Quantity: 8,
    Price: 355.0,
    Amount: 2840.0,
    Action: "pending",
  },
  {
    Line: 5,
    Item: "Frozen Chicken Wings (Perdix)",
    Quantity: 12,
    Price: 455.0,
    Amount: 5460.0,
    Action: "pending",
  },
];

const InvoiceCreator = () => {
  return (
    <div className=" bg-off-white w-11/12 min-h-screen absolute top-8 right-16 rounded-2xl">
      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl m-4">Create Invoice</p>
        <div className="flex gap-4 mr-6">
          <Button
            bgColor="#34d399"
            text="Save"
            icon={<IoIosSave />}
            customFunc={() => {}}
            width="6rem"
            height="3rem"
          />
          <Button
            bgColor="#dc2626"
            text="Cancel"
            icon={<IoMdCloseCircle />}
            customFunc={() => {}}
            width="6.5rem"
            height="3rem"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex w-3/5 h-screen bg-light-gray shadow-lg  p-8 rounded-2xl">
          <form action="">
            <div className="mb-4">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Trxn Date" />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="flex flex-col mb-8">
              <label>Trxn Type</label>
              <DropdownSelector options={trxn} />
            </div>
            <div className="mb-5">
              <label>Customer</label>
              <AutoSelect options={customers} />
            </div>
            <div className="mb-8">
              <label>Details</label>
              <div className="flex justify-between gap-4">
                <span>
                  <InputMultiline placeholder="Address" />
                </span>
                <span>
                  <UseInput />
                </span>
              </div>
            </div>

            <Divider>
              <Chip label="Item Detail" size="large" />
            </Divider>
            <div className="mb-5 mt-5">
              <label>Select Item</label>
              <AutoSelect options={items} />
            </div>
            <div className="flex justify-between items-center">
              <CustomNumberInput
                min={0}
                aria-label="Demo number input"
                placeholder="Quantity"
              />
              <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel htmlFor="outlined-adornment-amount">
                  Amount
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">GHC</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <div className="flex flex-col mb-8">
                <label>Tax %</label>
                <DropdownSelector options={vat} />
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <Button
                  bgColor="#34d399"
                  text="Add Item"
                  icon={<IoMdAddCircle />}
                  customFunc={() => {}}
                  width="11rem"
                  height="3rem"
                />
              </div>
              <div className="w-2/5 h-20 bg-white rounded-lg shadow-sm flex-col">
                <p>Amount Ex-Vat:</p>
                <p>Amount Incl-Vat:</p>
                <p>Line Total:</p>
              </div>
            </div>
            <InputMultiline placeholder="Remarks" />
          </form>
        </div>
        <div className="flex flex-col w-full h-screen bg-light-gray shadow-lg p-8 rounded-2xl">
          <div className="flex justify-between items-center p-3 bg-gray-200 rounded-md">
            <div className="text-5xl font-bold">LOGO HERE</div>
            <div>
              <p className="text-4xl font-bold">INVOICE</p>
              <p className="text-lg mt-2">Issued On:</p>
            </div>
          </div>
          <p className="text-xl font-bold mt-10">Customer Name:</p>
          <div>
            <GridComponent
              id="gridcomp"
              dataSource={itemList}
              //allowPaging
              // allowSorting
              //allowFiltering
              //toolbar={toolbarOptions}
              enableStickyHeader
              height={400}
            >
              <ColumnsDirective>
                {itemsGrid.map((item, index) => (
                  <ColumnDirective key={index} {...item} />
                ))}
              </ColumnsDirective>

              <Inject
                services={[
                  Resize,
                  // Sort,
                  //ContextMenu,
                  //Filter,
                  // Page,
                  //ExcelExport,
                  // PdfExport,
                  // Edit,
                  // Toolbar,
                ]}
              />
            </GridComponent>
          </div>
          <div className="flex justify-between">
            <div className="w-2/5 h-20 bg-white rounded-lg shadow-sm flex-col mt-4 overflow-hidden">
              <p className="mt-2 p-2 text-wrap">Remarks</p>
            </div>
            <div className="w-2/5 h-48 bg-white rounded-lg shadow-sm flex flex-col gap-3 mt-4 ">
              <p className="font-medium pl-5 mt-3">SUB TOTAL:</p>
              <p className="font-medium pl-5">DISCOUNT:</p>
              <p className="font-medium pl-5">VAT:</p>
              <p className="text-xl font-bold pl-5">AMOUNT PAYABLE:</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreator;
