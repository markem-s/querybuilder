import Default from "@drawer-imports/Default";

interface DeviceDetailsContentProps {
  onClose: () => void;
}

export function DeviceDetailsContent({ onClose }: DeviceDetailsContentProps) {
  // Add click handler to the close button
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Check if clicked element is within the close button
    const closeButton = target.closest('[data-name="Button - Close drawer"]');
    if (closeButton) {
      onClose();
    }
  };

  return (
    <div onClick={handleClick} className="h-full w-full">
      <Default />
    </div>
  );
}
