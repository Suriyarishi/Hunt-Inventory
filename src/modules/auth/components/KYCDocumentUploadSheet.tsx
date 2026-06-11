import { useState } from 'react';
import { UploadCloud, CheckCircle2, FileText, Camera } from 'lucide-react';
import { BottomSheet } from '@/components/ui/bottom-sheet';

export type DocumentType = 'PAN' | 'Aadhaar' | 'RERA' | 'Bank' | 'Selfie';

interface KYCUploadSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: DocumentType;
  onUploadComplete: (type: DocumentType) => void;
}

export function KYCDocumentUploadSheet({ open, onOpenChange, type, onUploadComplete }: KYCUploadSheetProps) {
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onOpenChange(false);
        onUploadComplete(type);
      }, 1500);
    }, 2000);
  };

  return (
    <BottomSheet open={open} onOpenChange={onOpenChange} title={`Upload ${type}`} height="85%">
      <div className="flex flex-col py-2">
        <p className="text-muted-foreground mb-6 text-sm">
          {type === 'Selfie'
            ? 'Please take a clear selfie in a well-lit area to verify your identity.'
            : `Upload a clear photo or PDF of your ${type} card. Make sure all text is readable.`}
        </p>

        <div
          className={`min-h-[220px] border-2 border-dashed rounded-card flex flex-col items-center justify-center transition-all ${
            success ? 'border-success bg-success/5' : 'border-border/50 bg-secondary/50 hover:bg-secondary'
          }`}
        >
          {success ? (
            <div className="flex flex-col items-center animate-in zoom-in">
              <CheckCircle2 className="w-16 h-16 text-success mb-4" />
              <p className="font-bold text-success">Upload Complete!</p>
            </div>
          ) : uploading ? (
            <div className="flex flex-col items-center py-10">
              <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
              <p className="font-medium text-muted-foreground">Uploading document...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center p-6 text-center cursor-pointer" onClick={handleUpload}>
              <div className="w-16 h-16 bg-card rounded-full shadow-sm flex items-center justify-center mb-4">
                {type === 'Selfie' ? <Camera className="w-8 h-8 text-primary" /> : <UploadCloud className="w-8 h-8 text-primary" />}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {type === 'Selfie' ? 'Take Photo' : 'Tap to Upload'}
              </h3>
              <p className="text-sm text-muted-foreground max-w-[200px]">JPEG, PNG, or PDF up to 5MB</p>
            </div>
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-start gap-3 p-4 bg-warning/10 rounded-card">
            <FileText className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <p className="text-xs text-warning-foreground">Your documents are encrypted and securely stored. They will only be used for verification purposes.</p>
          </div>
        </div>
      </div>
    </BottomSheet>
  );
}
