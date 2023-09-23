import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';
import ApprovedVenues from './views/approved';
import PendingVenues from './views/pending';
import DeclinedVenues from './views/declined';

const data = [
  {
    header: 'Approved venues',
    component: <ApprovedVenues />,
  },
  {
    header: 'Pending venues',
    component: <PendingVenues />,
  },
  {
    header: 'Declined venues',
    component: <DeclinedVenues />,
  },
];
const Kyc = () => {
  return (
    <DashboardLayout title='Venues' quantity='123K'>
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Kyc;
