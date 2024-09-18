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
    field: "ReferenceNo",
    headerText: "REFERENCE NO.",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "FromWarehouse",
    headerText: "FROM",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "ToWarehouse",
    headerText: "TO",
    width: "100",
    textAlign: "Left",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: [
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
    ],
  },
];

export const suppliersGrid = [
  {
    field: "Id",
    headerText: "ID",
    width: "50",
    textAlign: "Center",
  },
  {
    field: "SupplierName",
    headerText: "SUPPLIER NAME",
    width: "150",
    textAlign: "Left",
  },
  {
    field: "businessAddress",
    headerText: "ADDRESS",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "contactNumber",
    headerText: "CONTACT",
    width: "100",
    textAlign: "Left",
  },
  {
    field: "tinNumber",
    headerText: "TIN NO.",
    width: "100",
    textAlign: "Left",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: [
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
    ],
  },
];

const gridEmployeeProfile = (props) => (
  <div className="flex items-center gap-2">
    <img
      className="rounded-full w-10 h-10"
      src={props.userAvatar}
      alt="employee"
    />
    <p>{`${props.firstName} ${props.lastName}`}</p>
  </div>
);

export const usersGrid = [
  {
    headerText: "EMPLOYEE",
    width: "150",
    template: gridEmployeeProfile,
    textAlign: "Center",
  },
  {
    field: "userName",
    headerText: "USERNAME",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "userTitle",
    headerText: "DESIGNATION",
    width: "170",
    textAlign: "Center",
  },

  {
    field: "userDepartment",
    headerText: "DEPARTMENT",
    width: "135",

    textAlign: "Center",
  },

  {
    field: "userEmail",
    headerText: "EMAIL",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "staffID",
    headerText: "STAFF ID",
    width: "125",
    textAlign: "Center",
  },
  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: [
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
    ],
  },
];

export const warehouseGrid = [
  {
    field: "Id",
    headerText: "ID",
    width: "50",
    textAlign: "Center",
  },
  {
    field: "warehouseName",
    headerText: "WAREHOUSE",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "50",
    textAlign: "Center",
    commands: [
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
    ],
  },
];

export const customersGrid = [
  {
    field: "Id",
    headerText: "ID",
    width: "50",
    textAlign: "Center",
  },
  {
    field: "customerName",
    headerText: "CUSTOMER NAME",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "businessUnit",
    headerText: "BUSINESS UNIT",
    width: "120",
    textAlign: "Center",
  },
  {
    field: "tinNumber",
    headerText: "TIN NO.",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "relManager",
    headerText: "REL. MANAGER",
    width: "120",
    textAlign: "Center",
  },

  {
    field: "Action",
    headerText: "ACTION",
    width: "150",
    textAlign: "Center",
    commands: [
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
    ],
  },
];
