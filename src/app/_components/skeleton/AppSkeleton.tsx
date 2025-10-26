import React from "react";

/**
 * AppSkeleton - Comprehensive skeleton loader for the entire application
 * 
 * Features:
 * - Sidebar skeleton with navigation items
 * - Header skeleton with user info and actions
 * - Main content area skeleton
 * - Responsive design
 * - Smooth shimmer animations
 * - Matches the actual app layout structure
 */

interface AppSkeletonProps {
  showSidebar?: boolean;
  showHeader?: boolean;
  showContent?: boolean;
  contentType?: "dashboard" | "table" | "form" | "calendar" | "generic";
}

const SkeletonBox: React.FC<{
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
  delay?: number;
}> = ({ 
  className = "", 
  height = "h-4", 
  width = "w-full", 
  rounded = "rounded",
  delay = 0 
}) => (
  <div
    className={`${height} ${width} ${rounded} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className}`}
    style={{
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      animationDelay: `${delay}ms`,
    }}
  />
);

const SidebarSkeleton: React.FC = () => (
  <div className="w-[380px] h-[100vh] border-r border-[#CED3E4] bg-gradient-to-b from-gray-50 to-white">
    <div className="p-5">
      {/* Logo skeleton */}
      <div className="mb-8">
        <SkeletonBox height="h-8" width="w-32" />
      </div>
      
      {/* Navigation items */}
      <div className="space-y-2">
        {Array.from({ length: 11 }).map((_, index) => (
          <div
            key={index}
            className="py-3 px-4 rounded-md flex items-center gap-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon skeleton */}
            <SkeletonBox height="h-6" width="w-6" rounded="rounded" />
            
            {/* Text skeleton */}
            <SkeletonBox 
              height="h-4" 
              width={index === 0 ? "w-20" : "w-24"} 
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HeaderSkeleton: React.FC = () => (
  <div className="w-full px-4 py-6 border-b border-[#EDEFF5] bg-white">
    <div className="flex items-center justify-between">
      {/* Left side - Title and breadcrumb */}
      <div className="flex items-center gap-4">
        <SkeletonBox height="h-8" width="w-32" />
        <SkeletonBox height="h-4" width="w-16" />
      </div>
      
      {/* Right side - User info and actions */}
      <div className="flex items-center gap-4">
        {/* Search bar */}
        <SkeletonBox height="h-10" width="w-64" rounded="rounded-lg" />
        
        {/* Notifications */}
        <SkeletonBox height="h-10" width="w-10" rounded="rounded-full" />
        
        {/* User avatar */}
        <div className="flex items-center gap-3">
          <SkeletonBox height="h-10" width="w-10" rounded="rounded-full" />
          <div className="space-y-1">
            <SkeletonBox height="h-4" width="w-24" />
            <SkeletonBox height="h-3" width="w-16" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const DashboardContentSkeleton: React.FC = () => (
  <div className="p-6 space-y-6">
    {/* Welcome section */}
    <div className="mb-8">
      <SkeletonBox height="h-8" width="w-64" />
    </div>
    
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-white border border-[#EDEFF5] rounded-lg p-6"
        >
          <div className="flex items-center gap-4">
            <SkeletonBox height="h-12" width="w-12" rounded="rounded-lg" />
            <div className="space-y-2">
              <SkeletonBox height="h-4" width="w-20" />
              <SkeletonBox height="h-6" width="w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
    
    {/* Charts section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Line chart */}
      <div className="bg-white border border-[#EDEFF5] rounded-lg p-6">
        <SkeletonBox height="h-6" width="w-48" className="mb-4" />
        <SkeletonBox height="h-64" width="w-full" rounded="rounded-lg" />
      </div>
      
      {/* Pie chart */}
      <div className="bg-white border border-[#EDEFF5] rounded-lg p-6">
        <SkeletonBox height="h-6" width="w-40" className="mb-4" />
        <SkeletonBox height="h-64" width="w-full" rounded="rounded-full" />
      </div>
    </div>
  </div>
);

const TableContentSkeleton: React.FC = () => (
  <div className="p-6 space-y-6">
    {/* Page header */}
    <div className="flex items-center justify-between">
      <SkeletonBox height="h-8" width="w-48" />
      <SkeletonBox height="h-10" width="w-32" rounded="rounded-lg" />
    </div>
    
    {/* Filters */}
    <div className="flex gap-4">
      <SkeletonBox height="h-10" width="w-48" rounded="rounded-lg" />
      <SkeletonBox height="h-10" width="w-32" rounded="rounded-lg" />
      <SkeletonBox height="h-10" width="w-24" rounded="rounded-lg" />
    </div>
    
    {/* Table */}
    <div className="bg-white border border-[#EDEFF5] rounded-lg overflow-hidden">
      {/* Table header */}
      <div className="grid grid-cols-5 gap-4 p-4 border-b border-[#EDEFF5]">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonBox key={index} height="h-5" width="w-20" />
        ))}
      </div>
      
      {/* Table rows */}
      {Array.from({ length: 10 }).map((_, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-5 gap-4 p-4 border-b border-[#EDEFF5] last:border-b-0">
          {Array.from({ length: 5 }).map((_, colIndex) => (
            <SkeletonBox 
              key={colIndex} 
              height="h-4" 
              width={colIndex === 4 ? "w-24" : "w-32"} 
            />
          ))}
        </div>
      ))}
    </div>
    
    {/* Pagination */}
    <div className="flex items-center justify-between">
      <SkeletonBox height="h-4" width="w-32" />
      <div className="flex gap-2">
        <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
        <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
        <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
      </div>
    </div>
  </div>
);

const CalendarContentSkeleton: React.FC = () => (
  <div className="p-6 space-y-6">
    {/* Calendar header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <SkeletonBox height="h-6" width="w-6" rounded="rounded" />
          <SkeletonBox height="h-6" width="w-6" rounded="rounded" />
        </div>
        <SkeletonBox height="h-6" width="w-32" />
      </div>
      <SkeletonBox height="h-10" width="w-24" rounded="rounded-lg" />
    </div>
    
    {/* Calendar grid */}
    <div className="bg-white border border-[#EDEFF5] rounded-lg overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 border-b border-[#EDEFF5]">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="p-3 text-center">
            <SkeletonBox height="h-4" width="w-12" className="mx-auto" />
          </div>
        ))}
      </div>
      
      {/* Calendar days */}
      <div className="grid grid-cols-7">
        {Array.from({ length: 35 }).map((_, index) => (
          <div key={index} className="h-24 border border-[#EDEFF5] p-2">
            <SkeletonBox height="h-4" width="w-6" className="mb-2" />
            <div className="space-y-1">
              <SkeletonBox height="h-3" width="w-full" />
              <SkeletonBox height="h-3" width="w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const FormContentSkeleton: React.FC = () => (
  <div className="p-6 space-y-6">
    {/* Form header */}
    <div className="mb-6">
      <SkeletonBox height="h-8" width="w-48" />
      <SkeletonBox height="h-4" width="w-64" className="mt-2" />
    </div>
    
    {/* Form fields */}
    <div className="bg-white border border-[#EDEFF5] rounded-lg p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <SkeletonBox height="h-4" width="w-24" />
          <SkeletonBox height="h-10" width="w-full" rounded="rounded-lg" />
        </div>
        <div className="space-y-2">
          <SkeletonBox height="h-4" width="w-20" />
          <SkeletonBox height="h-10" width="w-full" rounded="rounded-lg" />
        </div>
      </div>
      
      <div className="space-y-2">
        <SkeletonBox height="h-4" width="w-32" />
        <SkeletonBox height="h-24" width="w-full" rounded="rounded-lg" />
      </div>
      
      <div className="space-y-2">
        <SkeletonBox height="h-4" width="w-28" />
        <SkeletonBox height="h-10" width="w-full" rounded="rounded-lg" />
      </div>
    </div>
    
    {/* Form actions */}
    <div className="flex gap-4 justify-end">
      <SkeletonBox height="h-10" width="w-24" rounded="rounded-lg" />
      <SkeletonBox height="h-10" width="w-32" rounded="rounded-lg" />
    </div>
  </div>
);

const GenericContentSkeleton: React.FC = () => (
  <div className="p-6 space-y-6">
    {/* Page header */}
    <div className="mb-6">
      <SkeletonBox height="h-8" width="w-64" />
      <SkeletonBox height="h-4" width="w-96" className="mt-2" />
    </div>
    
    {/* Content blocks */}
    {Array.from({ length: 3 }).map((_, index) => (
      <div key={index} className="bg-white border border-[#EDEFF5] rounded-lg p-6">
        <SkeletonBox height="h-6" width="w-48" className="mb-4" />
        <div className="space-y-3">
          <SkeletonBox height="h-4" width="w-full" />
          <SkeletonBox height="h-4" width="w-3/4" />
          <SkeletonBox height="h-4" width="w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const AppSkeleton: React.FC<AppSkeletonProps> = ({
  showSidebar = true,
  showHeader = true,
  showContent = true,
  contentType = "generic",
}) => {
  const renderContent = () => {
    switch (contentType) {
      case "dashboard":
        return <DashboardContentSkeleton />;
      case "table":
        return <TableContentSkeleton />;
      case "calendar":
        return <CalendarContentSkeleton />;
      case "form":
        return <FormContentSkeleton />;
      default:
        return <GenericContentSkeleton />;
    }
  };

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      {/* Add shimmer animation keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      
      {/* Sidebar */}
      {showSidebar && <SidebarSkeleton />}
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        {showHeader && <HeaderSkeleton />}
        
        {/* Content */}
        {showContent && (
          <div className="flex-1 overflow-y-auto">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSkeleton;





