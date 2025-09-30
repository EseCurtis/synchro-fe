import {
  ArcElement, Chart as ChartJS,
  Legend,
  Tooltip
} from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  title?: string;
  data?: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }[];
  };
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
  centerText?: string;
  centerSubtext?: string;
}

const defaultData = {
  labels: ["Male", "Female", "Other", "Prefer not to say", "None"],
  datasets: [
    {
      data: [45, 35, 10, 5, 5],
      backgroundColor: [
        "#e73c0155",
        "#0512d2", 
        "#e73c01",
        "#e73c013A",
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

const PieChart: React.FC<PieChartProps> = ({
  title = "",
  data = defaultData,
  height = 300,
  showLegend = true,
  showTooltip = true,
  centerText,
  centerSubtext,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: centerText || centerSubtext ? '60%' : '50%',
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            family: 'Outfit, sans-serif',
            size: 11,
            weight: '500' as const,
          },
          color: '#A0AEC0',
          generateLabels: function(chart: any) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label: string, i: number) => {
                const dataset = data.datasets[0];
                const value = dataset.data[i];
                const total = dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
                
                return {
                  text: `${label}: ${value} (${percentage}%)`,
                  fillStyle: dataset.backgroundColor[i],
                  strokeStyle: dataset.borderColor[i],
                  lineWidth: dataset.borderWidth,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        },
      },
      // title: {
      //   display: !!title,
      //   text: title,
      //   font: {
      //     family: 'Outfit, sans-serif',
      //     size: 16,
      //     weight: '600' as const,
      //   },
      //   color: '#1A202C',
      //   padding: {
      //     bottom: 20,
      //   },
      // },
      tooltip: {
        enabled: showTooltip,
        backgroundColor: 'rgba(26, 32, 44, 0.95)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#EDEFF5',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          family: 'Outfit, sans-serif',
          size: 12,
          weight: '600' as const,
        },
        bodyFont: {
          family: 'Outfit, sans-serif',
          size: 11,
          weight: '400' as const,
        },
        padding: 12,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0';
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      },
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#ffffff',
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart' as const,
    },
    hover: {
      animationDuration: 300,
    },
  };

  // Calculate total for center text
  const total = data.datasets[0]?.data.reduce((a: number, b: number) => a + b, 0) || 0;

  return (
    <div 
      className="w-full bg-white rounded-lg p-6"
      style={{
        border: "1px solid #EDEFF5",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      {title && (
        <h3 
          className="text-[16px] text-center font-bold mb-4"
          style={{ color: '#1A202C' }}
        >
          {title}
        </h3>
      )}
      
      <div 
        className="relative"
        style={{ height: `${height}px` }}
      >
        <Doughnut options={options} data={data} />
        
        {/* Center text overlay */}
        {(centerText || centerSubtext) && (
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ 
              top: '40%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}
          >
            {centerText && (
              <div 
                className="font-bold"
                style={{ 
                  fontSize: '24px',
                  color: '#1A202C',
                  fontFamily: 'Outfit, sans-serif'
                }}
              >
                {centerText}
              </div>
            )}
            {centerSubtext && (
              <div 
                className="text-sm"
                style={{ 
                  color: '#A0AEC0',
                  fontFamily: 'Outfit, sans-serif',
                  marginTop: '4px'
                }}
              >
                {centerSubtext}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;

