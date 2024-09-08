export const ProductsGrid = [
  {
    field: "ProductName",
    headerText: "PRODUCT NAME",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "ProductUnit",
    headerText: "UNIT",
    width: "50",
    textAlign: "Left",
  },
  {
    field: "ProductDescription",
    headerText: "DESCRIPTION",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "SkuCode",
    headerText: "SKU CODE",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "Category",
    headerText: "CATEGORY",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "BatchNumber",
    headerText: "BATCH NO.",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: {
      type: "Edit",
      buttonOption: {
        //cssClass: "e-flat",
        iconCss: "e-edit e-icons",
      },
    },
  },
];

export const stockMovementGrid = [
  {
    field: "Date",
    headerText: "DATE",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "ReferenceNo",
    headerText: "REFERENCE NO.",
    width: "150",
    textAlign: "Center",
  },

  {
    field: "Warehouse",
    headerText: "WAREHOUSE",
    textAlign: "Center",
    width: "100",
  },
  {
    field: "To",
    headerText: "TO",
    textAlign: "Center",
    width: "100",
  },
  {
    field: "QtyIn",
    headerText: "QTY IN",
    textAlign: "Center",
    width: "100",
  },
  {
    field: "QtyOut",
    headerText: "QTY OUT",
    textAlign: "Center",
    width: "100",
  },
];

export const inventoryTrackingGrid = [
  {
    field: "No",
    headerText: "NO",
    width: "100",
    textAlign: "Center",
  },
  {
    field: "ProductName",
    headerText: "PRODUCT NAME",
    width: "150",
    textAlign: "Center",
  },

  {
    field: "TotalQuantity",
    headerText: "TOTAL QUANTITY",
    textAlign: "Center",
    editType: "numericedit",
    width: "100",
  },
];

export const WarehouseGrid = [
  {
    field: "WarehouseName",
    headerText: "WAREHOUSE NAME",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "NoOfProducts",
    headerText: "NO. OF PRODUCTS",
    width: "50",
    textAlign: "Left",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: {
      type: "Edit",
      buttonOption: {
        //cssClass: "e-flat",
        iconCss: "e-edit e-icons",
      },
    },
  },
];

export const stockTransferGrid = [
  {
    field: "TransferDate",
    headerText: "DATE",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "TransferNo",
    headerText: "REFERENCE NO.",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "From",
    headerText: "FROM",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "To",
    headerText: "TO",
    width: "100",
    textAlign: "Left",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: {
      type: "Edit",
      buttonOption: {
        //cssClass: "e-flat",
        iconCss: "e-edit e-icons",
      },
    },
  },
];

export const suppliersGrid = [
  {
    field: "SupplierName",
    headerText: "NAME OF SUPPLIER",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "Address",
    headerText: "ADDRESS",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "Contact",
    headerText: "CONTACT",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "TinNo",
    headerText: "TIN NO.",
    width: "100",
    textAlign: "Left",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: {
      type: "Edit",
      buttonOption: {
        //cssClass: "e-flat",
        iconCss: "e-edit e-icons",
      },
    },
  },
];
