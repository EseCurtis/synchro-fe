import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';

const header = [
  'Fullname Name ',
  'Reported By',
  'Reasons',
  'Date Reported',
  '',
];
const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';
const UsersReport = () => {
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
                <h3>{_.name}</h3>
              </td>
              <td className={style}>
                <h3>{_.gender}</h3>
              </td>
              <td className={style}>
                <h3>{_.number}</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
            </tr>
          );
        })}
      </DefaultTable>
    </div>
  );
};

export default UsersReport;
