import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Smartphone, MapPin, AlertTriangle, ChevronLeft, SlidersHorizontal } from "lucide-react";

interface Device {
  id: string;
  model: string;
  location: string;
  threatScore: number;
  lastSeen: string;
}

interface DeviceSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentDeviceId: string;
  onDeviceSelect: (deviceId: string) => void;
}

// Mock device data - replace with actual data source
const generateMockDevices = (): Device[] => {
  const models = ["iPhone 13 Pro", "iPhone 14 Pro Max", "iPhone 12", "iPhone 15 Pro", "Samsung Galaxy S23", "Google Pixel 8"];
  const locations = ["Tehran, Iran", "Dubai, UAE", "Istanbul, Turkey", "London, UK", "Paris, France", "Berlin, Germany"];

  return Array.from({ length: 100 }, (_, i) => ({
    id: String(837365 + i),
    model: models[i % models.length],
    location: locations[i % locations.length],
    threatScore: Math.floor(Math.random() * 100),
    lastSeen: `${Math.floor(Math.random() * 60)} min ago`,
  }));
};

export function DeviceSwitcher({ isOpen, onClose, currentDeviceId, onDeviceSelect }: DeviceSwitcherProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [devices] = useState<Device[]>(generateMockDevices());
  const [filteredDevices, setFilteredDevices] = useState<Device[]>(devices);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<{
    threatLevels: string[];
    models: string[];
    locations: string[];
  }>({
    threatLevels: [],
    models: [],
    locations: [],
  });

  // Filter devices based on search query and filters
  useEffect(() => {
    let filtered = devices;

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (device) =>
          device.id.includes(query) ||
          device.model.toLowerCase().includes(query) ||
          device.location.toLowerCase().includes(query)
      );
    }

    // Apply threat level filters
    if (selectedFilters.threatLevels.length > 0) {
      filtered = filtered.filter((device) => {
        const label = getThreatLabel(device.threatScore);
        return selectedFilters.threatLevels.includes(label);
      });
    }

    // Apply model filters
    if (selectedFilters.models.length > 0) {
      filtered = filtered.filter((device) =>
        selectedFilters.models.includes(device.model)
      );
    }

    // Apply location filters
    if (selectedFilters.locations.length > 0) {
      filtered = filtered.filter((device) =>
        selectedFilters.locations.includes(device.location)
      );
    }

    setFilteredDevices(filtered);
  }, [searchQuery, devices, selectedFilters]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleDeviceSelect = (deviceId: string) => {
    onDeviceSelect(deviceId);
    onClose();
  };

  const getThreatColor = (score: number) => {
    if (score >= 70) return "text-[#ff6b6b]";
    if (score >= 40) return "text-[#ffa500]";
    return "text-[#4ade80]";
  };

  const getThreatLabel = (score: number) => {
    if (score >= 70) return "HIGH";
    if (score >= 40) return "MEDIUM";
    return "LOW";
  };

  // Get unique values for filters
  const uniqueModels = Array.from(new Set(devices.map((d) => d.model)));
  const uniqueLocations = Array.from(new Set(devices.map((d) => d.location)));

  const toggleFilter = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [category]: updated };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      threatLevels: [],
      models: [],
      locations: [],
    });
  };

  const hasActiveFilters =
    selectedFilters.threatLevels.length > 0 ||
    selectedFilters.models.length > 0 ||
    selectedFilters.locations.length > 0;

  if (!isOpen) return null;

  return (
    <div className="bg-[#080808] w-full h-full flex flex-col">
      {/* Header - styled like FirstHeaderBar */}
      <div className="bg-[#0d0d0d] content-stretch flex items-center justify-between pb-px relative shrink-0 w-full border-b border-[#212121]">
        <div className="flex items-center h-[44px] px-[12px] gap-[8px]">
          {/* Back Button */}
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
          >
            <ChevronLeft size={18} className="text-[#9b9b9b] hover:text-[#e5e5e5]" />
          </button>

          <h2 className="text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5]">
            {devices.length} DEVICES
          </h2>
        </div>
        <div className="flex gap-[8px] items-center px-[16px]">
          <button
            onClick={onClose}
            className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
          >
            <X size={18} className="text-[#9b9b9b]" />
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {/* All Devices Section */}
        <div className="p-4">
          {/* Search Bar with Filter Button */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9b9b9b]" />
              <input
                type="text"
                placeholder="Search by ID, model, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#080808] border border-[#2b2b2b] rounded-md pl-10 pr-4 py-2 text-[12px] text-[#e5e5e5] placeholder-[#9b9b9b] focus:outline-none focus:border-[#4a4a4a] font-['IBM_Plex_Sans:Regular',sans-serif]"
                autoFocus
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-3 py-2 rounded-md border transition-colors flex items-center gap-2 shrink-0 ${
                hasActiveFilters
                  ? "bg-[#1a1a1a] border-[#4a4a4a] text-[#e5e5e5]"
                  : "bg-[#080808] border-[#2b2b2b] text-[#9b9b9b] hover:bg-[#0f0f0f] hover:border-[#3a3a3a]"
              }`}
            >
              <SlidersHorizontal size={16} />
              {hasActiveFilters && (
                <span className="text-[10px] bg-[#4ade80] text-[#080808] rounded-full w-4 h-4 flex items-center justify-center font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {selectedFilters.threatLevels.length + selectedFilters.models.length + selectedFilters.locations.length}
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-4"
              >
                <div className="bg-[#0d0d0d] border border-[#2b2b2b] rounded-md p-4">
                  {/* Filter Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-[11px] text-[#e5e5e5] uppercase font-['IBM_Plex_Sans:Regular',sans-serif]">
                      Filters
                    </div>
                    {hasActiveFilters && (
                      <button
                        onClick={clearAllFilters}
                        className="text-[10px] text-[#9b9b9b] hover:text-[#e5e5e5] transition-colors font-['IBM_Plex_Sans:Regular',sans-serif]"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Threat Level Filter */}
                  <div className="mb-4">
                    <div className="text-[10px] text-[#9b9b9b] uppercase font-['IBM_Plex_Sans:Regular',sans-serif] mb-2">
                      Threat Level
                    </div>
                    <div className="flex gap-2">
                      {["HIGH", "MEDIUM", "LOW"].map((level) => (
                        <button
                          key={level}
                          onClick={() => toggleFilter("threatLevels", level)}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors ${
                            selectedFilters.threatLevels.includes(level)
                              ? "bg-[#1a1a1a] border border-[#4a4a4a] text-[#e5e5e5]"
                              : "bg-[#080808] border border-[#2b2b2b] text-[#9b9b9b] hover:bg-[#0f0f0f]"
                          }`}
                        >
                          {level}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Model Filter */}
                  <div className="mb-4">
                    <div className="text-[10px] text-[#9b9b9b] uppercase font-['IBM_Plex_Sans:Regular',sans-serif] mb-2">
                      Model
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueModels.map((model) => (
                        <button
                          key={model}
                          onClick={() => toggleFilter("models", model)}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors ${
                            selectedFilters.models.includes(model)
                              ? "bg-[#1a1a1a] border border-[#4a4a4a] text-[#e5e5e5]"
                              : "bg-[#080808] border border-[#2b2b2b] text-[#9b9b9b] hover:bg-[#0f0f0f]"
                          }`}
                        >
                          {model}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Location Filter */}
                  <div>
                    <div className="text-[10px] text-[#9b9b9b] uppercase font-['IBM_Plex_Sans:Regular',sans-serif] mb-2">
                      Location
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {uniqueLocations.map((location) => (
                        <button
                          key={location}
                          onClick={() => toggleFilter("locations", location)}
                          className={`px-3 py-1.5 rounded-md text-[10px] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors ${
                            selectedFilters.locations.includes(location)
                              ? "bg-[#1a1a1a] border border-[#4a4a4a] text-[#e5e5e5]"
                              : "bg-[#080808] border border-[#2b2b2b] text-[#9b9b9b] hover:bg-[#0f0f0f]"
                          }`}
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="text-[10px] text-[#9b9b9b] uppercase font-['IBM_Plex_Sans:Regular',sans-serif] mb-3">
            {searchQuery ? `Results (${filteredDevices.length})` : "All Devices"}
          </div>
          <div className="space-y-2">
            {filteredDevices.length > 0 ? (
              filteredDevices.map((device) => (
                <DeviceCard
                  key={device.id}
                  device={device}
                  isActive={device.id === currentDeviceId}
                  onClick={() => handleDeviceSelect(device.id)}
                  getThreatColor={getThreatColor}
                  getThreatLabel={getThreatLabel}
                />
              ))
            ) : (
              <div className="text-center py-8 text-[#9b9b9b] text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif]">
                No devices found matching "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

interface DeviceCardProps {
  device: Device;
  isActive: boolean;
  onClick: () => void;
  getThreatColor: (score: number) => string;
  getThreatLabel: (score: number) => string;
}

function DeviceCard({ device, isActive, onClick, getThreatColor, getThreatLabel }: DeviceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-3 rounded-md border transition-all text-left ${
        isActive
          ? "bg-[#1a1a1a] border-[#4a4a4a]"
          : "bg-[#080808] border-[#2b2b2b] hover:bg-[#0f0f0f] hover:border-[#3a3a3a]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Left side - Device info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="mt-0.5">
            <Smartphone size={16} className="text-[#9b9b9b]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                {device.id}
              </div>
              {isActive && (
                <div className="text-[9px] text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded uppercase font-['IBM_Plex_Sans:Regular',sans-serif]">
                  Current
                </div>
              )}
            </div>
            <div className="text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1">
              {device.model}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
              <MapPin size={10} />
              <span>{device.location}</span>
              <span className="mx-1">•</span>
              <span>{device.lastSeen}</span>
            </div>
          </div>
        </div>

        {/* Right side - Threat indicator */}
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1">
            <AlertTriangle size={12} className={getThreatColor(device.threatScore)} />
            <div className={`text-[11px] font-['IBM_Plex_Sans:Regular',sans-serif] ${getThreatColor(device.threatScore)}`}>
              {device.threatScore}
            </div>
          </div>
          <div className={`text-[9px] font-['IBM_Plex_Sans:Regular',sans-serif] uppercase ${getThreatColor(device.threatScore)}`}>
            {getThreatLabel(device.threatScore)}
          </div>
        </div>
      </div>
    </button>
  );
}
