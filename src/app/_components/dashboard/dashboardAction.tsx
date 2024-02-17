import React, { useEffect, useState } from "react";
import FilterComponent from "../forms/filterComponent";
import Input from "../input_fields";
import ExportButton from "../forms/exportButton";

const DashboardAction = ({
  pool,
  setMatch,
  matchQuery,
}: {
  pool?: any[];
  setMatch?: (matches: any[]) => void;
  matchQuery?: string[];
}) => {
  const [options, setOptions] = useState<any[]>(matchQuery as any[]);

  const searchAction = (searchValue: string) => {
    if (setMatch && pool && matchQuery) {
      if (searchValue.length < 1) return setMatch(pool);
      setMatch(
        pool?.filter(
          (item) =>
            {
              const matches = options.filter(
                (queryItem) =>
                  item[queryItem]
                    ?.toLowerCase()
                    .includes(searchValue.toLowerCase())
              )

              return Boolean(matches.length > 0);
            }
        ) as any[]
      );
    }
  };

  useEffect(() => {
    searchAction("");
  }, []);

  return (
    <div className="flex gap-3 items-center">
      <Input
        name="search"
        type="search"
        placeholder="Search for anything..."
        onChange={(e) => searchAction(e.target.value)}
        style={{
          width: "300px",
          border: "1px solid #EEE",
        }}
      />
      <FilterComponent options={matchQuery} setOptions={setOptions} />
      <ExportButton />
    </div>
  );
};

export default DashboardAction;
