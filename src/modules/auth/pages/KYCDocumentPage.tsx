import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Lock, User, Home, ShoppingCart, Plus, CheckCircle2, Camera,
} from 'lucide-react';

// ─── Document Configurations ─────────────────────────────────────────────────

type DocId = 'pan' | 'aadhaar' | 'rera' | 'bank' | 'selfie';

interface FieldConfig {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  maxLength?: number;
}

interface DocConfig {
  id: DocId;
  title: string;
  subtitle: string;
  attachmentLabel: string;
  ctaLabel: string;
  fields: FieldConfig[];
  isSelfie?: boolean;
}

const DOC_CONFIGS: Record<DocId, DocConfig> = {
  pan: {
    id: 'pan',
    title: 'NATIONAL PAN LEDGER SCAN',
    subtitle: 'Enter taxation PAN credential keys & attach visual catalog proof.',
    attachmentLabel: 'PAN card visual doc',
    ctaLabel: 'Record Tax Identity Proof',
    fields: [
      { icon: Lock, placeholder: 'PAN Identity Key (10-characters)', maxLength: 10 },
    ],
  },
  aadhaar: {
    id: 'aadhaar',
    title: 'RESIDENT AADHAAR REGISTRY',
    subtitle: 'Scan front/rear identity credentials containing active verified numbers.',
    attachmentLabel: 'Aadhaar Scan Card',
    ctaLabel: 'Record National Identity Proof',
    fields: [
      { icon: User, placeholder: 'Aadhaar Identity Key (12-digits)', type: 'tel', maxLength: 12 },
    ],
  },
  rera: {
    id: 'rera',
    title: 'RERA REGULATORY LICENSE CERTIFICATE',
    subtitle: 'Validate your official RERA broker license credentials for regulatory legitimacy.',
    attachmentLabel: 'Certified RERA Certificate Doc',
    ctaLabel: 'Record RERA Certification Audits',
    fields: [
      { icon: Home, placeholder: 'RERA Broker License Registration Code' },
    ],
  },
  bank: {
    id: 'bank',
    title: 'LEDGER BANK PAIRING',
    subtitle: 'Submit bank information to route commissions. A simulated microdeposit test verifies routing immediately.',
    attachmentLabel: '',
    ctaLabel: 'Trigger Verification Loop',
    fields: [
      { icon: User, placeholder: 'Beneficiary Legal Name' },
      { icon: ShoppingCart, placeholder: 'Routing Settlement Account ID', type: 'tel' },
      { icon: Lock, placeholder: 'Branch routing routing numbers (IFSC/BIC code)' },
    ],
  },
  selfie: {
    id: 'selfie',
    title: 'LIVE SELFIE PORTRAIT MATCH',
    subtitle: 'Verify live broker user alignment profiles using face recognition.',
    attachmentLabel: 'Live Selfie Portrait',
    ctaLabel: 'Capture & Verify Portrait',
    fields: [],
    isSelfie: true,
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function KYCDocumentPage() {
  const navigate = useNavigate();
  const { docId } = useParams<{ docId: string }>();
  const config = DOC_CONFIGS[(docId as DocId) ?? 'pan'];

  const [fieldValues, setFieldValues] = useState<string[]>(
    config.fields.map(() => '')
  );
  const [attached, setAttached] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!config) {
    navigate(-1);
    return null;
  }

  const STORAGE_KEY = 'kyc_completed_docs';

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      // Persist to localStorage — dashboard reads from same key (Zeigarnik: show real progress)
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const existing: string[] = saved ? JSON.parse(saved) : [];
        if (docId && !existing.includes(docId)) {
          existing.push(docId);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
        }
      } catch { /* ignore */ }

      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => navigate('/auth/kyc'), 1200);
    }, 1800);
  };

  const handleAttach = () => setAttached(true);

  return (
    <div className="flex-1 flex flex-col bg-[#EAF9E7] overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#2d2d2d] mb-6 font-semibold tracking-widest text-xs uppercase"
        >
          <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
          BACK
        </button>

        <h1 className="text-[22px] font-extrabold text-[#013237] leading-tight uppercase tracking-tight mb-2">
          {config.title}
        </h1>
        <p className="text-sm text-[#013237] leading-relaxed">{config.subtitle}</p>
      </div>

      {/* Form */}
      <div className="px-5 space-y-4 flex-1">
        {/* Text fields */}
        {config.fields.map((field, i) => {
          const Icon = field.icon;
          return (
            <div
              key={i}
              className="bg-white rounded-2xl flex items-center gap-3 px-4 py-4 shadow-sm border border-white/80"
            >
              <Icon className="w-5 h-5 text-[#6b7280] shrink-0" />
              <input
                type={field.type ?? 'text'}
                maxLength={field.maxLength}
                placeholder={field.placeholder}
                value={fieldValues[i]}
                onChange={(e) => {
                  const updated = [...fieldValues];
                  updated[i] = e.target.value;
                  setFieldValues(updated);
                }}
                className="flex-1 bg-transparent text-sm text-[#013237] placeholder:text-[#9ca3af] outline-none"
              />
            </div>
          );
        })}

        {/* Selfie capture UI */}
        {config.isSelfie && (
          <div
            onClick={() => setAttached(true)}
            className={`bg-white rounded-2xl flex flex-col items-center justify-center py-10 gap-3 shadow-sm border cursor-pointer transition-all ${
              attached ? 'border-[#4CA771]/60 bg-[#EAF9E7]' : 'border-white/80'
            }`}
          >
            {attached ? (
              <>
                <CheckCircle2 className="w-14 h-14 text-[#4CA771]" />
                <p className="font-bold text-[#4CA771] text-sm">Selfie Captured!</p>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#4CA771] flex items-center justify-center shadow-md">
                  <Camera className="w-7 h-7 text-white" />
                </div>
                <p className="font-bold text-[#013237] text-sm text-center">Tap to Open Camera</p>
                <p className="text-xs text-[#9ca3af] text-center">Ensure good lighting & face clearly visible</p>
              </>
            )}
          </div>
        )}

        {/* File attachment */}
        {config.attachmentLabel && !config.isSelfie && (
          <div
            onClick={handleAttach}
            className={`bg-white rounded-2xl flex flex-col items-center justify-center py-8 gap-2 shadow-sm border cursor-pointer transition-all ${
              attached ? 'border-[#4CA771]/60 bg-[#EAF9E7]' : 'border-white/80'
            }`}
          >
            {attached ? (
              <>
                <CheckCircle2 className="w-12 h-12 text-[#4CA771]" />
                <p className="font-bold text-[#4CA771] text-sm">File Attached!</p>
                <p className="text-xs text-[#9ca3af]">{config.attachmentLabel}</p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-[#4CA771] flex items-center justify-center shadow-md">
                  <Plus className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <p className="font-bold text-[#013237] text-sm mt-1">
                  Attachment: {config.attachmentLabel}
                </p>
                <p className="text-xs text-[#9ca3af]">Tap to simulate file capture or local folder upload</p>
              </>
            )}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-5 py-6 mt-auto">
        {submitted ? (
          <div className="w-full h-14 rounded-full bg-[#4CA771]/20 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4CA771]" />
            <span className="font-bold text-[#4CA771]">Recorded Successfully</span>
          </div>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="w-full h-14 rounded-full bg-[#4CA771] text-white font-bold text-base shadow-lg shadow-[#4CA771]/30 active:scale-95 transition-transform disabled:opacity-70"
          >
            {submitting ? 'Processing...' : config.ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}
