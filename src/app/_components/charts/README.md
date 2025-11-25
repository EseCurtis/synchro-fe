# Line Chart Component

A modern, customizable line chart component built with Chart.js and React, designed to match the dashboard UI design system.

## Features

- 🎨 **Dashboard UI Integration**: Matches the existing design system with proper colors, fonts, and spacing
- 📱 **Responsive Design**: Automatically adapts to different screen sizes
- 🎯 **Customizable**: Flexible props for title, data, height, legend, and grid display
- 🎨 **Modern Styling**: Clean, professional appearance with subtle shadows and borders
- 📊 **Interactive Tooltips**: Rich tooltips with formatted numbers and custom styling
- 🎨 **Brand Colors**: Uses the dashboard's primary gradient colors (#e73c01, #0512d2)
- 🔤 **Typography**: Consistent with Outfit font family and dashboard text styles

## Installation

The component uses the following dependencies:
- `chart.js`
- `react-chartjs-2`

Make sure these are installed in your project.

## Usage

### Basic Usage

```tsx
import LineChart from './_components/charts/lineChart';

const MyComponent = () => {
  const data = {
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

  return (
    <LineChart
      title="Monthly Sales Performance"
      data={data}
      height={400}
    />
  );
};
```

### Advanced Usage

```tsx
<LineChart
  title="Quarterly Financial Overview"
  data={financialData}
  height={450}
  showLegend={true}
  showGrid={true}
/>
```

### Minimal Design

```tsx
<LineChart
  title=""
  data={data}
  height={300}
  showLegend={false}
  showGrid={false}
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `"Analytics Overview"` | Chart title displayed at the top |
| `data` | `ChartData` | `defaultData` | Chart.js data object with labels and datasets |
| `height` | `number` | `400` | Chart height in pixels |
| `showLegend` | `boolean` | `true` | Whether to display the legend |
| `showGrid` | `boolean` | `true` | Whether to display grid lines |

## Data Structure

The `data` prop should follow Chart.js format:

```tsx
{
  labels: string[];           // X-axis labels
  datasets: {
    label: string;            // Dataset label
    data: number[];           // Y-axis values
    borderColor?: string;     // Line color
    backgroundColor?: string; // Fill color
    fill?: boolean;           // Whether to fill area under line
    tension?: number;         // Line smoothness (0-1)
    pointBackgroundColor?: string;  // Point fill color
    pointBorderColor?: string;      // Point border color
    pointBorderWidth?: number;      // Point border width
    pointRadius?: number;           // Point size
    pointHoverRadius?: number;      // Point size on hover
  }[];
}
```

## Design System Integration

The component uses the following design tokens from the dashboard:

### Colors
- **Primary**: `#1A202C` (text, titles)
- **Text Primary**: `#A0AEC0` (labels, ticks)
- **Border**: `#EDEFF5` (borders, grid lines)
- **Brand Colors**: `#e73c01` (orange), `#0512d2` (blue)
- **Success**: `#2EB872` (green)

### Typography
- **Font Family**: `Outfit, sans-serif`
- **Title**: 18px, weight 600
- **Labels**: 12px, weight 500
- **Ticks**: 11px, weight 400

### Layout
- **Border Radius**: `8px` (rounded-lg)
- **Padding**: `24px` (p-6)
- **Border**: `1px solid #EDEFF5`
- **Shadow**: `0 1px 3px rgba(0, 0, 0, 0.05)`

## Examples

### Single Dataset
```tsx
const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [{
    label: "Sales",
    data: [1200, 1900, 3000, 5000, 2000, 3000],
    borderColor: "#e73c01",
    backgroundColor: "rgba(231, 60, 1, 0.1)",
    fill: true,
    tension: 0.4,
  }],
};
```

### Multiple Datasets
```tsx
const multiData = {
  labels: ["Q1", "Q2", "Q3", "Q4"],
  datasets: [
    {
      label: "Revenue",
      data: [45000, 52000, 48000, 61000],
      borderColor: "#e73c01",
      backgroundColor: "rgba(231, 60, 1, 0.1)",
      fill: true,
    },
    {
      label: "Expenses",
      data: [32000, 38000, 35000, 42000],
      borderColor: "#0512d2",
      backgroundColor: "rgba(5, 18, 210, 0.1)",
      fill: true,
    },
  ],
};
```

## Customization

### Custom Colors
You can use any colors, but the component is optimized for the dashboard's color palette:

```tsx
const customData = {
  labels: ["Jan", "Feb", "Mar"],
  datasets: [{
    label: "Custom Data",
    data: [100, 200, 150],
    borderColor: "#your-color",
    backgroundColor: "rgba(your-color, 0.1)",
    fill: true,
  }],
};
```

### Custom Styling
The component automatically applies dashboard styling, but you can override specific aspects by modifying the `options` object in the component.

## Best Practices

1. **Data Formatting**: Use `toLocaleString()` for large numbers in tooltips
2. **Color Consistency**: Stick to the dashboard color palette for consistency
3. **Responsive Design**: Use appropriate heights for different screen sizes
4. **Accessibility**: Ensure sufficient color contrast and readable text sizes
5. **Performance**: For large datasets, consider data aggregation or pagination

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- React 16.8+
- Chart.js 4.0+
- react-chartjs-2 5.0+







