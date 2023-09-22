'use client';
import NoNotifications from '@/app/_components/no_data/no_notification';
import React, { Fragment, useState } from 'react';
import NotificationBox from '../components/notificationBox';
import { Button } from '@/app/_components/button';

const Notifications = () => {
  const [view, setView] = useState(true);

  setTimeout(() => {
    setView(false);
  }, 3500);
  return (
    <div>
      {view ? (
        <NoNotifications />
      ) : (
        <div>
          <div className='flex justify-between my-10 items-center'>
            <h2 className='font-bold'>All push notifications</h2>

            <div>
              <Button>Send Notification</Button>
            </div>
          </div>
          <div className='flex gap-[2em] flex-col'>
            {[1, 2, 3, 4].map((_, key) => (
              <Fragment key={key}>
                <NotificationBox />
              </Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
