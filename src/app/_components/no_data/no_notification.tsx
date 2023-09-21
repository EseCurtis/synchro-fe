import React from 'react';
import { Button } from '../button';
import { NoRoleSvg } from '../icons';

const NoNotification = () => {
  return (
    <div className='w-[328px] my-[4em] text-center mx-auto '>
      <center>
        <div className='my-5'>{NoRoleSvg}</div>
      </center>

      <h3 className='font-bold'>Send push notifications</h3>
      <p className='text-second_primary_text text-center'>
        Click on the button to send a broadcast notifications.
      </p>
      <Button>Send Notifications</Button>
    </div>
  );
};

export default NoNotification;
