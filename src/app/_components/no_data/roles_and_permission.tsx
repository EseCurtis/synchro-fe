import React from 'react';
import { Button } from '../button';
import { NoRoleSvg } from '../icons';

const RolesAndPermission = () => {
  return (
    <div className='w-[328px] my-[4em] text-center mx-auto '>
      <center>
        <div className='my-5'>{NoRoleSvg}</div>
      </center>

      <h3>Add a role</h3>
      <p className='text-text_primary text-center'>
        Click on the button to set up roles for your backoffice
      </p>
      <Button>Add Role</Button>
    </div>
  );
};

export default RolesAndPermission;
