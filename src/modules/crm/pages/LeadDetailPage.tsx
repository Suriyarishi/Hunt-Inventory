import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockLeads, mockActivities, mockFollowups } from '../constants/mockData';
import { ArrowLeft, Phone, Mail, MapPin, Briefcase, Calendar, Plus, MoreVertical, Edit, PhoneCall } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { LeadActionSheet } from '../components/LeadActionSheet';

export default function LeadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [actionSheetOpen, setActionSheetOpen] = useState(false);
  
  const lead = mockLeads.find(l => l.id === id) || mockLeads[0];
  const activities = mockActivities[lead.id] || [];
  const followups = mockFollowups[lead.id] || [];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success border-success';
    if (score >= 50) return 'text-warning border-warning';
    return 'text-destructive border-destructive';
  };

  return (
    <div className="min-h-screen bg-background pb-24 flex flex-col pt-safe">
      {/* Header */}
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex gap-2">
           <Button variant="ghost" size="icon" className="rounded-full">
             <Edit className="w-4 h-4" />
           </Button>
           <Button variant="ghost" size="icon" className="rounded-full">
             <MoreVertical className="w-4 h-4" />
           </Button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="px-6 py-4 animate-slide-up-fade">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl">
              {lead.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-1">{lead.name}</h1>
              <Badge variant="secondary" className="bg-secondary text-muted-foreground border-none font-medium text-[10px]">
                {lead.stage}
              </Badge>
            </div>
          </div>
          
          {/* Lead Scoring Widget */}
          <div className="flex flex-col items-center">
            <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center ${getScoreColor(lead.score)} bg-background shadow-xs`}>
              <span className="text-lg font-bold">{lead.score}</span>
            </div>
            <span className="text-[10px] font-semibold text-muted-foreground mt-1 uppercase tracking-wider">Score</span>
          </div>
        </div>

        {/* Quick Contacts */}
        <div className="flex gap-3 mb-6">
          <Button className="flex-1 rounded-button shadow-md gap-2 h-12">
            <PhoneCall className="w-4 h-4" /> Call
          </Button>
          <Button variant="secondary" className="flex-1 rounded-button border-none shadow-xs gap-2 h-12">
            <Mail className="w-4 h-4" /> Email
          </Button>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/50 rounded-button p-1">
            <TabsTrigger value="overview" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs">Overview</TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs">Timeline</TabsTrigger>
            <TabsTrigger value="followups" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs relative">
              Tasks
              {followups.filter(f => !f.completed).length > 0 && (
                <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-destructive" />
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="py-6 space-y-4 animate-slide-up-fade">
            <Card className="p-4 rounded-card border-none shadow-xs space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Lead Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{lead.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{lead.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Budget: {lead.budget}</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <span className="text-sm font-medium text-foreground leading-tight">Prefers: {lead.preferredLocations.join(', ')}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4 rounded-card border-none shadow-xs bg-primary/5 border border-primary/10">
               <div className="flex justify-between items-center mb-2">
                 <h3 className="font-semibold text-sm text-foreground">Assigned To</h3>
                 <span className="text-xs font-bold text-primary cursor-pointer hover:underline" onClick={() => setActionSheetOpen(true)}>Change</span>
               </div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                   {lead.assignedTo.charAt(0)}
                 </div>
                 <span className="text-sm font-semibold">{lead.assignedTo}</span>
               </div>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="py-6 animate-slide-up-fade">
            <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-border/50">
              {activities.map((act, i) => (
                <div key={i} className="relative flex items-start gap-4 z-10">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-background bg-secondary text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div className="pt-1 w-full pr-4">
                    <h4 className="text-sm font-bold text-foreground">{act.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 bg-card p-2 rounded-md border border-border/50 shadow-xs leading-relaxed">{act.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-medium">{new Date(act.timestamp).toLocaleString()} • {act.performedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="followups" className="py-6 animate-slide-up-fade space-y-4">
            <div className="flex justify-between items-center mb-2">
               <h3 className="font-semibold text-sm text-foreground">Pending Tasks</h3>
               <Button variant="ghost" size="sm" className="h-8 gap-1 text-primary hover:bg-primary/10">
                 <Plus className="w-4 h-4" /> Add Task
               </Button>
            </div>
            
            <div className="space-y-3">
              {followups.map((task, i) => (
                <Card key={i} className={`p-3 rounded-card border-none flex items-start gap-3 transition-all ${task.completed ? 'opacity-50 bg-secondary' : 'bg-card shadow-xs hover:shadow-sm cursor-pointer'}`}>
                  <div className={`w-5 h-5 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${task.completed ? 'bg-primary border-primary' : 'border-muted-foreground/30'}`}>
                     {task.completed && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <div>
                    <h4 className={`text-sm font-semibold ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>{task.title}</h4>
                    <p className="text-[10px] text-warning font-bold mt-1 uppercase tracking-wider">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </Card>
              ))}
              {followups.length === 0 && (
                <div className="text-center p-8 text-muted-foreground text-sm">No followups scheduled.</div>
              )}
            </div>
          </TabsContent>

        </Tabs>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t border-border/50 z-40 max-w-md mx-auto" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}>
        <Button 
          className="w-full h-14 rounded-button text-lg font-bold shadow-lg"
          onClick={() => setActionSheetOpen(true)}
        >
          Update Status / Assign
        </Button>
      </div>

      <LeadActionSheet open={actionSheetOpen} onOpenChange={setActionSheetOpen} lead={lead} />
    </div>
  );
}
