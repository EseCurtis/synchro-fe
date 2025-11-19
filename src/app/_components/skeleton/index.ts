/**
 * Skeleton Loaders - Comprehensive loading states for the application
 * 
 * This module provides various skeleton loaders for different parts of the application:
 * - AppSkeleton: Full application skeleton with sidebar, header, and content
 * - EventsSkeleton: Specialized skeleton for events/calendar pages
 * - TableSkeleton: Generic table skeleton loader
 * - FormSkeleton: Form-specific skeleton loader
 * - CardSkeleton: Card component skeleton loader
 */

export { default as AppSkeleton } from './AppSkeleton';
export { default as EventsSkeleton } from './EventsSkeleton';
export { default as TableSkeleton } from './TableSkeleton';

// Re-export types for convenience
export type { default as AppSkeletonProps } from './AppSkeleton';
export type { default as EventsSkeletonProps } from './EventsSkeleton';
export type { default as TableSkeletonProps } from './TableSkeleton';

