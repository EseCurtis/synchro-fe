# PieChart Component

A modern, dashboard UI-matching pie chart component built with Chart.js and React.

## Features

- **Dashboard UI Integration**: Matches the overall dashboard design system
- **Customizable Colors**: Uses consistent color palette from the dashboard
- **Center Text Display**: Shows total count and label in the center of the chart
- **Interactive Tooltips**: Detailed information on hover with custom styling
- **Responsive Design**: Adapts to container size automatically
- **Smooth Animations**: Professional chart transitions and hover effects
- **TypeScript Support**: Fully typed props and data structures
- **Legend Customization**: Can be shown or hidden as needed

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `""` | Chart title displayed at the top |
| `data` | `ChartData` | `defaultData` | Chart.js data object with labels and datasets |
| `height` | `number` | `300` | Chart height in pixels |
| `showLegend` | `boolean` | `true` | Whether to display the legend |
| `showTooltip` | `boolean` | `true` | Whether to show tooltips on hover |
| `centerText` | `string` | `undefined` | Text to display in the center of the chart |
| `centerSubtext` | `string` | `undefined` | Subtext to display below center text |

## Usage

### Basic Usage

```tsx
import PieChart from "@/app/_components/charts/pieChart";

const data = {
  labels: ["Male", "Female", "Other"],
  datasets: [
    {
      data: [45, 35, 20],
      backgroundColor: ["#e73c01", "#0512d2", "#2EB872"],
      borderColor: ["#ffffff", "#ffffff", "#ffffff"],
      borderWidth: 2,
    },
  ],
};

<PieChart
  title="Gender Distribution"
  data={data}
  height={300}
  centerText="100"
  centerSubtext="Total Users"
/>
```

### Advanced Usage

```tsx
<PieChart
  title="User Activity Status"
  data={activityData}
  height={400}
  centerText={formatNumber(totalUsers)}
  centerSubtext="Active Users"
  showLegend={true}
  showTooltip={true}
/>
```

### Without Center Text

```tsx
<PieChart
  title="Simple Distribution"
  data={simpleData}
  height={250}
  showLegend={true}
  showTooltip={true}
/>
```

## Data Structure

The `data` prop should follow Chart.js format:

```typescript
interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
    borderWidth?: number;
  }[];
}
```

## Color Palette

The component uses the dashboard color scheme:

- **Primary Orange**: `#e73c01`
- **Primary Blue**: `#0512d2`
- **Success Green**: `#2EB872`
- **Warning Orange**: `#F2994A`
- **Neutral Gray**: `#A0AEC0`
- **Error Red**: `#E74C3C`

## Styling

The component automatically applies:
- Dashboard-consistent borders and shadows
- Outfit font family for all text
- Proper spacing and padding
- Responsive design principles
- Smooth animations and transitions

## Examples

See `PieChartDemo.tsx` for comprehensive usage examples including:
- Gender distribution charts
- User activity status
- Event type breakdowns
- Various customization options

## Integration

The component is designed to work seamlessly with:
- Dashboard layout components
- Existing chart components (LineChart)
- Dashboard data fetching patterns
- TypeScript projects
- Tailwind CSS styling
