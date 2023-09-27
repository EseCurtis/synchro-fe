import React, { FC } from "react";

interface IProps {
  offset?: any;
  pages?: any;
}

const TablePagination: FC<IProps> = ({ offset = 3, pages = 320 }: IProps) => {
  return (
    <>
      <div className="flex justify-between mt-4 p-8">
        <div className="flex items-left gap-3 page-count">
          <p>{offset}</p>
          <p>of</p>
          <p>{pages}</p>
        </div>

        <div className="flex items-right gap-3 page-count">
          <p>{"<"}</p>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>{">"}</p>
        </div>
      </div>
    </>
  );
};

export default TablePagination;
