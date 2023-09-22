import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';

const header = [
  'Business Name ',
  'Doc Type',
  'File Uploaded',
  'Status',
  'Date Approved',
  '',
];

const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';
const ApprovedEvents = () => {
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
                <h3 className="bg-aqua-100 text-aqua-300 rounded-full">Approved</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
              <td className={style}>
                <h3 className="text-sm text-second_primary_text ">•••</h3>
              </td>
            </tr>
          );
        })}
      </DefaultTable>
    </div>
  );
};

export default ApprovedEvents;
