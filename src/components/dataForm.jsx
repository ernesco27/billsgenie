import React, { useState, useContext } from "react";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Space,
} from "antd";

import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { useStateContext } from "../contexts/ContextProvider";

// const originData = [];
// for (let i = 0; i < 100; i++) {
//   originData.push({
//     key: i.toString(),
//     name: `Edward ${i}`,
//     age: 32,
//     address: `London Park no. ${i}`,
//   });
// }

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
const ItemForm = ({ addFunc }) => {
  const { setItemList, itemList } = useStateContext();

  const [form] = Form.useForm();
  //const [data, setData] = useState(itemList);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      line: "",
      item: "",
      quantity: "",
      price: "",
      discount: "",
      tax: "",
      amount: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...itemList];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setItemList(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setItemList(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const handleDelete = (key) => {
    const newData = itemList.filter((item) => item.key !== key);
    setItemList(newData);
  };

  const columns = [
    {
      title: "Line",
      dataIndex: "line",
      width: "10%",
      editable: false,
    },
    {
      title: "Item",
      dataIndex: "item",
      width: "30%",
      editable: false,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      width: "15%",
      editable: false,
    },
    {
      title: "Price",
      dataIndex: "price",
      width: "15%",
      editable: false,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      width: "10%",
      editable: false,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      width: "10%",
      editable: false,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      width: "15%",
      editable: false,
    },

    {
      title: "Action",
      dataIndex: "action",

      render: () => (
        <Space>
          <EditFilled />
          <Popconfirm title="Sure to delete?" onConfirm={() => {}}>
            <DeleteFilled />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "item" ? "text" : "number",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={itemList}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          hideOnSinglePage: true,
        }}
      />
    </Form>
  );
};
export { ItemForm };
