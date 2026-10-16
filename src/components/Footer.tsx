import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100">
          
          {/* Logo & Description */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#176B52] flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                Job<span className="text-[#176B52]">Shield</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md leading-relaxed">
              A lightweight machine-learning-inspired web demonstration engineered to educate Indian job seekers on recruitment red flags, fake offer indicators, and career safety.
            </p>
            <p className="text-xs text-slate-400">
              Academic Project Demonstration • Built with React & Tailwind CSS
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Quick Navigation
            </h4>
            <ul className="space-y-1.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => scrollTo('hero')}
                  className="text-slate-600 hover:text-[#176B52] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('analyzer')}
                  className="text-slate-600 hover:text-[#176B52] transition-colors"
                >
                  Analyze Job
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('company-check')}
                  className="text-slate-600 hover:text-[#176B52] transition-colors"
                >
                  Company Check
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('how-it-works')}
                  className="text-slate-600 hover:text-[#176B52] transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="text-slate-600 hover:text-[#176B52] transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Helpline Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Citizen Helplines (India)
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p>
                <strong className="text-slate-900">Cyber Crime Helpline:</strong> 1930
              </p>
              <p>
                <strong className="text-slate-900">National Portal:</strong> cybercrime.gov.in
              </p>
              <p>
                <strong className="text-slate-900">Company Verification:</strong> mca.gov.in
              </p>
            </div>
          </div>

        </div>

        {/* Disclaimer Notice */}
        <div className="pt-6 space-y-3">
          <p className="text-[11px] text-slate-400 text-center leading-relaxed max-w-4xl mx-auto">
            <strong>Disclaimer:</strong> JobShield is a demonstration project. Risk scores are indicative and do not guarantee that a job or employer is genuine or fraudulent.
          </p>

          <p className="text-[11px] text-slate-400 text-center flex items-center justify-center gap-1">
            <span>Designed for college showcase demonstration</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
