import React, { useEffect } from "react";
import Select from "react-select";
import Flag from "react-world-flags";
import { useStateContext } from "../contexts/ContextProvider";

const currencyOptions = [
  { value: "USD", label: "USD - United States Dollar", countryCode: "US" },
  { value: "EUR", label: "EUR - Euro", countryCode: "EU" },
  { value: "GBP", label: "GBP - British Pound", countryCode: "GB" },
  { value: "GHS", label: "GHS - Ghanaian Cedi", countryCode: "GH" },
  { value: "JPY", label: "JPY - Japanese Yen", countryCode: "JP" },
  { value: "NGN", label: "NGN - Nigerian Naira", countryCode: "NG" },
];

const CtConfigs = () => {
  const { selectedCurrency, setSelectedCurrency } = useStateContext();

  useEffect(() => {
    if (selectedCurrency) {
      localStorage.setItem("currency", JSON.stringify(selectedCurrency));
    }
  }, [selectedCurrency]);

  const customSingleValue = ({ data }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Flag
        code={data.countryCode}
        alt="flag"
        width="20"
        style={{ marginRight: 10 }}
      />
      {data.label}
    </div>
  );
  return (
    <div className="m-2  p-2 md:p-10 bg-white rounded-3xl">
      <div>
        <p className="text-gray-400">Company Settings</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Currency & Tax Configurations
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg mb-2">Select Default Currency</h2>
        <Select
          options={currencyOptions} // Pass the currency options
          value={selectedCurrency} // The currently selected value
          onChange={setSelectedCurrency} // Handle changes
          placeholder="Select a currency"
          components={{ SingleValue: customSingleValue }} // Use custom component to show flags
          isSearchable={true} // Enable search functionality
        />
      </div>
    </div>
  );
};

export { CtConfigs };
