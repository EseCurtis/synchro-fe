import React from 'react';
import { SlCalender } from 'react-icons/sl';
import { BiBell } from 'react-icons/bi';
import moment from 'moment';
import Image from 'next/image';

const DashboaradHeader = () => {
  return (
    <div
      className='flex justify-between'
      style={{
        borderBottom: '1px solid gray',
      }}
    >
      <div>
        <p>Dashboard</p>
      </div>

      <div className='flex items-center gap-3'>
        <div className='flex items-center gap-3'>
          <SlCalender />
          <p>{moment().format('DD MM YYYY')}</p>
        </div>

        <BiBell />
      </div>
    </div>
  );
};

export default DashboaradHeader;
