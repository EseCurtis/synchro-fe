import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';

import UsersReport from './views/report_users';
import EventsReports from './views/events';
import VenuesReport from './views/venuesReport';
import ServicesReports from './views/servicesReport';

const data = [
  {
    header: 'Users',
    component: <UsersReport />,
  },
  {
    header: 'Events ',
    component: <EventsReports />,
  },
  {
    header: 'Venues ',
    component: <VenuesReport />,
  },
  {
    header: 'Services ',
    component: <ServicesReports />,
  },
];
const ReportIssues = () => {
  return (
    <DashboardLayout title='Report Issues'>
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default ReportIssues;
