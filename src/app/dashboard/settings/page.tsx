import TabComponent from '@/app/_components/tab';
import DashboardLayout from '@/app/layouts/dashboardLayout';
import React from 'react';
import ProfileInfo from './views/profile_info';
import FeesConfigurations from './views/fees_configuration';
import Categories from './views/Catgories';

const data = [
  {
    header: 'Profile Information',
    component: <ProfileInfo />,
  },
  {
    header: 'Fee Configuration ',
    component: <FeesConfigurations />,
  },
  {
    header: 'Categories ',
    component: <Categories />,
  },
];
const Faqs_and_notifications = () => {
  return (
    <DashboardLayout title='Settings'>
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Faqs_and_notifications;
