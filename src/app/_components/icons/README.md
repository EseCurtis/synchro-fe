# Sidebar Icon System

A modern, optimized icon system for the dashboard sidebar using TSX components instead of image files.

## Overview

This icon system replaces image-based icons with optimized SVG components, providing:

- **Faster Loading**: No network requests for icons
- **Better Performance**: Inline SVG rendering
- **Scalability**: Vector graphics that scale perfectly
- **Customization**: Easy color and size changes
- **Bundle Optimization**: Tree-shaking support
- **TypeScript Support**: Fully typed with validation

## Components

### SidebarIcon

The main component for rendering sidebar icons with automatic active/inactive states.

```tsx
import SidebarIcon from "@/app/_components/icons/SidebarIcon";

<SidebarIcon
  type="home"
  isActive={true}
  size={24}
  activeColor="#e73c01"
  inactiveColor="#718096"
/>;
```

**Props:**

- `type`: Icon type (validated with TypeScript)
- `isActive`: Whether the icon is in active state
- `size`: Icon size in pixels (default: 24)
- `className`: Additional CSS classes
- `activeColor`: Color for active state (default: "#e73c01")
- `inactiveColor`: Color for inactive state (default: "#718096")

### Individual Icon Components

All icons are available as individual components:

```tsx
import { HomeIcon, UserIcon, EventsIcon } from "@/app/_components/icons/SidebarIcons";

<HomeIcon size={24} color="#e73c01" />
<UserIcon size={32} color="#718096" />
<EventsIcon size={20} color="#0512d2" />
```

## Available Icons

| Icon Type  | Component      | Description       |
| ---------- | -------------- | ----------------- |
| `home`     | `HomeIcon`     | Dashboard/Home    |
| `user`     | `UserIcon`     | Users/Profile     |
| `events`   | `EventsIcon`   | Events/Calendar   |
| `venues`   | `VenuesIcon`   | Venues/Buildings  |
| `kyc`      | `KycIcon`      | KYC/Verification  |
| `services` | `ServicesIcon` | Services/Money    |
| `support`  | `SupportIcon`  | Support/Help      |
| `report`   | `ReportIcon`   | Reports/Documents |
| `audit`    | `AuditIcon`    | Audit/History     |
| `faq`      | `FaqIcon`      | FAQ/Questions     |
| `settings` | `SettingsIcon` | Settings/Gear     |

## Usage Examples

### Basic Usage

```tsx
// Simple icon
<SidebarIcon type="home" />

// With active state
<SidebarIcon type="user" isActive={true} />

// Custom size
<SidebarIcon type="events" size={32} />
```

### Advanced Usage

```tsx
// Custom colors
<SidebarIcon
  type="settings"
  isActive={isSettingsActive}
  activeColor="#2EB872"
  inactiveColor="#A0AEC0"
  size={28}
/>

// With additional styling
<SidebarIcon
  type="report"
  isActive={isReportActive}
  className="hover:scale-110 transition-transform"
/>
```

### In Navigation Components

```tsx
const NavigationItem = ({ item, isActive }) => (
  <div className="nav-item">
    <SidebarIcon type={item.iconType} isActive={isActive} size={24} />
    <span>{item.title}</span>
  </div>
);
```

## Migration from Image Icons

### Before (Image-based)

```tsx
// Old approach with images
<img
  src="/images/icons/sidebar/home.svg"
  width={24}
  height={24}
  alt="Home"
  style={{ display: isActive ? "none" : "unset" }}
/>
<img
  src="/images/icons/sidebar/home_active.svg"
  width={24}
  height={24}
  alt="Home Active"
  style={{ display: isActive ? "unset" : "none" }}
/>
```

### After (Component-based)

```tsx
// New approach with components
<SidebarIcon type="home" isActive={isActive} size={24} />
```

## Performance Benefits

### Loading Performance

- **Before**: 24+ HTTP requests for icon images
- **After**: 0 HTTP requests (inline SVG)

### Bundle Size

- **Before**: Multiple image files in public folder
- **After**: Optimized SVG code in bundle

### Rendering Performance

- **Before**: Image loading delays and layout shifts
- **After**: Instant rendering with no layout shifts

### Memory Usage

- **Before**: Image caching and memory overhead
- **After**: Minimal memory footprint

## Customization

### Adding New Icons

1. Add the icon component to `SidebarIcons.tsx`:

```tsx
export const NewIcon: React.FC<IconProps> = ({
  size = 24,
  className = "",
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {/* SVG path data */}
  </svg>
);
```

2. Add to the icon map:

```tsx
export const SidebarIconMap = {
  // ... existing icons
  newIcon: NewIcon,
} as const;
```

3. Update the type definition:

```tsx
export type SidebarIconType = keyof typeof SidebarIconMap;
```

### Custom Styling

```tsx
// Custom colors
<SidebarIcon
  type="home"
  isActive={true}
  activeColor="#your-color"
  inactiveColor="#your-inactive-color"
/>

// Custom classes
<SidebarIcon
  type="user"
  className="hover:scale-110 transition-all duration-200"
/>
```

## TypeScript Support

The system provides full TypeScript support:

```tsx
// Type-safe icon types
type ValidIconType = SidebarIconType; // "home" | "user" | "events" | ...

// Type-safe props
interface SidebarIconProps {
  type: SidebarIconType; // Only valid icon types allowed
  isActive?: boolean;
  size?: number;
  // ... other props
}
```

## Best Practices

1. **Use SidebarIcon for Navigation**: Prefer `SidebarIcon` over individual components for navigation
2. **Consistent Sizing**: Use standard sizes (16, 20, 24, 32) for consistency
3. **Color Consistency**: Use the provided color scheme for active/inactive states
4. **Accessibility**: Icons are semantic and screen-reader friendly
5. **Performance**: Icons are optimized for minimal bundle impact

## Integration

The icon system integrates seamlessly with:

- **Sidebar Navigation**: Automatic active/inactive states
- **Dashboard Layout**: Consistent styling and behavior
- **Theme System**: Respects color schemes and themes
- **Responsive Design**: Scales properly on all screen sizes

## Troubleshooting

### Icon Not Showing

- Check that the icon type is valid
- Verify the component is imported correctly
- Ensure TypeScript types are properly configured

### Styling Issues

- Check color values are valid hex codes
- Verify className is applied correctly
- Ensure no conflicting CSS rules

### Performance Issues

- Icons are optimized by default
- No additional optimization needed
- Bundle size impact is minimal
