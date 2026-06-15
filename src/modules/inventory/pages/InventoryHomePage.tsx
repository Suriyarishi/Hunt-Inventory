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

  // Filter Selection States
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedBhk, setSelectedBhk] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const toggleFilter = (list: string[], setList: (v: string[]) => void, item: string) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const clearAllFilters = () => {
    setSelectedStatus([]);
    setSelectedBhk([]);
    setSelectedBudget([]);
    setSelectedAmenities([]);
  };

  const totalActiveFilters = selectedStatus.length + selectedBhk.length + selectedBudget.length + selectedAmenities.length;

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      <div className="bg-background border-b border-border/50 p-4 shrink-0 z-30">
        <h1 className="text-2xl font-bold text-foreground mb-4">Projects</h1>
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
              <Button variant="secondary" size="icon" className="shrink-0 rounded-button shadow-xs bg-card relative">
                <SlidersHorizontal className="w-4 h-4" />
                {totalActiveFilters > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[9px] font-bold rounded-full flex items-center justify-center animate-pulse-soft">
                    {totalActiveFilters}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-modal sm:max-w-md mx-auto flex flex-col p-0 overflow-hidden border-none shadow-lg bg-card">
              <SheetHeader className="p-5 pb-4 border-b border-border/50 flex flex-row items-center gap-3 shrink-0">
                <SheetTitle className="text-lg font-bold">Filters</SheetTitle>
                {totalActiveFilters > 0 && (
                  <Badge 
                    onClick={clearAllFilters} 
                    className="text-[10px] font-bold text-primary border-primary/20 bg-primary/10 hover:bg-primary/20 transition-colors cursor-pointer px-2 py-0.5 rounded-md"
                  >
                    Clear All
                  </Badge>
                )}
              </SheetHeader>
              
              {/* Scrollable filters body */}
              <div className="flex-1 overflow-y-auto p-5 space-y-6 pb-28">
                {/* 1. Project Status */}
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Project Status</h3>
                  <div className="flex flex-wrap gap-2">
                    {['New Launch', 'Under Construction', 'Ready to Move'].map((status) => {
                      const isSelected = selectedStatus.includes(status);
                      return (
                        <Badge 
                          key={status} 
                          onClick={() => toggleFilter(selectedStatus, setSelectedStatus, status)}
                          className={`px-3 py-1.5 rounded-full cursor-pointer transition-all text-xs font-semibold border ${
                            isSelected 
                              ? 'bg-primary text-white border-primary shadow-xs hover:bg-primary/90' 
                              : 'bg-secondary hover:bg-secondary/70 text-muted-foreground border-transparent'
                          }`}
                        >
                          {status}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* 2. BHK Configurations */}
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">BHK Configurations</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Studio', '1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'].map((bhk) => {
                      const isSelected = selectedBhk.includes(bhk);
                      return (
                        <Badge 
                          key={bhk} 
                          onClick={() => toggleFilter(selectedBhk, setSelectedBhk, bhk)}
                          className={`px-3 py-1.5 rounded-full cursor-pointer transition-all text-xs font-semibold border ${
                            isSelected 
                              ? 'bg-primary text-white border-primary shadow-xs hover:bg-primary/90' 
                              : 'bg-secondary hover:bg-secondary/70 text-muted-foreground border-transparent'
                          }`}
                        >
                          {bhk}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Budget Range */}
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Budget Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Under $300k', '$300k - $500k', '$500k - $800k', 'Above $800k'].map((budget) => {
                      const isSelected = selectedBudget.includes(budget);
                      return (
                        <Badge 
                          key={budget} 
                          onClick={() => toggleFilter(selectedBudget, setSelectedBudget, budget)}
                          className={`px-3 py-1.5 rounded-full cursor-pointer transition-all text-xs font-semibold border ${
                            isSelected 
                              ? 'bg-primary text-white border-primary shadow-xs hover:bg-primary/90' 
                              : 'bg-secondary hover:bg-secondary/70 text-muted-foreground border-transparent'
                          }`}
                        >
                          {budget}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Amenities */}
                <div>
                  <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">Lifestyle Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Pool', 'Gym', 'Clubhouse', 'Play Area', 'Power Backup', 'Security'].map((amenity) => {
                      const isSelected = selectedAmenities.includes(amenity);
                      return (
                        <Badge 
                          key={amenity} 
                          onClick={() => toggleFilter(selectedAmenities, setSelectedAmenities, amenity)}
                          className={`px-3 py-1.5 rounded-full cursor-pointer transition-all text-xs font-semibold border ${
                            isSelected 
                              ? 'bg-primary text-white border-primary shadow-xs hover:bg-primary/90' 
                              : 'bg-secondary hover:bg-secondary/70 text-muted-foreground border-transparent'
                          }`}
                        >
                          {amenity}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Fixed Bottom Footer (resolves overlap completely) */}
              <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background to-background/80 pt-6 border-t border-border/40 z-20 shrink-0">
                <Button className="w-full rounded-button h-12 text-base font-bold bg-primary hover:bg-primary/95 text-white shadow-xs">
                  Apply Filters {totalActiveFilters > 0 && `(${totalActiveFilters})`}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {mockProjects.map((project, i) => (
          <Card 
            key={project.id} 
            className="flex h-[112px] overflow-hidden border-none shadow-xs hover:shadow-md transition-all rounded-card cursor-pointer animate-slide-up-fade bg-card"
            style={{ animationDelay: `${(i + 1) * 100}ms` }}
            onClick={() => navigate(`/inventory/project/${project.id}`)}
          >
            {/* Left side: Image */}
            <div className="w-28 relative shrink-0 overflow-hidden bg-muted">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute top-2 left-2 z-10">
                <Badge className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background/90 border-none shadow-sm text-[9px] px-1.5 py-0.5 font-semibold">
                  {project.status}
                </Badge>
              </div>
            </div>

            {/* Right side: Details */}
            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
              <div>
                <div className="flex justify-between items-start gap-1">
                  <h3 className="text-sm font-bold text-foreground truncate leading-none">{project.name}</h3>
                  <span className="text-xs font-bold text-primary whitespace-nowrap shrink-0">{project.priceRange}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-muted-foreground text-[10px] mt-1.5 min-w-0">
                  <div className="flex items-center gap-0.5 min-w-0 flex-1">
                    <MapPin className="w-3 h-3 shrink-0 text-muted-foreground/80" />
                    <span className="truncate">{project.location}</span>
                  </div>
                  <span className="text-border font-light select-none shrink-0">•</span>
                  <span className="font-semibold text-primary/90 whitespace-nowrap shrink-0">{project.bhkTypes}</span>
                </div>
              </div>
              
              {/* Unit metrics container */}
              <div className="mt-2 pt-1.5 border-t border-border/50">
                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex gap-2.5 text-muted-foreground">
                    <div>
                      <span className="text-primary font-bold">{project.availableUnits}</span>
                      <span className="ml-0.5 text-[9px]">Avail</span>
                    </div>
                    <div>
                      <span className="text-dark-green dark:text-foreground font-bold">{project.totalUnits - project.availableUnits}</span>
                      <span className="ml-0.5 text-[9px]">Sold</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground font-semibold">
                    <Building className="w-3 h-3 text-accent-blue shrink-0" />
                    <span>{project.totalUnits} Total</span>
                  </div>
                </div>
                
                {/* Progress bar visual aid */}
                <div className="h-1 w-full bg-secondary dark:bg-muted/30 rounded-full overflow-hidden mt-1">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500" 
                    style={{ width: `${Math.round(((project.totalUnits - project.availableUnits) / project.totalUnits) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
