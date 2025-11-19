"use client";
import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import React from "react";
import EventsView from "./views/events";
import ComingSoon from "./views/coming-soon";

const data = [
  {
    header: "Events",
    component: <EventsView />,
  },
  {
    header: "Venues (Coming Soon)",
    component: <ComingSoon type="Venues" />,
  },
];

const ScrapedDataPage = () => {
  return (
    <DashboardLayout title="Scraped Data Management">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default ScrapedDataPage;

