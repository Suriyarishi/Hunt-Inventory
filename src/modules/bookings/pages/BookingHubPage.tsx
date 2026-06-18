import { useNavigate } from 'react-router-dom';
import { mockBookings } from '../constants/mockData';
import { FileSignature, Plus, ChevronRight, CheckCircle2, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function BookingHubPage() {
  const navigate = useNavigate();

  const activeBookings = mockBookings.filter(b => !['Confirmed', 'Rejected', 'Sold'].includes(b.status));
  const historyBookings = mockBookings.filter(b => ['Confirmed', 'Rejected', 'Sold'].includes(b.status));

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Confirmed': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'Sold': return <CheckCircle2 className="w-4 h-4 text-success" />;
      case 'Pending KYC': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'Under Review': return <Clock className="w-4 h-4 text-accent-blue" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Confirmed': return 'bg-success/10 text-success';
      case 'Sold': return 'bg-success/10 text-success';
      case 'Pending KYC': return 'bg-warning/10 text-warning';
      case 'Under Review': return 'bg-accent-blue/10 text-accent-blue';
      case 'Rejected': return 'bg-destructive/10 text-destructive';
      default: return 'bg-secondary text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-safe flex flex-col">
      <div className="p-4 bg-background z-20 sticky top-0 border-b border-border/50 flex items-center justify-between gap-2">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2 shrink-0" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2 flex-1">
           <FileSignature className="w-6 h-6 text-primary" /> Bookings
        </h1>
        <Button size="icon" className="rounded-full shadow-md w-10 h-10 shrink-0" onClick={() => navigate('/bookings/new')}>
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      <div className="p-4">
        <Tabs defaultValue="tracking" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-secondary/50 rounded-button p-1 h-12 mb-6">
            <TabsTrigger value="tracking" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">Active Pipeline</TabsTrigger>
            <TabsTrigger value="history" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs">History</TabsTrigger>
          </TabsList>

          {/* Tracking Tab */}
          <TabsContent value="tracking" className="space-y-4 animate-slide-up-fade">
            {activeBookings.map(booking => (
              <Card key={booking.id} className="p-4 rounded-card border-none shadow-xs bg-card">
                 <div className="flex justify-between items-start mb-3">
                   <div>
                     <h3 className="font-bold text-foreground text-lg">{booking.unitNumber}</h3>
                     <p className="text-xs text-muted-foreground">{booking.projectName}</p>
                   </div>
                   <Badge variant="secondary" className={`border-none flex items-center gap-1 ${getStatusColor(booking.status)}`}>
                     {getStatusIcon(booking.status)} {booking.status}
                   </Badge>
                 </div>
                 
                 <div className="flex justify-between items-center bg-secondary/50 p-3 rounded-lg mb-3">
                   <div>
                     <p className="text-xs text-muted-foreground">Applicant</p>
                     <p className="text-sm font-bold">{booking.primaryApplicant}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-muted-foreground">Value</p>
                     <p className="text-sm font-bold text-primary">{booking.totalValue}</p>
                   </div>
                 </div>

                 <Button
                  variant="ghost"
                  className="w-full justify-between h-10 text-xs font-semibold hover:bg-secondary/50"
                  onClick={() => navigate(`/bookings/${booking.id}`)}
                >
                    View Application <ChevronRight className="w-4 h-4" />
                 </Button>
              </Card>
            ))}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-4 animate-slide-up-fade">
            {historyBookings.map(booking => (
              <Card key={booking.id} className="p-4 rounded-card border-none shadow-xs bg-card opacity-80" onClick={() => navigate(`/bookings/${booking.id}`)}>
                 <div className="flex justify-between items-start mb-3">
                   <div>
                     <h3 className="font-bold text-foreground text-lg">{booking.unitNumber}</h3>
                     <p className="text-xs text-muted-foreground">{booking.projectName}</p>
                   </div>
                   <Badge variant="secondary" className={`border-none ${getStatusColor(booking.status)}`}>
                     {booking.status}
                   </Badge>
                 </div>
                 
                 <div className="flex justify-between items-center bg-secondary/50 p-3 rounded-lg">
                   <div>
                     <p className="text-xs text-muted-foreground">Applicant</p>
                     <p className="text-sm font-bold">{booking.primaryApplicant}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-muted-foreground">Closed On</p>
                     <p className="text-sm font-bold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                   </div>
                 </div>
              </Card>
            ))}
          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}
