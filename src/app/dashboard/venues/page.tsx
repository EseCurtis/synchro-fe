import { AdminRouteGuard } from "@/app/_components/auth/AdminRouteGuard";
import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import { VenueStatusView } from "./views/venue-status-view";

const tabs = [
  {
    header: "All venues",
    component: <VenueStatusView title="All Venues" />,
  },
  {
    header: "Pending",
    component: <VenueStatusView status="draft" title="Pending Venues" />,
  },
  {
    header: "Active",
    component: <VenueStatusView status="active" title="Active Venues" />,
  },
  {
    header: "Inactive",
    component: <VenueStatusView status="inactive" title="Inactive Venues" />,
  },
  {
    header: "Synchro AI",
    component: (
      <VenueStatusView
        title="Synchro AI Venues"
        variant="synchro"
        status="active"
      />
    ),
  },
];

export default function VenuesPage() {
  return (
    <AdminRouteGuard requiredRole="admin">
      <DashboardLayout title="Venues">
        <TabComponent data={tabs as any} />
    </DashboardLayout>
    </AdminRouteGuard>
  );
}
