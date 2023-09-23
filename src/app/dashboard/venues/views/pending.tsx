import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';

const header = [
  'Venue ',
  'Location',
  'Price',
  'Total Earned',
  'Date Created',
  '',
];

const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';
const PendingVenues = () => {
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
                <h3 className="underline">{_.location}</h3>
              </td>
              <td className={style}>
                <h3>$120</h3>
              </td>
              <td className={style}>
                <h3>$12,452</h3>
              </td>
              <td className={style}>
                <h3>{_.date}</h3>
              </td>
              <td className={style}>
                <img src="./images/icons/dashboard/tables/menu.svg"  width={32} height={11} alt="" />
              </td>
            </tr>
          );
        })}
      </DefaultTable>
    </div>
  );
};

export default PendingVenues;
