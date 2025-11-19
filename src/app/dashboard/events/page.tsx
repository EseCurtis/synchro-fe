import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import DeclinedEvents from "./views/declined";
import ApprovedEvents from "./views/approved";
import React from "react";
import PendingEvents from "./views/pending";

const data = [
  {
    header: "Approved Events",
    component: <ApprovedEvents />,
  },
  {
    header: "Pending Events",
    component: <PendingEvents />,
  },
  {
    header: "Declined Events",
    component: <DeclinedEvents />,
  },
];

const Events = () => {
  return (
    <DashboardLayout title="Events" quantity="123K">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Events;
