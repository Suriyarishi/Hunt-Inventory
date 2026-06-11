import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects, mockBuilders } from '../constants/mockData';
import { ArrowLeft, MapPin, Building2, Trees, ShieldCheck, ChevronRight, Train, School, Hospital, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];
  const builder = mockBuilders.find(b => b.id === project.builderId) || mockBuilders[0];

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="h-72 relative">
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 pt-safe">
          <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-md hover:bg-background" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-md hover:bg-background" onClick={() => navigate('/inventory/compare-projects')}>
              <Scale className="w-5 h-5" />
            </Button>
            <Badge className="bg-background/80 backdrop-blur-md text-foreground border-none shadow-sm">{project.status}</Badge>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-8 relative z-20">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">{project.name}</h1>
            <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4" />
              <span>{project.location}</span>
            </div>
          </div>
          <img src={builder.logo} alt={builder.name} className="w-12 h-12 rounded-full border-2 border-background shadow-md bg-white object-contain" />
        </div>

        <Tabs defaultValue="overview" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/50 rounded-button p-1">
            <TabsTrigger value="overview" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Overview</TabsTrigger>
            <TabsTrigger value="amenities" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Amenities</TabsTrigger>
            <TabsTrigger value="gallery" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Gallery</TabsTrigger>
            <TabsTrigger value="location" className="rounded-button data-[state=active]:bg-card data-[state=active]:shadow-xs text-[10px] sm:text-xs px-1">Location</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="py-6 space-y-6 animate-slide-up-fade">
            <div>
              <h3 className="font-semibold text-foreground mb-2">About Developer</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{builder.description}. Established in {builder.established}.</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 p-3 bg-card rounded-card shadow-xs">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">RERA ID</p>
                  <p className="text-sm font-medium">{project.rera}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-card shadow-xs">
                <div className="w-10 h-10 rounded-full bg-accent-blue/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5 text-accent-blue" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Units</p>
                  <p className="text-sm font-medium">{project.totalUnits} Units</p>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="amenities" className="py-6 animate-slide-up-fade">
            <div className="grid grid-cols-2 gap-4">
              {['Swimming Pool', 'Gymnasium', 'Club House', 'Kids Play Area', '24/7 Security'].map((amenity, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 bg-card rounded-card shadow-xs text-center">
                  <Trees className="w-6 h-6 text-primary mb-2" />
                  <span className="text-xs font-medium text-foreground">{amenity}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="gallery" className="py-6 animate-slide-up-fade">
            <div className="grid grid-cols-2 gap-2">
              {[1,2,3,4].map(i => (
                <img key={i} src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80&sig=${i}`} className="w-full h-32 object-cover rounded-card" alt="Gallery" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="location" className="py-6 animate-slide-up-fade space-y-6">
            <div className="w-full h-48 bg-secondary rounded-card overflow-hidden relative border border-border/50">
              {/* Simulated Map View */}
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai&zoom=14&size=600x300&scale=2')] bg-cover opacity-50 mix-blend-luminosity" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                   <MapPin className="w-6 h-6 text-primary" />
                 </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Nearby Landmarks</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between p-3 bg-card rounded-card shadow-xs">
                  <div className="flex items-center gap-3">
                    <Train className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">City Center Metro</span>
                  </div>
                  <span className="text-xs text-muted-foreground">0.5 km</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-card shadow-xs">
                  <div className="flex items-center gap-3">
                    <School className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Delhi Public School</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1.2 km</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-card rounded-card shadow-xs">
                  <div className="flex items-center gap-3">
                    <Hospital className="w-5 h-5 text-muted-foreground" />
                    <span className="text-sm font-medium">Apollo Hospital</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2.5 km</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="fixed bottom-20 left-4 right-4 z-40 max-w-[400px] mx-auto">
        <Button 
          className="w-full h-14 rounded-button shadow-lg text-lg flex items-center justify-between px-6"
          onClick={() => navigate(`/inventory/project/${project.id}/towers`)}
        >
          <span>View Inventory</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
