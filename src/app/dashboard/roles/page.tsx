import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import React from "react";
import RolesPage from "./views/roles";
import MembersPage from "./views/members";

const data = [
  {
    header: "Roles",
    component: <RolesPage />,
  },
  {
    header: "Members ",
    component: <MembersPage />,
  },
];

const Roles = () => {
  return (
    <DashboardLayout title="Roles & Permissions">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};
export default Roles;
