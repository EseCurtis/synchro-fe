"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { ReactNode, useCallback } from "react";

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
  [key: string]: any; // Allow other props to be passed through
}

/**
 * LinkWithProgress - A Next.js Link component with automatic NProgress integration
 * 
 * This component automatically starts NProgress when clicked and handles
 * the progress completion when the navigation is finished.
 * 
 * Usage:
 * <LinkWithProgress href="/dashboard" className="text-blue-500">
 *   Go to Dashboard
 * </LinkWithProgress>
 * 
 * Features:
 * - Automatic NProgress integration
 * - Supports all Next.js Link props
 * - Handles both internal and external links
 * - Customizable progress behavior
 * - TypeScript support
 */
export function LinkWithProgress({
  href,
  children,
  className,
  replace = false,
  scroll = true,
  shallow = false,
  prefetch,
  target,
  rel,
  onClick,
  ...otherProps
}: LinkWithProgressProps) {
  const router = useRouter();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }

    // Don't start progress if:
    // 1. Event was prevented by custom onClick
    // 2. It's an external link (has target="_blank" or starts with http)
    // 3. It's a download link
    // 4. It's a hash link (same page navigation)
    if (
      e.defaultPrevented ||
      target === "_blank" ||
      href.startsWith("http") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("#")
    ) {
      return;
    }

    // Start NProgress for internal navigation
    NProgress.start();

    // Handle navigation based on replace prop
    if (replace) {
      router.replace(href, { scroll,  });
    } else {
      router.push(href, { scroll,  });
    }
  }, [href, onClick, target, replace, router, scroll, shallow]);

  // For external links or special cases, use regular Link
  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    target === "_blank"
  ) {
    return (
      <Link
        href={href}
        className={className}
        target={target}
        rel={rel}
        onClick={onClick}
        {...otherProps}
      >
        {children}
      </Link>
    );
  }

  // For internal links, use our custom Link with progress
  return (
    <Link
      href={href}
      className={className}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      prefetch={prefetch}
      onClick={handleClick}
      {...otherProps}
    >
      {children}
    </Link>
  );
}

export default LinkWithProgress;






