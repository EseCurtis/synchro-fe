import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import TablePagination from '@/app/_components/table/tablePagination';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';

const header = [
  'Business Name ',
  'Doc Type',
  'File Upload',
  'Date Submitted',
  '',
  '',
];
const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';
const PendingKyc = () => {
  return (
    <div>
      <DashboardAction />
      {/* @ts-ignore */}
      <DefaultTable header={header}>
        {table?.map((_, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div className='flex gap-5 items-center'>
                  <div className='w-[3em] h-[3em] bg-gray-500 rounded-full'></div>
                  <div>
                    <h3>{_.name}</h3>
                    <p className='text-second_primary_text'>{_.email}</p>
                  </div>
                </div>
              </td>
              <td className={style}>
                <h3>Legal Document</h3>
              </td>
              <td className={style}>
                <h3 className="underline">Legal Document.pdf</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
              <td className={style}>
                <div className="flex gap-5 items-center">
                  <img src="./images/icons/dashboard/table/tick.svg" width={32} height={32} alt="" />
                  <img src="./images/icons/dashboard/table/times.svg" width={32} height={32} alt="" />
                </div>
              </td>
              <td className={style}>
                <img src="./images/icons/dashboard/table/menu.svg"  width={32} height={11} alt="" />
              </td>
            </tr>
          );
        })}
      </DefaultTable>
      <TablePagination />
    </div>
  );
};

export default PendingKyc;
