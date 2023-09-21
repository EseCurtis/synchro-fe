import React from 'react';
import { Button } from '../button';
import { NoRoleSvg } from '../icons';

const NoRolesMember = () => {
  return (
    <div className='w-[328px] my-[4em] text-center mx-auto '>
      <center>
        <div className='my-5'>{NoRoleSvg}</div>
      </center>

      <h3 className='font-bold'>Add an FAQ</h3>
      <p className='text-second_primary_text text-center'>
        Click on the button to add an FAQ to the system
      </p>
      <Button>Add FAQ</Button>
    </div>
  );
};

export default NoRolesMember;
