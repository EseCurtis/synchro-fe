"use client";

import { useRouter } from "next/navigation";
import NProgress from "nprogress";
import { useCallback } from "react";

/**
 * useNavigationProgress - Hook for triggering progress bar on navigation
 * 
 * Usage:
 * const { navigateWithProgress } = useNavigationProgress();
 * 
 * // Instead of router.push('/path')
 * navigateWithProgress('/path');
 */
export function useNavigationProgress() {
  const router = useRouter();

  const navigateWithProgress = useCallback((href: string) => {
    NProgress.start();
    router.push(href);
  }, [router]);

  const replaceWithProgress = useCallback((href: string) => {
    NProgress.start();
    router.replace(href);
  }, [router]);

  const backWithProgress = useCallback(() => {
    NProgress.start();
    router.back();
  }, [router]);

  const forwardWithProgress = useCallback(() => {
    NProgress.start();
    router.forward();
  }, [router]);

  return {
    navigateWithProgress,
    replaceWithProgress,
    backWithProgress,
    forwardWithProgress,
  };
}


