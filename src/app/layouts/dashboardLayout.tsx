import { FC, ReactNode } from 'react';
import DashboaradHeader from '../_components/dashboard/dashboardHeader';
import DashboardBoardSidebar from '../_components/dashboard/dashboardSidebar';

interface IDashboardLayout {
  children: ReactNode;
  title?: string;
}

const DashboardLayout: FC<IDashboardLayout> = ({ children, title }) => {
  return (
    <div className='flex'>
      <div className=''>
        <DashboardBoardSidebar />
      </div>
      <div className='w-[1148px] py-5 px-4 mx-auto  '>
        <DashboaradHeader title={title} />
        <div className='my-[2em]'>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
