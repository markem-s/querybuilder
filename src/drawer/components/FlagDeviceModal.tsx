import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface FlagDeviceModalProps {
  isOpen: boolean;
  onClose: () => void;
  deviceId: string;
  onSave: (name: string, description: string) => void;
}

export function FlagDeviceModal({ isOpen, onClose, deviceId, onSave }: FlagDeviceModalProps) {
  const [name, setName] = useState(`device_new${deviceId.slice(-3)}`);
  const [description, setDescription] = useState("");

  const handleSave = () => {
    onSave(name, description);
    onClose();
  };

  const handleCancel = () => {
    setName(`device_new${deviceId.slice(-3)}`);
    setDescription("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[80]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[460px] z-[90] bg-[#121212] rounded-[12px] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <h2 className="text-[16px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5]">
                Flag Device
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-[#1a1a1a] rounded-md transition-colors"
              >
                <X size={18} className="text-[#9b9b9b] hover:text-[#e5e5e5]" />
              </button>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2a2a2a] mx-6" />

            {/* Content */}
            <div className="px-6 py-5 space-y-5">
              {/* Name Input */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[#2b2b2b] rounded-[8px] px-4 py-3 text-[13px] text-[#e5e5e5] placeholder-[#6b6b6b] focus:outline-none focus:border-[#4a4a4a] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors"
                  placeholder="Enter device name..."
                />
              </div>

              {/* Description Textarea */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-2">
                  Description
                </label>
                <div className="relative">
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#2b2b2b] rounded-[8px] px-4 py-3 text-[13px] text-[#e5e5e5] placeholder-[#6b6b6b] focus:outline-none focus:border-[#4a4a4a] font-['IBM_Plex_Sans:Regular',sans-serif] resize-none h-[100px] transition-colors"
                    placeholder="Add investigation description..."
                  />
                  {/* Icon button in bottom right */}
                  <button className="absolute bottom-3 right-3 p-2 bg-[#2b2b2b] hover:bg-[#3a3a3a] rounded-[6px] transition-colors">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#9b9b9b]">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2a2a2a] mx-6" />

            {/* Footer */}
            <div className="flex gap-3 px-6 py-5">
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-3 bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded-[8px] text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 px-4 py-3 bg-[#ff3b30] hover:bg-[#ff4d42] rounded-[8px] text-[13px] text-white font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors shadow-lg shadow-[#ff3b30]/20"
              >
                Save Flag
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
