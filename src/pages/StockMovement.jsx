import React from "react";
import { DateRangePickerComponent } from "@syncfusion/ej2-react-calendars";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Select } from "antd";
import { ImZoomIn } from "react-icons/im";
import { useStateContext } from "../contexts/ContextProvider";
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Inject,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";

import { Button } from "../components";
import { stockMovementGrid } from "../data/Grids";

const StockMovement = () => {
  const { currentColor } = useStateContext();
  const toolbarOptions = ["Print"];

  return (
    <div>
      <div>
        <p className="text-gray-400">Warehouse</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Stock Movement
        </p>
      </div>
      <div className="mt-10">
        <form action="" className="flex gap-5">
          <div>
            <Autocomplete
              disablePortal
              //value={supplier}
              //onChange={(e, newValue) => setSupplier(newValue)}
              id="products"
              //options={suppliers}
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
                <TextField {...params} label="Select Product" />
              )}
              isOptionEqualToValue={(option, value) =>
                option === value || value === ""
              }
            />
          </div>

          <DateRangePickerComponent />

          <Button
            bgColor={currentColor}
            text="Display"
            icon={<ImZoomIn />}
            //customFunc={customFunc}
            width="7.5rem"
            height="3rem"
            //disabled={isSaveBtnDisabled}
          />
        </form>
      </div>
      <div className="mt-10">
        <GridComponent
          cssClass="custom-grid"
          id="gridcomp"
          //dataSource={data}
          allowPaging
          allowSorting
          //allowFiltering
          toolbar={toolbarOptions}
          //commandClick={handleCommandClick}
        >
          <ColumnsDirective>
            {stockMovementGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
              CommandColumn,
              //Resize,
              Sort,
              //ContextMenu,
              Filter,
              Page,
              ExcelExport,
              PdfExport,
              Edit,
              Toolbar,
            ]}
          />
        </GridComponent>
      </div>
    </div>
  );
};

export default StockMovement;
