import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';
import PersonalDetails from '../views/personalDetails';
import MembersView from '../views/member';
import ViewUsers from '../views/viewUsers';
import ViewUsersWallet from '../views/usersWallet';
import ViewUserEvent from '../views/viewUsersEvent';
import ViewUserVenues from '../views/viewUserVenues';
import ViewUserService from '../views/viewUserService';

const data = [
  {
    header: 'Personal Details',
    component: <PersonalDetails />,
  },
  {
    header: 'Business Details ',
    component: <MembersView />,
  },
  {
    header: 'Users ',
    component: <ViewUsers />,
  },
  {
    header: 'Wallet ',
    component: <ViewUsersWallet />,
  },
  {
    header: 'Events ',
    component: <ViewUserEvent />,
  },
  {
    header: 'Venues ',
    component: <ViewUserVenues />,
  },
  {
    header: 'Services ',
    component: <ViewUserService />,
  },
];

const PreviewBox = () => {
  return (
    <DashboardLayout title='User details'>
      <div className='my-5 flex gap-5 items-center '>
        <div className='w-[80px] h-[80px] rounded-full bg-gray-500'></div>
        <div>
          <h3>Courtney Henry</h3>
          <span className='text-second_text'>jessica.hanson@example.com</span>
        </div>
      </div>

      <div className='my-10'>
        <TabComponent data={data} />
      </div>
    </DashboardLayout>
  );
};

export default PreviewBox;
