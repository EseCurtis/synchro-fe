"use client";
import Image from "next/image";
import { FC } from "react";

interface ComingSoonProps {
  type: string;
}

const ComingSoon: FC<ComingSoonProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="relative w-64 h-64 mb-6">
        <Image
          src="/images/noData/venues.svg"
          alt={`${type} coming soon`}
          fill
          className="object-contain opacity-50"
        />
      </div>
      <h3 className="text-2xl font-semibold text-gray-700 mb-2">
        {type} Management
      </h3>
      <p className="text-gray-500 mb-4">Coming Soon</p>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 max-w-md text-center">
        <p className="text-sm text-purple-700">
          {type} data management functionality is currently under development.
          Stay tuned for updates!
        </p>
      </div>
    </div>
  );
};

export default ComingSoon;

