import { useParams, useNavigate } from 'react-router-dom';
import { mockProjects, mockBuilders } from '../constants/mockData';
import { 
  ArrowLeft, 
  MapPin, 
  Trees, 
  ShieldCheck, 
  ChevronRight, 
  Train, 
  School, 
  Hospital, 
  Scale, 
  Info, 
  User, 
  Layers, 
  Coins, 
  Image, 
  TrendingUp,
  Sparkles,
  Calculator
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = mockProjects.find(p => p.id === id) || mockProjects[0];
  const builder = mockBuilders.find(b => b.id === project.builderId) || mockBuilders[0];

  const soldPercentage = Math.round(((project.totalUnits - project.availableUnits) / project.totalUnits) * 100);

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      
      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto pb-32">
        {/* Top Banner Cover Image */}
        <div className="h-60 relative shrink-0">
          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Back and Compare Actions */}
          <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 pt-safe">
            <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-md hover:bg-background" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="icon" className="rounded-full bg-background/80 backdrop-blur-md hover:bg-background" onClick={() => navigate('/inventory/compare-projects')}>
                <Scale className="w-5 h-5" />
              </Button>
              <Badge className="bg-primary text-white border-none shadow-sm font-bold text-[10px] px-2.5 py-0.5">{project.status}</Badge>
            </div>
          </div>
        </div>

        {/* Main detail content */}
        <div className="px-4 -mt-6 relative z-20 flex flex-col space-y-5">
          
          {/* Project Name and location */}
          <div className="flex justify-between items-end bg-background/60 backdrop-blur-xs p-1 rounded-2xl">
            <div>
              <h1 className="text-xl font-extrabold text-foreground leading-tight">{project.name}</h1>
              <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
              </div>
            </div>
            <img src={builder.logo} alt={builder.name} className="w-10 h-10 rounded-full border border-border shadow bg-white object-contain" />
          </div>

          {/* 1. Overview Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <Info className="w-4 h-4 text-primary shrink-0" />
              Project Details
            </h3>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Project ID</span>
                <p className="font-semibold text-foreground mt-0.5">{project.id.toUpperCase()}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Project Code</span>
                <p className="font-semibold text-foreground mt-0.5">SKY-RES-DNTN</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Project Type</span>
                <p className="font-semibold text-foreground mt-0.5">Premium Residential</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">RERA ID</span>
                <p className="font-semibold text-foreground mt-0.5 truncate">{project.rera}</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Launch Date</span>
                <p className="font-semibold text-foreground mt-0.5">Jan 2025</p>
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Possession Date</span>
                <p className="font-semibold text-foreground mt-0.5">Dec 2028</p>
              </div>
            </div>
          </Card>

          <Card className="p-4 rounded-card border border-primary/15 bg-primary-soft/30 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-foreground">RERA Registered & Verified</h4>
              <p className="text-[10px] text-muted-foreground">All compliance audits are cleared and registered.</p>
            </div>
          </Card>

          {/* 2. Builder Profile Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-3">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <User className="w-4 h-4 text-primary shrink-0" />
              Developer Profile
            </h3>
            <div className="flex items-center gap-3 pb-3 border-b border-border/30">
              <img src={builder.logo} alt={builder.name} className="w-10 h-10 rounded-full border border-border bg-white object-contain" />
              <div>
                <h3 className="font-bold text-sm text-foreground">{builder.name}</h3>
                <span className="text-[10px] text-muted-foreground font-bold uppercase">Est. {builder.established}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {builder.description}. Skyline Developers is known for luxury skyscraper projects focusing on structural compliance and state-of-the-art architectures.
            </p>
          </Card>

          {/* 3. Occupancy Velocity Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-primary shrink-0" />
              Occupancy & Speed
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-foreground">
                <span>{project.totalUnits - project.availableUnits} of {project.totalUnits} Sold</span>
                <span className="text-primary">{soldPercentage}% Occupied</span>
              </div>
              <Progress value={soldPercentage} className="h-2 bg-secondary [&>div]:bg-primary" />
            </div>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-secondary/40 p-3 rounded-xl border border-border/30">
                <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">Available</span>
                <p className="text-lg font-extrabold text-primary mt-0.5">{project.availableUnits} Units</p>
              </div>
              <div className="bg-secondary/40 p-3 rounded-xl border border-border/30">
                <span className="text-[9px] text-muted-foreground font-bold uppercase tracking-wider block">Total</span>
                <p className="text-lg font-extrabold text-foreground mt-0.5">{project.totalUnits} Units</p>
              </div>
            </div>
          </Card>

          {/* 4. Financial & Pricing Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-border/30">
              <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-primary shrink-0" />
                Base Pricing Parameters
              </h3>
              <Badge className="bg-primary-soft text-primary hover:bg-primary-soft border-none text-[9px] font-bold px-2 py-0.5">
                2.5% Commission Scale
              </Badge>
            </div>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Starting Base Price</span>
                <p className="font-bold text-foreground">{project.priceRange.split(' - ')[0] || '₹1.2 Cr'}</p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">PLC Charges</span>
                <p className="font-bold text-foreground">₹15,000 / sqft</p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Club Membership</span>
                <p className="font-bold text-foreground">₹10,000 flat</p>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Parking Slots</span>
                <p className="font-bold text-foreground">₹20,000 base</p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/30 flex items-center gap-3">
              <Calculator className="w-4 h-4 text-primary shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold text-foreground">Estimates Include GST</h4>
                <p className="text-[9px] text-muted-foreground">Flat 5% GST tax is computed in final cost reports.</p>
              </div>
            </div>
          </Card>

          {/* 5. Lifestyle Amenities Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <Trees className="w-4 h-4 text-primary shrink-0" />
              Lifestyle Amenities
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              {['Pool', 'Gym', 'Clubhouse', 'Play Area', 'Security', 'Power Back'].map((amenity, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-2.5 bg-secondary/30 rounded-xl border border-border/30 text-center">
                  <Trees className="w-4 h-4 text-primary mb-1 shrink-0" />
                  <span className="text-[10px] font-bold text-foreground truncate w-full">{amenity}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* 6. Media Gallery Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <Image className="w-4 h-4 text-primary shrink-0" />
              Property Showcase Gallery
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map(i => (
                <img 
                  key={i} 
                  src={`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80&sig=${i}`} 
                  className="w-full h-20 object-cover rounded-lg shadow-xs border border-border/20" 
                  alt="Gallery" 
                />
              ))}
            </div>
          </Card>

          {/* 7. Location & Transit Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              Location Map & Transit
            </h3>
            <div className="w-full h-32 bg-secondary rounded-xl overflow-hidden relative border border-border/50 shadow-xs">
              <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Mumbai&zoom=14&size=600&scale=2')] bg-cover opacity-50 mix-blend-luminosity" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              {[
                { name: 'City Center Metro', dist: '0.5 km', icon: Train },
                { name: 'Delhi Public School', dist: '1.2 km', icon: School },
                { name: 'Apollo Hospital', dist: '2.5 km', icon: Hospital }
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center justify-between p-2 bg-secondary/30 rounded-lg border border-border/30">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-[11px] font-bold text-foreground">{item.name}</span>
                    </div>
                    <span className="text-[9px] font-extrabold text-muted-foreground">{item.dist}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* 8. Market Analytics Section */}
          <Card className="p-4 rounded-card border-none shadow-xs bg-card space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="font-extrabold text-sm text-foreground flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                Market Dynamics Trend
              </h3>
              <Badge className="bg-primary-soft text-primary hover:bg-primary-soft border-none text-[9px] font-bold px-2 py-0.5">
                +12.4% YoY
              </Badge>
            </div>

            <div className="w-full h-16 flex items-end justify-between gap-1 pt-2 border-b border-border/30 pb-3">
              {[42, 50, 48, 65, 80, 95].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-primary/20 hover:bg-primary transition-all duration-300 rounded-t-sm"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[8px] font-bold text-muted-foreground">Q{idx + 1}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-primary shrink-0" />
              <div>
                <h4 className="text-[10px] font-bold text-foreground">High Sales Velocity Region</h4>
                <p className="text-[9px] text-muted-foreground">Units in Block C sell 3.4x faster than zone averages.</p>
              </div>
            </div>
          </Card>

        </div>
      </div>

      {/* Primary Absolute Fixed Call to Action */}
      <div className="absolute bottom-4 left-4 right-4 z-40">
        <Button 
          className="w-full h-14 rounded-button shadow-md text-base font-bold bg-primary hover:bg-primary/95 text-white flex items-center justify-between px-6"
          onClick={() => navigate(`/inventory/project/${project.id}/towers`)}
        >
          <span>Select Tower & Floor</span>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

    </div>
  );
}
