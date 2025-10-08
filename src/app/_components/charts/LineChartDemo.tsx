import React from "react";
import LineChart from "./lineChart";

const LineChartDemo: React.FC = () => {
  // Example 1: Basic usage with default data
  const basicData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales",
        data: [1200, 1900, 3000, 5000, 2000, 3000],
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

  // Example 2: Multiple datasets with custom colors
  const multiData = {
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
      {
        label: "Expenses",
        data: [32000, 38000, 35000, 42000],
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
        label: "Profit",
        data: [13000, 14000, 13000, 19000],
        borderColor: "#2EB872",
        backgroundColor: "rgba(46, 184, 114, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#2EB872",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  // Example 3: User engagement data
  const engagementData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7", "Week 8"],
    datasets: [
      {
        label: "Active Users",
        data: [1200, 1350, 1180, 1420, 1380, 1550, 1620, 1780],
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
        label: "New Users",
        data: [300, 450, 280, 520, 480, 650, 720, 880],
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
    ],
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold text-primary mb-4">Line Chart Examples</h2>
        <p className="text-text_primary mb-6">
          Various examples of the improved line chart component matching the dashboard UI design.
        </p>
      </div>

      {/* Example 1: Basic Chart */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Basic Sales Chart</h3>
        <LineChart
          title="Monthly Sales Performance"
          data={basicData}
          height={350}
        />
      </div>

      {/* Example 2: Multi-dataset Chart */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Financial Overview</h3>
        <LineChart
          title="Quarterly Financial Performance"
          data={multiData}
          height={400}
        />
      </div>

      {/* Example 3: User Engagement */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">User Engagement Metrics</h3>
        <LineChart
          title="Weekly User Growth"
          data={engagementData}
          height={380}
        />
      </div>

      {/* Example 4: Minimal Chart */}
      <div>
        <h3 className="text-lg font-semibold text-primary mb-4">Minimal Design</h3>
        <LineChart
          title=""
          data={basicData}
          height={300}
          showLegend={false}
          showGrid={false}
        />
      </div>

      {/* Usage Examples */}
      <div className="bg-lighten p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-primary mb-4">Usage Examples</h3>
        <div className="space-y-4 text-sm text-other_text">
          <div>
            <h4 className="font-medium text-primary mb-2">Basic Usage:</h4>
            <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`<LineChart
  title="Monthly Sales"
  data={salesData}
  height={400}
/>`}
            </pre>
          </div>
          
          <div>
            <h4 className="font-medium text-primary mb-2">Custom Configuration:</h4>
            <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`<LineChart
  title="User Analytics"
  data={userData}
  height={350}
  showLegend={true}
  showGrid={true}
/>`}
            </pre>
          </div>

          <div>
            <h4 className="font-medium text-primary mb-2">Minimal Design:</h4>
            <pre className="bg-white p-3 rounded border text-xs overflow-x-auto">
{`<LineChart
  title=""
  data={data}
  height={300}
  showLegend={false}
  showGrid={false}
/>`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineChartDemo;



