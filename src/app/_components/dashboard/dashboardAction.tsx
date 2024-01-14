import React from "react";
import FilterComponent from "../forms/filterComponent";
import Input from "../input_fields";
import ExportButton from "../forms/exportButton";

const DashboardAction = () => {
  return (
    <div className="flex gap-3 items-center">
      <Input
        name="search"
        type="search"
        placeholder="Search for anything..."
        style={{
          width: "300px",
          border: "1px solid #EEE",
        }}
      />
      <FilterComponent />
      <ExportButton />
    </div>
  );
};

export default DashboardAction;
