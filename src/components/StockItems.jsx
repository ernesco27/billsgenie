import React from "react";

import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Page,
  Inject,
  Search,
  Toolbar,
  CommandColumn,
} from "@syncfusion/ej2-react-grids";

import { useStateContext } from "../contexts/ContextProvider";

import { Header, ItemCreator } from "../components";

import { stockItemsGrid } from "../data/Grids";

const StockItems = () => {
  const {
    createItem,
    setCreateItem,
    stockItemList,
    handleDeleteItem,
    handleEditItem,
    handleViewItem,
    selectedToEdit,
    selectedStockItem,
  } = useStateContext();

  const handleCommandClick = (args) => {
    const Id = args.rowData.Id;
    if (args.commandColumn.type === "View") {
      handleViewItem(Id);
    } else if (args.commandColumn.type === "Edit") {
      handleEditItem(Id);
    } else if (args.commandColumn.type === "Delete") {
      handleDeleteItem(Id);
    }
  };

  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Company Settings"
        title="Item List"
        btnTitle="Add Item"
        customFunc={() => setCreateItem(true)}
      />
      <GridComponent
        dataSource={stockItemList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        commandClick={handleCommandClick}
      >
        <ColumnsDirective>
          {stockItemsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createItem && <ItemCreator editDetails={selectedToEdit} />}
      {selectedStockItem && <ItemCreator itemDetails={selectedStockItem} />}
    </div>
  );
};

export { StockItems };
