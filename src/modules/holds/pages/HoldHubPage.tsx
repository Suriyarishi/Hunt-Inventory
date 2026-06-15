import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockHolds, mockHoldAnalytics, mockHoldNotifications } from '../constants/mockData';
import {
  Lock, Plus, BarChart3, Clock, Bell, ChevronRight,
  TrendingUp, AlertTriangle, Users, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { HoldCard } from '../components/HoldCard';

export default function HoldHubPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');

  const activeHolds   = mockHolds.filter(h => h.status === 'Active');
  const expiringHolds = mockHolds.filter(h => h.status === 'Expiring');
  const allLiveHolds  = mockHolds.filter(h => ['Active', 'Expiring', 'Extended'].includes(h.status));
  const unreadCount   = mockHoldNotifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-background pb-28 flex flex-col">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 bg-background z-20 sticky top-0 border-b border-border/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-none font-headings">Hold Management</h1>
              <p className="text-[11px] text-muted-foreground mt-0.5">{allLiveHolds.length} active holds</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost" size="icon"
              className="relative rounded-full w-10 h-10 hover:bg-secondary/80"
              onClick={() => navigate('/holds/notifications')}
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-warning rounded-full text-[9px] font-bold text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
            <Button
              size="icon"
              className="rounded-full shadow-md w-10 h-10 shrink-0 bg-primary hover:bg-primary/90"
              onClick={() => navigate('/holds/new')}
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* KPI Bar */}
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Active', value: mockHoldAnalytics.activeHolds, color: 'text-primary', bg: 'bg-primary/10', route: '/holds/active' },
            { label: 'Expiring', value: mockHoldAnalytics.expiringHolds, color: 'text-warning', bg: 'bg-warning/10', route: '/holds/expiring' },
            { label: 'Converted', value: mockHoldAnalytics.convertedHolds, color: 'text-emerald-600', bg: 'bg-emerald-50', route: '/holds/history' },
            { label: 'Waitlist', value: mockHoldAnalytics.waitlistCount, color: 'text-purple-600', bg: 'bg-purple-50', route: '/holds/waitlist' },
          ].map(kpi => (
            <button
              key={kpi.label}
              className={`flex flex-col items-center p-2.5 rounded-xl ${kpi.bg} transition-all active:scale-95`}
              onClick={() => navigate(kpi.route)}
            >
              <span className={`text-xl font-bold leading-none ${kpi.color} font-headings`}>{kpi.value}</span>
              <span className="text-[10px] text-muted-foreground mt-1 font-medium">{kpi.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-4">
        {/* Expiring Banner — Goal Gradient Effect */}
        {expiringHolds.length > 0 && (
          <button
            className="w-full flex items-center gap-3 p-3.5 mb-4 bg-warning/10 border border-warning/20 rounded-2xl text-left active:scale-[0.99] transition-all"
            onClick={() => navigate('/holds/expiring')}
          >
            <div className="w-9 h-9 bg-warning/20 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-warning">{expiringHolds.length} hold{expiringHolds.length > 1 ? 's' : ''} expiring soon</p>
              <p className="text-xs text-muted-foreground">Tap to review and extend</p>
            </div>
            <ChevronRight className="w-4 h-4 text-warning shrink-0" />
          </button>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-secondary/60 rounded-2xl p-1 h-11 mb-5">
            <TabsTrigger value="active" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs font-semibold">
              Active {activeHolds.length > 0 && <span className="ml-1 w-4 h-4 rounded-full bg-primary/20 text-primary text-[10px] font-bold inline-flex items-center justify-center">{activeHolds.length}</span>}
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs font-semibold">All Holds</TabsTrigger>
            <TabsTrigger value="quick" className="rounded-xl data-[state=active]:bg-card data-[state=active]:shadow-xs text-xs font-semibold">Quick Actions</TabsTrigger>
          </TabsList>

          {/* Active Tab */}
          <TabsContent value="active" className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            {activeHolds.length === 0 ? (
              <div className="text-center py-12">
                <Lock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm font-semibold text-muted-foreground">No active holds</p>
                <p className="text-xs text-muted-foreground/70 mt-1">Create a hold to get started</p>
                <Button className="mt-4 rounded-button h-11 font-bold" onClick={() => navigate('/holds/new')}>
                  <Plus className="w-4 h-4 mr-1.5" /> Create First Hold
                </Button>
              </div>
            ) : (
              activeHolds.map(hold => <HoldCard key={hold.id} hold={hold} />)
            )}
          </TabsContent>

          {/* All Holds Tab */}
          <TabsContent value="all" className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            {mockHolds.map(hold => <HoldCard key={hold.id} hold={hold} />)}
            <button
              className="w-full flex items-center justify-center gap-2 py-4 text-sm font-semibold text-primary"
              onClick={() => navigate('/holds/history')}
            >
              <Clock className="w-4 h-4" /> View Full History
            </button>
          </TabsContent>

          {/* Quick Actions Tab — Hick's Law: grouped actions */}
          <TabsContent value="quick" className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: Plus, label: 'New Hold', sub: 'Create a hold', route: '/holds/new', accent: 'bg-primary/10 text-primary' },
                { icon: AlertTriangle, label: 'Expiring', sub: `${expiringHolds.length} critical`, route: '/holds/expiring', accent: 'bg-warning/10 text-warning' },
                { icon: Users, label: 'Waitlist', sub: `${mockHoldAnalytics.waitlistCount} waiting`, route: '/holds/waitlist', accent: 'bg-purple-50 text-purple-600' },
                { icon: BarChart3, label: 'Analytics', sub: `${mockHoldAnalytics.conversionRate}% rate`, route: '/holds/analytics', accent: 'bg-emerald-50 text-emerald-600' },
                { icon: Clock, label: 'History', sub: 'Full audit trail', route: '/holds/history', accent: 'bg-blue-50 text-blue-600' },
                { icon: TrendingUp, label: 'Converted', sub: `${mockHoldAnalytics.convertedHolds} bookings`, route: '/holds/history', accent: 'bg-emerald-50 text-emerald-700' },
              ].map(action => {
                const Icon = action.icon;
                return (
                  <Card
                    key={action.label}
                    className="p-4 rounded-card border-none shadow-xs cursor-pointer hover:shadow-md active:scale-[0.98] transition-all bg-card"
                    onClick={() => navigate(action.route)}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${action.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-sm text-foreground leading-none">{action.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">{action.sub}</p>
                  </Card>
                );
              })}
            </div>

            {/* Revenue at Risk */}
            <Card className="p-4 rounded-card border border-warning/20 shadow-xs bg-warning/5">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-warning" />
                <span className="text-xs font-bold text-warning uppercase tracking-wider">Revenue at Risk</span>
              </div>
              <p className="text-2xl font-bold text-foreground font-headings">{mockHoldAnalytics.revenueAtRisk}</p>
              <p className="text-xs text-muted-foreground mt-1">Across {mockHoldAnalytics.activeHolds + mockHoldAnalytics.expiringHolds} live holds</p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
