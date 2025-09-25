"use client";

import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import ApprovedServices from "./views/approved";
import DeclineServices from "./views/delinedServices";
import PendingService from "./views/pendingService";
const data = [
  {
    header: "Approved services",
    component: <ApprovedServices />,
  },
  {
    header: "Pending Services",
    component: <PendingService />,
  },
  {
    header: "Decline service",
    component: <DeclineServices />,
  },
];
const Service = () => {
  return (
    <DashboardLayout title="Service" quantity="123K">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Service;
