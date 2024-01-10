import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import React from "react";

import UsersReport from "./views/report_users";
import EventsReports from "./views/events";
import VenuesReport from "./views/venuesReport";
import ServicesReports from "./views/servicesReport";
import FeedsReport from "./views/feed_reports";

const data = [
  {
    header: "User",
    component: <UsersReport />,
  },
  {
    header: "Events ",
    component: <EventsReports />,
  },
  {
    header: "Feeds ",
    component: <FeedsReport />,
  },
  // {
  //   header: "Services ",
  //   component: <ServicesReports />,
  // },
];
const ReportIssues = () => {
  return (
    <DashboardLayout title="Reported Issues" quantity="123K">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default ReportIssues;
