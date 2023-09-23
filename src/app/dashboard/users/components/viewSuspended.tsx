import { Button } from '@/app/_components/button';
import React from 'react';

const ViewSuspended = () => {
  return (
    <div>
      <div className='text-center my-5'>
        <div className='  my-3 mx-auto bg-slate-500 w-[84px] h-[84px] rounded-full'></div>

        <div>
          <h3>Auer and Sons</h3>
          <p className='text-[#777E90]'>Tara_Mante99</p>
        </div>

        <div className='bg-gray-300  cursor-pointer w-[fit-content] py-[.6em] my-[1em] rounded-lg px-5 mx-auto '>
          View full profile
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='flex flex-col gap-3'>
          <h4 className='text-[#5D6D73]'>Phone number</h4>
          <h4 className='text-[#5D6D73]'>Phone number</h4>
          <h4 className='text-[#5D6D73]'>Phone number</h4>
          <h4 className='text-[#5D6D73]'>Phone number</h4>
        </div>

        <div className='flex flex-col gap-3'>
          <h4 className='text-black'>08012345678</h4>
          <h4 className='text-black'>Jessica.hanson@example.com</h4>
          <h4 className='text-black'>Lorem ipsum dolor sit ame</h4>
          <h4 className='text-black'>Ese Curtis</h4>
        </div>
      </div>
      <div className=' mt-5 flex gap-4 items-center'>
        <Button>Activate User</Button>
        <Button>Cancel</Button>
      </div>
    </div>
  );
};

export default ViewSuspended;
