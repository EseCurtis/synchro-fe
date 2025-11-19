import React, { useState } from "react";
import SidebarIcon from "./SidebarIcon";
import { SidebarIconType } from "./SidebarIcons";

const SidebarIconDemo: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<SidebarIconType>("home");

  const iconTypes: SidebarIconType[] = [
    "home",
    "user", 
    "events",
    "venues",
    "kyc",
    "services",
    "support",
    "report",
    "audit",
    "faq",
    "settings"
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sidebar Icon System Demo
        </h1>
        
        {/* Interactive Demo */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Interactive Demo - Click to Toggle Active State
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {iconTypes.map((type) => (
              <div
                key={type}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors"
                onClick={() => setActiveIcon(activeIcon === type ? "home" : type)}
              >
                <SidebarIcon
                  type={type}
                  isActive={activeIcon === type}
                  size={32}
                />
                <span className="text-sm text-gray-600 mt-2 capitalize">
                  {type}
                </span>
                <span className="text-xs text-gray-400">
                  {activeIcon === type ? "Active" : "Inactive"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Size Variations */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Size Variations
          </h2>
          <div className="flex items-center gap-8">
            {[16, 20, 24, 32, 40, 48].map((size) => (
              <div key={size} className="flex flex-col items-center">
                <SidebarIcon
                  type="home"
                  isActive={true}
                  size={size}
                />
                <span className="text-xs text-gray-500 mt-2">{size}px</span>
              </div>
            ))}
          </div>
        </div>

        {/* Color Variations */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Color Variations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Default Colors */}
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Default Colors</h3>
              <div className="flex gap-4">
                <SidebarIcon type="home" isActive={false} size={32} />
                <SidebarIcon type="home" isActive={true} size={32} />
              </div>
              <p className="text-xs text-gray-500 mt-2">Inactive / Active</p>
            </div>

            {/* Custom Colors */}
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Custom Colors</h3>
              <div className="flex gap-4">
                <SidebarIcon
                  type="user"
                  isActive={false}
                  size={32}
                  inactiveColor="#6B7280"
                  activeColor="#10B981"
                />
                <SidebarIcon
                  type="user"
                  isActive={true}
                  size={32}
                  inactiveColor="#6B7280"
                  activeColor="#10B981"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Gray / Green</p>
            </div>

            {/* Blue Theme */}
            <div className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Blue Theme</h3>
              <div className="flex gap-4">
                <SidebarIcon
                  type="events"
                  isActive={false}
                  size={32}
                  inactiveColor="#9CA3AF"
                  activeColor="#3B82F6"
                />
                <SidebarIcon
                  type="events"
                  isActive={true}
                  size={32}
                  inactiveColor="#9CA3AF"
                  activeColor="#3B82F6"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">Light Blue / Blue</p>
            </div>
          </div>
        </div>

        {/* All Icons Grid */}
        <div className="bg-white rounded-lg p-6 mb-8 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            All Available Icons
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {iconTypes.map((type) => (
              <div key={type} className="flex flex-col items-center p-4 border border-gray-200 rounded-lg">
                <div className="flex gap-2 mb-2">
                  <SidebarIcon type={type} isActive={false} size={24} />
                  <SidebarIcon type={type} isActive={true} size={24} />
                </div>
                <span className="text-sm text-gray-600 capitalize text-center">
                  {type}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Comparison */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Performance Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="text-lg font-medium text-red-800 mb-2">Before (Images)</h3>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• 24+ HTTP requests for icons</li>
                <li>• Loading delays and layout shifts</li>
                <li>• Image caching overhead</li>
                <li>• No color customization</li>
                <li>• Bundle size impact</li>
              </ul>
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="text-lg font-medium text-green-800 mb-2">After (Components)</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• 0 HTTP requests (inline SVG)</li>
                <li>• Instant rendering, no layout shifts</li>
                <li>• Minimal memory footprint</li>
                <li>• Full color customization</li>
                <li>• Optimized bundle size</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarIconDemo;






