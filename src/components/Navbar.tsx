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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52] rounded-lg p-1"
            aria-label="JobShield Home"
          >
            <div className="w-9 h-9 rounded-lg bg-[#176B52] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 block font-['Plus_Jakarta_Sans',sans-serif]">
                Job<span className="text-[#176B52]">Shield</span>
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block -mt-1">
                Fraud Detection Demo
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollTo('hero')}
              className="text-sm font-medium text-slate-600 hover:text-[#176B52] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollTo('analyzer')}
              className="text-sm font-medium text-slate-600 hover:text-[#176B52] transition-colors"
            >
              Analyze Job
            </button>
            <button
              onClick={() => scrollTo('company-check')}
              className="text-sm font-medium text-slate-600 hover:text-[#176B52] transition-colors"
            >
              Company Check
            </button>
            <button
              onClick={() => scrollTo('how-it-works')}
              className="text-sm font-medium text-slate-600 hover:text-[#176B52] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-sm font-medium text-slate-600 hover:text-[#176B52] transition-colors"
            >
              About
            </button>
          </nav>

          {/* Primary Action Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={onAnalyzeClick}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-[#176B52] hover:bg-[#125440] rounded-lg transition-colors shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-[#176B52] focus-visible:ring-offset-2"
            >
              <span>Analyze a Job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2">
          <button
            onClick={() => scrollTo('hero')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#176B52]"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('analyzer')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#176B52]"
          >
            Analyze Job
          </button>
          <button
            onClick={() => scrollTo('company-check')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#176B52]"
          >
            Company Check
          </button>
          <button
            onClick={() => scrollTo('how-it-works')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#176B52]"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-[#176B52]"
          >
            About
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onAnalyzeClick();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#176B52] hover:bg-[#125440] rounded-lg transition-colors"
            >
              <span>Analyze a Job</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
