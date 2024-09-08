import React, { useState } from "react";
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

import { ProductsGrid } from "../data/Grids";
import { ProductModal } from "../components";

const ProductManagement = () => {
  const [addProduct, setAddProduct] = useState(false);

  const newProduct = () => {
    setAddProduct(true);
  };

  return (
    <div>
      <Header
        category="Warehouse"
        title="Product Management"
        customFunc={newProduct}
        btnTitle="Add Product"
      />
      <div className="mt-10">
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
            {ProductsGrid.map((item, index) => (
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
      {addProduct && <ProductModal />}
    </div>
  );
};

export default ProductManagement;
