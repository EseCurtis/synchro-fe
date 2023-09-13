import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarNavs } from '@/utils/contents/sidebarNavs';

const listStyle = {
  listStyleType: 'none',
};

const DashboardBoardSidebar = () => {
  return (
    <div className='w-[260px] py-5 px-5  h-[100vh] '>
      <div>
        <Image
          src={'/images/synco_logo.png'}
          width={100}
          height={20}
          alt='Logo'
        />
      </div>

      <div className='my-[3em]'>
        <ul style={listStyle}>
          {SidebarNavs.map((_, index) => (
            <>
              <Link href={_.path}>
                <li
                  className='py-[14px] '
                  style={{
                    color: '#718096',
                  }}
                >
                  {_.title}
                </li>
              </Link>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardBoardSidebar;
