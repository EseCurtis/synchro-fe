import React, { FC } from 'react';

interface IPropsBadge {
  status: 'Active' | 'Inactive' | 'Disabled' | 'Pending';
}

const Badge: FC<IPropsBadge> = ({ status }: IPropsBadge) => {
  let badge_status;
  if (status === 'Active') {
    badge_status = '#2EB8721F';
  } else if (status === 'Pending') {
    badge_status = 'yellow';
  } else {
    badge_status = 'blue';
  }
  return (
    <div
      className={
        ' w-[fit-content] px-[15px] flex justify-center rounded-xl py-[2px] '
      }
      style={{
        background: 'red',
      }}
    >
      <p className={'font-600 text-success_text'}>{status}</p>
    </div>
  );
};

export default Badge;
