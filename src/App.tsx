import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';

// Dashboard Module
import DashboardPage from './modules/dashboard/pages/DashboardPage';

// Inventory Module
import InventoryHomePage from './modules/inventory/pages/InventoryHomePage';
import ProjectDetailPage from './modules/inventory/pages/ProjectDetailPage';
import TowerFloorPlanPage from './modules/inventory/pages/TowerFloorPlanPage';
import UnitDetailPage from './modules/inventory/pages/UnitDetailPage';
import CompareProjectsPage from './modules/inventory/pages/CompareProjectsPage';
import CompareUnitsPage from './modules/inventory/pages/CompareUnitsPage';

// CRM Module
import CrmHomePage from './modules/crm/pages/CrmHomePage';
import LeadDetailPage from './modules/crm/pages/LeadDetailPage';

// Client Module
import ClientListPage from './modules/clients/pages/ClientListPage';
import ClientProfilePage from './modules/clients/pages/ClientProfilePage';

// Site Visit Module
import VisitCalendarPage from './modules/visits/pages/VisitCalendarPage';
import VisitActivePage from './modules/visits/pages/VisitActivePage';

// Hold Module
import HoldHubPage from './modules/holds/pages/HoldHubPage';
import HoldDetailPage from './modules/holds/pages/HoldDetailPage';

// Booking Module
import BookingHubPage from './modules/bookings/pages/BookingHubPage';
import BookingWizardPage from './modules/bookings/pages/BookingWizardPage';

// Wallet Module
import WalletHubPage from './modules/wallet/pages/WalletHubPage';
import CommissionDetailPage from './modules/wallet/pages/CommissionDetailPage';

// Team Module
import TeamHubPage from './modules/team/pages/TeamHubPage';
import AgentProfilePage from './modules/team/pages/AgentProfilePage';

// Notification Module
import NotificationHubPage from './modules/notifications/pages/NotificationHubPage';

// Profile Module
import ProfileHubPage from './modules/profile/pages/ProfileHubPage';
import SecuritySettingsPage from './modules/profile/pages/SecuritySettingsPage';

// Auth Module
import WelcomePage from './modules/auth/pages/WelcomePage';
import LoginPage from './modules/auth/pages/LoginPage';
import SecuritySetupPage from './modules/auth/pages/SecuritySetupPage';
import KYCDashboardPage from './modules/auth/pages/KYCDashboardPage';
import KYCStatusPage from './modules/auth/pages/KYCStatusPage';
import KYCDocumentPage from './modules/auth/pages/KYCDocumentPage';
import KYCSefliePage from './modules/auth/pages/KYCSefliePage';

function App() {
  return (
    <BrowserRouter>
      <div className="h-full bg-[#e8edf2] sm:py-6 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
        {/* S23 Ultra Phone Frame */}
        <div className="relative flex-shrink-0" style={{ width: '393px', height: '851px' }}>
          {/* Phone shell */}
          <div className="absolute inset-0 bg-slate-900 rounded-[3rem] shadow-[0_30px_80px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.08)_inset]" />
          {/* Side buttons */}
          <div className="absolute -right-[3px] top-28 w-[3px] h-16 bg-slate-700 rounded-r-sm" />
          <div className="absolute -left-[3px] top-24 w-[3px] h-10 bg-slate-700 rounded-l-sm" />
          <div className="absolute -left-[3px] top-36 w-[3px] h-16 bg-slate-700 rounded-l-sm" />
          {/* Screen bezel */}
          <div className="absolute inset-[8px] bg-background rounded-[2.5rem] overflow-hidden flex flex-col">
            {/* Status bar with punch hole camera */}
            <div className="relative flex-shrink-0 h-8 bg-background flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-full bg-slate-900" />
            </div>
            {/* App content */}
            <div className="flex-1 overflow-hidden flex flex-col">
          <Routes>
            {/* Root Redirect to Auth Welcome */}
            <Route path="/" element={<Navigate to="/auth/welcome" replace />} />

            {/* Auth Flow */}
            <Route path="/auth" element={<AuthLayout />}>
              <Route index element={<Navigate to="/auth/welcome" replace />} />
              <Route path="welcome" element={<WelcomePage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="security-setup" element={<SecuritySetupPage />} />
              <Route path="kyc" element={<KYCDashboardPage />} />
              <Route path="kyc/selfie" element={<KYCSefliePage />} />
              <Route path="kyc/:docId" element={<KYCDocumentPage />} />
              <Route path="kyc-status" element={<KYCStatusPage />} />
            </Route>

            {/* Main App Layout containing Bottom Navigation */}
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/inventory" element={<InventoryHomePage />} />
              <Route path="/crm" element={<CrmHomePage />} />
              <Route path="/notifications" element={<NotificationHubPage />} />
              <Route path="/profile" element={<ProfileHubPage />} />
            </Route>
            
            {/* Full Screen Drill-down Views (No Bottom Nav) */}
            <Route path="/inventory/project/:id" element={<ProjectDetailPage />} />
            <Route path="/inventory/project/:id/towers" element={<TowerFloorPlanPage />} />
            <Route path="/inventory/unit/:id" element={<UnitDetailPage />} />
            <Route path="/inventory/compare-projects" element={<CompareProjectsPage />} />
            <Route path="/inventory/compare-units" element={<CompareUnitsPage />} />
            <Route path="/crm/lead/:id" element={<LeadDetailPage />} />
            <Route path="/clients" element={<ClientListPage />} />
            <Route path="/clients/:id" element={<ClientProfilePage />} />
            <Route path="/visits" element={<VisitCalendarPage />} />
            <Route path="/visits/:id/active" element={<VisitActivePage />} />
            <Route path="/holds" element={<HoldHubPage />} />
            <Route path="/holds/:id" element={<HoldDetailPage />} />
            <Route path="/bookings" element={<BookingHubPage />} />
            <Route path="/bookings/new" element={<BookingWizardPage />} />
            <Route path="/wallet" element={<WalletHubPage />} />
            <Route path="/wallet/commission/:id" element={<CommissionDetailPage />} />
            <Route path="/team" element={<TeamHubPage />} />
            <Route path="/team/agent/:id" element={<AgentProfilePage />} />
            <Route path="/profile/security" element={<SecuritySettingsPage />} />
          </Routes>
            </div>{/* end app-content */}
          </div>{/* end screen-bezel */}
        </div>{/* end phone-frame */}
      </div>{/* end outer wrapper */}
    </BrowserRouter>
  )
}

export default App;

