"use client";

import customStyles from "@/app/_components/customStyles/index.module.css";
import AppSkeleton from "@/app/_components/skeleton/AppSkeleton";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouterO } from "@/v2/hooks/use-router";
import { FC, ReactNode } from "react";
import DashboaradHeader from "../_components/dashboard/dashboardHeader";
import DashboardBoardSidebar from "../_components/dashboard/dashboardSidebar";
import { LoadingScreen } from "./LoadingScreen";

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
  const { user, isLoading } = useAuthContext();
  const { push } = useRouterO();

  // Show app skeleton while loading user data
  if (isLoading) {
    return <AppSkeleton contentType="dashboard" />;
  }

  if (typeof window !== "undefined" && !user) {
    push("/");
    return <LoadingScreen />;
  }

  return (
    <div className="flex w-[100%]">
      <div
        className={`${customStyles.customScrollbar} h-[100vh] w-[380px] overflow-scroll overflow-x-hidden pb-[2em]`}
      >
        <DashboardBoardSidebar />
      </div>
      <div className="w-full h-screen px-4 mx-auto pl-7 overflow-y-scroll main-board">
        <DashboaradHeader title={title!} quantity={quantity} />
        <div className="my-[2em]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
