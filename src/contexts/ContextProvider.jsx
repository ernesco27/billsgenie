import react, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const customers = ["Cash", "MaxMart", "Shoprite", "Melcom"];
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

  const handleSave = (date, trantype, customer, items, amount) => {
    const companyInitials = "BG"; // Replace with your company initials
    const currentYear = new Date().getFullYear();

    const lastInvoiceNo = salesList.length
      ? salesList[0].InvoiceNo
      : `${companyInitials}${currentYear}00`;

    const lastInvoiceNumber = parseInt(lastInvoiceNo.slice(-2), 10);
    const nextInvoiceNumber = (lastInvoiceNumber + 1)
      .toString()
      .padStart(2, "0");

    const newInvoiceNo = `${companyInitials}${currentYear}${nextInvoiceNumber}`;

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
    };

    setSalesList([newSale, ...salesList]);
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
    const generalDiscValue = (generalDiscount / 100) * subTotal;
    setGeneralDiscAmount(generalDiscValue);
  };

  const calcSubtotal = () => {
    //const generalDisc = parseFloat(generalDiscAmount || 0);
    let subtotal = 0;
    itemList.forEach((item) => {
      let exVat = item.Price * item.Quantity;
      subtotal += parseFloat(exVat);
    });

    //const discountedSubtotal = subtotal - generalDisc;

    setSubTotal(subtotal.toFixed(2));
  };

  const calcTotalDisc = () => {
    let itemsDiscount = 0;
    let totalDiscount;
    itemList.forEach((item) => {
      itemsDiscount += parseFloat(item.Discount);
    });

    totalDiscount = itemsDiscount + generalDiscAmount;

    setTotalDiscount(totalDiscount.toFixed(2));
  };

  const calcTotalTax = () => {
    if (generalDiscount) {
      const discSubTotal = subTotal - generalDiscAmount;
      const taxValue = discSubTotal * tax;

      setTotalTax(taxValue.toFixed(2));
    } else {
      let totalTax = 0;
      itemList.forEach((item) => {
        totalTax += parseFloat(item.Tax);
      });

      setTotalTax(totalTax.toFixed(2));
    }
  };

  const calcTotal = () => {
    const subtotalValue = parseFloat(subTotal) || 0;
    const totalDiscountValue = parseFloat(generalDiscAmount) || 0;
    // const generalDiscountValue = parseFloat(generalDiscAmount) || 0;
    const totalTaxValue = parseFloat(totalTax) || 0;

    let total = subtotalValue - totalDiscountValue + totalTaxValue;

    setTotalAmount(total.toFixed(2));
  };

  useEffect(() => {
    calcGeneralDiscount();
  }, [generalDiscount, subTotal]);

  useEffect(() => {
    calcTotalDisc();
  }, [itemList, generalDiscAmount]);

  useEffect(() => {
    calcSubtotal();

    calcTotalTax();
    calcTotal();
  }, [itemList, subTotal, totalDiscount, totalTax, tax]);

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

  return (
    <StateContext.Provider
      value={{
        ordersGrid,
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

export { ContextProvider };
