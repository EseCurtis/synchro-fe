import Delete_Circle from '@/app/_components/icons/delete_circle';
import { pencil_edit } from '@/app/_components/icons/pencil_edit_icon';
import React from 'react';

const FaqBox = () => {
  return (
    <div
      className='  py-5 px-3 rounded-md lg: w-[535px]'
      style={{
        border: '1.5px solid #EDEFF5',
      }}
    >
      <div className='flex gap-5 items-center justify-between'>
        <h2 className=' font-bold'>Use the mobile USB pixel...</h2>
        <div className='flex gap-3 items-center'>
          {pencil_edit}
          <Delete_Circle />
        </div>
      </div>
      <p className='my-3 text-second_primary text-other_text'>
        Lorem ipsum dolor sit amet consectetur. In placerat scelerisque vitae
        nibh pellentesque. Ultricies sagittis lobortis quam eros sit proin neque
        potenti nisi. Faucibus suspendisse imperdiet sagittis sem ut id neque
        dolor cras. Vitae accumsan cras leo in.
      </p>
    </div>
  );
};

export default FaqBox;
