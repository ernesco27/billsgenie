import react, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { CompassOutlined } from "@ant-design/icons";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

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
const trxn = ["Cash", "Credit"];

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
    field: "Discount",
    headerText: "DISCOUNT",
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

const discountList = ["None", "Selective", "General"];

const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [openCard, setOpenCard] = useState(false);

  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentMode, setCurrentMode] = useState("Light");
  const [currentColor, setCurrentColor] = useState("#03C9D7");

  const [userRole, setUserRole] = useState("admin");

  const [themeSettings, setThemeSettings] = useState(false);
  const [createInvoice, setCreateInvoice] = useState(false);

  const [date, setDate] = useState(dayjs());
  const [tranType, setTranType] = useState("Cash");
  const [customer, setCustomer] = useState("");
  const [supplier, setSupplier] = useState("");
  const [address, setAddress] = useState("");
  const [tin, setTin] = useState("");
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState("");
  const [tax, setTax] = useState("");
  const [vatAmount, setVatAmount] = useState(0);
  const [discountType, setDiscountType] = useState("None");
  const [discountValue, setDiscountValue] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [generalDiscount, setGeneralDiscount] = useState(0);
  const [generalDiscAmount, setGeneralDiscAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [remarks, setRemarks] = useState("");

  const [subTotal, setSubTotal] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const [itemList, setItemList] = useState([]);
  const [salesList, setSalesList] = useState([]);
  const [salesReturnsList, setSalesReturnsList] = useState([]);
  const [purchasesList, setPurchasesList] = useState([]);
  const [purchasesReturnsList, setPurchasesReturnsList] = useState([]);

  const [purchasesCreation, setPurchasesCreation] = useState(false);

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedToEdit, setSelectedToEdit] = useState(null);

  const [editingIndex, setEditingIndex] = useState(null);

  const handleViewPurchases = (invoiceNo) => {
    const invoice = purchasesList.find(
      (purchase) => purchase.InvoiceNo === invoiceNo,
    );
    if (invoice) {
      setSelectedInvoice(invoice);
    }
  };

  const handleViewPurchasesReturn = (returnNo) => {
    const returned = purchasesReturnsList.find(
      (returns) => returns.ReturnNo === returnNo,
    );
    if (returned) {
      setSelectedInvoice(returned);
    }
  };

  const handleViewInvoice = (invoiceNo) => {
    const invoice = salesList.find((sale) => sale.InvoiceNo === invoiceNo);
    if (invoice) {
      setSelectedInvoice(invoice);
    }
  };

  const handleViewSalesReturn = (returnNo) => {
    const returned = salesReturnsList.find(
      (returns) => returns.ReturnNo === returnNo,
    );
    if (returned) {
      setSelectedInvoice(returned);
    }
  };

  const handleEditPurchases = (invoiceNo) => {
    const invoiceToEdit = purchasesList.find(
      (invoice) => invoice.InvoiceNo === invoiceNo,
    );

    setSelectedToEdit(invoiceToEdit);
    setCreateInvoice(true);
  };

  const handleEditPurchasesReturn = (returnNo) => {
    const purchasesReturnToEdit = purchasesReturnsList.find(
      (returned) => returned.ReturnNo === returnNo,
    );

    setSelectedToEdit(purchasesReturnToEdit);
    setCreateInvoice(true);
  };

  const handleEditInvoice = (invoiceNo) => {
    const invoiceToEdit = salesList.find(
      (invoice) => invoice.InvoiceNo === invoiceNo,
    );

    setSelectedToEdit(invoiceToEdit);
    setCreateInvoice(true);
  };

  const handleEditSalesReturn = (returnNo) => {
    const salesReturnToEdit = salesReturnsList.find(
      (returned) => returned.ReturnNo === returnNo,
    );

    setSelectedToEdit(salesReturnToEdit);
    setCreateInvoice(true);
  };

  const handleDeletePurchases = (invoiceNo) => {
    const updatedList = purchasesList.filter(
      (invoice) => invoice.InvoiceNo !== invoiceNo,
    );

    setPurchasesList(updatedList);
  };

  const handleDeletePurchasesReturn = (returnNo) => {
    const updatedList = purchasesReturnsList.filter(
      (returned) => returned.ReturnNo !== returnNo,
    );

    setPurchasesReturnsList(updatedList);
  };

  const handleDeleteInvoice = (invoiceNo) => {
    const updatedList = salesList.filter(
      (invoice) => invoice.InvoiceNo !== invoiceNo,
    );

    setSalesList(updatedList);
  };

  const handleDeleteSalesReturn = (returnNo) => {
    const updatedList = salesReturnsList.filter(
      (returned) => returned.ReturnNo !== returnNo,
    );

    setSalesReturnsList(updatedList);
  };

  const handleSaveSR = (
    date,
    trantype,
    customer,
    items,
    amount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedSalesReturnsList = salesReturnsList.map((returns) =>
        returns.ReturnNo === selectedToEdit.ReturnNo
          ? {
              ...returns,
              ReturnDate: date.format("DD/MM/YYYY"),
              TranType: trantype,
              CustomerName: customer,
              Items: items,
              TotalAmount: amount,
              SubTotal: subTotal,
              TotalDiscount: generalDiscAmount,
              TotalTax: totalTax,
              Remarks: remarks,
            }
          : returns,
      );

      setSalesReturnsList(updatedSalesReturnsList);
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new invoice
      const sectionInitials = "SR";
      const currentYear = new Date().getFullYear();

      const lastReturnNo = salesReturnsList.length
        ? salesReturnsList[0].ReturnNo
        : `${sectionInitials}${currentYear}00`;

      const lastReturnNumber = parseInt(lastReturnNo.slice(-2), 10);
      const nextReturnNumber = (lastReturnNumber + 1)
        .toString()
        .padStart(2, "0");

      const newReturnNo = `${sectionInitials}${currentYear}${nextReturnNumber}`;

      const newSalesReturn = {
        Id: salesReturnsList.length
          ? Math.max(...salesReturnsList.map((item, index) => index)) + 2
          : 1,
        ReturnDate: date.format("DD/MM/YYYY"),
        ReturnNo: newReturnNo,
        TranType: trantype,
        CustomerName: customer,
        Items: items,
        TotalAmount: amount,
        SubTotal: subTotal,
        TotalDiscount: generalDiscAmount,
        TotalTax: totalTax,
        Remarks: remarks,
      };

      console.log("new returns:", newSalesReturn);

      setSalesReturnsList([newSalesReturn, ...salesReturnsList]);
    }

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
    setCreateInvoice(false); // Close the invoice creation modal
  };

  const handleSave = (
    date,
    trantype,
    customer,
    items,
    amount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedSalesList = salesList.map((sale) =>
        sale.InvoiceNo === selectedToEdit.InvoiceNo
          ? {
              ...sale,
              OrderDate: date.format("DD/MM/YYYY"),
              TranType: trantype,
              CustomerName: customer,
              Items: items,
              TotalAmount: amount,
              SubTotal: subTotal,
              TotalDiscount: generalDiscAmount,
              TotalTax: totalTax,
              Remarks: remarks,
            }
          : sale,
      );

      setSalesList(updatedSalesList);
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new invoice
      const sectionInitials = "SI"; // Replace with your company initials
      const currentYear = new Date().getFullYear();

      const lastInvoiceNo = salesList.length
        ? salesList[0].InvoiceNo
        : `${sectionInitials}${currentYear}00`;

      const lastInvoiceNumber = parseInt(lastInvoiceNo.slice(-2), 10);
      const nextInvoiceNumber = (lastInvoiceNumber + 1)
        .toString()
        .padStart(2, "0");

      const newInvoiceNo = `${sectionInitials}${currentYear}${nextInvoiceNumber}`;

      const newSale = {
        Id: salesList.length
          ? Math.max(...salesList.map((item, index) => index)) + 2
          : 1,
        OrderDate: date.format("DD/MM/YYYY"),
        InvoiceNo: newInvoiceNo,
        TranType: trantype,
        CustomerName: customer,
        Items: items,
        TotalAmount: amount,
        SubTotal: subTotal,
        TotalDiscount: generalDiscAmount,
        TotalTax: totalTax,
        Remarks: remarks,
      };

      setSalesList([newSale, ...salesList]);
    }

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
    setCreateInvoice(false); // Close the invoice creation modal
  };

  const handleSavePurchases = (
    date,
    trantype,
    supplier,
    items,
    amount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedPurchasesList = purchasesList.map((purchase) =>
        purchase.InvoiceNo === selectedToEdit.InvoiceNo
          ? {
              ...purchase,
              OrderDate: date.format("DD/MM/YYYY"),
              TranType: trantype,
              SupplierName: supplier,
              Items: items,
              TotalAmount: amount,
              SubTotal: subTotal,
              TotalDiscount: generalDiscAmount,
              TotalTax: totalTax,
              Remarks: remarks,
            }
          : purchase,
      );

      setPurchasesList(updatedPurchasesList);
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new invoice
      const sectionInitials = "PI";
      const currentYear = new Date().getFullYear();

      const lastInvoiceNo = purchasesList.length
        ? purchasesList[0].InvoiceNo
        : `${sectionInitials}${currentYear}00`;

      const lastInvoiceNumber = parseInt(lastInvoiceNo.slice(-2), 10);
      const nextInvoiceNumber = (lastInvoiceNumber + 1)
        .toString()
        .padStart(2, "0");

      const newInvoiceNo = `${sectionInitials}${currentYear}${nextInvoiceNumber}`;

      const newPurchase = {
        Id: purchasesList.length
          ? Math.max(...purchasesList.map((item, index) => index)) + 2
          : 1,
        OrderDate: date.format("DD/MM/YYYY"),
        InvoiceNo: newInvoiceNo,
        TranType: trantype,
        SupplierName: supplier,
        Items: items,
        TotalAmount: amount,
        SubTotal: subTotal,
        TotalDiscount: generalDiscAmount,
        TotalTax: totalTax,
        Remarks: remarks,
      };

      setPurchasesList([newPurchase, ...purchasesList]);
    }

    // Reset the input fields
    setSupplier("");
    setProduct("");
    setQuantity("");
    setPrice("");
    setTax("");
    setDiscountType("None");
    setDiscountValue("");
    setDiscountAmount(0);
    setVatAmount(0);
    setItemList([]);
    setCreateInvoice(false); // Close the invoice creation modal
  };

  const handleSavePR = (
    date,
    trantype,
    supplier,
    items,
    amount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedPurchasesReturnsList = purchasesReturnsList.map((returns) =>
        returns.ReturnNo === selectedToEdit.ReturnNo
          ? {
              ...returns,
              ReturnDate: date.format("DD/MM/YYYY"),
              TranType: trantype,
              SupplierName: supplier,
              Items: items,
              TotalAmount: amount,
              SubTotal: subTotal,
              TotalDiscount: generalDiscAmount,
              TotalTax: totalTax,
              Remarks: remarks,
            }
          : returns,
      );

      console.log("returns:", updatedPurchasesReturnsList);

      setPurchasesReturnsList(updatedPurchasesReturnsList);
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new invoice
      const sectionInitials = "PR";
      const currentYear = new Date().getFullYear();

      const lastReturnNo = purchasesReturnsList.length
        ? purchasesReturnsList[0].ReturnNo
        : `${sectionInitials}${currentYear}00`;

      const lastReturnNumber = parseInt(lastReturnNo.slice(-2), 10);
      const nextReturnNumber = (lastReturnNumber + 1)
        .toString()
        .padStart(2, "0");

      const newReturnNo = `${sectionInitials}${currentYear}${nextReturnNumber}`;

      const newPurchasesReturn = {
        Id: purchasesReturnsList.length
          ? Math.max(...purchasesReturnsList.map((item, index) => index)) + 2
          : 1,
        ReturnDate: date.format("DD/MM/YYYY"),
        ReturnNo: newReturnNo,
        TranType: trantype,
        SupplierName: supplier,
        Items: items,
        TotalAmount: amount,
        SubTotal: subTotal,
        TotalDiscount: generalDiscAmount,
        TotalTax: totalTax,
        Remarks: remarks,
      };

      setPurchasesReturnsList([newPurchasesReturn, ...purchasesReturnsList]);
    }

    // Reset the input fields
    setSupplier("");
    setProduct("");
    setQuantity("");
    setPrice("");
    setTax("");
    setDiscountType("None");
    setDiscountValue("");
    setDiscountAmount(0);
    setVatAmount(0);
    setItemList([]);
    setCreateInvoice(false); // Close the invoice creation modal
  };

  const handleAddItem = (
    product,
    quantity,
    price,
    tax,
    discountAmount,
    amount,
  ) => {
    const newProduct = {
      Line: itemList.length
        ? Math.max(...itemList.map((item, index) => index)) + 2
        : 1,
      Item: product,
      Quantity: Number(quantity),
      Price: price,
      Tax: Number(tax),
      Discount: Number(discountAmount),
      Amount: Number(amount),
    };
    setItemList([...itemList, newProduct]);
  };

  const handleQtyChange = (value) => {
    if (!isNaN(value)) {
      setQuantity(value);
    }
  };

  const handleDisc = (e) => {
    const inputValue = e.target.value;

    // Use a regular expression to allow only numeric input
    const numericValue = inputValue.replace(/[^0-9]/g, "");

    setDiscountValue(numericValue);
  };

  const handlePriceInput = (value) => {
    if (!isNaN(value)) {
      setPrice(value);
    }
  };

  useEffect(() => {
    const calcAmount = () => {
      //let priceValue = getNumericValue();
      let lineAmount = price * quantity;

      setAmount(lineAmount);
    };
    calcAmount();
  }, [price, quantity, tax, discountAmount]);

  useEffect(() => {
    const calcTax = () => {
      const taxAmount = (amount - discountAmount) * tax;

      setVatAmount(taxAmount);
    };

    calcTax();
  }, [price, quantity, tax, discountAmount]);

  useEffect(() => {
    const calcDisc = () => {
      console.log(discountValue);
      const discAmount = (discountValue / 100) * amount;

      setDiscountAmount(discAmount);
    };

    calcDisc();
  }, [discountValue]);

  const calcGeneralDiscount = () => {
    const generalDiscValue = (generalDiscount / 100) * subTotal || 0;

    setGeneralDiscAmount(generalDiscValue.toFixed(2)); //here
  };

  const calcSubtotal = () => {
    let subtotal = 0;
    let itemsDiscount = 0;
    let discountedSubTotal = 0;

    if (itemList.length > 0) {
      itemList.forEach((item) => {
        let exVat = item.Price * item.Quantity;
        itemsDiscount += parseFloat(item.Discount);
        subtotal += parseFloat(exVat);
      });

      discountedSubTotal = subtotal - itemsDiscount;
    }

    // Set subTotal to 0.00 if itemList is empty, otherwise set the calculated value
    setSubTotal(discountedSubTotal.toFixed(2));
  };

  const calcTotalTax = () => {
    if (generalDiscount) {
      //const discSubTotal = subTotal - generalDiscAmount;
      const discSubTotal = subTotal - generalDiscAmount;
      const taxValue = discSubTotal * tax || 0;

      setTotalTax(taxValue.toFixed(2));
    } else {
      let totalTax = 0;
      itemList.forEach((item) => {
        totalTax += parseFloat(item.Tax) || 0;
      });

      setTotalTax(totalTax.toFixed(2));
    }
  };

  const calcTotal = () => {
    const subtotalValue = parseFloat(subTotal) || 0;

    const totalDiscountValue = parseFloat(generalDiscAmount) || 0;

    const totalTaxValue = parseFloat(totalTax) || 0;

    let total = subtotalValue - totalDiscountValue + totalTaxValue;

    setTotalAmount(total.toFixed(2));
  };

  useEffect(() => {
    calcGeneralDiscount();
  }, [generalDiscount, subTotal]);

  // useEffect(() => {
  //   calcTotalDisc();
  // }, [itemList, generalDiscAmount]);

  useEffect(() => {
    calcSubtotal();

    calcTotalTax();
    calcTotal();
  }, [itemList, subTotal, totalDiscount, totalTax, tax, generalDiscount]);

  const setMode = (e) => {
    setCurrentMode(e.target.value);

    localStorage.setItem("themeMode", e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);

    localStorage.setItem("colorMode", color);
    setThemeSettings(false);
  };

  const handleClick = (clicked) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  const ordersGrid = [
    {
      field: "OrderDate",
      headerText: "DATE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "InvoiceNo",
      headerText: "INVOICE NO.",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "CustomerName",
      headerText: "CUSTOMER NAME",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "TotalAmount",
      headerText: "TOTAL AMOUNT",
      format: "C2",
      textAlign: "Center",
      editType: "numericedit",
      width: "100",
    },
    {
      field: "TranType",
      headerText: "TRANS. TYPE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Action",
      headerText: "ACTION",
      width: "150",
      textAlign: "Center",
      commands:
        userRole === "admin"
          ? [
              {
                type: "View",
                buttonOption: {
                  //cssClass: "e-flat e-medium",
                  iconCss: "e-eye e-icons",
                },
              },
              {
                type: "Edit",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-edit e-icons",
                },
              },
              {
                type: "Delete",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-icons e-trash ",
                },
              },
            ]
          : [
              {
                type: "View",
                buttonOption: {
                  cssClass: "e-flat",
                  iconCss: "e-view e-icons",
                },
              },
            ],
    },
  ];

  const returnsGrid = [
    {
      field: "ReturnDate",
      headerText: "DATE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "ReturnNo",
      headerText: " RETURN NO.",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "CustomerName",
      headerText: "CUSTOMER NAME",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "TotalAmount",
      headerText: "TOTAL AMOUNT",
      format: "C2",
      textAlign: "Center",
      editType: "numericedit",
      width: "100",
    },
    {
      field: "TranType",
      headerText: "TRANS. TYPE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Action",
      headerText: "ACTION",
      width: "150",
      textAlign: "Center",
      commands:
        userRole === "admin"
          ? [
              {
                type: "View",
                buttonOption: {
                  //cssClass: "e-flat e-medium",
                  iconCss: "e-eye e-icons",
                },
              },
              {
                type: "Edit",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-edit e-icons",
                },
              },
              {
                type: "Delete",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-icons e-trash ",
                },
              },
            ]
          : [
              {
                type: "View",
                buttonOption: {
                  cssClass: "e-flat",
                  iconCss: "e-view e-icons",
                },
              },
            ],
    },
  ];

  const purchasesGrid = [
    {
      field: "OrderDate",
      headerText: "DATE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "InvoiceNo",
      headerText: " INVOICE NO.",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "SupplierName",
      headerText: "SUPPLIER NAME",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "TotalAmount",
      headerText: "TOTAL AMOUNT",
      format: "C2",
      textAlign: "Center",
      editType: "numericedit",
      width: "100",
    },
    {
      field: "TranType",
      headerText: "TRANS. TYPE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Action",
      headerText: "ACTION",
      width: "150",
      textAlign: "Center",
      commands:
        userRole === "admin"
          ? [
              {
                type: "View",
                buttonOption: {
                  //cssClass: "e-flat e-medium",
                  iconCss: "e-eye e-icons",
                },
              },
              {
                type: "Edit",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-edit e-icons",
                },
              },
              {
                type: "Delete",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-icons e-trash ",
                },
              },
            ]
          : [
              {
                type: "View",
                buttonOption: {
                  cssClass: "e-flat",
                  iconCss: "e-view e-icons",
                },
              },
            ],
    },
  ];

  const purchasesReturnsGrid = [
    {
      field: "ReturnDate",
      headerText: "DATE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "ReturnNo",
      headerText: " RETURN NO.",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "SupplierName",
      headerText: "SUPPLIER NAME",
      width: "150",
      textAlign: "Center",
    },
    {
      field: "TotalAmount",
      headerText: "TOTAL AMOUNT",
      format: "C2",
      textAlign: "Center",
      editType: "numericedit",
      width: "100",
    },
    {
      field: "TranType",
      headerText: "TRANS. TYPE",
      width: "100",
      textAlign: "Center",
    },
    {
      field: "Action",
      headerText: "ACTION",
      width: "150",
      textAlign: "Center",
      commands:
        userRole === "admin"
          ? [
              {
                type: "View",
                buttonOption: {
                  //cssClass: "e-flat e-medium",
                  iconCss: "e-eye e-icons",
                },
              },
              {
                type: "Edit",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-edit e-icons",
                },
              },
              {
                type: "Delete",
                buttonOption: {
                  //cssClass: "e-flat",
                  iconCss: "e-icons e-trash ",
                },
              },
            ]
          : [
              {
                type: "View",
                buttonOption: {
                  cssClass: "e-flat",
                  iconCss: "e-view e-icons",
                },
              },
            ],
    },
  ];

  return (
    <StateContext.Provider
      value={{
        ordersGrid,
        returnsGrid,
        purchasesGrid,
        purchasesReturnsGrid,
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
        currentColor,
        currentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
        setOpenCard,
        createInvoice,
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
        itemList,
        setItemList,
        amount,
        handleAddItem,
        remarks,
        setRemarks,

        totalAmount,
        setTotalAmount,
        subTotal,
        setSubTotal,
        totalTax,
        setTotalTax,
        totalDiscount,
        setTotalDiscount,
        generalDiscount,
        setGeneralDiscount,
        generalDiscAmount,
        handleSave,
        salesList,
        handleViewInvoice,
        selectedInvoice,
        setSelectedInvoice,
        handleEditInvoice,
        selectedToEdit,
        setSelectedToEdit,
        handleDeleteInvoice,
        salesReturnsList,
        setSalesReturnsList,
        handleDeleteSalesReturn,
        handleEditSalesReturn,
        handleViewSalesReturn,
        handleSaveSR,
        handleSavePR,
        purchasesList,
        purchasesReturnsList,
        setPurchasesReturnsList,
        setPurchasesList,
        handleSavePurchases,
        purchasesCreation,
        setPurchasesCreation,
        handleDeletePurchasesReturn,
        handleEditPurchasesReturn,
        handleViewPurchasesReturn,
        handleDeletePurchases,
        handleEditPurchases,
        handleViewPurchases,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

export { ContextProvider };
