import React, { FC, ReactNode } from "react";

interface IProps {
  header: (string | ReactNode)[];
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
                  className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 text-gray-600 capitalize tracking-wider"
                >
                  {/* @ts-ignore */}
                  {_}
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
