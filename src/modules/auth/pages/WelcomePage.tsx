import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Building } from 'lucide-react';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 animate-slide-up-fade">
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mb-8 shadow-sm">
          <Building className="w-12 h-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-4">Hunt Inventory</h1>
        <p className="text-lg text-muted-foreground max-w-xs">
          The most advanced enterprise property platform for modern brokers.
        </p>
      </div>

      <div className="w-full space-y-4 mb-8">
        <Button 
          className="w-full h-14 rounded-button text-lg font-bold shadow-lg bg-primary hover:bg-primary/90"
          onClick={() => navigate('/auth/login')}
        >
          Get Started
        </Button>
        <p className="text-sm text-center text-muted-foreground">
          By continuing, you agree to our <span className="text-primary cursor-pointer hover:underline">Terms</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
