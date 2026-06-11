import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/utils';

/**
 * BottomSheet — a fully in-frame bottom drawer.
 * Uses React Portal to render inside the bezel-portal-root z-100 container
 * so it overlays the bottom navigation bar and status bar cleanly.
 */
interface BottomSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  /** Height of the drawer, e.g. "85%" or "auto". Defaults to "85%" */
  height?: string;
  className?: string;
}

export function BottomSheet({ open, onOpenChange, title, children, height = '85%', className }: BottomSheetProps) {
  // Lock background scroll when open
  useEffect(() => {
    return () => {};
  }, [open]);

  const portalRoot = document.getElementById('bezel-portal-root');

  const content = (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300',
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer panel */}
      <div
        className={cn(
          'absolute bottom-0 left-0 right-0 z-50 bg-background flex flex-col transition-transform duration-300 ease-out',
          'rounded-t-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.15)]',
          open ? 'translate-y-0' : 'translate-y-full',
          className
        )}
        style={{ height }}
      >
        {/* Handle bar */}
        <div className="flex flex-col items-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border" />
        </div>

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between px-5 py-3 flex-shrink-0">
            <h2 className="text-xl font-bold text-foreground">{title}</h2>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:bg-secondary transition-colors"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6">
          {children}
        </div>
      </div>
    </>
  );

  if (!portalRoot) {
    return content;
  }

  return createPortal(content, portalRoot);
}
