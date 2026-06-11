import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { mockUnits } from '../constants/mockData';

export default function TowerFloorPlanPage() {
  const navigate = useNavigate();
  const [selectedTower, setSelectedTower] = useState('Tower A');
  const [selectedFloor, setSelectedFloor] = useState('4'); // Default to 4th floor for mockup variance

  const towers = ['Tower A', 'Tower B', 'Tower C'];
  const floors = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const floorUnits = mockUnits.filter(u => u.floor === selectedFloor);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-status-available text-white';
      case 'Held': return 'bg-status-held text-white';
      case 'Reserved': return 'bg-status-reserved text-white';
      case 'Blocked': return 'bg-status-blocked text-white';
      case 'Sold': return 'bg-status-sold text-white';
      default: return 'bg-secondary text-foreground';
    }
  };

  const getStatusBulletColor = (status: string) => {
    switch (status) {
      case 'Available': return 'bg-status-available';
      case 'Held': return 'bg-status-held';
      case 'Reserved': return 'bg-status-reserved';
      case 'Blocked': return 'bg-status-blocked';
      case 'Sold': return 'bg-status-sold';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="h-full bg-background flex flex-col relative overflow-hidden">
      
      {/* Sticky Header */}
      <div className="bg-background border-b border-border/50 p-4 space-y-3.5 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Button variant="secondary" size="icon" className="rounded-full shadow-xs bg-card shrink-0" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-lg font-extrabold text-foreground flex items-center gap-1.5">
              Inventory Selector
            </h1>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase">Skyline Residences</p>
          </div>
        </div>

        {/* 12. Tower Selection (horizontal segments) */}
        <div className="flex bg-secondary/50 rounded-button p-1 h-11">
          {towers.map(tower => {
            const isActive = selectedTower === tower;
            return (
              <button
                key={tower}
                onClick={() => setSelectedTower(tower)}
                className={`flex-1 rounded-button text-xs font-bold transition-all ${
                  isActive ? 'bg-card shadow-xs text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {tower}
              </button>
            );
          })}
        </div>

        {/* 13. Floor Selection (horizontal scrolling list) */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {floors.map(f => {
            const isActive = selectedFloor === f;
            return (
              <button
                key={f}
                onClick={() => setSelectedFloor(f)}
                className={`w-10 h-10 shrink-0 rounded-xl text-xs font-bold border transition-all ${
                  isActive 
                    ? 'bg-primary text-white border-primary shadow-xs' 
                    : 'bg-card text-muted-foreground border-border/50 hover:bg-secondary/40'
                }`}
              >
                {f === '0' ? 'G' : f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Scrollable grid area */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Status Indicators */}
        <div className="p-4 flex flex-wrap gap-2.5 justify-center animate-slide-up-fade">
          {['Available', 'Held', 'Reserved', 'Blocked', 'Sold'].map(status => (
            <div key={status} className="flex items-center gap-1.5 bg-card px-2.5 py-1 rounded-lg border border-border/40 shadow-xs">
              <div className={`w-2.5 h-2.5 rounded-full ${getStatusBulletColor(status)}`} />
              <span className="text-[9px] font-extrabold text-muted-foreground uppercase">{status}</span>
            </div>
          ))}
        </div>

        {/* 14. Inventory Grid */}
        <div className="p-4 pt-2 animate-slide-up-fade" style={{ animationDelay: '100ms' }}>
          <div className="grid grid-cols-2 gap-3">
            {floorUnits.map((unit) => (
              <Card 
                key={unit.id}
                onClick={() => navigate(`/inventory/unit/${unit.id}`)}
                className="p-3.5 rounded-card shadow-xs cursor-pointer hover:shadow-md active:scale-95 transition-all flex flex-col justify-between h-[115px] relative overflow-hidden bg-card border-none"
              >
                {/* Colored left strip indicating status */}
                <div className={`absolute top-0 left-0 w-1.5 h-full ${getStatusBulletColor(unit.status)}`} />
                
                <div className="pl-1.5 flex flex-col justify-between h-full w-full">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-extrabold text-foreground leading-none">{unit.number}</h3>
                    <Badge className={`${getStatusColor(unit.status)} border-none text-[8px] font-bold px-1.5 py-0.5 leading-none`}>
                      {unit.status}
                    </Badge>
                  </div>
                  
                  <div className="mt-2.5">
                    <p className="text-[10px] font-semibold text-muted-foreground">{unit.type} • {unit.facing}</p>
                    <p className="text-xs font-extrabold text-foreground mt-0.5">₹{(unit.basePrice / 100000).toFixed(2)} Cr</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
