"use client";

import { AdminRouteGuard } from "@/app/_components/auth/AdminRouteGuard";
import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import AllBookingsView from "./views/all";
import ConfirmedBookingsView from "./views/confirmed";
import PendingBookingsView from "./views/pending";

export default function ExternalBookingsPage() {
  const tabs = [
    { header: "Pending Bookings", component: <PendingBookingsView status="pending" viewMode="pending" /> },
    { header: "Confirmed", component: <ConfirmedBookingsView /> },
    { header: "All Bookings", component: <AllBookingsView /> },
  ];

  return (
    <AdminRouteGuard requiredRole="admin">
      <DashboardLayout title="External Bookings" quantity="">
        <TabComponent data={tabs as any} />
      </DashboardLayout>
    </AdminRouteGuard>
  );
}
