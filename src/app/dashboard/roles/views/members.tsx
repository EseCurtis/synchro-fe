'use client';
import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';
import NoRolesMember from '@/app/_components/no_data/no_member';
import { useState } from 'react';
import { Button } from '@/app/_components/button';
import Badge from '@/app/_components/forms/badge';

const header = ['User', 'Role', 'Status', 'Last Active', 'Date Added'];
const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';

const MembersPage = () => {
  const [timer, setTimer] = useState<boolean>(true);
  setTimeout(() => {
    setTimer(false);
  }, 2500);

  return (
    <div>
      {timer ? (
        <NoRolesMember />
      ) : (
        <>
          <div className='flex justify-between my-9'>
            <DashboardAction />
            <div className='w-[200px]'>
              <Button>Add member</Button>
            </div>
          </div>
          {/* @ts-ignore */}
          <DefaultTable header={header}>
            {table?.map((_, key: number) => {
              return (
                <tr key={key}>
                  <td className={style}>
                    <div className='flex gap-5 items-center'>
                      {/* <div className='w-[3em] h-[3em] bg-gray-500 rounded-full'></div> */}
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
                    {/* @ts-ignore */}
                    <Badge status={_.status} />
                  </td>
                  <td className={style}>
                    <h3>{_.number}</h3>
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
        </>
      )}
    </div>
  );
};

export default MembersPage;
