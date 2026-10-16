import React, { useState } from 'react';
import {
  checkCompanyCredibility,
  CompanyCheckResult,
  SAMPLE_COMPANY_DATABASE
} from '../utils/detector';
import {
  Building2,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Search,
  Globe,
  MailCheck,
  FileBadge2,
  Info
} from 'lucide-react';

export const CompanyCheck: React.FC = () => {
  const [companyName, setCompanyName] = useState('Tata Consultancy Services');
  const [website, setWebsite] = useState('');
  const [result, setResult] = useState<CompanyCheckResult | null>(() =>
    checkCompanyCredibility('Tata Consultancy Services')
  );
  const [error, setError] = useState<string | null>(null);

  const handleCheck = (nameToTest = companyName, webToTest = website) => {
    if (!nameToTest.trim()) {
      setError('Please enter a company name to check credibility.');
      setResult(null);
      return;
    }

    setError(null);
    const data = checkCompanyCredibility(nameToTest, webToTest);
    setResult(data);
  };

  const loadSampleCompany = (key: string) => {
    const preset = SAMPLE_COMPANY_DATABASE[key];
    if (preset) {
      setCompanyName(preset.companyName);
      setWebsite(preset.website);
      setError(null);
      setResult(preset);
    }
  };

  const getStatusBadge = (status: CompanyCheckResult['status']) => {
    switch (status) {
      case 'Verified Enterprise':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2,
          scoreColor: 'text-emerald-600',
          borderColor: 'border-emerald-200'
        };
      case 'Suspicious Flagged':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: AlertTriangle,
          scoreColor: 'text-rose-600',
          borderColor: 'border-rose-200'
        };
      case 'Unverified Entity':
      default:
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: AlertCircle,
          scoreColor: 'text-amber-600',
          borderColor: 'border-amber-200'
        };
    }
  };

  return (
    <section id="company-check" className="py-16 bg-white border-b border-slate-200 scroll-mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF7F2] border border-[#9DD2C1] text-[#176B52] text-xs font-semibold uppercase mb-2">
            <Building2 className="w-3.5 h-3.5" />
            Entity Due Diligence
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight font-['Plus_Jakarta_Sans',sans-serif]">
            Check Company Credibility
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base">
            Inspect employer domain authenticity, corporate registration indicators, and simulated email consistency.
          </p>
        </div>

        {/* Input & Search Form */}
        <div className="bg-[#FAFAFA] rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-xs mb-8">
          
          {/* Quick preset chips */}
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-500 block mb-2">
              Quick test simulated company profiles:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => loadSampleCompany('tata consultancy services')}
                className="px-3 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors"
              >
                TCS (Verified)
              </button>
              <button
                type="button"
                onClick={() => loadSampleCompany('infosys')}
                className="px-3 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors"
              >
                Infosys (Verified)
              </button>
              <button
                type="button"
                onClick={() => loadSampleCompany('apex data solutions')}
                className="px-3 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded-lg transition-colors"
              >
                Apex Data (Unverified)
              </button>
              <button
                type="button"
                onClick={() => loadSampleCompany('fasttrack earn careers')}
                className="px-3 py-1 text-xs font-medium bg-white hover:bg-slate-100 text-rose-700 border border-rose-200 rounded-lg transition-colors"
              >
                FastTrack Earn (Flagged)
              </button>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleCheck();
            }}
            className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end"
          >
            <div className="md:col-span-6">
              <label htmlFor="cred-company-name" className="block text-xs font-semibold text-slate-700 mb-1">
                Company Name <span className="text-rose-500">*</span>
              </label>
              <input
                id="cred-company-name"
                type="text"
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  if (error) setError(null);
                }}
                placeholder="e.g. Tata Consultancy Services, Infosys, Apex..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>

            <div className="md:col-span-4">
              <label htmlFor="cred-website-url" className="block text-xs font-semibold text-slate-700 mb-1">
                Website URL <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                id="cred-website-url"
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="e.g. https://www.tcs.com"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-[#176B52] hover:bg-[#125440] rounded-xl transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-[#176B52]"
              >
                <Search className="w-4 h-4" />
                <span>Check</span>
              </button>
            </div>
          </form>

          {error && (
            <p className="text-xs text-rose-600 font-medium flex items-center gap-1.5 mt-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </p>
          )}

          <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Simulated demonstration data. Does not run live external crawler or scraper requests.</span>
          </div>
        </div>

        {/* Credibility Result Card */}
        {result && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {(() => {
              const badge = getStatusBadge(result.status);
              const StatusIcon = badge.icon;

              return (
                <div>
                  {/* Result Header */}
                  <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold border ${badge.bg}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          {result.status}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          Simulated Sample Record
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
                        {result.companyName}
                      </h3>
                      {result.website && (
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5 text-slate-400" />
                          <span>{result.website}</span>
                        </p>
                      )}
                    </div>

                    {/* Profile Score Badge */}
                    <div className="sm:text-right bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-100 shrink-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Credibility Index
                      </span>
                      <div className="flex items-baseline gap-1 sm:justify-end">
                        <span className={`text-3xl font-extrabold ${badge.scoreColor}`}>
                          {result.profileScore}
                        </span>
                        <span className="text-slate-400 font-semibold text-xs">/ 100</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Risk Level: <strong className="text-slate-700">{result.riskLevel}</strong>
                      </span>
                    </div>
                  </div>

                  {/* 4 Inspection Points Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 bg-slate-50/50 border-b border-slate-100 text-xs">
                    
                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <span>Website Availability</span>
                      </div>
                      <p className="font-medium text-slate-800">
                        {result.websiteAvailability}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                      <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                        <MailCheck className="w-4 h-4 text-slate-400" />
                        <span>Email-Domain Consistency</span>
                      </div>
                      <p className="font-medium text-slate-800">
                        {result.domainConsistency}
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-slate-200 sm:col-span-2 lg:col-span-1">
                      <div className="flex items-center gap-2 text-slate-500 font-semibold mb-1">
                        <FileBadge2 className="w-4 h-4 text-slate-400" />
                        <span>Registration Status</span>
                      </div>
                      <p className="font-medium text-slate-800">
                        {result.registrationStatus}
                      </p>
                    </div>

                  </div>

                  {/* Notes & Diligence Recommendations */}
                  <div className="p-6 space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Assessment Observations & Verified Notes
                    </h4>
                    <ul className="space-y-2">
                      {result.notes.map((note, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#176B52] mt-1.5 shrink-0" />
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Educational note */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
                      <ShieldCheck className="w-4 h-4 text-[#176B52] shrink-0 mt-0.5" />
                      <span>
                        Indian Job Seeker Tip: Check the company&apos;s Corporate Identification Number (CIN) on the official Ministry of Corporate Affairs website (mca.gov.in) before accepting physical appointments or signing contracts.
                      </span>
                    </div>
                  </div>

                </div>
              );
            })()}
          </div>
        )}

      </div>
    </section>
  );
};
