import React, { useState, useEffect } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Button, Modal, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { useStateContext } from "../contexts/ContextProvider";

const WarehouseCreator = ({ editDetails }) => {
  const {
    setCreateWarehouse,
    warehouseName,
    setWarehouseName,
    handleAddWarehouse,
    setSelectedToEdit,
  } = useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    if (editDetails) {
      setWarehouseName(editDetails.warehouseName);
    }
  }, [editDetails]);

  const handleOk = () => {
    handleAddWarehouse(warehouseName);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setCreateWarehouse(false);
    setSelectedToEdit(null);
  };

  const handleInputChange = (e) => {
    setWarehouseName(e.target.value);
  };

  return (
    <div>
      <Modal
        title={editDetails ? "EDIT WAREHOUSE" : "ADD WAREHOUSE"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={500}
        maskClosable={false}
      >
        <form>
          <div className="mt-4 sm:col-span-4">
            <label
              htmlFor="warehouseName"
              className="block text-lg font-medium leading-6 text-gray-900"
            >
              Warehouse Name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="warehouseName"
                  name="warehouseName"
                  type="text"
                  value={warehouseName}
                  onChange={handleInputChange}
                  placeholder="Room 1"
                  autoComplete="warehouseName"
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

export default WarehouseCreator;
