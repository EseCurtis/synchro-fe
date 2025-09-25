"use client";

import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { useEffect } from "react";

// Import NProgress CSS
import "nprogress/nprogress.css";

/**
 * ProgressProvider - Handles NProgress for Next.js route changes
 * 
 * This component automatically shows/hides the progress bar during:
 * - Route changes (navigation between pages)
 * - Search parameter changes
 * - Any programmatic navigation
 */
export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Configure NProgress globally
    NProgress.configure({
      showSpinner: false,
      speed: 500,
      minimum: 0.1,
      template: `
        <div class="bar" role="bar">
          <div class="peg"></div>
        </div>
        <div class="spinner" role="spinner">
          <div class="spinner-icon"></div>
        </div>
      `,
    });

    // Apply custom styling to match your app's gradient theme
    const style = document.createElement('style');
    style.textContent = `
      #nprogress .bar {
        background: var(--primary-bg-gradient) !important;
        height: 3px !important;
        box-shadow: 0 0 10px rgba(231, 60, 1, 0.5), 0 0 20px rgba(5, 18, 210, 0.3) !important;
        z-index: 9999 !important;
      }
      
      #nprogress .peg {
        box-shadow: 0 0 10px rgba(231, 60, 1, 0.8), 0 0 5px rgba(5, 18, 210, 0.6) !important;
      }
      
      #nprogress .spinner {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    // Complete progress when route changes (page has loaded)
    NProgress.done();
  }, [pathname, searchParams]);

  return <>{children}</>;
}

