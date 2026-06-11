import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export default function KYCStatusPage() {
  const navigate = useNavigate();

  const checks = [
    { label: 'National PAN Record', status: 'Verified' },
    { label: 'Resident Aadhaar Card', status: 'Verified' },
    { label: 'RERA Broker License', status: 'Under Review' },
    { label: 'Ledger Bank Pairing', status: 'Verified' },
    { label: 'Live Selfie Portrait', status: 'Verified' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#eef7f2] overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-10 pb-6 flex flex-col items-center text-center">
        <div className="w-20 h-20 rounded-full bg-[#19C37D]/20 flex items-center justify-center mb-4 shadow-inner">
          <ShieldCheck className="w-10 h-10 text-[#19C37D]" />
        </div>
        <h1 className="text-[22px] font-extrabold text-[#1a1a1a] uppercase tracking-tight mb-2">
          KYC SUBMITTED
        </h1>
        <p className="text-sm text-[#5a6a62] max-w-[260px] leading-relaxed">
          Your documents are under regulatory audit. We'll notify you once verification is complete.
        </p>
      </div>

      {/* Status Cards */}
      <div className="px-5 space-y-3">
        {checks.map((check, i) => {
          const isVerified = check.status === 'Verified';
          return (
            <div
              key={i}
              className="bg-white rounded-2xl px-4 py-4 flex items-center gap-3 shadow-sm border border-white/80"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isVerified ? 'bg-[#19C37D]/15' : 'bg-amber-50'}`}>
                {isVerified
                  ? <CheckCircle2 className="w-4 h-4 text-[#19C37D]" />
                  : <Clock className="w-4 h-4 text-amber-500" />
                }
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1a1a1a]">{check.label}</p>
              </div>
              <span className={`text-[10px] font-bold tracking-wider px-2 py-1 rounded-md ${
                isVerified ? 'bg-[#e0f0e8] text-[#19C37D]' : 'bg-amber-50 text-amber-600'
              }`}>
                {check.status.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="px-5 py-8 mt-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="w-full h-14 rounded-full bg-[#19C37D] text-white font-bold text-base shadow-lg shadow-[#19C37D]/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
        >
          Continue to Dashboard
          <ArrowRight className="w-5 h-5" />
        </button>
        <p className="text-xs text-center text-[#9ca3af] mt-4">
          Verification typically completes within 24–48 hours
        </p>
      </div>
    </div>
  );
}
