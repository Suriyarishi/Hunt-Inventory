import { FolderOpen } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[300px] animate-slide-up-fade">
      <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-muted-foreground">
        {icon || <FolderOpen className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-xs">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="rounded-button px-6 shadow-md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
