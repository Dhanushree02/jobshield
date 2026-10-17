import React, { useState } from 'react';
import { ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onAnalyzeClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAnalyzeClick }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#05110E]/95 backdrop-blur-md border-b border-emerald-950/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1 cursor-pointer"
            aria-label="JobShield Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20">
              <ShieldCheck className="w-5 h-5 stroke-[2.4]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white block font-['Plus_Jakarta_Sans',sans-serif]">
                Job<span className="text-emerald-400">Shield</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400/80 block -mt-1">
                Fraud Detection
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('hero')}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('project-motto')}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Motto & Purpose
            </button>
            <button
              onClick={() => scrollTo('analyzer')}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Analyze Job
            </button>
            <button
              onClick={() => scrollTo('company-check')}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              Company Check
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              About
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onAnalyzeClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 rounded-lg transition-all shadow-md shadow-emerald-500/25 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <span>Analyze a Job</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-emerald-950 bg-[#05110E] px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => scrollTo('hero')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('project-motto')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400"
          >
            Motto & Purpose
          </button>
          <button
            onClick={() => scrollTo('analyzer')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400"
          >
            Analyze Job
          </button>
          <button
            onClick={() => scrollTo('company-check')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400"
          >
            Company Check
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:bg-white/5 hover:text-emerald-400"
          >
            About
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAnalyzeClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-lg transition-colors cursor-pointer shadow-md"
            >
              <span>Analyze a Job</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
