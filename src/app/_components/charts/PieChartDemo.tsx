import React from "react";
import PieChart from "./pieChart";

const PieChartDemo: React.FC = () => {
  // Gender distribution data
  const genderData = {
    labels: ["Male", "Female", "Other", "Prefer not to say", "None"],
    datasets: [
      {
        data: [45, 35, 10, 5, 5],
        backgroundColor: [
          "#e73c01",
          "#0512d2", 
          "#2EB872",
          "#F2994A",
          "#A0AEC0"
        ],
        borderColor: [
          "#ffffff",
          "#ffffff",
          "#ffffff", 
          "#ffffff",
          "#ffffff"
        ],
        borderWidth: 2,
      },
    ],
  };

  // User activity data
  const activityData = {
    labels: ["Active", "Inactive", "Suspended"],
    datasets: [
      {
        data: [70, 25, 5],
        backgroundColor: [
          "#2EB872",
          "#F2994A",
          "#E74C3C"
        ],
        borderColor: [
          "#ffffff",
          "#ffffff",
          "#ffffff"
        ],
        borderWidth: 2,
      },
    ],
  };

  // Event types data
  const eventTypesData = {
    labels: ["Conferences", "Workshops", "Meetups", "Webinars"],
    datasets: [
      {
        data: [30, 25, 20, 25],
        backgroundColor: [
          "#e73c01",
          "#0512d2",
          "#2EB872",
          "#F2994A"
        ],
        borderColor: [
          "#ffffff",
          "#ffffff",
          "#ffffff",
          "#ffffff"
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Pie Chart Component Demo
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Gender Distribution */}
          <div>
            <PieChart
              title="Gender Distribution"
              data={genderData}
              height={300}
              centerText="100"
              centerSubtext="Total Users"
              showLegend={true}
              showTooltip={true}
            />
          </div>

          {/* User Activity Status */}
          <div>
            <PieChart
              title="User Activity Status"
              data={activityData}
              height={300}
              centerText="100"
              centerSubtext="Users"
              showLegend={true}
              showTooltip={true}
            />
          </div>

          {/* Event Types */}
          <div>
            <PieChart
              title="Event Types"
              data={eventTypesData}
              height={300}
              centerText="100"
              centerSubtext="Events"
              showLegend={true}
              showTooltip={true}
            />
          </div>

          {/* Simple chart without center text */}
          <div>
            <PieChart
              title="Simple Distribution"
              data={{
                labels: ["Category A", "Category B", "Category C"],
                datasets: [
                  {
                    data: [40, 35, 25],
                    backgroundColor: ["#e73c01", "#0512d2", "#2EB872"],
                    borderColor: ["#ffffff", "#ffffff", "#ffffff"],
                    borderWidth: 2,
                  },
                ],
              }}
              height={250}
              showLegend={true}
              showTooltip={true}
            />
          </div>

          {/* Chart without legend */}
          <div>
            <PieChart
              title="No Legend Chart"
              data={genderData}
              height={250}
              centerText="100"
              centerSubtext="Users"
              showLegend={false}
              showTooltip={true}
            />
          </div>

          {/* Chart without tooltip */}
          <div>
            <PieChart
              title="No Tooltip Chart"
              data={activityData}
              height={250}
              centerText="100"
              centerSubtext="Status"
              showLegend={true}
              showTooltip={false}
            />
          </div>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Component Features
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Customizable colors:</strong> Uses dashboard color scheme</li>
            <li>• <strong>Center text:</strong> Display total count and label in center</li>
            <li>• <strong>Responsive design:</strong> Adapts to container size</li>
            <li>• <strong>Interactive tooltips:</strong> Show detailed information on hover</li>
            <li>• <strong>Legend customization:</strong> Can be shown/hidden</li>
            <li>• <strong>Smooth animations:</strong> Professional chart transitions</li>
            <li>• <strong>Dashboard styling:</strong> Matches overall UI design</li>
            <li>• <strong>TypeScript support:</strong> Fully typed props and data</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PieChartDemo;



