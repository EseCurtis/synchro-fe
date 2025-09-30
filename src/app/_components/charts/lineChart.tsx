import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  title?: string;
  data?: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
      fill?: boolean;
    }[];
  };
  height?: number;
  showLegend?: boolean;
  showGrid?: boolean;
  isLoading?: boolean;
}

const defaultLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const generateDummyData = (
  count: number,
  baseValue: number = 1000,
  variance: number = 500
) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(
      Math.floor(baseValue + (Math.random() * variance * 2 - variance))
    );
  }
  return data;
};

const defaultData = {
  labels: defaultLabels,
  datasets: [
    {
      label: "Revenue",
      data: generateDummyData(defaultLabels.length, 1200, 300),
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
      label: "Users",
      data: generateDummyData(defaultLabels.length, 800, 200),
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

const LineChart: React.FC<LineChartProps> = ({
  title = "",
  data = defaultData,
  showLegend = true,
  showGrid = true,
  isLoading = false,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "top" as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "Outfit, sans-serif",
            size: 12,
            weight: "500" as const,
          },
          color: "#A0AEC0",
        },
      },
      title: {
        display: !!title,
        text: title,
        font: {
          family: "Outfit, sans-serif",
          size: 16,
          weight: "600" as const,
        },
        color: "#1A202C",
        padding: {
          bottom: 30,
        },
        textAlign: "left",
      },
      tooltip: {
        backgroundColor: "rgba(26, 32, 44, 0.95)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#EDEFF5",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: "Outfit, sans-serif",
          size: 12,
          weight: "600" as const,
        },
        bodyFont: {
          family: "Outfit, sans-serif",
          size: 11,
          weight: "400" as const,
        },
        padding: 12,
        callbacks: {
          label: function (context: any) {
            const label = context.dataset.label || "";
            const value = context.parsed.y;
            return `${label}: ${value.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: showGrid,
          color: "rgba(237, 239, 245, 0.5)",
          drawBorder: false,
        },
        ticks: {
          color: "#A0AEC0",
          font: {
            family: "Outfit, sans-serif",
            size: 11,
            weight: "400" as const,
          },
          padding: 10,
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        grid: {
          display: showGrid,
          color: "rgba(237, 239, 245, 0.5)",
          drawBorder: false,
        },
        ticks: {
          color: "#A0AEC0",
          font: {
            family: "Outfit, sans-serif",
            size: 11,
            weight: "400" as const,
          },
          padding: 10,
          callback: function (value: any) {
            return value.toLocaleString();
          },
        },
        border: {
          display: false,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        hoverBorderWidth: 3,
      },
    },
  };

  // Show loading state
  if (isLoading) {
    return (
      <div
        className="w-full bg-white rounded-lg p-6 h-[390px] flex items-center justify-center"
        style={{
          border: "1px solid #EDEFF5",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e73c01]"></div>
          <p className="text-sm text-gray-500">Loading chart data...</p>
        </div>
      </div>
    );
  }

  if (!data?.labels) {
    return (
      <div
        className="w-full bg-white rounded-lg p-6 h-[390px] flex items-center justify-center"
        style={{
          border: "1px solid #EDEFF5",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#e73c01]"></div>
          <p className="text-sm text--500 text-red-500">Error loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full bg-white rounded-lg p-6 h-[390px]"
      style={{
        border: "1px solid #EDEFF5",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      <Line options={options as any} data={data} />
    </div>
  );
};

export default LineChart;
