import { Button } from '@/app/_components/button';
import React from 'react';
import { SecondaryButton } from '@/app/_components/button/secondaryButton';

const ViewSuspended = () => {
  return (
    <div>
      <div className="flex justify-center">
        <h3 className="font-bold">User Details</h3>
      </div>
      <div className='text-center my-5'>
        <div className='  my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full'></div>

        <div>
          <h3>Auer and Sons</h3>
          <p className='text-[#777E90] text-[13px]'>Tara_Mante99</p>
        </div>

        <div className='bg-gray-300 text-[13px] cursor-pointer w-[fit-content] py-[.6em] my-[1em] rounded-full px-5 mx-auto '>
          View full profile
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='flex flex-col gap-5'>
          <h4 className='text-[#5D6D73] text-sm'>Phone number</h4>
          <h4 className='text-[#5D6D73] text-sm'>Email Address</h4>
          <h4 className='text-[#5D6D73] text-sm'>Total followers</h4>
          <h4 className='text-[#5D6D73] text-sm'>Reasons for suspension</h4>
          <h4 className='text-[#5D6D73] text-sm'>Suspended by</h4>
          <h4 className='text-[#5D6D73] text-sm'>Date Suspended</h4>
        </div>

        <div className='flex flex-col gap-5 text-right'>
          <h4 className='text-black text-sm font-bold'>08012345678</h4>
          <h4 className='text-black text-sm font-bold'>Jessica.hanson@example.com</h4>
          <h4 className='text-black text-sm font-bold'>1,320 users</h4>
          <h4 className='text-black text-sm font-bold'>Lorem ipsum dolor sit amet.</h4>
          <h4 className='text-black text-sm font-bold'>Ese Curtis</h4>
          <h4 className='text-black text-sm font-bold'>11:32pm, May 3rd, 2021</h4>
        </div>
      </div>
      <div className='mt-7 flex gap-4 items-center'>
        <Button>Activate User</Button>
        <SecondaryButton>Cancel</SecondaryButton>
      </div>
    </div>
  );
};

export default ViewSuspended;
