import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className="h-full bg-background font-sans antialiased text-foreground relative overflow-hidden flex flex-col">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-primary-light/40 to-transparent pointer-events-none" />
      
      {/* Main Content Area without Bottom Nav */}
      <main className="relative z-10 w-full flex-1 flex flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

