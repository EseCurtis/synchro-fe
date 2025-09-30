"use client";

import NProgress from "nprogress";
import { useCallback, useEffect } from "react";

export function useNProgress() {
  useEffect(() => {
    // Configure NProgress globally
    NProgress.configure({
      showSpinner: false,
      speed: 500,
      minimum: 0.1,
    });

    // Apply custom styling
    const style = document.createElement("style");
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
      document.head.removeChild(style);
    };
  }, []);

  const startProgress = useCallback(() => {
    NProgress.start();
  }, []);

  const setProgress = useCallback((progress: number) => {
    NProgress.set(progress);
  }, []);

  const incrementProgress = useCallback((amount: number = 0.1) => {
    NProgress.inc(amount);
  }, []);

  const completeProgress = useCallback(() => {
    NProgress.done();
  }, []);

  const withProgress = useCallback(
    async (
      asyncFunction: () => Promise<any>,
      options?: {
        startProgress?: boolean;
        incrementOnComplete?: boolean;
      }
    ): Promise<any> => {
      const { startProgress: shouldStart = true, incrementOnComplete = true } =
        options || {};

      try {
        if (shouldStart) {
          startProgress();
        }
        const result = await asyncFunction();
        if (incrementOnComplete) {
          incrementProgress(0.3);
        }
        return result;
      } finally {
        if (shouldStart) {
          completeProgress();
        }
      }
    },
    [startProgress, incrementProgress, completeProgress]
  );

  return {
    startProgress,
    setProgress,
    incrementProgress,
    completeProgress,
    withProgress,
  };
}


