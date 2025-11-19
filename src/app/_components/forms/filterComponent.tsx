import { Fragment } from "react";
const FilterComponent = ({
  options,
  setOptions,
}: {
  options?: any[];
  setOptions?: (options: any[]) => void;
}) => {
  return (
    //hidden for now -- TODO
    <div className="hidden">
      <select
        className="w-[180px] py-[.6em] px-8 bg-none rounded-md text-primary_text text-sm"
        placeholder="Filter"
        onChange={(e) => {
          if (!(options && setOptions)) return 0;
          const selectedOption = e.target.value;
          if (selectedOption.length > 0) {
            setOptions([selectedOption]);
          } else {
            setOptions(options);
            console.log("together", options)
          }
        }}
        style={{
          border: "1px solid #EEE",
          background: "none",
          outline: "none",
        }}
      >
        <option className="capitalize" value={""}>No Filter</option>
        {options &&
          options.map((option, key) => (
            <Fragment key={key}>
              <option className="capitalize" value={option}>{option}</option>
            </Fragment>
          ))}

        {/* <ExportButton /> */}
      </select>
    </div>
  );
};

export default FilterComponent;
