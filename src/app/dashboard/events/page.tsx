import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';

const data = [
  {
    header: 'Home',
    route: 'Saved',
  },
  {
    header: 'Profile',
    route: 'Profile',
  },
  {
    header: 'Settings',
    route: 'Settings',
  },
  // Add more objects here as needed
];

const Events = () => {
  return (
    <DashboardLayout title='Events'>
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Events;
