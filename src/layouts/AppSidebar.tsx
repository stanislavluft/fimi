// components/AppSidebar.tsx
import { Link, useLocation } from 'react-router-dom';

import {
  ArrowLeftRightIcon,
  ChartNoAxesCombined,
  LayoutDashboard,
  SettingsIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';

type NavItem = {
  path: '/dashboard' | '/operations' | '/analytics' | '/settings';
  label: string;
  icon: LucideIcon;
};

const navigation: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/operations', label: 'Operations', icon: ArrowLeftRightIcon },
  { path: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center justify-between px-2 py-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <Link
            to="/"
            className="text-sidebar-foreground tracking-light text-2xl font-semibold group-data-[collapsible=icon]:hidden"
          >
            fimi
          </Link>
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    isActive={pathname === item.path || undefined}
                  >
                    <Link to={item.path}>
                      <item.icon strokeWidth={1.5} />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="pb-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              isActive={pathname === '/settings' || undefined}
            >
              <Link to="/settings">
                <SettingsIcon strokeWidth={1.5} />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
