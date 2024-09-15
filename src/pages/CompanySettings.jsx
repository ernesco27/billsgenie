import React, { useState } from "react";
import { Segmented } from "antd";
import {
  HomeOutlined,
  ExceptionOutlined,
  ReconciliationOutlined,
  ShopOutlined,
} from "@ant-design/icons";

import {
  CompanyInfo,
  FinancialSettings,
  CurrencyTaxSettings,
  BusinessPartnerSettings,
  WarehouseSettings,
} from "../components";

const CompanySettings = () => {
  const [selectedOption, setSelectedOption] = useState("company-information");

  const options = [
    {
      label: "Company Information",
      value: "company-information",
      icon: <HomeOutlined />,
    },
    {
      label: "Business Partners Management",
      value: "business-partners-management",
      icon: <ExceptionOutlined />,
    },
    {
      label: "Currency & Tax Settings",
      value: "currency-tax-settings",
      icon: <ExceptionOutlined />,
    },
    {
      label: "Financial Year & Accounting Settings",
      value: "financial-year-accounting-settings",
      icon: <ReconciliationOutlined />,
    },
    {
      label: "Warehouse & Inventory Settings",
      value: "warehouse-inventory-settings",
      icon: <ShopOutlined />,
    },
  ];

  return (
    <div>
      <Segmented
        size="large"
        options={options}
        onChange={(value) => setSelectedOption(value)}
        block
      />
      <div style={{ marginTop: "40px" }}>
        {selectedOption === "company-information" && <CompanyInfo />}
        {selectedOption === "business-partners-management" && (
          <BusinessPartnerSettings />
        )}
        {selectedOption === "currency-tax-settings" && <CurrencyTaxSettings />}
        {selectedOption === "financial-year-accounting-settings" && (
          <FinancialSettings />
        )}
        {selectedOption === "warehouse-inventory-settings" && (
          <WarehouseSettings />
        )}
      </div>
    </div>
  );
};

export default CompanySettings;
