import { motion, AnimatePresence } from "motion/react";
import { DeviceDetailsContent } from "./DeviceDetailsContent";

interface DeviceDetailsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeviceDetailsDrawer({ isOpen, onClose }: DeviceDetailsDrawerProps) {
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-[320px] z-50 bg-[#080808] shadow-2xl border-l border-[#2b2b2b]"
            onClick={(e) => e.stopPropagation()}
          >
            <DeviceDetailsContent onClose={onClose} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}