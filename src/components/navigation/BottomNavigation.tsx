import { NavLink, useLocation } from 'react-router-dom';
import { Home, Building, Lock, BadgeCheck, User } from 'lucide-react';
import { cn } from '@/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/dashboard' },
  { icon: Building, label: 'Projects', path: '/inventory' },
  { icon: Lock, label: 'Holds', path: '/holds' },
  { icon: BadgeCheck, label: 'Sold', path: '/sold' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNavigation() {
  const location = useLocation();
  
  return (
    <div 
      className="relative z-50 bg-background border-t border-border/50 shrink-0"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <nav className="flex justify-around items-center px-2 py-3 h-20">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1.5 min-w-[4rem]"
            >
              <div 
                className={cn(
                  "flex items-center justify-center transition-all duration-300 ease-out",
                  isActive 
                    ? "bg-primary/20 text-primary px-5 py-1.5 rounded-full" 
                    : "bg-transparent text-muted-foreground px-5 py-1.5 hover:text-foreground hover:bg-secondary/50 rounded-full"
                )}
              >
                <Icon className="w-6 h-6" strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span 
                className={cn(
                  "text-[11px] font-medium tracking-wide transition-colors duration-300",
                  isActive ? "text-primary font-bold" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
