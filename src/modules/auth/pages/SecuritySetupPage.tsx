import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScanFace, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SecuritySetupPage() {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/auth/kyc');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col p-6 pt-safe">
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-slide-up-fade">
        <h2 className="text-3xl font-bold text-foreground mb-4">Enable Face ID</h2>
        <p className="text-muted-foreground mb-12 max-w-xs">
          Use your face to securely and instantly log into Hunt Inventory.
        </p>

        <div className="relative w-48 h-48 mb-12">
          {/* Scanning Animation */}
          <div className={`absolute inset-0 border-4 border-primary/20 rounded-3xl transition-all duration-500 ${scanning ? 'scale-110 border-primary' : ''}`} />
          
          <div className="absolute inset-0 flex items-center justify-center bg-card shadow-lg rounded-3xl z-10 overflow-hidden">
             {scanning && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary blur-[2px] animate-[bounce_2s_infinite]" />
            )}
            {success ? (
              <CheckCircle2 className="w-20 h-20 text-success animate-in zoom-in duration-300" />
            ) : (
              <ScanFace className={`w-20 h-20 text-primary ${scanning ? 'animate-pulse' : ''}`} />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <Button 
          className="w-full h-14 rounded-button text-lg font-bold shadow-md"
          onClick={handleScan}
          disabled={scanning || success}
        >
          {scanning ? 'Scanning...' : success ? 'Setup Complete' : 'Enable Face ID'}
        </Button>
        <Button 
          variant="ghost" 
          className="w-full h-14 rounded-button text-muted-foreground hover:bg-secondary"
          onClick={() => navigate('/auth/kyc')}
          disabled={scanning || success}
        >
          Skip for now
        </Button>
      </div>
    </div>
  );
}
