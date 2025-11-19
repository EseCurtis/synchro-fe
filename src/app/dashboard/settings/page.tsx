import TabComponent from "@/app/_components/tab";
import DashboardLayout from "@/app/layouts/dashboardLayout";
import ChangePasswordPage from "./change-password/page";
import Categories from "./views/Catgories";
import FeesConfigurations from "./views/fees_configuration";
import ProfileInfo from "./views/profile_info";

const data = [
  {
    header: "Profile Information",
    component: <ProfileInfo />,
  },
  {
    header: "Change Password",
    component: <ChangePasswordPage />,
  },
  {
    header: "Fee Configuration ",
    component: <FeesConfigurations />,
  },
  {
    header: "Categories ",
    component: <Categories />,
  },
];
const Faqs_and_notifications = () => {
  return (
    <DashboardLayout title="Settings">
      <TabComponent data={data} />
    </DashboardLayout>
  );
};

export default Faqs_and_notifications;
