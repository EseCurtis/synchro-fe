"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SidebarNavs } from '@/utils/contents/sidebarNavs';
import { usePathname } from "next/navigation"

const listStyle = {
  listStyleType: 'none',
};

const listTextStyleActive = {
  color: 'transparent',
  backgroundImage: 'linear-gradient(45deg, blue, red)', // Replace with your gradient colors
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
}

const DashboardBoardSidebar = () => {
  const pathname = usePathname()

  return (
    <div
      className='w-[260px] py-5 px-5  h-[100vh]'
      style={{
        borderRight: '1px solid #CED3E4',
      }}
    >
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
            <Link href={_.path} key={index}>
              <li
                className='py-[14px] rounded-md p-4 flex items-center gap-[16px] '
                style={{
                  color: '#718096',
                  background:
                    _.path === pathname ? 'rgba(233, 160, 132, 0.12)' : '',
                }}
              >
                <Image src={ _.active } width={24} height={24} alt='icons' style={{ display: _.path === pathname ?  "unset" : "none" }} />
                <Image src={ _.img } width={24} height={24} alt='icons' style={{ display: _.path === pathname ?  "none" : "unset" }} />
                <span className={(_.path === pathname) ? " text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-pink-600" : ""}>
                  {_.title}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardBoardSidebar;
