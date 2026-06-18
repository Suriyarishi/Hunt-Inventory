import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, BadgeCheck, CheckCircle2, User, FileText, IndianRupee, UploadCloud, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockHolds } from '@/modules/holds/constants/mockData';

export default function BookingWizardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { holdId?: string } | null;
  const selectedHold = mockHolds.find((hold) => hold.id === state?.holdId);
  const [step, setStep] = useState('eoi');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasCoApplicant, setHasCoApplicant] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center pt-safe animate-in zoom-in duration-500">
         <div className="w-24 h-24 bg-success/20 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-success" />
         </div>
         <h1 className="text-3xl font-bold text-foreground mb-2">Sale Confirmed!</h1>
         <p className="text-muted-foreground mb-8">Booking, documents, audit trail, and sold record are now linked.</p>
         
         <Card className="p-4 rounded-card border border-border/50 bg-secondary/30 w-full mb-8 text-left space-y-2">
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">Application ID</span>
             <span className="font-bold">B-001</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">Unit</span>
             <span className="font-bold">{selectedHold ? `${selectedHold.unitNumber}, ${selectedHold.projectName}` : 'A-1402, Skyline'}</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-muted-foreground">Sold Deal</span>
             <span className="font-bold">S-001</span>
           </div>
         </Card>

         <Button className="w-full h-14 rounded-button text-lg font-bold shadow-lg" onClick={() => navigate('/sold/S-001')}>
           View Sold Deal
         </Button>
         <Button variant="outline" className="w-full h-12 rounded-button font-bold mt-3" onClick={() => navigate('/bookings/B-001')}>
           View Booking
         </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-32 pt-safe flex flex-col">
      <div className="p-4 flex items-center justify-between z-10 sticky top-0 bg-background/90 backdrop-blur-md border-b border-border/50">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-secondary/50 -ml-2" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="font-bold text-lg">New Booking</h1>
        <div className="w-9" />
      </div>

      <div className="p-4 flex-1 animate-slide-up-fade">
         {selectedHold && (
           <Card className="p-4 rounded-card border-none shadow-xs bg-primary/5 mb-4">
             <div className="flex items-start justify-between gap-3">
               <div>
                 <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Converted from hold</p>
                 <h2 className="font-bold text-foreground mt-1">{selectedHold.unitNumber} - {selectedHold.projectName}</h2>
                 <p className="text-xs text-muted-foreground mt-1">{selectedHold.clientName} - token {selectedHold.tokenAmount}</p>
               </div>
               <BadgeCheck className="w-5 h-5 text-primary shrink-0" />
             </div>
           </Card>
         )}
         <Accordion type="single" value={step} onValueChange={setStep} className="w-full space-y-4">
            
            {/* Step 1: EOI & Token */}
            <AccordionItem value="eoi" className="border-none bg-card rounded-card shadow-xs px-4 overflow-hidden">
               <AccordionTrigger className="hover:no-underline py-4">
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'eoi' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                     <IndianRupee className="w-4 h-4" />
                   </div>
                   <span className="font-bold">1. EOI & Token Details</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Select Unit</label>
                    <Select>
                      <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                        <SelectValue placeholder="Select inventory unit..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="U-1">A-1402 • Skyline Residences</SelectItem>
                        <SelectItem value="U-2">B-2101 • Zenith Towers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Token Amount</label>
                      <Input placeholder="₹" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Payment Mode</label>
                      <Select>
                        <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                          <SelectValue placeholder="Mode" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cheque">Cheque</SelectItem>
                          <SelectItem value="neft">NEFT / RTGS</SelectItem>
                          <SelectItem value="card">Credit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Reference No.</label>
                    <Input placeholder="Cheque / UTR Number" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                  </div>
                  <Button className="w-full h-12 rounded-button mt-4 font-bold" onClick={() => setStep('buyer')}>Next: Buyer Details</Button>
               </AccordionContent>
            </AccordionItem>

            {/* Step 2: Buyer KYC */}
            <AccordionItem value="buyer" className="border-none bg-card rounded-card shadow-xs px-4 overflow-hidden">
               <AccordionTrigger className="hover:no-underline py-4">
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'buyer' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                     <User className="w-4 h-4" />
                   </div>
                   <span className="font-bold">2. Primary Applicant</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</label>
                      <Input placeholder="First Name" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</label>
                      <Input placeholder="Last Name" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                    <Input type="email" placeholder="Email" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">PAN Number</label>
                      <Input placeholder="ABCDE1234F" className="h-12 rounded-input bg-secondary/30 border-border/50 uppercase" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Aadhaar</label>
                      <Input placeholder="0000 0000 0000" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                    </div>
                  </div>
                  <Button className="w-full h-12 rounded-button mt-4 font-bold" onClick={() => setStep('coapplicant')}>Next: Co-Applicant</Button>
               </AccordionContent>
            </AccordionItem>

            {/* Step 3: Co-Applicant */}
            <AccordionItem value="coapplicant" className="border-none bg-card rounded-card shadow-xs px-4 overflow-hidden">
               <AccordionTrigger className="hover:no-underline py-4">
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'coapplicant' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                     <User className="w-4 h-4" />
                   </div>
                   <span className="font-bold">3. Co-Applicant</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-card border border-border/50">
                     <span className="text-sm font-semibold">Include Co-Applicant?</span>
                     <div 
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${hasCoApplicant ? 'bg-primary' : 'bg-muted-foreground/30'}`}
                      onClick={() => setHasCoApplicant(!hasCoApplicant)}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform ${hasCoApplicant ? 'translate-x-6' : ''}`} />
                    </div>
                  </div>
                  
                  {hasCoApplicant && (
                    <div className="space-y-4 animate-in slide-in-from-top-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">First Name</label>
                          <Input placeholder="First Name" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Name</label>
                          <Input placeholder="Last Name" className="h-12 rounded-input bg-secondary/30 border-border/50" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Relationship</label>
                        <Select>
                          <SelectTrigger className="w-full h-12 rounded-input border-border/50 bg-secondary/30">
                            <SelectValue placeholder="Relationship to Primary" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  <Button className="w-full h-12 rounded-button mt-4 font-bold" onClick={() => setStep('docs')}>Next: Documents</Button>
               </AccordionContent>
            </AccordionItem>

            {/* Step 4: Documents Vault */}
            <AccordionItem value="docs" className="border-none bg-card rounded-card shadow-xs px-4 overflow-hidden">
               <AccordionTrigger className="hover:no-underline py-4">
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'docs' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                     <FileText className="w-4 h-4" />
                   </div>
                   <span className="font-bold">4. Documents Upload</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="pt-2 pb-4 space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 rounded-card bg-secondary/30">
                       <UploadCloud className="w-6 h-6 text-muted-foreground mb-2" />
                       <span className="text-xs font-semibold">PAN Card</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 rounded-card bg-secondary/30">
                       <UploadCloud className="w-6 h-6 text-muted-foreground mb-2" />
                       <span className="text-xs font-semibold">Aadhaar Card</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border/50 rounded-card bg-secondary/30 col-span-2">
                       <UploadCloud className="w-6 h-6 text-muted-foreground mb-2" />
                       <span className="text-xs font-semibold">Token Payment Proof / Cheque</span>
                    </div>
                  </div>
                  <Button className="w-full h-12 rounded-button mt-4 font-bold" onClick={() => setStep('review')}>Next: Review & Confirm</Button>
               </AccordionContent>
            </AccordionItem>

            {/* Step 5: Review */}
            <AccordionItem value="review" className="border-none bg-card rounded-card shadow-xs px-4 overflow-hidden">
               <AccordionTrigger className="hover:no-underline py-4">
                 <div className="flex items-center gap-3">
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                     <ShieldCheck className="w-4 h-4" />
                   </div>
                   <span className="font-bold">5. Final Review</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="pt-2 pb-4 space-y-4">
                  <Card className="p-4 bg-secondary/30 border-none space-y-3">
                     <p className="text-xs text-muted-foreground text-center">Confirming marks the unit as sold, creates a sold record, adds audit history, and triggers wallet commission.</p>
                     <div className="grid grid-cols-2 gap-2 text-xs">
                       <div className="bg-background rounded-xl p-3">
                         <p className="text-muted-foreground">Unit</p>
                         <p className="font-bold">{selectedHold?.unitNumber || 'A-1402'}</p>
                       </div>
                       <div className="bg-background rounded-xl p-3">
                         <p className="text-muted-foreground">Client</p>
                         <p className="font-bold">{selectedHold?.clientName || 'Vikram Malhotra'}</p>
                       </div>
                     </div>
                  </Card>
                  
                  <Button 
                    className="w-full h-14 rounded-button text-lg font-bold shadow-lg"
                    onClick={handleSubmit}
                    disabled={loading}
                  >
                    {loading ? 'Marking sold...' : 'Confirm and Mark Sold'}
                  </Button>
               </AccordionContent>
            </AccordionItem>

         </Accordion>
      </div>

    </div>
  );
}
