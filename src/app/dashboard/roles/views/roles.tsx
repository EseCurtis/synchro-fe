import RolesAndPermission from '@/app/_components/no_data/roles_and_permission';
import React from 'react';
import RolesComponent from '../components/roles_box';

const RolesPage = () => {
  return (
    <div>
      <RolesAndPermission />
      <RolesComponent role='Admin' content='Lorem' />
    </div>
  );
};

export default RolesPage;
