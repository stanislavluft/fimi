import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from '@/layouts/AppLayout';
import AnalyticsPage from '@/pages/AnalyticsPage';
import DashboardPage from '@/pages/DashboardPage';
import OperationsPage from '@/pages/OperationsPage';
import SavingsPage from '@/pages/SavingsPage';
import SettingsPage from '@/pages/SettingsPage';

import { ThemeProvider } from './components/shared/ThemeProvider';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/operations" element={<OperationsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/savings" element={<SavingsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
