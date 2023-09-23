import Delete_Circle from '@/app/_components/icons/delete_circle';
import { pencil_edit } from '@/app/_components/icons/pencil_edit_icon';
import React, { ReactNode, FC } from 'react';

interface IPropsCat {
  icon: ReactNode;
  name: string;
}

const styles = {
  border: '1px solid #E2E8F0',
};
const Categories: FC<IPropsCat> = ({ icon }) => {
  return (
    <div
      className=' w-[300px] px-5 rounded-md flex items-center justify-between'
      style={styles}
    >
      <div className='flex gap-3 items-center'>
        icon
        <h4>Motivation</h4>
      </div>
      <div className='flex gap-4 items-center'>
        <div>{pencil_edit}</div>
        <Delete_Circle />
      </div>
    </div>
  );
};

export default Categories;
