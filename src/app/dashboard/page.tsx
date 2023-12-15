"use client";
import React from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import Image from "next/image";
import { formatNumber } from "@/utils/formatNumber";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import LineGraph from "../_components/charts/lineChart";
import { useTQuery } from "@/hooks/api/useTQuery";
import { useAuthContext } from "@/contexts/AuthContext";
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardIndex = () => {
  const { data } = useTQuery({
    url: "/report/totals",
    queryKey: ["totals"],
  });

  const contentData = [
    {
      title: "Total Users",
      amount: data?.data?.users ?? 0,
      img: "/images/icons/dashboard/user.svg",
    },
    {
      title: "Total Events",
      amount: data?.data?.events ?? 0,
      img: "/images/icons/dashboard/calender_icon.svg",
    },
    {
      title: "Total Venues",
      amount: data?.data?.venues ?? 0,
      img: "/images/icons/dashboard/building.svg",
    },
    {
      title: "Total Services",
      amount: data?.data?.services ?? 0,
      img: "/images/icons/dashboard/user_dollar.svg",
    },
  ];

  const genderData = {
    labels: ["Male", "Female", "None"],
    datasets: [
      {
        data: [
          data?.data?.genderMetrics?.males?.toFixed(0) ?? 0,
          data?.data?.genderMetrics?.females?.toFixed(0) ?? 0,
          data?.data?.genderMetrics?.none?.toFixed(0) ?? 0,
        ],
        backgroundColor: ["#37C89A", "#FFCC00", "#E95E2A"],
      },
    ],
  };

  console.log(genderData.datasets);

  const config = {
    type: "doughnut",
    data: genderData,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
        },
      },
    },
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sample Line Data",
        data: [10, 20, 15, 25, 30],
        borderColor: "green",
        backgroundColor: "rgba(0, 128, 0, 0.2)",
      },
    ],
  };
  const lineOptions = {
    scales: {
      x: {
        type: "category",
      },
    },
  };

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
            {user?.firstName} {user?.lastName}
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
                <Image src={items.img} width={40} height={40} alt={"icon"} />
                <div className="my-[1.5em]">
                  <p className="text-text_primary">{items.title}</p>
                  <h3
                    className="font-bold "
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
        <div
          className="w-[50%] rounded-lg p-[16px] "
          style={{
            border: "1px solid #EDEFF5",
          }}
        >
          <h3 className="text-[16px] font-bold">Users most active period</h3>

          <center>
            <LineGraph />
          </center>
        </div>

        {/* gender  */}
        <div
          className="w-[50%] rounded-lg p-[16px] "
          style={{
            border: "1px solid #EDEFF5",
          }}
        >
          <h3 className="text-[16px] font-bold">Gender</h3>

          <div className="w-[400px] mx-auto">
            {/* @ts-ignore */}
            <Doughnut data={config.data} options={config.options} />
          </div>
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
