import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, User, Home, ShoppingCart, CheckCircle2,
  ArrowLeft, ChevronRight, Lock, Unlock
} from 'lucide-react';

type DocId = 'pan' | 'aadhaar' | 'rera' | 'bank' | 'selfie';

const STORAGE_KEY = 'kyc_completed_docs';

interface DocItem {
  id: DocId;
  letter: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  time?: string;
}

const DOC_LIST: DocItem[] = [
  {
    id: 'pan',
    letter: '01',
    title: 'National PAN Record',
    subtitle: 'Alphanumeric 10-digit taxation key',
    icon: Plus,
  },
  {
    id: 'aadhaar',
    letter: '02',
    title: 'Resident Aadhaar Card',
    subtitle: '12-digit national identity number',
    icon: User,
  },
  {
    id: 'rera',
    letter: '03',
    title: 'RERA Broker License',
    subtitle: 'Real estate regulatory authorization',
    icon: Home,
  },
  {
    id: 'bank',
    letter: '04',
    title: 'Ledger Bank Verification',
    subtitle: 'IFSC mapping & microdeposit test',
    icon: ShoppingCart,
  },
  {
    id: 'selfie',
    letter: '05',
    title: 'Live Selfie Portrait Match',
    subtitle: 'Biometric face alignment proof',
    icon: User,
  },
];

export default function KYCDashboardPage() {
  const navigate = useNavigate();

  // ── Persist completed set in localStorage ────────────────────────────────
  const [completed, setCompleted] = useState<Set<DocId>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved) as DocId[]) : new Set();
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }, [completed]);

  // Expose a toggle so we can demo completion (in real app: driven by API)
  const toggleComplete = (id: DocId, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const completedCount = completed.size;
  const total = DOC_LIST.length;
  const pct = Math.round((completedCount / total) * 100);
  const allComplete = completedCount === total;

  return (
    <div className="flex-1 flex flex-col bg-[#eef7f2] overflow-hidden">
      <div className="flex-1 overflow-y-auto">

        {/* ── Header ── */}
        <div className="px-5 pt-6 pb-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#3d6b52] mb-5 font-bold tracking-widest text-[11px] uppercase"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2.5} />
            BACK
          </button>

          <h1 className="text-[22px] font-extrabold text-[#1a1a1a] leading-tight uppercase tracking-tight">
            KYC LICENSING AUDIT
          </h1>
          <p className="text-[13px] text-[#5a6a62] mt-1 mb-5">
            All uploads are audited for RERA broker validity.
          </p>

          {/* ── Zeigarnik Progress Bar ─────────────────────────────────────
              Shows incompleteness → drives user to finish (Zeigarnik Effect) */}
          <div className="bg-white rounded-2xl px-4 py-4 mb-5 shadow-sm border border-white">
            {/* Step dots */}
            <div className="flex items-center gap-1.5 mb-3">
              {DOC_LIST.map((doc) => {
                const done = completed.has(doc.id);
                return (
                  <div
                    key={doc.id}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      done ? 'bg-[#19C37D]' : 'bg-[#e0ede6]'
                    }`}
                  />
                );
              })}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[22px] font-extrabold text-[#1a1a1a] leading-none">
                  {completedCount}
                </span>
                <span className="text-sm font-semibold text-[#9ca3af]">
                  /{total} verified
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`text-[28px] font-extrabold leading-none ${
                    pct === 100 ? 'text-[#19C37D]' : 'text-[#1a1a1a]'
                  }`}
                >
                  {pct}%
                </span>
                <p className="text-[10px] text-[#9ca3af] font-semibold uppercase tracking-wider">
                  Complete
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Document Cards ────────────────────────────────────────────────
            UX Laws applied:
            • Status Visibility  — color, icon, badge all show state
            • Gestalt Similarity — done cards all look alike (green tint)
            • Fitts's Law        — full-width, tall tap targets (min-h 72px)
            • Feedback           — instant visual swap on state change
            • Serial Position    — most critical docs listed first        */}
        <div className="px-5 space-y-3 pb-8">
          {DOC_LIST.map((doc, index) => {
            const Icon = doc.icon;
            const isDone = completed.has(doc.id);

            // Progressive disclosure: lock items after the first incomplete
            // (Principle of Progressive Disclosure + guided flow)
            const firstIncompleteIdx = DOC_LIST.findIndex(d => !completed.has(d.id));
            const isLocked = !isDone && index > firstIncompleteIdx + 1;

            return (
              <button
                key={doc.id}
                onClick={() => !isLocked && navigate(`/auth/kyc/${doc.id}`)}
                disabled={isLocked}
                className={`w-full rounded-2xl px-4 py-4 flex items-center gap-4 text-left transition-all duration-300 active:scale-[0.97] border ${
                  isDone
                    ? 'bg-[#f0fff8] border-[#19C37D]/25 shadow-sm shadow-[#19C37D]/10'
                    : isLocked
                    ? 'bg-white/60 border-white/60 opacity-50 cursor-not-allowed'
                    : 'bg-white border-white shadow-sm'
                }`}
              >
                {/* Step indicator / check */}
                <div className="relative shrink-0">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isDone
                        ? 'bg-[#19C37D]'
                        : isLocked
                        ? 'bg-[#e8ede8]'
                        : 'bg-[#e8f5ee]'
                    }`}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                    ) : isLocked ? (
                      <Lock className="w-4 h-4 text-[#9ca3af]" />
                    ) : (
                      <Icon className="w-4 h-4 text-[#19C37D]" />
                    )}
                  </div>
                  {/* Step number badge */}
                  <span
                    className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[8px] font-black flex items-center justify-center leading-none ${
                      isDone ? 'bg-[#19C37D] text-white' : 'bg-[#d1e8da] text-[#3d6b52]'
                    }`}
                  >
                    {doc.letter}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-bold text-[14px] leading-snug transition-colors ${
                      isDone ? 'text-[#19C37D]' : 'text-[#1a1a1a]'
                    }`}
                  >
                    {doc.title}
                  </p>
                  <p className="text-[12px] text-[#7a8a82] mt-0.5 leading-snug">
                    {isDone ? '✓ Document verified & locked' : doc.subtitle}
                  </p>
                </div>

                {/* Right side — status badge + arrow */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  {isDone ? (
                    <>
                      <span className="text-[10px] font-extrabold tracking-wider px-2 py-1 rounded-lg bg-[#19C37D]/15 text-[#19C37D]">
                        DONE ✓
                      </span>
                      {/* Tap to undo — Law of Control / Error Recovery */}
                      <button
                        onClick={(e) => toggleComplete(doc.id, e)}
                        className="text-[9px] text-[#9ca3af] underline underline-offset-2 font-semibold"
                      >
                        undo
                      </button>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-extrabold tracking-wider px-2 py-1 rounded-lg bg-[#fff0e0] text-[#d97706]">
                        REQUIRED
                      </span>
                      {!isLocked && (
                        <ChevronRight className="w-4 h-4 text-[#9ca3af]" />
                      )}
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Motivational nudge (Peak-End Rule) ─── */}
        {completedCount > 0 && !allComplete && (
          <div className="mx-5 mb-6 bg-white rounded-2xl px-4 py-3 border border-[#e0ede6] flex items-center gap-3">
            <Unlock className="w-5 h-5 text-[#19C37D] shrink-0" />
            <p className="text-[12px] text-[#5a6a62] font-semibold leading-snug">
              {total - completedCount} more step{total - completedCount > 1 ? 's' : ''} to unlock your broker account. Keep going!
            </p>
          </div>
        )}

        {allComplete && (
          <div className="mx-5 mb-6 bg-[#f0fff8] rounded-2xl px-4 py-4 border border-[#19C37D]/25 text-center">
            <p className="text-[13px] font-extrabold text-[#19C37D] mb-0.5">
              🎉 All documents verified!
            </p>
            <p className="text-[11px] text-[#5a6a62]">Submit to activate your broker license.</p>
          </div>
        )}
      </div>

      {/* ── Sticky CTA ────────────────────────────────────────────────────── */}
      <div className="px-5 py-4 bg-[#eef7f2] border-t border-[#d4eadb]/60">
        <button
          onClick={() => allComplete && navigate('/auth/kyc-status')}
          disabled={!allComplete}
          className={`w-full h-14 rounded-full font-bold text-[15px] shadow-lg transition-all duration-300 active:scale-95 ${
            allComplete
              ? 'bg-[#19C37D] text-white shadow-[#19C37D]/30 shadow-lg'
              : 'bg-[#c8e6d4] text-[#8ab59a] cursor-not-allowed shadow-none'
          }`}
        >
          {allComplete ? '✓ Compile & Audit Submission' : `Complete ${total - completedCount} more to submit`}
        </button>
      </div>
    </div>
  );
}
