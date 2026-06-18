import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  mockSoldAnalytics,
  mockProjectPerformance,
  mockBuilderPerformance
} from '../constants/mockData';
import {
  ArrowLeft,
  TrendingUp,
  Building,
  Award,
  FileSpreadsheet,
  Download,
  Sparkles,
  Zap,
  Share2,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function SoldAnalyticsPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'revenue' | 'insights' | 'builders' | 'projects' | 'reports'>('revenue');
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  const handleDownload = (reportName: string) => {
    setDownloadingReport(reportName);
    setTimeout(() => {
      setDownloadingReport(null);
      toast.success(`${reportName} downloaded successfully!`, {
        description: 'Saved to device storage in Downloads/Hunt_Reports',
        duration: 3000
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-28 flex flex-col font-sans">
      {/* ── Header ── */}
      <div className="sticky top-0 z-20 bg-background border-b border-border/50 px-4 pt-4 pb-3 flex items-center justify-between gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-secondary/60 -ml-2 shrink-0 h-10 w-10"
          onClick={() => navigate('/sold')}
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Button>
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-bold text-foreground font-headings">Revenue & Performance</h1>
          <p className="text-[10px] text-muted-foreground">Hunt Inventory Enterprise Analytics</p>
        </div>
        <Share2 className="w-4 h-4 text-muted-foreground mr-1 cursor-pointer hover:text-foreground shrink-0" />
      </div>

      {/* ── Sub Navigation Tabs (Miller's Law) ── */}
      <div className="flex gap-2 overflow-x-auto px-4 pb-2 select-none scrollbar-none border-b border-border/30">
        {[
          { id: 'revenue', label: 'Revenue Trends', icon: TrendingUp },
          { id: 'insights', label: 'Sales Insights', icon: Sparkles },
          { id: 'builders', label: 'Builders Rank', icon: Award },
          { id: 'projects', label: 'Project Stats', icon: Building },
          { id: 'reports', label: 'Reports Center', icon: FileSpreadsheet }
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                activeTab === tab.id
                  ? 'bg-primary/10 border-primary/20 text-primary'
                  : 'bg-card border-border/40 text-muted-foreground hover:bg-secondary/40'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Content View ── */}
      <div className="p-4 flex-1">
        {/* 1. REVENUE ANALYTICS */}
        {activeTab === 'revenue' && (
          <div className="space-y-4 animate-slide-up-fade">
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-3.5 bg-card border-none shadow-xs rounded-card">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Total Sales Value</span>
                <p className="text-base font-bold text-foreground font-headings mt-1">{mockSoldAnalytics.totalSalesValue}</p>
                <span className="text-[9px] text-success font-semibold mt-1 block">↑ +14.2% MoM</span>
              </Card>
              <Card className="p-3.5 bg-card border-none shadow-xs rounded-card">
                <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider block">Avg Deal Size</span>
                <p className="text-base font-bold text-foreground font-headings mt-1">{mockSoldAnalytics.avgDealSize}</p>
                <span className="text-[9px] text-muted-foreground mt-1 block">Across active segments</span>
              </Card>
            </div>

            {/* Custom SVG Mini Bar Chart (Progressive Disclosure / Jakob's Law) */}
            <Card className="p-4 bg-card border-none shadow-xs rounded-card space-y-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wide block">Monthly Revenue Trend (₹ Cr)</span>
              
              <div className="h-32 flex items-end justify-between pt-4 border-b border-border/60 pb-1">
                {mockSoldAnalytics.monthlyTrend.map(trend => {
                  const maxRev = Math.max(...mockSoldAnalytics.monthlyTrend.map(t => t.revenue));
                  const barHeight = (trend.revenue / maxRev) * 100;
                  return (
                    <div key={trend.month} className="flex flex-col items-center flex-1 group">
                      <div className="text-[9px] font-bold text-primary mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {trend.revenue.toFixed(1)}
                      </div>
                      <div
                        className="w-5 bg-primary/20 hover:bg-primary rounded-t-sm transition-all duration-300 relative cursor-pointer"
                        style={{ height: `${barHeight}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-primary/30 rounded-t-sm" />
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1.5 font-medium">{trend.month}</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>Actual Revenue</span>
                </div>
                <span>Target MoM: +10%</span>
              </div>
            </Card>
          </div>
        )}

        {/* 2. SALES INSIGHTS */}
        {activeTab === 'insights' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">AI Generated Sales Insights</h3>
            
            <div className="space-y-3">
              {mockSoldAnalytics.insights.map((insight, idx) => (
                <Card key={idx} className="p-4 bg-card border-none shadow-xs rounded-card flex gap-3.5 items-start">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-foreground">{insight.title}</h4>
                    <p className="text-[11px] text-muted-foreground mt-1.5 leading-relaxed">{insight.text}</p>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-3.5 bg-gradient-to-tr from-primary/10 to-accent-blue/10 border border-primary/20 rounded-card flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-primary uppercase tracking-wide">Optimization Tip</span>
                <p className="text-xs text-foreground font-semibold mt-1">Deploy waitlisted buyers to pending units</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Increases conversions by up to 18%.</p>
              </div>
              <Button size="icon" className="rounded-full w-8 h-8 bg-primary">
                <ChevronRight className="w-4 h-4 text-white" />
              </Button>
            </Card>
          </div>
        )}

        {/* 3. BUILDER PERFORMANCE */}
        {activeTab === 'builders' && (
          <div className="space-y-3 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Builder Partners Leaderboard</h3>
            {mockBuilderPerformance.map((builder, idx) => (
              <Card key={builder.name} className="p-3.5 bg-card border-none shadow-xs rounded-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-headings font-bold text-sm text-muted-foreground/60 w-4">#{idx + 1}</span>
                  <div>
                    <h4 className="font-bold text-xs text-foreground">{builder.name}</h4>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{builder.projects} Projects active · Rating: {builder.rating} ★</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs text-primary">{builder.volume}</p>
                  <p className="text-[9px] text-muted-foreground mt-0.5">{builder.deals} closed sales</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* 4. PROJECT PERFORMANCE */}
        {activeTab === 'projects' && (
          <div className="space-y-4 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Absorption & Velocity Metrics</h3>
            <div className="space-y-3">
              {mockProjectPerformance.map((project) => (
                <Card key={project.name} className="p-3.5 bg-card border-none shadow-xs rounded-card space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-foreground">{project.name}</h4>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{project.deals} units sold this quarter</p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-primary">{project.volume}</span>
                      <span className="text-[9px] text-success font-semibold block mt-0.5">{project.growth}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                      <span>Absorption Rate</span>
                      <span className="font-bold text-foreground">{project.absorption}</span>
                    </div>
                    <Progress value={parseInt(project.absorption)} className="h-1.5 bg-secondary" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 5. REPORTS CENTER */}
        {activeTab === 'reports' && (
          <div className="space-y-3 animate-slide-up-fade">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Download Audited Registers</h3>
            {[
              { id: 'brokerage', name: 'Q2 Brokerage & Payout Ledger', desc: 'Summary of released and pending commission payouts.', type: 'CSV' },
              { id: 'registration', name: 'Properties Registry Audit File', desc: 'Complete buyer information, RERA details, and registration dates.', type: 'PDF' },
              { id: 'revenue', name: 'Consolidated Sales & Revenue Report', desc: 'Includes individual agent earnings, target offsets, and projections.', type: 'PDF' }
            ].map(report => (
              <Card key={report.id} className="p-4 bg-card border-none shadow-xs rounded-card flex justify-between items-center gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-xs text-foreground truncate">{report.name}</h4>
                    <Badge variant="secondary" className="bg-secondary text-muted-foreground border-none text-[9px] px-1 py-0">{report.type}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-1.5 leading-relaxed">{report.desc}</p>
                </div>
                <Button
                  size="icon"
                  className="rounded-full shrink-0 bg-primary/10 hover:bg-primary/20 text-primary w-9 h-9 active:scale-95 transition-all"
                  onClick={() => handleDownload(report.name)}
                  disabled={downloadingReport !== null}
                >
                  <Download className={`w-4.5 h-4.5 ${downloadingReport === report.name ? 'animate-bounce' : ''}`} />
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
