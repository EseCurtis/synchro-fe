import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import React from "react";
import ActiveUsers from "./views/activeUsers";
import SuspendedUsers from "./views/suspendedUsers";
import DeletedUsers from "./views/deletedUsers";

const data = [
  {
    header: "Active Users",
    component: <ActiveUsers />,
  },
  {
    header: "Suspended Users",
    component: <SuspendedUsers />,
  },
  {
    header: "Deleted Users",
    component: <DeletedUsers />,
  },
];

const Users = () => {
  return (
    <DashboardLayout title="Users" quantity="123K">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Users;
