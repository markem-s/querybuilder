import Default from "@drawer-imports/Default";

type TabKey = 'device' | 'report' | 'applications' | 'network' | 'timeline' | 'devices';

interface DeviceDetailsContentProps {
  onClose: () => void;
  activeTab?: TabKey;
  onTabChange?: (tab: TabKey) => void;
}

export function DeviceDetailsContent({ onClose, activeTab, onTabChange }: DeviceDetailsContentProps) {
  return (
    <div className="h-full w-full overflow-hidden">
      <Default onClose={onClose} activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}
