import React from 'react';
import FilterComponent from '../forms/filterComponent';
import Input from '../input_fields';
import ExportButton from '../forms/exportButton';

const DashboardAction = () => {
  return (
    <div className='flex gap-3 items-center'>
      <Input name='search' type='search' placeholder='Search for anything...' />
      <FilterComponent />
      <ExportButton />
    </div>
  );
};

export default DashboardAction;
