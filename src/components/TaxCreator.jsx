import React, { useState, useEffect } from "react";

import { Modal, message } from "antd";

import { useStateContext } from "../contexts/ContextProvider";

const TaxCreator = ({ editDetails }) => {
  const { setCreateTax, taxForm, setTaxForm, handleAddTax, setSelectedToEdit } =
    useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (editDetails) {
      setTaxForm(editDetails);
    }
  }, [editDetails]);

  const handleOk = () => {
    handleAddTax(taxForm.taxRate, taxForm.taxValue);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateTax(false);
    setSelectedToEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...taxForm, [name]: value };

    // Automatically update tax value when tax rate is entered
    if (name === "taxRate") {
      updatedForm.taxValue = parseFloat((value / 100).toFixed(3));
    }

    setTaxForm(updatedForm);
  };

  return (
    <div>
      <Modal
        title={editDetails ? "EDIT TAX RATE" : "ADD TAX RATE"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        maskClosable={false}
      >
        <form>
          <div className="mt-4 sm:col-span-4">
            <label
              htmlFor="tax-rate"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Tax Rate (%)
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="tax-rate"
                  name="taxRate"
                  type="number"
                  min={0}
                  value={taxForm.taxRate}
                  onChange={handleInputChange}
                  placeholder="3%"
                  autoComplete="taxRate"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 sm:col-span-4">
            <label
              htmlFor="tax-value"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Tax Value
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  disabled
                  id="tax-value"
                  name="taxValue"
                  type="number"
                  min={0}
                  value={taxForm.taxValue}
                  onChange={handleInputChange}
                  placeholder="0.03"
                  autoComplete="taxValue"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default TaxCreator;
