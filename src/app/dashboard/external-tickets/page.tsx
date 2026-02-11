"use client";

import { AdminRouteGuard } from "@/app/_components/auth/AdminRouteGuard";
import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import AllTicketsView from "./views/all";
import FulfilledTicketsView from "./views/fulfilled";
import PendingTicketsView from "./views/pending";

export default function ExternalTicketsPage() {
  const tabs = [
    { header: "Pending Tickets", component: <PendingTicketsView status="pending" viewMode="pending" /> },
    { header: "Fulfilled", component: <FulfilledTicketsView /> },
    { header: "All Tickets", component: <AllTicketsView /> },
  ];

  return (
    <AdminRouteGuard requiredRole="admin">
      <DashboardLayout title="External Tickets" quantity="">
        <TabComponent data={tabs as any} />
      </DashboardLayout>
    </AdminRouteGuard>
  );
}
