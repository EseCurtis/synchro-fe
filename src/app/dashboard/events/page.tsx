import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';

const data = [
  {
    header: 'Home',
    component: 'Saved',
  },
  {
    header: 'Profile',
    component: 'Profile',
  },
  {
    header: 'Settings',
    component: 'Settings',
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
