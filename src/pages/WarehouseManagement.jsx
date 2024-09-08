import React from "react";
import { Header } from "../components";
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
import {
  TabComponent,
  TabItemDirective,
  TabItemsDirective,
} from "@syncfusion/ej2-react-navigations";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { PiArrowsLeftRightBold } from "react-icons/pi";
import { IoIosAddCircleOutline } from "react-icons/io";

import { WarehouseGrid, stockTransferGrid } from "../data/Grids";
import { Button } from "../components";
import { useStateContext } from "../contexts/ContextProvider.jsx";

const WarehouseManagement = () => {
  const { currentColor } = useStateContext();

  let headerText = [{ text: "Warehouses" }, { text: "Stock Transfer" }];

  const content0 = () => {
    return (
      <div className="mt-10">
        <div className="flex justify-end mb-5">
          <TooltipComponent content="Add Warehouse" position="TopCenter">
            <button className="p-2 text-6xl text-gray-400 hover:text-gray-950 hover:bg-light-gray rounded-full hover:drop-shadow-xl">
              {<IoIosAddCircleOutline />}
            </button>
          </TooltipComponent>
        </div>

        <GridComponent
          cssClass="custom-grid"
          id="gridcomp"
          //dataSource={data}
          allowPaging
          allowSorting
          //allowFiltering
          //toolbar={toolbarOptions}
          //commandClick={handleCommandClick}
        >
          <ColumnsDirective>
            {WarehouseGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
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
    );
  };

  const content1 = () => {
    return (
      <div className="mt-10">
        <div className="flex justify-end mb-5">
          <TooltipComponent content="Make Stock Transfer" position="TopCenter">
            <button className="p-2 text-6xl text-gray-400 hover:text-gray-950 hover:bg-light-gray rounded-full hover:drop-shadow-xl">
              {<PiArrowsLeftRightBold />}
            </button>
          </TooltipComponent>
        </div>
        <GridComponent
          cssClass="custom-grid"
          id="gridcomp"
          //dataSource={data}
          allowPaging
          allowSorting
          //allowFiltering
          //toolbar={toolbarOptions}
          //commandClick={handleCommandClick}
        >
          <ColumnsDirective>
            {stockTransferGrid.map((item, index) => (
              <ColumnDirective key={index} {...item} />
            ))}
          </ColumnsDirective>
          <Inject
            services={[
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
    );
  };

  return (
    <div>
      <div>
        <p className="text-gray-400">Warehouse</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Warehouse Management
        </p>
      </div>
      <div className="mt-10">
        <TabComponent cssClass="e-fill">
          <TabItemsDirective>
            <TabItemDirective header={headerText[0]} content={content0} />
            <TabItemDirective header={headerText[1]} content={content1} />
            {/* <TabItemDirective header={headerText[2]} content={content2}/>  */}
          </TabItemsDirective>
        </TabComponent>
      </div>
    </div>
  );
};

export default WarehouseManagement;
