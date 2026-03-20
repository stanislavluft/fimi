import { PanelLeftIcon, TextAlignJustify, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { cn } from '@/lib/utils';

function CustomSidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar, state, isMobile, openMobile } = useSidebar();

  const isOpen = isMobile ? openMobile : state === 'expanded';
  const tooltipText = isOpen ? 'Close Sidebar' : 'Open Sidebar';
  const Icon = isMobile ? (isOpen ? XIcon : TextAlignJustify) : PanelLeftIcon;

  const button = (
    <Button
      variant="ghost"
      size="icon-lg"
      onClick={toggleSidebar}
      className={cn(
        'hover:bg-sidebar-hover hover:text-sidebar-foreground text-muted-foreground rounded-md',
        className,
      )}
    >
      <Icon strokeWidth={1.5} className="h-5! w-5!" />
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
