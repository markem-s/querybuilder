import { useState } from "react";
import { Flag, ChevronLeft, ChevronRight, Search, SlidersHorizontal, MoreVertical, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface FlaggedDevice {
  id: string;
  name: string;
  deviceId: string;
  description: string;
  addedTime: string;
}

interface FlaggedDevicesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onDeviceSelect?: (deviceId: string) => void;
  isDeviceDrawerOpen?: boolean;
}

// Mock data for flagged devices
const mockFlaggedDevices: FlaggedDevice[] = [
  {
    id: "1",
    name: "Primary S...",
    deviceId: "device_abc1...",
    description: "High dwell time near ...",
    addedTime: "2min ago",
  },
  {
    id: "2",
    name: "Crime Sc...",
    deviceId: "device_def4...",
    description: "Present at scene 10:4...",
    addedTime: "5min ago",
  },
  {
    id: "3",
    name: "Co-Travel...",
    deviceId: "device_ghi7...",
    description: "Travels with device_a...",
    addedTime: "6min ago",
  },
  {
    id: "4",
    name: "Network ...",
    deviceId: "device_jkl0...",
    description: "Central hub connectin...",
    addedTime: "1min ago",
  },
  {
    id: "5",
    name: "Suspect ...",
    deviceId: "device_mno3...",
    description: "Multiple locations acr...",
    addedTime: "3min ago",
  },
  {
    id: "6",
    name: "Network ...",
    deviceId: "device_pqr6...",
    description: "Connected to hub de...",
    addedTime: "6min ago",
  },
  {
    id: "7",
    name: "Trace Su...",
    deviceId: "device_stu9...",
    description: "Unusual movement p...",
    addedTime: "4min ago",
  },
  {
    id: "8",
    name: "Monitor T...",
    deviceId: "device_vwx2...",
    description: "Seen at multiple crim...",
    addedTime: "7min ago",
  },
];

// First Header Bar Component
function FirstHeaderBar({
  onClose,
  deviceCount,
  isMinimized,
  onToggleMinimize
}: {
  onClose: () => void;
  deviceCount: number;
  isMinimized: boolean;
  onToggleMinimize: () => void;
}) {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[44px] items-center pb-px relative shrink-0 w-full border-b border-[#212121]">
      <div className="flex items-center gap-[8px] px-[12px]">
        {/* Flag Icon */}
        <Flag size={18} className="text-[#9b9b9b]" />

        {/* Title - Hidden when minimized */}
        {!isMinimized && (
          <>
            <div className="flex flex-col">
              <div className="text-[13px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5]">
                Flagged Devices
              </div>
            </div>

            {/* Device Count */}
            <div className="text-[11px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#6b6b6b] ml-2">
              {deviceCount} devices
            </div>
          </>
        )}
      </div>

      {/* Minimize and Close Buttons */}
      <div className="ml-auto px-[12px] flex gap-2">
        <button
          onClick={onToggleMinimize}
          className="flex items-center justify-center size-[24px] hover:bg-[#1a1a1a] rounded transition-colors"
          title={isMinimized ? "Expand" : "Minimize"}
        >
          {isMinimized ? (
            <ChevronLeft size={16} className="text-[#9b9b9b]" />
          ) : (
            <ChevronRight size={16} className="text-[#9b9b9b]" />
          )}
        </button>
        <button
          onClick={onClose}
          className="flex items-center justify-center size-[24px] hover:bg-[#1a1a1a] rounded transition-colors"
        >
          <X size={16} className="text-[#9b9b9b]" />
        </button>
      </div>
    </div>
  );
}

// Table Header Component
function TableHeader({
  allSelected,
  onSelectAll,
  isMinimized
}: {
  allSelected: boolean;
  onSelectAll: () => void;
  isMinimized: boolean;
}) {
  if (isMinimized) {
    return (
      <div className="bg-[#0d0d0d] border-b border-[#212121] shrink-0">
        <div className="grid grid-cols-[32px_1fr_32px] gap-2 items-center px-3 py-3">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={onSelectAll}
            className="w-4 h-4 appearance-none bg-[#1a1a1a] border border-[#2b2b2b] rounded cursor-pointer checked:bg-[#0066ff] checked:border-[#0066ff] relative after:content-[''] after:absolute after:left-[3px] after:top-0 after:w-[5px] after:h-[9px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 checked:after:opacity-100"
          />
          <div className="text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] uppercase">
            Name
          </div>
          <div className="text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] uppercase">
            {/* Empty header for actions column */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] border-b border-[#212121] shrink-0">
      <div className="grid grid-cols-[32px_110px_1fr_80px_32px] gap-2 items-center px-3 py-3">
        <input
          type="checkbox"
          checked={allSelected}
          onChange={onSelectAll}
          className="w-4 h-4 appearance-none bg-[#1a1a1a] border border-[#2b2b2b] rounded cursor-pointer checked:bg-[#0066ff] checked:border-[#0066ff] relative after:content-[''] after:absolute after:left-[3px] after:top-0 after:w-[5px] after:h-[9px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 checked:after:opacity-100"
        />
        <div className="text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] uppercase">
          Name
        </div>
        <div className="text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] uppercase">
          Description
        </div>
        <div className="text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] uppercase">
          Added
        </div>
        <div className="text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] uppercase">
          {/* Empty header for actions column */}
        </div>
      </div>
    </div>
  );
}

// Device Row Component
function DeviceRow({
  device,
  isSelected,
  onToggleSelect,
  onDeviceClick,
  isMinimized
}: {
  device: FlaggedDevice;
  isSelected: boolean;
  onToggleSelect: () => void;
  onDeviceClick?: () => void;
  isMinimized: boolean;
}) {
  if (isMinimized) {
    return (
      <div className="border-b border-[#212121] hover:bg-[#0d0d0d] transition-colors">
        <div className="grid grid-cols-[32px_1fr_32px] gap-2 items-center px-3 py-3">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onToggleSelect}
            className="w-4 h-4 appearance-none bg-[#1a1a1a] border border-[#2b2b2b] rounded cursor-pointer checked:bg-[#0066ff] checked:border-[#0066ff] relative after:content-[''] after:absolute after:left-[3px] after:top-0 after:w-[5px] after:h-[9px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 checked:after:opacity-100"
          />
          <div
            className="flex items-center gap-1.5 min-w-0 cursor-pointer"
            onClick={onDeviceClick}
          >
            <span className="text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5] truncate">
              {device.name}
            </span>
          </div>
          <div className="flex items-center justify-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-1 hover:bg-[#1a1a1a] rounded transition-colors">
                  <MoreVertical size={16} className="text-[#9b9b9b]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => console.log('Export to Hydrogen:', device.id)}>
                  <span className="text-[12px]">Export to Hydrogen</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Export to Neon:', device.id)}>
                  <span className="text-[12px]">Export to Neon</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Remove flag:', device.id)} className="text-red-400">
                  <span className="text-[12px]">Remove Flag</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="border-b border-[#212121] hover:bg-[#0d0d0d] transition-colors">
      <div className="grid grid-cols-[32px_110px_1fr_80px_32px] gap-2 items-center px-3 py-3">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggleSelect}
          className="w-4 h-4 appearance-none bg-[#1a1a1a] border border-[#2b2b2b] rounded cursor-pointer checked:bg-[#0066ff] checked:border-[#0066ff] relative after:content-[''] after:absolute after:left-[3px] after:top-0 after:w-[5px] after:h-[9px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:opacity-0 checked:after:opacity-100"
        />
        <div
          className="flex items-center gap-1.5 min-w-0 cursor-pointer"
          onClick={onDeviceClick}
        >
          <span className="text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5] truncate">
            {device.name}
          </span>
        </div>
        <div
          className="text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] truncate cursor-pointer"
          onClick={onDeviceClick}
        >
          {device.description}
        </div>
        <div
          className="text-[11px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] cursor-pointer"
          onClick={onDeviceClick}
        >
          {device.addedTime}
        </div>
        <div className="flex items-center justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1 hover:bg-[#1a1a1a] rounded transition-colors">
                <MoreVertical size={16} className="text-[#9b9b9b]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={() => console.log('Export to Hydrogen:', device.id)}>
                <span className="text-[12px]">Export to Hydrogen</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Export to Neon:', device.id)}>
                <span className="text-[12px]">Export to Neon</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log('Remove flag:', device.id)} className="text-red-400">
                <span className="text-[12px]">Remove Flag</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

// Footer Component
function ExportFooter({ selectedCount, isMinimized }: { selectedCount: number; isMinimized: boolean }) {
  if (isMinimized) {
    return (
      <div className="bg-[#0d0d0d] border-t border-[#2b2b2b] px-3 py-3 flex justify-between shrink-0">
        <button
          className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded transition-colors"
          title={`Export to Hydrogen (${selectedCount})`}
        >
          <span className="text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] font-bold">H</span>
        </button>
        <button
          className="w-[32px] h-[32px] flex items-center justify-center bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded transition-colors"
          title={`Export to Neon (${selectedCount})`}
        >
          <span className="text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] font-bold">N</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0d0d0d] border-t border-[#2b2b2b] px-4 py-3 flex gap-3 shrink-0">
      <button className="flex-1 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded-[8px] text-[13px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors">
        Export to Hydrogen ({selectedCount})
      </button>
      <button className="flex-1 px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded-[8px] text-[13px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors">
        Export to Neon ({selectedCount})
      </button>
    </div>
  );
}

export function FlaggedDevicesDrawer({ isOpen, onClose, onDeviceSelect, isDeviceDrawerOpen }: FlaggedDevicesDrawerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [devices] = useState<FlaggedDevice[]>(mockFlaggedDevices);
  const [isMinimized, setIsMinimized] = useState(false);

  const filteredDevices = devices.filter(
    (device) =>
      device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.deviceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      device.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelectDevice = (id: string) => {
    setSelectedDevices((prev) =>
      prev.includes(id) ? prev.filter((deviceId) => deviceId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDevices.length === filteredDevices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(filteredDevices.map((d) => d.id));
    }
  };

  const handleDeviceClick = (deviceId: string) => {
    if (onDeviceSelect) {
      onDeviceSelect(deviceId);
    }
  };

  if (!isOpen) return null;

  // Adjust right position based on whether device drawer is open
  const rightPosition = isDeviceDrawerOpen ? "320px" : "0";

  // Adjust width based on minimized state
  const drawerWidth = isMinimized ? "180px" : "400px";

  return (
    <div
      className="fixed top-[50px] bottom-0 z-40 bg-[#080808] shadow-2xl border-l border-[#2b2b2b] flex flex-col transition-all duration-300"
      style={{ right: rightPosition, width: drawerWidth }}
    >
      {/* First Header Bar */}
      <FirstHeaderBar
        onClose={onClose}
        deviceCount={devices.length}
        isMinimized={isMinimized}
        onToggleMinimize={() => setIsMinimized(!isMinimized)}
      />

      {/* Search and Filter Bar - Hidden when minimized */}
      {!isMinimized && (
        <div className="bg-[#080808] px-4 py-3 border-b border-[#212121] shrink-0">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0d0d0d] border border-[#2b2b2b] rounded-md pl-10 pr-4 py-2 text-[12px] text-[#e5e5e5] placeholder-[#9b9b9b] focus:outline-none focus:border-[#4a4a4a] font-['IBM_Plex_Sans:Regular',sans-serif]"
              />
            </div>
            <button className="px-3 py-2 bg-[#0d0d0d] border border-[#2b2b2b] rounded-md hover:bg-[#1a1a1a] transition-colors flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-[#9b9b9b]" />
              <span className="text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b]">
                Filter
              </span>
            </button>
          </div>
        </div>
      )}

      {/* Table Header */}
      <TableHeader
        allSelected={selectedDevices.length === filteredDevices.length && filteredDevices.length > 0}
        onSelectAll={toggleSelectAll}
        isMinimized={isMinimized}
      />

      {/* Scrollable Device List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {filteredDevices.map((device) => (
          <DeviceRow
            key={device.id}
            device={device}
            isSelected={selectedDevices.includes(device.id)}
            onToggleSelect={() => toggleSelectDevice(device.id)}
            onDeviceClick={() => handleDeviceClick(device.id)}
            isMinimized={isMinimized}
          />
        ))}
      </div>

      {/* Export Footer */}
      <ExportFooter selectedCount={selectedDevices.length} isMinimized={isMinimized} />

      {/* Border Overlay */}
      <div aria-hidden="true" className="absolute border-[#2b2b2b] border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}
