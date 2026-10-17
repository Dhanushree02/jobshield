import React from 'react';
import { FileText, SearchCode, ShieldAlert } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Paste a Job',
      description: 'Enter a job description, WhatsApp message, or email text along with optional company details and posting link.',
      icon: FileText
    },
    {
      step: '02',
      title: 'Analyze Warning Signs',
      description: 'The detection engine checks for 8+ recruitment red flags such as registration fees, informal chat channels, and unrealistic claims.',
      icon: SearchCode
    },
    {
      step: '03',
      title: 'Understand the Risk',
      description: 'Review the explainable fraud risk score, detailed reasonings for each detected signal, and actionable safety recommendations.',
      icon: ShieldAlert
    }
  ];

  return (
    <section id="how-it-works" className="py-16 bg-[#FAFAFA] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-wider text-[#176B52] uppercase mb-2">
            Simple 3-Step Verification Flow
          </p>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            How JobShield Works
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Protecting job seekers through instant pattern recognition and explainable safety insights.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#EBF7F2] text-[#176B52] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                      Step {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 font-['Plus_Jakarta_Sans',sans-serif]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#176B52]">
                  <span>Safety Check</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500 font-normal">Real-time heuristics</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
