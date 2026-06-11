import { useNavigate } from 'react-router-dom';
import { mockAchievements } from '../constants/mockData';
import { User, ShieldCheck, Trophy, Users, Star, ChevronRight, LogOut, Bell, FileText, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export default function ProfileHubPage() {
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Users': return <Users className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      default: return <Trophy className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent pointer-events-none" />

      <div className="p-4 z-20 sticky top-0 bg-background/50 backdrop-blur-md border-b border-border/50">
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
           <User className="w-6 h-6 text-primary" /> Profile
        </h1>
      </div>

      <div className="p-4 relative z-10 space-y-6">
        
        {/* Profile Hero Header */}
        <div className="flex flex-col items-center text-center">
           <div className="relative mb-4">
             <img src="https://api.dicebear.com/7.x/notionists/svg?seed=Admin" alt="User" className="w-28 h-28 rounded-full bg-secondary border-4 border-background shadow-lg" />
             {/* Trust Score Dial overlay */}
             <div className="absolute -bottom-2 -right-2 bg-background rounded-full p-1 shadow-md">
                <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center border-2 border-background">
                  <span className="text-[10px] font-bold text-success-foreground">98%</span>
                </div>
             </div>
           </div>
           <h2 className="text-2xl font-bold">Arjun Mehta</h2>
           <p className="text-muted-foreground flex items-center justify-center gap-1">
             <ShieldCheck className="w-4 h-4 text-success" /> KYC Verified Agent
           </p>
        </div>

        {/* Achievements Horizontal Scroll */}
        <div>
           <div className="flex justify-between items-end mb-3">
             <h3 className="font-bold text-sm text-foreground">Achievements</h3>
           </div>
           <ScrollArea className="w-full whitespace-nowrap -mx-4 px-4 pb-2">
             <div className="flex gap-3">
               {mockAchievements.map((ach) => (
                 <Card key={ach.id} className="w-32 p-4 shrink-0 rounded-card border-none shadow-xs bg-card flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${ach.color}`}>
                      {getIcon(ach.icon)}
                    </div>
                    <h4 className="text-[11px] font-bold whitespace-normal leading-tight">{ach.title}</h4>
                 </Card>
               ))}
             </div>
             <ScrollBar orientation="horizontal" className="hidden" />
           </ScrollArea>
        </div>

        {/* Settings Menu Lists */}
        <div className="space-y-4">
           
           {/* Account Settings */}
           <Card className="rounded-card border-none shadow-xs bg-card overflow-hidden">
             <div className="p-3 border-b border-border/50 bg-secondary/20">
               <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-2">Account</span>
             </div>
             <div className="flex flex-col">
               <button className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border/50 text-left">
                  <div className="flex items-center gap-3">
                     <User className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold text-sm">Personal Details</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
               </button>
               <button className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left" onClick={() => navigate('/profile/security')}>
                  <div className="flex items-center gap-3">
                     <Lock className="w-5 h-5 text-primary" />
                     <span className="font-semibold text-sm text-primary">Security & Audit</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
               </button>
             </div>
           </Card>

           {/* Preferences */}
           <Card className="rounded-card border-none shadow-xs bg-card overflow-hidden">
             <div className="p-3 border-b border-border/50 bg-secondary/20">
               <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-2">Preferences</span>
             </div>
             <div className="flex flex-col">
               <button className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors border-b border-border/50 text-left" onClick={() => navigate('/notifications')}>
                  <div className="flex items-center gap-3">
                     <Bell className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold text-sm">Notification Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
               </button>
               <button className="flex items-center justify-between p-4 hover:bg-secondary/50 transition-colors text-left">
                  <div className="flex items-center gap-3">
                     <FileText className="w-5 h-5 text-muted-foreground" />
                     <span className="font-semibold text-sm">Terms & Privacy Policy</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
               </button>
             </div>
           </Card>

           <Button variant="outline" className="w-full h-14 rounded-button text-destructive border-destructive/30 hover:bg-destructive/10 font-bold text-lg shadow-sm gap-2 mt-4" onClick={() => navigate('/auth/welcome')}>
              <LogOut className="w-5 h-5" /> Log Out
           </Button>

        </div>

      </div>

    </div>
  );
}
