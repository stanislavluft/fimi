// AppLayout.tsx
import { Outlet } from 'react-router-dom';

import CustomSidebarTrigger from '@/components/CustomSidebarTrigger';
import { SidebarProvider } from '@/components/ui/sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

import { AppSidebar } from '@/layouts/AppSidebar';

function MobileHeader() {
  return (
    <header className="flex items-center justify-end md:hidden">
      <CustomSidebarTrigger />
    </header>
  );
}

function AppLayout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 p-4">
          <MobileHeader />
          <Outlet />
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}

export default AppLayout;
