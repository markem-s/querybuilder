import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Settings, MapPin, Grid3x3, Network, Wifi, Route, Sparkles, ShieldAlert, MoreVertical, Calendar, Flag, FileText, Globe, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@drawer/components/ui/dropdown-menu";
import { DeviceSwitcher } from "@drawer/components/DeviceSwitcher";
import { FlagDeviceModal } from "@drawer/components/FlagDeviceModal";
import { WhoisResultsModal } from "@drawer/components/WhoisResultsModal";
import { PlasmaLoadingBar } from "@drawer/components/PlasmaLoadingBar";
import svgPaths from "./svg-2as483m1ai";

function Svg() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="SVG">
          <path d={svgPaths.p1adf7700} id="Vector" stroke="var(--stroke-0, #9B9B9B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 18H12.01" id="Vector_2" stroke="var(--stroke-0, #9B9B9B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex items-center relative shrink-0" data-name="Container">
      <Svg />
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0" data-name="Margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[8px] relative">
        <Container />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
        <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e5e5] text-[12px] w-full">
          <p className="leading-[20px] whitespace-pre-wrap">Device Details</p>
        </div>
      </div>
    </div>
  );
}

function Svg1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2f327a00} id="Vector" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1cd74100} id="Vector_2" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pe9cb400} id="Vector_3" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p345da6c0} id="Vector_4" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 8V5.33333" id="Vector_5" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function ButtonNetworkActions() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center p-[7px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer" data-name="Button - Network actions">
      <div aria-hidden="true" className="absolute border border-[#212121] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg1 />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M1.33333 8H3.33333" id="Vector" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H14.6667" id="Vector_2" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 1.33333V3.33333" id="Vector_3" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 12.6667V14.6667" id="Vector_4" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p12c7a680} id="Vector_5" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p28db2b80} id="Vector_6" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function ButtonViewConnections() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center p-[7px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer" data-name="Button - View connections">
      <div aria-hidden="true" className="absolute border border-[#212121] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg2 />
    </div>
  );
}

function Svg3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M8 12V3.33333" id="Vector" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3b97c700} id="Vector_2" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p173f0300} id="Vector_3" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pec8c600} id="Vector_4" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p19872800} id="Vector_5" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2f071e80} id="Vector_6" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p3e357a20} id="Vector_7" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p2b9c4000} id="Vector_8" stroke="var(--stroke-0, #E0DD5B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function ButtonAiAssistant() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-center p-[7px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer" data-name="Button - AI Assistant">
      <div aria-hidden="true" className="absolute border border-[#212121] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Svg3 />
    </div>
  );
}

function ButtonAiAssistant1() {
  return (
    <div className="relative shrink-0 size-[32px] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer rounded-[6px]" data-name="Button - AI Assistant">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 32 32">
        <g id="Button - AI Assistant">
          <rect height="31" rx="5.5" stroke="var(--stroke-0, #212121)" width="31" x="0.5" y="0.5" />
          <path d={svgPaths.p1039f500} fill="var(--fill-0, white)" id="H" />
        </g>
      </svg>
    </div>
  );
}

function Svg4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M12 4L4 12" id="Vector" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4L12 12" id="Vector_2" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function ActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-[#080808] content-stretch flex h-[32px] items-center justify-center p-[6px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer">
          <MoreVertical size={18} className="text-[#9b9b9b]" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuItem>
          <Wifi size={16} />
          Scan Network Activity
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Route size={16} />
          Trace Movement
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Sparkles size={16} />
          Ask Arkimedes
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ShieldAlert size={16} />
          Arm Device
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function CloseButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#080808] content-stretch flex h-[32px] items-center justify-center p-[6px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer"
      title="Close"
    >
      <X size={18} className="text-[#9b9b9b]" />
    </button>
  );
}

function ButtonCloseDrawer() {
  return (
    <div className="bg-[#080808] content-stretch flex h-[32px] items-center justify-center p-[6px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer" data-name="Button - Close drawer">
      <Svg4 />
    </div>
  );
}

function FlagButton({ onClick }: { onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="bg-[#080808] content-stretch flex h-[32px] items-center justify-center p-[6px] relative rounded-[6px] shrink-0 hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer"
      data-name="Button - Flag"
    >
      <Flag size={16} className="text-[#e5e5e5]" />
    </div>
  );
}

function Container2() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative">
        <ButtonNetworkActions />
        <ButtonViewConnections />
        <ButtonAiAssistant />
        <ButtonAiAssistant1 />
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#080808] min-h-[72px] relative shrink-0 w-full" data-name="Header">
      <div aria-hidden="true" className="absolute border-[#2b2b2b] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="content-stretch flex items-center justify-between min-h-[inherit] pb-[20.5px] pt-[19.5px] px-[16px] relative w-full">
          <Margin />
          <Container1 />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#080808] content-stretch flex flex-col items-start pb-px shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2b2b2b] border-b border-solid inset-0 pointer-events-none" />
      <Header />
    </div>
  );
}


function BackgroundVerticalBorder() {
  return (
    <div className="bg-[#080808] w-[44px] h-[44px] relative hover:bg-[#0f0f0f] transition-colors cursor-pointer flex items-center justify-center" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-r border-solid inset-0 pointer-events-none" />
      <User size={18} className="text-[#9b9b9b]" />
    </div>
  );
}

function BackgroundVerticalBorder1() {
  return (
    <div className="bg-[#080808] w-[44px] h-[44px] relative hover:bg-[#0f0f0f] transition-colors cursor-pointer flex items-center justify-center" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-r border-solid inset-0 pointer-events-none" />
      <Settings size={18} className="text-[#9b9b9b]" />
    </div>
  );
}

function BackgroundVerticalBorder2({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-[44px] relative hover:bg-[#0f0f0f] transition-all duration-300 cursor-pointer flex items-center gap-[8px] ${showLabel ? 'px-[12px]' : 'w-[44px] justify-center'} ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#080808]'}`}
      data-name="Background+VerticalBorder"
    >
      <div aria-hidden="true" className="absolute border-[#212121] border-r border-solid inset-0 pointer-events-none" />
      {!showLabel && <FileText size={18} className={isActive ? 'text-[#e5e5e5]' : 'text-[#9b9b9b]'} />}
      {showLabel && (
        <div className="text-[12px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] whitespace-nowrap">
          Report
        </div>
      )}
    </div>
  );
}

function BackgroundVerticalBorder3({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-[44px] relative hover:bg-[#0f0f0f] transition-all duration-300 cursor-pointer flex items-center gap-[8px] ${showLabel ? 'px-[12px]' : 'w-[44px] justify-center'} ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#080808]'}`}
      data-name="Background+VerticalBorder"
    >
      <div aria-hidden="true" className="absolute border-[#212121] border-r border-solid inset-0 pointer-events-none" />
      {!showLabel && <Grid3x3 size={18} className={isActive ? 'text-[#e5e5e5]' : 'text-[#9b9b9b]'} />}
      {showLabel && (
        <div className="text-[12px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] whitespace-nowrap">
          Applications
        </div>
      )}
    </div>
  );
}

function BackgroundVerticalBorder4({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-[44px] relative hover:bg-[#0f0f0f] transition-all duration-300 cursor-pointer flex items-center gap-[8px] ${showLabel ? 'px-[12px]' : 'w-[44px] justify-center'} ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#080808]'}`}
      data-name="Background+VerticalBorder"
    >
      <div aria-hidden="true" className="absolute border-[#212121] border-r border-solid inset-0 pointer-events-none" />
      {!showLabel && <Globe size={18} className={isActive ? 'text-[#e5e5e5]' : 'text-[#9b9b9b]'} />}
      {showLabel && (
        <div className="text-[12px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] whitespace-nowrap">
          WHOIS
        </div>
      )}
    </div>
  );
}

function TimelineTab({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-[44px] relative hover:bg-[#0f0f0f] transition-all duration-300 cursor-pointer flex items-center gap-[8px] ${showLabel ? 'px-[12px]' : 'w-[44px] justify-center'} ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#080808]'}`}
      data-name="Timeline Tab"
    >
      {!showLabel && <Calendar size={18} className={isActive ? 'text-[#e5e5e5]' : 'text-[#9b9b9b]'} />}
      {showLabel && (
        <div className="text-[12px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] whitespace-nowrap">
          Timeline
        </div>
      )}
    </div>
  );
}

function FirstHeaderBar({
  onDeviceSwitcherClick,
  currentDeviceId,
  onPrevDevice,
  onNextDevice,
  onFlagClick,
  onClose
}: {
  onDeviceSwitcherClick: () => void;
  currentDeviceId: string;
  onPrevDevice: () => void;
  onNextDevice: () => void;
  onFlagClick: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex items-center justify-between pb-px relative shrink-0 w-full border-b border-[#212121]" data-name="First Header Bar">
      <div className="flex items-center h-[44px] px-[12px] gap-[8px]">
        {/* Previous Device Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevDevice();
          }}
          className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
        >
          <ChevronLeft size={14} className="text-[#9b9b9b] hover:text-[#e5e5e5]" />
        </button>

        <div className="flex items-center gap-[8px]">
          <Svg />
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            onDeviceSwitcherClick();
          }}
          className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic text-[#e5e5e5] text-[12px] hover:text-[#4ade80] transition-colors cursor-pointer"
        >
          <p className="leading-[20px]">{currentDeviceId}</p>
        </div>

        {/* Next Device Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNextDevice();
          }}
          className="p-1 hover:bg-[#1a1a1a] rounded transition-colors"
        >
          <ChevronRight size={14} className="text-[#9b9b9b] hover:text-[#e5e5e5]" />
        </button>
      </div>

      <div className="flex gap-[8px] items-center px-[16px]">
        <FlagButton onClick={onFlagClick} />
        <ActionsMenu />
        {onClose && <CloseButton onClick={onClose} />}
      </div>
    </div>
  );
}

function SecondHeaderBar({
  activeTab,
  onTabChange
}: {
  activeTab: string;
  onTabChange: (tab: 'device' | 'report' | 'applications' | 'network' | 'timeline') => void;
}) {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex items-center pb-px relative shrink-0 w-full" data-name="Second Header Bar">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex items-center">
        <DeviceDetailsTab isActive={activeTab === 'device'} onClick={() => onTabChange('device')} />
        <BackgroundVerticalBorder2 isActive={activeTab === 'report'} onClick={() => onTabChange('report')} />
        <BackgroundVerticalBorder3 isActive={activeTab === 'applications'} onClick={() => onTabChange('applications')} />
        <BackgroundVerticalBorder4 isActive={activeTab === 'network'} onClick={() => onTabChange('network')} />
        <TimelineTab isActive={activeTab === 'timeline'} onClick={() => onTabChange('timeline')} />
      </div>
    </div>
  );
}

function DeviceDetailsTab({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const showLabel = isActive || isHovered;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`h-[44px] relative hover:bg-[#0f0f0f] transition-all duration-300 cursor-pointer flex items-center gap-[8px] ${
        showLabel ? 'px-[12px]' : 'w-[44px] justify-center'
      } ${isActive ? 'bg-[#1a1a1a]' : 'bg-[#080808]'}`}
    >
      <div aria-hidden="true" className="absolute border-[#212121] border-r border-solid inset-0 pointer-events-none" />
      {!showLabel && <Svg className={isActive ? 'text-[#e5e5e5]' : 'text-[#9b9b9b]'} />}
      {showLabel && (
        <div className="text-[12px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] whitespace-nowrap">
          Device Details
        </div>
      )}
    </div>
  );
}

function BackgroundHorizontalBorder1({
  activeTab,
  onTabChange,
  onDeviceSwitcherClick,
  currentDeviceId,
  onPrevDevice,
  onNextDevice,
  onFlagClick,
  onClose
}: {
  activeTab: string;
  onTabChange: (tab: 'device' | 'report' | 'applications' | 'network' | 'timeline') => void;
  onDeviceSwitcherClick: () => void;
  currentDeviceId: string;
  onPrevDevice: () => void;
  onNextDevice: () => void;
  onFlagClick: () => void;
  onClose?: () => void;
}) {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex flex-col relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <FirstHeaderBar
        onDeviceSwitcherClick={onDeviceSwitcherClick}
        currentDeviceId={currentDeviceId}
        onPrevDevice={onPrevDevice}
        onNextDevice={onNextDevice}
        onFlagClick={onFlagClick}
        onClose={onClose}
      />
      <SecondHeaderBar
        activeTab={activeTab}
        onTabChange={onTabChange}
      />
    </div>
  );
}

function Container5() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[132px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">DEVICE MODEL:</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">iPhone 13 Pro</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder2() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container5 />
      <Container6 />
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[132px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">OS VERSION:</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">iOS 16.5.1</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder3() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container7 />
      <Container8 />
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[132px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">SCREEN SIZE:</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">6.1 inches</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[42px] items-center relative shrink-0 w-full" data-name="Background">
      <Container9 />
      <Container10 />
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Background">
      <BackgroundHorizontalBorder2 />
      <BackgroundHorizontalBorder3 />
      <Background1 />
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <Background />
    </div>
  );
}

function Border() {
  return (
    <div className="relative shrink-0 w-full" data-name="Border">
      <div aria-hidden="true" className="absolute border border-[#2b2b2b] border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex flex-col items-start p-px relative w-full">
        <Container4 />
      </div>
    </div>
  );
}

function Svg5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p19bc7f80} id="Vector" stroke="var(--stroke-0, #A88940)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 6V8.66667" id="Vector_2" stroke="var(--stroke-0, #A88940)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #A88940)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a88940] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">Threat Assessment</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">• 3 metrics</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Container">
      <Svg5 />
      <Container12 />
      <Container13 />
    </div>
  );
}

function Svg6() {
  return (
    <div className="relative size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #9B9B9B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-[#080808] h-[44px] relative shrink-0 w-full hover:bg-[#0f0f0f] transition-colors cursor-pointer" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
          <Container11 />
          <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className={`flex-none transition-transform ${isOpen ? '' : '-rotate-90'}`}>
              <Svg6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">THREAT SCORE:</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#c55f5f] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">87/100 [HIGH]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder4() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">HONEYPOT:</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:SemiBold',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#c55f5f] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">YES</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder5() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container17 />
      <Container18 />
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">HONEYPOT PROBABILITY:</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">85%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[42px] items-center relative shrink-0 w-full" data-name="Background">
      <Container19 />
      <Container20 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundHorizontalBorder4 />
      <BackgroundHorizontalBorder5 />
      <Background2 />
    </div>
  );
}

function Region() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Region">
      <Container14 />
    </div>
  );
}

function HorizontalBorder() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Button isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Region />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Svg7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p37f49070} id="Vector" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 5.33333V8" id="Vector_2" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 10.6667H8.00667" id="Vector_3" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">Threat Intelligence</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">• 9 metrics</p>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Container">
      <Svg7 />
      <Container22 />
      <Container23 />
    </div>
  );
}

function Svg8() {
  return (
    <div className="relative size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #9B9B9B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button1({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-[#080808] h-[44px] relative shrink-0 w-full hover:bg-[#0f0f0f] transition-colors cursor-pointer" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
          <Container21 />
          <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className={`flex-none transition-transform ${isOpen ? '' : '-rotate-90'}`}>
              <Svg8 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">PULSE COUNT:</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">42 reports</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder6() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container25 />
      <Container26 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">PASSIVE DNS COUNT:</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">228 resolutions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder7() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container27 />
      <Container28 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">URL COUNT:</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">34 URLs</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder8() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container29 />
      <Container30 />
    </div>
  );
}

function Container31() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">PRIMARY TAG:</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">malware-distribution</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder9() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container31 />
      <Container32 />
    </div>
  );
}

function Container33() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">TAGS:</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">vpn, proxy +2</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder10() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container33 />
      <Container34 />
    </div>
  );
}

function Container35() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">COUNTRY:</p>
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">Iran (IR)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder11() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container35 />
      <Container36 />
    </div>
  );
}

function Container37() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">CITY:</p>
      </div>
    </div>
  );
}

function Container38() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">Tehran</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder12() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container37 />
      <Container38 />
    </div>
  );
}

function Container39() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">ASN:</p>
      </div>
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">AS44244</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder13() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container39 />
      <Container40 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">MALWARE SAMPLES:</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">15 detected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[42px] items-center relative shrink-0 w-full" data-name="Background">
      <Container41 />
      <Container42 />
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundHorizontalBorder6 />
      <BackgroundHorizontalBorder7 />
      <BackgroundHorizontalBorder8 />
      <BackgroundHorizontalBorder9 />
      <BackgroundHorizontalBorder10 />
      <BackgroundHorizontalBorder11 />
      <BackgroundHorizontalBorder12 />
      <BackgroundHorizontalBorder13 />
      <Background3 />
    </div>
  );
}

function Region1() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Region">
      <Container24 />
    </div>
  );
}

function HorizontalBorder1() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Button1 isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Region1 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Svg9() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p2f327a00} id="Vector" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1cd74100} id="Vector_2" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.pe9cb400} id="Vector_3" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p345da6c0} id="Vector_4" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 8V5.33333" id="Vector_5" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">Network Infrastructure</p>
      </div>
    </div>
  );
}

function Container45() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">• 7 metrics</p>
      </div>
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Container">
      <Svg9 />
      <Container44 />
      <Container45 />
    </div>
  );
}

function Svg10() {
  return (
    <div className="relative size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #9B9B9B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button2({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-[#080808] h-[44px] relative shrink-0 w-full hover:bg-[#0f0f0f] transition-colors cursor-pointer" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
          <Container43 />
          <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className={`flex-none transition-transform ${isOpen ? '' : '-rotate-90'}`}>
              <Svg10 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">ORGANIZATION:</p>
      </div>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">Iran Telecom PJS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder14() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container47 />
      <Container48 />
    </div>
  );
}

function Container49() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">HOSTNAME:</p>
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">mx.isp.ir</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder15() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container49 />
      <Container50 />
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">ASN:</p>
      </div>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">AS58224</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder16() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container51 />
      <Container52 />
    </div>
  );
}

function Container53() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">ISP:</p>
      </div>
    </div>
  );
}

function Container54() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">Iran Telecom PJS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder17() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container53 />
      <Container54 />
    </div>
  );
}

function Container55() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">NETWORK NAME:</p>
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">RIPE-ERX-151</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder18() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container55 />
      <Container56 />
    </div>
  );
}

function Container57() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">REGISTRATION STATUS:</p>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">ASSIGNED PA</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder19() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container57 />
      <Container58 />
    </div>
  );
}

function Container59() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">IP OPERATING SYSTEM:</p>
      </div>
    </div>
  );
}

function Container60() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">Linux 5.10</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[42px] items-center relative shrink-0 w-full" data-name="Background">
      <Container59 />
      <Container60 />
    </div>
  );
}

function Container46() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundHorizontalBorder14 />
      <BackgroundHorizontalBorder15 />
      <BackgroundHorizontalBorder16 />
      <BackgroundHorizontalBorder17 />
      <BackgroundHorizontalBorder18 />
      <BackgroundHorizontalBorder19 />
      <Background4 />
    </div>
  );
}

function Region2() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Region">
      <Container46 />
    </div>
  );
}

function HorizontalBorder2() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start pb-px relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Button2 isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Region2 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Svg11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d={svgPaths.p15f82200} id="Vector" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p375323f0} id="Vector_2" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 4H4.00667" id="Vector_3" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4 12H4.00667" id="Vector_4" stroke="var(--stroke-0, #E5E5E5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container63() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">{`Services & Exposure`}</p>
      </div>
    </div>
  );
}

function Container64() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#6b6b6b] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">• 5 metrics</p>
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px relative" data-name="Container">
      <Svg11 />
      <Container63 />
      <Container64 />
    </div>
  );
}

function Svg12() {
  return (
    <div className="relative size-[16px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="SVG">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, #9B9B9B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Button3({ isOpen, onClick }: { isOpen: boolean; onClick: () => void }) {
  return (
    <div onClick={onClick} className="bg-[#080808] h-[44px] relative shrink-0 w-full hover:bg-[#0f0f0f] transition-colors cursor-pointer" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[16px] py-[8px] relative size-full">
          <Container62 />
          <div className="flex items-center justify-center relative shrink-0 size-[16px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className={`flex-none transition-transform ${isOpen ? '' : '-rotate-90'}`}>
              <Svg12 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container66() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">OPEN PORTS:</p>
      </div>
    </div>
  );
}

function Container67() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">[80, 443, 8080]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder20() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container66 />
      <Container67 />
    </div>
  );
}

function Container68() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">SERVICES:</p>
      </div>
    </div>
  );
}

function Container69() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">HTTP, HTTPS, SSH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder21() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container68 />
      <Container69 />
    </div>
  );
}

function Container70() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">VULNERABILITIES:</p>
      </div>
    </div>
  );
}

function Container71() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">3 CVEs ↗</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder22() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container70 />
      <Container71 />
    </div>
  );
}

function Container72() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">DISCOVERED DOMAINS:</p>
      </div>
    </div>
  );
}

function Container73() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">2 domains ↗</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder23() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <Container72 />
      <Container73 />
    </div>
  );
}

function Container74() {
  return (
    <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 min-w-[200px]" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">DISCOVERED URLS:</p>
      </div>
    </div>
  );
}

function Container75() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-end size-full">
        <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
          <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
            <p className="leading-[20px] whitespace-pre-wrap">4 URLs ↗</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[42px] items-center relative shrink-0 w-full" data-name="Background">
      <Container74 />
      <Container75 />
    </div>
  );
}

function Container65() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <BackgroundHorizontalBorder20 />
      <BackgroundHorizontalBorder21 />
      <BackgroundHorizontalBorder22 />
      <BackgroundHorizontalBorder23 />
      <Background5 />
    </div>
  );
}

function Region3() {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Region">
      <Container65 />
    </div>
  );
}

function Container61() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-[556px]" data-name="Container">
      <Button3 isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <Region3 />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Border1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Border">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start p-px relative w-full">
          <HorizontalBorder />
          <HorizontalBorder1 />
          <HorizontalBorder2 />
          <Container61 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#2b2b2b] border-solid inset-0 pointer-events-none rounded-[8px]" />
    </div>
  );
}

function Container3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="overflow-x-clip overflow-y-auto size-full">
        <div className="content-stretch flex flex-col gap-[8px] items-start p-[16px] relative w-full">
          <Border />
          <Border1 />
        </div>
      </div>
    </div>
  );
}

function Frame45() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full">
      <BackgroundHorizontalBorder />
      <Container3 />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame45 />
    </div>
  );
}

function Frame33() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <Frame44 />
    </div>
  );
}

function Svg13() {
  return (
    <div className="h-[20px] relative w-[8px]" data-name="SVG">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 8 20">
        <g id="SVG">
          <path d={svgPaths.p3f8a13f0} id="Vector" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
          <path d={svgPaths.p29b52d00} id="Vector_2" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
          <path d={svgPaths.p2b28d100} id="Vector_3" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
          <path d={svgPaths.p3f4f7e00} id="Vector_4" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
          <path d={svgPaths.p2fb89000} id="Vector_5" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
          <path d={svgPaths.p208ee740} id="Vector_6" stroke="var(--stroke-0, #6B6B6B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.666667" />
        </g>
      </svg>
    </div>
  );
}

function BackgroundVerticalBorder5() {
  return (
    <div className="bg-[#121212] h-[44px] relative shrink-0 w-full" data-name="Background+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#4a4a4a] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center pb-[12.5px] pt-[11.5px] px-[16px] relative size-full">
          <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] text-center whitespace-nowrap">
            <p className="leading-[20px]">Device Timeline</p>
          </div>
          <div className="absolute flex h-[8px] items-center justify-center left-[290px] top-[-4px] w-[20px]" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
            <div className="-rotate-90 flex-none">
              <Svg13 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Container76() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container77() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame28 />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container77 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container76 />
          <Frame />
        </div>
      </div>
    </div>
  );
}

function TableUnits() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame1 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits />
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame22 />
      </div>
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#121212] border-l border-r border-solid inset-0 pointer-events-none" />
      <Frame21 />
    </div>
  );
}

function Container78() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame31() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container79() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame31 />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container79 />
    </div>
  );
}

function Frame2() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container78 />
          <Frame3 />
        </div>
      </div>
    </div>
  );
}

function TableUnits1() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame2 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame23() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits1 />
    </div>
  );
}

function Frame26() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#121212] border-l border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame23 />
      </div>
    </div>
  );
}

function Container80() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame34() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container81() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame34 />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container81 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container80 />
          <Frame5 />
        </div>
      </div>
    </div>
  );
}

function TableUnits2() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame4 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits2 />
    </div>
  );
}

function Frame27() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#121212] border-l border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame24 />
      </div>
    </div>
  );
}

function Container82() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame36() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container83() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame36 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container83 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container82 />
          <Frame7 />
        </div>
      </div>
    </div>
  );
}

function TableUnits3() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame6 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits3 />
    </div>
  );
}

function Frame35() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#121212] border-l border-r border-solid inset-0 pointer-events-none" />
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame25 />
      </div>
    </div>
  );
}

function Container84() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container85() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame39 />
    </div>
  );
}

function Frame9() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container85 />
    </div>
  );
}

function Frame8() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container84 />
          <Frame9 />
        </div>
      </div>
    </div>
  );
}

function TableUnits4() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame8 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame38() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits4 />
    </div>
  );
}

function Frame37() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame38 />
      </div>
    </div>
  );
}

function Container86() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame42() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container87() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame42 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container87 />
    </div>
  );
}

function Frame10() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container86 />
          <Frame11 />
        </div>
      </div>
    </div>
  );
}

function TableUnits5() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame10 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits5 />
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame41 />
      </div>
    </div>
  );
}

function Container88() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame47() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container89() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame47 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container89 />
    </div>
  );
}

function Frame12() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container88 />
          <Frame13 />
        </div>
      </div>
    </div>
  );
}

function TableUnits6() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame12 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits6 />
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame46 />
      </div>
    </div>
  );
}

function Container90() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame51() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container91() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame51 />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container91 />
    </div>
  );
}

function Frame14() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container90 />
          <Frame15 />
        </div>
      </div>
    </div>
  );
}

function TableUnits7() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame14 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame50() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits7 />
    </div>
  );
}

function Frame49() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame50 />
      </div>
    </div>
  );
}

function Frame48() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full">
      <Frame49 />
    </div>
  );
}

function Container92() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame55() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container93() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame55 />
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container93 />
    </div>
  );
}

function Frame16() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container92 />
          <Frame17 />
        </div>
      </div>
    </div>
  );
}

function TableUnits8() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame16 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame54() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits8 />
    </div>
  );
}

function Frame53() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame54 />
      </div>
    </div>
  );
}

function Frame52() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full">
      <Frame53 />
    </div>
  );
}

function Container94() {
  return (
    <div className="content-stretch flex flex-col items-start justify-center py-[6px] relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#a0a7b4] text-[10px] text-right w-full">
        <p className="leading-[14px] whitespace-pre-wrap">Aug 1, 2025 • 08:11 PM • 75d ago</p>
      </div>
    </div>
  );
}

function Frame59() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">1207472156</p>
      </div>
      <div className="flex flex-col font-['SF_Pro:Regular',sans-serif] font-normal justify-center relative shrink-0 tracking-[0.06px]" style={{ fontVariationSettings: "\'wdth\' 100" }}>
        <p className="leading-[13px]">33.3366, -111.7307</p>
      </div>
    </div>
  );
}

function Container95() {
  return (
    <div className="content-stretch flex gap-[6px] items-center leading-[0] py-[6px] relative shrink-0 text-[#f9f9f9] text-[11px] whitespace-nowrap" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0 text-right">
        <p className="leading-[16px]">Phoenix, USA</p>
      </div>
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center not-italic relative shrink-0">
        <p className="leading-[16px]">•</p>
      </div>
      <Frame59 />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex items-center relative shrink-0">
      <Container95 />
    </div>
  );
}

function Frame18() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[12px] relative size-full">
          <Container94 />
          <Frame19 />
        </div>
      </div>
    </div>
  );
}

function TableUnits9() {
  return (
    <div className="bg-[#121212] flex-[1_0_0] min-h-px min-w-px relative" data-name="Table Units">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[6px] relative w-full">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <Frame18 />
          </div>
        </div>
      </div>
    </div>
  );
}

function Frame58() {
  return (
    <div className="content-stretch flex flex-[1_0_0] h-full items-center justify-between min-h-px min-w-px relative">
      <TableUnits9 />
    </div>
  );
}

function Frame57() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
        <Frame58 />
      </div>
    </div>
  );
}

function Frame56() {
  return (
    <div className="content-stretch flex h-[40px] items-start relative shrink-0 w-full">
      <Frame57 />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-col h-[211px] items-center relative shrink-0 w-[558px]">
      <div aria-hidden="true" className="absolute border border-[#212121] border-solid inset-0 pointer-events-none" />
      <Frame20 />
      <Frame26 />
      <Frame27 />
      <Frame35 />
      <Frame37 />
      <Frame40 />
      <Frame43 />
      <Frame48 />
      <Frame52 />
      <Frame56 />
    </div>
  );
}

function Frame32() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[#212121] border-solid inset-[-1px] pointer-events-none" />
      <Frame29 />
    </div>
  );
}

function Frame30() {
  return (
    <div className="bg-[#121212] h-[147px] relative shrink-0 w-full">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pl-[16px] pr-[25px] relative size-full">
          <Frame32 />
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#212121] border-solid inset-0 pointer-events-none" />
    </div>
  );
}

function RegionDeviceEventsTimelineMargin() {
  return (
    <div className="bg-[#080808] content-stretch flex flex-col items-start shrink-0 w-full" data-name="Region - Device events timeline:margin">
      <div aria-hidden="true" className="absolute border-[#212121] border-solid border-t inset-0 pointer-events-none" />
      <BackgroundVerticalBorder5 />
      <Frame30 />
    </div>
  );
}

function Container98() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
        <p className="leading-[20px]">IP UPDATED:</p>
      </div>
    </div>
  );
}

function Container99() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#e5e5e5] text-[12px] whitespace-nowrap">
        <p className="leading-[20px]">2025-02-10 14:32</p>
      </div>
    </div>
  );
}

function Container97() {
  return (
    <div className="flex-[1_0_0] h-full min-h-px min-w-px relative" data-name="Container">
      <div className="flex flex-row items-center justify-center size-full">
        <div className="content-stretch flex gap-[12px] items-center justify-center px-[16px] relative size-full">
          <Container98 />
          <Container99 />
        </div>
      </div>
    </div>
  );
}

function Container96() {
  return (
    <div className="bg-[#121212] content-stretch flex h-[64px] items-center justify-center relative shrink-0 w-[599px]" data-name="Container">
      <Container97 />
    </div>
  );
}

function BackgroundHorizontalBorder24() {
  return (
    <div className="bg-[#080808] content-stretch flex flex-col items-start shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#2b2b2b] border-solid border-t inset-0 pointer-events-none" />
      <RegionDeviceEventsTimelineMargin />
      <Container96 />
    </div>
  );
}

function TimelineTable() {
  const timelineData = [
    { time: '12:45 PM', event: 'IP Updated', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '12:30 PM', event: 'App Launched', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '12:15 PM', event: 'Network Scan', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '11:50 AM', event: 'VPN Connected', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '11:30 AM', event: 'Location Changed', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '11:15 AM', event: 'Battery Low', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '10:45 AM', event: 'App Closed', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '10:30 AM', event: 'Screen Unlock', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '10:00 AM', event: 'WiFi Disconnected', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '09:45 AM', event: 'Photo Captured', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '09:30 AM', event: 'Bluetooth Connected', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '09:15 AM', event: 'Network Connected', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '09:00 AM', event: 'Device Restarted', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '08:45 AM', event: 'Call Ended', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '08:30 AM', event: 'Call Started', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '08:15 AM', event: 'SMS Received', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '08:00 AM', event: 'Alarm Dismissed', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '07:45 PM', event: 'App Updated', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '07:30 PM', event: 'Location Changed', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '07:15 PM', event: 'Charging Started', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '07:00 PM', event: 'Network Switched', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '06:45 PM', event: 'Screen Lock', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '06:30 PM', event: 'App Installed', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '06:15 PM', event: 'Backup Completed', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
    { time: '06:00 PM', event: 'Device Unlocked', city: 'Tehran', coordinates: '35.6892°N, 51.3890°E' },
  ];

  return (
    <div className="bg-[#080808] w-full">
      <div className="flex flex-col">
        {timelineData.map((entry, index) => (
          <div key={index} className="border-b border-[#212121]">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#0f0f0f] transition-colors">
              <div className="flex flex-col gap-1">
                <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.time}
                </div>
                <div className="text-[11px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.event}
                </div>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <div className="text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.city}
                </div>
                <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.coordinates}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeolocationList() {
  const geolocationData = [
    { location: 'Tehran, Iran', coordinates: '35.6892°N, 51.3890°E', time: '12:45 PM' },
    { location: 'Tehran, Iran', coordinates: '35.6850°N, 51.3920°E', time: '12:30 PM' },
    { location: 'Tehran, Iran', coordinates: '35.6910°N, 51.3875°E', time: '12:15 PM' },
    { location: 'Tehran, Iran', coordinates: '35.6880°N, 51.3900°E', time: '11:50 AM' },
    { location: 'Tehran, Iran', coordinates: '35.6920°N, 51.3860°E', time: '11:30 AM' },
    { location: 'Karaj, Iran', coordinates: '35.8355°N, 50.9768°E', time: '11:15 AM' },
    { location: 'Karaj, Iran', coordinates: '35.8370°N, 50.9750°E', time: '10:45 AM' },
    { location: 'Tehran, Iran', coordinates: '35.6995°N, 51.3380°E', time: '10:30 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7010°N, 51.3365°E', time: '10:00 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7025°N, 51.3350°E', time: '09:45 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7040°N, 51.3335°E', time: '09:30 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7055°N, 51.3320°E', time: '09:15 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7070°N, 51.3305°E', time: '09:00 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7085°N, 51.3290°E', time: '08:45 AM' },
    { location: 'Tehran, Iran', coordinates: '35.7100°N, 51.3275°E', time: '08:30 AM' },
    { location: 'Isfahan, Iran', coordinates: '32.6546°N, 51.6680°E', time: '08:15 AM' },
    { location: 'Isfahan, Iran', coordinates: '32.6560°N, 51.6665°E', time: '08:00 AM' },
    { location: 'Isfahan, Iran', coordinates: '32.6575°N, 51.6650°E', time: '07:45 PM' },
    { location: 'Shiraz, Iran', coordinates: '29.5918°N, 52.5836°E', time: '07:30 PM' },
    { location: 'Shiraz, Iran', coordinates: '29.5932°N, 52.5821°E', time: '07:15 PM' },
    { location: 'Mashhad, Iran', coordinates: '36.2974°N, 59.6059°E', time: '07:00 PM' },
    { location: 'Mashhad, Iran', coordinates: '36.2988°N, 59.6044°E', time: '06:45 PM' },
    { location: 'Tehran, Iran', coordinates: '35.6892°N, 51.3890°E', time: '06:30 PM' },
    { location: 'Tehran, Iran', coordinates: '35.6906°N, 51.3875°E', time: '06:15 PM' },
    { location: 'Tehran, Iran', coordinates: '35.6920°N, 51.3860°E', time: '06:00 PM' },
  ];

  return (
    <div className="bg-[#080808] w-full">
      <div className="flex flex-col">
        {geolocationData.map((entry, index) => (
          <div key={index} className="border-b border-[#212121]">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#0f0f0f] transition-colors">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <div className="text-[11px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.location}
                </div>
                <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.coordinates}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
                  {entry.time}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="bg-[#080808] content-stretch flex h-[32px] w-[32px] items-center justify-center p-[6px] rounded-[6px] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer">
                      <MoreVertical size={16} className="text-[#9b9b9b]" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem>
                      View on Map
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Copy Coordinates
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Export Location
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ApplicationsList() {
  const applicationsData = [
    { name: 'WhatsApp', link: 'com.whatsapp' },
    { name: 'Instagram', link: 'com.instagram.android' },
    { name: 'Facebook', link: 'com.facebook.katana' },
    { name: 'Telegram', link: 'org.telegram.messenger' },
    { name: null, link: 'com.google.android.gm' },
    { name: 'Twitter', link: 'com.twitter.android' },
    { name: null, link: 'com.spotify.music' },
    { name: 'YouTube', link: 'com.google.android.youtube' },
    { name: null, link: 'com.netflix.mediaclient' },
    { name: 'TikTok', link: 'com.zhiliaoapp.musically' },
    { name: null, link: 'com.snapchat.android' },
    { name: 'LinkedIn', link: 'com.linkedin.android' },
    { name: null, link: 'com.amazon.mShop.android.shopping' },
    { name: 'Uber', link: 'com.ubercab' },
    { name: null, link: 'com.google.android.apps.maps' },
    { name: 'Signal', link: 'org.thoughtcrime.securesms' },
    { name: null, link: 'com.reddit.frontpage' },
    { name: 'Discord', link: 'com.discord' },
    { name: null, link: 'com.google.android.apps.photos' },
    { name: 'Slack', link: 'com.Slack' },
    { name: null, link: 'us.zoom.videomeetings' },
    { name: 'Dropbox', link: 'com.dropbox.android' },
    { name: null, link: 'com.microsoft.teams' },
    { name: 'PayPal', link: 'com.paypal.android.p2pmobile' },
    { name: null, link: 'com.google.android.apps.authenticator2' },
  ];

  return (
    <div className="bg-[#080808] w-full">
      <div className="flex flex-col">
        {applicationsData.map((app, index) => (
          <div key={index} className="border-b border-[#212121]">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#0f0f0f] transition-colors">
              <div className="flex flex-col gap-1 flex-1 min-w-0">
                {app.name && (
                  <div className="text-[11px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
                    {app.name}
                  </div>
                )}
                <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] truncate">
                  {app.link}
                </div>
              </div>
              <div className="ml-4 shrink-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="bg-[#080808] content-stretch flex h-[32px] w-[32px] items-center justify-center p-[6px] rounded-[6px] hover:bg-[#1a1a1a] active:bg-[#2a2a2a] transition-colors cursor-pointer">
                      <MoreVertical size={16} className="text-[#9b9b9b]" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[180px]">
                    <DropdownMenuItem>
                      Scan Application
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Arm Application
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Rename Application
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportList() {
  const reportData = [
    { label: 'Device Model', value: 'iPhone 13 Pro' },
    { label: 'OS Version', value: 'iOS 16.5.1' },
    { label: 'Screen Size', value: '6.1 inches' },
    { label: 'Battery Health', value: '87%' },
    { label: 'Storage Capacity', value: '256 GB' },
    { label: 'Storage Used', value: '189 GB' },
    { label: 'IMEI', value: '358912345678901' },
    { label: 'Serial Number', value: 'C02XK1EMJHD5' },
    { label: 'Carrier', value: 'MTN Irancell' },
    { label: 'Phone Number', value: '+98 912 345 6789' },
    { label: 'Last Backup', value: '2 days ago' },
    { label: 'iCloud Status', value: 'Enabled' },
    { label: 'Find My iPhone', value: 'Enabled' },
    { label: 'Activation Lock', value: 'On' },
    { label: 'Jailbreak Status', value: 'Not Detected' },
    { label: 'VPN Active', value: 'Yes' },
    { label: 'Proxy Settings', value: 'Configured' },
    { label: 'Bluetooth', value: 'On' },
    { label: 'WiFi', value: 'Connected' },
    { label: 'Cellular Data', value: 'Enabled' },
    { label: 'Location Services', value: 'Enabled' },
    { label: 'Screen Time', value: '6h 23m today' },
    { label: 'App Count', value: '147 apps' },
    { label: 'System Version', value: 'iOS 16.5.1 (20F75)' },
    { label: 'Build Number', value: '20F75' },
  ];

  return (
    <div className="bg-[#080808] w-full">
      <div className="flex flex-col">
        {reportData.map((entry, index) => (
          <div key={index} className="border-b border-[#212121]">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#0f0f0f] transition-colors">
              <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] uppercase">
                {entry.label}:
              </div>
              <div className="text-[11px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] text-right">
                {entry.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ThreatReportTable() {
  const threatData = [
    // Threat Assessment Section
    { label: 'Threat Score', value: '87/100 [HIGH]', highlight: true },
    { label: 'Honeypot', value: 'YES', highlight: true },
    { label: 'Honeypot Probability', value: '85%' },

    // Threat Intelligence Section
    { label: 'URL Count', value: '34 URLs' },
    { label: 'Primary Tag', value: 'malware-distribution' },
    { label: 'Tags', value: 'vpn, proxy +2' },
    { label: 'Country', value: 'Iran (IR)' },
    { label: 'City', value: 'Tehran' },
    { label: 'ASN', value: 'AS44244' },
    { label: 'ISP', value: 'MTN Irancell' },
    { label: 'Organization', value: 'MTN Irancell Telecommunications' },
    { label: 'Abuse Contact', value: 'abuse@mtn.irancell.ir' },

    // Network Infrastructure Section
    { label: 'IP Address', value: '94.232.46.172' },
    { label: 'Network Range', value: '94.232.0.0/16' },
    { label: 'Reverse DNS', value: 'ptr-94-232-46-172.irancell.net' },
    { label: 'MAC Address', value: 'A4:83:E7:1B:52:3F' },
    { label: 'Gateway', value: '94.232.46.1' },
    { label: 'DNS Servers', value: '8.8.8.8, 8.8.4.4' },
    { label: 'Proxy Server', value: '185.143.234.17:8080' },

    // Services & Exposure Section
    { label: 'Open Ports', value: '22, 80, 443, 8080, 3389' },
    { label: 'Running Services', value: 'HTTP, HTTPS, SSH, RDP' },
    { label: 'SSL Certificate', value: 'Valid (Expires: 2024-12-15)' },
    { label: 'Firewall Status', value: 'Enabled' },
    { label: 'Last Scan', value: '2024-01-15 14:32:45 UTC' },
  ];

  return (
    <div className="bg-[#080808] w-full">
      <div className="flex flex-col">
        {threatData.map((entry, index) => (
          <div key={index} className="border-b border-[#212121]">
            <div className="flex items-center justify-between px-4 py-3 hover:bg-[#0f0f0f] transition-colors">
              <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] uppercase">
                {entry.label}:
              </div>
              <div className={`text-[11px] font-['IBM_Plex_Sans:Regular',sans-serif] text-right ${entry.highlight ? 'text-[#ff6b6b]' : 'text-[#e5e5e5]'}`}>
                {entry.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface WhoisData {
  ipAddress: string;
  netname: string;
  organization: string;
  country: string;
  city: string;
  isp: string;
  asn: string;
  lastUpdated: string;
}

function WhoisDataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#0d0d0d] content-stretch flex h-[43px] items-center pb-px relative shrink-0 w-full">
      <div aria-hidden="true" className="absolute border-[#212121] border-b border-solid inset-0 pointer-events-none" />
      <div className="content-stretch flex items-center px-[16px] py-[12px] relative shrink-0 w-[132px]">
        <div className="flex flex-col font-['IBM_Plex_Sans:Regular',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#9b9b9b] text-[12px] uppercase whitespace-nowrap">
          <p className="leading-[20px]">{label}:</p>
        </div>
      </div>
      <div className="flex-[1_0_0] min-h-px min-w-px relative">
        <div className="flex flex-row items-center justify-end size-full">
          <div className="content-stretch flex items-center justify-end px-[16px] py-[12px] relative w-full">
            <div className="flex flex-[1_0_0] flex-col font-['IBM_Plex_Mono:Regular',monospace] justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#e5e5e5] text-[12px] text-right">
              <p className="leading-[20px] whitespace-pre-wrap">{value}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhoisInfo({ whoisData, onFillWhois, isLoading, loadingProgress = 0, loadingPhase = '' }: { whoisData: WhoisData | null; onFillWhois: () => void; isLoading: boolean; loadingProgress?: number; loadingPhase?: string }) {
  // Empty State
  if (!whoisData) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="flex flex-col items-center text-center max-w-[280px]">
          <div className="w-12 h-12 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-4">
            <Globe size={24} className="text-[#9b9b9b]" />
          </div>

          <h3 className="text-[14px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#e5e5e5] mb-2">
            No WHOIS Data
          </h3>

          <p className="text-[12px] font-['IBM_Plex_Sans:Regular',sans-serif] text-[#9b9b9b] mb-6 leading-relaxed">
            WHOIS information has not been retrieved yet. Click below to start the lookup process.
          </p>

          {isLoading ? (
            <div className="w-full mb-4">
              <PlasmaLoadingBar
                progress={loadingProgress}
                state="scanning"
                phaseText={loadingPhase}
                size="sm"
                enablePlasmaEffect={true}
                enableBorderAnimation={false}
              />
            </div>
          ) : (
            <button
              onClick={onFillWhois}
              className="px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded-[8px] text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors flex items-center gap-2"
            >
              <Globe size={16} />
              <span>Fill WHOIS Information</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // Filled State
  return (
    <div className="flex-1 flex flex-col">
      {/* Reprocess Button or Loading Bar */}
      <div className="bg-[#080808] px-4 py-3 border-b border-[#212121]">
        {isLoading ? (
          <PlasmaLoadingBar
            progress={loadingProgress}
            state="scanning"
            phaseText={loadingPhase}
            size="sm"
            enablePlasmaEffect={true}
            enableBorderAnimation={false}
          />
        ) : (
          <button
            onClick={onFillWhois}
            className="w-full px-4 py-2.5 bg-[#1a1a1a] hover:bg-[#242424] border border-[#2b2b2b] rounded-[8px] text-[13px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif] transition-colors flex items-center justify-center gap-2"
          >
            <Globe size={16} />
            <span>Reprocess WHOIS Lookup</span>
          </button>
        )}
      </div>

      {/* WHOIS Data Rows */}
      <div className="flex-1 overflow-y-auto">
        <WhoisDataRow label="IP Address" value={whoisData.ipAddress} />
        <WhoisDataRow label="Network Name" value={whoisData.netname} />
        <WhoisDataRow label="Organization" value={whoisData.organization} />
        <WhoisDataRow label="Location" value={`${whoisData.city}, ${whoisData.country}`} />
        <WhoisDataRow label="ISP" value={whoisData.isp} />
        <WhoisDataRow label="ASN" value={whoisData.asn} />
        <WhoisDataRow label="Last Updated" value={whoisData.lastUpdated} />
      </div>
    </div>
  );
}

function IPUpdateFooter() {
  return (
    <div className="bg-[#0d0d0d] border-t border-[#2b2b2b] px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="text-[10px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif] uppercase">
          IP Updated:
        </div>
        <div className="text-[11px] text-[#e5e5e5] font-['IBM_Plex_Sans:Regular',sans-serif]">
          12:45 PM
        </div>
      </div>
      <div className="text-[11px] text-[#9b9b9b] font-['IBM_Plex_Sans:Regular',sans-serif]">
        94.232.46.172
      </div>
    </div>
  );
}

interface DefaultProps {
  onClose?: () => void;
}

export default function Default({ onClose }: DefaultProps = {}) {
  const [activeTab, setActiveTab] = useState<'device' | 'report' | 'applications' | 'network' | 'timeline' | 'devices'>('device');
  const [currentDeviceId, setCurrentDeviceId] = useState('837365');
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [isWhoisLoading, setIsWhoisLoading] = useState(false);
  const [isWhoisModalOpen, setIsWhoisModalOpen] = useState(false);
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [whoisLoadingProgress, setWhoisLoadingProgress] = useState(0);
  const [whoisLoadingPhase, setWhoisLoadingPhase] = useState('');

  // Mock device list for navigation
  const mockDevices = Array.from({ length: 20 }, (_, i) => String(837365 + i));

  const currentIndex = mockDevices.indexOf(currentDeviceId);

  const handleDeviceSelect = (deviceId: string) => {
    setCurrentDeviceId(deviceId);
    setActiveTab('device'); // Return to device details view after selection
  };

  const handlePrevDevice = () => {
    if (currentIndex > 0) {
      setCurrentDeviceId(mockDevices[currentIndex - 1]);
    }
  };

  const handleNextDevice = () => {
    if (currentIndex < mockDevices.length - 1) {
      setCurrentDeviceId(mockDevices[currentIndex + 1]);
    }
  };

  const handleFlagDevice = (name: string, description: string) => {
    console.log('Flagged device:', { deviceId: currentDeviceId, name, description });
    // Add your flag device logic here
  };

  const handleFillWhois = () => {
    setIsWhoisLoading(true);
    setWhoisLoadingProgress(0);
    console.log("Triggering WHOIS information job...");

    // WHOIS lookup phases
    const phases = [
      { progress: 15, text: 'Initializing lookup...', delay: 200 },
      { progress: 30, text: 'Connecting to WHOIS server...', delay: 400 },
      { progress: 50, text: 'Querying IP database...', delay: 600 },
      { progress: 70, text: 'Retrieving network info...', delay: 800 },
      { progress: 85, text: 'Processing response...', delay: 1000 },
      { progress: 100, text: 'Lookup complete', delay: 1200 },
    ];

    // Simulate progressive loading
    let currentPhaseIndex = 0;
    const progressInterval = setInterval(() => {
      if (currentPhaseIndex < phases.length) {
        const phase = phases[currentPhaseIndex];
        setWhoisLoadingProgress(phase.progress);
        setWhoisLoadingPhase(phase.text);
        currentPhaseIndex++;
      } else {
        clearInterval(progressInterval);
        setIsWhoisLoading(false);
        setIsWhoisModalOpen(true);
        console.log("WHOIS information job completed");
      }
    }, 300);
  };

  const handleAcceptWhois = () => {
    console.log("WHOIS data accepted");
    // Save the WHOIS data
    setWhoisData({
      ipAddress: "94.232.46.172",
      netname: "DIGITALOCEAN-94-232-46-0",
      organization: "DigitalOcean, LLC",
      country: "Netherlands",
      city: "Amsterdam",
      isp: "DigitalOcean",
      asn: "AS14061",
      lastUpdated: "2024-01-15",
    });
    setIsWhoisModalOpen(false);
  };

  return (
    <div className="bg-[#080808] relative w-[320px] h-full flex flex-col" data-name="Default">
      {/* Sticky Tab Bar with Buttons - Hide when on devices view */}
      {activeTab !== 'devices' && (
        <div className="sticky top-0 z-20 bg-[#080808]">
          <BackgroundHorizontalBorder1
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onDeviceSwitcherClick={() => setActiveTab('devices')}
            currentDeviceId={currentDeviceId}
            onPrevDevice={handlePrevDevice}
            onNextDevice={handleNextDevice}
            onFlagClick={() => setIsFlagModalOpen(true)}
            onClose={onClose}
          />
        </div>
      )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {activeTab === 'device' && <ReportList />}
        {activeTab === 'report' && <ThreatReportTable />}
        {activeTab === 'applications' && <ApplicationsList />}
        {activeTab === 'network' && <WhoisInfo whoisData={whoisData} onFillWhois={handleFillWhois} isLoading={isWhoisLoading} loadingProgress={whoisLoadingProgress} loadingPhase={whoisLoadingPhase} />}
        {activeTab === 'timeline' && <TimelineTable />}
        {activeTab === 'devices' && <DeviceSwitcher isOpen={true} onClose={() => setActiveTab('device')} currentDeviceId={currentDeviceId} onDeviceSelect={handleDeviceSelect} />}
      </div>

      {/* Persistent Footer - Hide when on devices view */}
      {activeTab !== 'devices' && (
        <div className="shrink-0">
          <IPUpdateFooter />
        </div>
      )}

      {/* Flag Device Modal */}
      <FlagDeviceModal
        isOpen={isFlagModalOpen}
        onClose={() => setIsFlagModalOpen(false)}
        deviceId={currentDeviceId}
        onSave={handleFlagDevice}
      />

      {/* WHOIS Results Modal */}
      <WhoisResultsModal
        isOpen={isWhoisModalOpen}
        onClose={() => setIsWhoisModalOpen(false)}
        onAccept={handleAcceptWhois}
      />

      <div aria-hidden="true" className="absolute border-[#2b2b2b] border-l border-solid inset-0 pointer-events-none" />
    </div>
  );
}