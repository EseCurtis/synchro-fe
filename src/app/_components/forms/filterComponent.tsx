import React from "react";
import { BiFilterAlt } from "react-icons/bi";
import ExportButton from "./exportButton";
const FilterComponent = () => {
  return (
    <div>
      <select
        className="  w-[180px] py-[.6em] px-8 bg-none rounded-md text-primary_text "
        style={{
          border: "1px solid #EEE",
          background: "none",
          outline: "none",
        }}
      >
        <option value="">
          <BiFilterAlt /> Filter
        </option>
        <ExportButton />
      </select>
    </div>
  );
};

export default FilterComponent;
