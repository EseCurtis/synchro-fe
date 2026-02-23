import React from "react";

/**
 * TableSkeleton - Detailed skeleton loader for table components
 *
 * Features:
 * - Realistic table structure with headers and rows
 * - Configurable number of rows and columns
 * - Action buttons skeleton
 * - Pagination skeleton
 * - Responsive design
 */

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showHeader?: boolean;
  showPagination?: boolean;
  showActions?: boolean;
  className?: string;
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
  delay = 0,
}) => (
  <div
    className={`${height} ${width} ${rounded} bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse ${className}`}
    style={{
      background:
        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      animationDelay: `${delay}ms`,
    }}
  />
);

const TableRowSkeleton: React.FC<{
  columns: number;
  showActions: boolean;
  rowIndex: number;
}> = ({ columns, showActions, rowIndex }) => (
  <div className="grid grid-cols-5 gap-4 p-4 border-b border-[#EDEFF5] last:border-b-0">
    {Array.from({ length: columns }).map((_, colIndex) => (
      <SkeletonBox
        key={colIndex}
        height="h-4"
        width={colIndex === columns - 1 && showActions ? "w-24" : "w-32"}
        delay={rowIndex * 50 + colIndex * 10}
      />
    ))}
    {showActions && (
      <div className="flex gap-2">
        <SkeletonBox
          height="h-8"
          width="w-16"
          rounded="rounded-md"
          delay={rowIndex * 50 + 100}
        />
        <SkeletonBox
          height="h-8"
          width="w-16"
          rounded="rounded-md"
          delay={rowIndex * 50 + 150}
        />
      </div>
    )}
  </div>
);

const TableHeaderSkeleton: React.FC<{
  columns: number;
  showActions: boolean;
}> = ({ columns, showActions }) => (
  <div className="grid grid-cols-5 gap-4 p-4 border-b border-[#EDEFF5] bg-gray-50">
    {Array.from({ length: columns }).map((_, index) => (
      <SkeletonBox key={index} height="h-5" width="w-20" delay={index * 50} />
    ))}
    {showActions && (
      <SkeletonBox height="h-5" width="w-16" delay={columns * 50} />
    )}
  </div>
);

const PaginationSkeleton: React.FC = () => (
  <div className="flex items-center justify-between mt-6">
    <SkeletonBox height="h-4" width="w-32" />
    <div className="flex gap-2">
      <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
      <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
      <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
      <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
      <SkeletonBox height="h-8" width="w-8" rounded="rounded" />
    </div>
  </div>
);

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 8,
  columns = 5,
  showHeader = true,
  showPagination = true,
  showActions = true,
  className = "",
}) => {
  return (
    <div className={`w-full ${className}`}>
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

      <div className="bg-white border border-[#EDEFF5] rounded-lg overflow-hidden">
        {/* Table Header */}
        {showHeader && (
          <TableHeaderSkeleton columns={columns} showActions={showActions} />
        )}

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, index) => (
          <TableRowSkeleton
            key={index}
            columns={columns}
            showActions={showActions}
            rowIndex={index}
          />
        ))}
      </div>

      {/* Pagination */}
      {showPagination && <PaginationSkeleton />}
    </div>
  );
};

export default TableSkeleton;
