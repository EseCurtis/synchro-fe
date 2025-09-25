# Skeleton Loaders

Comprehensive skeleton loading states for the application that provide smooth loading experiences while data is being fetched.

## Overview

This module provides various skeleton loaders for different parts of the application, designed to match the actual UI components and provide realistic loading states.

## Components

### 1. AppSkeleton

Full application skeleton with sidebar, header, and content areas.

**Features:**
- Sidebar skeleton with navigation items
- Header skeleton with user info and actions
- Multiple content types (dashboard, table, calendar, form, generic)
- Responsive design
- Smooth shimmer animations

**Usage:**
```tsx
import { AppSkeleton } from '@/app/_components/skeleton';

// Basic usage
<AppSkeleton />

// With specific content type
<AppSkeleton contentType="dashboard" />

// Custom configuration
<AppSkeleton 
  showSidebar={true}
  showHeader={true}
  showContent={true}
  contentType="table"
/>
```

**Props:**
- `showSidebar?: boolean` - Show/hide sidebar skeleton (default: true)
- `showHeader?: boolean` - Show/hide header skeleton (default: true)
- `showContent?: boolean` - Show/hide content skeleton (default: true)
- `contentType?: "dashboard" | "table" | "form" | "calendar" | "generic"` - Content type (default: "generic")

### 2. EventsSkeleton

Specialized skeleton for events/calendar pages.

**Features:**
- Calendar grid skeleton with proper spacing
- Month navigation skeleton
- Event cards skeleton with realistic proportions
- Smooth shimmer animation
- Responsive design matching the actual layout

**Usage:**
```tsx
import { EventsSkeleton } from '@/app/_components/skeleton';

// Calendar view
<EventsSkeleton showCalendar={true} />

// Event list view
<EventsSkeleton showEventList={true} />

// Both views
<EventsSkeleton showCalendar={true} showEventList={true} />
```

**Props:**
- `showCalendar?: boolean` - Show calendar skeleton (default: true)
- `showEventList?: boolean` - Show event list skeleton (default: false)

### 3. TableSkeleton

Generic table skeleton loader for data tables.

**Features:**
- Realistic table structure with headers and rows
- Configurable number of rows and columns
- Action buttons skeleton
- Pagination skeleton
- Responsive design

**Usage:**
```tsx
import { TableSkeleton } from '@/app/_components/skeleton';

// Basic table
<TableSkeleton />

// Custom configuration
<TableSkeleton 
  rows={10}
  columns={5}
  showHeader={true}
  showPagination={true}
  showActions={true}
/>
```

**Props:**
- `rows?: number` - Number of table rows (default: 8)
- `columns?: number` - Number of table columns (default: 5)
- `showHeader?: boolean` - Show table header (default: true)
- `showPagination?: boolean` - Show pagination (default: true)
- `showActions?: boolean` - Show action buttons (default: true)
- `className?: string` - Additional CSS classes

## Implementation Examples

### Dashboard Layout Integration

```tsx
// In dashboard layout
const DashboardLayout = ({ children, title, quantity }) => {
  const { user, isLoading } = useAuthContext();

  // Show app skeleton while loading user data
  if (isLoading) {
    return <AppSkeleton contentType="dashboard" />;
  }

  // ... rest of component
};
```

### Events Page Integration

```tsx
// In approved events component
const ApprovedEvents = () => {
  const { data, isLoading, isFetching } = useApprovedEventsByDate({...});

  // Show skeleton loader while loading
  if (isLoading || isFetching) {
    return <EventsSkeleton showCalendar={true} />;
  }

  // ... rest of component
};
```

### Table Integration

```tsx
// In events by date component
const ApprovedEventsByDate = ({ events, actions, isLoading = false }) => {
  // Show skeleton loader while loading
  if (isLoading) {
    return (
      <div>
        <div className="flex mb-4">
          <span onClick={actions.close}>
            <FaChevronLeft />
            Go Back
          </span>
        </div>
        <DashboardAction />
        <TableSkeleton rows={8} columns={5} showActions={true} />
      </div>
    );
  }

  // ... rest of component
};
```

## Styling

All skeleton loaders use a consistent shimmer animation:

```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
```

The skeleton boxes use a gradient background that creates the shimmer effect:
- Base color: `#f0f0f0`
- Shimmer color: `#e0e0e0`
- Animation duration: `1.5s`
- Animation timing: `infinite`

## Best Practices

1. **Use appropriate skeleton types**: Match the skeleton to the actual content structure
2. **Show skeletons during data fetching**: Use `isLoading` or `isFetching` states
3. **Maintain layout consistency**: Skeletons should match the actual component dimensions
4. **Provide realistic loading times**: Don't show skeletons for too long
5. **Handle error states**: Don't show skeletons when there are errors

## Performance Considerations

- Skeletons are lightweight and don't make API calls
- Use CSS animations for smooth performance
- Stagger animations for better visual appeal
- Consider using `React.memo` for complex skeleton components

## Accessibility

- Skeletons provide visual feedback during loading
- Use appropriate ARIA labels if needed
- Ensure sufficient color contrast
- Consider screen reader users with loading announcements

## Customization

You can customize skeleton loaders by:

1. **Modifying colors**: Update the gradient colors in the `SkeletonBox` component
2. **Adjusting timing**: Change animation duration and delays
3. **Adding new content types**: Extend `AppSkeleton` with new content types
4. **Creating specialized skeletons**: Build new skeleton components for specific use cases

## File Structure

```
src/app/_components/skeleton/
├── AppSkeleton.tsx          # Full app skeleton
├── EventsSkeleton.tsx       # Events/calendar skeleton
├── TableSkeleton.tsx        # Table skeleton
├── index.ts                 # Export file
└── README.md               # This documentation
```

## Integration Checklist

- [ ] Import skeleton components
- [ ] Add loading state checks
- [ ] Configure skeleton props appropriately
- [ ] Test loading states
- [ ] Verify responsive behavior
- [ ] Check accessibility
- [ ] Optimize performance
