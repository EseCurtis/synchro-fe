import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import React from "react";
import Faqs from "./view/faq";
import Notifications from "./view/notification";

const data = [
  {
    header: "NOTIFICATIONS ",
    component: <Notifications />,
  },
  {
    header: "FAQs",
    component: <Faqs />,
  },
];
const Faqs_and_notifications = () => {
  return (
    <DashboardLayout title="KYC">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Faqs_and_notifications;
