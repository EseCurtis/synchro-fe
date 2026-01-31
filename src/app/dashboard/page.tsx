"use client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useUserActivity } from "@/hooks/api/useUserActivity";
import { cn, formatNumber } from "@/utils/formatNumber";
import { userFullName } from "@/v2/helpers/common.helpers";
import LineGraph from "../_components/charts/lineChart";
import PieChart from "../_components/charts/pieChart";
import DashboardLayout from "../layouts/dashboardLayout";

const DashboardIndex = () => {
  const { data, isLoading } = useTQuery({
    url: "/admin/reports/totals",
    queryKey: ["totals"],
  });

  // Fetch user activity data
  const {
    data: userActivityData,
    isLoading: isUserActivityLoading,
    error: userActivityError,
  } = useUserActivity("month");

  // Extract chart data safely
  const chartData = (userActivityData as any)?.data?.data || null;

  const contentData = [
    {
      title: "Total Users",
      // @ts-ignore
      amount: data?.data?.users ?? 0,
      img: "/images/icons/dashboard/user.svg",
    },
    {
      title: "Total Events",
      // @ts-ignore
      amount: data?.data?.events ?? 0,
      img: "/images/icons/dashboard/calender_icon.svg",
    },
    {
      title: "Total Venues",
      // @ts-ignore
      amount: data?.data?.venues ?? 0,
      img: "/images/icons/dashboard/building.svg",
    },
    {
      title: "Total Services",
      // @ts-ignore
      amount: data?.data?.services ?? 0,
      img: "/images/icons/dashboard/user_dollar.svg",
    },
  ];

  const genderData = {
    labels: ["Male", "Female", "Other", "Prefer not to say", "None"],
    datasets: [
      {
        data: [
          // @ts-ignore
          data?.data?.genderMetrics?.males ?? 0,
          // @ts-ignore
          data?.data?.genderMetrics?.females ?? 0,
          // @ts-ignore
          data?.data?.genderMetrics?.other ?? 0,
          // @ts-ignore
          data?.data?.genderMetrics?.preferNotToSay ?? 0,
          // @ts-ignore
          data?.data?.genderMetrics?.none ?? 0,
        ],
        backgroundColor: [
          "#e73c0155",
          "#0512d2",
          "#A0AEC0",
          "#e73c01",
          "#e73c013A",
        ],
        borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        borderWidth: 2,
      },
    ],
  };

  // Calculate total users for center text
  const totalUsers = genderData.datasets[0].data.reduce((a, b) => a + b, 0);

  const { user } = useAuthContext();

  return (
    <DashboardLayout title="Dashboard">
      <div>
        <h1>
          Welcome{" "}
          <span
            style={{
              fontWeight: "bold",
            }}
          >
            {userFullName(user)}
          </span>{" "}
          👋
        </h1>
      </div>

      <div className="flex justify-between my-9 gap-[23px]">
        {contentData.map((items, index) => {
          return (
            <>
              <div
                className="w-[350px] py-[24px] px-[40px] rounded-lg  "
                style={{
                  border: "1px solid #EDEFF5",
                }}
                key={index}
              >
                <img src={items.img} width={40} height={40} alt={"icon"} />
                <div className="my-[1.5em]">
                  <p className="text-text_primary">{items.title}</p>
                  <h3
                    className={cn(
                      "font-bold ",
                      isLoading
                        ? "animate-pulse text-transparent bg-gray-400/20"
                        : ""
                    )}
                    style={{
                      fontSize: "24px",
                      // fontWeight: "700",
                    }}
                  >
                    {formatNumber(items.amount)}
                  </h3>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="flex justify-between gap-[20px]">
        <div className="w-[50%] ">
          {
            <LineGraph
              title="Users Most Active Period"
              height={300}
              data={chartData}
              isLoading={isUserActivityLoading}
            />
          }
        </div>

        {/* gender  */}
        <div className="w-[50%]">
          <PieChart
            title="Gender Distribution"
            data={genderData}
            height={300}
            centerText={formatNumber(totalUsers)}
            centerSubtext="Total Users"
            showLegend={true}
            showTooltip={true}
          />
        </div>
      </div>

      {/* Transaction graph */}
      {/* <div
        className="w-full my-5 rounded-lg p-[16px] mt-[4em]"
        style={{
          border: "1px solid #EDEFF5",
        }}
      >
        <h3 className="text-[16px] font-bold">Transaction graph with time</h3>
        <LineGraph />
      </div> */}
    </DashboardLayout>
  );
};

export default DashboardIndex;
