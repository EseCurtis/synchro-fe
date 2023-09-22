import NoNotifications from '@/app/_components/no_data/no_notification';
import React from 'react';
import NotificationBox from '../components/notificationBox';

const Notifications = () => {
  return (
    <div>
      <NoNotifications />
      <NotificationBox />
    </div>
  );
};

export default Notifications;
