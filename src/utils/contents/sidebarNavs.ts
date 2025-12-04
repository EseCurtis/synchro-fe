import { ExactSidebarIconType } from "@/app/_components/icons/ExactSidebarIcons";

export interface SidebarNavItem {
  title: string;
  path: string;
  iconType: ExactSidebarIconType;
  absoluteMatch?: boolean;
}

export const SidebarNavs: SidebarNavItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
    iconType: "home",
    absoluteMatch: true,
  },
  {
    title: "Users",
    path: "/dashboard/users",
    iconType: "user",
  },
  {
    title: "Events",
    path: "/dashboard/events",
    iconType: "events",
  },
  {
    title: "Venues",
    path: "/dashboard/venues",
    iconType: "venues",
  },
  // {
  //   title: "KYC",
  //   path: "/dashboard/kyc",
  //   iconType: "kyc",
  // },
  {
    title: "Services",
    path: "/dashboard/services",
    iconType: "services",
  },
  {
    title: "Scraped Data",
    path: "/dashboard/scraped-data",
    iconType: "settings",
  },
  {
    title: "Ad Requests",
    path: "/dashboard/ads/review",
    iconType: "services",
  },
  {
    title: "Support",
    path: "/dashboard/support",
    iconType: "support",
  },
  {
    title: "Report Issues",
    path: "/dashboard/reports",
    iconType: "report",
  },
  // {
  //   title: "Admin Management",
  //   path: "/dashboard/admin-management",
  //   iconType: "admin",
  // },
  {
    title: "Audit Trail",
    path: "/dashboard/audits",
    iconType: "audit",
  },
  {
    title: "FAQ & Notifications",
    path: "/dashboard/faq_and_notifications",
    iconType: "faq",
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    iconType: "settings",
  },
];
