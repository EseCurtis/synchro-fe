import React from "react";

/**
 * EventsSkeleton - Detailed skeleton loader for the approved events page
 * 
 * Features:
 * - Calendar grid skeleton with proper spacing
 * - Month navigation skeleton
 * - Event cards skeleton with realistic proportions
 * - Smooth shimmer animation
 * - Responsive design matching the actual layout
 */

interface EventsSkeletonProps {
  showCalendar?: boolean;
  showEventList?: boolean;
}

const SkeletonBox: React.FC<{
  className?: string;
  height?: string;
  width?: string;
  rounded?: string;
}> = ({ className = "", height = "h-4", width = "w-full", rounded = "rounded" }) => (
  <div
    className={`${height} ${width} ${rounded} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className}`}
    style={{
      background: "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
    }}
  />
);

const CalendarDaySkeleton: React.FC = () => (
  <div className="col-span-1 h-[120px] border border-[#EDEFF5] bg-white">
    <div className="flex w-full h-full items-center gap-3 flex-col p-3">
      {/* Day number */}
      <SkeletonBox height="h-3" width="w-6" className="self-start" />
      
      {/* Event indicators */}
      <div className="flex justify-center items-center mt-4 gap-1">
        {Array.from({ length: Math.floor(Math.random() * 4) + 1 }).map((_, index) => (
          <SkeletonBox
            key={index}
            height="h-7"
            width="w-7"
            rounded="rounded-full"
            className="border border-white"
          />
        ))}
      </div>
      
      {/* More events indicator */}
      {Math.random() > 0.7 && (
        <SkeletonBox height="h-3" width="w-16" className="mt-1" />
      )}
    </div>
  </div>
);

const EventCardSkeleton: React.FC = () => (
  <div className="bg-white border border-[#EDEFF5] rounded-lg p-4 mb-4">
    <div className="flex items-start gap-4">
      {/* Event image */}
      <SkeletonBox
        height="h-16"
        width="w-16"
        rounded="rounded-lg"
        className="flex-shrink-0"
      />
      
      {/* Event details */}
      <div className="flex-1 space-y-3">
        {/* Event title */}
        <SkeletonBox height="h-5" width="w-3/4" />
        
        {/* Event description */}
        <SkeletonBox height="h-4" width="w-full" />
        <SkeletonBox height="h-4" width="w-2/3" />
        
        {/* Event meta info */}
        <div className="flex gap-4 mt-3">
          <SkeletonBox height="h-4" width="w-20" />
          <SkeletonBox height="h-4" width="w-24" />
          <SkeletonBox height="h-4" width="w-16" />
        </div>
        
        {/* Action buttons */}
        <div className="flex gap-2 mt-4">
          <SkeletonBox height="h-8" width="w-20" rounded="rounded-md" />
          <SkeletonBox height="h-8" width="w-24" rounded="rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

const MonthNavigationSkeleton: React.FC = () => (
  <div className="pb-7 flex items-center justify-between">
    <div className="flex items-center gap-4">
      {/* Navigation arrows */}
      <div className="flex gap-3">
        <SkeletonBox height="h-6" width="w-6" rounded="rounded" />
        <SkeletonBox height="h-6" width="w-6" rounded="rounded" />
      </div>
      
      {/* Month and year */}
      <SkeletonBox height="h-6" width="w-32" />
    </div>
    
    {/* Year selector */}
    <SkeletonBox height="h-10" width="w-24" rounded="rounded-md" />
  </div>
);

const CalendarHeaderSkeleton: React.FC = () => (
  <div className="grid grid-cols-7 w-full border-l border-r">
    {Array.from({ length: 7 }).map((_, index) => (
      <div key={index} className="col-span-1 text-center py-2 border-t">
        <SkeletonBox height="h-4" width="w-12" className="mx-auto" />
      </div>
    ))}
  </div>
);

const CalendarGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-7 w-full h-full border-l border-r">
    {Array.from({ length: 35 }).map((_, index) => (
      <CalendarDaySkeleton key={index} />
    ))}
  </div>
);

const EventListSkeleton: React.FC = () => (
  <div className="space-y-4">
    {/* Table header */}
    <div className="bg-white border border-[#EDEFF5] rounded-lg p-4">
      <div className="grid grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonBox key={index} height="h-5" width="w-20" />
        ))}
      </div>
    </div>
    
    {/* Table rows */}
    {Array.from({ length: 8 }).map((_, index) => (
      <div key={index} className="bg-white border border-[#EDEFF5] rounded-lg p-4">
        <div className="grid grid-cols-5 gap-4 items-center">
          <SkeletonBox height="h-4" width="w-32" />
          <SkeletonBox height="h-4" width="w-20" />
          <SkeletonBox height="h-4" width="w-24" />
          <SkeletonBox height="h-4" width="w-28" />
          <div className="flex gap-2">
            <SkeletonBox height="h-8" width="w-16" rounded="rounded-md" />
            <SkeletonBox height="h-8" width="w-16" rounded="rounded-md" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const EventsSkeleton: React.FC<EventsSkeletonProps> = ({
  showCalendar = true,
  showEventList = false,
}) => {
  return (
    <div className="w-full">
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
      
      <div style={{ margin: "4em 0" }}>
        {/* Month Navigation Skeleton */}
        <MonthNavigationSkeleton />
        
        {showCalendar && (
          <div className="bg-white border border-[#EDEFF5] rounded-lg overflow-hidden">
            {/* Calendar Header */}
            <CalendarHeaderSkeleton />
            
            {/* Calendar Grid */}
            <CalendarGridSkeleton />
          </div>
        )}
        
        {showEventList && (
          <div className="mt-8">
            <EventListSkeleton />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsSkeleton;



