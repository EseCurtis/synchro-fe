import React from "react";
import LineChart from "./lineChart";

// Example of how to integrate the improved line chart into your dashboard
const ChartIntegrationExample: React.FC = () => {
  // Example: User relationship stats data (matching the backend endpoint we created)
  const userStatsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Followers",
        data: [120, 135, 118, 142, 138, 155, 162],
        borderColor: "#e73c01",
        backgroundColor: "rgba(231, 60, 1, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#e73c01",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Following",
        data: [80, 95, 88, 102, 98, 115, 122],
        borderColor: "#0512d2",
        backgroundColor: "rgba(5, 18, 210, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#0512d2",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: "Blocked",
        data: [5, 3, 7, 4, 6, 2, 8],
        borderColor: "#F2994A",
        backgroundColor: "rgba(242, 153, 74, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#F2994A",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Example: Revenue analytics data
  const revenueData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Revenue",
        data: [45000, 52000, 48000, 61000],
        borderColor: "#e73c01",
        backgroundColor: "rgba(231, 60, 1, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#e73c01",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Cards Layout - matching the existing dashboard style */}
      <div className="flex justify-between gap-[23px]">
        {/* User Relationship Stats Chart */}
        <div className="flex-1">
          <LineChart
            title="User Relationship Trends"
            data={userStatsData}
            height={350}
          />
        </div>

        {/* Revenue Chart */}
        <div className="flex-1">
          <LineChart
            title="Quarterly Revenue"
            data={revenueData}
            height={350}
          />
        </div>
      </div>

      {/* Full-width chart */}
      <div>
        <LineChart
          title="Monthly Analytics Overview"
          data={userStatsData}
          height={400}
        />
      </div>

      {/* Compact charts in a row */}
      <div className="grid grid-cols-3 gap-6">
        <LineChart
          title="Followers"
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [{
              label: "Followers",
              data: [120, 135, 118, 142],
              borderColor: "#e73c01",
              backgroundColor: "rgba(231, 60, 1, 0.1)",
              fill: true,
             // tension: 0.4,
            }],
          }}
          height={250}
        />
        
        <LineChart
          title="Following"
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [{
              label: "Following",
              data: [80, 95, 88, 102],
              borderColor: "#0512d2",
              backgroundColor: "rgba(5, 18, 210, 0.1)",
              fill: true,
              //tension: 0.4,
            }],
          }}
          height={250}
        />
        
        <LineChart
          title="Blocked Users"
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr"],
            datasets: [{
              label: "Blocked",
              data: [5, 3, 7, 4],
              borderColor: "#F2994A",
              backgroundColor: "rgba(242, 153, 74, 0.1)",
              fill: true,
              //tension: 0.4,
            }],
          }}
          height={250}
        />
      </div>
    </div>
  );
};

export default ChartIntegrationExample;





