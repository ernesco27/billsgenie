import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { useStateContext } from "../contexts/ContextProvider";

const ClientCreator = ({ customerDetails, editDetails }) => {
  const {
    handleAddCustomer,
    custFormData,
    setCustFormData,
    setCreateClient,
    setSelectedInvoice,
  } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const units = [
    { name: "Retail", value: "retail" },
    { name: "Food Service", value: "Food Service" },
  ];

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  const handleOk = () => {
    if (customerDetails) {
      setCreateClient(false);
      setSelectedInvoice(null);
    } else {
      handleAddCustomer(
        custFormData.customerName,
        custFormData.businessAddress,
        custFormData.tinNumber,
        custFormData.contactNumber,
        custFormData.emailAddress,
        custFormData.businessUnit,
        custFormData.relManager,
        custFormData.busRegNumber,
      );
    }

    setIsModalOpen(false);
    setCreateClient(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateClient(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustFormData({ ...custFormData, [name]: value });
  };

  useEffect(() => {
    console.log("edit details:", editDetails);
    if (editDetails) {
      setCustFormData(editDetails);
    }
  }, [editDetails]);

  return (
    <div>
      <Modal
        title={
          customerDetails
            ? "VIEW CUSTOMER"
            : editDetails
            ? "EDIT CUSTOMER"
            : "ADD CUSTOMER"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
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
                    htmlFor="customerName"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Customer Name
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="customerName"
                        name="customerName"
                        type="text"
                        value={
                          customerDetails
                            ? customerDetails.customerName
                            : custFormData.customerName
                        }
                        onChange={handleInputChange}
                        placeholder="XYZ Co. Ltd"
                        autoComplete="customerName"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        disabled={customerDetails}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-lg font-semibold leading-7 text-gray-900">
                Customer Information
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
                        customerDetails
                          ? customerDetails.businessAddress
                          : custFormData.businessAddress
                      }
                      onChange={handleInputChange}
                      disabled={customerDetails}
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
                        customerDetails
                          ? customerDetails.emailAddress
                          : custFormData.emailAddress
                      }
                      onChange={handleInputChange}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={customerDetails}
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
                          customerDetails
                            ? customerDetails.contactNumber
                            : custFormData.contactNumber
                        }
                        onChange={handleInputChange}
                        type="number"
                        autoComplete="phone-number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={customerDetails}
                      />
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <div>
                    <label
                      htmlFor="regNo"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Bus. Registration No.
                    </label>
                    <div className="mt-2">
                      <input
                        id="regNo"
                        name="busRegNumber"
                        value={
                          customerDetails
                            ? customerDetails.busRegNumber
                            : custFormData.busRegNumber
                        }
                        onChange={handleInputChange}
                        type="text"
                        autoComplete="regNo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        disabled={customerDetails}
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
                      id="department"
                      name="tinNumber"
                      value={
                        customerDetails
                          ? customerDetails.tinNumber
                          : custFormData.tinNumber
                      }
                      onChange={handleInputChange}
                      type="text"
                      autoComplete="tinNo"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={customerDetails}
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
                        customerDetails
                          ? customerDetails.businessUnit
                          : custFormData.businessUnit
                      }
                      onChange={handleInputChange}
                      autoComplete="bus-unit"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      disabled={customerDetails}
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
                    htmlFor="relManager"
                    className="block text-lg font-medium leading-6 text-gray-900"
                  >
                    Relationship Manager
                  </label>
                  <div className="mt-2">
                    <input
                      id="relManager"
                      name="relManager"
                      value={
                        customerDetails
                          ? customerDetails.relManager
                          : custFormData.relManager
                      }
                      onChange={handleInputChange}
                      type="text"
                      autoComplete="relManager"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      disabled={customerDetails}
                    />
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

export default ClientCreator;
