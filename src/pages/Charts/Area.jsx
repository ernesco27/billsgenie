import React from "react";
import { Header, AreaChart } from "../../components";

const Area = () => {
  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <Header category="Chart" title="Inflation Rate" />
      <div className="w-full">
        <AreaChart />
      </div>
    </div>
  );
};

export default Area;
