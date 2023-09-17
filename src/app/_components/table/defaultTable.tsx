import React, { FC, ReactNode } from 'react';

interface IProps {
  header: [];
  children: ReactNode;
}
const DefaultTable: FC<IProps> = ({ header, children }: IProps) => {
  return (
    <>
      <table className='min-w-full bg-white'>
        <thead>
          <tr>
            {header?.map((_, key) => {
              return (
                <th
                  key={key}
                  className='px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-gray-600 uppercase tracking-wider'
                >
                  {_}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default DefaultTable;
