import { useState } from "react";
import { DeviceDetailsDrawer } from "./components/DeviceDetailsDrawer";

export default function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="relative w-full h-screen bg-gray-900">
      {/* Map/Background Image */}
      <div className="absolute inset-0">
        <img
          src="/map.svg"
          alt="Map"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Floating button to open drawer */}
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="absolute top-4 right-4 z-30 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg transition-colors"
      >
        Open Device Details
      </button>

      {/* Device Drawer */}
      <DeviceDetailsDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
