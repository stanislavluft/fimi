// components/AppSidebar.tsx
import { Link, useLocation } from 'react-router-dom';

import {
  ArrowLeftRightIcon,
  ChartNoAxesCombined,
  LayoutDashboard,
  PiggyBank,
  SettingsIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import CustomSidebarTrigger from '@/components/shared/CustomSidebarTrigger';
import { ThemeToggle } from '@/components/shared/ThemeToggle';
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
  useSidebar,
} from '@/components/ui/sidebar';

type NavItem = {
  path: '/dashboard' | '/operations' | '/analytics' | '/savings' | '/settings';
  label: string;
  icon: LucideIcon;
};

const navigation: NavItem[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/operations', label: 'Operations', icon: ArrowLeftRightIcon },
  { path: '/analytics', label: 'Analytics', icon: ChartNoAxesCombined },
  { path: '/savings', label: 'Savings', icon: PiggyBank },
];

export function AppSidebar() {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  const handleNavClick = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="icon">
      {/* Mobile */}
      <SidebarHeader className="flex-row items-center justify-between px-4 pt-4 md:hidden">
        <Link to="/" className="text-foreground text-2xl font-semibold tracking-wide">
          fimi
        </Link>
        <CustomSidebarTrigger />
      </SidebarHeader>

      {/* Desktop */}
      <SidebarHeader className="hidden flex-row items-center justify-between px-4 pt-4 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 md:flex">
        <Link
          to="/"
          className="text-foreground text-2xl font-semibold tracking-wide group-data-[collapsible=icon]:hidden"
        >
          fimi
        </Link>
        <CustomSidebarTrigger />
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
                    <Link onClick={handleNavClick} to={item.path}>
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
            <ThemeToggle />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              isActive={pathname === '/settings' || undefined}
            >
              <Link onClick={handleNavClick} to="/settings">
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
