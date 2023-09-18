import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';
import ApprovedKyc from './views/approved';

const data = [
  {
    header: 'Approved',
    component: <ApprovedKyc />,
  },
  {
    header: 'Pending ',
    component: '<PendingService />',
  },
  {
    header: 'Decline ',
    component: '<DeclineServices />',
  },
];
const Kyc = () => {
  return (
    <DashboardLayout title='Service'>
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Kyc;
