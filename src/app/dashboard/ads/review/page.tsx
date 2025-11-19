"use client";

import { AdminRouteGuard } from "@/app/_components/auth/AdminRouteGuard";
import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import ApprovedBoostsView from "./views/approved";
import InReviewBoostsView from "./views/in-review";
import PendingBoostsView from "./views/pending";
import RejectedBoostsView from "./views/rejected";

export default function AdReviewPage() {
  const tabs = [
    { header: "Pending Requests", component: <PendingBoostsView /> },
    { header: "Approved", component: <ApprovedBoostsView /> },
    { header: "In Review", component: <InReviewBoostsView /> },
    { header: "Rejected", component: <RejectedBoostsView /> },
  ];

  return (
    <AdminRouteGuard requiredRole="admin">
      <DashboardLayout title="Ad Requests" quantity="">
        <TabComponent data={tabs as any} />
      </DashboardLayout>
    </AdminRouteGuard>
  );
}
