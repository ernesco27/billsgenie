import React, { useState } from "react";
import { Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { InputNumber, DatePicker } from "antd";
import { Select } from "antd";
const { TextArea } = Input;
import { AutoComplete } from "antd";

import { FaCartArrowDown } from "react-icons/fa6";

const onDateChange = (date, dateString) => {
  console.log(date, dateString);
};

const onInputChange = (value) => {
  console.log("changed", value);
};

const options = [
  {
    value: "Cartons",
    label: "CTN",
  },
  {
    value: "Pieces",
    label: "PCS",
  },
];

const ProductOptions = [
  {
    value: "Eskimo Vanilla",
  },
  {
    value: "Super Chocolate",
  },
  {
    value: "Momment Dessert Caramel",
  },
];

const onChange = (value) => {
  console.log(`selected ${value}`);
};
const onSearch = (value) => {
  console.log("search:", value);
};

const ProductModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="ADD STOCK"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="" className="flex flex-col gap-3">
          <AutoComplete
            options={ProductOptions}
            placeholder="Product Name"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
            size="large"
          />
          <InputNumber
            min={1}
            size="large"
            defaultValue={1}
            onChange={onInputChange}
            addonAfter="QTY"
          />

          {/* <Select
            showSearch
            placeholder="Select Unit"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={options}
            size="large"
          />
          <TextArea
            rows={4}
            placeholder="Enter Product Description"
            size="large"
          /> */}
          {/* <Input size="large" placeholder="SKU Code" />
          <Select
            showSearch
            placeholder="Select Product Category"
            optionFilterProp="label"
            onChange={onChange}
            onSearch={onSearch}
            options={options}
            size="large"
          /> */}
          <DatePicker size="large" onChange={onDateChange} />
          <Input size="large" placeholder="Batch No." />
        </form>
      </Modal>
    </div>
  );
};
export default ProductModal;
