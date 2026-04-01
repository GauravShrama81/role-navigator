import { RoleProvider } from '@/contexts/RoleContext';
import { DashboardHeader } from '@/components/dashboard/DashboardHeader';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { ReportsPage } from '@/components/dashboard/ReportsPage';
import { WorkflowPage } from '@/components/dashboard/WorkflowPage';
import { StandardsPage } from '@/components/dashboard/StandardsPage';
import { IngestionPage } from '@/components/dashboard/IngestionPage';
import { MappingPage } from '@/components/dashboard/MappingPage';
import { ScenariosPage } from '@/components/dashboard/ScenariosPage';
import { Routes, Route } from 'react-router-dom';

export default function Dashboard() {
  return (
    <RoleProvider>
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="max-w-[1440px] mx-auto px-6 py-8">
          <Routes>
            <Route index element={<DashboardOverview />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="workflow" element={<WorkflowPage />} />
            <Route path="standards" element={<StandardsPage />} />
            <Route path="ingestion" element={<IngestionPage />} />
            <Route path="mapping" element={<MappingPage />} />
            <Route path="scenarios" element={<ScenariosPage />} />
          </Routes>
        </main>
      </div>
    </RoleProvider>
  );
}
