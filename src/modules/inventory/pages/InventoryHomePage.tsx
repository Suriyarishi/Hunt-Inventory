import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, MapPin, Building } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { mockProjects } from '../constants/mockData';

export default function InventoryHomePage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 p-4 animate-slide-up-fade">
        <h1 className="text-2xl font-bold text-foreground mb-4">Inventory</h1>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search projects..." 
              className="pl-9 bg-card border-none shadow-xs rounded-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="shrink-0 rounded-button shadow-xs bg-card">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-modal sm:max-w-md mx-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Project Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['New Launch', 'Under Construction', 'Ready to Move'].map((status) => (
                      <Badge key={status} variant="secondary" className="px-3 py-1.5 rounded-full cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                        {status}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <Button className="w-full rounded-button h-12 text-lg">Apply Filters</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {mockProjects.map((project, i) => (
          <Card 
            key={project.id} 
            className="overflow-hidden border-none shadow-xs hover:shadow-md transition-all rounded-card cursor-pointer animate-slide-up-fade"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
            onClick={() => navigate(`/inventory/project/${project.id}`)}
          >
            <div className="h-48 relative">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <Badge className="bg-background/80 backdrop-blur-md text-foreground hover:bg-background/90 border-none shadow-sm">
                  {project.status}
                </Badge>
              </div>
              <div className="absolute top-3 right-3">
                <Badge className="bg-primary text-primary-foreground border-none shadow-sm">
                  {project.availableUnits} Units Left
                </Badge>
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-foreground mb-1">{project.name}</h3>
              <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                <MapPin className="w-3.5 h-3.5" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center justify-between border-t border-border/50 pt-3">
                <div className="flex items-center gap-1.5 text-sm font-medium">
                  <Building className="w-4 h-4 text-accent-blue" />
                  <span>{project.totalUnits} Total</span>
                </div>
                <div className="text-sm font-bold text-foreground">
                  {project.priceRange}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
