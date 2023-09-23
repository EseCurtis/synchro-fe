import React from 'react';
import { SlCalender } from 'react-icons/sl';
import { BiBell } from 'react-icons/bi';
import moment from 'moment';

const DashboaradHeader = ({ title, quantity }: { title: any, quantity: any }) => {
  return (
    <div
      className='flex justify-between '
      style={{
        borderBottom: '1px solid #EDEFF5',
        padding: '1em ',
      }}
    >
      <div className='flex items-left gap-5'>
        <p className='font-bold'>{title}</p>
        {quantity ? <p className="text-green-200">{quantity}</p> : ""}
      </div>

      <div className='flex items-center justify-between gap-[4em]'>
        <div className='flex items-center gap-3'>
          <SlCalender size={'1.5em'} />
          <p className='font-400'>{moment().format('DD MM YYYY')}</p>
        </div>

        <div className='bg-gray-100  w-[3em] h-[3em] flex items-center justify-center rounded-full '>
          <BiBell size={'1.5em'} />
        </div>

        <div className='flex gap-2 items-center'>
          <div className='w-[41px] h-[41px] rounded-full bg-gray-500'></div>
          <h3>Barbara Riley</h3>
        </div>
      </div>
    </div>
  );
};

export default DashboaradHeader;
