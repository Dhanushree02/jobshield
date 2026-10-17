import React, { useState } from 'react';
import { 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Lock, 
  Search, 
  Building2,
  Scan,
  Zap,
  Activity
} from 'lucide-react';
import { ThreeDShieldCanvas } from './ThreeDShieldCanvas';
import { TiltCard3D } from './TiltCard3D';

interface HeroProps {
  onAnalyzeClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onExploreClick }) => {
  // Preset scenarios to showcase 3D interactive detection
  const [activeScenario, setActiveScenario] = useState<'telegram' | 'salary' | 'genuine'>('telegram');

  const scenarioData = {
    telegram: {
      threat: 'danger' as const,
      score: 88,
      riskLabel: 'Potentially Fraudulent',
      riskColor: 'text-rose-400',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      meterColor: 'bg-rose-500',
      flags: [
        { icon: AlertCircle, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20', title: '₹1,500 Registration Fee Demanded', subtitle: 'Legitimate employers never charge onboarding or exam fees.' },
        { icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', title: 'Recruitment Exclusively on Telegram', subtitle: 'Anonymous handle @hr_recruiter_fast hired without formal interview.' },
        { icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', title: 'Generic Webmail (@gmail.com)', subtitle: 'Offer sent from private inbox instead of official corporate domain.' }
      ]
    },
    salary: {
      threat: 'warning' as const,
      score: 58,
      riskLabel: 'Moderate Caution',
      riskColor: 'text-amber-400',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      meterColor: 'bg-amber-500',
      flags: [
        { icon: AlertTriangle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', title: 'Unrealistic Pay for Entry Level', subtitle: '₹1.5 Lakh/month promised for simple copy-paste typing tasks.' },
        { icon: AlertCircle, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20', title: 'Urgency & Pressure Phrasing', subtitle: '“Pay training deposit before 5 PM or slot expires”.' },
        { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: 'Registered Corporate Name', subtitle: 'Uses legitimate brand name to gain premature trust.' }
      ]
    },
    genuine: {
      threat: 'safe' as const,
      score: 12,
      riskLabel: 'Legitimate Offer',
      riskColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      meterColor: 'bg-emerald-500',
      flags: [
        { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: 'Official Corporate Domain Verified', subtitle: 'Sent from verified @tcs.com career portal email server.' },
        { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: 'Zero Fees or Pre-Deposits', subtitle: 'Clear policy: Company never solicits financial compensation.' },
        { icon: CheckCircle2, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', title: 'MCA Registered Corporate Entity', subtitle: 'Active CIN record with verified Indian registered address.' }
      ]
    }
  }[activeScenario];

  return (
    <section 
      id="hero" 
      className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-[#05110E] text-white border-b border-emerald-950"
    >
      {/* 3D Perspective Cyber Grid Background */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#05110E]/70 to-[#05110E] pointer-events-none" />

      {/* Floating 3D Glowing Ambient Spheres */}
      <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-orb-2" />
      <div className="absolute -bottom-20 left-10 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-orb-3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission, Typography & 3D Interactive Controls */}
          <div className="lg:col-span-7 space-y-7 z-10">
            
            {/* Glowing 3D Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25)] text-xs font-bold tracking-wider uppercase text-emerald-300">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Next-Gen AI Job Fraud Shield</span>
            </div>

            {/* Main Title with Cyber Gradient */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] font-['Plus_Jakarta_Sans',sans-serif]">
                Know the Job <br />
                <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_10px_20px_rgba(16,185,129,0.25)]">
                  Before You Apply.
                </span>
              </h1>
            </div>

            {/* THE MAIN MOTTO DISPLAY: 3D Holographic Card */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-r from-emerald-950/70 via-slate-900/80 to-teal-950/70 backdrop-blur-xl border border-emerald-500/35 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Our Core Project Motto</span>
              </div>
              <p className="text-lg sm:text-xl font-bold text-white leading-snug">
                “Protect job seekers from recruitment scams using{' '}
                <span className="text-emerald-400 underline decoration-cyan-400 decoration-2 underline-offset-4">
                  AI-powered fraud detection.
                </span>”
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 font-medium">
                In simple words: JobShield helps people identify potentially fake job offers and make safer career decisions before any money or identity is compromised.
              </p>
            </div>

            {/* Interactive 3D Scenario Switcher */}
            <div className="space-y-2.5 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  Live 3D Test Simulation
                </span>
                <span className="text-[11px] text-emerald-400">Click to switch scan</span>
              </div>

              <div className="grid grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-900/80 border border-emerald-900/50 backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => setActiveScenario('telegram')}
                  className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                    activeScenario === 'telegram'
                      ? 'bg-rose-500/25 text-rose-300 border border-rose-500/50 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  🔴 Telegram Scam
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScenario('salary')}
                  className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                    activeScenario === 'salary'
                      ? 'bg-amber-500/25 text-amber-300 border border-amber-500/50 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  🟡 ₹1.5L Bait
                </button>

                <button
                  type="button"
                  onClick={() => setActiveScenario('genuine')}
                  className={`py-2 px-2.5 rounded-lg text-xs font-bold transition-all text-center cursor-pointer ${
                    activeScenario === 'genuine'
                      ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 shadow-xs'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                  }`}
                >
                  🟢 Legitimate Offer
                </button>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onAnalyzeClick}
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-xl transition-all shadow-[0_0_35px_rgba(16,185,129,0.4)] hover:shadow-[0_0_45px_rgba(16,185,129,0.6)] cursor-pointer transform hover:-translate-y-0.5"
              >
                <Search className="w-5 h-5 stroke-[2.4]" />
                <span>Analyze a Job Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all backdrop-blur-md cursor-pointer hover:border-emerald-400/50"
              >
                <span>Explore 3D Pillars</span>
              </button>
            </div>

            {/* Key Metric Highlights with 3D Accents */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-950/80 max-w-xl">
              <div className="p-3 rounded-xl bg-slate-900/40 border border-emerald-900/40">
                <p className="text-xl sm:text-2xl font-black text-emerald-400 font-['Plus_Jakarta_Sans',sans-serif]">100%</p>
                <p className="text-[11px] text-slate-400 font-medium">Free To Use</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-emerald-900/40">
                <p className="text-xl sm:text-2xl font-black text-cyan-400 font-['Plus_Jakarta_Sans',sans-serif]">8+ Flags</p>
                <p className="text-[11px] text-slate-400 font-medium">Explainable Rules</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/40 border border-emerald-900/40">
                <p className="text-xl sm:text-2xl font-black text-purple-400 font-['Plus_Jakarta_Sans',sans-serif]">3 Langs</p>
                <p className="text-[11px] text-slate-400 font-medium">EN, HI, KN</p>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Holographic Interactive Stage With TiltCard3D */}
          <div className="lg:col-span-5 perspective-1500">
            <TiltCard3D
              className="relative mx-auto max-w-md"
              glowColor="rgba(16, 185, 129, 0.35)"
              maxTilt={14}
            >
              {/* Outer 3D Neon Aura */}
              <div className="absolute -inset-3 bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-cyan-500/30 rounded-3xl blur-2xl opacity-75"></div>

              {/* Main 3D Card Shell */}
              <div className="relative rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-emerald-500/40 shadow-2xl overflow-hidden p-6 space-y-4">
                
                {/* 3D Floating Top Badges */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">3D Hologram Security Core</p>
                      <p className="text-[10px] text-slate-400">Interactive Mouse-Reactive Canvas</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${scenarioData.badgeBg} animate-pulse`}>
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {scenarioData.riskLabel}
                  </span>
                </div>

                {/* INTERACTIVE 3D SHIELD CANVAS VIEWPORT */}
                <div className="relative rounded-2xl bg-gradient-to-b from-slate-950/90 to-emerald-950/40 border border-emerald-500/30 overflow-hidden flex flex-col items-center justify-center p-2">
                  
                  {/* Laser Scan Sweep Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser z-20 pointer-events-none shadow-[0_0_15px_#06b6d4]" />

                  {/* 3D Canvas */}
                  <ThreeDShieldCanvas
                    width={340}
                    height={260}
                    threatLevel={scenarioData.threat}
                  />

                  {/* 3D HUD Reticle Overlay */}
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-[10px] font-mono text-emerald-400/80 bg-slate-950/80 px-3 py-1 rounded-lg border border-emerald-500/20 pointer-events-none">
                    <span>MODE: HEURISTIC_AI</span>
                    <span>TILT: TRACKING_MOUSE</span>
                    <span>STATUS: ARMED</span>
                  </div>
                </div>

                {/* Score & Prediction Bar */}
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/10 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Fraud Risk Score
                      </span>
                      <p className={`text-3xl font-black ${scenarioData.riskColor} font-['Plus_Jakarta_Sans',sans-serif]`}>
                        {scenarioData.score} <span className="text-sm font-normal text-slate-400">/ 100</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Verdict</span>
                      <span className={`text-xs font-bold ${scenarioData.riskColor}`}>
                        {scenarioData.riskLabel}
                      </span>
                    </div>
                  </div>

                  {/* Risk Progress Bar */}
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                      <div 
                        className={`h-full ${scenarioData.meterColor} transition-all duration-700 rounded-full shadow-[0_0_12px_currentColor]`}
                        style={{ width: `${scenarioData.score}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] text-slate-400 font-semibold">
                      <span>Low Risk (0-34)</span>
                      <span>Moderate (35-64)</span>
                      <span>High Risk (65-100)</span>
                    </div>
                  </div>
                </div>

                {/* Detected Signals List */}
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-300 flex items-center justify-between">
                    <span>Inspection Signals</span>
                    <span className="text-[10px] text-emerald-400 font-mono">3 Signals Evaluated</span>
                  </p>

                  <div className="space-y-2">
                    {scenarioData.flags.map((flag, idx) => {
                      const FlagIcon = flag.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs transition-transform hover:translate-x-1"
                        >
                          <div className={`p-1 rounded-md border shrink-0 mt-0.5 ${flag.color}`}>
                            <FlagIcon className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-bold text-white text-xs leading-tight">{flag.title}</p>
                            <p className="text-[10px] text-slate-300 mt-0.5 leading-snug">{flag.subtitle}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Safety Directive */}
                <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-2 text-xs text-emerald-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="text-[11px] font-medium leading-tight">
                    <span className="font-bold text-white">Rule:</span> Never pay fees for interview processing, training, or kit deposits.
                  </p>
                </div>

              </div>
            </TiltCard3D>
          </div>

        </div>
      </div>
    </section>
  );
};
