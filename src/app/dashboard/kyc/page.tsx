import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import React from "react";
import ApprovedKyc from "./views/approved";
import PendingKyc from "./views/pending";
import DeclinedKyc from "./views/declined";

const data = [
  {
    header: "Pending ",
    component: <PendingKyc />,
  },
  {
    header: "Approved",
    component: <ApprovedKyc />,
  },
  {
    header: "Declined ",
    component: <DeclinedKyc />,
  },
];
const Kyc = () => {
  return (
    <DashboardLayout title="KYC">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Kyc;
