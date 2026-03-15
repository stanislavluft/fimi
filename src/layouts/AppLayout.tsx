// AppLayout.tsx
import { Outlet } from 'react-router-dom';

import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

import { AppSidebar } from '@/layouts/AppSidebar';

function AppLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default AppLayout;
