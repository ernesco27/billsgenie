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

import { Header, TaxCreator } from "../components";

import { taxGrid } from "../data/Grids";

const TaxSection = () => {
  const {
    createTax,
    setCreateTax,
    taxList,
    handleDeleteTax,
    handleEditTax,
    selectedToEdit,
  } = useStateContext();

  const handleCommandClick = (args) => {
    const taxRate = args.rowData.taxRate;
    if (args.commandColumn.type === "Edit") {
      handleEditTax(taxRate);
    } else if (args.commandColumn.type === "Delete") {
      handleDeleteTax(taxRate);
    }
  };
  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <Header
        category="Company Settings"
        title="Tax Rates"
        btnTitle="Add Tax Rate"
        customFunc={() => setCreateTax(true)}
      />
      <GridComponent
        dataSource={taxList}
        allowPaging
        allowSorting
        toolbar={["Search"]}
        width="auto"
        commandClick={handleCommandClick}
      >
        <ColumnsDirective>
          {taxGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar, CommandColumn]} />
      </GridComponent>
      {createTax && <TaxCreator editDetails={selectedToEdit} />}
    </div>
  );
};

export { TaxSection };
