import { Flag, Menu } from "lucide-react";

interface MapToolbarProps {
  variant?: "default" | "with-back" | "collapsed";
  onDateRangeClick?: () => void;
  onScanAreaClick?: () => void;
  onBackToOverviewClick?: () => void;
  onSearchChange?: (value: string) => void;
  onFlagClick?: () => void;
  isMenuMinimized?: boolean;
  onToggleMenu?: () => void;
  flaggedDeviceCount?: number;
}

export function MapToolbar({
  variant = "default",
  onDateRangeClick,
  onScanAreaClick,
  onBackToOverviewClick,
  onSearchChange,
  onFlagClick,
  isMenuMinimized = false,
  onToggleMenu,
  flaggedDeviceCount = 0,
}: MapToolbarProps) {
  const isCollapsed = variant === "collapsed";
  const showBackButton = variant === "with-back" || isCollapsed;

  return (
    <div className="bg-[rgba(10,10,10,0.98)] border-b border-[rgba(255,255,255,0.08)] h-[50px] w-full px-3 py-2 flex items-center justify-between">
      {/* Left Section - Collapse Button (only on collapsed variant) */}
      {isCollapsed && (
        <button className="flex items-center justify-center w-[50px] h-full hover:bg-[rgba(255,255,255,0.05)] transition-colors rounded-md">
          <img src="/icons/chevron-icon.svg" alt="" className="w-[14px] h-[14px] rotate-180" />
        </button>
      )}

      {/* Left Section - Action Buttons */}
      <div className="flex items-center gap-1.5">
        {/* Menu Toggle Button - Only when menu is minimized */}
        {isMenuMinimized && (
          <button
            onClick={onToggleMenu}
            className="flex items-center justify-center w-8 h-8 hover:bg-[rgba(255,255,255,0.05)] transition-colors rounded-md mr-1"
            title="Open menu"
          >
            <Menu size={18} className="text-[rgba(255,255,255,0.7)]" />
          </button>
        )}
        {/* Date Range Button */}
        <button
          onClick={onDateRangeClick}
          className="flex items-center gap-1.5 px-3 py-1.5 border border-[rgba(255,255,255,0.12)] rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          <img src="/icons/calendar-icon.svg" alt="" className="w-[14px] h-[14px]" />
          <span className="text-[13px] font-['Inter:Medium',sans-serif] font-medium text-[rgba(255,255,255,0.7)]">
            Date Range
          </span>
        </button>

        {/* Scan this Area Button */}
        <button
          onClick={onScanAreaClick}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-[rgba(255,255,255,0.05)] transition-colors"
        >
          <img src="/icons/scan-icon.svg" alt="" className="w-[16px] h-[16px]" />
          <span className="text-[13px] font-['Inter:Medium',sans-serif] font-medium text-[#8a8a8a]">
            Scan this Area
          </span>
        </button>
      </div>

      {/* Center Section - Back Button + Search (conditional) */}
      <div className="flex items-center gap-1.5">
        {showBackButton && (
          <button
            onClick={onBackToOverviewClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#181818] rounded-md hover:bg-[#222222] transition-colors"
          >
            <img src="/icons/chevron-icon.svg" alt="" className="w-[16px] h-[16px]" />
            <span className="text-[13px] font-['Inter:Medium',sans-serif] font-medium text-[#8a8a8a]">
              Back to Overview
            </span>
          </button>
        )}

        {/* Search Input */}
        {!isCollapsed && (
          <div className="relative">
            <img src="/icons/search-icon.svg" alt="" className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px]" />
            <input
              type="text"
              placeholder="Search address or coordinates"
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-[250px] h-[33px] bg-[#080808] border border-[#2b2b2b] rounded-md pl-9 pr-3 text-[12px] font-['Inter:Medium',sans-serif] font-medium text-[#e5e5e5] placeholder-[#8a8a8a] focus:outline-none focus:border-[#4a4a4a] transition-colors"
            />
          </div>
        )}
      </div>

      {/* Right Section - Tool Buttons */}
      <div className="flex items-center gap-0.5">
        {/* Map Layers */}
        <button className="flex items-center justify-center w-8 h-8 bg-[rgba(8,8,8,0.8)] hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/layers-icon.svg" alt="" className="w-[16px] h-[16px]" />
        </button>

        {/* Measure Tool */}
        <button className="flex items-center justify-center w-8 h-8 bg-[rgba(8,8,8,0.8)] hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/measure-icon.svg" alt="" className="w-[16px] h-[16px]" />
        </button>

        {/* Shape Tool */}
        <button className="flex items-center justify-center w-8 h-8 bg-[rgba(8,8,8,0.8)] hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/shape-icon.svg" alt="" className="w-[16px] h-[16px]" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-[rgba(255,255,255,0.1)] mx-1" />

        {/* Monitor Mode */}
        <button className="flex items-center justify-center w-8 h-8 bg-[rgba(8,8,8,0.8)] hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/monitor-icon.svg" alt="" className="w-[16px] h-[16px] opacity-60" />
        </button>

        {/* 3D View */}
        <button className="flex items-center justify-center w-8 h-8 bg-[rgba(8,8,8,0.8)] hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/3d-icon.svg" alt="" className="w-[16px] h-[16px]" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-[rgba(255,255,255,0.1)] mx-1" />

        {/* Flag */}
        <button
          onClick={onFlagClick}
          className="flex items-center justify-center w-8 h-8 hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors relative"
        >
          <Flag size={16} className="text-[rgba(255,255,255,0.7)]" />
          {flaggedDeviceCount > 0 && (
            <div className="absolute top-0 right-0 min-w-[16px] h-[16px] px-1 bg-[#ffa500] rounded-full flex items-center justify-center z-10 border border-[rgba(10,10,10,0.98)]">
              <span className="text-[9px] font-['IBM_Plex_Sans:Medium',sans-serif] font-medium text-[#1a1a1a] leading-none">
                {flaggedDeviceCount > 99 ? '99+' : flaggedDeviceCount}
              </span>
            </div>
          )}
        </button>

        {/* Home */}
        <button className="flex items-center justify-center w-8 h-8 hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/home-icon.svg" alt="" className="w-[16px] h-[16px]" />
        </button>

        {/* Settings */}
        <button className="flex items-center justify-center w-8 h-8 hover:bg-[rgba(255,255,255,0.05)] rounded transition-colors">
          <img src="/icons/settings-icon.svg" alt="" className="w-[16px] h-[16px]" />
        </button>
      </div>
    </div>
  );
}
