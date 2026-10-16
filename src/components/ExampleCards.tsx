import React from 'react';
import { SAMPLE_JOBS, SampleJob } from '../data/sampleJobs';
import { CheckCircle2, AlertTriangle, ArrowUpRight, Sparkles } from 'lucide-react';

interface ExampleCardsProps {
  onSelectSample: (job: SampleJob) => void;
}

export const ExampleCards: React.FC<ExampleCardsProps> = ({ onSelectSample }) => {
  return (
    <section className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#176B52] uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              Interactive Demo Cases
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
              Explore Sample Job Postings
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Click &quot;Try Example&quot; to test how JobShield inspects genuine vs fraudulent patterns.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>All entries are fictional demo listings</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_JOBS.slice(0, 3).map((job) => {
            const isSafe = job.riskType === 'low';
            return (
              <div
                key={job.id}
                className="bg-[#FAFAFA] hover:bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        isSafe
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-rose-50 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {isSafe ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                      )}
                      {job.tag}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400">
                      Demo Job
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className="text-base font-bold text-slate-900 mb-1 font-['Plus_Jakarta_Sans',sans-serif]">
                    {job.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mb-3">
                    {job.company}
                  </p>

                  {/* Short Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3 bg-white p-3 rounded-xl border border-slate-100">
                    {job.shortSummary}
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-4 border-t border-slate-200/70 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400">
                    Language: {job.language.toUpperCase()}
                  </span>
                  <button
                    onClick={() => onSelectSample(job)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B52] hover:text-[#125440] hover:underline focus:outline-none focus:underline"
                  >
                    <span>Try Example</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
