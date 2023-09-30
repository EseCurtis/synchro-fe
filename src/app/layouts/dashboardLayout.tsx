import { FC, ReactNode } from "react";
import DashboaradHeader from "../_components/dashboard/dashboardHeader";
import DashboardBoardSidebar from "../_components/dashboard/dashboardSidebar";
import customStyles from "@/app/_components/customStyles/index.module.css";

interface IDashboardLayout {
  children: ReactNode;
  title?: string;
  quantity?: string;
}

const DashboardLayout: FC<IDashboardLayout> = ({
  children,
  title,
  quantity,
}) => {
  return (
    <div className="flex w-[100%]">
      <div
        className={`${customStyles.customScrollbar} h-[100vh] overflow-scroll overflow-x-hidden pb-[2em]`}
      >
        <DashboardBoardSidebar />
      </div>
      <div className="w-[1148px] h-[100vh] px-4 mx-auto pl-7 overflow-y-scroll">
        <DashboaradHeader title={title!} quantity={quantity} />
        <div className="my-[2em]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
