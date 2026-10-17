import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  AlertTriangle, 
  BarChart3, 
  Building2, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Lock, 
  Zap, 
  DollarSign, 
  Check,
  Eye,
  Activity,
  Layers
} from 'lucide-react';
import { TiltCard3D } from './TiltCard3D';

interface MottoMissionSectionProps {
  onAnalyzeClick: () => void;
  onCompanyClick: () => void;
}

export const MottoMissionSection: React.FC<MottoMissionSectionProps> = ({
  onAnalyzeClick,
  onCompanyClick,
}) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // The 4 Core Purposes detailed from the user requirements
  const pillars = [
    {
      id: 1,
      step: '01',
      title: 'Detect Suspicious Jobs Before Applying',
      subtitle: 'Proactive Pre-Application Screening',
      description:
        'Scan job postings, WhatsApp messages, or offer emails before sending resumes, personal identity docs, or sensitive financial data.',
      glowColor: 'rgba(16, 185, 129, 0.45)',
      cardBorder: 'border-emerald-500/40 hover:border-emerald-400',
      badgeBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
      tagText: 'text-emerald-400',
      tagBg: 'bg-emerald-500/15 border-emerald-500/30',
      icon: Search,
      tag: 'Pre-Application Shield',
      features: [
        'Instant text & URL keyword pattern recognition',
        'Works with email offers & WhatsApp recruiter messages',
        'Runs 100% in-browser with zero data retention'
      ],
      microWidget: {
        title: 'Pre-Apply Scanner',
        status: 'Active Defense',
        badge: 'Zero Risk Exposure',
        details: 'Evaluates language tone, unverified web links, and recruitment phrasing in < 0.4s'
      }
    },
    {
      id: 2,
      step: '02',
      title: 'Identify Red Flags & Warning Signs',
      subtitle: 'Fees, Fake HRs & Unrealistic Pay',
      description:
        'Spot deceitful traps including registration or laptop fees, unregistered Telegram handles, and inflated ₹1.5L/month entry-level promises.',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      cardBorder: 'border-amber-500/40 hover:border-amber-400',
      badgeBg: 'bg-gradient-to-br from-amber-500 to-rose-600',
      tagText: 'text-amber-400',
      tagBg: 'bg-amber-500/15 border-amber-500/30',
      icon: AlertTriangle,
      tag: 'Red Flag Scanner',
      features: [
        'Detection of upfront onboarding or exam fees (₹500–₹5,000)',
        'Alerts on Telegram/WhatsApp-only interview channels',
        'Checks for suspicious generic webmail (@gmail, @yahoo)'
      ],
      microWidget: {
        title: 'Trap Detection Engine',
        status: '3 Traps Flagged',
        badge: 'Fee Blocked',
        details: '“₹1,500 registration deposit demanded for interview scheduling”'
      }
    },
    {
      id: 3,
      step: '03',
      title: 'Understand Fraud Risk With Clear Scores',
      subtitle: 'Transparent Explainable Analysis',
      description:
        'Receive an intuitive 0–100 Fraud Risk Index accompanied by transparent, human-readable explanations—not an unexplainable black box.',
      glowColor: 'rgba(99, 102, 241, 0.45)',
      cardBorder: 'border-indigo-500/40 hover:border-indigo-400',
      badgeBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      tagText: 'text-indigo-400',
      tagBg: 'bg-indigo-500/15 border-indigo-500/30',
      icon: BarChart3,
      tag: '0–100 Explainable Index',
      features: [
        'Color-coded risk meter: Low (0-34), Medium (35-64), High (65-100)',
        'Itemized evidence with positive trust signals & negative red flags',
        'Clear next-step safety directives and helpline contacts'
      ],
      microWidget: {
        title: 'Explainable AI Scoring',
        status: 'Score: 88/100',
        badge: 'Transparent',
        details: 'Weights 8+ specific indicators with cited clauses and risk levels'
      }
    },
    {
      id: 4,
      step: '04',
      title: 'Check Company Credibility',
      subtitle: 'Verify Employers Before Trusting',
      description:
        'Verify corporate email domains, check MCA/CIN registration compliance, and validate employer reputation before accepting any offer.',
      glowColor: 'rgba(6, 182, 212, 0.45)',
      cardBorder: 'border-cyan-500/40 hover:border-cyan-400',
      badgeBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      tagText: 'text-cyan-400',
      tagBg: 'bg-cyan-500/15 border-cyan-500/30',
      icon: Building2,
      tag: 'Domain & MCA Verification',
      features: [
        'Domain age and registration lookup heuristic check',
        'MCA (Ministry of Corporate Affairs) CIN entity verification',
        'Corporate MX email record authenticity assessment'
      ],
      microWidget: {
        title: 'Employer Authenticity',
        status: 'Domain & CIN',
        badge: 'MCA Registry',
        details: 'Validates corporate registry presence and catches typo-squatted domains'
      }
    }
  ];

  return (
    <section 
      id="project-motto" 
      className="relative py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-[#05110E] via-[#081C17] to-[#0A1814] text-white border-b border-emerald-950"
    >
      {/* 3D Cyber Background Patterns */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#05110E]/80 to-[#05110E] pointer-events-none" />

      {/* Floating 3D Glowing Ambient Spheres */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-cyan-500/15 blur-[140px] pointer-events-none rounded-full animate-orb-1" />
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-600/15 rounded-full blur-[130px] pointer-events-none animate-orb-2" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-purple-600/15 rounded-full blur-[130px] pointer-events-none animate-orb-3" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER: 3D Holographic Motto Showcase */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          
          {/* 3D Glowing Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 backdrop-blur-md border border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.25)] text-xs font-bold uppercase tracking-wider text-emerald-300 transition-transform hover:scale-105">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            </span>
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Official Project Motto & 4 Core Purposes</span>
          </div>

          {/* MAIN MOTTO DISPLAY: Monumental 3D Typography */}
          <div className="relative">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.16] font-['Plus_Jakarta_Sans',sans-serif]">
              “Protect job seekers from recruitment scams using{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_10px_25px_rgba(16,185,129,0.3)] underline decoration-cyan-400 decoration-wavy decoration-2 underline-offset-8">
                AI-powered fraud detection.
              </span>”
            </h2>
          </div>

          {/* IN SIMPLE WORDS: Reassurance Banner */}
          <div className="max-w-3xl mx-auto pt-3">
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-emerald-500/30 backdrop-blur-md shadow-lg">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs block mb-1">
                  In simple words:
                </span>
                JobShield helps people identify potentially fake job offers and make safer career decisions before any money or sensitive identity information is lost.
              </p>
            </div>
          </div>

          {/* Trust Chips Row */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-300 font-medium">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 shadow-xs">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              100% Private Client-Side
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-amber-500/30 shadow-xs">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Instant Pre-Application Check
            </span>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              Explainable Risk Indicators
            </span>
          </div>

        </div>

        {/* 4 CORE PURPOSES: 3D Animated Interactive Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 perspective-1500 mb-20">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const isHovered = hoveredCard === pillar.id;

            return (
              <TiltCard3D
                key={pillar.id}
                glowColor={pillar.glowColor}
                maxTilt={10}
                scaleOnHover={1.03}
                className="h-full"
              >
                <div
                  onMouseEnter={() => setHoveredCard(pillar.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`group relative h-full rounded-3xl p-8 sm:p-9 bg-slate-900/80 backdrop-blur-2xl border ${pillar.cardBorder} shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Subtle Background Radial Shimmer */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-radial from-white/5 to-transparent rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                  <div className="relative z-10 space-y-6">
                    
                    {/* Top Bar: 3D Floating Icon & Step Badge */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* 3D Floating Icon Badge with translateZ */}
                        <div className={`w-14 h-14 rounded-2xl ${pillar.badgeBg} text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 translate-z-20`}>
                          <Icon className="w-7 h-7 stroke-[2.2]" />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                            Core Purpose {pillar.step}
                          </span>
                          <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-md mt-0.5 border ${pillar.tagBg} ${pillar.tagText}`}>
                            {pillar.tag}
                          </span>
                        </div>
                      </div>

                      <span className="text-3xl font-black text-slate-700/60 font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-slate-500 transition-colors">
                        {pillar.step}
                      </span>
                    </div>

                    {/* Title & Subtitle */}
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight font-['Plus_Jakarta_Sans',sans-serif] group-hover:text-emerald-300 transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
                        {pillar.subtitle}
                      </p>
                      <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>

                    {/* 3D Micro Visual Preview Box */}
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 group-hover:border-white/20 transition-all">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-slate-200 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5 text-emerald-400" />
                          {pillar.microWidget.title}
                        </span>
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] border ${pillar.tagBg} ${pillar.tagText}`}>
                          {pillar.microWidget.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">
                        {pillar.microWidget.details}
                      </p>
                    </div>

                    {/* Feature Checkpoints */}
                    <ul className="space-y-2.5 border-t border-white/10 pt-4">
                      {pillar.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                            <Check className="w-3 h-3 stroke-[2.5]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                </div>
              </TiltCard3D>
            );
          })}
        </div>

        {/* 3D MONUMENTAL CENTERPIECE: In Simple Words & Interactive Action */}
        <div className="relative mx-auto max-w-5xl rounded-3xl p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-slate-950 via-[#0B2A22] to-slate-950 text-white shadow-[0_0_60px_rgba(16,185,129,0.25)] overflow-hidden border border-emerald-500/40">
          
          {/* Animated Glow Rings & Light Streaks */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/25 rounded-full blur-3xl pointer-events-none animate-pulse-ring" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-500/25 rounded-full blur-3xl pointer-events-none animate-pulse-ring" />
          <div className="absolute inset-0 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Column: Reassurance */}
            <div className="lg:col-span-8 space-y-4">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Executive Summary</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans',sans-serif] leading-tight text-white">
                “JobShield helps people identify potentially fake job offers and make safer career decisions.”
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Unsolicited Telegram messages, upfront registration fees, or high-salary bait: JobShield provides immediate 3D-assisted fraud heuristic analysis so you never step into a scammer’s trap.
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-500/25 max-w-lg">
                <div>
                  <p className="text-2xl font-black text-emerald-400 font-['Plus_Jakarta_Sans',sans-serif]">0 Cost</p>
                  <p className="text-[11px] text-slate-300">Free Community Tool</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-cyan-400 font-['Plus_Jakarta_Sans',sans-serif]">8+ Flags</p>
                  <p className="text-[11px] text-slate-300">Recruitment Traps</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-300 font-['Plus_Jakarta_Sans',sans-serif]">0 Storage</p>
                  <p className="text-[11px] text-slate-300">Privacy Guaranteed</p>
                </div>
              </div>

            </div>

            {/* Right Column: 3D Action Center */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 space-y-3.5 shadow-xl">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Ready to test a job offer?
                </p>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Paste any job description, WhatsApp message, or check company MCA registry status right now.
                </p>

                <button
                  onClick={onAnalyzeClick}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-slate-950 transition-all shadow-[0_0_25px_rgba(16,185,129,0.4)] cursor-pointer"
                >
                  <Search className="w-4 h-4 stroke-[2.5]" />
                  <span>Analyze a Job Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onCompanyClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs bg-white/10 hover:bg-white/20 text-white border border-white/25 transition-all cursor-pointer"
                >
                  <Building2 className="w-4 h-4" />
                  <span>Verify Company Credentials</span>
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
