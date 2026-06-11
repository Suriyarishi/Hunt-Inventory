import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowDownUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUnits } from '../constants/mockData';

export default function TowerFloorPlanPage() {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState('0');

  const floorUnits = mockUnits.filter(u => u.floor === selectedFloor);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-success text-success-foreground';
      case 'Held': return 'bg-warning text-warning-foreground';
      case 'Sold': return 'bg-destructive text-destructive-foreground';
      case 'Blocked': return 'bg-muted-foreground text-white';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border/50 p-4">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="secondary" size="icon" className="rounded-full shadow-xs bg-card shrink-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Tower A</h1>
            <p className="text-xs text-muted-foreground">Skyline Residences</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={selectedFloor} onValueChange={setSelectedFloor}>
            <SelectTrigger className="w-full rounded-button h-12 bg-card border-none shadow-xs">
              <div className="flex items-center gap-2">
                <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
                <SelectValue placeholder="Select Floor" />
              </div>
            </SelectTrigger>
            <SelectContent className="rounded-card shadow-lg border-none">
              {[0,1,2,3,4,5,6,7,8,9].map(f => (
                <SelectItem key={f} value={f.toString()}>Floor {f === 0 ? 'G' : f}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-4 flex flex-wrap gap-2 justify-center animate-slide-up-fade">
        {['Available', 'Held', 'Sold', 'Blocked'].map(status => (
          <div key={status} className="flex items-center gap-1.5">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(' ')[0]}`} />
            <span className="text-[10px] font-medium text-muted-foreground uppercase">{status}</span>
          </div>
        ))}
      </div>

      <div className="p-6 pt-2 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
        <div className="grid grid-cols-2 gap-4">
          {floorUnits.map((unit) => (
            <div 
              key={unit.id}
              onClick={() => navigate(`/inventory/unit/${unit.id}`)}
              className="p-4 rounded-card shadow-xs cursor-pointer hover:shadow-md transition-all flex flex-col justify-between h-32 relative overflow-hidden bg-card border border-border/50"
            >
              <div className={`absolute top-0 left-0 w-1.5 h-full ${getStatusColor(unit.status).split(' ')[0]}`} />
              <div className="pl-2">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-bold text-foreground">{unit.number}</h3>
                  <Badge className={`${getStatusColor(unit.status)} border-none text-[10px]`}>{unit.status}</Badge>
                </div>
                <p className="text-xs font-medium text-muted-foreground mb-1">{unit.type} • {unit.facing}</p>
                <p className="text-sm font-bold text-foreground">${(unit.basePrice / 1000).toFixed(0)}k</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
