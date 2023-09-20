import React from 'react';
import DashboardLayout from '../layouts/dashboardLayout';
import Image from 'next/image';
import { formatNumber } from '@/utils/formatNumber';

const data = [
  {
    title: 'Total Users',
    amount: 10990,
    img: '/images/icons/dashboard/user.svg',
  },
  {
    title: 'Total Events',
    amount: 2000,
    img: '/images/icons/dashboard/calender_icon.svg',
  },
  {
    title: 'Total Venues',
    amount: 90300,
    img: '/images/icons/dashboard/building.svg',
  },
  {
    title: 'Total Services',
    amount: 23000,
    img: '/images/icons/dashboard/user_dollar.svg',
  },
];

const DashboardIndex = () => {
  return (
    <DashboardLayout title='Dashboard'>
      <div>
        <h1>
          Welcome{' '}
          <span
            style={{
              fontWeight: 'bold',
            }}
          >
            Ese Curtis
          </span>{' '}
          👋
        </h1>
      </div>

      <div className='flex justify-between my-9 gap-[23px]'>
        {data.map((items, index) => {
          return (
            <>
              <div
                className='w-[350px] py-[24px] px-[40px] rounded-lg  '
                style={{
                  border: '1px solid #EDEFF5',
                }}
                key={index}
              >
                <Image src={items.img} width={40} height={40} alt={'icon'} />
                <div className='my-[1.5em]'>
                  <p className='text-text_primary'>{items.title}</p>
                  <h3
                    className='font-bold '
                    style={{
                      fontSize: '24px',
                      fontWeight: '700',
                    }}
                  >
                    {formatNumber(items.amount)}
                  </h3>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className='flex justify-between gap-[20px]'>
        <div
          className='w-[50%] h-[250px] rounded-lg p-[16px] '
          style={{
            border: '1px solid #EDEFF5',
          }}
        >
          <h3 className='text-[16px] font-bold'>Users most active period</h3>

          <center>
            <h4 className='my-5'> Cant Load Data</h4>
          </center>
        </div>

        {/* gender  */}
        <div
          className='w-[50%] h-[250px] rounded-lg p-[16px] '
          style={{
            border: '1px solid #EDEFF5',
          }}
        >
          <h3 className='text-[16px] font-bold'>Gender</h3>

          <div>
            <Image
              src={'/images/donut.svg'}
              width={204}
              height={210}
              alt={'icon'}
              className='mx-auto'
            />
          </div>
        </div>
      </div>

      {/* Transaction graph */}
      <div
        className='w-full h-[250px] my-5 rounded-lg p-[16px] '
        style={{
          border: '1px solid #EDEFF5',
        }}
      >
        <h3 className='text-[16px] font-bold'>Transaction graph with time</h3>
        <center>
          <h4 className='my-5'> Cant Load Data</h4>
        </center>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
