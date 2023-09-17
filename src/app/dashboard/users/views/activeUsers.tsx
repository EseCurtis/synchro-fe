import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';

const header = ['Fullname ', 'Username', 'Phone Number'];
const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';
const ActiveUsers = () => {
  return (
    <div>
      <DashboardAction />

      <DefaultTable header={header}>
        {table?.map((_, key: number) => {
          return (
            <tr key={key}>
              <td className={style}>
                <div>
                  <h3>{_.name}</h3>
                  <p className='text-primary_text'>{_.email}</p>
                </div>
              </td>
              <td>
                <h3>{_.name}</h3>
              </td>
            </tr>
          );
        })}
      </DefaultTable>
    </div>
  );
};

export default ActiveUsers;
