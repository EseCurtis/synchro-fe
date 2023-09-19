import React from 'react';
import { Button } from '../button';
import { NoRoleSvg } from '../icons';

const NoRolesMember = () => {
  return (
    <div className='w-[328px] my-[4em] text-center mx-auto '>
      <center>
        <div className='my-5'>{NoRoleSvg}</div>
      </center>

      <h3>Add a Member</h3>
      <p className='text-text_primary text-center'>
        Click on the button below to add a member to your backoffice.
      </p>
      <Button>Add Role</Button>
    </div>
  );
};

export default NoRolesMember;
