import React from "react";
import { SidebarIconMap, SidebarIconType } from "./SidebarIcons";

interface SidebarIconProps {
  type: SidebarIconType;
  isActive?: boolean;
  size?: number;
  className?: string;
  activeColor?: string;
  inactiveColor?: string;
}

/**
 * SidebarIcon - A dynamic icon component for sidebar navigation
 * 
 * Features:
 * - Automatic active/inactive state handling
 * - Customizable colors and sizes
 * - TypeScript support with icon type validation
 * - Optimized SVG rendering
 * 
 * Usage:
 * <SidebarIcon type="home" isActive={true} />
 * <SidebarIcon type="user" isActive={false} activeColor="#e73c01" />
 */
export const SidebarIcon: React.FC<SidebarIconProps> = ({
  type,
  isActive = false,
  size = 24,
  className = "",
  activeColor = "#e73c01", // Primary orange
  inactiveColor = "#718096", // Gray
}) => {
  const IconComponent = SidebarIconMap[type];
  
  if (!IconComponent) {
    console.warn(`SidebarIcon: Unknown icon type "${type}"`);
    return null;
  }

  const color = isActive ? activeColor : inactiveColor;

  return (
    <IconComponent
      size={size}
      className={className}
      color={color}
    />
  );
};

export default SidebarIcon;
