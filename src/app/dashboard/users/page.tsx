import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';
import ActiveUsers from './views/activeUsers';

const data = [
  {
    header: 'Active Users',
    component: <ActiveUsers />,
  },
  {
    header: 'Suspended Users',
    component: 'suspended users users',
  },
  {
    header: 'Deleted Users',
    component: 'Actice users',
  },
];
const Users = () => {
  return (
    <DashboardLayout title='Users'>
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Users;
