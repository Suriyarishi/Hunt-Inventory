import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function GreetingHeader() {
  return (
    <div className="flex items-center justify-between p-6 pb-2 animate-slide-up-fade">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 ring-2 ring-primary/20 ring-offset-2 ring-offset-background shadow-sm">
          <AvatarImage src="https://i.pravatar.cc/150?img=11" alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-sm font-medium text-muted-foreground">Good Morning,</h2>
          <h1 className="text-xl font-bold tracking-tight text-foreground">John Doe</h1>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full bg-secondary/50 text-foreground hover:bg-secondary">
        <Bell className="h-5 w-5" />
      </Button>
    </div>
  );
}
