import React, { useState } from "react";
import { Button, Modal } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Input } from "antd";

import { FaCartArrowDown } from "react-icons/fa6";

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
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal
      </Button> */}
      <Modal
        title="ADD PRODUCT"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form action="">
          <Input
            size="large"
            placeholder="Product Name"
            prefix={<FaCartArrowDown />}
          />
          <br />
        </form>
      </Modal>
    </>
  );
};
export default ProductModal;
