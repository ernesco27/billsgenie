import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { IoMdAddCircle } from "react-icons/io";
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosSave } from "react-icons/io";

import { SiShopware } from "react-icons/si";

import { InputNumber, Select } from "antd";

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
//import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";

import { useStateContext } from "../contexts/ContextProvider";

const items = [
  "Super Chocolate",
  "Eskimo Vanilla",
  "Momment Strawberry",
  "Delice Cone Caramel",
];

const StockTransfer = ({
  transferDetails,
  newTitle,
  editTitle,
  customFunc,
}) => {
  const {
    setCreateStockTransfer,

    product,
    setProduct,
    quantity,
    setQuantity,
    date,
    setDate,

    customer,
    setCustomer,

    itemList,
    setItemList,
    stockList,
    setStockList,
    //handleAddItem,
    remarks,
    setRemarks,
    warehouses,
    setWarehouses,
    fromWarehouse,
    setFromWarehouse,
    toWarehouse,
    setToWarehouse,
    stockTransferList,
    setStockTransferList,

    //handleSave,
  } = useStateContext();

  const [editingItemIndex, setEditingItemIndex] = useState(null);
  const [isAddBtnDisabled, setIsAddBtnDisabled] = useState(true);
  const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true);
  const [isCancelClicked, setIsCancelClicked] = useState(false);

  const editOptions = { allowEditing: true, allowDeleting: true };

  useEffect(() => {
    console.log("transfer details:", transferDetails);
    if (transferDetails) {
      setFromWarehouse(transferDetails.FromWarehouse);
      setToWarehouse(transferDetails.ToWarehouse);
      setStockList(transferDetails.Items);
    }
  }, [transferDetails]);

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
    !quantity || !product
      ? setIsAddBtnDisabled(true)
      : setIsAddBtnDisabled(false);
  }, [quantity, product]);

  useEffect(() => {
    stockList.length !== 0
      ? setIsSaveBtnDisabled(false)
      : setIsSaveBtnDisabled(true);
  }, [stockList]);

  const addItem = () => {
    let updatedList;

    if (editingItemIndex !== null) {
      // Editing an existing item
      updatedList = [...stockList];
      updatedList[editingItemIndex] = {
        Line: editingItemIndex + 1, // Ensure line number is retained correctly
        Item: product,
        Quantity: quantity,
      };

      setStockList(updatedList);
      setEditingItemIndex(null); // Reset editing index after updating
    } else {
      // Adding a new item
      const newItem = {
        Line: stockList.length + 1, // Line number as the last index + 1
        Item: product,
        Quantity: quantity,
      };

      setStockList([...stockList, newItem]);
    }

    // Reset the input fields
    setProduct("");
    setQuantity("");
  };

  const handleEditItem = (args) => {
    const itemData = args.rowData;

    setEditingItemIndex(itemData.Line - 1); // Assuming 'Line' represents the item's index
    setProduct(itemData.Item);
    setQuantity(itemData.Quantity);
  };

  const handleDeleteItem = (args) => {
    let updatedList = [...stockList];

    // Check if data is available in args
    if (args.data && args.data.length > 0) {
      // Assuming args.data contains the deleted row(s)
      const deletedItem = args.data[0]; // Get the first item from data array
      updatedList = stockList.filter((item) => item.Item !== deletedItem.Item);
      setStockList(updatedList);
    } else {
      console.error("No data available in args.");
    }
  };

  const cancelInvoice = () => {
    setCreateStockTransfer(false);
    setIsCancelClicked(false);
    //setPurchasesCreation(false);
    // Reset the input fields
    setCustomer("");
    setProduct("");
    setQuantity("");

    setStockList([]);
  };

  const returnToInvoice = () => {
    setIsCancelClicked(false);
  };

  return (
    <div className=" bg-off-white w-11/12 min-h-screen absolute top-8 right-16 rounded-2xl">
      <div className="flex justify-between items-center">
        <p className="font-bold text-4xl m-4">
          {transferDetails ? editTitle : newTitle}
        </p>
        <div className="flex gap-4 mr-6">
          <Button
            bgColor={isSaveBtnDisabled ? "#9ca3af" : "#34d399"}
            text={transferDetails ? "Update" : "Save"}
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

            <div>
              <div className="mb-5">
                <Autocomplete
                  disablePortal
                  value={fromWarehouse}
                  onChange={(e, newValue) => setFromWarehouse(newValue)}
                  id="location"
                  options={warehouses}
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
                    <TextField {...params} label="Select From" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option === value || value === ""
                  }
                />
              </div>
              <div className="mb-5">
                <Autocomplete
                  disablePortal
                  value={toWarehouse}
                  onChange={(e, newValue) => setToWarehouse(newValue)}
                  id="location"
                  options={warehouses}
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
                    <TextField {...params} label="Select To" />
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option === value || value === ""
                  }
                />
              </div>
            </div>

            <Divider>
              <Chip label="Item Detail" size="large" />
            </Divider>
            {fromWarehouse && toWarehouse && (
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
                </div>

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
              <p className="text-4xl font-bold">STOCK TRANSFER</p>
              <div className="flex items-center gap-5">
                <p className="text-lg">Issued On:</p>
                <p>{date.format("DD-MM-YYYY")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  mt-10 mb-5">
            <div>
              <p className="text-xl font-bold">From:</p>
              <span className="text-xl pl-4">{fromWarehouse}</span>
            </div>
            <div>
              <p className="text-xl font-bold">To:</p>
              <span className="text-xl pl-4">{toWarehouse}</span>
            </div>
          </div>

          <div>
            <GridComponent
              cssClass="custom-grid"
              id="gridcomp"
              dataSource={stockList}
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

export default StockTransfer;
