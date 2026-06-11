import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ShieldCheck } from 'lucide-react';

export function TasksTab() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Selfie Identity Verification', category: 'KYC Onboarding', priority: 'High', completed: false, description: 'Required by Stripe Identity verification to unlock withdrawals.' },
    { id: 2, text: 'Upload RERA Broker License', category: 'Compliance', priority: 'High', completed: false, description: 'Upload copy of state RERA registration certificate.' },
    { id: 3, text: 'Verify Bank Account Details', category: 'Payout Setup', priority: 'Medium', completed: true, description: 'Sign agreement sheet for auto-settlement.' },
    { id: 4, text: 'Verify PAN Card Number', category: 'Tax Setup', priority: 'Medium', completed: true, description: 'Government PAN details for TDS compliance.' },
    { id: 5, text: 'Sign CP Master Agreement', category: 'Legal', priority: 'Low', completed: true, description: 'Sign the digitally integrated broker contract.' }
  ]);

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  const toggleTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-danger/10 text-danger border-none';
      case 'Medium': return 'bg-warning/10 text-warning border-none';
      default: return 'bg-slate-100 text-slate-600 border-none';
    }
  };

  return (
    <div className="space-y-6 animate-slide-up-fade">
      
      {/* Onboarding Goal progress */}
      <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">KYC Compliance Status</h4>
            <h3 className="text-base font-bold text-foreground mt-0.5">Onboarding Progress</h3>
          </div>
          <ShieldCheck className="w-6 h-6 text-primary" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-bold text-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-primary" /> {completedCount} of {tasks.length} Completed
            </span>
            <span className="text-primary">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} className="h-2 bg-secondary [&>div]:bg-primary transition-all duration-300" />
          <p className="text-[10px] text-muted-foreground pt-1">
            {progressPercent === 100 
              ? '🎉 All onboarding credentials verified! Account is fully active.' 
              : 'Complete remaining KYC tasks to unlock wallet payouts.'}
          </p>
        </div>
      </Card>

      {/* Task Checklist */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">My Tasks</h3>
        <div className="space-y-3">
          {tasks.map((task) => (
            <Card 
              key={task.id} 
              className={`p-4 rounded-card border-none shadow-xs transition-all duration-200 ${
                task.completed ? 'opacity-75 bg-slate-50/50' : 'bg-card'
              }`}
            >
              <div className="flex items-start gap-3">
                <Checkbox 
                  id={`task-${task.id}`}
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="mt-0.5 rounded-md border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <label 
                      htmlFor={`task-${task.id}`}
                      className={`text-xs font-bold leading-none cursor-pointer ${
                        task.completed ? 'line-through text-muted-foreground' : 'text-foreground'
                      }`}
                    >
                      {task.text}
                    </label>
                    <Badge className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </Badge>
                  </div>
                  
                  <span className="text-[9px] font-bold text-primary block">{task.category}</span>
                  <p className="text-[10px] text-muted-foreground leading-normal mt-1">
                    {task.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
}
