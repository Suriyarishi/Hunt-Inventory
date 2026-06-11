import { useParams, useNavigate } from 'react-router-dom';
import { mockClients, mockBookings, mockDocuments, mockTimeline } from '../constants/mockData';
import { ArrowLeft, Phone, Mail, MapPin, Calendar, TrendingUp, FileText, Download, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ClientProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const client = mockClients.find(c => c.id === id) || mockClients[0];
  const bookings = mockBookings[client.id] || [];
  const documents = mockDocuments[client.id] || [];
  const timeline = mockTimeline[client.id] || [];

  return (
    <div className="min-h-screen bg-background pb-24 flex flex-col pt-safe">
      {/* Header */}
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold">360° Profile</h1>
        <div className="w-9" /> {/* Spacer */}
      </div>

      {/* Profile Header */}
      <div className="px-6 py-6 animate-slide-up-fade bg-gradient-to-b from-primary/5 to-background">
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl mb-4 border-4 border-background shadow-md">
            {client.name.charAt(0)}
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{client.name}</h1>
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 mb-3">
             <MapPin className="w-4 h-4" /> {client.preferredLocations[0] || 'Unknown'}
          </p>
          <div className="flex gap-2">
             <Button size="icon" className="rounded-full shadow-md w-12 h-12">
               <Phone className="w-5 h-5" />
             </Button>
             <Button variant="secondary" size="icon" className="rounded-full shadow-xs w-12 h-12 bg-card">
               <MessageCircle className="w-5 h-5 text-green-600" />
             </Button>
             <Button variant="secondary" size="icon" className="rounded-full shadow-xs w-12 h-12 bg-card">
               <Mail className="w-5 h-5 text-accent-blue" />
             </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50 rounded-button p-1 h-12">
            <TabsTrigger value="overview" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Overview</TabsTrigger>
            <TabsTrigger value="portfolio" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Portfolio</TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Timeline</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Docs</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="py-6 space-y-4 animate-slide-up-fade">
            <div className="grid grid-cols-2 gap-3">
               <Card className="p-4 rounded-card border-none shadow-xs bg-primary/10">
                 <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
                 <p className="text-xl font-bold text-primary">{client.totalInvested}</p>
               </Card>
               <Card className="p-4 rounded-card border-none shadow-xs bg-success/10">
                 <p className="text-xs text-muted-foreground mb-1">Portfolio ROI</p>
                 <p className="text-xl font-bold text-success flex items-center gap-1">
                   <TrendingUp className="w-4 h-4" /> {client.roi}
                 </p>
               </Card>
            </div>

            <Card className="p-4 rounded-card border-none shadow-xs space-y-4">
              <h3 className="font-semibold text-sm text-foreground">Client Preferences</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Locations</p>
                  <div className="flex flex-wrap gap-2">
                    {client.preferredLocations.map(loc => <Badge key={loc} variant="secondary" className="bg-secondary">{loc}</Badge>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Property Types</p>
                  <div className="flex flex-wrap gap-2">
                    {client.preferredPropertyTypes.map(pt => <Badge key={pt} variant="outline">{pt}</Badge>)}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Budget Range</p>
                  <p className="text-sm font-semibold">{client.budgetRange}</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="py-6 animate-slide-up-fade space-y-4">
            {bookings.map(booking => (
              <Card key={booking.id} className="p-4 rounded-card border border-border/50 shadow-xs space-y-4">
                 <div className="flex justify-between items-start">
                   <div>
                     <h3 className="font-bold text-foreground text-lg">{booking.projectName}</h3>
                     <p className="text-sm text-muted-foreground">Unit {booking.unitNumber}</p>
                   </div>
                   <Badge variant="secondary" className={`border-none ${booking.status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                     {booking.status}
                   </Badge>
                 </div>
                 
                 <div className="flex justify-between items-center bg-secondary/50 p-3 rounded-lg">
                   <div>
                     <p className="text-xs text-muted-foreground">Purchase Price</p>
                     <p className="text-sm font-bold">{booking.purchasePrice}</p>
                   </div>
                   <div className="text-right">
                     <p className="text-xs text-muted-foreground">Booking Date</p>
                     <p className="text-sm font-semibold">{new Date(booking.bookingDate).toLocaleDateString()}</p>
                   </div>
                 </div>

                 <div className="space-y-2 pt-2">
                   <div className="flex justify-between text-xs font-semibold">
                     <span>Payment Progress</span>
                     <span>{booking.paymentCompleted}%</span>
                   </div>
                   <Progress value={booking.paymentCompleted} className="h-2" />
                 </div>
              </Card>
            ))}
          </TabsContent>

          {/* Timeline Tab */}
          <TabsContent value="timeline" className="py-6 animate-slide-up-fade">
            <div className="relative pl-4 space-y-6 before:absolute before:inset-y-0 before:left-[27px] before:w-px before:bg-border/50">
              {timeline.map((event, i) => (
                <div key={i} className="relative flex items-start gap-4 z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-background ${event.type === 'Milestone' ? 'bg-success/20 text-success' : 'bg-secondary text-muted-foreground'}`}>
                    {event.type === 'Milestone' ? <CheckCircle2 className="w-5 h-5" /> : <Calendar className="w-4 h-4" />}
                  </div>
                  <div className="pt-1 w-full pr-4">
                    <h4 className="text-sm font-bold text-foreground">{event.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 bg-card p-2 rounded-md border border-border/50 shadow-xs leading-relaxed">{event.description}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 font-medium uppercase tracking-wider">{new Date(event.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="py-6 animate-slide-up-fade space-y-3">
             {documents.map(doc => (
               <Card key={doc.id} className="p-4 rounded-card border-none shadow-xs flex items-center justify-between group cursor-pointer hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">{doc.title}</h4>
                      <p className="text-xs text-muted-foreground">{new Date(doc.uploadDate).toLocaleDateString()} • {doc.type}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground group-hover:text-primary">
                    <Download className="w-5 h-5" />
                  </Button>
               </Card>
             ))}
          </TabsContent>

        </Tabs>
      </div>

    </div>
  );
}
