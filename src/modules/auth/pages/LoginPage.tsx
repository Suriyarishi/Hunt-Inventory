import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"

type LoginStep = 'MOBILE' | 'OTP';

export default function LoginPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<LoginStep>('MOBILE');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (mobile.length >= 10) setStep('OTP');
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) navigate('/auth/security-setup');
  };

  return (
    <div className="flex-1 flex flex-col p-6 animate-slide-up-fade pt-safe">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="icon" className="rounded-full -ml-2 hover:bg-secondary/50" onClick={() => step === 'OTP' ? setStep('MOBILE') : navigate(-1)}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
      </div>

      {step === 'MOBILE' ? (
        <div className="flex-1 flex flex-col">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Enter your mobile number to securely log in or create an account.</p>
          
          <div className="relative mb-6">
            <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              type="tel"
              placeholder="Mobile Number" 
              className="pl-12 h-14 text-lg bg-card border-none shadow-xs rounded-input focus-visible:ring-primary/20"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <Button 
            className="w-full h-14 rounded-button text-lg font-bold mt-auto mb-8 shadow-md transition-transform active:scale-95"
            onClick={handleSendOtp}
            disabled={mobile.length < 10}
          >
            Send OTP
          </Button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col animate-slide-up-fade">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-success" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">Verify Number</h2>
          <p className="text-muted-foreground mb-8">We've sent a 6-digit code to <span className="font-semibold text-foreground">+91 {mobile}</span></p>
          
          <div className="flex justify-center mb-8">
            <InputOTP maxLength={6} value={otp} onChange={setOtp}>
              <InputOTPGroup className="gap-2">
                {[0,1,2,3,4,5].map(i => (
                  <InputOTPSlot key={i} index={i} className="w-12 h-14 text-xl border-none bg-card shadow-xs rounded-md" />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button 
            className="w-full h-14 rounded-button text-lg font-bold mt-auto mb-8 shadow-md transition-transform active:scale-95"
            onClick={handleVerifyOtp}
            disabled={otp.length < 6}
          >
            Verify & Continue
          </Button>
        </div>
      )}
    </div>
  );
}
