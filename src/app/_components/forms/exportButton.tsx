import React from 'react';
import { PiExport } from 'react-icons/pi';

const ExportButton = () => {
  return (
    <button
      className='flex gap-4 items-center text-text_primary rounded-md py-[8px] px-[14px]'
      style={{
        border: '1px solid #EEE',
      }}
    >
      <PiExport /> Export
    </button>
  );
};

export default ExportButton;
