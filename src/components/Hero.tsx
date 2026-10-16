import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface HeroProps {
  onAnalyzeClick: () => void;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnalyzeClick, onExploreClick }) => {
  return (
    <section id="hero" className="pt-10 pb-16 md:pt-16 md:pb-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF7F2] border border-[#9DD2C1] text-[#176B52] text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#176B52] animate-pulse"></span>
              AI-POWERED JOB SAFETY
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-['Plus_Jakarta_Sans',sans-serif]">
              Know the Job <br className="hidden sm:inline" />
              <span className="text-[#176B52]">Before You Apply.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Identify suspicious job offers, understand recruitment red flags, and make safer career decisions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onAnalyzeClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-[#176B52] hover:bg-[#125440] rounded-xl transition-all shadow-sm hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52] focus-visible:ring-offset-2"
              >
                <span>Analyze a Job</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-300 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
              >
                <span>Explore How It Works</span>
              </button>
            </div>

            {/* Trust Statement */}
            <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
              <span className="w-4 h-4 rounded-full bg-[#EBF7F2] text-[#176B52] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#176B52]" />
              </span>
              <p className="font-medium">
                Built to help Indian job seekers identify recruitment scams.
              </p>
            </div>

            {/* Key Metric Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-6 border-t border-slate-100 max-w-xl">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">100%</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Free Client Demo</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">8+ Flags</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">Explainable Rules</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-slate-900">3 Langs</p>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">EN, HI, KN Support</p>
              </div>
            </div>
          </div>

          {/* Right Column: CSS-based Card Preview (No large stock images) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              {/* Outer Glow / Framing Accent */}
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-100 via-teal-50 to-slate-100 rounded-2xl blur-lg opacity-70"></div>
              
              {/* Main Preview Container */}
              <div className="relative bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden p-5 sm:p-6 space-y-4">
                
                {/* Header of Preview Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#EBF7F2] text-[#176B52] flex items-center justify-center font-bold">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Live Analyzer Preview</p>
                      <p className="text-[10px] text-slate-500">Demo Inspection Output</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                    <AlertTriangle className="w-3 h-3 text-rose-500" />
                    High Risk Alert
                  </span>
                </div>

                {/* Score and Classification */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Fraud Risk Score
                      </span>
                      <p className="text-2xl font-extrabold text-rose-600">
                        88 <span className="text-sm font-normal text-slate-400">/ 100</span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] font-semibold text-slate-500 block">
                        Prediction
                      </span>
                      <span className="text-xs font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
                        Potentially Fraudulent
                      </span>
                    </div>
                  </div>

                  {/* Horizontal Risk Meter */}
                  <div className="space-y-1">
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 w-[30%]" title="Safe"></div>
                      <div className="bg-amber-400 w-[30%]" title="Caution"></div>
                      <div className="bg-rose-500 w-[40%] relative" title="High Risk">
                        <span className="absolute right-1 top-0 bottom-0 w-1 bg-white rounded-full"></span>
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                      <span>Low Risk (0-34)</span>
                      <span>Moderate (35-64)</span>
                      <span className="text-rose-600 font-bold">High Risk (65-100)</span>
                    </div>
                  </div>
                </div>

                {/* Detected Warning Signals */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700 flex items-center justify-between">
                    <span>Detected Red Flags</span>
                    <span className="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">3 Flagged</span>
                  </p>

                  <div className="space-y-1.5">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-rose-50/70 border border-rose-100 text-xs">
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-rose-900 leading-tight">₹1,500 Registration Fee Demanded</p>
                        <p className="text-[10px] text-rose-700 mt-0.5">Legitimate recruiters never ask for upfront onboarding fees.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900 leading-tight">Recruitment Exclusively on Telegram</p>
                        <p className="text-[10px] text-amber-700 mt-0.5">Unregistered handles prevent candidate legal verification.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50/70 border border-amber-100 text-xs">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-amber-900 leading-tight">Personal Webmail (@gmail.com)</p>
                        <p className="text-[10px] text-amber-700 mt-0.5">Missing official corporate domain correspondence.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recommendation Mini Banner */}
                <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center gap-2 text-xs text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <p className="text-[11px] font-medium leading-tight">
                    <span className="font-bold">Safety Rule:</span> Never pay fees for application processing, laptops, or interviews.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
