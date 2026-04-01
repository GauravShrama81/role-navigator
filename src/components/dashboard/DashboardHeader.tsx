import { useRole } from '@/contexts/RoleContext';
import { roles } from '@/data/mockData';
import { BarChart3, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Role } from '@/data/mockData';

export function DashboardHeader() {
  const { currentRole, setCurrentRole } = useRole();
  const role = roles.find((r) => r.key === currentRole)!;

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="h-full max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <BarChart3 className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-tight font-display">CIP</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link to="/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors">
            Dashboard
          </Link>
          <Link to="/dashboard/reports" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Reports
          </Link>
          <Link to="/dashboard/workflow" className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
            Workflow
          </Link>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-muted transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-foreground leading-tight">{role.fullLabel}</p>
              <p className="text-xs text-muted-foreground">{role.label} Role</p>
            </div>
            <Avatar className="h-9 w-9 bg-primary text-primary-foreground">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                {role.avatar}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">Switch Role</DropdownMenuLabel>
            {roles.map((r) => (
              <DropdownMenuItem
                key={r.key}
                onClick={() => setCurrentRole(r.key as Role)}
                className={`flex items-center gap-3 cursor-pointer ${r.key === currentRole ? 'bg-primary/5' : ''}`}
              >
                <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                  <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">{r.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{r.fullLabel}</p>
                  <p className="text-xs text-muted-foreground">{r.description}</p>
                </div>
                {r.key === currentRole && <div className="ml-auto w-2 h-2 rounded-full bg-primary" />}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link to="/" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" /> Back to Landing
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
