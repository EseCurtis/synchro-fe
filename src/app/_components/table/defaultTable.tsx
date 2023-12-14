import React, { FC, ReactNode } from "react";

interface IProps {
  header: [];
  children: ReactNode;
}
const DefaultTable: FC<IProps> = ({ header, children }: IProps) => {
  return (
    <div className="min-w-full">
      <table className="w-full overflow-x-scroll bg-white">
        <thead>
          <tr>
            {header?.map((_, key) => {
              return (
                <th
                  key={key}
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider"
                >
                  {/* @ts-ignore */}
                  {_?.toUpperCase()}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default DefaultTable;
