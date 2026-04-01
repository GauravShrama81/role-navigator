import { useRole } from '@/contexts/RoleContext';
import { roles, dashboardNavItems } from '@/data/mockData';
import type { Role } from '@/data/mockData';
import { NavLink } from '@/components/NavLink';
import { useLocation } from 'react-router-dom';
import {
  LayoutDashboard, GraduationCap, Sparkles, BarChart3, SearchCheck,
  Workflow, BookOpen, Upload, GitBranch, FileOutput, TrendingUp, ChevronLeft
} from 'lucide-react';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard, GraduationCap, Sparkles, BarChart3, SearchCheck,
  Workflow, BookOpen, Upload, GitBranch, FileOutput, TrendingUp,
};

export function DashboardSidebar() {
  const { currentRole, setCurrentRole } = useRole();
  const role = roles.find((r) => r.key === currentRole)!;
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();

  const visibleNav = dashboardNavItems.filter((item) => item.roles.includes(currentRole));
  const groups = [...new Set(visibleNav.map((item) => item.group))];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
              <BarChart3 className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-sm font-bold text-sidebar-foreground tracking-tight">CIP</span>
                <span className="ml-1.5 text-[10px] text-sidebar-accent-foreground/60 font-medium">v0.2</span>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-accent-foreground/60 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {groups.map((group) => {
          const groupItems = visibleNav.filter((item) => item.group === group);
          return (
            <SidebarGroup key={group} className="mb-1">
              {!collapsed && (
                <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-accent-foreground/40 px-3 mb-1">
                  {group}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu>
                  {groupItems.map((item) => {
                    const Icon = iconMap[item.icon || 'LayoutDashboard'];
                    const active = isActive(item.path);
                    return (
                      <SidebarMenuItem key={item.path}>
                        <SidebarMenuButton asChild>
                          <NavLink
                            to={item.path}
                            end={item.path === '/dashboard'}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                              active
                                ? 'bg-sidebar-primary/15 text-sidebar-primary'
                                : 'text-sidebar-accent-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
                            }`}
                            activeClassName="bg-sidebar-primary/15 text-sidebar-primary"
                          >
                            <Icon className={`h-4 w-4 flex-shrink-0 ${active ? 'text-sidebar-primary' : ''}`} />
                            {!collapsed && (
                              <>
                                <span className="flex-1">{item.label}</span>
                                {item.badge && (
                                  <Badge
                                    variant="secondary"
                                    className={`text-[10px] px-1.5 py-0 h-5 min-w-[20px] justify-center ${
                                      active ? 'bg-sidebar-primary/20 text-sidebar-primary' : 'bg-sidebar-accent text-sidebar-accent-foreground/60'
                                    }`}
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </>
                            )}
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-sidebar-accent transition-colors focus:outline-none">
            <Avatar className="h-8 w-8 bg-sidebar-primary text-sidebar-primary-foreground">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
                {role.avatar}
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground leading-tight truncate">{role.fullLabel}</p>
                <p className="text-[11px] text-sidebar-accent-foreground/50 truncate">Risepoint Academic Svcs</p>
              </div>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-64">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Switch Role</DropdownMenuLabel>
            {roles.map((r) => (
              <DropdownMenuItem
                key={r.key}
                onClick={() => setCurrentRole(r.key as Role)}
                className={`flex items-center gap-3 cursor-pointer ${r.key === currentRole ? 'bg-primary/5' : ''}`}
              >
                <Avatar className="h-7 w-7 bg-primary/10 text-primary">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{r.avatar}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium">{r.fullLabel}</p>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
                {r.key === currentRole && <div className="w-2 h-2 rounded-full bg-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <a href="/" className="flex items-center gap-2 text-sm">
                Back to Home
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
