"use client";

import NProgress from "nprogress";
import { useEffect } from "react";

// Import NProgress CSS
import "nprogress/nprogress.css";

interface NProgressLoaderProps {
  isLoading: boolean;
}

/**
 * NProgressLoader - A top progress bar using NProgress library
 * 
 * Usage:
 * 1. Import the component: import { NProgressLoader } from "@/app/_components/ui/NProgressLoader";
 * 2. Use with loading state: <NProgressLoader isLoading={isLoading} />
 * 
 * Features:
 * - Uses NProgress library for smooth animations
 * - Matches app's primary gradient theme
 * - Lightweight and performant
 * - Auto-hide when loading completes
 */
export function NProgressLoader({ isLoading }: NProgressLoaderProps) {
  useEffect(() => {
    // Configure NProgress to match your app's theme
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

    // Custom CSS to match your gradient theme
    const style = document.createElement('style');
    style.textContent = `
      #nprogress .bar {
        background: var(--primary-bg-gradient) !important;
        height: 3px !important;
        box-shadow: 0 0 10px rgba(231, 60, 1, 0.5), 0 0 20px rgba(5, 18, 210, 0.3) !important;
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
      // Cleanup
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null; // NProgress handles the DOM manipulation
}


