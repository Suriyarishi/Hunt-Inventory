import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

// ─── State Machine ────────────────────────────────────────────────────────────
type CameraState = 'idle' | 'scanning' | 'analyzing' | 'verified';

const STORAGE_KEY = 'kyc_completed_docs';

// ─── Animated dashed oval ─────────────────────────────────────────────────────
function OvalGuide({ state }: { state: CameraState }) {
  const isActive = state === 'scanning' || state === 'analyzing';
  const isVerified = state === 'verified';

  return (
    <svg
      viewBox="0 0 220 280"
      className="w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Animated gradient for scanning state */}
        <linearGradient id="scanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#19C37D" stopOpacity="1" />
          <stop offset="50%" stopColor="#19C37D" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#19C37D" stopOpacity="1" />
        </linearGradient>

        {/* Glow filter */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Face silhouette */}
      {!isVerified && (
        <g opacity={isActive ? 0.4 : 0.6}>
          {/* Head */}
          <circle cx="110" cy="108" r="34" fill="none" stroke="#19C37D" strokeWidth="2.5" />
          {/* Body/shoulders */}
          <path
            d="M55 240 Q55 190 110 185 Q165 190 165 240"
            fill="none"
            stroke="#19C37D"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      )}

      {/* Verified checkmark */}
      {isVerified && (
        <g>
          <circle cx="110" cy="140" r="48" fill="#19C37D" opacity="0.15" />
          <circle cx="110" cy="140" r="36" fill="#19C37D" opacity="0.3" />
          <path
            d="M88 140 L104 156 L134 122"
            fill="none"
            stroke="#19C37D"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-draw"
          />
        </g>
      )}

      {/* Dashed oval border */}
      <ellipse
        cx="110"
        cy="140"
        rx="90"
        ry="118"
        fill="none"
        stroke={isVerified ? '#19C37D' : isActive ? 'url(#scanGrad)' : '#19C37D'}
        strokeWidth={isVerified ? 3 : 2}
        strokeDasharray={isActive ? '12 6' : '10 8'}
        strokeLinecap="round"
        filter={isActive || isVerified ? 'url(#glow)' : undefined}
        style={{
          transformOrigin: '110px 140px',
          animation: isActive ? 'spin 3s linear infinite' : 'none',
        }}
      />

      {/* Corner alignment guides */}
      {!isVerified && (
        <>
          {/* Top-left */}
          <path d="M32 100 L32 80 L52 80" fill="none" stroke="#19C37D" strokeWidth="3" strokeLinecap="round" />
          {/* Top-right */}
          <path d="M188 100 L188 80 L168 80" fill="none" stroke="#19C37D" strokeWidth="3" strokeLinecap="round" />
          {/* Bottom-left */}
          <path d="M32 180 L32 200 L52 200" fill="none" stroke="#19C37D" strokeWidth="3" strokeLinecap="round" />
          {/* Bottom-right */}
          <path d="M188 180 L188 200 L168 200" fill="none" stroke="#19C37D" strokeWidth="3" strokeLinecap="round" />
        </>
      )}

      {/* Scanning sweep line */}
      {state === 'scanning' && (
        <line
          x1="22"
          y1="140"
          x2="198"
          y2="140"
          stroke="#19C37D"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.8"
          style={{
            animation: 'scanLine 1.8s ease-in-out infinite',
          }}
        />
      )}
    </svg>
  );
}

// ─── Scanning dots loader ─────────────────────────────────────────────────────
function ScanDots() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-[#19C37D]"
          style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function KYCSefliePage() {
  const navigate = useNavigate();
  const [cameraState, setCameraState] = useState<CameraState>('idle');
  const [analyzeProgress, setAnalyzeProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Cleanup timers
  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const handleOpenCamera = () => {
    // idle → scanning
    setCameraState('scanning');

    // After 2.5s: scanning → analyzing
    timerRef.current = setTimeout(() => {
      setCameraState('analyzing');
      // Animate progress 0→100
      let prog = 0;
      const interval = setInterval(() => {
        prog += 4;
        setAnalyzeProgress(Math.min(prog, 100));
        if (prog >= 100) {
          clearInterval(interval);
          // analyzing → verified
          timerRef.current = setTimeout(() => {
            setCameraState('verified');
          }, 300);
        }
      }, 50);
    }, 2500);
  };

  const handleComplete = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const existing: string[] = saved ? JSON.parse(saved) : [];
      if (!existing.includes('selfie')) {
        existing.push('selfie');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      }
    } catch { /* ignore */ }
    navigate('/auth/kyc');
  };

  const isIdle = cameraState === 'idle';
  const isScanning = cameraState === 'scanning';
  const isAnalyzing = cameraState === 'analyzing';
  const isVerified = cameraState === 'verified';

  const badgeText = isIdle
    ? 'Look at the camera'
    : isScanning
    ? 'Hold still...'
    : isAnalyzing
    ? 'Analyzing...'
    : '✓ Identity Matched';

  const badgeBg = isVerified ? '#19C37D' : 'rgba(0,0,0,0.75)';

  return (
    <>
      {/* Inject keyframe animations */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes scanLine {
          0%   { transform: translateY(-90px); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { transform: translateY(90px); opacity: 0; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40%            { transform: scale(1.2); opacity: 1; }
        }
        @keyframes pulse-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(1.15); opacity: 0; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.4s ease-out forwards; }
      `}</style>

      <div className="flex-1 flex flex-col bg-[#eef7f2] overflow-y-auto">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="px-5 pt-5 pb-3 flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl bg-white/80 border border-white shadow-sm flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-[#1a1a1a]" strokeWidth={2.5} />
          </button>
          <div>
            <p className="text-[15px] font-extrabold text-[#1a1a1a] leading-none">KYC Selfie</p>
            <p className="text-[11px] font-bold text-[#19C37D] uppercase tracking-widest mt-0.5">
              Step 5 of 5
            </p>
          </div>
        </div>

        {/* ── Title block ────────────────────────────────────────────── */}
        <div className="px-5 pt-2 pb-4 text-center">
          <p className="text-[10px] font-extrabold text-[#19C37D] uppercase tracking-[0.2em] mb-1">
            FINAL CHECK
          </p>
          <h1 className="text-[22px] font-extrabold text-[#1a1a1a] leading-tight mb-2">
            {isVerified ? 'Identity Verified!' : 'Take a quick selfie'}
          </h1>
          <p className="text-[13px] text-[#5a6a62] leading-relaxed max-w-[280px] mx-auto">
            {isVerified
              ? 'Your biometric portrait has been securely matched and recorded.'
              : 'We match your selfie with your Aadhaar photo. Only takes 2 seconds. Photo never leaves Hunt Property servers.'}
          </p>
        </div>

        {/* ── Camera Viewfinder ───────────────────────────────────────
            Von Restorff: dark block on mint bg draws full attention
            Fitts's Law: large interactive zone               ─────── */}
        <div className="px-5 mb-4">
          <div
            className={`relative rounded-3xl overflow-hidden transition-all duration-500 ${
              isVerified ? 'bg-[#0a2018]' : 'bg-[#0d1a14]'
            }`}
            style={{ aspectRatio: '3/4' }}
          >
            {/* Pulse rings when scanning (Law of Feedback) */}
            {isScanning && (
              <>
                <div
                  className="absolute inset-8 rounded-full border-2 border-[#19C37D]/40"
                  style={{ animation: 'pulse-ring 1.4s ease-out infinite' }}
                />
                <div
                  className="absolute inset-8 rounded-full border-2 border-[#19C37D]/30"
                  style={{ animation: 'pulse-ring 1.4s ease-out 0.4s infinite' }}
                />
              </>
            )}

            {/* Oval SVG guide */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <OvalGuide state={cameraState} />
            </div>

            {/* Instruction badge — top center (Status Visibility) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2">
              <div
                className="px-4 py-1.5 rounded-full text-white text-[12px] font-bold flex items-center gap-2 transition-all duration-300"
                style={{ backgroundColor: badgeBg }}
              >
                {(isScanning || isAnalyzing) && <ScanDots />}
                {isVerified && <CheckCircle2 className="w-3.5 h-3.5" />}
                {badgeText}
              </div>
            </div>

            {/* Analyze progress bar (bottom of viewfinder) */}
            {isAnalyzing && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a2e22]">
                <div
                  className="h-full bg-[#19C37D] transition-all duration-75"
                  style={{ width: `${analyzeProgress}%` }}
                />
              </div>
            )}

            {/* Verified celebration overlay */}
            {isVerified && (
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-5 animate-fade-in-up">
                <div className="bg-[#19C37D]/20 backdrop-blur-sm rounded-2xl px-5 py-2 flex items-center gap-2 border border-[#19C37D]/30">
                  <ShieldCheck className="w-4 h-4 text-[#19C37D]" />
                  <span className="text-[12px] font-bold text-[#19C37D]">Biometric Locked</span>
                </div>
              </div>
            )}

            {/* Privacy badge — bottom right corner (Trust) */}
            {isIdle && (
              <div className="absolute bottom-3 right-3 bg-black/60 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3 text-[#19C37D]" />
                <span className="text-[10px] text-white/80 font-semibold">On-device only</span>
              </div>
            )}

            {/* Speed badge — bottom left (Social proof / reassurance) */}
            {isIdle && (
              <div className="absolute bottom-3 left-3 bg-black/60 rounded-xl px-2.5 py-1.5 flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-400" />
                <span className="text-[10px] text-white/80 font-semibold">~2 seconds</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Tips (Cognitive Load Reduction — reduces user anxiety) ── */}
        {(isIdle || isScanning) && (
          <div className="px-5 mb-4">
            <div className="bg-white rounded-2xl px-4 py-4 border border-white shadow-sm">
              <p className="text-[13px] font-extrabold text-[#1a1a1a] mb-3">
                Tips for a good capture
              </p>
              {[
                'Good lighting on your face',
                'Remove glasses or face cover',
                'Look straight at the camera',
                'Hold the phone steady',
              ].map((tip, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#19C37D] shrink-0" />
                  <p className="text-[13px] text-[#5a6a62]">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analyzing state details */}
        {isAnalyzing && (
          <div className="px-5 mb-4 animate-fade-in-up">
            <div className="bg-white rounded-2xl px-4 py-4 border border-white shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full border-2 border-[#19C37D]/30 border-t-[#19C37D] animate-spin" />
                <p className="text-[13px] font-extrabold text-[#1a1a1a]">Running biometric checks</p>
              </div>
              {[
                { label: 'Face detection', done: analyzeProgress > 25 },
                { label: 'Liveness verification', done: analyzeProgress > 55 },
                { label: 'Aadhaar photo match', done: analyzeProgress > 80 },
                { label: 'Identity lock', done: analyzeProgress >= 100 },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-2.5 py-1.5">
                  <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                    step.done ? 'bg-[#19C37D]' : 'bg-[#e0ede6]'
                  }`}>
                    {step.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                  </div>
                  <p className={`text-[12px] font-semibold transition-colors duration-300 ${
                    step.done ? 'text-[#19C37D]' : 'text-[#9ca3af]'
                  }`}>{step.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verified summary */}
        {isVerified && (
          <div className="px-5 mb-4 animate-fade-in-up">
            <div className="bg-[#f0fff8] rounded-2xl px-4 py-4 border border-[#19C37D]/25">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#19C37D]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#19C37D]" />
                </div>
                <div>
                  <p className="text-[13px] font-extrabold text-[#1a1a1a]">Biometric Verification Complete</p>
                  <p className="text-[11px] text-[#5a6a62] mt-0.5">Your portrait was matched against Aadhaar records with 98.7% confidence.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* ── CTA Button (Fitts's Law — large, full-width, bottom) ─── */}
        <div className="px-5 py-5 border-t border-[#d4eadb]/60 bg-[#eef7f2]">
          {isIdle && (
            <button
              onClick={handleOpenCamera}
              className="w-full h-14 rounded-full bg-[#19C37D] text-white font-extrabold text-[15px] shadow-lg shadow-[#19C37D]/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              Open Camera
            </button>
          )}

          {isScanning && (
            <div className="w-full h-14 rounded-full bg-[#0d1a14] flex items-center justify-center gap-3 border border-[#19C37D]/30">
              <ScanDots />
              <span className="text-[#19C37D] font-bold text-[14px]">Scanning face...</span>
            </div>
          )}

          {isAnalyzing && (
            <div className="w-full h-14 rounded-full bg-[#19C37D]/10 flex items-center justify-center gap-3 border border-[#19C37D]/30">
              <div className="relative w-5 h-5">
                <svg className="w-5 h-5 -rotate-90" viewBox="0 0 20 20">
                  <circle cx="10" cy="10" r="8" fill="none" stroke="#d4eadb" strokeWidth="2" />
                  <circle
                    cx="10" cy="10" r="8"
                    fill="none" stroke="#19C37D" strokeWidth="2"
                    strokeDasharray={`${(analyzeProgress / 100) * 50.3} 50.3`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className="text-[#19C37D] font-bold text-[14px]">
                Analyzing biometrics... {analyzeProgress}%
              </span>
            </div>
          )}

          {isVerified && (
            <button
              onClick={handleComplete}
              className="w-full h-14 rounded-full bg-[#19C37D] text-white font-extrabold text-[15px] shadow-lg shadow-[#19C37D]/30 active:scale-95 transition-transform flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Complete KYC Selfie
            </button>
          )}
        </div>
      </div>
    </>
  );
}
