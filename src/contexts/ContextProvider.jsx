import react, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { CompassOutlined } from "@ant-design/icons";
import { inventoryTrackingGrid } from "../data/Grids";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";

const StateContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const InitialWarehouses = ["Room 1", "Room 2", "Room 3"];
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

const storedUserList = () => {
  const savedData = localStorage.getItem("user");

  return savedData ? JSON.parse(savedData) : [];
};

const storedTransferList = () => {
  const savedData = localStorage.getItem("stockTransfer");

  return savedData ? JSON.parse(savedData) : [];
};

const storedAdjustmentList = () => {
  const savedData = localStorage.getItem("stockAdjustment");

  return savedData ? JSON.parse(savedData) : [];
};

const storedCustomerList = () => {
  const savedData = localStorage.getItem("customer");
  return savedData ? JSON.parse(savedData) : [];
};

const storedSupplierList = () => {
  const savedData = localStorage.getItem("supplier");
  return savedData ? JSON.parse(savedData) : [];
};

const storedWarehouseList = () => {
  const savedData = localStorage.getItem("warehouse");
  return savedData ? JSON.parse(savedData) : [];
};

const storedStockList = () => {
  const savedData = localStorage.getItem("stockList");
  return savedData ? JSON.parse(savedData) : [];
};

const storedTaxList = () => {
  const savedData = localStorage.getItem("taxList");
  return savedData ? JSON.parse(savedData) : [];
};

const storedCurrency = () => {
  const savedData = localStorage.getItem("currency");
  return savedData ? JSON.parse(savedData) : null;
};

const storedCompanyData = () => {
  const savedData = localStorage.getItem("company");
  return savedData ? JSON.parse(savedData) : null;
};

const ContextProvider = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [openCard, setOpenCard] = useState(false);

  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentMode, setCurrentMode] = useState("Light");
  const [currentColor, setCurrentColor] = useState("#03C9D7");

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

  //state definitions for warehouse

  const [editingIndex, setEditingIndex] = useState(null);

  const [warehouses, setWarehouses] = useState(storedWarehouseList);
  const [fromWarehouse, setFromWarehouse] = useState("");
  const [toWarehouse, setToWarehouse] = useState("");
  // const [gridColumns, setGridColumns] = useState(() => [
  //   inventoryTrackingGrid[0],
  //   inventoryTrackingGrid[1],
  //   ...generateWarehouseColumns(warehouses),
  //   inventoryTrackingGrid[2],
  // ]);

  const [createStockTransfer, setCreateStockTransfer] = useState(false);
  const [createStockAdjustment, setCreateStockAdjustment] = useState(false);
  const [stockTransferList, setStockTransferList] =
    useState(storedTransferList);
  const [stockAdjustmentList, setStockAdjustmentList] =
    useState(storedAdjustmentList);
  const [stockList, setStockList] = useState([]);

  const [inventory, setInventory] = useState([]);

  const [stockTransferDetails, setStockTransferDetails] = useState({});
  const [stockTransferToEdit, setStockTransferToEdit] = useState(null);

  //state definitions for users management

  const formData = {
    userName: "",
    userAvatar: "",
    userEmail: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    staffID: "",
    userTitle: "",
    userPhoneNumber: "",
    userDepartment: "",
    userRole: "",
  };

  const [formState, setFormState] = useState(formData);
  const [createUser, setCreateUser] = useState(false);

  const [userRole, setUserRole] = useState("admin");
  const [userPermissions, setUserPermissions] = useState([]);
  const [userList, setUserList] = useState(storedUserList);

  //state definitions for company settings

  const customerData = {
    customerName: "",
    businessAddress: "",
    tinNumber: "",
    contactNumber: "",
    emailAddress: "",
    businessUnit: "",
    relManager: "",
    busRegNumber: "",
  };

  const supplierData = {
    supplierName: "",
    businessAddress: "",
    tinNumber: "",
    contactNumber: "",
    emailAddress: "",
    businessUnit: "",
    relManager: "",
  };

  const itemData = {
    productName: "",
    brandName: "",
    category: "",
    batchNo: "",
    productDescription: "",
    quantity: "",
    unit: "",
    supplierName: "",
    SKU: "",
    reorderLevel: "",
  };

  const taxData = {
    taxRate: "",
    taxValue: "",
  };

  const companyData = {
    businessName: "",
    logo: "",
    businessAddress: "",
    busRegNo: "",
    email: "",
    phoneNumber: "",
    tinNumber: "",
  };

  const [taxList, setTaxList] = useState(storedTaxList);
  const [createTax, setCreateTax] = useState(false);
  const [warehouseList, setWarehouseList] = useState(storedWarehouseList);
  const [createWarehouse, setCreateWarehouse] = useState(false);
  const [warehouseName, setWarehouseName] = useState("");
  const [customerList, setCustomerList] = useState(storedCustomerList);
  const [createClient, setCreateClient] = useState(false);
  const [createSupplier, setCreateSupplier] = useState(false);
  const [custFormData, setCustFormData] = useState(customerData);
  const [suppFormData, setSuppFormData] = useState(supplierData);
  const [supplierList, setSupplierList] = useState(storedSupplierList);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [productForm, setProductForm] = useState(itemData);
  const [createItem, setCreateItem] = useState(false);
  const [stockItemList, setStockItemList] = useState(storedStockList);
  const [selectedStockItem, setSelectedStockItem] = useState(null);
  const [taxForm, setTaxForm] = useState(taxData);
  const [selectedCurrency, setSelectedCurrency] = useState(storedCurrency);
  //const [companyInfo, setCompanyInfo] = useState(storedCompanyData);
  const [companyForm, setCompanyForm] = useState(companyData);
  const [createCompany, setCreateCompany] = useState(false);
  //const [companyList, setCompanyList] = useState(storedCompanyData);
  const [companyDetails, setCompanyDetails] = useState(storedCompanyData);
  const [companySaved, setCompanySaved] = useState(false); // State to track if the form is saved
  const [isCompanyEditable, setIsCompanyEditable] = useState(!companyDetails);

  const handleSaveCompany = () => {
    if (!companySaved) {
      // Save the form

      setCompanyDetails({ ...companyForm });
      console.log(companyDetails);
      message.success("Company details saved successfully!");

      setCompanyForm({ ...companyForm });
      localStorage.setItem("company", JSON.stringify(companyForm));

      setCompanySaved(true); // Set formSaved to true after saving
      setIsCompanyEditable(false); // Disable form fields
    } else {
      // Allow editing
      setIsCompanyEditable(true); // Enable form fields for editing
      setCompanySaved(false);
    }
  };

  const handleAddTax = (taxRate, taxValue) => {
    if (selectedToEdit) {
      // Updating an existing item
      const updatedTaxList = taxList.map((tax) =>
        tax.taxRate === selectedToEdit.taxRate
          ? {
              ...tax,

              taxRate,
              taxValue,
            }
          : tax,
      );

      setTaxList(updatedTaxList);
      localStorage.setItem("taxList", JSON.stringify(updatedTaxList));
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new item

      const newTax = {
        Id: taxList.length
          ? Math.max(...taxList.map((tax, index) => index)) + 2
          : 1,

        taxRate,
        taxValue,
      };

      console.log("new tax:", newTax);

      const updatedTaxList = [newTax, ...taxList];
      setTaxList(updatedTaxList);

      localStorage.setItem("taxList", JSON.stringify(updatedTaxList));
    }

    // Reset the input fields

    setTaxForm(taxData);

    setCreateTax(false);
  };

  const handleEditTax = (taxRate) => {
    const taxToEdit = taxList.find((tax) => tax.taxRate === taxRate);

    setSelectedToEdit(taxToEdit);
    setCreateTax(true);
  };

  const handleDeleteTax = (taxRate) => {
    const updatedList = taxList.filter((tax) => tax.taxRate !== taxRate);

    setTaxList(updatedList);
    localStorage.setItem("taxList", JSON.stringify(updatedList));
  };

  const handleAddStockItem = (product) => {
    if (selectedToEdit) {
      // Updating an existing item
      const updatedStockList = stockItemList.map((stockItem) =>
        stockItem.Id === selectedToEdit.Id
          ? { ...stockItem, ...product }
          : stockItem,
      );
      console.log(updatedStockList);
      setStockItemList(updatedStockList);

      message.success("Updated Stock Item Successfully");
      localStorage.setItem("stockList", JSON.stringify(updatedStockList));
      setSelectedToEdit(null);
    } else {
      // Creating a new item
      const newItem = {
        Id: uuidv4(),
        line: stockItemList.length
          ? Math.max(...stockItemList.map((item, index) => index)) + 2
          : 1,
        ...product,
      };
      const updatedStockList = [newItem, ...stockItemList];
      setStockItemList(updatedStockList);
      message.success("Added Stock Item Successfully");
      localStorage.setItem("stockList", JSON.stringify(updatedStockList));
    }
    setProductForm(itemData);
    setCreateItem(false);
  };

  const handleViewItem = (Id) => {
    const reference = stockItemList.find((product) => product.Id === Id);
    if (reference) {
      setSelectedStockItem(reference);
    }
  };

  const handleEditItem = (Id) => {
    const productToEdit = stockItemList.find((product) => product.Id === Id);

    setSelectedToEdit(productToEdit);
    setCreateItem(true);
  };

  const handleDeleteItem = (Id) => {
    const updatedList = stockItemList.filter((product) => product.Id !== Id);

    setStockItemList(updatedList);
    localStorage.setItem("stockList", JSON.stringify(updatedList));
  };

  const handleAddWarehouse = (Id) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedWarehouseList = warehouseList.map((warehouse) =>
        warehouse.Id === selectedToEdit.Id
          ? {
              ...warehouse,

              warehouseName,
            }
          : warehouse,
      );

      setWarehouseList(updatedWarehouseList);
      message.success("Warehouse updated successfully");
      localStorage.setItem("warehouse", JSON.stringify(updatedWarehouseList));
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new warehouse

      const newWarehouse = {
        Id: uuidv4(),

        warehouseName,
      };

      const updatedWarehouseList = [...warehouseList, newWarehouse];
      setWarehouseList(updatedWarehouseList);
      message.success("Warehouse added successfully");

      //setUserList(updatedSupplierList);
      localStorage.setItem("warehouse", JSON.stringify(updatedWarehouseList));
    }

    // Reset the input fields
    //setFormState(formData);
    setWarehouseName("");

    setCreateWarehouse(false);
  };

  const handleEditWarehouse = (Id) => {
    const warehouseToEdit = warehouseList.find(
      (warehouse) => warehouse.Id === Id,
    );

    setSelectedToEdit(warehouseToEdit);
    setCreateWarehouse(true);
  };

  const handleDeleteWarehouse = (Id) => {
    const updatedList = warehouseList.filter(
      (warehouse) => warehouse.Id !== Id,
    );

    setWarehouseList(updatedList);
    message.success("Warehouse deleted successfully");
    localStorage.setItem("warehouse", JSON.stringify(updatedList));
  };

  const handleAddSupplier = (
    supplierName,
    businessAddress,
    tinNumber,
    contactNumber,
    emailAddress,
    businessUnit,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedSupplierList = supplierList.map((supplier) =>
        supplier.supplierName === selectedToEdit.supplierName
          ? {
              ...supplier,

              supplierName,
              businessAddress,
              tinNumber,
              contactNumber,
              emailAddress,
              businessUnit,
            }
          : supplier,
      );

      setSupplierList(updatedSupplierList);
      localStorage.setItem("supplier", JSON.stringify(updatedSupplierList));
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new customer

      const newSupplier = {
        Id: supplierList.length
          ? Math.max(...supplierList.map((item, index) => index)) + 2
          : 1,

        supplierName,
        businessAddress,
        tinNumber,
        contactNumber,
        emailAddress,
        businessUnit,
      };

      setSupplierList([newSupplier, ...supplierList]);
      const updatedSupplierList = [newSupplier, ...supplierList];
      //setUserList(updatedSupplierList);
      localStorage.setItem("supplier", JSON.stringify(updatedSupplierList));
    }

    // Reset the input fields
    //setFormState(formData);
    setSuppFormData(supplierData);

    setCreateClient(false); // Close the invoice creation modal
  };

  const handleViewSupplier = (supplierName) => {
    const reference = supplierList.find(
      (supplier) => supplier.supplierName === supplierName,
    );
    if (reference) {
      setSelectedSupplier(reference);
    }
  };

  const handleEditSupplier = (supplierName) => {
    const supplierToEdit = supplierList.find(
      (supplier) => supplier.supplierName === supplierName,
    );

    setSelectedToEdit(supplierToEdit);
    setCreateSupplier(true);
  };

  const handleDeleteSupplier = (supplierName) => {
    const updatedList = supplierList.filter(
      (supplier) => supplier.supplierName !== supplierName,
    );

    setSupplierList(updatedList);
    localStorage.setItem("supplier", JSON.stringify(updatedList));
  };

  const handleAddCustomer = (
    customerName,
    businessAddress,
    tinNumber,
    contactNumber,
    emailAddress,
    businessUnit,
    relManager,
    busRegNumber,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedCustomerList = customerList.map((customer) =>
        customer.customerName === selectedToEdit.customerName
          ? {
              ...customer,

              customerName,
              businessAddress,
              tinNumber,
              contactNumber,
              emailAddress,
              businessUnit,
              relManager,
              busRegNumber,
            }
          : customer,
      );

      setCustomerList(updatedCustomerList);
      localStorage.setItem("customer", JSON.stringify(updatedCustomerList));
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new customer

      const newCustomer = {
        Id: customerList.length
          ? Math.max(...customerList.map((item, index) => index)) + 2
          : 1,

        customerName,
        businessAddress,
        tinNumber,
        contactNumber,
        emailAddress,
        businessUnit,
        relManager,
        busRegNumber,
      };

      setCustomerList([newCustomer, ...customerList]);
      const updatedCustomerList = [newCustomer, ...customerList];
      //setUserList(updatedCustomerList);
      localStorage.setItem("customer", JSON.stringify(updatedCustomerList));
    }

    // Reset the input fields
    //setFormState(formData);
    setCustFormData(customerData);

    setCreateClient(false); // Close the invoice creation modal
  };

  const handleViewCustomer = (customerName) => {
    const reference = customerList.find(
      (customer) => customer.customerName === customerName,
    );
    if (reference) {
      console.log("viewed customer;", reference);
      setSelectedInvoice(reference);
    }
  };

  const handleEditCustomer = (customerName) => {
    const customerToEdit = customerList.find(
      (customer) => customer.customerName === customerName,
    );

    //console.log(transferToEdit);

    setSelectedToEdit(customerToEdit);
    setCreateClient(true);
  };

  const handleDeleteCustomer = (customerName) => {
    const updatedList = customerList.filter(
      (customer) => customer.customerName !== customerName,
    );

    setCustomerList(updatedList);
    localStorage.setItem("customer", JSON.stringify(updatedList));
  };

  const handleAddUser = (
    userName,
    userAvatar,
    firstName,
    lastName,
    userEmail,
    password,
    staffID,
    userTitle,
    userPhoneNumber,
    userDepartment,
    userRole,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedUserList = userList.map((user) =>
        user.userName === selectedToEdit.userName
          ? {
              ...user,

              userName,
              userAvatar,
              firstName,
              lastName,
              userEmail,
              password,
              staffID,
              userTitle,
              userPhoneNumber,
              userDepartment,
              userRole,
            }
          : user,
      );

      setUserList(updatedUserList);
      localStorage.setItem("user", JSON.stringify(updatedUserList));
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new user

      const newUser = {
        Id: userList.length
          ? Math.max(...userList.map((item, index) => index)) + 2
          : 1,

        userName,
        userAvatar,
        firstName,
        lastName,
        userEmail,
        password,
        staffID,
        userTitle,
        userPhoneNumber,
        userDepartment,
        userRole,
      };

      setUserList([newUser, ...userList]);
      const updatedUserList = [newUser, ...userList];
      setUserList(updatedUserList);
      localStorage.setItem("user", JSON.stringify(updatedUserList));
    }

    // Reset the input fields
    setFormState(formData);

    setCreateUser(false); // Close the invoice creation modal
  };

  const handleViewStockTransfer = (referenceNo) => {
    const reference = stockTransferList.find(
      (transfer) => transfer.ReferenceNo === referenceNo,
    );
    if (reference) {
      console.log("viewed transfer;", reference);
      setSelectedInvoice(reference);
    }
  };

  const handleEditStockTransfer = (referenceNo) => {
    const transferToEdit = stockTransferList.find(
      (transfer) => transfer.ReferenceNo === referenceNo,
    );

    console.log(transferToEdit);

    setSelectedToEdit(transferToEdit);
    setCreateStockTransfer(true);
  };

  const handleDeleteStockTransfer = (referenceNo) => {
    const updatedList = stockTransferList.filter(
      (transfer) => transfer.ReferenceNo !== referenceNo,
    );

    setStockTransferList(updatedList);
    localStorage.setItem("stockTransfer", JSON.stringify(updatedList));
  };

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

  const handleSaveStockTransfer = (
    date,
    fromWarehouse,
    toWarehouse,
    items,
    remarks,
  ) => {
    if (selectedToEdit) {
      // Updating an existing invoice
      const updatedTransferList = stockTransferList.map((transfer) =>
        transfer.ReferenceNo === selectedToEdit.ReferenceNo
          ? {
              ...transfer,
              TransferDate: date.format("DD/MM/YYYY"),
              FromWarehouse: fromWarehouse,
              ToWarehouse: toWarehouse,
              Items: items,
              Remarks: remarks,
            }
          : transfer,
      );

      setStockTransferList(updatedTransferList);
      localStorage.setItem(
        "stockTransfer",
        JSON.stringify(updatedTransferList),
      );
      setSelectedToEdit(null); // Reset the selectedToEdit state after updating
    } else {
      // Creating a new invoice
      const sectionInitials = "ST"; // Replace with your company initials
      const currentYear = new Date().getFullYear();

      const lastReferenceNo = stockTransferList.length
        ? stockTransferList[0].ReferenceNo
        : `${sectionInitials}${currentYear}00`;

      const lastReferenceNumber = parseInt(lastReferenceNo.slice(-2), 10);
      const nextReferenceNumber = (lastReferenceNumber + 1)
        .toString()
        .padStart(2, "0");

      const newReferenceNo = `${sectionInitials}${currentYear}${nextReferenceNumber}`;

      const newTransfer = {
        Id: stockTransferList.length
          ? Math.max(...stockTransferList.map((item, index) => index)) + 2
          : 1,
        TransferDate: date.format("DD/MM/YYYY"),
        ReferenceNo: newReferenceNo,
        FromWarehouse: fromWarehouse,
        ToWarehouse: toWarehouse,
        Items: items,
        Remarks: remarks,
      };

      const updatedTransferList = [newTransfer, ...stockTransferList];
      setStockTransferList(updatedTransferList);
      localStorage.setItem(
        "stockTransfer",
        JSON.stringify(updatedTransferList),
      );
    }

    // Reset the input fields
    setFromWarehouse("");
    setToWarehouse("");
    setProduct("");
    setQuantity("");
    setStockList([]);
    setCreateStockTransfer(false); // Close the invoice creation modal
  };

  // const handleAdd = (sale) => {
  //   if (selectedToEdit) {
  //     // Updating an existing item
  //     const updatedStockList = stockItemList.map((stockItem) =>
  //       stockItem.Id === selectedToEdit.Id
  //         ? { ...stockItem, ...product }
  //         : stockItem,
  //     );
  //     console.log(updatedStockList);
  //     setStockItemList(updatedStockList);

  //     message.success("Updated Stock Item Successfully");
  //     localStorage.setItem("stockList", JSON.stringify(updatedStockList));
  //     setSelectedToEdit(null);
  //   } else {
  //     // Creating a new item
  //     const newItem = {
  //       Id: uuidv4(),
  //       line: stockItemList.length
  //         ? Math.max(...stockItemList.map((item, index) => index)) + 2
  //         : 1,
  //       ...product,
  //     };
  //     const updatedStockList = [newItem, ...stockItemList];
  //     setStockItemList(updatedStockList);
  //     message.success("Added Stock Item Successfully");
  //     localStorage.setItem("stockList", JSON.stringify(updatedStockList));
  //   }
  //   setProductForm(itemData);
  //   setCreateItem(false);
  // };

  const handleSave = (
    date,
    trantype,
    customer,
    tin,
    address,
    items,
    amount,
    generalDiscAmount,
    totalTax,
    subTotal,
    remarks,
    Id,
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
              CustomerTin: tin,
              CustomerAddress: address,
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
        Id: uuidv4(),
        Line: salesList.length
          ? Math.max(...salesList.map((item, index) => index)) + 2
          : 1,
        OrderDate: date.format("DD/MM/YYYY"),
        InvoiceNo: newInvoiceNo,
        TranType: trantype,
        CustomerName: customer,
        CustomerTin: tin,
        CustomerAddress: address,
        Items: items,
        TotalAmount: amount,
        SubTotal: subTotal,
        TotalDiscount: generalDiscAmount,
        TotalTax: totalTax,
        Remarks: remarks,
      };

      console.log("new sale:", newSale);

      setSalesList([newSale, ...salesList]);
      // Update stock quantities in warehouses
      setStockItemList((prevItems) => {
        return prevItems.map((item) => {
          const soldItem = items.find((i) => i.Item === item.productName);
          console.log("sold items are:", soldItem);
          if (soldItem) {
            let remainingQuantity = soldItem.Quantity;
            console.log("remain qty:", remainingQuantity);

            console.log("ITEM:", item);

            const updatedQuantities = item.quantity.map((warehouseQty) => {
              if (remainingQuantity > 0 && warehouseQty.quantity > 0) {
                const deductedQty = Math.min(
                  warehouseQty.quantity,
                  remainingQuantity,
                );
                remainingQuantity -= deductedQty;

                return {
                  ...warehouseQty,
                  quantity: warehouseQty.quantity - deductedQty,
                };
              }

              return warehouseQty;
            });

            return { ...item, quantity: updatedQuantities };
          }

          return item;
        });
      });
    }

    // Reset the input fields
    setCustomer("");
    setTin("");
    setAddress("");
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
        //stockMovementGrid,
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
        //gridColumns,
        createStockTransfer,
        setCreateStockTransfer,
        warehouses,
        setWarehouses,
        fromWarehouse,
        setFromWarehouse,
        toWarehouse,
        setToWarehouse,
        stockTransferList,
        setStockTransferList,
        handleSaveStockTransfer,
        handleEditStockTransfer,
        handleViewStockTransfer,
        handleDeleteStockTransfer,
        stockList,
        setStockList,
        createUser,
        setCreateUser,
        userList,
        setUserList,
        formState,
        setFormState,
        handleAddUser,
        warehouseList,
        setWarehouseList,
        customerList,
        setCustomerList,
        createClient,
        setCreateClient,
        custFormData,
        setCustFormData,
        handleAddCustomer,
        handleViewCustomer,
        handleEditCustomer,
        handleDeleteCustomer,
        supplierList,
        setSupplierList,
        suppFormData,
        setSuppFormData,
        handleAddSupplier,
        handleViewSupplier,
        handleDeleteSupplier,
        handleEditSupplier,
        createSupplier,
        setCreateSupplier,
        selectedSupplier,
        setSelectedSupplier,
        createWarehouse,
        setCreateWarehouse,
        warehouseName,
        setWarehouseName,
        handleAddWarehouse,
        handleEditWarehouse,
        handleDeleteWarehouse,
        productForm,
        setProductForm,
        createItem,
        setCreateItem,
        stockItemList,
        setStockItemList,
        handleAddStockItem,
        handleViewItem,
        handleEditItem,
        handleDeleteItem,
        selectedStockItem,
        setSelectedStockItem,
        taxList,
        setTaxList,
        createTax,
        setCreateTax,
        handleAddTax,
        handleEditTax,
        handleDeleteTax,
        taxForm,
        setTaxForm,
        selectedCurrency,
        setSelectedCurrency,
        // companyInfo,
        // setCompanyInfo,
        companyForm,
        setCompanyForm,
        createCompany,
        setCreateCompany,
        handleSaveCompany,
        companyDetails,
        companySaved,
        setCompanySaved,
        isCompanyEditable,
        setIsCompanyEditable,
        createStockAdjustment,
        setCreateStockAdjustment,
        stockAdjustmentList,
        setStockAdjustmentList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

export { ContextProvider };
