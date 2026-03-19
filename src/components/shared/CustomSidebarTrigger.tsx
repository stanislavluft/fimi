import { PanelLeftIcon, TextAlignJustify, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

function CustomSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar, state, isMobile, openMobile } = useSidebar();

  const isOpen = isMobile ? openMobile : state === 'expanded';
  const tooltipText = isOpen ? 'Close Sidebar' : 'Open Sidebar';
  const Icon = isMobile ? (isOpen ? XIcon : TextAlignJustify) : PanelLeftIcon;

  const button = (
    <Button variant="ghost" size="icon-sm" onClick={toggleSidebar} className={className}>
      <Icon strokeWidth={1.5} />
      <span className="sr-only">{tooltipText}</span>
    </Button>
  );

  if (isMobile) return button;

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right">{tooltipText}</TooltipContent>
    </Tooltip>
  );
}

export default CustomSidebarTrigger;
