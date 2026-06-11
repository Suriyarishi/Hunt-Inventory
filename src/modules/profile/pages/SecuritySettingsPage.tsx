import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDevices, mockAuditLogs } from '../constants/mockData';
import { ArrowLeft, Fingerprint, Smartphone, AlertTriangle, Monitor, ShieldAlert, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function SecuritySettingsPage() {
  const navigate = useNavigate();

  const [biometrics, setBiometrics] = useState({
    login: true,
    transactions: true
  });

  const getDeviceIcon = (os: string) => {
    switch (os) {
      case 'iOS': 
      case 'Android': return <Smartphone className="w-5 h-5 text-muted-foreground" />;
      default: return <Monitor className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getLogColor = (status: string) => {
    switch(status) {
      case 'Success': return 'text-success bg-success/10 border-success/20';
      case 'Failed': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'Warning': return 'text-warning bg-warning/10 border-warning/20';
      default: return 'text-muted-foreground bg-secondary border-border/50';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32 pt-safe flex flex-col">
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold">Security & Audit</h1>
        <div className="w-9" />
      </div>

      <div className="p-4 animate-slide-up-fade space-y-6">
        
        {/* Biometric Policies */}
        <Card className="p-4 rounded-card border border-border/50 bg-card space-y-4 shadow-sm">
           <div className="flex items-center gap-2 pb-2 border-b border-border/50">
             <Fingerprint className="w-5 h-5 text-primary" />
             <h3 className="font-bold text-sm">Biometric Authentication</h3>
           </div>
           
           <div className="space-y-4">
              <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-semibold">Require for Login</p>
                   <p className="text-[10px] text-muted-foreground">Use Face ID / Touch ID to open the app.</p>
                 </div>
                 <Switch 
                   checked={biometrics.login}
                   onCheckedChange={(c) => setBiometrics(p => ({...p, login: c}))}
                 />
              </div>
              
              <div className="flex items-center justify-between">
                 <div>
                   <p className="text-sm font-semibold text-warning flex items-center gap-1">High-Value Actions <AlertTriangle className="w-3 h-3" /></p>
                   <p className="text-[10px] text-muted-foreground">Require biometrics before withdrawing wallet funds.</p>
                 </div>
                 <Switch 
                   checked={biometrics.transactions}
                   onCheckedChange={(c) => setBiometrics(p => ({...p, transactions: c}))}
                 />
              </div>
           </div>
        </Card>

        {/* Audit & Devices Tabs */}
        <Tabs defaultValue="devices" className="w-full mt-2">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-button p-1 h-12 mb-4">
            <TabsTrigger value="devices" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Active Devices</TabsTrigger>
            <TabsTrigger value="audit" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Audit Logs</TabsTrigger>
          </TabsList>

          {/* Connected Devices Tab */}
          <TabsContent value="devices" className="space-y-3 animate-slide-up-fade">
             <p className="text-xs text-muted-foreground mb-3 px-1">Review devices currently signed in to your account. Revoke access to unfamiliar sessions.</p>
             
             {mockDevices.map(device => (
               <Card key={device.id} className="p-4 rounded-card border-none shadow-xs bg-card flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                       {getDeviceIcon(device.os)}
                     </div>
                     <div>
                       <h4 className="text-sm font-bold flex items-center gap-2">
                         {device.deviceName}
                         {device.isCurrent && <span className="text-[9px] uppercase tracking-wider bg-success/20 text-success px-1.5 py-0.5 rounded-sm">This Device</span>}
                       </h4>
                       <p className="text-xs text-muted-foreground mt-0.5">{device.location} • {new Date(device.lastActive).toLocaleDateString()}</p>
                     </div>
                  </div>
                  
                  {!device.isCurrent && (
                     <Button variant="ghost" size="sm" className="text-destructive text-xs hover:bg-destructive/10 hover:text-destructive h-8 px-2">
                       Revoke
                     </Button>
                  )}
               </Card>
             ))}
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit" className="space-y-3 animate-slide-up-fade">
             <div className="flex items-center justify-between mb-3 px-1">
               <p className="text-xs text-muted-foreground flex items-center gap-1"><History className="w-3 h-3" /> Last 30 Days</p>
               <Button variant="ghost" size="sm" className="h-6 text-[10px] text-primary px-2">Download CSV</Button>
             </div>

             <div className="space-y-3">
               {mockAuditLogs.map((log) => (
                 <div key={log.id} className={`p-3 rounded-card border ${getLogColor(log.status)}`}>
                    <div className="flex justify-between items-start mb-1">
                       <h4 className="text-sm font-bold">{log.action}</h4>
                       <span className="text-[10px] uppercase font-bold tracking-wider">{log.status}</span>
                    </div>
                    <div className="flex justify-between items-center opacity-80">
                       <span className="text-xs font-mono">{log.ipAddress}</span>
                       <span className="text-[10px]">{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                 </div>
               ))}
             </div>
             
             <Card className="p-4 mt-6 rounded-card border-none bg-destructive/10 text-destructive flex items-center gap-3">
                <ShieldAlert className="w-8 h-8 shrink-0" />
                <p className="text-xs font-semibold leading-relaxed">If you don't recognize an action in this log, immediately revoke unknown devices and contact IT support.</p>
             </Card>

          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}
