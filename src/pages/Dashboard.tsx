import { RoleProvider } from '@/contexts/RoleContext';
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ProgramsPage } from '@/components/dashboard/ProgramsPage';
import { AIMappingPage } from '@/components/dashboard/AIMappingPage';
import { AnalyticsPage } from '@/components/dashboard/AnalyticsPage';
import { ReportsPage } from '@/components/dashboard/ReportsPage';
import { WorkflowPage } from '@/components/dashboard/WorkflowPage';
import { StandardsPage } from '@/components/dashboard/StandardsPage';
import { IngestionPage } from '@/components/dashboard/IngestionPage';
import { MappingPage } from '@/components/dashboard/MappingPage';
import { ScenariosPage } from '@/components/dashboard/ScenariosPage';
import { MarketIntelPage } from '@/components/dashboard/MarketIntelPage';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { dashboardNavItems } from '@/data/mockData';

const breadcrumbMap: Record<string, string> = {};
dashboardNavItems.forEach((item) => {
  const segment = item.path.replace('/dashboard', '').replace('/', '') || '';
  breadcrumbMap[segment] = item.label;
});

function DashboardBreadcrumb() {
  const location = useLocation();
  const segment = location.pathname.replace('/dashboard', '').replace('/', '') || '';
  const label = breadcrumbMap[segment] || 'Dashboard';

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground font-medium">CIP</span>
      <span className="text-muted-foreground/30">/</span>
      <span className="text-xs text-foreground font-medium">{label}</span>
    </div>
  );
}

export default function Dashboard() {
  return (
    <RoleProvider>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-background">
          <DashboardSidebar />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Top bar */}
            <header className="h-14 border-b border-border bg-card/80 backdrop-blur-lg flex items-center justify-between px-4 sticky top-0 z-40">
              <div className="flex items-center gap-3">
                <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
                <DashboardBreadcrumb />
              </div>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search programs, CLOs..."
                    className="h-8 w-64 pl-8 text-xs bg-muted/50 border-border"
                  />
                  <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground/50 font-mono">⌘K</kbd>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                  <Bell className="h-4 w-4" />
                </Button>
              </div>
            </header>

            <main className="flex-1 overflow-auto p-6">
              <div className="max-w-[1400px] mx-auto">
                <Routes>
                  <Route index element={<DashboardOverview />} />
                  <Route path="programs" element={<ProgramsPage />} />
                  <Route path="ai-mapping" element={<AIMappingPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="reports" element={<ReportsPage />} />
                  <Route path="workflow" element={<WorkflowPage />} />
                  <Route path="standards" element={<StandardsPage />} />
                  <Route path="ingestion" element={<IngestionPage />} />
                  <Route path="mapping" element={<MappingPage />} />
                  <Route path="scenarios" element={<ScenariosPage />} />
                  <Route path="market" element={<MarketIntelPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </RoleProvider>
  );
}
