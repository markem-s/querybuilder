import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MainMenuProps {
  children: React.ReactNode;
  isMinimized?: boolean;
  onToggleMinimize?: () => void;
}

export function MainMenu({ children, isMinimized = false, onToggleMinimize }: MainMenuProps) {
  return (
    <div className="flex h-screen w-full bg-[#000000] overflow-hidden">
      {/* Left Sidebar - Main Menu with smooth slide animation */}
      <AnimatePresence initial={false}>
        {!isMinimized && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="w-[300px] bg-[#000000] flex flex-col shrink-0 border-r border-[#1a1a1a]"
          >
            {/* Menu Header with Minimize Button */}
            <div className="h-[50px] flex items-center justify-between px-4 border-b border-[#1a1a1a]">
              <div className="text-[14px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5]">
                Native Kepler
              </div>
              {onToggleMinimize && (
                <button
                  onClick={onToggleMinimize}
                  className="flex items-center justify-center w-8 h-8 hover:bg-[#1a1a1a] rounded transition-colors"
                  title="Minimize menu"
                >
                  <ChevronLeft size={18} className="text-[#9b9b9b]" />
                </button>
              )}
            </div>

            {/* Menu Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-[16px] font-['IBM_Plex_Sans:Regular',sans-serif] text-white">
                Native Kepler menu
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}
