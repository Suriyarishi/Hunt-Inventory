import { Outlet } from 'react-router-dom';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';

export function DashboardLayout() {
  return (
    <div className="flex flex-col h-full bg-background text-foreground overflow-hidden">
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
}

