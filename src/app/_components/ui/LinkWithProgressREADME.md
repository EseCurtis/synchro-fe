# LinkWithProgress Component

A Next.js Link component with automatic NProgress integration for smooth navigation feedback.

## Overview

`LinkWithProgress` is a drop-in replacement for Next.js `Link` that automatically shows a progress bar during navigation. It integrates seamlessly with the existing NProgress setup and handles all edge cases automatically.

## Features

- **Automatic NProgress Integration**: Shows progress bar on internal navigation
- **Smart Link Detection**: Automatically handles external links without progress bar
- **Full Next.js Compatibility**: Supports all Next.js Link props and features
- **TypeScript Support**: Fully typed with comprehensive prop definitions
- **Edge Case Handling**: Properly handles hash links, downloads, and prevented events
- **Zero Configuration**: Works out of the box with existing NProgress setup

## Installation

The component is already created and ready to use. No additional installation required.

## Usage

### Basic Usage

```tsx
import LinkWithProgress from "@/app/_components/ui/LinkWithProgress";

// Simple internal link
<LinkWithProgress href="/dashboard">
  Go to Dashboard
</LinkWithProgress>

// With styling
<LinkWithProgress href="/profile" className="text-blue-500 hover:underline">
  View Profile
</LinkWithProgress>
```

### Advanced Usage

```tsx
// With all Next.js Link props
<LinkWithProgress
  href="/dashboard/users/123"
  replace={false}
  scroll={true}
  shallow={false}
  prefetch={true}
  className="btn btn-primary"
  onClick={(e) => console.log('Link clicked')}
>
  View User Details
</LinkWithProgress>

// External link (no progress bar)
<LinkWithProgress
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
>
  External Link
</LinkWithProgress>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `href` | `string` | - | **Required.** The destination URL |
| `children` | `ReactNode` | - | **Required.** Link content |
| `className` | `string` | - | CSS classes to apply |
| `replace` | `boolean` | `false` | Replace current history entry |
| `scroll` | `boolean` | `true` | Scroll to top after navigation |
| `shallow` | `boolean` | `false` | Shallow routing |
| `prefetch` | `boolean` | - | Prefetch the page |
| `target` | `string` | - | Link target (e.g., "_blank") |
| `rel` | `string` | - | Link relationship |
| `onClick` | `function` | - | Click handler |
| `...otherProps` | `any` | - | Additional props passed through |

## Automatic Behavior

### Progress Bar Triggers

The progress bar automatically starts when:
- ✅ Internal navigation (same domain)
- ✅ Programmatic navigation via router.push/replace
- ✅ User clicks on the link

### Progress Bar Skips

The progress bar is automatically skipped for:
- ❌ External links (`http://`, `https://`)
- ❌ Email links (`mailto:`)
- ❌ Phone links (`tel:`)
- ❌ Hash links (`#section`)
- ❌ Links with `target="_blank"`
- ❌ Download links
- ❌ Links where `onClick` prevents default

### Progress Completion

The progress bar automatically completes when:
- ✅ New page loads (handled by `ProgressProvider`)
- ✅ Navigation finishes
- ✅ Route change occurs

## Migration Guide

### From Next.js Link

**Before:**
```tsx
import Link from "next/link";

<Link href="/dashboard">
  Dashboard
</Link>
```

**After:**
```tsx
import LinkWithProgress from "@/app/_components/ui/LinkWithProgress";

<LinkWithProgress href="/dashboard">
  Dashboard
</LinkWithProgress>
```

### From Manual NProgress

**Before:**
```tsx
import Link from "next/link";
import { useNProgress } from "@/hooks/useNProgress";

const { startProgress } = useNProgress();

<Link href="/dashboard" onClick={startProgress}>
  Dashboard
</Link>
```

**After:**
```tsx
import LinkWithProgress from "@/app/_components/ui/LinkWithProgress";

<LinkWithProgress href="/dashboard">
  Dashboard
</LinkWithProgress>
```

## Examples

### Navigation Menu

```tsx
const NavigationMenu = () => (
  <nav>
    <LinkWithProgress href="/dashboard">Dashboard</LinkWithProgress>
    <LinkWithProgress href="/users">Users</LinkWithProgress>
    <LinkWithProgress href="/reports">Reports</LinkWithProgress>
    <LinkWithProgress href="/settings">Settings</LinkWithProgress>
  </nav>
);
```

### User Profile Links

```tsx
const UserCard = ({ user }) => (
  <div className="user-card">
    <h3>{user.name}</h3>
    <LinkWithProgress href={`/users/${user.id}`}>
      View Profile
    </LinkWithProgress>
  </div>
);
```

### External Links

```tsx
const Footer = () => (
  <footer>
    <LinkWithProgress href="https://github.com" target="_blank">
      GitHub
    </LinkWithProgress>
    <LinkWithProgress href="mailto:support@example.com">
      Contact Support
    </LinkWithProgress>
  </footer>
);
```

## Integration with Existing Code

### ProgressProvider

The component works with the existing `ProgressProvider` that automatically completes the progress when navigation finishes.

### NProgress Configuration

Uses the existing NProgress configuration from `useNProgress` hook:
- Custom styling with gradient colors
- No spinner (disabled)
- Smooth animations
- Proper z-index

### TypeScript

Fully typed with comprehensive interfaces:
```typescript
interface LinkWithProgressProps {
  href: string;
  children: ReactNode;
  className?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  prefetch?: boolean;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  [key: string]: any;
}
```

## Performance

- **Lightweight**: Minimal overhead over standard Link
- **Efficient**: Only starts progress for internal navigation
- **Optimized**: Reuses existing NProgress configuration
- **Memory Safe**: Proper cleanup and event handling

## Troubleshooting

### Progress Bar Not Showing

1. Ensure `ProgressProvider` is wrapping your app
2. Check that NProgress is properly configured
3. Verify the link is internal (not external)

### Progress Bar Not Completing

1. Check that `ProgressProvider` is in your app layout
2. Verify route changes are being detected
3. Ensure no JavaScript errors are preventing completion

### TypeScript Errors

1. Ensure proper import path: `@/app/_components/ui/LinkWithProgress`
2. Check that all required props are provided
3. Verify TypeScript configuration includes the component

## Best Practices

1. **Use for Internal Navigation**: Perfect for dashboard, user profiles, settings
2. **Keep External Links Simple**: External links automatically skip progress
3. **Combine with Loading States**: Use with component-level loading indicators
4. **Test Navigation**: Verify progress bar works in all scenarios
5. **Monitor Performance**: Ensure no performance impact on navigation

## Migration Script

Use the provided migration script to help identify remaining Link components:

```bash
node src/scripts/migrate-links.js
```

This will analyze your codebase and provide migration suggestions for any remaining Next.js Link components.



