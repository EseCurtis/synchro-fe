import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import DeclinedEvents from './views/declined';
import ApprovedEvents from './views/approved';
import React from 'react';

const data = [
  {
    header: 'Pending Events',
    //TODO: calender..
    component: 'Loading...',
  },
  {
    header: 'Approved Events',
    component: <ApprovedEvents/>,
  },
  {
    header: 'Declined Events',
    component: <DeclinedEvents/>,
  },
  
  // Add more objects here as needed
];

const Events = () => {
  return (
    <DashboardLayout title='Events' quantity="123K">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Events;
