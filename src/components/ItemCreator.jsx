import React, { useState, useEffect } from "react";

import { Modal, message } from "antd";

import { useStateContext } from "../contexts/ContextProvider";

const units = [
  {
    name: "Carton",
    value: "CTN",
  },
  {
    name: "Pieces",
    value: "PCS",
  },
];

const categories = ["Fries", "vegetables", "Chicken Product"];

const ItemCreator = ({ editDetails, itemDetails }) => {
  const {
    setCreateItem,
    productForm,
    setProductForm,
    handleAddStockItem,
    setSelectedToEdit,
    supplierList,
    setSelectedStockItem,
    warehouseList,
  } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const [warehouseQuantities, setWarehouseQuantities] = useState(
    editDetails?.quantity ||
      warehouseList.map((warehouse) => ({
        warehouseName: warehouse.warehouseName,
        quantity: 0,
      })),
  );

  useEffect(() => {
    if (editDetails) {
      setProductForm(editDetails);
    }
  }, [editDetails]);

  const handleOk = () => {
    const newProduct = {
      ...productForm,
      quantity: warehouseQuantities,
    };
    if (itemDetails) {
      setCreateItem(false);
      setSelectedStockItem(null);
      setSelectedToEdit(null);
    } else {
      handleAddStockItem(newProduct);
    }

    setIsModalOpen(false);
    setCreateItem(false);
    setSelectedStockItem(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateItem(false);
    setSelectedToEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //setProductForm({ ...productForm, [name]: value });
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleWarehouseQuantityChange = (index, value) => {
    const updatedQuantities = [...warehouseQuantities];
    updatedQuantities[index].quantity = parseInt(value, 10);
    setWarehouseQuantities(updatedQuantities);
  };

  return (
    <div>
      <Modal
        title={
          itemDetails
            ? "VIEW PRODUCT"
            : editDetails
            ? "EDIT PRODUCT"
            : "ADD PRODUCT"
        }
        //title={editDetails ? "EDIT PRODUCT" : "NEW PRODUCT"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        maskClosable={false}
      >
        <form>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="product-name"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Product Name
              </label>
              <div className="mt-2">
                <input
                  id="product-name"
                  name="productName"
                  value={
                    itemDetails
                      ? itemDetails.productName
                      : productForm.productName
                  }
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="product-name"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="brand-name"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Brand Name
              </label>
              <div className="mt-2">
                <input
                  id="brand-name"
                  name="brandName"
                  value={
                    itemDetails ? itemDetails.brandName : productForm.brandName
                  }
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="brand-name"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="description"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Product Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="productDescription"
                  value={
                    itemDetails
                      ? itemDetails.productDescription
                      : productForm.productDescription
                  }
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="description"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* <div className="sm:col-span-2">
              <div>
                <label
                  htmlFor="quantity"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Initial Quantity
                </label>
                <div className="mt-2">
                  <input
                    id="quantity"
                    name="quantity"
                    value={
                      itemDetails ? itemDetails.quantity : productForm.quantity
                    }
                    onChange={handleInputChange}
                    type="number"
                    autoComplete="quantity"
                    disabled={itemDetails}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div> */}
            <div className="sm:col-span-2">
              <div>
                <label
                  htmlFor="batch-no"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Batch Number
                </label>
                <div className="mt-2">
                  <input
                    id="batch-no"
                    name="batchNo"
                    //value={productForm.batchNo}
                    value={
                      itemDetails ? itemDetails.batchNo : productForm.batchNo
                    }
                    onChange={handleInputChange}
                    type="text"
                    autoComplete="batch-no"
                    disabled={itemDetails}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="product-unit"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Product Unit
              </label>
              <div className="mt-2">
                <select
                  id="product-unit"
                  name="unit"
                  value={itemDetails ? itemDetails.unit : productForm.unit}
                  onChange={handleInputChange}
                  autoComplete="product-unit"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {units.map((unit) => (
                    <option key={unit.name} value={unit.value}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="product-unit"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Product Category
              </label>
              <div className="mt-2">
                <select
                  id="product-category"
                  name="category"
                  value={
                    itemDetails ? itemDetails.category : productForm.category
                  }
                  onChange={handleInputChange}
                  autoComplete="product-category"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="supplier-name"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                Supplier Name
              </label>
              <div className="mt-2">
                <select
                  id="supplier-name"
                  name="supplierName"
                  value={
                    itemDetails
                      ? itemDetails.supplierName
                      : productForm.supplierName
                  }
                  onChange={handleInputChange}
                  autoComplete="supplier-name"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  {supplierList.map((sup) => (
                    <option key={sup.supplierName} value={sup.supplierName}>
                      {sup.supplierName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="SKU"
                className="block text-lg font-medium leading-6 text-gray-900"
              >
                SKU
              </label>
              <div className="mt-2">
                <input
                  id="sku"
                  name="SKU"
                  value={itemDetails ? itemDetails.SKU : productForm.SKU}
                  onChange={handleInputChange}
                  type="text"
                  autoComplete="sku"
                  disabled={itemDetails}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <div>
                <label
                  htmlFor="level"
                  className="block text-lg font-medium leading-6 text-gray-900"
                >
                  Reorder Level
                </label>
                <div className="mt-2">
                  <input
                    id="level"
                    name="reorderLevel"
                    value={
                      itemDetails
                        ? itemDetails.reorderLevel
                        : productForm.reorderLevel
                    }
                    onChange={handleInputChange}
                    type="number"
                    autoComplete="level"
                    disabled={itemDetails}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                {warehouseQuantities.map((warehouse, index) => (
                  <div key={index} className="sm:col-span-2">
                    <label
                      htmlFor={`warehouse-${index}`}
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      {warehouse.warehouseName} Quantity
                    </label>
                    <div className="mt-2">
                      <input
                        id={`warehouse-${index}`}
                        name={`warehouse-${index}`}
                        value={warehouse.quantity}
                        onChange={(e) =>
                          handleWarehouseQuantityChange(index, e.target.value)
                        }
                        type="number"
                        disabled={itemDetails}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ItemCreator;
