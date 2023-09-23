'use client';
import DashboardAction from '@/app/_components/dashboard/dashboardAction';
import DefaultTable from '@/app/_components/table/defaultTable';
import { table } from '@/utils/contents/dummy/table';
import React from 'react';
import Modal from '@/app/_components/popups/modal';
import { useState } from 'react';
import ViewSuspended from '../components/viewSuspended';

const header = [
  'Fullname ',
  'Username',
  'Reasons',
  'Duration',
  'Date Suspended',
];

const style = 'px-6 py-4 whitespace-no-wrap border-b border-gray-300';

const suspend_Icon = (
  <svg
    cursor='pointer'
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g id='user-check'>
      <path
        id='user-check_2'
        d='M11.778 8.29598C11.65 8.29598 11.522 8.24733 11.4246 8.14933L10.3133 7.038C10.118 6.84334 10.118 6.52598 10.3133 6.33065C10.5086 6.13531 10.8253 6.13531 11.0207 6.33065L11.7786 7.08797L13.6473 5.21932C13.8426 5.02399 14.1593 5.02399 14.3547 5.21932C14.55 5.41465 14.55 5.73134 14.3547 5.92668L12.1327 8.14868C12.034 8.24735 11.906 8.29598 11.778 8.29598ZM9.50602 4.33333C9.50602 2.77133 8.23536 1.5 6.67269 1.5C5.11002 1.5 3.83936 2.77133 3.83936 4.33333C3.83936 5.89533 5.11002 7.16667 6.67269 7.16667C8.23536 7.16667 9.50602 5.89533 9.50602 4.33333ZM8.50602 4.33333C8.50602 5.34467 7.68402 6.16667 6.67269 6.16667C5.66136 6.16667 4.83936 5.34467 4.83936 4.33333C4.83936 3.322 5.66136 2.5 6.67269 2.5C7.68402 2.5 8.50602 3.322 8.50602 4.33333ZM11.8333 12.0127C11.8333 10.2387 10.8293 8.16667 8 8.16667H5.33333C2.504 8.16667 1.5 10.238 1.5 12.0127C1.5 13.6167 2.3887 14.5 4.00203 14.5H9.3313C10.9446 14.5 11.8333 13.6167 11.8333 12.0127ZM8 9.16667C10.6287 9.16667 10.8333 11.3447 10.8333 12.0127C10.8333 13.0554 10.384 13.5 9.3313 13.5H4.00203C2.94937 13.5 2.5 13.0554 2.5 12.0127C2.5 11.3454 2.70467 9.16667 5.33333 9.16667H8Z'
        fill='#15A336'
      />
    </g>
  </svg>
);

const SuspendedUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

              <td className={style}>
                <h3 onClick={openModal}>{suspend_Icon}</h3>
              </td>
            </tr>
          );
        })}
      </DefaultTable>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ViewSuspended />
      </Modal>
    </div>
  );
};

export default SuspendedUsers;
