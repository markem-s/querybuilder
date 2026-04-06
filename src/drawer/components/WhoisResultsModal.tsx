import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface WhoisResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function WhoisResultsModal({ isOpen, onClose, onAccept }: WhoisResultsModalProps) {
  // Mock WHOIS data
  const whoisData = {
    ipAddress: "94.232.46.172",
    netname: "DIGITALOCEAN-94-232-46-0",
    organization: "DigitalOcean, LLC",
    country: "Netherlands",
    city: "Amsterdam",
    isp: "DigitalOcean",
    asn: "AS14061",
    lastUpdated: "2024-01-15",
  };

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
                WHOIS Results
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
            <div className="px-6 py-5 space-y-4">
              {/* IP Address */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  IP Address
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.ipAddress}
                </div>
              </div>

              {/* Network Name */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  Network Name
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.netname}
                </div>
              </div>

              {/* Organization */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  Organization
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.organization}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  Location
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.city}, {whoisData.country}
                </div>
              </div>

              {/* ISP */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  ISP
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.isp}
                </div>
              </div>

              {/* ASN */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  ASN
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.asn}
                </div>
              </div>

              {/* Last Updated */}
              <div>
                <label className="block text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] mb-1.5">
                  Last Updated
                </label>
                <div className="text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {whoisData.lastUpdated}
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-[#2a2a2a] mx-6" />

            {/* Footer */}
            <div className="flex gap-3 px-6 py-5">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded-[8px] text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onAccept}
                className="flex-1 px-4 py-3 bg-[#0066ff] hover:bg-[#0052cc] rounded-[8px] text-[13px] text-white font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors shadow-lg shadow-[#0066ff]/20"
              >
                Accept
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
