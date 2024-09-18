import React, { useState, useEffect } from "react";

import { Modal } from "antd";

import { useStateContext } from "../contexts/ContextProvider";

const SupplierCreator = ({ supplierDetails, editDetails }) => {
  const {
    handleAddSupplier,
    suppFormData,
    setSuppFormData,

    setSelectedSupplier,
    setSelectedToEdit,
    setCreateSupplier,
  } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const units = [
    { name: "Retail", value: "Retail" },
    { name: "Food Service", value: "Food Service" },
  ];

  const handleOk = () => {
    if (supplierDetails) {
      setCreateSupplier(false);
      setSelectedSupplier(null);
      setSelectedToEdit(null);
    } else {
      handleAddSupplier(
        suppFormData.supplierName,
        suppFormData.businessAddress,
        suppFormData.tinNumber,
        suppFormData.contactNumber,
        suppFormData.emailAddress,
        suppFormData.businessUnit,
      );
    }

    setIsModalOpen(false);
    setCreateSupplier(false);
    setSelectedSupplier(null);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateSupplier(false);
    setSelectedSupplier(null);
    setSelectedToEdit(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSuppFormData({ ...suppFormData, [name]: value });
  };

  useEffect(() => {
    if (editDetails) {
      setSuppFormData(editDetails);
    }
  }, [editDetails]);

  return (
    <div>
      <Modal
        title={
          supplierDetails
            ? "VIEW SUPPLIER"
            : editDetails
            ? "EDIT SUPPLIER"
            : "ADD SUPPLIER"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        maskClosable={false}
      >
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                Business Profile
              </h2>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="suppierName"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Supplier Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="supplierName"
                        name="supplierName"
                        type="text"
                        value={
                          supplierDetails
                            ? supplierDetails.supplierName
                            : suppFormData.supplierName
                        }
                        onChange={handleInputChange}
                        placeholder="XYZ Co. Ltd"
                        autoComplete="supplierName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        disabled={supplierDetails}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">
                Supplier Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Business Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="address"
                      name="businessAddress"
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      value={
                        supplierDetails
                          ? supplierDetails.businessAddress
                          : suppFormData.businessAddress
                      }
                      onChange={handleInputChange}
                      disabled={supplierDetails}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Email Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="emailAddress"
                      value={
                        supplierDetails
                          ? supplierDetails.emailAddress
                          : suppFormData.emailAddress
                      }
                      onChange={handleInputChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={supplierDetails}
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Contact Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone-number"
                        name="contactNumber"
                        value={
                          supplierDetails
                            ? supplierDetails.contactNumber
                            : suppFormData.contactNumber
                        }
                        onChange={handleInputChange}
                        type="number"
                        autoComplete="phone-number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={supplierDetails}
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2 ">
                  <label
                    htmlFor="tinNo"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    TIN Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="tinNo"
                      name="tinNumber"
                      value={
                        supplierDetails
                          ? supplierDetails.tinNumber
                          : suppFormData.tinNumber
                      }
                      onChange={handleInputChange}
                      type="text"
                      autoComplete="tinNo"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={supplierDetails}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="bus-unit"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Business Unit
                  </label>
                  <div className="mt-2">
                    <select
                      id="bus-unit"
                      name="businessUnit"
                      value={
                        supplierDetails
                          ? supplierDetails.businessUnit
                          : suppFormData.businessUnit
                      }
                      onChange={handleInputChange}
                      autoComplete="bus-unit"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      disabled={supplierDetails}
                    >
                      {units.map((unit) => (
                        <option key={unit.name} value={unit.value}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default SupplierCreator;
